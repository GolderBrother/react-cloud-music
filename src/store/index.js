import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
// 使用增强函数, 这样相当于Redux Dev Tools插件和redux-thunk两个都可以使用
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;