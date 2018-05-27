// JavaScript Document
function kf_setCookie(kfguin){
var fkcokie = kfguin;
if(kfguin=='a')
{
$('#divFloatToolsView').animate({width: 'show', opacity: 'show'}, 'normal',function(){ $('#divFloatToolsView').show(); });$('#aFloatTools_Show').attr('style','display:none');$('#aFloatTools_Hide').attr('style','display:block');
document.cookie="userId=800";
document.cookie="userName=hulk";
}
if(kfguin=='b')
{
$('#divFloatToolsView').animate({width: 'hide', opacity: 'hide'}, 'normal',function(){ $('#divFloatToolsView').hide(); });$('#aFloatTools_Show').attr('style','display:block');$('#aFloatTools_Hide').attr('style','display:none');
document.cookie="userId=900";
document.cookie="userName=hulk";
}
}
function testcookie(){
var strCookie=document.cookie;
var arrCookie=strCookie.split("; ");
var userId;
for(var i=0;i<arrCookie.length;i++){
var arr=arrCookie[i].split("=");
if("userId"==arr[0]){
userId=arr[1];
break;
}
}
if(userId==800){
	$('#aFloatTools_Show').hide();
	$('#aFloatTools_Hide').show();	
	$('#divFloatToolsView').show();
}
else{
if(userId==900){
	$('#aFloatTools_Show').show();
	$('#aFloatTools_Hide').hide();	
	$('#divFloatToolsView').hide();
}
}
}
testcookie();