<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html>
	<HEAD>
		<title>Arm Home</title>
		<!--  Copyright (c) Echon., 2006. All Rights Reserved. -->
		<meta http-equiv="Pragma" content="no-cache" charset="gb2312">
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"/>
		<link rel="stylesheet" href="/style/sys.css" type="text/css"/>
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"/>
		<script src="/style/wwyfunc.js" type="text/javascript"></script>
		<link rel="stylesheet" href="/style/table.css" type="text/css"/>
		<!-- jquery -��ʼ-->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui-timepicker-addon.css" />
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN-GB2312.js"></script>
		<!-- jquery�� -���� -->
		<% init_sysparam(); //��ʼ��ϵͳ����,��������Ƹ���,���ڸ���,���ڷ��������Ȳ��� %>
		<script type="text/javascript">
		//���ڲ��� post�ύ
			$(document).ready(function() {
				$.post('/goform/sioplan', $("#paraform").serialize() + "&init=1", function(result) {
					$("#tbody_dat").html(result);
					$("#tbody_dat tr").mouseover(function() {
						$(this).addClass("over");
						var rows = $(this).attr('relrow');
					});
					$("#tbody_dat tr").mouseout(function() {
						$(this).removeClass("over");
					});
					//alert("OK");
					//$("#tip").html("���");
				});
				$("#btnsio").click(function() {
					$.post('/goform/sioplan',
					//$.param($("#paraform")),
					$("#paraform").serialize(), function(result) {
						$("#tbody_dat").html(result);
						$("#tbody_dat tr").mouseover(function() {
							$(this).addClass("over");
							var rows = $(this).attr('relrow');
						});
						$("#tbody_dat tr").mouseout(function() {
							$(this).removeClass("over");
						});
						alert("OK");
						//$("#tip").html("���");
					});
				});
			});
		</script>
	</head>
	<body>
		<h1 align="center"><img src="/graphics/logo32.png" height="45"></h1>
		<form action="/goform/sioplan" method="post" id="paraform" name="paraform">
			<table id="Table1" border="1" cellspacing="1" cellpadding="1" class="sioplanTable">
				<thead>
					<tr>
						<th>���ڷ�����</th>
						<th>У��λ</th>
						<th>����λ</th>
						<th>ֹͣλ</th>
						<th>������</th>
						<th>ͨѶ��ʽ</th>
					</tr>
				</thead>
				<!-- ѭ������������д��ڷ��� һ��һ��  -->
				<tbody id="tbody_dat" >
				</tbody>
			</table>
		</form>
		<p align="center" height=25>
			<input type="button" name="Update" value="����" id="Update" onclick="db_update();">
			<!--
			<input type=button name=bDelItem value="ɾ��" ID="bDelItem"  onclick="return
			DelSubmit();">
			<input type=button  name=bAddItem value="���" ID="bAddItem" OnClick="return
			Redirect('AddRoutePara.asp');" >
			-->
			<input type="button" name="Refresh" value="��ȡ" id="Refresh" onclick="return RefreshWin();">
			<!-- �ύ�������� ����,�������� -->
			<input class="hideinp" type="text" name="OpType" value="" id="optype">
			<button id="btnsio">
				����
			</button>
		</p>
	</body>
</html>
