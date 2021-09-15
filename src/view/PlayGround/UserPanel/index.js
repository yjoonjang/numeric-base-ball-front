import React from 'react';
import { useCallback } from 'react';
import './index.css';

const UserPanel = (props) => {
    const { answerLength, handleKeyPress } = props;

    const onUserGuessInput = useCallback((event) => {
        const LengthLimit = (event) => {
            if (event.target.value.length > answerLength) {
                event.target.value = event.target.value.slice(0, answerLength);
            }
        };
        // onUserGuessInput()
        return LengthLimit(event);
    }, []);

    return (
        <div>
            <input
                className="userpanel-container"
                type="number"
                maxLength={answerLength}
                onInput={onUserGuessInput}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default UserPanel;
