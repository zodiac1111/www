<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<!-- Copyright (c) Echon., 2006. All Rights Reserved. 监视端口参数页面-->
<html>
	<head>
		<title>Arm Home</title>
		<meta http-equiv="Pragma" content="no-cache" charset=utf-8>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css" />
		<link rel="stylesheet" href="/style/sys.css" type="text/css" />
		<link rel="stylesheet" href="/style/table.css" type="text/css" />
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css" />
		<script src="/style/wwyfunc.js"  type='text/javascript' ></script>
		<% init_sysparam(); //初始化系统参数,获得例如表计个数,串口个数,串口方案个数等参数 %>
	</head>
	<body> 
		<br/>
	<h1  align="center"><img src="/graphics/logo52.png" height="45"></h1>
		<form action="/goform/monparas"  method="post"  id="paraform" name="paraform">
			<table class="monparamTable"  border="1" cellspacing="1" cellpadding="1" >
				<tr>  
					<th width="5%" class="monparamTableHead">序号</th>
					<th width="6%" class="monparamTableHead">使用端口</th>
					<th width="4%" class="monparamTableHead">服务端口</th>
					<th width="6%" class="monparamTableHead">串口方案</th>
					<th width="6%" class="monparamTableHead">使用规约</th>
					<th width="5%" class="monparamTableHead">终端地址</th>
					<th width="6%" class="monparamTableHead">对时有效</th>
					<th width="6%" class="monparamTableHead">转发有效</th>
					<th width="5%" class="monparamTableHead">转发数目</th>
					<th width="5%" class="monparamTableHead">序号1</th>
					<th width="6%" class="monparamTableHead">序号2</th> 
					<th width="5%" class="monparamTableHead">序号3</th>
					<th width="5%" class="monparamTableHead">序号4</th>
					<th width="5%" class="monparamTableHead">序号5</th>
					<th width="5%" class="monparamTableHead">序号6</th>
					<th width="4%" class="monparamTableHead">序号7</th> 
					<th width="5%" class="monparamTableHead">序号8</th>
					<th width="5%" class="monparamTableHead">序号9</th>
				</tr>
				<% load_monparams(); %>
			</table>
			<p ALIGN="center" height=25> 
			<input type="button" name="Update" value="设置" ID="Update" OnClick="db_update();">
			<!--
			<input type=button name=bDelItem value="删除" ID="bDelItem"  onclick="return DelSubmit();">
			<input type=button  name=bAddItem value="添加" ID="bAddItem" OnClick="return Redirect('AddRoutePara.asp');" >
			-->
			<input type="button"  name=Refresh value="读取" ID="Refresh" OnClick="return RefreshWin();" > 
			<!-- 隐藏的文本框:用于提交操作类型 更新,还是其他 -->
			<input class="hideinp"  type="text" name=OpType value=""  id="optype" > 
			</p>
		</form>
	</body>
</html>
