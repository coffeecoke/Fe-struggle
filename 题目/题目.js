{
  var pc = '台式机'
  var zq = {
    pc:'macbook',
    work:function () {
      return this.pc
    }
  }
  var work = zq.work
  console.log(work())
}

{
  var id = 'window'
  // document.getElementById('btn').onclick= function () {
  //   alert(this.id)
  //   var callback = function () {
  //     alert(this.id)
  //   }
  //   window.callback()
  // }
}

{
  // 闭包考查
  for(var i = 0;i<5;i++) {
    (function (i){
      setTimeout(function () {
        console.log(i)
      })
    })(i)
  }
}
{
  for(let i = 0;i<5;i++) { // let回声明一个作用域块
    setTimeout(function () {
      console.log(i)
    })
  }
}

{
  var id = 'window'
  document.getElementById('btn1').onclick= function () {
    "use strict" 
    alert(this.id)
    var callback = function () {
      alert(this) //严格模式下，this默认指向window
    }
    callback()
  }
}