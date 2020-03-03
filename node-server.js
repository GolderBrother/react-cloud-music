const express = require('express');
const compression = require('compression');

const port = process.env.PORT || 8090;
const app = express();

// 开启 gzip 压缩
app.use(compression());
// 配置静态文件服务器
app.use(express.static('./build'));
module.exports = app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log(`Your node server is listening at http://localhost:${port}\n`);
})