(function($){
$.fn.treemenucheckbox = function(){
	var _this = $(this);
	
	$.each(arguments, function(i,val){
	  _this.find(val[0]).click(function(){
		$(this).find('span').attr("class",($(this).find('span').attr("class") == "on" ? "off" : "on"))
		_this.find(val[1]).eq(_this.find(val[0]).index(this)).toggle();
	  });
	});
};

//====================================================================================================
// [插件名称] jQuery FixedBox
//----------------------------------------------------------------------------------------------------
// [描    述] 随屏幕滑动
// [使用方法] $(".edit-box").FixedBox({_t: 0,_y: 0});
//----------------------------------------------------------------------------------------------------
// [更新日期] 2009-1-19
//====================================================================================================
$.fn.FixedBox = function(){
	var _t = this;
	var _y = _t.offset().top;

	$(window).scroll(function(){
		if( document.documentElement.scrollTop >= _y){
			_t.width(_t.width()).css("position", "fixed");
		}else{
			_y = _t.offset().top;
			_t.css("width","auto").css("position", "relative");
		}
	});
};

//====================================================================================================
// [插件名称] jQuery actabctl
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery actabctl选项卡效果插件，它是基于jQuery类库，实现手动、自动窗口切换功能，
//			 支持自定义设置手动模式、自动模式、单击选择、滑动选择、
// [使用方法] $("#id").actabctl({menu: object, content: object, selectedCss: "on", evt: 0, auto: true, pause: 2000});
//----------------------------------------------------------------------------------------------------
// [更新日期] 2009-1-19
//====================================================================================================

$.fn.actabctl = function(options){
	//默认值
	var defaults = {
		selectedCss: "on", //选项卡选中样式
		evt: 0,  //默认事件，0表示点击，1表示滑过
		auto: false, //是否自定滑动
		nb:false,
		effect: true,
		pause: 4000 //两次滑动暂停时间
	};
	var options = $.extend({}, defaults, options);
	
	//检测必须条件
	if(!options.menu && !options.content) return;
	
	var $mobj = $(this).find(options.menu);
	var $cobj = $(this).find(options.content);
	
	function movement( obj, index ){
		
		var next = index >= 0 ? (index == $mobj.size() ? 0 : index) : $mobj.index(obj);
		
		// 隐藏全部选项卡内容并显示与单击相对应的那个选项卡内容
		if(options.effect){
			var _h = $cobj.eq(next).height();
			$cobj.hide().eq(next).css('top', '-'+_h+'px').show().animate({'top': '10px'}, 'fast').animate({'top': '0px'}, 'fast'); 
		}else{
			$cobj.hide().eq(next).show();
		}
		
		// 清除全部的菜单样式并选中当前菜单样式
		$mobj.removeClass(options.selectedCss).eq(next).addClass(options.selectedCss); 
		
		if ( options.auto ) {
			timeout = setTimeout(function() {
				movement(false, next + 1);
			}, options.pause);
		}
	}
		

	//初始化
	var timeout, delay;
	var evtName = options.evt === 0 ? "click" : options.evt === 1 ? "mouseover" : "click";
	
	if(options.auto) movement(false, 0);
	
	$mobj[evtName](function(){ 
	   clearTimeout(timeout); 
	   var _this_ = this;
	   delay = setTimeout(function(){movement(_this_);}, 100); 
	}).mouseout(function(){clearTimeout(delay);});

};

//====================================================================================================
// [插件名称] jQuery flashSlider
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery flashSlider图片展示插件，它是基于jQuery类库，实现了不使用flash也同样可以在
//             页面上展示图片的效果，支持数字导航，纵向滑动和横向滑动，自动滚动和连续滑动
//             可设置滑动速度、是否自动、停顿间隔,自定义容器高度和宽度,支持Jquery的easing效果
//            （更多效果需要easing插件的支持，默认是swing）
// [使用方法] $("#slider").flashSlider();
//----------------------------------------------------------------------------------------------------
// [更新日期] 2010-3-27
//====================================================================================================
	
$.fn.flashSlider = function(options) {
	//默认值
	var defaults = {
		controlsShow: true, 	//是否显示数字导航
		customnev	: false, 	//是否自定义导航
		vertical	: 'left', 	//淡入[fade],向上滑动[top],左右滑动[left]
		speed		: 800, 		//滑动速度
		auto		: true,		//是否自定滑动
		pause		: 3000, 	//两次滑动暂停时间
		easing		: "swing", 	//easing效果，默认swing，更多效果需要easing插件支持
		height		: 0, 		//容器高度，不设置自动获取图片高度
		width		: 0,		//容器宽度，不设置自动获取图片宽度
		resize		: false, 	//图片自动调整大小
		delay		: false, 	//图片延迟加载
		char		: '', 		//文字标题绑定
		index		: '' 		//小图索引绑定
	};
	var options = $.extend({}, defaults, options);
	var FS = this;
	
	//开启图片自动调整大小
	if(options.resize && !options.delay){
		$("img", FS).each(function(i, c){
			var $Ig = new Image();
			$Ig.src = c.src;
			$(c).attr('alt','正在加载中...');
			$Ig.onload = function(){
				$(c).css({
					'width' : (this.width < options.width ? this.width : options.width), 
					'height' : (this.height < options.height ? this.height : options.height), 
					'margin-left' : (this.width < options.width ? (options.width - this.width)/2 : 0), 
					'margin-right' : (this.width < options.width ? (options.width - this.width)/2 : 0), 
					'margin-top' : (this.height < options.height ? (options.height - this.height)/2 : 0), 
					'margin-bottom' : (this.height < options.height ? (options.height - this.height)/2 : 0)
				});
			};
		});	
	}
	
	//开启延迟加载图片
	if(options.delay && !options.resize){
		$("img" ,FS).each(function(){
			$(this).attr('fsrc', $(this).attr('src')).removeAttr('src');
		});
		window.onload = function(){
			$("img" ,FS).each(function(){
				$(this).attr('src', $(this).attr('fsrc')).removeAttr('fsrc');
			});
		};
	}
	
	//判断图片少于或等于一张跳出
	if($("img" ,FS).size()<=1) return;
	
	FS.each(function() {
		var obj = $(this);
		var curr = 1; //当前索引
		var $img = obj.find("img");
		var s = $img.length;
		var w = $img.eq(0).width() || obj.width();
		var h = $img.eq(0).height() || obj.height();
		var $flashelement = $("ul", obj);
		options.height == 0 ? obj.height(h) : obj.height(options.height);
		options.width == 0 ? obj.width(w) : obj.width(options.width);
		obj.css("overflow", "hidden");
		obj.css("position", "relative");
		$flashelement.css('width', s * w);
		
		if(options.vertical === 'left') $("li", obj).css('float', 'left');
		if(options.vertical === 'top') $img.css('display', 'block');

		if (options.controlsShow) {
			if (options.customnev) {
				var navbtnhtml = '';
				for (var i = 0; i < s; i++) {
					tit =$img.eq(i).attr('title');
					hef =obj.find("a").eq(i).attr('href');
					navbtnhtml += '<span>' + '<a target="_blank" href=' + hef +'>' + '<i>' + (i + 1)+ '</i>' +'<b>'+ tit + '</b>' +'</a>' + '</span>';
				}
				$("#flashnvanum").append(navbtnhtml);
			$("#flashnvanum span").hover(function() {
				var num = $(this).find("i").html();
				flash(num, true);
			}, function() {
				timeout = setTimeout(function() {
					flash((curr / 1 + 1), false);
				}, options.pause / 4);
			});
			}else{
				var navbtnhtml = '<div id="num">';
				for (var i = 0; i < s; i++) {
					navbtnhtml += '<li>' + (i + 1) + '</li>';
				}
				navbtnhtml += '</div>';
				obj.append(navbtnhtml);
			$("#num li").hover(function() {
				var num = $(this).html();
				flash(num, true);
			}, function() {
				timeout = setTimeout(function() {
					flash((curr / 1 + 1), false);
				}, options.pause / 4);
			});
			}
			
		};
		
		if(options.index !== ''){
			$("#sliderindex").find(options.index)
			.each(function(i, e){
				$(e).attr('indexbind', i);
			})
			.hover(function() {
				var num = $(this).attr('indexbind');
					flash(parseInt(num)+1, true);
				}, function() {
				timeout = setTimeout(function() {
					flash((curr / 1 + 1), false);
				}, options.pause / 4);
			});
		}
		
		function setcurrnum(index) {
			if (options.controlsShow) $("#num li").eq(index).addClass('on').siblings().removeClass('on');
			if (options.customnev) $("#flashnvanum span ").eq(index).addClass('on').siblings().removeClass('on');
			if(options.char !== '') $("#sliderchar").find(options.char).hide().eq(index).show();
			if(options.index !== '') $("#sliderindex").find(options.index).eq(index).addClass('on').siblings().removeClass('on');
		}
		
		function flash(index, clicked) {
			$flashelement.stop();
			var next = index == s ? 1 : index + 1;
			curr = index - 1;
			setcurrnum((index - 1));
			
			switch(options.vertical){
				case 'top':
					p = ((index - 1) * h * -1);
					$flashelement.animate({ marginTop: p },options.speed, options.easing);
					break;
				case 'left':
					p = ((index - 1) * w * -1);
					$flashelement.animate({ marginLeft: p },options.speed, options.easing);
					break;
				case 'fade':
					$flashelement.find('li').hide().eq(index-1).fadeIn('slow').show();
					break;
			}
			if (clicked) clearTimeout(timeout);
			if (options.auto && !clicked) {
				timeout = setTimeout(function() {
					flash(next, false);
				}, options.speed + options.pause);
			};
		}
		var timeout;
		//初始化
		setcurrnum(0);
		if (options.auto) {
			timeout = setTimeout(function() {
				flash(2, false);
			}, options.pause);
		};
	});
};
//====================================================================================================
// [插件名称] Accessible News Slider 滚动插件
//----------------------------------------------------------------------------------------------------
// [插件描述] 间断滚动

// 使用参考[实例]
//    $( "#example_1" ).accessNews({   
//                headline : "Candy Coated",   
//                speed : "normal",   
//                slideBy : 1   
//            });  
//
//其中：
//headline：是标题；
//speed ：是速度；
//slideBy ：滚动几个；
//----------------------------------------------------------------------------------------------------
// [更新日期] 2011-09-05
//====================================================================================================

$.fn.accessNews = function( settings ) {
	settings = $.extend({
        speed : "normal",
		slideBy : 2
    }, settings);
    return this.each(function() {
		$.fn.accessNews.run( $( this ), settings );
    });
};
$.fn.accessNews.run = function( $this, settings ) {
	var ul = $( "ul:eq(0)", $this );
	var li = ul.children();
	if ( li.length <= settings.slideBy ) return;
	
	var $next = $( ".next", $this );
	var $back = $( ".back", $this );
	var liWidth = $( li[0] ).width() + parseInt($( li[0] ).css("margin-left")) + parseInt($( li[0] ).css("margin-right"));
	var animating = false;
	var ulwidth = li.length * liWidth;
	
	//初始化
	ul.css( "width", ulwidth );
	$next.attr("class","next");
	
	function scrollflash(s){
		if ( !animating ) {
			animating = true;
			offset = s ? parseInt( ul.css( "left" ) ) - ( liWidth * settings.slideBy ) : parseInt( ul.css( "left" ) ) + ( liWidth * settings.slideBy );
			if ( s && offset + ulwidth > 0 || !s && offset + ulwidth <= ulwidth){
				ul.animate({
					left: offset
				}, settings.speed, function() {
					if ( s && parseInt( ul.css( "left" ) ) + ulwidth <= liWidth * settings.slideBy ){
						$next.attr("class","next_"); $back.attr("class","back");
					}
					if ( !s && parseInt( ul.css( "left" ) ) == 0 ){
						$next.attr("class","next"); $back.attr("class","back_");
					}
					animating = false;
				});
			}else{
				animating = false;
			}
		}
	}
	
	$next.click(function() { scrollflash(true); });
	$back.click(function() { scrollflash(false); });
};

//====================================================================================================
// [插件名称] jQuery timedBind
//----------------------------------------------------------------------------------------------------
// [插件描述] 延时执行

// 使用参考[实例]
//$("#ID").timedBind("click", {(delay 或 buffer): 3000},  function(){//要执行的JS});
//----------------------------------------------------------------------------------------------------
// [更新日期] 2010-3-27
//====================================================================================================

$.fn.timedBind = function(type, data, fn) {
    data = data || {};
    var defaults = {
        delay: 0, //计时器延时方法[秒数]
		buffer: 0 //cookice延时方法[秒数]
    };
    data = $.extend(defaults, data);

    if(data.delay || data.buffer) data.originalHandler = fn;   
    
    var encloseFunction  = function(fn){
        return function(e) {fn.call(e.target, e);};
    };
    
    this.each(function(){
        var handler = function(e){
            if( e.data.delay ) setTimeout(encloseFunction(fn), e.data.delay, e);
	    
	    	if( e.data.buffer ){
	        	if (e.data.lastCalled && (e.timeStamp - e.data.lastCalled < e.data.buffer)) {
		    		return;
				}else{
		    		fn.call(this, e);
		    		$(this).bind(type, $.extend(e.data, {lastCalled: new Date().getTime()}), handler);
				}	
	   		}
        };    
        $(this).bind(type, data, handler);
    });
};

//====================================================================================================
// [插件名称] jQuery EmbeddedAD
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery EmbeddedAD广告加载插件，它是基于jQuery类库，实现了通过指定的公用标签延时加载各种格式的广告。

// 使用参考
//<div class="embedded-gg"><!--:EmbeddedAD href="http://" src="../0.jpg" width="200" height="200" target="_blank"--></div>
//----------------------------------------------------------------------------------------------------
// [更新日期] 2010-4-12
//====================================================================================================

$.fn.EmbeddedAD = function(){
	//默认值
	op = {href:'', src:'', width:'', height:'', target:'_blank'};
	
	this.each(function(){
		var str = this.innerHTML, temp='';		
		str.match(/\<\!\-\-\:EmbeddedAD\s(.*?)\-\-\>/g);
		
		$.each(RegExp.$1.split(/\s/), function(i, t){
			t.match(/(\w+)\="(.*?)"/g);
			op[RegExp.$1]=RegExp.$2;
		});

		temp += '<d'+'iv style="width:'+op.width+'px; height:'+op.height+'px; position:relative;">';
		
		if(op.href!=''){
			temp += '<a href="'+op.href+'" style="display:block; width:'+op.width+'px; height:'+op.height+'px; background:#FFF; filter: Alpha(opacity=0); -moz-opacity:0; opacity:0; position:absolute; top:0px; left:0px;" target="'+op.target+'"></a>';
		}
		
		if(/\.swf/.test(op.src)){
			temp += '<em'+'bed src="'+op.src+'" quality="high" wmode="opaque" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="'+op.width+'" height="'+op.height+'" ></emb'+'ed>';
		}else if(/\.htm/.test(op.src)){
			temp += '<ifr'+'ame src="'+op.src+'" width="'+op.width+'" height="'+op.height+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" ></ifr'+'ame>';
		}else if(/\.js/.test(op.src)){
			temp += '<sc'+'ript src="'+op.src+'"></scri'+'pt>';
		}else{
			temp += '<i'+'mg src="'+op.src+'" width="'+op.width+'" height="'+op.height+'" border="0" />';
		}
		
		temp += '</di'+'v>';
		
		this.innerHTML = temp;
	});
};

$(document).ready(function(){ $('.embedded-gg').EmbeddedAD(); });

//====================================================================================================
// [插件名称] jQuery lazyload
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery lazyload图片延迟加载插件，它是基于jQuery类库，实现了图片根据浏览范围动态加载。

// 使用参考
//$("img").lazyload()
//----------------------------------------------------------------------------------------------------
// [更新日期] 2010-4-12
//====================================================================================================
$.fn.lazyload = function(options) {
	var settings = {
		threshold    : 0,
		failurelimit : 0,
		event        : "scroll",
		effect       : "show",
		container    : window
	};
			
	if(options) {
		$.extend(settings, options);
	}

	var elements = this;
	if ("scroll" == settings.event) {
		$(settings.container).bind("scroll", function(event) {
			
			var counter = 0;
			elements.each(function() {
				if ($.abovethetop(this, settings) ||
					$.leftofbegin(this, settings)) {
						/* Nothing. */
				} else if (!$.belowthefold(this, settings) &&
					!$.rightoffold(this, settings)) {
						$(this).trigger("appear");
				} else {
					if (counter++ > settings.failurelimit) {
						return false;
					}
				}
			});
			
			var temp = $.grep(elements, function(element) {
				return !element.loaded;
			});
			elements = $(temp);
		});
	}
	
	this.each(function() {
		var self = this;
		
		if (undefined == $(self).attr("original")) {
			$(self).attr("original", $(self).attr("src"));     
		}

		if ("scroll" != settings.event || 
				undefined == $(self).attr("src") || 
				settings.placeholder == $(self).attr("src") || 
				($.abovethetop(self, settings) ||
				 $.leftofbegin(self, settings) || 
				 $.belowthefold(self, settings) || 
				 $.rightoffold(self, settings) )) {
					
			if (settings.placeholder) {
				$(self).attr("src", settings.placeholder);      
			} else {
				$(self).removeAttr("src");
			}
			self.loaded = false;
		} else {
			self.loaded = true;
		}
		
		$(self).one("appear", function() {
			if (!this.loaded) {
				$("<img />")
					.bind("load", function() {
						$(self)
							.hide()
							.attr("src", $(self).attr("original"))
							[settings.effect](settings.effectspeed);
						self.loaded = true;
					})
					.attr("src", $(self).attr("original"));
			};
		});

		if ("scroll" != settings.event) {
			$(self).bind(settings.event, function(event) {
				if (!self.loaded) {
					$(self).trigger("appear");
				}
			});
		}
	});
	
	$(settings.container).trigger(settings.event);
	
	return this;

};

$.belowthefold = function(element, settings) {
	if (settings.container === undefined || settings.container === window) {
		var fold = $(window).height() + $(window).scrollTop();
	} else {
		var fold = $(settings.container).offset().top + $(settings.container).height();
	}
	return fold <= $(element).offset().top - settings.threshold;
};

$.rightoffold = function(element, settings) {
	if (settings.container === undefined || settings.container === window) {
		var fold = $(window).width() + $(window).scrollLeft();
	} else {
		var fold = $(settings.container).offset().left + $(settings.container).width();
	}
	return fold <= $(element).offset().left - settings.threshold;
};
	
$.abovethetop = function(element, settings) {
	if (settings.container === undefined || settings.container === window) {
		var fold = $(window).scrollTop();
	} else {
		var fold = $(settings.container).offset().top;
	}
	return fold >= $(element).offset().top + settings.threshold  + $(element).height();
};

$.leftofbegin = function(element, settings) {
	if (settings.container === undefined || settings.container === window) {
		var fold = $(window).scrollLeft();
	} else {
		var fold = $(settings.container).offset().left;
	}
	return fold >= $(element).offset().left + settings.threshold + $(element).width();
};

$.extend($.expr[':'], {
	"below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
	"above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
	"right-of-fold"  : "$.rightoffold(a, {threshold : 0, container: window})",
	"left-of-fold"   : "!$.rightoffold(a, {threshold : 0, container: window})"
});

//====================================================================================================
// [插件名称] jquery amazon
//----------------------------------------------------------------------------------------------------
// [描    述] jquery amazon风格图片滚动效果

// 使用参考
//$("#amazon_scroller").amazon_scroller({
//                    scroller_title_show: 'enable',//enable  disable  
//                    scroller_time_interval: '3000',
//                    scroller_window_background_color: "#FFF",
//                    scroller_window_padding: '10',
//                    scroller_border_size: '2',
//                    scroller_border_color: '#CCC',
//                    scroller_images_width: '80',
//                    scroller_images_height: '60',
//                    scroller_title_size: '11',
//                    scroller_title_color: '#000',
//                    scroller_show_count: '3',
//                    directory: 'images'
//                });
//----------------------------------------------------------------------------------------------------
// [更新日期] 2011-10-17
//====================================================================================================
$.fn.amazon_scroller=function(p){
        var p=p||{};

        var g=p&&p.scroller_time_interval?p.scroller_time_interval:"3000";
        var h=p&&p.scroller_title_show?p.scroller_title_show:"enable";
        var i=p&&p.scroller_window_background_color?p.scroller_window_background_color:"white";
        var j=p&&p.scroller_window_padding?p.scroller_window_padding:"5";
        var k=p&&p.scroller_border_size?p.scroller_border_size:"0";
        var l=p&&p.scroller_border_color?p.scroller_border_color:"black";
        var m=p&&p.scroller_images_width?p.scroller_images_width:"50";
        var n=p&&p.scroller_images_height?p.scroller_images_height:"70";
        var o=p&&p.scroller_title_size?p.scroller_title_size:"12";
        var q=p&&p.scroller_title_color?p.scroller_title_color:"blue";
        var r=p&&p.scroller_show_count?p.scroller_show_count:"5";
        var d=p&&p.directory?p.directory:"imgs";
        j += "px";
        k += "px";
        m += "px";
        n += "px";
        o += "px";
        var dom=$(this);
        var s;
        var t=0;
        var u;
        var v;
        var w=dom.find("ul:first").children("li").length;
        var x=Math.ceil(w/r);
        if(dom.find("ul").length==0||dom.find("li").length==0){
            dom.append("Require content");
            return null
            }
            dom.find("ul:first").children("li").children("a").children("img").css("width",m).css("height",n);
        if(h=='enable'){
            dom.find("ul:first").children("li").children("a").each(function(){
                $(this).append('<br/>'+$(this).attr("title"))
                })
            }
            s_s_ul(dom,j,k,l,i);
        s_s_nav(dom.find(".amazon_scroller_nav"),d);
        m=parseInt(m);
        dom.find("ul:first").children("li").css("width",m+"px");
        dom.find("ul:first").children("li").children("a").css("color",q);
        dom.find("ul:first").children("li").children("a").css("font-size",o);
        begin();
        play();
        dom.find(".amazon_scroller_nav").children("li").hover(
            function(){
                if($(this).parent().children().index($(this))==0){
				$(this).addClass("l-navon");
                //$(this).css("background-position","-44px 0");
                }else if($(this).parent().children().index($(this))==1){
                //$(this).css("background-position","-44px -70px");
				$(this).addClass("r-navon");
                }
            },
            function(){
                if($(this).parent().children().index($(this))==0){
				$(this).removeClass("l-navon");
				$(this).addClass("l-nav");
                //$(this).css("background-position","0 0");
                }else if($(this).parent().children().index($(this))==1){
				$(this).removeClass("r-navon");
				$(this).addClass("r-nav");
                //$(this).css("background-position","0 -70px");
                }
            }
        );
		
		if(w==1){
			 return
			}
        dom.find(".amazon_scroller_nav").children("li").click(function(){
            if($(this).parent().children().index($(this))==0){
                previous()
                }else if($(this).parent().children().index($(this))==1){
                next()
                }
            });
    function begin(){
        var a=dom.find("ul:first").children("li").outerWidth(true)*w;
        dom.find("ul:first").children("li").hide();
        dom.find("ul:first").children("li").slice(0,r).show();
        u=dom.find("ul:first").outerWidth();
        v=dom.find("ul:first").outerHeight();
        dom.find("ul:first").width(a);
        dom.width(u+100);
        dom.height(v);
        dom.children(".amazon_scroller_mask").width(u);
        dom.children(".amazon_scroller_mask").height(v);
        dom.find("ul:first").children("li").show();
        dom.css("position","relative");
        dom.find("ul:first").css("position","absolute");
        dom.children(".amazon_scroller_mask").width(u);
        dom.children(".amazon_scroller_mask").height(v);
        //dom.find(".amazon_scroller_nav").css('top',(v-50)/2+parseInt(j)+"px");
        dom.find(".amazon_scroller_nav").width(u+100)
        }
        function previous(){
        if(t==0){
            t=x-2
            }else{
            if(t==1){
                t=x-1
                }else{
                t-=2
                }
            }
        play()
    }
    function next(){
    play()
    }
    function play(){
    clearTimeout(s);
    dom.find("ul:first").animate({
        left:-(t*u)
        },500);
    t++;
    if(t>=x){
        t=0
        }
        s=setTimeout(play,g)
    }
    function s_s_ul(a,b,c,d,e){
    b=parseInt(b);
    c=parseInt(c);
    var f="border: "+d+" solid "+" "+c+"px; padding:"+b+"px; background-color:"+e;
    a.attr("style",f)
    }
    function s_s_nav(a,d){
    var b=a.children("li:first");
    var c=a.children("li:last");
    //a.children("li").css("width","20px");
    //a.children("li").css("height","20px");
    //a.children("li").css('background-image','url("'+d+'/t_bg.gif")');
	c.addClass("r-nav");
	b.addClass("l-nav");
    //c.css('background-position','0 -70px');
    //b.css('background-position','0 0');
    //c.css('right','0px')
    }
}

/*
 * 新扩展的插件
 * 作用：模仿windows的select下拉菜单
 * 调用：$(select object).simuSelect()
 * 类型：返回新的select对象，类型为jQuery对象类型
*/
$.fn.simuSelect = function(c){
	var _d = new Date();
	var _tem = _d.getTime();
	var this0 = this;
	var c = c || 'simu-select';
	
	//格式化SELECT为HTML并初始化它
	this.tmp_name = '<span class="simu-select-name"><span>'+$('option:selected', this).html()+'</span></span>';
	this.tmp_list = '<div class="simu-select-list">'+String($(this).html()).replace(/optgroup/ig, 'ul').replace(/option/ig, 'li')+'</div>';
	this.tmp_input = '<input type="hidden" name="'+$(this).attr('name')+'" value="'+$('option:selected', this).val()+'" />';

	$(this).replaceWith('<div id="select'+_tem+'" class="'+c+'">'+this.tmp_name+this.tmp_list+this.tmp_input+'</div>');
	
	this.tmp_name = null;
	this.tmp_list = null;
	this.tmp_input = null;
	
	var this2 = $('#select'+_tem);
	this2.find('.simu-select-list li').eq(0).addClass('cur');
	this2.find('.simu-select-list li')
	.hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		}
	)
	.click(function(){
		$('.simu-select-name span', this2).html(this.innerHTML);
		$('input', this2).val(this.value);
		$('.simu-select-list', this2).hide();
		this2.find('.simu-select-list li').removeClass('cur');
		$(this).addClass('cur');
	});
	
	$('.simu-select-name' ,this2).click(function(){
		$('.simu-select-list', this2).toggle();
	}).hover(
		function(){
			$(this).addClass('simu-select-name-hover');
		}, 
		function(){
			$(this).removeClass('simu-select-name-hover');
		}
	);
	
	this.foo = function(){
		$('.simu-select-list', this2).hide();
	};
	
	this2.hover(
		function(){
			$(document).unbind("mousedown", this0.foo);
		},
		function(){
			$(document).bind("mousedown", this0.foo);
		}
	);
	
	return this2;
};
})(jQuery);