import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const HeaderContainer = styled.div `
    position: fixed;
    display: flex;
    height: 40px;
    width: 100%;
    padding: 0 10px 5px;
    line-height: 40px;
    z-index: 100;
    color: ${GlobalStyle['font-color-light']};
    .back {
        margin-right: 5px;
        font-size: 20px;
        width: 20px;
    }
    >h1 {
        font-size: ${GlobalStyle["font-size-l"]};
        font-weight: 700;
    }
`;