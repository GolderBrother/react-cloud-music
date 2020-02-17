import styled, { keyframes } from 'styled-components';
import GlobalStyle from '../../../assets/global-style';
export const rotate = keyframes`
    0%{
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const MiniPlayerContainer = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    width: 100%;
    height: 60px;
    background: ${GlobalStyle["highlight-background-color"]};
    &.mini-enter {
        transform: translate3d(0, 100%, 0);
    }
    &.mini-enter-active {
        transform: translate3d(0, 0, 0);
        transition: all .4s;
    }
    &.mini-exit-active {
        transform: translate3d(0, 100%, 0);
        transition: all .4s;
    }
    .icon {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        padding: 0px 10px 0px 20px;
        .imgWrapper {
            width: 100%;
            height: 100%;
            img {
                border-radius: 50%;
                &.play {
                    animation: ${rotate} 10s infinite;
                    &.pause {
                        animation-play-state: paused;
                    }
                }
                
            }
        }
    }
    .text {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        line-height: 20px;
        flex: 1 1 0%;
        overflow: hidden;
        .name {
            margin-bottom: 2px;
            font-size: ${GlobalStyle["font-size-m"]};
            color: ${GlobalStyle["font-color-desc"]};
            ${GlobalStyle.noWrap()}
        }
        .desc {
            font-size: ${GlobalStyle["font-size-s"]};
            color: ${GlobalStyle["font-color-desc-v2"]};
            ${GlobalStyle.noWrap()}
        }
    }
    .control {
        flex: 0 0 30px;
        padding: 0px 10px;
        .iconfont, .icon-playlist {
            font-size: 30px;
            color: ${GlobalStyle["theme-color"]};
        }
        .icon-mini {
            font-size: 16px;
            position: absolute;
            left: 8px;
            top: 8px;
            &.icon-play {
                left: 9px;
            }
        }
    }

`;