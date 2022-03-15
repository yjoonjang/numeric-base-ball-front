import react from 'react';
import { useMemo, useState } from 'react';
import './index.css';

const onErrorStyle = {
    border: 'solid 2px red',
};

const onValidStyle = {
    border: 'solid 2px #4EE87A',
};

export function ValidationForm({ value = '', errors = {}, validations = [], containerStyle = {}, ...props }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [properMessage, setProperMessage] = useState('');

    const isValid = useMemo(() => {
        // console.log(errors);
        if (errors && errors.properMessage !== undefined && errors.result !== undefined) {
            setProperMessage(errors.properMessage);
            return errors.result;
        }
        for (const validation of validations) {
            const { result, errorMessage } = validation(value);
            if (!result) {
                setErrorMessage(errorMessage);
                return result;
            }
            setErrorMessage('');
            return true;
        }
    }, [validations]);
    const style = useMemo(() => {
        if (isValid) {
            return {
                ...props.style,
                ...onValidStyle,
            };
        }

        return {
            ...props.style,
            ...onErrorStyle,
        };
    }, [isValid, props.style]);

    return (
        <div className="flex flex-col items-center" style={containerStyle}>
            <input className=" input-box drop-shadow-xl" value={value} {...props} style={style} />
            {isValid ? (
                <span className="proper-message font-extrabold pt-0.5 " style={props.hintstyle}>
                    {properMessage}
                </span>
            ) : (
                <span className="error-message font-extrabold pt-0.5 " style={props.hintstyle}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
