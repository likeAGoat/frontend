import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as couterActions from './modules/counter';
import * as postActions from './modules/post';

class App extends Component {
  // loadData = () => {
  //   const {PostActions,number} = this.props;
  //   PostActions.getPost(number).then(
  //     (response) => {
  //       console.log(response);
  //     }
  //   ).catch(
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  loadData = async () => {
    const {PostActions,number} = this.props;
    try{
      const response = await PostActions.getPost(number);
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }
  //- DOM노드를 확인하고 초기화해야 하는 작업이 있는 경우
  componentDidMount(){
    // 추후 getPost 호출
    this.loadData();
  }

  componentDidUpdate(prevProps,prevState){
    //이전 number와 현재 number가 다르면 요청을 시작합니다.
    if(this.props.number !== prevProps.number){
      this.loadData();
    }
  }
  render() {
    //리덕스 스토어의 상태와
    const { CounterActions, number, post, error, loading} = this.props;
    return (
      <div>
        <h1>{number}</h1>
        {
          loading
          ?(<h2>로딩중...</h2>)
          :(
            error
            ?(<h2>오류 발생!</h2>)
            :(
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            )
          )
        }
        <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button>
      </div>
    );
  }
}

//액션 생성 함수들을 연동시켜줌
//export하는 부분에서 connect를 사용하여 리덕스에 연결시키고 내보낸다.
//첫번 째 파라미터 : // 리덕스 state를 리액트state로 맵핑시켜주겠다. 리덕스 state인 counter가 리액트 props인 number로 연결이 됨
//두번 째 파라미터 : // 액션 자체를 dispatch해서 리턴해줌
export default connect(
  (state) => ({
    number: state.counter,
    post: state.post.data,
    loading: state.post.pending,
    error: state.post.error
  }),
  (dispatch) => ({
    CounterActions: bindActionCreators(couterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(App);