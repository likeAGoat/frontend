import React from 'react';

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from 'react-redux';
// 모듈기능 참조
import * as newsReducer from '../reducers/news';

// 컴포넌트 참조
import Top from '../components/NewsList/Top';
import NewsList from '../components/NewsList/NewsList';


const NewsListPage = ({match}) => {
    console.group('NewsListPage');
    console.debug('category >> ' + match.params.category);
    console.groupEnd();

    /** Hook 기능을 통해 리덕스 상태값 가져오기 */
    const { result, loading, error} = useSelector((state) => {
        return {
            ...state.news,
        };
    });

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    /** match 값이 변경될 때만 실행되는 hook 정의 */
    // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
    // match.params로 데이터 넘겨주기 https://medium.com/@ghur2002/react-router%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-component%EA%B0%84%EC%97%90-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0-610de3511c67
    // 이걸 안하면 뉴스리스트가 매칭이 안됨!
    // 공부하기
    React.useEffect(() => {
        const { category } = match.params;
        dispatch(newsReducer.newsAsync(category));
    }, [match]);

    return (
        <div className="news_wrap">
            <Top/>
            {loading ?(
                <div>로딩 중...</div>
            ) : (
                //result가 참인 경우 ()노출
                result && (
                    <NewsList articles={result.articles}/>
                )
            )}
        </div>
    );
};

export default NewsListPage;