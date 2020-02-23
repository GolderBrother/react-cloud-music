import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import SearchBox from '../../baseUI/search-box';
import { SearchContainer } from './style';
function Search(props) {
    const [ show, setShow ] = useState(false);
    const [ query, setQuery ] = useState('');
    const handleExited = () => props.history.goBack();
    // 由于是传递给子组件的方法,所以尽量用useCallback,这样能保证在以来没变的情况下,始终子组件传的是相同的引用
    const handleBack = useCallback(() => {
        setShow(false);
    }, []); 
    const handleQuery = useCallback((query) => {
        setQuery(query);
    }, [query]);
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={handleExited}
        >
            <SearchContainer>
                <div className="search_box_wrapper">
                    <SearchBox 
                        onBack={handleBack}
                        handleQuery={handleQuery}
                        newQuery={query}
                    ></SearchBox>
                </div>
            </SearchContainer>
        </CSSTransition>
    )
}
export default React.memo(Search);