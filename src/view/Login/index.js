import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCallback, useMemo } from 'react';
import './index.css';
import axios from 'axios';
import { ValidationForm } from '../Components/Validation/index';
import '../Components/Validation/index.css';
import { useCookies } from 'react-cookie';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';
import styled from 'styled-components';

/* 
아이디 오류 -> code = 1
닉네임 오류 -> code = 2
*/

const Login = (props) => {
    const history = useHistory();
    const [profile, setProfile] = useState({
        user_id: '',
        password: '',
        passwordRepeat: '',
        nickname: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [ColorStyle, setColorStyle] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['data']);

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const onCreateAccount = useCallback(() => {
        history.push('/Create-Account');
    });

    const setGlobalCookie = (id, user_id, nickname) => {
        setCookie('data', { id, user_id, nickname }, { path: '/' });
    };

    const onValidLoginButton = () => {
        if (profile.user_id && profile.user_id.length >= 5 && profile.password && profile.password.length >= 5) {
            console.log('조건 만족_로그인_버튼');
            return '#4EE87A';
        }
    };

    const onValidLoginButtonText = () => {
        if (profile.user_id && profile.user_id.length >= 5 && profile.password && profile.password.length >= 5) {
            console.log('조건 만족_로그인_텍스트');
            return 'black';
        }
    };

    //base64 관련
    // const encodedProfile = () => ({
    //     id: base64.encode(profile.id),
    //     password: base64.encode(profile.password),
    //     // nickname: base64.encode(profile.nickname),
    // });

    const onLogin = useCallback(() => {
        axios
            .post('http://localhost:65100/auth', profile)
            .then((res) => {
                alert('로그인이 완료되었습니다.');
                const { id, nickname } = res.data[0];
                setGlobalCookie(`${id}`, `${profile.user_id}`, `${nickname}`);
                history.push('/');
                return;
            })

            .catch((error) => {
                const { code, message } = error.response.data;
                setErrorCode(code);
                setErrorMessage(message);
                if (errorCode === 1) {
                    document.getElementsByClassName('id-input-box')[0].focus();
                    return;
                }
                if (errorCode === 2) {
                    document.getElementsByClassName('password-input-box')[0].focus();
                    return;
                }
            });
    }, [profile, errorCode, errorMessage]);

    return (
        <div className="login-container flex justify-center items-center h-full ">
            <div className="login-box-container items-center">
                <div className=" login-text text-center font-bold ">Login</div>
                <div className=" input-container-wrap flex flex-col items-center">
                    <div className="id-input-container">
                        <h2 className=" label-text font-bold  pb-1">Id</h2>
                        <ValidationForm
                            className=" id-input-box rounded-md font-bold "
                            style={{
                                textAlign: 'left',
                                paddingLeft: '12px',
                            }}
                            value={profile.user_id}
                            errors={
                                profile.user_id && profile.user_id.length >= 5
                                    ? {
                                          result: true,
                                          properMessage: '올바른 형식의 아이디입니다.',
                                      }
                                    : undefined
                            }
                            validations={[
                                (value) => ({
                                    result: value && value.length >= 5,
                                    errorMessage: '아이디를 5자리 이상 입력해 주세요.',
                                }),
                                () => ({
                                    result: errorCode !== 1,
                                    errorMessage: '아이디가 존재하지 않습니다.',
                                }),
                            ]}
                            placeholder="아이디 (등록된 아이디: test1)"
                            onChange={(event) => setProfile({ ...profile, user_id: event.target.value })}
                        />
                    </div>

                    <div className="password-input-container ">
                        <h2 className=" label-text font-bold pb-1">Password</h2>
                        <ValidationForm
                            className=" password-input-box rounded-md font-bold "
                            type="password"
                            style={{
                                textAlign: 'left',
                                paddingLeft: '12px',
                            }}
                            value={profile.password}
                            errors={
                                profile.password && profile.password.length >= 5
                                    ? {
                                          result: true,
                                          properMessage: '올바른 형식의 비밀번호입니다.',
                                      }
                                    : undefined
                            }
                            validations={[
                                (value) => ({
                                    result: value && value.length >= 5,
                                    errorMessage: '비밀번호를 5자리 이상 입력해 주세요.',
                                }),
                                () => ({
                                    result: errorCode !== 2,
                                    errorMessage: '비밀번호가 일치하지 않습니다.',
                                }),
                            ]}
                            displayExpr="displayError"
                            placeholder="비밀번호 (등록된 비밀번호: test1)"
                            onChange={(event) => setProfile({ ...profile, password: event.target.value })}
                        />
                    </div>
                </div>
                <span className=" other-button-container justify-between">
                    <button className="other-button text-opacity-75 font-semibold" onClick={onCreateAccount}>
                        Create Account
                    </button>
                    <button className="other-button text-opacity-75 font-semibold" onClick={onHomeButtonClick}>
                        Go Home
                    </button>
                </span>
                <div className=" login-button-container align-middle ">
                    <button
                        className=" login-button items-center rounded-2xl font-bold shadow-xl "
                        style={{ backgroundColor: onValidLoginButton(), color: onValidLoginButtonText() }}
                        onClick={onLogin}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
