//인풋 상태를 관리하는 input 모듈
// - 1) 액션 타입 정하기
// - 2) 액션 생성 함수 만들기
// - 3) 초기 상태 정의하기
// - 4) 리듀서 정의하기
import {Map} from 'immutable';
import {handleActions, createAction} from 'redux-actions';

//인풋 내용을 설정하는 액션 하나
//액션 타입을 정의할 때는 이처럼 문자열의 앞부분에 리듀서 이름을 적어 줍니다. 이렇게 접두사를 설정했을 때 장점은
//액션 타입 이름이 서로 다른 리듀서끼리 중복되어도 상관없다.
const SET_INPUT = 'input/SET_INPUT';

//액션 생성 함수
export const setInput = createAction(SET_INPUT);

// 리듀서의 초기상태
const initialState = Map({
    value: ''
});

//리듀서
export default handleActions({
    [SET_INPUT]: (state,action) => {
        return state.set('value',action.payload)
    }
}, initialState);