import {createStore,applyMiddleware} from 'redux';
import modules from './modules';

// import loggerMiddleware from './lib/loggerMiddleware';

//스토어를 생성할 때 미들웨어를 적용합니다.
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();
//미들웨어가 여러 개일 때는 파라미터로 전달하면 됩니다. 예: applyMiddleware(a,b,c)
//미들웨어 순서는 여기에서 전달한 파리미터 순서대로 저장합니다.
// const store = createStore(modules, applyMiddleware(loggerMiddleware))
const store = createStore(modules, applyMiddleware(logger,ReduxThunk))

export default store;
