import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const NavContainer = styled.div `
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

export const ListContainer = styled.div `
  position: fixed;
  top: 160px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${GlobalStyle["font-color-desc"]};
    font-size: ${GlobalStyle["font-size-s"]};
  }
`;

export const ListItem = styled.div `
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  margin: 0px 5px;
  padding: 5px 0px;
  border-bottom: 1px solid ${GlobalStyle["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  .name {
    font-size: ${GlobalStyle["font-size-m"]};
    color: ${GlobalStyle["font-color-desc"]};
    font-weight: 500;
  }
`;