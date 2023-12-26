import React from 'react';
import TheButton from './controls/theButton';
import TheInput from './controls/theInput';

const Counter = ({ onIncrement, itemCount, onChange, onDecrement }) => {
    return (
        <div className="d-flex mx-3">
            <TheButton
                className="btn btn-primary"
                type="button"
                onClick={onIncrement}
                text="+"
            />

            <TheInput
                style={{ width: 75, textAlign: 'center' }}
                type="number"
                value={itemCount}
                onChange={onChange}
            />

            <TheButton
                className="btn btn-primary"
                type="button"
                onClick={onDecrement}
                disabled={itemCount > 1 ? false : true}
                text="-"
            />
        </div>
    );
};

export default Counter;
