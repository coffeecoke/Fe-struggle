{
  let pc = '台式机'
  let zq = {
    pc:'macbook',
    work:function () {
      return this.pc
    }
  }
  let work = zq.work
  console.log(work())
}

//函数内部的function在没有对象调用情况下，默认指向window
{
  let id = 'window'
  document.getElementById('btn').onclick= function () {
    alert(this.id)
    let callback = function () {
      alert(this.id)
    }
    window.callback()
  }
}
{
  let id = 'window'
  document.getElementById('btn1').onclick= function () {
    "use strict" 
    alert(this.id)
    let callback = function () {
      alert(this) //严格模式下，this默认指向undefined
    }
    callback()
  }
}

//跟构造器相关的this
{
  let Zq = function () {
    this.name = 'zhaoqian';
    return {
      name:'zhaoqian01'
    }
  }
  let zq = new Zq();
  console.log(zq.name)
}
{
  let Zq = function () {
    this.name = 'zhaoqian';
    return 'zhaoqian01'
  }
  let zq = new Zq();
  console.log(zq.name)
}

//call,apply改变this指向
{
  let zq1 = {
    name:'zhaoqian01',
    getName:function () {
      return this.name
    }
  }
  let zq2 = {
    name:'zhaoqian02'
  }
  console.log(zq1.getName())
  console.log(zq1.getName.call(zq2))
}

//丢失的this
{
  let zq = {
    name:'zhaoqian',
    getName:function() {
      return this.name;
    }
  }
  console.log(zq.getName())
  letgetName = zq.getName;
  console.log(getName())
}