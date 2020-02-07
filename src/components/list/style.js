import styled from 'styled-components';
import globalStyle from '../../assets/global-style';
export const ListWrapper = styled.div `
    max-width: 100%;
    .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    }
`;

export const List = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: space-around;
    justify-content: flex-start;
`;
const fontSize = globalStyle["font-size-s"];
export const ListItem = styled.div`
    position: relative;
    width: 32%;
    margin: 0 .5%;
    .img_wrapper {
        position: relative;
        height: 0px;
        padding-bottom: 100%;
        // 添加背景阴影效果
        .decorate {
            z-index: 1;
            position: absolute;
            top: 0px;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(rgba(110, 110, 110, 0.4), rgba(255, 255, 255, 0));
        }
        .re-img {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 3px;
        }
        .play_count {
            z-index: 1;
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: ${fontSize};
            line-height: 15px;
            color: ${globalStyle["font-color-light"]};
            .play {
                vertical-align: top;
            }
        }
    }
    .desc {
        margin-top: 2px;
        height: 50px;
        text-align: left;
        font-size: 12px;
        line-height: 1.4;
        overflow: hidden;
        padding: 0px 2px;
        font-size: ${fontSize};
        color: ${globalStyle["font-color-desc"]};
    }
`;