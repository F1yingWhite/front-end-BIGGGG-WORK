import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "react";
import { initData } from "./utils/initData";
import { Spin } from 'antd';

function App() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    initData().then(() => {
      setLoad(false);
    });
  }, [setLoad]);

  return (
    <>
      <Spin spinning={load} fullscreen />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
