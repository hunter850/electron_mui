// 根據 .browserslistrc 設定決定支援的瀏覽器 自動加入 polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
