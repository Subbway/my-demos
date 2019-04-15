//1.封装a-b的随机整数，包含a、b
function getRandomNum(a,b){
	return  parseInt(Math.random()*(b-a+1)+a);
}

//2.封装一个随机颜色 rgb(0-255,0-255,0-255)
function getRandomColor(){
	var r = getRandomNum(0,255);
	var g = getRandomNum(0,255);
	var b = getRandomNum(0,255);
	return 'rgb('+r+','+g+','+b+')';
}


//3.封装获取元素节点
var Element = {
	// 3.1从所有节点的数组中，过滤出来只有元素节点的数组
	getElement : function(nodes){
		var eleArr = [];
		nodes.forEach(function(item){
			if(item.nodeType == 1){
				eleArr.push(item);
			}
		})
		return eleArr;
	},
	//3.2获取所有子元素节点
	getSonElement : function(parent){
		return this.getElement(parent.childNodes);
	},
	//3.3获取到下一个兄弟元素节点
	getNextElement : function(current){
		var next = current.nextSibling;
		if(next.nodeType != 1){
			next = next.nextSibling;
		}
		return next;
	}
	//...
}


//4.获取css样式
function getStyle(ele,key){
 	if(window.getComputedStyle){
		return window.getComputedStyle(ele)[key];
	}else if(ele.currentStyle){
		return ele.currentStyle[key];
	}else{
		return ele.style[key];
	}
}

// 5.事件绑定，兼容浏览器
function bind(ele,type,fn,iscapture){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,iscapture);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,fn);
	}else{
		ele["on"+type] = fn;
	}
}



//6.封装匀速动画


//7.封装缓冲动画
function bufferAnimation(ele,obj,timer,fn){
	var count = 0;
	for(var key in obj){
		count ++;
		var target = obj[key];
		donghua(key,target);
	}
	function donghua(key,target){
		// console.log(target);
		target = key == "opacity"? target *100 : target;
		clearInterval(ele[key+"timer"]);
		ele[key+"timer"] = setInterval(function(){
			var current = window.getComputedStyle(ele)[key];//120px
			var unit = current.match(/[a-z]+/);
			unit = unit? unit[0] : "";
			current = parseFloat(current); 
			current = key == "opacity"? current *100 : current;
			var speed = (target-current)/10;
			speed = speed>0? Math.ceil(speed) : Math.floor(speed);
			current += speed;
			if(current==target){
				clearInterval(ele[key+"timer"]);
				count--;
			}
			current = key == "opacity"? current/100 : current;
			ele.style[key] = current + unit;
			if(count == 0 ){
				typeof fn == "function"? fn() : fn;
			}
		},timer)
	}
}

//8.cookie
//封装设置、获取、移除cookie
var Cookie = {
    setCookie : function(name,value,data,path){
        var str = `${name}=${value}`;
        if(data){
            str += `; expires=${data.toUTCString()}`;
        }
        if(path){
            str += `; path=${path}`;
        }

        document.cookie = str;
    },
    getCookie : function(name){
        var cookieArr = document.cookie.split("; ");
        var res = "";
        cookieArr.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] == name){
                res = arr[1];
            }
        })
        return res;
    },
    removeCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        this.setCookie(name,"",d,path)
    }
}