import React, { Component } from 'react';
import Buttons from '../components/Buttons';
import CounterListContainer from './CounterListContainer';
import getRandomColor from '../lib/getRandomColor';

import { connect } from 'react-redux';
import * as actions from '../actions';

/**
 * 다음으로 App 컴포넌트를 리덕스에 연결시킵니다. 이 컴포넌트에는 store에서 필요한 값이 없으니
 * mapStateToProps는 null로 설정하고, 버튼용 mapDispatchToProps를 만드세요.
 * 이 컴포넌트에서 onCreate와 onRemove를 만들고, Buttons 컴포넌트의 props로 전달하겠습니다.
 */
class App extends Component {
    render() {
        const {onCreate,onRemove} = this.props;
        return (
            <div className="App">
                <Buttons
                    onCreate={onCreate}
                    onRemove={onRemove}
                />
                <CounterListContainer/>
            </div>
        );
    }
}

// 액션 생성 함수 준비
const mapToDispatch = (dispatch) => ({
    onCreate: () => dispatch(actions.create(getRandomColor())),
    onRemove: () => dispatch(actions.remove())
});

//리덕스에 연결시키고 내보냅니다.
export default connect(null,mapToDispatch)(App);