import * as types from '../actions/ActionTypes';
// import number from './number';
// import color from './color';

// import { combineReducers } from 'redux';

// const reducers = combineReducers({
//     numberData: number,
//     colorData: color
// });

// export default reducers;

const initialState = {
    counters: [
        {
            color: 'black',
            number: 0
        }
    ]
}

function counter(state = initialState, action){
    // 레퍼런스 생성
    // 비구조 할당
    // const object = {a:1, b:2};
    // const {a,b} = object;
    // console.log(a); //1
    // console.log(b); //2
    // const state = { color: 'black', number: 0}
    const { counters } = state;

    /**
     * 배열을 업데이트하는 것은 기존 배열에 push 또는 pop 배열 함수를 사용하여 값을 변경하면 안 되고,
     * 전개 연산자(...)를 사용하거나 slice함수로 배열을 잘라서 새로 생성해야합니다.
     */
    switch(action.type){
        case types.CREATE:
            return{
                counters:[
                    ...counters,
                    {
                        color: action.color,
                        number : 0
                    }
                ]
            };
        case types.REMOVE:
            return{
                counters: counters.slice(0, counters.length - 1)
            };
        case types.INCREMENT:
            return {
                counters: [
                    ...counters.slice(0,action.index), //선택한 인덱스의 전 아이템들
                    {
                        ...counters[action.index], //기존 객체에
                        number: counters[action.index].number + 1 //새 number 값 덮어쓰기
                    },
                    ...counters.slice(action.index + 1, counters.length) //선택한 인덱스의 다음 아이템들
                ]
            }
        case types.DECREMENT:
            return{
                counters: [
                    ...counters.slice(0,action.index),
                    {
                        ...counters[action.index], //기존 객체에
                        number: counters[action.index].number - 1 //새 number 값 덮어쓰기
                    },
                    ...counters.slice(action.index + 1, counters.length) //선택한 인덱스의 다음 아이템들
                ]
            };
        case types.SET_COLOR:
            return{
                counters: [
                    ...counters.slice(0,action.index),
                    {
                        ...counters[action.index], //기존 객체에
                        color: action.color
                    },
                    ...counters.slice(action.index + 1, counters.length) //선택한 인덱스의 다음 아이템들
                ]
            };
        default:
            return state;
    }
}
export default counter;