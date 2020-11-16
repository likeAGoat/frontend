import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import ComponentApp from "./components/ComponentApp";
import App from './App';
import registerServiceWorker from "./registerServiceWorker";

/** Route 구성 */
import { BrowserRouter } from 'react-router-dom';

import modules from './modules';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(modules, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
, document.getElementById("root"));
registerServiceWorker();
