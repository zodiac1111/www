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
						<th>�洢����</th>
						<th>�ܵ���</th>
						<th>��ʱ����</th>
						<th>�����޹�����</th>
						<th>�������</th>
						<th>ʵʱң����</th>
						<th>ʧѹ����</th>
					</tr>
				<thead>
					<tbody>
						<% savecycle(); %>
					</tbody>
			</table>
			<p align="center">
				<input type="button" name="Update" value="����" id="Update" onclick="db_update();">
				<input type="button" name=Refresh value="��ȡ" id="Refresh" onclick="return RefreshWin();">
				<!-- �ύ�������� ����,��������-->
				<input class="hideinp" type="text" name="optype" value="" id="optype">
			</p>
		</form>
	</body>
</html>
