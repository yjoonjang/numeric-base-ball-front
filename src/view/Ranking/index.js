import React, { useCallback } from 'react';
import './index.css';
import { useLocation } from 'react-router';
import { set } from 'js-cookie';

export function Ranking() {
    const location = useLocation();
    const setRank = location.state.setRank;
    const { rank1, rank1NickName, rank2, rank2NickName, rank3, rank3NickName } = setRank();

    return (
        <div className="Ranking-container">
            <div className="Ranking-form flex-column">
                <h1>명예의 전당</h1>
                rank1 : {rank1NickName} {rank1}
                rank2 : {rank2NickName} {rank2}
                rank3 : {rank3NickName} {rank2}
            </div>
        </div>
    );
}
