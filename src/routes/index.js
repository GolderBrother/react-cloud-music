import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home';
// import Rank from '../application/Rank';
// import Recommend from '../application/Recommend';
// import Singers from '../application/Singers';
// import Singer from '../application/Singer';
// import Album from '../application/Album';
// import Search from '../application/Search';
const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={null}>
            <Component {...props} />
        </Suspense>
    )
}
// 配置组件懒加载，可以进行代码分割。否则一开始就会加载所有组件，这样有利于提升受屏渲染速度
const RankComponent = lazy(() => import('../application/Rank'));
const RecommendComponent = lazy(() => import('../application/Recommend'));
const SingersComponent = lazy(() => import('../application/Singers'));
const SingerComponent = lazy(() => import('../application/Singer'));
const AlbumComponent = lazy(() => import('../application/Album'));
const SearchComponent = lazy(() => import('../application/Search'));

const Routes = [{
    path: '/',
    component: Home,
    routes: [{
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'} />
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/rank',
        component: SuspenseComponent(RankComponent),
        routes: [{
            path: '/rank/:id',
            component: SuspenseComponent(AlbumComponent)
        }]
    }, {
        path: '/recommend',
        component: SuspenseComponent(RecommendComponent),
        routes: [{
            path: '/recommend/:id',
            component: SuspenseComponent(AlbumComponent)
        }]
    }, {
        path: '/singers',
        component: SuspenseComponent(SingersComponent),
        routes: [{
            path: '/singers/:id',
            component: SuspenseComponent(SingerComponent)
        }]
    }, {
        // 用来显示歌单
        path: '/album:id',
        key: 'album',
        exact: true,
        component: SuspenseComponent(AlbumComponent)
    }, {
        path: '/search',
        key: 'search',
        exact: true,
        component: SuspenseComponent(SearchComponent)
    }]
}];
export default Routes;