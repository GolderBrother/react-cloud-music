import React from 'react';
import { LoadingWrapper } from './style';
function Loading(props){
    return (
        <LoadingWrapper>
            <div></div>
            <div></div>
        </LoadingWrapper>
    )
}

export default React.memo(Loading);