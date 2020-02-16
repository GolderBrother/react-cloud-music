import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home';
import Rank from '../application/Rank';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Singer from '../application/Singer';
import Album from '../application/Album';

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
        component: Rank,
        routes: [{
            path: '/rank/:id',
            component: Album
        }]
    }, {
        path: '/recommend',
        component: Recommend,
        routes: [{
            path: '/recommend/:id',
            component: Album
        }]
    }, {
        path: '/singers',
        component: Singers,
        routes: [{
            path: '/singers/:id',
            component: Singer
        }]
    }]
}];
export default Routes;