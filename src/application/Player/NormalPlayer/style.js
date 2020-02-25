import styled, {
    keyframes
} from 'styled-components';
import GlobalStyle from '../../../assets/global-style';
import needle from './imgs/needle.png';
import disc from './imgs/disc.png';
const rotate = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const NormalPlayerContainer = styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 150;
    background: ${GlobalStyle["background-color"]};
    &.normal-enter, &.normal-exit-done {
        .top {
            transform: translate3d(0, -100px, 0);
        }
        .bottom {
            transform: translate3d(0, 100px, 0);
        }
    }
    &.normal-enter-active,
    &.normal-exit-active {
        .top,
        .bottom {
            transform: translate3d(0, 0, 0);
            transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
        opacity: 1;
        transition: all 0.4s;
    }
    &.normal-exit-active {
        opacity: 0;
      }
    .background {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
        &.layer {
            opacity: 0.3;
            filter: none;
            background: ${GlobalStyle["font-color-desc"]};
        }
    }
`;

export const Top = styled.div`
    width: 100%;
    height: 8%;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid ${GlobalStyle["border-color-v2"]};
    padding-bottom: 5px;
    .back {
        margin-left: 5px;
        z-index: 50;
        .iconfont {
            display: block;
            padding: 9px;
            font-size: 24px;
            color: ${GlobalStyle["font-color-desc"]};
            font-weight: bold;
            transform: rotate(90deg);
        }
    }
    .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }
    .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: ${GlobalStyle["font-size-l"]};
        color: ${GlobalStyle["font-color-desc"]};
        ${GlobalStyle.noWrap()};
    }
    .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: ${GlobalStyle["font-size-m"]};
        color: ${GlobalStyle["font-color-desc-v2"]};
        ${GlobalStyle.noWrap()};
    }
`;

export const Middle = styled.div`
    position: fixed;
    width: 100%;
    top: 8%;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0px;
    overflow: hidden;
`;

export const CDWrapper = styled.div`
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    width: 80%;
    height: 80vw;
    margin: auto;
    box-sizing: border-box;
    .needle {
        position: absolute;
        top: -6.67vw;
        left: 48vw;
        width: 25vw;
        height: 40vw;
        z-index: 100;
        background-image: url(${needle});
        ${GlobalStyle.bgFull()}
        transform-origin: 4.5vw 4.5vw;
        transform: rotate(0deg);
        background-position: 50% center;
        background-repeat: no-repeat;
        transition: all 0.3s ease 0s;
        &.pause {
            transform:rotate(-30deg);
        }
    }
    .cd {
        top: 16%;
        position: absolute;
        width: 70%;
        height: 70vw;
        background-image: url(${disc});
        ${GlobalStyle.bgFull()}
        border: 4px solid ${GlobalStyle["border-color-v2"]};
        border-radius: 50%;
        background-position: 50% center;
        .image {
            position: absolute;
            left: 0;right: 0;
            top: 0;bottom: 0;
            width: 68%;
            height: 68%;
            margin: auto;
            border-radius: 50%;
            // border: 10px solid rgba(255, 255, 255, 0.1);
        }
        .play {
            animation: ${rotate} 20s linear infinite;
            &.pause {
                animation-play-state: paused;
            }
        }
    }
    .playing_lyric {
        position: absolute;
        margin: auto;
        width: 80%;
        top: 95vw;
        font-size: 14px;
        line-height: 20px;
        white-space: normal;
        text-align: center;
        color: rgba (255, 255, 255, 0.5);
    }
`;

export const Bottom = styled.div`
    position: absolute;
    bottom: 50px;
    width: 100%;
`;

export const ProgressWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0px;
    .time {
        width: 30px;
        flex: 0 0 30px;
        line-height: 30px;
        color: ${GlobalStyle["font-color-desc"]};
        font-size: ${GlobalStyle["font-size-s"]};
        &.time-l {
            text-align: left;
        }
        &.time-r {
            text-align: right;
        }
    }
    .progress-bar-wrapper {
        flex: 1;
        .bar-inner {
            position: relative;
            top: 13px;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
        }
    }
`;

export const Operators = styled.div`
    display: flex;
    align-items: center;
    .icon {
        font-weight: 300;
        flex: 1;
        color: ${GlobalStyle["font-color-desc"]};
        &.disable {
            color: ${GlobalStyle["theme-color-shadow"]};
        }
        &.i-left {
            text-align: right;
        }
        &.i-right {
            text-align: left;
        }
        &.i-center {
            padding: 0px 20px;
            text-align: center;
            i {
                font-size: 40px;
            }
        }
        &.icon-favorite {
            color: ${GlobalStyle["theme-color"]};
        }
        i {
            font-weight: 300;
            font-size: 30px;
        }
    }
`;

export const LyricContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

export const LyricWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    p {
        line-height: 32px;
        color: rgba (255, 255, 255, 0.5);
        white-space: normal;
        font-size: ${GlobalStyle['font-size-l']};
        &.current {
            color: #fff;
        }
        &.pure {
            position: relative;
            top: 30vh;
        }
    }
`;

export const SpeedList = styled.div`
    width: 70%;
    margin: auto;
    display: flex;
    align-items: center;
    height: 30px;
    justify-content: space-around;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        color: ${GlobalStyle["font-color-desc-v2"]};
        font-size: ${GlobalStyle["font-size-m"]};
        vertical-align: middle;
    }
`;

export const SpeedListItem = styled.div`
    flex: 0 0 auto;
    font-size: ${GlobalStyle["font-size-m"]};
    padding: 5px 5px;
    border-radius: 10px;
    color: ${GlobalStyle["font-color-desc-v2"]};
    &.selected {
        color: ${GlobalStyle["theme-color"]};
        border: 1px solid ${GlobalStyle["theme-color"]};
        opacity: 0.8;
    }
`;