import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useCallback, useMemo } from 'react';
import './index.css';
import axios from 'axios';
import { ValidationForm } from './Components/Validation/index';
import { useCookies } from 'react-cookie';
/* 
아이디 오류 -> code = 1
닉네임 오류 -> code = 2
*/

const CreateAccount = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['data']);
    const history = useHistory();
    const [profile, setProfile] = useState({
        id: '',
        password: '',
        passwordRepeat: '',
        nickname: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCode, setErrorCode] = useState('');

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const setGlobalCookie = (id, password, nickname) => {
        setCookie('data', { id, password, nickname }, { path: '/' });
    };

    const onJoin = useCallback(() => {
        axios
            .post('http://localhost:65100/join', profile)
            .then(() => {
                alert('회원가입이 완료되었습니다.');
                history.push('/');
                return;
            })

            .catch((error) => {
                const { code, message } = error.response.data;
                console.log(error);
                setErrorCode(code);
                setErrorMessage(message);
                if (errorCode === 1) {
                    document.getElementsByClassName('id-input-container')[0].focus();
                    return;
                }
                if (errorCode === 2) {
                    document.getElementsByClassName('nickname-input-container')[0].focus();
                    return;
                }
            });
    }, [profile, errorCode, errorMessage]);

    return (
        <div className="create-account-container">
            <div className="create-account-form flex-column border-round">
                <div className="join-word">회원가입</div>
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
                                    errorMessage2: '이미 존재하는 아이디 입니다.',
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
                                }),
                            ]}
                            placeholder="비밀번호를 5자리 이상 입력해 주세요."
                            onChange={(event) => setProfile({ ...profile, password: event.target.value })}
                        />
                    </div>

                    <div className="input-container">
                        <h4>비밀번호 확인</h4>
                        <ValidationForm
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
                            value={profile.passwordRepeat}
                            validations={[
                                (value) => ({
                                    result1: value && value === profile.password,
                                    errorMessage1: '비밀번호가 일치하는 지 확인해 주세요.',
                                }),
                            ]}
                            placeholder="비밀번호를 다시 입력해 주세요."
                            onChange={(event) => setProfile({ ...profile, passwordRepeat: event.target.value })}
                        />
                    </div>

                    <div className="input-container">
                        <h4>닉네임</h4>
                        <ValidationForm
                            className="nickname-input-container"
                            containerStyle={{
                                width: '240px',
                            }}
                            style={{
                                textAlign: 'center',
                            }}
                            hintstyle={{
                                textAlign: 'center',
                            }}
                            value={profile.nickname}
                            validations={[
                                (value) => ({
                                    result1: value && value.length >= 3,
                                    errorMessage1: '닉네임을 3자리 이상 입력해 주세요.',
                                    result2: errorCode !== 2,
                                    errorMessage2: '이미 존재하는 닉네임입니다.`',
                                }),
                            ]}
                            placeholder="닉네임을 3자리 이상 입력해 주세요."
                            onChange={(event) => setProfile({ ...profile, nickname: event.target.value })}
                        />
                    </div>
                </div>

                <span className="join-btn-container">
                    <button className="join-button" onClick={onJoin}>
                        회원가입
                    </button>
                    <button className="join-button" onClick={onHomeButtonClick}>
                        돌아가기
                    </button>
                </span>
            </div>
        </div>
    );
};

export default CreateAccount;
