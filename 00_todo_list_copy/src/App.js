import React from "react";

// route 기능을 위한 패키지에서 Route 함수와 Link 함수, Switch함수만 골라서 참조
import { Route, Link, Switch } from "react-router-dom";

import TodoList from './components/PageTemplate/TodoList';
import NewsList from './components/PageTemplate/NewsList';
import Error404 from './components/PageTemplate/Error404';

const App = () => {
    return (
        <div>
            {/* --- 페이지로 링크 적용 --- */}
            <Link to="/">[TodoList]</Link>
            <Link to="/newsList">[News]</Link>

            {/* --- 페이지로 사용될 컴포넌트들 명시하기 --- */}
            <Switch>
                {/* 첫 페이지로 사용되는 컴포넌트의 경우 exact={true}를 명시해야 한다. */}
                {/* 첫 페이지로 사용되는 컴포넌트는 path에 "/"를 권장 */}
                <Route path="/" component={TodoList} exact={true} />
                {/* 서브라우팅 사용 */}
                <Route path="/newsList" component={NewsList} />
                {/* path 속성 없이 Route 지정 -> 지정되지 않은 모든 요청에 반응. 단 switch블록의 맨 마지막에 배치해야함  */}
                <Route component={Error404} />
            </Switch>
        </div>
    );
};

export default App;
