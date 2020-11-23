import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from './App';
import registerServiceWorker from "./registerServiceWorker";

/** Route 구성 */
import { BrowserRouter } from 'react-router-dom';

/** 리덕스를 위한 참조 추가 */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

//스토어를 생성할 때 미들웨어를 적용합니다.
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();
const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger, ReduxThunk)));

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
, document.getElementById("root"));
registerServiceWorker();
