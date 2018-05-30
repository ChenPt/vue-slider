const life = 60 * 1000;  // 有效时间, 一分钟

const ls = {
  get(key) {
    if(!localStorage.getItem(key)) {
      return;
    }
    let val = JSON.parse(localStorage.getItem(key));  // LocalStorage.getItem获得的是JSON字符串，需要将JSON字符串转化成对象


    if(val.expires - this.time() < life) {
      this.del(key);
      return ;
      console.log("过期");
    } else {
      return val.value;
    }
  },
  set(key, value) {
    let data = {
      'value': value,
      'expires': this.time() + life
    }

    localStorage.setItem(key, JSON.stringify(data));   //存储数据时需要先将数据转化成JSON字符串
  },
  del(key) {
    localStorage.removeItem(key)
  },
  time() {
    return new Date().getTime()
  }

}

export default ls;