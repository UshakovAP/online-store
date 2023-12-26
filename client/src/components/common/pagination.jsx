import React from 'react';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    if (pagesCount === 1) return null;

    return (
        <ul className="pagination mb-2 overflow-x-auto">
            {pages.map(page => (
                <li
                    key={'page-' + page}
                    className={
                        'page-item' + (page === currentPage ? ' active' : '')
                    }
                    role="button"
                >
                    <a className="page-link" onClick={() => onPageChange(page)}>
                        {page}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
