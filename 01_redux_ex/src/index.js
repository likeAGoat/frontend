import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";

// 리덕스 관련 불러오기
import { createStore } from "redux";
import reducers from "./reducers";
import {Provider} from 'react-redux';

// 스토어 생성
const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
