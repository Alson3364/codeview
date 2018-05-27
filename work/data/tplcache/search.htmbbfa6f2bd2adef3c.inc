<?php
$z[0]=Array("field","",209,228);
$z[0][4]['name']="title";
$z[1]=Array("global","",229,255);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",297,326);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",367,426);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",2820,2855);
$z[4][4]['filename']="head.htm";
$z[5]=Array("include","",2927,2962);
$z[5][4]['filename']="left.htm";
$z[6]=Array("field","",3007,3068);
$z[6][4]['name']="typename";
$z[6][4]['function']="”GetTypeName(@me)”";
$z[7]=Array("field","",3142,3171);
$z[7][4]['name']="position";
$z[8]=Array("list","\n                         		<li><a href=\"[field:arcurl/]\" target=\"_blank\" title=\"[field:title/]\"><div class=\"l ll t_c\"><img height=\"134\" src=\"[field:picname/]\"><ins></ins><h4 class=\"date fmyh\"></h4></div></a><div class=\"r rr\"><a href=\"[field:arcurl/]\" target=\"_blank\" title=\"[field:title/]\"><h3 class=\"ttuc\"><font>></font><strong class=\"fmyh\"> [field:title/]</strong><a class=\"ff\" href=\"[field:arcurl/]\" target=\"_blank\" title=\"点击查看更多\">[查看更多]</a></h3></a><h4 class=\"news_info\"><span>发布时间：</span><span>[field:pubdate function=\"GetDateTimeMK(@me)\" /]</span></h4><div class=\"news_intro\">\n            [field:description function=\"cn_substr(@me,150)\"/]... \n            \n          </div></div></li>\n            ",3590,4361);
$z[8][4]['pagesize']="8";
$z[9]=Array("include","",4573,4610);
$z[9][4]['filename']="footer.htm";

?>