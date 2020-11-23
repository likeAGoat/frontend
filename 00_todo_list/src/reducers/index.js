import {combineReducers} from 'redux';
// reducers 디렉터리에 index.js 파일을 만들고 combineReducers를 사용하고 리듀서를 합쳐서 내보내겠습니다.
import input from './input';
import todos from './todos';
import news from './news';

export default combineReducers({
    input,
    todos,
    news
});