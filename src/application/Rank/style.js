import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
// props 中的 globalRank 和 tracks.length 均代表是否为全球榜
export const Container = styled.div `
    position: fixed;
    top: 90px;
    bottom: ${props => props.showMiniPlayer ? "60px" : 0};
    width: 100%;
    h1.offical, h1.global {
        padding-top: 15px;
        font-weight: 700;
        font-size: ${GlobalStyle['font-size-m']};
        color: ${GlobalStyle['font-color-desc']};
        margin: 10px 5px;
    }
`;

export const List = styled.ul `
    display: ${props => props.globalRank ? 'flex': ''};
    margin-top: 10px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0px 5px;
    background: ${GlobalStyle['background-color']};
    // 解决flex布局后，最后一行只有两个元素的时候，最后一个元素布局中而是居右，导致中间空白问题
    &::after {
        content: "";
        display: block;
        width: 32vw;
    }
`;

export const ListItem = styled.li `
    display: ${props => props.tracks.length ? 'flex': ''};
    padding: 3px 0px;
    border-bottom: 1px solid ${GlobalStyle['border-color']};
    .img_wrapper {
        width: ${props => props.tracks.length ? '27vw' : '32vw'};
        height: ${props => props.tracks.length ? '27vw' : '32vw'};
        height: 27vw;
        position: relative;
        border-radius: 3px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
        }
        .decorate {
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient (hsla (0,0%,100%,0),hsla (0,0%,43%,.4));
        }
        .update_frequecy {
            position: absolute;
            left: 7px;
            bottom: 7px;
            font-size: ${GlobalStyle['font-size-xs']};
            color: ${GlobalStyle['font-color-light']};
        }
    }
`;

export const SongList = styled.ul`
    flex: 1;
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: space-around;
    >li {
        font-size: ${GlobalStyle['font-size-s']};
        color: grey;
    }
`;