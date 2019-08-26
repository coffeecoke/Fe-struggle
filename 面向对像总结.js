// 注：{} 为es6中新增的模块，为了避免代码段相互之间的冲突，可以理解为jquery中的(function(){})代码块


// A 企划部门招聘两个平面 yaoyao  xiaoxi
{ 
  let yaoyao = {
    name: 'yaoyao',
    work() { // es6当属性值为函数时的写法
      console.log('巴拉巴拉设计平面')
    }
  }
  let xiaoxi = {
    name: 'xiaoxi',
    work() { // ‘做什么’是对象的一个方法
      console.log('巴拉巴拉写新闻稿')
    }
  }
  // 2 开始时候两个人都没有什么经验，这时候孙慧需要告诉他们怎么做，做什么
  var renderWork = function (content) { // 开始工作
    if (content === '设计平面') { // 孙慧走到幺幺面前告诉她做什么
      yaoyao.work() // 孙慧告诉幺幺怎么做
    } else if (content === '写新闻稿') { //孙慧又走到小溪面前告诉她做什么
      xiaoxi.work() //并告诉小溪怎么做
    }
  }

  renderWork('设计平面') // 怎么做
  renderWork('写新闻稿')

  // 总结：
  // ‘做什么’是对象的一个方法，被安装在对象的内部，每个对象负责它们自己的行为。
  // '怎么做'是外部发布的消息（renderWork）
  // 这段代码的问题就是：1、没有把‘做什么’和‘怎么做区分开’；
  //                  2、如果在增加个人员，还要回去修复renderWork内部的方法，没有弹性
}






// B随着，小溪和幺幺对工作的熟悉，孙慧没必要那么累了，孙慧只告诉他们做什么就行了
{
  
  let yaoyao = {
    name: 'yaoyao',
    work() { 
      console.log('设计平面2')
    }
  }
  let xiaoxi = {
    name: 'xiaoxi',
    work() { // ‘做什么’是对象的一个方法，他自己知道该怎么做
      console.log('写新闻稿2')
    }
  }
  let tiantian = {
    name: 'tiantian',
    work() { // ‘做什么’是对象的一个方法，他自己知道该怎么做
      console.log('设计界面2')
    }
  }
  var renderWork = function( people ){ // 做什么
    people.work();
  };
  // 孙慧只要安排他们他们两个干活

  renderWork(yaoyao)
  renderWork(xiaoxi)
  renderWork(tiantian)

  //总结：
  //1.把’做什么‘和’怎么做‘区分开
  //2.代码有弹性，之后只要添加人员对象就行了，不需要修改renderWork方法 

}






// C：之后云平台项目启动，但是哪天开始还没定，需要先协调人员，先把活安排下去（listen），合适的时机’郝军‘通知大家开始（trigger）。
//    发布订阅更能体现事物的提前规划性
{
  // 首先 这个云平台 项目只有3个功能，
  //1，日志，
  //2,先安排工作(listen)      
  //    假如：前端：function 设计Ai模块 （）{}  function 设计项目管理模块 （）{}
  //           ui:  function 设计界面(){}
  //3，通知大家干活

  let project = { // 云平台项目
    taskList: [], 
    listen: function( key, fn ){
        if ( !this.taskList[ key ] ){
            this.taskList[ key ] = [];
        }
        this.taskList[ key ].push( fn );    // 安排的活要添加近任务列表里（日志）taskList
    },
    trigger: function(){
        var key = Array.prototype.shift.call( arguments ),    
            fns = this.taskList[ key ];

        if ( !fns || fns.length === 0 ){    // 如果没活就没之后的事了
            return false;
        }

        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments );    // 通知大家根据先前的安排干活
        }
    }
  }

  // 之后于浩军来到我们部门 需要前端和ui他们配合工作,孙慧安排了3个人
  // tanghuan zhaoqian  tiantian
  // 每个人员都是一个对象，他们有自己的工作能力


  // 人员：zhaoqian
  function  Zhaoqian () { // 个人本身素养技能之类
    this.name = 'zhaoqian',
    this.age = 26
  }
  Zhaoqian.prototype.vue = function () {
    console.log('开发vue模板')
  }
  Zhaoqian.prototype.css = function () {
    console.log('根据设计图书写样式')
  }
  Zhaoqian.prototype.js = function () {
    console.log('开发功能')
  }
  // ....
  let zq = new Zhaoqian()

  // 人员 tanghuan
  function  Tanghuan () { // 个人本身素养技能之类
    this.name = 'tanghuan',
    this.age = 28
  }
  Tanghuan.prototype.bug = function () {
    console.log('解决bug')
  }
  Tanghuan.prototype.bb = function () {
    console.log('跟需求人员bb')
  }
  // ...
  let th = new Tanghuan()

  // 人员 tiantian
  function  Tiantian  () { // 个人本身素养技能之类
    this.name = 'Tiantian',
    this.age = 33
  }
  Tiantian.prototype.ui = function () {
    console.log('设计ui界面')
  }
  Tiantian.prototype.ue = function () {
    console.log('设计界面交互效果')
  }
  // ...
  let tt = new Tiantian()

  //以上为人员的基本素质，但是针对这个项目人员还有具体的工作，下面根据具体的任务构建针对这个项目的人员


  function ZhaoqianCloud () { //做云平台的zhaoqian构造器
    this.projectName = '云平台'
    Zhaoqian.apply(this,arguments) // 通过apply,这赵倩基本的属性继承过来，比如做云平台的赵倩也是赵倩，不能变成李倩了呀
  }
  ZhaoqianCloud.prototype.developAiPage = function (endtime) { //开发ai页面 ,这个方法是要放进任务里，具体这个任务里面的细节，自己知道
    console.log(endtime+'前开发完成')
    this.vue() // 这都要把赵倩基本的技能继承过来，才能调用
    this.css()
    this.js()
  }
  // 做云平台的赵倩也是赵倩，不能因为做云平台就把自己本身的技能忘了呀，所以要继承过来，要不本身的技能用不了呀
  Object.setPrototypeOf(ZhaoqianCloud.prototype,Zhaoqian.prototype) 

  // 变身成做云平台的赵倩
  let zqCloud = new ZhaoqianCloud()
  // zqCloud.developAiPage()

  // 针对云台的赵倩已经知道自己该做什么了（构建完成），然后把赵倩要做的事，放进任务里，郝军并添加近日志，表明这个任务归赵倩，并把shis指向赵倩
  // 要不这个任务里面涉及到具体细节，要责任到人，比如开发js功能，云平台要知道这是谁的技能呀，谁要去干，要不fn.apply( this, arguments ); 这里面的this就不知道指向谁了

  project.listen('前端',zqCloud.developAiPage.bind(zqCloud)) // 表明：前端的赵倩，组开ai这个页面,并且把this指向左云平台的赵倩

  // 合同签完了，郝军通知ui干活(这部分赵倩自己代码补充完整0.0)

  // 甜甜设计完了，郝军通知前端干活,时间节点
  project.trigger('前端','2019-10-5')

}


//总结：面向对象更能表现事物以及事物的发展规律
