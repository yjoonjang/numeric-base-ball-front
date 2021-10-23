import { useHistory } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:65100/user').then((res) => {
            const result = res.data;
            if (result.length > 0) {
                setUser(result[0]);
            } else {
                setUser(null);
            }
        });
        return;
    }, []);

    const history = useHistory();
    const onGameStartButtonClick = useCallback(() => {
        history.push('/Play-ground');
    });
    const onCreateAccount = useCallback(() => {
        history.push('/Create-Account');
    });
    const onLogin = useCallback(() => {
        history.push('/Login');
    });

    return (
        <div className="container flex-column">
            <div className="game-name">숫자 야구</div>
            <button className="game-start-button" onClick={onGameStartButtonClick}>
                {user?.nickname}님의 게임 시작
            </button>
            <div className="flex Join-Login-btn" style={{ marginTop: -16 }}>
                <button className="game-start-button" onClick={onCreateAccount}>
                    회원가입
                </button>
                <button className="game-start-button" onClick={onLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
};

export default Home;
