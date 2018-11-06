(function(){
	var oAjaxUl = document.querySelector("#ajaxUl"),
		num = 0,
		length = 0;
	
	getData();
	
	window.onscroll = function(){
		var screenHeight = window.screen.height,
			scrollHeight = document.body.scrollHeight;
		console.log(scrollTop()+screenHeight,scrollHeight);

		//当垂直滚动距离+屏幕高度 微小于 文档滚动高度 就加载新数据内容
		if(scrollTop()+screenHeight > scrollHeight-520){
			//console.log(num,length-4);
			if(num < length-4){
				num += 4;
				getData();
			}
		}
	}
	
	//滚动高度兼容
	function scrollTop(){
		return document.documentElement.scrollTop || document.body.scrollTop;
	}


	function getData(){
		ajax( "get" , "./js/data.php" , "" , function(data){
			var data = JSON.parse(data);
			length = data.length;
			//console.log(data);
			//console.log(length);


			for(var i=num;i<num+4;i++){
				
				(function(obj){
					//设置当两张图片完全加载完成时显示数据内容
					var bigImg = new Image();
					var smallImg = new Image();

					bigImg.src = obj.bigSrc;    //根据src路径地址是否加载完成判断
					smallImg.src = obj.smallSrc;
					
					bigImg.onload = function(){
						this.onOff = true;
						if(this.onOff && smallImg.onOff){    //当大小两张图片都加载完成时，再显示其他数据
							contont(obj);
						}
					}

					smallImg.onload = function(){
						this.onOff = true;
						if(this.onOff && bigImg.onOff){
							contont(obj);
						}
					}
				})(data[i]);

			}
		} )
	}


	function contont(obj){
		var bigSrc = obj.bigSrc,
			smallSrc = obj.smallSrc,
			price = obj.price,
			title = obj.title,
			des = obj.des;
			// console.log(obj)
			var oLi = document.createElement('li');
			oLi.style.opacity = '0';
			var oA = document.createElement('a');
			oA.href = 'http://www.baidu.com';
			oA.innerHTML = '<div class="brand-pic"><img src="'+bigSrc+'" width="100%" height="100%" alt=""></div><div class="brand-logo"><img src="'+smallSrc+'" width="100%" height="100%"  alt=""></div><div class="brand-msg"><p class="price fl" ><span>'+price+'</span>折起</p><p class="title fr">'+title+'</p></div><div class="des">'+des+'</div><div class="to-pay"><span>立即购买</span></div>';
			oLi.appendChild(oA);
			oAjaxUl.appendChild(oLi);
			move( oLi,{opacity:100},5000 );
	}


 })();
	
	(function(){
		var oReturn = document.querySelector('.return');
		oReturn.onclick = goBack;

		/** 
		 * 返回前一页（或关闭本页面） 
		 * <li>如果没有前一页历史，则直接关闭当前页面</li> 
		 */  
		function goBack(){  
			if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){ // IE  
				if(history.length > 0){  
					window.history.go( -1 );  
				}else{  
					window.opener=null;window.close();  
				}  
			}else{ //非IE浏览器  
				if (navigator.userAgent.indexOf('Firefox') >= 0 ||  
					navigator.userAgent.indexOf('Opera') >= 0 ||  
					navigator.userAgent.indexOf('Safari') >= 0 ||  
					navigator.userAgent.indexOf('Chrome') >= 0 ||  
					navigator.userAgent.indexOf('WebKit') >= 0){  
			
					if(window.history.length > 1){  
						window.history.go( -1 );  
					}else{  
						window.opener=null;window.close();  
					}  
				}else{ //未知的浏览器  
					window.history.go( -1 );  
				}  
			}  
		} 
	})();
