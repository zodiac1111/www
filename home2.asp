<html>
<head>
<title>ʱ����ʾ</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
<script type="text/javascript" src="/style/jquery-ui-sliderAccess.js"></script>
<script type="text/javascript" src="/style/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="/style/jquery-ui-timepicker-zh-CN.js"></script>
<style type="text/css">
<!--
.style1 {color: #00FFFF}
-->
</style>
</head> 
<body bgcolor="778899" >
<SCRIPT language=javascript >
function Year_Month(){ 
    var now = new Date(); 
    var yy = now.getFullYear(); 
    var mm = now.getMonth(); 
    var mmm=new Array();
    mmm[0]="1��";
    mmm[1]="2��";
    mmm[2]="3��";
    mmm[3]="4��";
    mmm[4]="5��";
    mmm[5]="6��";
    mmm[6]="7��";
    mmm[7]="8��";
    mmm[8]="9��";
    mmm[9]="10��";
    mmm[10]="11��";
    mmm[11]="12��";
    mm=mmm[mm];
    return(mm ); 
}
    
function thisYear(){ 
    var now = new Date(); 
    var yy = now.getFullYear(); 
    return(yy); }
    
function Date_of_Today(){ 
    var now = new Date(); 
    return(now.getDate() ); }
    
function Date_of_week(){
	  var now=new Date(); 
	  var w; 
if(now.getDay()==0)  w="������";
if(now.getDay()==1)  w="����һ";
if(now.getDay()==2)  w="���ڶ�";
if(now.getDay()==3)  w="������";
if(now.getDay()==4)  w="������";
if(now.getDay()==5)  w="������";
if(now.getDay()==6)  w="������";  
	  return(w);}    
    
function CurentTime(){ 
    var now = new Date(); 
    var hh = now.getHours(); 
    var mm = now.getMinutes(); 
    var ss = now.getTime() % 60000; 
    ss = (ss - (ss % 1000)) / 1000; 
    var clock = hh+':'; 
    if (mm < 10) clock += '0'; 
    clock += mm+':'; 
    if (ss < 10) clock += '0'; 
    clock += ss; 
    return(clock); } 

function CurenDate(){
	var now=new Date();
	var year=thisYear();
	var month=Year_Month();
	var Today=Date_of_Today();
	var week=Date_of_week();
	var day='����ʱ�䣺'+year+'��'+month+Today+'��  '+week;
	return(day);	
	}
    
function refreshCalendarClock(){ 
document.all.calendarClock1.innerHTML = CurenDate();
document.all.calendarClock2.innerHTML = CurentTime(); 
}

document.write('<span id="calendarClock1" class="style1"> </span>&nbsp;');
document.write('<span id="calendarClock2" class="style1"> </span>');
setInterval('refreshCalendarClock()',1000);
</script>
<span class="style1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;������ʱ��:
<% server_time(); %></span>



</body>
</html>
