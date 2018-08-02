var utils = {}

utils.ts2Date = function ts2Date (timestamp, format = 'YYYY-MM-DD hh:mm') {
  var ts = parseInt(timestamp)
  //Unix ts => JS ts
  if (ts.toString().length === 10) {
    ts = utils.unixTs2Js(ts)
  }
  let date = new Date(ts)
  let y = date.getFullYear()
  let m = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  let d = (date.getDate() < 10 ? '0' : '') + date.getDate()
  let h = (date.getHours() < 10 ? '0' : '') + date.getHours()
  let min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  let sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  var replace = (str) => {
    return str.replace('YYYY', y)
      .replace('MM', m)
      .replace('DD', d)
      .replace('hh', h)
      .replace('mm', min)
      .replace('ss', sec)
  }

  return replace(format)
}

utils.unixTs2Js = (unixTs) => {
  return unixTs * 1000
}
utils.toUnixTime = function toUnixTime (val) {
  return Math.round(val / 1000)
}

module.exports = utils
