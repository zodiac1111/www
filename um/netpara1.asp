<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html>
	<HEAD>
		<title>�����������</title>
		<!-- Copyright (c) Echon., 2006. All Rights Reserved. -->
		<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css">
		</link>
		<link rel="stylesheet" href="/style/sys.css" type="text/css">
		</link>
		<link rel="stylesheet" href="/style/table.css" type="text/css">
		</link>
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css">
		</link>
		<script src="/style/wwyfunc.js" language='javascript' type='text/JavaScript'></script>
		<% init_sysparam(); //��ʼ��ϵͳ����,��������Ƹ���,���ڸ���,���ڷ��������Ȳ��� %>
	</HEAD>
	<body>
		<br />
		<h1 align="center"><img src="/graphics/logo42.png" height="45"></h1>
		<form action="/goform/netpara" method=post name="paraform">
			<table class="sioplanTable" border="1">
				<tr>
					<th>���ں�</th>
					<th>ʹ������</th>
					<th>IP��ַ</th>
					<th>��������</th>
					<th>����</th>
				</tr>
				<% get_netparams(); %>
			</table>
			<p ALIGN="center">
				<input type=button name="Update" value="����" ID="Update" OnClick="db_update();">
				<!--<input type=button name=bDelItem value="ɾ��" ID="bDelItem"  onclick="return
				DelSubmit();">
				<input type=button  name=bAddItem value="���" ID="bAddItem" OnClick="return
				Redirect('AddRoutePara.asp');" >
				-->
				<input type=button name=Refresh value="��ȡ" ID="Refresh" OnClick="return RefreshWin();">
				<!-- �ύ�������� ����,�������� -->
				<input class=hideinp type=text name=OpType value="" id="optype">
			</p>
		</form>
	</body>
</html>
