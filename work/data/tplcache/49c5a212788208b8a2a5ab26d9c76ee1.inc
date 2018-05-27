<li>< a href="[field:arcurl/]" target="_blank">[field:image/]</ a> </li>
            /dede:arclist
          </ul>
          <div class="ad_button"> <span id="ad_btnnum1" onclick="doChange(1)" class="ad_btn ad_btn_sel"></span> <span id="ad_btnnum2" onclick="doChange(2)" class="ad_btn"></span> </div>
        </div>
      </div>
      <script type="text/javascript" src="/skin/js/jquery-1.8.3.min.js"></script> 
      <script type="text/javascript">
$(".ad_prev a,.ad_next a").hide();
var ad_speed = 5000;//主题切换速度
var ad_speed3 = 600;//背景移动速度
var BgMar; 
$(document).ready(function(){


	var h=document.documentElement.clientHeight;
	BgMar = setInterval("doChange(0)",ad_speed);
	$(".ad_sliderContainer").hover(function(){
		$(".ad_prev a,.ad_next a").show();
	},function(){
		$(".ad_prev a,.ad_next a").hide();
	})

});
 
 

var tindex=1;
var showindex=0;
var currentindex=1;
//切换操作
function doChange(index){
	if(index==0){
		tindex++;
	}else{
		tindex = index;
		clearInterval(BgMar);
		changeTheme(tindex);	
		BgMar = setInterval("doChange(0)",ad_speed);
		return;
	}
	if(tindex>2)
	{
		tindex=1;
	}
	changeTheme(tindex);
}
//切换操作执行
function changeTheme(index){
	$(".ad_btn").removeClass('ad_btn_sel');
	$("#ad_btnnum"+index).addClass('ad_btn_sel');
	
	var w1 = document.getElementById("adbox").offsetWidth;
	var w2 = w1-w1*2;
	$("#ad_imgbox"+index).stop();
	$("#ad_imgbox"+currentindex).stop();
	

	if(currentindex<index){
		$("#ad_imgbox"+index).show().css("right",w1-20).animate({ right:0},ad_speed3,null,function(){});
		$("#ad_imgbox"+currentindex).animate({ right:w2},ad_speed3,null,function(){$(this).hide();});
	}
	if(currentindex>index){
		$("#ad_imgbox"+index).show().css("right",w1-20).animate({ right:0},ad_speed3,null,function(){});
		$("#ad_imgbox"+currentindex).animate({ right:w2},ad_speed3,null,function(){$(this).hide();});
	}
	currentindex = index;
}
</script> 
    </div>
    
  </div>
  
  <div class="h_mid_con1">
    <div class="left_box">
      <div class="left_ad"> 
        <script type="text/javascript" src="/skin/js/jquery-1.4.js"></script> 
        <script type="text/javascript" src="/skin/js/ad_js.js"></script>
        <style type="text/css">
#ad_banner { position:relative; margin:0px; padding:0px; width:390px; height:150px; text-align:left; float:left; display:inline; overflow:hidden; }
#ad_banner ul {position:absolute; margin:0px; padding:0px; list-style-type:none; filter: Alpha(Opacity=80);opacity:0.8; z-index:8; bottom:8px; right:10px; }
#ad_banner ul li { margin:0 3px; padding:0px 4px; height:16px; line-height:16px; border:1px solid #aaa; background:#F9F9F9; cursor:pointer; float:left; display:block;}
#ad_banner ul li.on { background:#e60000; color:#fff; }
#banner_list a{ position:absolute; } <!-- 让四张图片都可以重叠在一起-->
</style>
        <div id="ad_banner">
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
          <div id="banner_list"> <a style="display:inline;" target="_blank"><img src="/skin/images/2014825234924682.jpg" width="390" height="150" border="0"></a> <a style="display:inline;" target="_blank"><img src="/skin/images/2014825234936750.jpg" width="390" height="150" border="0"></a> </div>
        </div>
      </div>
      <div class="right_con">
        <div class="h_typename"><b>新闻资讯</b><i>News center</i><em>{dede:type typeid='10'}<a href="[field:typelink/]"><img src="/skin/images/more01.jpg" border="0" /></a>{/dede:type}</em></div>
        
        <SCRIPT type=text/javascript src="/skin/js/common.js"></SCRIPT>
        <div class="news_rollBox">
          <div class="h_Box" id="ISL_Cont_1"> {dede:arclist row=5 titlelen=32 typeid='10' infolen='120'}
            <div class="h_item_box">
              <dl>
                <dt><a href="[field:arcurl/]" title="[field:title/]" target="_blank">[field:title/]</a></dt>
                <dd><i>[field:pubdate function="MyDate('Y-m-d',@me)"/]</i>
                  <p> [field:info/]...</p>
                </dd>
              </dl>
            </div>