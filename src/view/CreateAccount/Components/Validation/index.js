import react from 'react';
import { useMemo, useState } from 'react';
import './index.css';

const onErrorStyle = {
    border: 'solid 3px red',
};

export function ValidationForm({ value = '', validations = [], containerStyle = {}, ...props }) {
    const [errorMessage, setErrorMessage] = useState('');
    const isValid = useMemo(() => {
        for (const validation of validations) {
            const { result1, errorMessage1, result2, errorMessage2 } = validation(value);
            if (!result1) {
                setErrorMessage(errorMessage1);
                return result1;
            } else if (!result2) {
                setErrorMessage(errorMessage2);
                return result1;
            }
            setErrorMessage('');
            return true;
        }
    }, [validations]);

    const style = useMemo(() => {
        if (isValid) {
            return props.style;
        }

        return {
            ...props.style,
            ...onErrorStyle,
        };
    }, [isValid, props.style]);

    return (
        <div className="validation-form-container" style={containerStyle}>
            <input className="validation-text-input" value={value} {...props} style={style} />
            <span className="error-message" style={props.hintstyle}>
                {errorMessage}
            </span>
        </div>
    );
}
