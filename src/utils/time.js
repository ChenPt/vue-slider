export function ts2Date(ts, format = 'YYYY-MM-DD HH:MM') {
  var ts = parseInt(ts);
  //Unix ts => JS ts
  if (ts.toString().length === 10) {
    ts = ts * 1000;
  }

  let date = new Date(ts)
  let y = date.getFullYear();
  let m = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  let d = (date.getDate() < 10 ? '0' : '') + date.getDate();
  let h = (date.getHours() < 10 ? '0' : '') + date.getHours();
  let min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  let result = ''
  switch (format.toUpperCase()) {
    case 'YYYY-MM-DD HH:MM':
      result = `${y}/${m}/${d} ${h}:${min}`
      break
    case 'YYYY-MM-DD HH:MM:SS':
      result = `${y}/${m}/${d} ${h}:${min}:${sec}`
      break
    default:
      result = `${y}/${m}/${d} ${h}:${min}`
      break
  }

  return result
}

export function toUnixTime(val) {
  return Math.round(val / 1000)
}