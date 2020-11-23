import { handleActions, createAction} from 'redux-actions';

//모듈 개수가 하나이기 때문에 액션 이름 부분의 접두사는 생략
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

//redux-thunk를 적용해서 액션을 디스패치할 때, 1초 뒤에 실제 액션을 디스패치하도록 코드를 수정해 봅시다 !!
export const incrementAsync = () => dispatch => {
    //1초 뒤 액션 디스패치
    setTimeout(
        () => { dispatch(increment())},
        1000
    );
}

export const decrementAsync = () => dispatch => {
    //1초 뒤 액션 디스패치
    setTimeout(
        () => { dispatch(decrement())},
        1000
    );
}

// 모듈의 기본 값은 0
// INCREMENT,DECREMENT 액션에 따라 숫자를 더하기,빼기
export default handleActions({
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1
}, 1);
