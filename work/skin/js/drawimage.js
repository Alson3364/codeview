<!--
function DrawImage(ImgD,iwidth,iheight){
   var image=new Image();
   image.src=ImgD.src;
   if(image.width>0 && image.height>0){
    flag=true;
    if(image.width/image.height>= iwidth/iheight){
     if(image.width>iwidth){  
     ImgD.width=iwidth;
     ImgD.height=(image.height*iwidth)/image.width;
	 ImgD.style.marginTop = (iheight-ImgD.height)/2 + "px";
     }else{
     ImgD.width=image.width;  
     ImgD.height=image.height;
	 ImgD.style.marginTop = (iheight-ImgD.height)/2 + "px";
     }
     //ImgD.alt=image.width+"×"+image.height;
     }
    else{
     if(image.height>iheight){  
     ImgD.height=iheight;
     ImgD.width=(image.width*iheight)/image.height;
	 ImgD.style.marginTop = (iheight-ImgD.height)/2 + "px";
     }else{
     ImgD.width=image.width;  
     ImgD.height=image.height;
	 ImgD.style.marginTop = (iheight-ImgD.height)/2 + "px";
     }
     //ImgD.alt=image.width+"×"+image.height;
     }
    }
   /*else{
    ImgD.src="";
    ImgD.alt=""
    }*/
} 
   
   
function DrawImage_w(ImgD,iwidth){
   var image=new Image();
   image.src=ImgD.src;
   if(image.width>0 && image.height>0){
	if (image.width>iwidth){
	ImgD.width = iwidth;
	ImgD.height = (iwidth*image.height)/image.width;
    }
   }
}

function DrawImage_gw(ImgD,iwidth){
   var image=new Image();
   image.src=ImgD.src;
   if(image.width>0 && image.height>0){
	ImgD.width = iwidth;
	ImgD.height = (iwidth*image.height)/image.width;
   }
} 
-->