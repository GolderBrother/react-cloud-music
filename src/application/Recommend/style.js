import styled from 'styled-components';
export const Content = styled.div`
    position: fixed;
    top: 90px;
    // 就是判断当前 playList 的长度，如果大于 0 则正在播放, 那就腾出迷你播放器的高度，等于 0 则没有。
    bottom: ${props => props.play ? "60px" : "0"};
    width: 100%;
`;
