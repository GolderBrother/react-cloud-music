import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes/index";
import { GlobalStyle } from "./style.js";
import { IconStyle } from "./assets/iconfont/iconfont";
import store from "./store";
import { Data } from "./application/Singers/data";
function App(props) {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>{renderRoutes(routes)}</Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
