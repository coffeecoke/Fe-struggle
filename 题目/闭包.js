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