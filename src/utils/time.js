    export function ts2Date(ts) {
    var ts = parseInt(ts);
    //Unix ts => JS ts
    if(ts.toString().length === 10) {
        ts = ts * 1000;
    }

    let date = new Date(ts)
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    return `${y}/${m}/${d} ${h}:${min}:${sec}`
}

export function toUnixTime(val) {
    return Math.round(val / 1000)
}