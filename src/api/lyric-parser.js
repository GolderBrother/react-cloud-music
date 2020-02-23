/*
 * @Author: GolderBrother 
 * @Email: 1204788939@qq.com 
 * @Date: 2020-02-23 15:43:48 
 * @Last Modified by: yaohuang.zhang
 * @Last Modified time: 2020-02-23 16:38:34
 * @Description: 传入歌词，按照正则表达式解析 
 * version:1.0.0
 * 解析的数据结构为：
 * {
 *   txt:歌词，
 *   time:ms
 * }
 */
// 解析 [00:01.997] 这一类时间戳的正则表达式
const TIME_EXP = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?\]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

export default class Lyric {
    constructor(lrc, handler = () => {}) {
        this.lrc = lrc;
        this.lines = [];
        this.handler = handler; // 接受传入的回调
        this.state = STATE_PAUSE; //记录播放状态
        this.currentLineIndex = 0; // 当前歌曲所在的行数
        this.startStamp = 0; // 歌曲开始的时间戳

        this._initLines();
    }

    // 解析歌曲转换成行数
    _initLines() {
        const lines = this.lrc.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]; // 获取每行的歌词 如果 "[00:01.997] 作词：薛之谦"
            const result = TIME_EXP.exec(line);
            if (!result) continue;
            const text = line.replace(TIME_EXP, '').trim();
            if (text) {
                if (result[3].length === 3) { // 把时间戳去掉，只剩下歌词文本
                    result[3] = result[3] / 10; //[00:01.997] 中匹配到的 997 就会被切成 99.7
                }
                this.lines.push({
                    // 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
                    time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) / 100 * 1000,
                    text
                });
            }
        }
        // 根据时间排序
        this.lines.sort((a, b) => a.time - b.time);
    }

    //offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
    play(offset = 0, isSeek = false) {
        if (!this.line.length) return;
        this.state = STATE_PLAYING;
        // 找到当前时间所在的行
        this.currentLineIndex = this._findcurLineIndex(offset);
        // 现在正处于第 this.curLineIndex-1 行
        // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
        this._callHandler (this.currentLineIndex-1);
        // 根据时间进度判断歌曲开始的时间戳
        this.startStamp = +new Date() - offset;
        // 表示当前这行歌词还没有播放完
        if(this.currentLineIndex < this.lines.length) {
            clearTimeout(this.timer);
            // 那就继续播放
            this._playRest(isSeek);
        }
    }

    // 找到当前时间戳所在的行数
    _findcurLineIndex(time) {
        for (let i = 0; i < this.lines.length; i++) {
            if (time <= this.lines[i].time) {
                return i;
            }
        }
        return this.lines.length - 1;
    }

    // 调用传入的回调
    _callHandler(i) {
        if (i < 0) {
            return;
        }
        this.handler({
            text: this.lines[i].text,
            lineNum: i
        });
    }

    // 标志位表示用户是否手动调整进度
    _playRest(isSeek = false) {
        const line = this.lines[this.currentLineIndex];
        let delay = 0;
        if (isSeek) {
            // 假设line.time：00:03.123
            // 获取到进度值对应歌词时间点的时间
            // 那触发下一次_playRest 就还剩 00:03.123 - (new Date () - 歌曲开始的时间戳) 的时间
            delay = line.time - (+new Date() - this.startStamp);
        } else {
            // 拿到上一行的歌词开始时间，算间隔
            // 这个时候触发下一次_playRest 就还剩 00:05.763 - 00:03:123 了
            const preTime = this.lines[this.currentLineIndex - 1] ? this.lines[this.currentLineIndex - 1].time : 0;
            delay = line.time - preTime;
        }
        this.timer = setTimeout(() => {
            this._callHandler(this.currentLineIndex++);
            if (this.currentLineIndex < this.lines.length && this.state === STATE_PLAYING) {
                this._playRest();
            }
        }, delay);
    }

    // 歌曲暂停播放后，歌词也应该相应的暂停(播放)
    togglePlay(offset) {
        if (this.state === STATE_PLAYING) { // 当前是播放状态，那就切换为暂停
            this.stop()
        } else { // 暂停 -> 播放
            this.state = STATE_PLAYING;
            this.play(offset, true);
        }
    }

    // 歌词暂停
    stop() {
        // 置为暂停态
        this.state = STATE_PAUSE;
        // 清除定时器
        clearTimeout(this.timer);
    }

    // 切到某个时间点播放
    seek(offset){
        // 直接调用播放方法
        this.play(offset, true);
    }
}