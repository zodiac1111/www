<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html>
	<head>
		<title>Arm Home</title>
		<!--  Copyright (c) Echon., 2006. All Rights Reserved. -->
		<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"/>
		<link rel="stylesheet" href="/style/sys.css" type="text/css"/>
		<link rel="stylesheet" href="/style/table.css" type="text/css"/>
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"/>
		<script src="/style/wwyfunc.js" type="text/JavaScript"></script>
	</head>
	<body>
		<noscript> Your browser does not support JavaScript. </noscript>
		<br />
		<h1 align="center"><img src="/graphics/logo72.png" height="45"></h1>
		<form action="/goform/savecycle" method="post" id="paraform" name="paraform">
			<table id="Table1" class="sioplanTable" border="1" cellspacing="1" cellpadding="1">
				<thead>
					<tr>
						<th>存储周期</th>
						<th>总电量</th>
						<th>分时电量</th>
						<th>相线无功电能</th>
						<th>最大需量</th>
						<th>实时遥测量</th>
						<th>失压断相</th>
					</tr>
				<thead>
					<tbody>
						<% savecycle(); %>
					</tbody>
			</table>
			<p align="center">
				<input type="button" name="Update" value="设置" id="Update" onclick="db_update();">
				<input type="button" name=Refresh value="读取" id="Refresh" onclick="return RefreshWin();">
				<!-- 提交操作类型 更新,还是其他-->
				<input class="hideinp" type="text" name="optype" value="" id="optype">
			</p>
		</form>
	</body>
</html>
