import React from 'react';
import styled, {keyframes} from 'styled-components';
import GlobalStyle from '../../assets/global-style';

const dance = keyframes`
    0%, 40%, 100% {
        transform: scaleY(0.4);
        transform-origin: center 100%;
    }
    20% {
        transform: scaleY(1)
    }
`;

const Loading = styled.div`
    height: 10px;
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 10px;
    >div {
        display: inline-block;
        height: 100%;
        width: 1px;
        margin-right:2px;
        background: ${GlobalStyle['theme-color']};
        animation: ${dance} 1s infinite;
    }
    >div{
        &:nth-child(2){
            animation-delay: -0.4s;
        }
        &:nth-child(3){
            animation-delay: -0.6s;
        }
        &:nth-child(4){
            animation-delay: -0.5s;
        }
        &:nth-child(5){
            animation-delay: -0.2s;
        }
    }
`;

function LoadingV2() {
    return (
        <Loading>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <span>拼命加载中...</span>
        </Loading>
    )
}

export default React.memo(LoadingV2);