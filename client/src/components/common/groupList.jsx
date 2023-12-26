import React from 'react';

const GroupList = ({ items, selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group mb-3">
            {Object.keys(items).map(item => (
                <li
                    key={item}
                    className={
                        'list-group-item' +
                        (items[item] === selectedItem ? ' active' : '')
                    }
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item].name}
                </li>
            ))}
        </ul>
    );
};

export default GroupList;
