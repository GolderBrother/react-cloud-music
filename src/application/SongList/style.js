import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const SongListWrapper = styled.ul`
  list-style: none;
  >li {
    display: flex;
    height: 60px;
    -webkit-box-align: center;
    align-items: center;
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1 1 0%;
      padding: 5px 0px;
      border-bottom: 1px solid ${GlobalStyle["border-color"]};
      overflow: hidden;
      ${GlobalStyle.noWrap()}
      > span {
        ${GlobalStyle.noWrap()}
        &:first-child {
          color: ${GlobalStyle["font-color-desc"]};
        }
        &:last-child {
          font-size: ${GlobalStyle["font-size-s"]};
          color: #bba8a8;
        }
      }
    }
  }
`;
export const SongWrapper = styled.div`
  opacity: 0.98;
  border-radius: 10px;
  background:  ${props => props.showBackground ? `background: ${GlobalStyle["highlight-background-color"]}`: ""};
  .first_line {
    box-sizing: border-box;
    margin-left: 10px;
    position: relative;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 10px 0px;border-bottom: 1px solid ${GlobalStyle["border-color"]};
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${GlobalStyle["font-color-desc"]};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      > span {
        vertical-align: top;
      }
      .sum {
        font-size: ${GlobalStyle["font-size-s"]};
        color: ${GlobalStyle["font-color-desc-v2"]};
      }
    }
    .add_list, .isCollected {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 130px;
      line-height: 34px;
      background: ${GlobalStyle["theme-color"]};
      color: ${GlobalStyle["font-color-light"]};
      font-size: 0px;
      vertical-align: top;
      border-radius: 3px;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0px 5px 0px 10px;
      }
      span {
        font-size: ${GlobalStyle["font-size-m"]};
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      background: ${GlobalStyle["background-color"]};
      color: ${GlobalStyle["font-color-desc"]};
    }
  }
`;

export const SongList = styled.ul`
  list-style: none;
  >li {
    display: flex;
    height: 60px;
    -webkit-box-align: center;
    align-items: center;
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1 1 0%;
      padding: 5px 0px;
      border-bottom: 1px solid ${GlobalStyle["border-color"]};
      overflow: hidden;
      ${GlobalStyle.noWrap()}
      > span {
        ${GlobalStyle.noWrap()}
        &:first-child {
          color: ${GlobalStyle["font-color-desc"]};
        }
        &:last-child {
          font-size: ${GlobalStyle["font-size-s"]};
          color: #bba8a8;
        }
      }
    }
  }
`;