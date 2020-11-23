import React from 'react';

import styles from './NewsList.scss';
import classNames from 'classnames/bind';

import moment from 'moment';

const cx = classNames.bind(styles);

const NewsList = ({articles}) => {
    console.group("NewsList");
    console.group(articles);
    console.groupEnd();

    return (
        <div className={cx('page-wrap')}>
            <h2 className={cx('page-header')}>
                헤드라인 뉴스
            </h2>
            <ul className={cx('media-list')}>
                {articles.map((item, index) => (
                    <li className={cx('media-item')} key={index}>
                        {item.urlToImage && (
                            <div className={cx('media-left')}>
                                <a href={item.url} target="_blank" style={{
                                    background: 'url(' + item.urlToImage + ') no-repeat center center'
                                }}>
                                </a>
                            </div>
                        )}
                        <div className={cx('media-body')}>
                            <h4 className={cx('media-title')}>
                                <a href={item.url} target="_blank">{item.title}</a>
                            </h4>
                            <p className={cx('text-desc')}>{item.description}</p>
                            <p className={cx('text-info')}>
                                {item.source && (
                                    <span>{item.source.name}</span>
                                )}
                                {item.publishedAt && (
                                    <span>{moment(item.publishedAt).format('YY/MM/DD hh:mm')}</span>
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 검색 결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다.
NewsList.defaultProps = {
    articles: []
}

export default NewsList;