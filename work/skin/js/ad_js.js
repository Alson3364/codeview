	var t = n = 0, count;
	$(document).ready(function(){	
		count=$("#banner_list a").length;
		$("#banner_list a:not(:first-child)").hide();
                $("#banner_list a:eq(0)").show();
                $("#ad_banner li").eq(0).addClass("on").siblings().removeClass("on");

		$("#ad_banner li").mouseover(function() {
  $('#banner_list').children('a').eq($('#ad_banner li').index(this)).find("img").each(function(){ 
             var img = this;
              if(img.getAttribute("initSrc")){        //alert(2);
                        img.src = img.getAttribute("initSrc");
                        img.removeAttribute("initSrc");
                    }
          });
 
			var i = $(this).text() - 1;//获取Li元素内的值，即1，2，3，4
			n = i;
			if (i >= count) return;
				$("#banner_list a").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
			document.getElementById("ad_banner").style.background="";
			$(this).toggleClass("on");
			$(this).siblings().removeAttr("class");
		});
		t = setInterval("showAuto()", 5000);
		$("#ad_banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 5000);});
	})
	
	function showAuto()
	{
		n = n >=(count - 1) ? 0 : ++n;
		$("#ad_banner li").eq(n).trigger('mouseover');
                $("#ad_banner li").eq(n).trigger('mouseout');
	}