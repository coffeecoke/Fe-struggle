var MyVue = (function(){
    // 设置默认配置项
	var __DEFUALTS__ = {
		el : "body",
		data : {}
	}
	
	function Vue(options){
    
		this.extend(__DEFUALTS__,options)//初始化options
		this.el = document.querySelector(this.el); 
		var data = this.data;
        var models = this.el.querySelectorAll("[v-model]")
        // 视图改变数据:更改input值,要把data模型中的属性值更改掉
		for(var i=0;i<models.length;i++){
			models[i].onkeyup = function(){
				data[this.getAttribute("v-model")] = this.value
			}
		}
		this.observer();//让模型对象具备观察者模式的功能（加钩子）
		
	}
	Vue.prototype = {
		extend : function(){ // 浅克隆,其实工作运用最多的还是浅克隆
			for(var i=0;i<arguments.length;i++){
				for(var prop in arguments[i]){
					this[prop] = arguments[i][prop]
				}
			}
		},
		observer : function(){ // 遍历对象中的每个属性,给每个属性追加观察者(给每个属性追加set和get),这样每个属性值发生变化都会触发set
			var el = this.el
			for(var key in this.data){
				this.defineCurrProperty(this.data,key,this.data[key],el);
			}
		},
		defineCurrProperty : function(obj,key,val,el){
           
			Object.defineProperty(obj,key,{
			  enumerable: true,
			  configurable:false,
			  get:function reactiveGetter(){
                
                  var value =  val;
                  console.log(value)
			  	return value // 返回属性的默认值,比如obj = {name:'zq'},这里的值就是默认的'zq'
			  },
			  set:function reactiveSetter(newVal){
                  console.log(newVal)
				var value = val;
				//如果值没有发生改变，那么view也不会发生改变,直接return
				if (newVal === value ) {
					return
                }
                val = newVal;
                

                // 值发生变化,然后更新视图
			  	var binds = el.querySelectorAll("[v-bind="+key+"]")
			  	for(var i=0;i<binds.length;i++){
					binds[i].innerHTML = val
				}
				var models = el.querySelectorAll("[v-model="+key+"]")
				for(var i=0;i<models.length;i++){
					models[i].value = val
				}
			  }
			})
		}
	}
	return Vue;
})()