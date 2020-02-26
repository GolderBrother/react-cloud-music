import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import { actions } from './store';
import { actions as playerActions } from '../Player/store';
import SearchBox from '../../baseUI/search-box';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import MusicNote from '../../baseUI/music-note';
import { SearchContainer, ShortcutWrapper, HotKey, List, ListItem, SongsList } from './style';
import { getName } from '../../api/utils';
function Search(props) {
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const {
        hotList: immutableHotList,
        suggestList: immutableSuggestList,
        songsList: immutableSongsList,
        enterLoading,
        songsCount,
    } = props;
    const musicNoteRef = useRef();
    const {
        getHotKeyWordsDispatch,
        getSuggestListDispatch,
        changeEnterLoadingDispatch,
        getSongDetailDispatch,
    } = props;
    const suggestList = immutableSuggestList ? immutableSuggestList.toJS() : [];
    const songsList = immutableSongsList ? immutableSongsList.toJS() : [];
    /**
     * 需求：
     * 当搜索框为空，展示热门搜索列表
     * 当搜索框有内容时，发送 Ajax 请求，显示搜索结果
     * 点击搜索结果，分别进入到不同的详情页中
     */
    // 渲染热门关键词模块
    const renderHotKey = () => {
        const hotList = immutableHotList ? immutableHotList.toJS() : [];
        return (
            <ul>{
                hotList.map((item) => (
                    <li className="item" key={item.first} onClick={() => setQuery(item.first)}>{item.first}</li>
                ))
            }</ul>
        );
    }
    // 渲染搜索的歌手列表
    const renderSingers = () => {
        const singers = suggestList.artists || [];
        if (!singers || !singers.length) return;
        return (
            <List>
                <h1 className="title">相关歌手</h1>
                {
                    singers.map((item, index) => (
                        <ListItem key={item.accountId + "_" + index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                            <div className="img_wrapper">
                                <LazyLoad placeholder={<img width="100%" height="100%" src={require("./imgs/singer.png")} alt="singer" />}>
                                    <img width="100%" height="100%" src={item.picUrl} alt="singer" />
                                </LazyLoad>
                            </div>
                            <div className="name">歌手: {item.name}</div>
                        </ListItem>
                    ))
                }
            </List>
        );
    };
    // 渲染搜索的歌单列表
    const renderAlbum = () => {
        const albums = suggestList.playlists || [];
        if (!albums || !albums.length) return;
        return (
            <List>
                <h1 className="title">相关歌单</h1>
                {
                    albums.map((item, index) => (
                        <ListItem key={item.accountId + "_" + index} onClick={() => props.history.push(`/album/${item.id}`)}>
                            <div className="img_wrapper">
                                <LazyLoad placeholder={<img width="100%" height="100%" src={require("./imgs/music.png")} alt="album" />}>
                                    <img width="100%" height="100%" src={item.coverImgUrl} alt="music" />
                                </LazyLoad>
                            </div>
                            <div className="name">歌单: {item.name}</div>
                        </ListItem>
                    ))
                }
            </List>
        )
    };
    // 渲染搜索的歌曲列表
    const renderSongs = () => {
        // 点击单曲后能够直接播放，那么首先需要 将选中的单曲加入到 播放列表 中
        const selectItem = (e, id) => {
            e.stopPropagation();
            // 获取单曲项请
            getSongDetailDispatch(id);
            if (musicNoteRef && musicNoteRef.current) {
                musicNoteRef.current.startAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
            }

        }
        return (
            <SongsList style={{ paddingLeft: "20px" }}>
                {
                    songsList.map((item, index) => (
                        <li key={item.id} onClick={e => selectItem(e, item.id)}>
                            <div className="info-wrapper">
                                <span className="name">
                                    {item.name}</span><span className="album">
                                    {getName(item.artists)} - {item.album.name}
                                </span>
                            </div>
                        </li>
                    ))
                }
            </SongsList>
        )
    };
    const handleExited = () => props.history.goBack();
    // 由于是传递给子组件的方法,所以尽量用useCallback,这样能保证在以来没变的情况下,始终子组件传的是相同的引用
    const handleBack = useCallback(() => {
        setShow(false);
    }, []);
    // 查询回调，根据关键词获取搜索建议结果
    const handleQuery = (query) => {
        setQuery(query);
        if (!query) return;
        changeEnterLoadingDispatch(true);
        getSuggestListDispatch(query);
    };
    // const handleQuery = useCallback((query) => {
    //     setQuery(query);
    // }, [query]);
    // 初次渲染，发送请求获取热门搜索关键词
    useEffect(() => {
        setShow(true);
        // 只有不存在才获取，存在直接用缓存的，不在重新获取
        const hotList = immutableHotList ? immutableHotList.toJS() : [];
        if (!hotList.size) getHotKeyWordsDispatch();
    });
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={handleExited}
        >
            <SearchContainer showMiniPlayer={songsCount > 0}>
                <div className="search_box_wrapper">
                    <SearchBox
                        onBack={handleBack}
                        handleQuery={handleQuery}
                        newQuery={query}
                    ></SearchBox>
                </div>
                <ShortcutWrapper
                    show={!query}
                >
                    <Scroll onScroll={forceCheck}>
                        <div>
                            <HotKey>
                                <h1 className="title"> 热门搜索 </h1>
                                {renderHotKey()}
                            </HotKey>
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                <ShortcutWrapper show={query}>
                    <div>
                        {renderSingers()}
                        {renderAlbum()}
                        {renderSongs()}
                    </div>
                </ShortcutWrapper>
                <MusicNote ref={musicNoteRef} />
                {enterLoading ? <Loading /> : null}
            </SearchContainer>
        </CSSTransition>
    )
}
const mapStateToProps = state => ({
    hotList: state.getIn(['search', 'hotList']),
    suggestList: state.getIn(['search', 'suggestList']),
    songsList: state.getIn(['search', 'songsList']),
    enterLoading: state.getIn(['search', 'enterLoading']),
    songsCount: state.getIn(['player', 'playList']).size,
});
const mapDispatchToProps = dispatch => ({
    getHotKeyWordsDispatch: () => dispatch(actions.getHotKeyWords()),
    getSuggestListDispatch: query => dispatch(actions.getSuggestList(query)),
    changeEnterLoadingDispatch: (data) => dispatch(actions.changeEnterLoading(data)),
    getSongDetailDispatch: data => dispatch(playerActions.getSongDetail(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));