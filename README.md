# React打造精美Web App

> 采用React Hooks + Redux + immutable.js打造完整前端工作流，进阶前端综合能力

猛戳 -> [在线体验地址](http://golderbrother.cn:8090/#/recommend)
> 移动端和PC端的chrome浏览器食用更佳 

## 食用方式：

### 1. 将项目clone下来:

```
$ git clone https://github.com/GolderBrother/react-cloud-music.git
$ cd react-cloud-music
$ npm i or yarn
$ cd ./server
$ npm i or yarn
```

### 2. 运行项目

```
npm run dev-start or yarn dev-start
```

前端端口：`3000`
api端口：`8091`

注意：
要记得把src/api/config.js中把baseUrl改成自己接口的地址，不然会报404，本项目**开发环境**下默认是`BASE_URL`，生产环境下大伙儿自己发挥~

启动成功后会自动打开浏览器访问 `http://localhost:3000/` 地址

### 3. 如何打包部署

#### 打包

执行命令:

```
$ npm run build or yarn build
```

#### 部署

##### 开发环境

执行命令:

```
$ npm run dev-start or yarn dev-start
```

##### 生产环境

执行命令:

```
$ npm run prod-start or yarn prod-start
```

前端端口：`8090`
api端口：`8091`

## 项目介绍:

说明:本项目参考网易云音乐安卓端app界面开发，基础UI绝大多数自己来构建，算是对自己的一个挑战，在这个过程也学到了不少设计经验。

## 本项目相关技术点

redux-immutable 大家可能比较陌生，因为项目中需要用到 `immutable.js` 中的数据结构，所以合并不同模块 `reducer` 的时候需要用到 `redux-immutable` 中的方法

### 尽管 hooks 能模拟 redux 的核心功能，但是能够取代 redux 这件事我不敢苟同，为什么这样说呢

- 首先 redux 有非常成熟的状态跟踪调试工具，也就是 chrome 浏览器的 redux-devtools 插件，至少到现在为止开发中很多的错误我都是通过它发现的。换而言之，它能够协助我们写出更利于维护的代码，并且在出现故障时快速找到问题的根源。

- 其次，redux 有非常成熟的数据模块化方案，不同模块的 reducer 直接导出，在全局的 store 中，调一下 redux 自带的 combineReducer 即可，目前从官方的角度看 hooks 这方面并不成熟。

- Redux 拥有成熟且强大的中间件功能，如 redux-logger, redux-thunk, redux-saga，用 hooks 实现中间件的功能就只能靠自己手动实现了。

当然 redux 也并不是十全十美的，有些方面也经常被人吐槽，比如繁重的模板代码，需要 react-redux 引入徒增项目包大小等等。但是瑕不掩瑜，这些不妨碍我们使用 redux 开发出容易调试并维护的应用。
因此客观来说，redux 是一个短时间不可被替代的状态管理方案。

## 功能模块介绍

> 待补充~

## 未来的规划和展望 

- 添加 `MV` 模块
- 添加登录和评论功能
- 完成收藏功能
- 播放器歌词可以根据播放到每个字的进度加顔色
- 做成类似app，可以放到桌面上
参考：
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
