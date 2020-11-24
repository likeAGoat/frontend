import React, { Component } from 'react';
import styles from './TodoItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoItem extends Component {
  //todos 배열을 실제로 업데이트하는 상황 -> TodoItem컴포넌트가 리렌더링되어야 하는 경우는 done값이 바뀔 때 뿐
  //사용 가능한 상황
  //1. 컴포넌트 배열이 렌더링되는 리스트 컴포넌트일 때
  //2. 리스트 컴포넌트 내부에 있는 아이템 컴포넌트일 때
  //3. 하위 컴포넌트의 개수가 많으며, 리렌더링되지 말아야 할 상황에서도 리렌더링이 진행될 때
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.done !== nextProps.done;
  }

  render() {
    const {done, children, onToggle, onRemove} = this.props;
    /* 위 코드에선 비구조화 할당을 통하여 this.props 안에 있는
       done, children, onToggle, onRemove 에 대한 레퍼런스를 만들어주었습니다. */
    return (
      <div className={cx('todo-item')} onClick={onToggle}>
        <input className={cx('tick')} type="checkbox" checked={done} readOnly/>
        <div className={cx('text', { done })}>{children}</div>
        <div className={cx('delete')} onClick={(e) => {
          onRemove();
          e.stopPropagation();
          }
        }>[지우기]</div>
      </div>
    );
  }
}

export default TodoItem;
