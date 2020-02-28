import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    // .before {
    //   position: absolute;
    //   top: -300px;
    //   height: 400px;
    //   width: 100%;
    //   background: ${GlobalStyle["theme-color"]};
    // }
`;

export const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  top: 0;
  left:0; 
  right:0;
  bottom: 0;
  height: 30px;
  margin: auto;
  z-index: 100;
`;