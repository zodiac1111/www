<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<title>串口方案</title>
		<meta http-equiv="Pragma" content="no-cache" />
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"/>
		<link rel="stylesheet" href="/style/sys.css" type="text/css"/>
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"/>
		<script src="/style/wwyfunc.js" type="text/javascript"></script>
		<link rel="stylesheet" href="/style/table.css" type="text/css"/>
		<!-- jquery -开始-->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui-timepicker-addon.css" />
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN.js"></script>
		<!-- jquery的 -结束 -->
		<% init_sysparam(); //初始化系统参数,获得例如表计个数,串口个数,串口方案个数等参数 %>
		<script type="text/javascript">
			// $("#tbody_dat tr").mouseover(function() {
			// $(this).addClass("over");
			// var rows = $(this).attr('relrow');
			// });
			// $("#tbody_dat tr").mouseout(function() {
			// $(this).removeClass("over");
			// });
			//串口参数 post提交
			$(document).ready(function() {
				// $.post('/goform/sioplan', $("#paraform").serialize() + "&init=1", function(result) {
				// $("#tbody_dat").html(result);
				// $("#tbody_dat tr").mouseover(function() {
				// $(this).addClass("over");
				// });
				// $("#tbody_dat tr").mouseout(function() {
				// $(this).removeClass("over");
				// });
				// //alert("OK");
				// });
				$("#btnsio").click(function() {
					$.post('/goform/sioplan',
					//$.param($("#paraform")),
					//$("#paraform").serialize(), 
					"test",
					function(result) {
						$("#tbody_dat").html(result);
						alert("OK");
					});
				});
			});
		</script>
	</head>
	<body>
		<h1 align="center"><img src="/graphics/logo32.png" height="45" /></h1>
		<form action="/goform/sioplan" method="post" id="paraform" name="paraform">
			<table id="Table1" border="1" cellspacing="1" cellpadding="1" class="sioplanTable">
				<thead>
					<tr>
						<th>串口方案号</th>
						<th>校验位</th>
						<th>数据位</th>
						<th>停止位</th>
						<th>波特率</th>
						<th>通讯方式</th>
					</tr>
				</thead>
				<!-- 循环依次添加所有串口方案 一列一条  -->
				<tbody id="tbody_dat" ><tr><td>数据</td></tr> </tbody>
			</table>
		</form>
		<p align="center" height=25>
			<input type="button" name="Update" value="设置" id="Update" onclick="db_update();" />
			<!--
			<input type=button name=bDelItem value="删除" ID="bDelItem"  onclick="return
			DelSubmit();">
			<input type=button  name=bAddItem value="添加" ID="bAddItem" OnClick="return
			Redirect('AddRoutePara.asp');" >
			-->
			<input type="button" name="Refresh" value="读取" id="Refresh" onclick="return RefreshWin();" />
			<!-- 提交操作类型 更新,还是其他 -->
			<input class="hideinp" type="text" name="OpType" value="" id="optype" />
			<button id="btnsio">更新</button>
		</p>
	</body>
</html>
