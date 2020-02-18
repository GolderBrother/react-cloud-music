# note

- redux-immutable 大家可能比较陌生，因为项目中需要用到 immutable.js 中的数据结构，所以合并不同模块 reducer 的时候需要用到 redux-immutable 中的方法

## progress

part 5 done

part 7 done

part 11 done

part 12 done 2020.2.11

part 18 done 2020.2.15

part 23 done 2020.2.16

### next

### 尽管 hooks 能模拟 redux 的核心功能，但是能够取代 redux 这件事我不敢苟同

- 首先 redux 有非常成熟的状态跟踪调试工具，也就是 chrome 浏览器的 redux-devtools 插件，至少到现在为止开发中很多的错误我都是通过它发现的。换而言之，它能够协助我们写出更利于维护的代码，并且在出现故障时快速找到问题的根源。

- 其次，redux 有非常成熟的数据模块化方案，不同模块的 reducer 直接导出，在全局的 store 中，调一下 redux 自带的 combineReducer 即可，目前从官方的角度看 hooks 这方面并不成熟。

- Redux 拥有成熟且强大的中间件功能，如 redux-logger, redux-thunk, redux-saga，用 hooks 实现中间件的功能就只能靠自己手动实现了。

当然 redux 也并不是十全十美的，有些方面也经常被人吐槽，比如繁重的模板代码，需要 react-redux 引入徒增项目包大小等等。但是瑕不掩瑜，这些不妨碍我们使用 redux 开发出容易调试并维护的应用。
因此客观来说，redux 是一个短时间不可被替代的状态管理方案。
