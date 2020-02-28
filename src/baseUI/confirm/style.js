import styled, {
    keyframes
} from 'styled-components';
import GlobalStyle from '../../assets/global-style';
const confirmFadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100%: {
        opacity: 1;
    }
`;

const confirmZoom = keyframes`
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

export const ConfirmWrapper = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: ${props => props.show ? 'block' : 'none'};
    background: ${GlobalStyle["background-color-shadow"]};
    &.confirm-fade-enter-active {
        animation: ${confirmFadeIn} 0.3s;
        .confirm_content {
            animation: ${confirmZoom} 0.3s;
        }
    }
    // > .confirm_container {
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate3d(-50%, -50%, 0px);
    //     z-index: 100;
    //     .confirm_content {
    //         width: 270px;
    //         border-radius: 13px;
    //         background: rgb(255, 255, 255);
    //         .text {
    //             line-height: 22px;
    //             text-align: center;
    //             font-size: ${GlobalStyle["font-size-l"]};
    //             color: ${GlobalStyle["font-color-desc-v2"]};
    //             padding: 19px 15px;
    //         }
    //         .operate {
    //             display: flex;
    //             align-items: center;
    //             text-align: center;
    //             font-size: 16px;
    //             .operate_btn {
    //                 flex: 1;
    //                 line-height: 22px;
    //                 padding: 10px 0px;
    //                 border-top: 1px solid ${GlobalStyle["border-color"]};
    //                 color: ${GlobalStyle["font-color-desc"]};
    //                 &_left {
    //                     border-right: 1px solid ${GlobalStyle["border-color"]};
    //                 }
    //             }
    //         }
    //     }
    // }
`;

export const ConfirmContainer = styled.div `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0px);
    z-index: 100;
    .confirm_content {
        width: 270px;
        border-radius: 13px;
        background: rgb(255, 255, 255);
        .text {
            line-height: 22px;
            text-align: center;
            font-size: ${GlobalStyle["font-size-l"]};
            color: ${GlobalStyle["font-color-desc-v2"]};
            padding: 19px 15px;
        }
        .operate {
            display: flex;
            align-items: center;
            text-align: center;
            font-size: 16px;
            .operate_btn {
                flex: 1;
                line-height: 22px;
                padding: 10px 0px;
                border-top: 1px solid ${GlobalStyle["border-color"]};
                color: ${GlobalStyle["font-color-desc"]};
                &_left {
                    border-right: 1px solid ${GlobalStyle["border-color"]};
                }
            }
        }
    }
`;