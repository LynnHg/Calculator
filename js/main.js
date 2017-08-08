	var ul = document.querySelector('ul');
	var liArr = ul.children;
	var show = document.getElementById('show');//获取算式提示
	var screen = document.getElementById('screen');//获取屏幕显示
	var prompt = document.getElementById('prompt');//获取底部提示
	var numbers = document.querySelectorAll('.number');//获取数字
	var operators = document.querySelectorAll('.operator');//获取运算符
	var point = document.querySelector('.point');//获取小数点
	var evl = document.querySelector('.eval');//获取等号
	var b = document.querySelector('.back');//获取后退
	var c = document.querySelector('.clear');//获取清除
	var color;//保存按钮初始颜色
	var flag = true;//颜色判断

	//所有符号
	var num1 = '';
	var num2 = '';
	var fuhao = '';
	//引入状态机
	var panduan = 0;// 0 表示num1 1 表示 num2
	var isnum = 0;// 0表示没有点击数字  1表示点击过数字
	var isdian = 0;//点击小数点则变化变量

	//点击时颜色变化
	!function activeColor(){
		for (var i = 0; i < liArr.length; i++) {
			liArr[i].onmouseup = up;
			liArr[i].onmousedown = down;
		}
	}();

	!function(){
		for (var i = 0; i < numbers.length; i++) {
			numbers[i].onclick = function(){
				var a = this.innerHTML; //按钮对应的数字
				prompt.innerHTML = '';
				num(a);
			}
		}
	}();
	
	!function(){
		for (var i = 0; i < operators.length; i++) {
			operators[i].onclick = function(){
				var a = this.innerHTML; //按钮对应的数字
				prompt.innerHTML = '';
				operate(a);
			}
		}
	}();

	point.onclick = function(){
		var a = this.innerHTML;
		poi(a);
	}
	
	evl.onclick = function(){
		var a = this.innerHTML;
		equal(a);
		b.onclick = null;

	}

	b.onclick = back;
	c.onclick = clear;
	function up(){
		this.style.background = color;//恢复初始颜色
	}
	function down(){
		if(flag){
			color = this.style.background;//获取当前颜色
			flag = false;//防止多次点击颜色显示错误
		}
		this.style.background = "#979890";//点击瞬间改变颜色
	}
	//运算符
	function operate(t){
		if(isnum == 1){
			var v=t;
			fuhao = v;
			panduan = 1;
			show.innerHTML = num1 + fuhao;
			screen.innerHTML = fuhao;
		}else{
			prompt.innerHTML = "请先点击数字！";
		}
		
	}
	//所有数字
	function num(t){
		var v = t;
		if(panduan == 0){
			num1 += v;
			isnum = 1;
			show.innerHTML = num1;
			screen.innerHTML = num1;
		}else if(panduan ==1){
			num2 += v;
			show.innerHTML = num1 + fuhao + num2;
			screen.innerHTML = num2;
		}
	}
	//小数点
	function poi(t){
		var v = t;
		if(panduan == 0){
			num1 += v;
			isnum = 1;
			isdian++;
			show.innerHTML = num1;
			screen.innerHTML = num1;
		}else if(panduan ==1){
			num2 += v;
			isdian++;
			show.innerHTML = num1 + fuhao + num2;
			screen.innerHTML = num2;
		}
	}
	//等于
	function equal(){
		var result = 0;
		var n1 = 0;
		var n2 = 0;
		if(isdian == 0){
			
			n1 = parseInt(num1);
			n2 = parseInt(num2);
		}else{
			n1 = parseFloat(num1);
			n2 = parseFloat(num2);
		}
		switch(fuhao){
			case '+':
				result = n1 + n2;
				culcalate(result);
				break;
			case '-':
				result = n1 - n2;
				culcalate(result);
				break;
			case '×':
				result = n1 * n2;
				culcalate(result);
				break;
			case '÷':
				result = n1 / n2;
				culcalate(result);
				break;
			default:
				break;
		}
	}
	//运算
	function culcalate(r){
		show.innerHTML = num1 + fuhao + num2 + '=' + r;
		screen.innerHTML = r;
		num1 = r;
		num2 = '';
	}
	//后退
	function back(){
		if(num2 != ''){
			num2 = num2.substring(0,num2.length-1);
		}else if(fuhao != ''){
			fuhao = '';
		}else if(num1 != ''){
			num1 = num1.substring(0,num1.length-1);
		}
		show.innerHTML = show.innerHTML.substring(0,show.innerHTML.length-1);
		screen.innerHTML = screen.innerHTML.substring(0,screen.innerHTML.length-1);	
	}
	//清空
	function clear(){
		num1 = '';
		num2 = '';
		fuhao = '';
		panduan = 0;
		isnum = 0;
		isdian = 0
		show.innerHTML = '';
		screen.innerHTML = '';
		prompt.innerHTML = '';
		b.onclick = back;
	}
