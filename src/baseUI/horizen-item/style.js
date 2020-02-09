import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const List = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        margin-right: 5px;
        color: grey;
        font-size: ${GlobalStyle["font-size-m"]};
        vertical-align: middle;
    }
`;

const themeColor = GlobalStyle['theme-color'];
export const ListItem = styled.span`
    flex: 0 0 auto;
    font-size: ${GlobalStyle["font-size-m"]};
    padding: 5px 8px;
    border-radius: 10px;
    &.selected {
        border: 1px solid ${themeColor};
        color: ${themeColor};
        opacity: 0.8;
    }
`;