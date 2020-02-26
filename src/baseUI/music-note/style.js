import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const MusicNoteWrapper = styled.div `
.icon_wrapper{
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${GlobalStyle["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(.62,-0.1,.86,.57);
    transform: translate3d(0, 0, 0);
    >div{
      transition: transform 1s;
    }
  }
`;