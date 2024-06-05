import time
import json
import random
import requests
from lxml import etree
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def login_jd(driver, username, password):
    login_url = 'https://passport.jd.com/uc/login'
    driver.get(login_url)
    time.sleep(2)  # 等待登录页面加载

    # 输入账号
    loginname_input = driver.find_element(By.ID, 'loginname')
    loginname_input.send_keys(username)

    # 输入密码
    password_input = driver.find_element(By.ID, 'nloginpwd')
    password_input.send_keys(password)

    # 点击登录按钮
    login_button = driver.find_element(By.ID, 'loginsubmit')
    login_button.click()

    time.sleep(30)  # 等待登录完成

def parse_product_details(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("Failed to retrieve the webpage")
        return None

    page_content = response.content
    tree = etree.HTML(page_content)

    # 商品名字
    try:
        product_name = tree.xpath('//div[@class="sku-name"]/text()')
        product_name = ''.join([name.strip() for name in product_name if name.strip()])
    except:
        product_name = ""

    # 商品分类
    try:
        product_classification = tree.xpath('//*[@id="crumb-wrap"]/div/div[1]/div[position()>0 and position()<10]/a/text()')
        product_classification = [item.strip() for item in product_classification]
    except:
        product_classification = ""

    # 商品店铺
    try:
        product_shop = tree.xpath('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[1]/div/a/text()')
        product_shop = product_shop[0].strip() if product_shop else ""
    except:
        product_shop = ""

    # 轮播图URL
    try:
        carousel_images = tree.xpath('//*[@id="spec-list"]/ul/li/img/@src')
        carousel_images = ["https:" + img for img in carousel_images]
    except:
        carousel_images = []

    product_data = {
        "product_name": product_name,
        "product_price": f"{random.randint(100, 20000)}.00",
        "product_classification": product_classification,
        "product_sales": f"{random.randint(1, 100000)}",
        "product_shop": product_shop,
        "product_stock": f"{random.randint(1, 100000)}",
        "carousel_images": carousel_images
    }

    return product_data

def crawl_sub_category(driver, category, sub_category, max_products):
    url = f"https://search.jd.com/Search?keyword={sub_category}&enc=utf-8"
    driver.get(url)
    time.sleep(2)  # 等待页面加载

    products_crawled = 0
    products_processed = set()  # 用于记录已经处理过的商品URL

    category_data = {category: {sub_category: []}}

    waitTime = 20
    while products_crawled < max_products:
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '#J_goodsList ul li'))
            )
            products = driver.find_elements(By.CSS_SELECTOR, '#J_goodsList ul li')
        except Exception as e:
            print("Error finding products:", e)
            break

        for product in products:
            if products_crawled >= max_products:
                waitTime = 15
                break
            try:
                product_url = product.find_element(By.CSS_SELECTOR, '.p-img a').get_attribute('href')
                if product_url in products_processed:
                    continue
                products_processed.add(product_url)

                # 点击商品进入详情页面
                original_window = driver.current_window_handle
                product.find_element(By.CSS_SELECTOR, '.p-img a').send_keys(Keys.CONTROL + Keys.RETURN)
                WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))

                # 切换到新打开的窗口
                driver.switch_to.window(driver.window_handles[-1])
                time.sleep(waitTime)  # 等待详情页面加载
                waitTime = 1

                # 解析商品详情页面
                product_data = parse_product_details(driver.current_url)
                if product_data:
                    category_data[category][sub_category].append(product_data)

                # 关闭当前详情页并切回原始窗口
                driver.close()
                driver.switch_to.window(original_window)

                products_crawled += 1

            except Exception as e:
                time.sleep(15)
                print("Error processing product:", e)
                # 重新加载产品列表
                products = driver.find_elements(By.CSS_SELECTOR, '#J_goodsList ul li')
                continue

        try:
            next_page = driver.find_element(By.CSS_SELECTOR, '.pn-next')
            next_page.click()
            time.sleep(5)  # 等待页面加载新的一页
        except:
            print("No more pages or unable to locate the next page button.")
            break

    # 将数据写入JSON文件
    file_name = f'product_data_{category}_{sub_category}.json'
    with open(file_name, 'w', encoding='utf-8') as f:
        json.dump(category_data, f, ensure_ascii=False, indent=4)
        f.write('\n')

    print(f"Data has been saved to {file_name}")

def process_product(product_url, category_data, category, sub_category):
    try:
        options = Options()
        # options.headless = True  # Uncomment if you want to run headless
        driver = webdriver.Edge(options=options)
        driver.get(product_url)
        time.sleep(2)  # 等待详情页面加载
        product_data = parse_product_details(product_url)
        if product_data:
            category_data[category][sub_category].append(product_data)
        driver.quit()
    except Exception as e:
        print(f"Error processing product {product_url}: {e}")


if __name__ == "__main__":

    categories = {
        # "电脑": ["显示器", "轻薄本", "台式机", "游戏本", "平板电脑"],
        # "电脑": ["游戏本", "平板电脑"],
        "办公": ["游戏电竞", "高效办公", "智慧学习", "全屋智能", "户外休闲"],
        "手机": ["手机"],
        "数码": ["手机配件", "影音娱乐", "外设产品", "摄影摄像", "智能设备"],
        "家用电器": ["家用电器"],
        "家居": ["家居"],
        "家装": ["家装"],
        "汽车用品": ["汽车用品"]
    }

    options = Options()
    # options.headless = True  # Uncomment if you want to run headless
    driver = webdriver.Edge(options=options)

    # 登录京东
    login_jd(driver, '1726634055@qq.com', 'GJyg6841!')

    for category, sub_categories in categories.items():
        for sub_category in sub_categories:
            crawl_sub_category(driver, category, sub_category, max_products=60)

    driver.quit()
