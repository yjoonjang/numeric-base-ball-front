import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useCallback, useMemo } from 'react';
import './index.css';
import axios from 'axios';

/* 
아이디 오류 -> code = 1
닉네임 오류 -> code = 2
*/

const CreateAccount = (props) => {
    const history = useHistory();
    const [profile, setProfile] = useState({
        id: '',
        password: '',
        passwordRepeat: '',
        nickname: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const onJoin = useCallback(() => {
        //과제 : 밑에 구조를 어떻게 컴포넌트화 시킬 지 메세지 폼
        if (!profile.id || profile.id.length < 5) {
            const message = '아이디를 5자리 이상 입력해 주세요.';
            setErrorMessage(message);
            document.getElementById('id-input').focus();
            document.getElementById('id-error-place').innerHTML = message;
            return;
        }

        if (!profile.password || profile.password.length < 5) {
            errorMessage = '비밀번호를 5자리 이상 입력해 주세요.';
            document.getElementById('password-input').focus();
            document.getElementById('password-error-place').innerHTML = errorMessage;
            return;
        }

        if (profile.password !== profile.passwordRepeat) {
            errorMessage = '비밀번호가 일치하지 않습니다.';
            document.getElementById('passwordRepeat-input').focus();
            document.getElementById('passwordRepeat-error-place').innerHTML = errorMessage;
            return;
        }

        if (!profile.nickname || profile.nickname.length < 2) {
            errorMessage = '닉네임을 2자리 이상 입력해 주세요.';
            document.getElementById('nickname-input').focus();
            document.getElementById('nickname-error-place').innerHTML = errorMessage;
            return;
        }

        axios
            .post('http://localhost:65100/join', profile)
            .then(() => {
                alert('회원가입이 완료되었습니다.');
                return;
            })

            .catch((error) => {
                const { code, message } = error.response.data;
                console.log(code);
                errorMessage = message;

                if (code === 1) {
                    document.getElementById('id-input').focus();
                    document.getElementById('id-error-place').innerHTML = errorMessage;
                    return;
                }

                if (code === 2) {
                    document.getElementById('nickname-input').focus();
                    document.getElementById('nickname-error-place').innerHTML = errorMessage;
                    return;
                }
            });
    }, [profile]);

    const formStyle = useMemo(() => {
        if (errorMessage && errorMessage.length > 0) {
            console.log(errorMessage);
            return {
                border: 'solid 3px red',
            };
        }
        console.log(errorMessage, errorMessage && errorMessage.length);
        return {};
    }, [errorMessage]);

    return (
        <div className="create-account-container">
            <div className="create-account-form flex-column border-round">
                <div className="join-word">회원가입</div>
                <div className="id-input-container">
                    <h4>아이디</h4>
                    <input
                        className="input-box border-round"
                        id="id-input"
                        style={formStyle}
                        value={profile.id}
                        placeholder="아이디를 5자리 이상 입력해 주세요."
                        onChange={(event) => setProfile({ ...profile, id: event.target.value })}
                    />
                </div>
                <div id="id-error-place"></div>

                <div className="input-container">
                    <h4>비밀번호</h4>
                    <input
                        type="password"
                        className="input-box border-round"
                        id="password-input"
                        style={{ marginLeft: 70 }}
                        value={profile.password}
                        placeholder="비밀번호를 5자리 이상 입력해 주세요."
                        onChange={(event) => setProfile({ ...profile, password: event.target.value })}
                    />
                </div>
                <div id="password-error-place"></div>

                <div className="input-container">
                    <h4 style={{ marginRight: 64 }}>비밀번호 확인</h4>
                    <input
                        type="password"
                        className="input-box border-round"
                        id="passwordRepeat-input"
                        style={{ marginLeft: -24 }}
                        value={profile.passwordRepeat}
                        onChange={(event) => setProfile({ ...profile, passwordRepeat: event.target.value })}
                    />
                </div>
                <div id="passwordRepeat-error-place"></div>

                <div className="input-container">
                    <h4 style={{ marginRight: 40 }}>닉네임</h4>
                    <input
                        className="input-box border-round"
                        id="nickname-input"
                        style={{ marginLeft: 44 }}
                        placeholder="닉네임을 2자리 이상 입력해 주세요."
                        value={profile.nickname}
                        onChange={(event) => setProfile({ ...profile, nickname: event.target.value })}
                    />
                </div>
                <div id="nickname-error-place"></div>

                <div className="btn-container">
                    <button className="join-btn" onClick={onJoin}>
                        회원가입
                    </button>
                    <button className="join-btn" onClick={onHomeButtonClick}>
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
