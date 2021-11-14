import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCallback, useMemo } from 'react';
import './index.css';
import axios from 'axios';
import { ValidationForm } from '../CreateAccount/Components/Validation/index';
import '../CreateAccount/Components/Validation/index.css';
import { useCookies } from 'react-cookie';

const base64 = require('base-64');

/* 
아이디 오류 -> code = 1
닉네임 오류 -> code = 2
*/

const Login = (props) => {
    const history = useHistory();
    const [profile, setProfile] = useState({
        id: '',
        password: '',
        passwordRepeat: '',
        nickname: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['data']);

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const setGlobalCookie = (id, password, nickname) => {
        setCookie('data', { id, password, nickname }, { path: '/' });
    };

    //base64 관련
    // const encodedProfile = () => ({
    //     id: base64.encode(profile.id),
    //     password: base64.encode(profile.password),
    //     // nickname: base64.encode(profile.nickname),
    // });

    const onLogin = useCallback(() => {
        axios
            // .post('http://localhost:65100/auth', encodedProfile())
            .post('http://localhost:65100/auth', profile)
            .then((res) => {
                alert('로그인이 완료되었습니다.');
                const result = res.data;
                setGlobalCookie(`${profile.id}`, `${profile.password}`, `${result[0].nickname}`);
                history.push('/');
                return;
            })

            .catch((error) => {
                const { code, message } = error.response.data;
                setErrorCode(code);
                setErrorMessage(message);
                console.log(errorCode, errorMessage);
                if (errorCode === 1) {
                    document.getElementsByClassName('id-input-container')[0].focus();
                    return;
                }
                if (errorCode === 2) {
                    document.getElementsByClassName('password-input-container')[0].focus();
                    return;
                }
            });
    }, [profile, errorCode, errorMessage]);

    return (
        <div className="create-account-container">
            <div className="create-account-form flex-column border-round">
                <div className="join-word">로그인</div>
                <div className="input-container-wrap">
                    <div className="input-container">
                        <h4>아이디</h4>
                        <ValidationForm
                            className="id-input-container"
                            containerStyle={{
                                width: '240px',
                            }}
                            style={{
                                textAlign: 'center',
                            }}
                            hintstyle={{
                                textAlign: 'center',
                            }}
                            value={profile.id}
                            validations={[
                                (value) => ({
                                    result1: value && value.length >= 5,
                                    errorMessage1: '아이디를 5자리 이상 입력해 주세요.',
                                    result2: errorCode !== 1,
                                    errorMessage2: '존재하지 않는 아이디 입니다.',
                                }),
                            ]}
                            placeholder="아이디를 5자리 이상 입력해 주세요."
                            onChange={(event) => setProfile({ ...profile, id: event.target.value })}
                        />
                    </div>

                    <div className="input-container">
                        <h4>비밀번호</h4>
                        <ValidationForm
                            className="password-input-container"
                            containerStyle={{
                                width: '240px',
                            }}
                            type="password"
                            style={{
                                textAlign: 'center',
                            }}
                            hintstyle={{
                                textAlign: 'center',
                            }}
                            value={profile.password}
                            validations={[
                                (value) => ({
                                    result1: value && value.length >= 5,
                                    errorMessage1: '비밀번호를 5자리 이상 입력해 주세요.',
                                    result2: errorCode !== 2,
                                    errorMessage2: '비밀번호가 일치하지 않습니다.',
                                }),
                            ]}
                            placeholder="비밀번호를 5자리 이상 입력해 주세요."
                            onChange={(event) => setProfile({ ...profile, password: event.target.value })}
                        />
                    </div>
                </div>
                <span className="join-btn-container">
                    <button className="join-button" onClick={onLogin}>
                        로그인
                    </button>
                    <button className="join-button" onClick={onHomeButtonClick}>
                        돌아가기
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Login;
