import React from "react";

import { Route, Link, Switch } from "react-router-dom";// route 기능을 위한 패키지에서 Route 함수와 Link 함수, Switch함수만 골라서 참조

import TodoList from './pages/TodoList';
import NewsListPage from './pages/NewsListPage';
import Error404 from './pages/Error404';

import styles from './assets/styles.scss';

const App = () => {
    return (
        <div>
            {/* --- 페이지로 링크 적용 --- */}
            <div className="nav-menu">
                <Link className="nav-link" to="/">TodoList</Link>
                <Link className="nav-link" to="/newsListPage">News</Link>
            </div>

            {/* --- 페이지로 사용될 컴포넌트들 명시하기 --- */}
            <Switch>
                {/* 첫 페이지로 사용되는 컴포넌트의 경우 exact={true}를 명시해야 한다. */}
                {/* 첫 페이지로 사용되는 컴포넌트는 path에 "/"를 권장 */}
                <Route path="/" component={TodoList} exact={true} />
                {/* 서브라우팅 사용 */}
                {/* Path 파라미터로 카테고리 값을 받는 페이지 구성 */}
                {/* ":변수이름?" 에서 물음표는 해당 변수가 선택적이라는 의미 ->라우팅시 :category같이 추가적인 정보가 필요한 경우 match이용*/}
                <Route path="/newsListPage/:category?" component={NewsListPage} />
                {/* path 속성 없이 Route 지정 -> 지정되지 않은 모든 요청에 반응. 단 switch블록의 맨 마지막에 배치해야함  */}
                <Route component={Error404} />
            </Switch>
        </div>
    );
};

export default App;
