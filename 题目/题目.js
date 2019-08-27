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
  document.getElementById('btn').onclick= function () {
    alert(this.id)
    var callback = function () {
      alert(this.id)
    }
    callback()
  }
}
{
  var id = 'window'
  document.getElementById('btn1').onclick= function () {
    "use strict"
    alert(this.id)
    var callback = function () {
      alert(this)
    }
    callback()
  }
}