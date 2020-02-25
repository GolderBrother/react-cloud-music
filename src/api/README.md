# lyric-parser

这是歌词解析器插件 ```Lyric```

使用方式：

```js
// 实例化歌词解析后的对象
/**
 * @param {string} lyric 未格式化的歌词字符串, 例如："[00:01.997] 作词：薛之谦"
 * @param {Function} callback 歌词解析后的回调
 */
const myLyric = new Lyric(lyric, callback);

// 歌词播放
myLyric.play();

// 歌词暂停
myLyric.stop();

// 切换歌词播放暂停
myLyric.togglePlay();

// 歌词倍速播放
myLyric.changeSpeed(newSpeed);

// 切到某个时间点播放
myLyric.seek(newSpeed * 1000);
```

## 如何发布这个包到 npm 上作为第三方包供其他开发者使用

四部曲：

- 在 ```www.npmjs.com``` 网站上注册一个用户
- 通过 ```npm init``` 创建一个仓库
- 通过 ```npm adduser``` 登录你的 ```npm``` 账户
- 使用 ```npm publish``` 发布你的代码。(上传后第三方包的名字就是 ```package.json ```中的 ```name``` 值)

### 执行 npm publish 发布的时候可能会遇到的问题

- ```403 Forbidden - PUT https://registry.npm.taobao.org/xxx - [no_perms] Private mode enable, only admin can publish this module```

解决：```npm config set registry http://registry.npmjs.org```

- ```401 Unauthorized - PUT http://xxx - You must be logged in to publish packages.```

解决：重新登录即可 ```npm adduser```

- ```403 Forbidden - PUT http://xxx - you must verify your email before publishing a new package: https://www.npmjs.com/email-edit```

这个的意思是你刚开始在 ```www.npmjs.com``` 网站上注册用户成功后，npmjs 会给你设置的邮箱发送一封验证短信，只要到邮箱中点击进行 ```verify``` 验证后，再来发布就没问题了。