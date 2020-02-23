// 搜索框组件
import React, {memo, useRef, useEffect, useState, useMemo} from 'react';
import { SearchBoxWrapper } from './style';
import { debounce } from '../../api/utils';
function SearchBox(props){
    const [ query, setQuery ] = useState('');
    // 父组件中从热门搜索中拿到的新关键词
    const { newQuery } = props;
    const { handleQuery, onBack } = props;
    const queryRef = useRef();
    // 1.进场后需要使搜索框光标聚焦
    useEffect(() => {
        if(queryRef && queryRef.current) {
            queryRef.current.focus();
        }
    }, []);
    // 搜索词改变后触发
    const handleChange = (e) => {
        setQuery(e.currentTarget.value);
    }
    // 使用memo缓存父组件传过来的handleQuery方法,并且防抖处理
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 500);
    }, [handleQuery]);

    useEffect(() => {
        handleQueryDebounce(query);
    }, [query]);
    // 父组件点击了热门搜索的关键字，newQuery 更新,这边如果点击的新关键词已经在搜索框中了,就不重复设置
    useEffect(() => {
        if(newQuery !== query) setQuery(query);
    }, [newQuery]);
    // 清空搜索词
    const handleClear = () => {
        setQuery('');
        // 清空后聚焦元素
        queryRef.current.focus();
    }
    const handleBack = () => {
        onBack && onBack();
    }
    const deleteStyle = {display: query ? "block" : "none"};
    return (
        <SearchBoxWrapper>
            <i className="iconfont icon-back" onClick={handleBack}></i>
            <input ref={queryRef} type="text" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange} />
            <i className="iconfont icon-delete" style={deleteStyle} onClick={handleClear}></i>
            {props.children}
        </SearchBoxWrapper>
    )
}
export default memo(SearchBox);
