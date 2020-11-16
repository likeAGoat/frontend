import * as types from '../actions/ActionTypes';

const initialState = {
    color: 'black'
};

//서브 리듀서 생성
const color = (state = initialState, action) => {
    switch(action.type){
        case types.SET_COLOR:
            return{
                color: action.color
            };
        default:
            return state;
    }
};

export default color;