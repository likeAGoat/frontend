/**
 * 액션을 만들 때마다 객체를 바로 생성하기는 번거로움 -> 액션을 만들어 내는 함수를 만들어 보겠습니다.
 * action 객체를 만드는 액션 생성 함수들을 선언합니다.(action creators).
 * 여기에서 () => ({})은 function(){return{}}와 동일한 의미입니다.
 */

import * as types from "./ActionTypes";

/**
 * create 함수는 카운터를 새로 만들 때 기본 색상을 받을 수 있도록 color가 파라미터로 설정되어 있고,
 * remove 함수는 맨 마지막 카운터를 삭제하기 때문에 따로 index 값이 주어지지 않습니다.
 * 나머지 함수들은 어떤 카운터를 수정해야 할지 명시하려고 index값을 파라미터로 받습니다.
 */
export const create = (color) => ({
    type: types.CREATE,
    color
});

export const remove = () => ({
    type: types.REMOVE
});

export const increment = (index) => ({
    type: types.INCREMENT,
    index
});

export const decrement = (index) => ({
    type: types.DECREMENT,
    index
});

export const setColor = ({index, color}) => ({
    type: types.SET_COLOR,
    index,
    color
});
