//CounterList 컴포넌트를 만들겠습니다. 이 컴포넌트는 카운터 객체들의 배뎔 counter와 카운터 값을 조작하는
//onIncrement,onDecrement,onSetColor함수를 props로 전달받습니다.

import React from "react";
import Counter from "./Counter";
import PropTypes from "prop-types";

import "./CounterList.css";
const CounterList = ({ counters, onIncrement, onDecrement, onSetColor }) => {
    const counterList = counters.map((counter, i) => (
        <Counter
            key={i}
            index={i}
            {...counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onSetColor={onSetColor}
        />
    ));

    return <div className="CounterList">{counterList}</div>;
};

CounterList.propTypes = {
    counters: PropTypes.arrayOf(
        PropTypes.shape({ color: PropTypes.string, number: PropTypes.number })
    ),
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onSetColor: PropTypes.func,
};

CounterList.defaultProps = {
    counters: [],
};

export default CounterList;
