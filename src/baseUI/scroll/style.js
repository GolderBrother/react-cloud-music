import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    .before {
        position: absolute;
        top: -300px;
        height: 400px;
        width: 100%;
        background: ${GlobalStyle["theme-color"]};
      }
`;