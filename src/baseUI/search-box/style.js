import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const SearchBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 6px;
    padding-right: 20px;
    box-sizing: border-box;
    background: ${GlobalStyle["theme-color"]};
    .icon-back {
        font-size: 24px;
        color: ${GlobalStyle["font-color-light"]};
    }
    .box {
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        background: ${GlobalStyle["theme-color"]};
        color: ${GlobalStyle["highlight-background-color"]};
        font-size: ${GlobalStyle["font-size-m"]};
        outline: none;
        border: none;
        border-bottom: 1px solid ${GlobalStyle["border-color"]};
        // 设置提示语字体颜色
        &::placeholder {
          color: ${GlobalStyle["font-color-light"]};
        }
    }
    .icon-delete {
        font-size: 16px;
        color: ${GlobalStyle["background-color"]};
    }
`;