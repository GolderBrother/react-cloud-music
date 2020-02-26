import styled from 'styled-components';
import GlobalStyle from '../../../assets/global-style';
const themeColor = GlobalStyle["theme-color"];
export const PlayListWrapper = styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 1000;
    background-color: ${GlobalStyle["background-color-shadow"]};
    &.list-fade-enter {
        opacity: 0;
    }
    &.list-fade-enter-active {
        opacity: 1;
        transition: all 0.3s;
    }
    &.list-fade-exit-active {
        opacity: 0;
        transition: all 0.3s;
    }
    &.list-fade-exit {
        opacity: 1;
    }
    .list_wrapper {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        opacity: 1;
        background-color: ${GlobalStyle["highlight-background-color"]};
        transform: translate3d(0px, 0px, 0px);
        border-radius: 10px 10px 0px 0px;
        .list_close {
            text-align: center;
            line-height: 50px;
            background: ${GlobalStyle["background-color"]};
            font-size: ${GlobalStyle["font-size-l"]};
            color: ${GlobalStyle["font-color-desc"]};
          }
    }
`;

export const ScrollWrapper = styled.div`
    height: 400px;
    overflow: hidden;
`;

export const ListHeader = styled.div`
    position: relative;
    padding: 20px 30px 10px 20px;
    .title {
        display: flex;
        align-items: center;
        > div {
            flex: 1 1 0%;
            .text {
                font-size: ${GlobalStyle["font-size-m"]};
                color: ${GlobalStyle["font-color-desc"]};
                flex: 1 1 0%;
            }
        }
        .iconfont {
            margin-right: 10px;
            font-size: ${GlobalStyle["font-size-ll"]};
            color: ${themeColor};
        }
        .clear {
            ${GlobalStyle.extendClick ()}
            font-size: ${GlobalStyle["font-size-l"]};
        }
    }
`;
export const ListContent = styled.div`
    .item {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 40px;
        padding: 0px 30px 0px 20px;
        overflow: hidden;
        .current {
            width: 20px;
            flex: 0 0 20px;
            font-size: ${GlobalStyle["font-size-s"]};
            color: ${themeColor};
        }
        .text {
            flex: 1;
            ${GlobalStyle.noWrap ()}
            font-size: ${GlobalStyle["font-size-m"]};
            color: ${GlobalStyle["font-color-desc-v2"]};
            .icon-favorite {
                color: ${themeColor};
            }
        }
        .like {
            ${GlobalStyle.extendClick ()}
            position: relative;
            margin-right: 15px;
            font-size: ${GlobalStyle["font-size-m"]};
            color: ${themeColor};
        }
        .delete {
            ${GlobalStyle.extendClick ()}
            position: relative;
            font-size: ${GlobalStyle["font-size-s"]};
            color: ${themeColor};
        }
    }
`;