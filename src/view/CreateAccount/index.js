import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useCallback, useMemo } from 'react';
import './index.css';
import axios from 'axios';
import { ValidationForm } from '../Components/Validation/index';
import { useCookies } from 'react-cookie';
import 'tailwindcss/tailwind.css';

/* 
아이디 오류 -> code = 1
닉네임 오류 -> code = 2
*/

const CreateAccount = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['data']);
    const history = useHistory();
    const [profile, setProfile] = useState({
        user_id: '',
        password: '',
        passwordRepeat: '',
        nickname: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCode, setErrorCode] = useState('');

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const setGlobalCookie = (id, user_id, nickname) => {
        setCookie('data', { id, user_id, nickname }, { path: '/' });
    };

    const onJoin = useCallback(() => {
        axios
            .post('http://localhost:65100/join', profile)
            .then((res) => {
                console.log(res.data[0]);
                const { id } = res.data[0];
                console.log(id);
                alert('회원가입이 완료되었습니다.');
                setGlobalCookie(id, profile.user_id, profile.nickname);
                history.push('/');
                return;
            })

            .catch((error) => {
                const { code, message } = error.response.data;
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
        <div className="login-container flex justify-center items-center h-full ">
            <div className="login-box-container pt-10 items-center">
                <div className=" login-text text-center font-bold ">Create Account</div>
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
                            placeholder=""
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
                            ]}
                            displayExpr="displayError"
                            placeholder=""
                            onChange={(event) => setProfile({ ...profile, password: event.target.value })}
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
                            value={profile.passwordRepeat}
                            errors={
                                profile.passwordRepeat && profile.password === profile.passwordRepeat
                                    ? {
                                          result: true,
                                          properMessage: '비밀번호가 일치합니다.',
                                      }
                                    : undefined
                            }
                            validations={[
                                (value) => ({
                                    result: value && value.length >= 5,
                                    errorMessage: '비밀번호를 5자리 이상 입력해 주세요.',
                                }),
                                (value) => ({
                                    result: value === profile.password,
                                    errorMessage: '비밀번호가 일치하지 않습니다.',
                                }),
                            ]}
                            displayExpr="displayError"
                            placeholder=""
                            onChange={(event) => setProfile({ ...profile, passwordRepeat: event.target.value })}
                        />
                    </div>
                    <div className="password-input-container ">
                        <h2 className=" label-text font-bold pb-1">Nickname</h2>
                        <ValidationForm
                            className=" password-input-box rounded-md font-bold "
                            type="password"
                            style={{
                                textAlign: 'left',
                                paddingLeft: '12px',
                            }}
                            value={profile.nickname}
                            errors={
                                profile.nickname && profile.nickname.length >= 2
                                    ? {
                                          result: true,
                                          properMessage: '올바른 형식의 닉네임입니다.',
                                      }
                                    : undefined
                            }
                            validations={[
                                (value) => ({
                                    result: value && value.length >= 2,
                                    errorMessage: '닉네임을 2자리 이상 입력해 주세요.',
                                }),
                                (value) => ({
                                    result: errorCode !== 2,
                                    errorMessage: '이미 존재하는 닉네임입니다.',
                                }),
                            ]}
                            displayExpr="displayError"
                            placeholder=""
                            onChange={(event) => setProfile({ ...profile, nickname: event.target.value })}
                        />
                    </div>
                </div>
                <span className=" other-button-container justify-between">
                    <button className="other-button text-opacity-75 font-semibold">Create Account</button>
                    <button className="other-button text-opacity-75 font-semibold" onClick={onHomeButtonClick}>
                        Go Home
                    </button>
                </span>
                <div className=" login-button-container align-middle ">
                    <button className=" login-button items-center rounded-2xl font-bold shadow-xl " onClick={onJoin}>
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
