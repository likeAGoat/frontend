//todos모듈에서 구현할 액션
//INSERT:추가, TOGGLE: 토글, REMOVE: 삭제
// - 1) 액션 타입 정하기
// - 2) 액션 생성 함수 만들기
// - 3) 초기 상태 정의하기
// - 4) 리듀서 정의하기
import {Map,List} from 'immutable';
import {handleActions,createAction} from 'redux-actions';

// - 1) 액션 타입 정하기
const INSERT = 'todos/INESRT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// - 2) 액션 생성 함수 만들기
export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove= createAction(REMOVE);

// - 3) 초기 상태 정의하기
const initialState = List([
    Map({
        id: 0,
        text: '리액트 공부하기',
        done: true
    }),
    Map({
        id: 1,
        text: '컴포넌트 스타일링 해보기',
        done: false
    })
]);
// - 4) 리듀서 정의하기
export default handleActions({
    [INSERT]: (state, action) => {
        /** payload 안에 있는 id, text, done의 레퍼런스를 만들어 줍니다.
         * 레퍼런스를 만들지 않고, 바로 push(Map(action.payload))를 해도 되지만,
         * 나중에 이 코드를 보았을 때,
         * 이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있도록 하는 작업입니다.
        */
       const { id, text, done } = action.payload;

       return state.push(Map({
         id,
         text,
         done
       }));
    },
    [TOGGLE]: (state, action) => {
        const {payload: index } = action; // const index = action.paload;
        /**
         * 비구조 할당으로 index 레퍼런스에 action.payload 값을 넣습니다. 이 작업이 필수는 아니지만,
         * 나중에 이 코드를 보았을 때 여기서 payload가 어떤 값을 의미하는지 쉽게 이해 할 수 있습니다.
         *
         */

         //updateIn으로 현재 값을 참조하여 반대 값으로 설정합니다.
         return state.updateIn([index,'done'], done => !done);
         /**
          * updateIn을 사용하지 않는다면 다음과 같이 작성할 수도 있습니다.
          * return state.setIn([index,'done'], !state.getIn([0,index]));
          */
    },
    [REMOVE]: (state,action) => {
        const { payload: index } = action; // const index = action.payload;
        console.log("index :" + action.payload);

        // 참고
        // const s = [1,3,5]; s.filter(v=>v.id !== 2); // 가 아닌 모든 배열 요소가 들어간다.
        // const f = [1,2];

        //인덱스인 아이템을 제거한다.
        return state.delete(index);//힌트 주신거! immutable.js 기조에 맞춰서 immutable.js의 메서드 중 fillter를 이용해서 한다.
    }
}, initialState)