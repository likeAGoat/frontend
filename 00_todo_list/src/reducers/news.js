import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

// - 1) 액션 타입 정하기 : 컴포넌트가 겪는 상황을 구분하는 문자열 값
// 일반적으로 Ajax 처리를 수행할 때는 하나의 기능에 3개의 상태값을 둔다.
// 리스트 가져오기 시작 -> loading값을 true로, error는 false로 변경
const SEARCH_START   = 'news/SEARCH_START';
// 리스트 가져오기 성공 -> loading과 error를 false로 변경, result를 할당.
const SEARCH_SUCCESS = 'news/SEARCH_SUCCESS';
// 리스트 가져오기 실패 -> loading값을 false로, error는 true로 변경
const SEARCH_FAILURE = 'news/SEARCH_FAILURE';

// - 2) 액션 생성 함수 만들기 : 액션 객체를 만들어서 리턴
// ReduxThunk에 의한 비동기 함수안에서 Ajax 처리 후, 결과를 반환하기 위해 이 함수들을 dispatch한다.
export const searchActionStart   = createAction(SEARCH_START);
export const searchSuccessAction = createAction(SEARCH_SUCCESS);
export const searchFailureAction = createAction(SEARCH_FAILURE);

// - 3) 초기 상태 정의하기
const initialState = {
    loading: false,// 통신여부 (Ajax 시작시 true로 변경)
    result: null,// 컴포넌트에 출력할 결과가 저장될 객체 (Ajax 연동 결과)
    error: false// 에러 발생 여부 (실패시 true로 변경)
};
// - 4) 리듀서 정의하기
export default handleActions({
    // 리스트 가져오기 시작 -> loading값 true, error는 false로 변경
    [SEARCH_START] : (state = initialState ,action) => {
        return{
            ...state,
            loading: true,
            error: false
        };
    },
    // 리스트 가져오기 성공 -> loading값 false, error는 false, result 할당
    [SEARCH_SUCCESS] : (state = initialState ,action) => {
        return{
            ...state,
            loading: false,
            // 백엔드에서 전달하는 JSON 데이터 전문은 항상 action.payload로 전달.
            // 이 값을 통째로 활용할 것인지, 일부만 활용할 것인지에 따라
            // result에 채워 넣을 값이 결정된다.
            result: action.payload.result,
            error: false
        };
    },
    // 리스트 가져오기 실패 --> loading값 false, error는 true로 변경
    [SEARCH_FAILURE]: (state = initialState, action) => {
        return {
            ...state,
            loading: false,
            error: true
        };
    }
},initialState);

// 5)비동기 작업을 수행할 함수 정의 (ReduxThunk 적용)
// 컴포넌트에서 이벤트가 발생한 경우나 useEffect()를 통해 특정 값이 변경된 경우 호출될 함수 하나만 정의하고
// 이 안에서 실행 결과를 반영하는 상태 함수를 선택적으로 호출하도록 구현한다.
export const newsAsync = (category) => async dispatch => {
    /** Ajax 시작을 알림 -> 컴포넌트에서 로딩바를 표시하기 위함 */
    // 검색 시작 -> loading값을 true로, error는 false로 변경
    dispatch(searchActionStart());

    // 예외처리: try 블록을 실행하는 도중 에러가 발생하면 그 즉시 처리를 중단하고 catch 블록으로 이동
    try{
        // Ajax 연동 결과로 전달되는 JSON은 response.data로 접근할 수 있다.
        const apiUrl = 'https://newsapi.org/v2/top-headlines';
        const response = await axios.get(apiUrl, {
            // 연동 규격서에 명시된 요청 변수들 정의
            params: { apiKey: 'b3dfd20662fa4437aeade19b22cf5aa1', country: 'kr', category: category }
        });
        // Ajax 결과를 로그에 출력해 보자!!!
        console.group("통신결과");
        console.debug(response);
        console.groupEnd();

        /** loading값 false로, result를 채우고, error는 false로 처리 */
        // 여기서 전달하는 파라미터가 action 함수 안에서 `action.payload`가 된다.
        dispatch(searchSuccessAction({result: response.data}));

    } catch(e){
        //에러가 발생했음을 알림 -> loading값 false, error값 true
        dispatch(searchFailureAction());
    }
}