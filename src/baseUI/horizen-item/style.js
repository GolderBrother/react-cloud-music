import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const List = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        margin-right: 5px;
        padding: 5px 0;
        color: grey;
        font-size: ${GlobalStyle["font-size-m"]};
        vertical-align: middle;
    }
`;

const themeColor = GlobalStyle['theme-color'];
export const ListItem = styled.span`
    flex: 0 0 auto;
    font-size: ${GlobalStyle["font-size-m"]};
    padding: 5px 5px;
    border-radius: 10px;
    &.selected {
        border: 1px solid ${themeColor};
        color: ${themeColor};
        opacity: 0.8;
    }
`;