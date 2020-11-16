import React from 'react';
import PropTypes from 'prop-types';

import './Buttons.css';

// 이 컴포넌트는 버튼 두 개를 내장하고 있으며, 새 카운터를 생성하는 onCreate 함수, 마지막 카운터를 제거할 onRemove 함수를 props로 전달받습니다.
const Buttons = ({onCreate,onRemove}) => {
    return(
        <div className="Buttons">
            <div className="btn add" onClick={onCreate}>생성</div>
            <div className="btn remove" onClick={onRemove}>제거</div>
        </div>
    )
}

Buttons.propTypes = {
    onCreate: PropTypes.func,
    onRemove: PropTypes.func
};

Buttons.defaultProps = {
    onCreate: () => console.warn('onCreate not defined'),
    onRemove: () => console.warn('onRemove not defined')
};

export default Buttons;