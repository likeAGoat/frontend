import React from 'react';

import MyNavLink from './MyNavLink.js';

import styles from './Top.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Top = ({match}) => {
    return (
        <div>
            {/* bootstrap 메뉴바, 색상반전, 상단 고정 */}
            <nav className={cx('navbar')}>
                {/* 메뉴 안에서의 컨텐츠 영역 넓이 조정 */}
                <div className={cx('container')}>

                    {/* 메뉴 영역 */}
                    <div className={cx('navbar-menu')} id='navbar-collapse'>
                        <ul className={cx('navbar-list')}>
                            <MyNavLink activeClassName="active" to="/">전체보기</MyNavLink>
                            <MyNavLink activeClassName="active" to="/business">비즈니스</MyNavLink>
                            <MyNavLink activeClassName="active" to="/entertainment">엔터테인먼트</MyNavLink>
                            <MyNavLink activeClassName="active" to="/health">건강</MyNavLink>
                            <MyNavLink activeClassName="active" to="/science">과학</MyNavLink>
                            <MyNavLink activeClassName="active" to="/sports">스포츠</MyNavLink>
                            <MyNavLink activeClassName="active" to="/technology">기술</MyNavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

// 페이지 이동 기능 사용하기 (2)
export default Top;
