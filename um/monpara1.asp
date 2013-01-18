<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- Copyright (c) Echon., 2006. All Rights Reserved. 监视端口参数页面-->
<html>
	<head>
		<title>监视参数</title>
		<meta http-equiv="Pragma" content="no-cache" charset=utf-8>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css" />
		<link rel="stylesheet" href="/style/sys.css" type="text/css" />
		<link rel="stylesheet" href="/style/table.css" type="text/css" />
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css" />
		<script src="/style/wwyfunc.js"  type='text/javascript' ></script>
		<!-- 基于jquery的日期时间控件所需要的文件 -开始 -->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN.js"></script>
		<!-- 基于jquery的日期时间控件所需要的文件 -结束 -->
		<script type="text/javascript">
			$(document).ready(function() {
				/* 按钮 */
				$(function() {
					$(".btn_update").button({
						icons : {
							primary : "ui-icon-refresh"
						}
					});
				});
				$("#icon_init").hide();
				$("#icon_ok").hide();
				//串口参数 post提交
				/* 定义按钮 post函数 */
				$("#btnUpdate").click(function() {
					var errobj = document.getElementById("errobj");
					if (errobj != null) {
						alert("非法参数");
						return;
					}
					$("#icon_init").show();
					//$("#tbody_dat").html("<tr><td colspan=\"6\" ></td></tr>");
					//$("#tbody_dat tr td").addClass('load_bgpic_hight');
					$.post('/goform/monparas', $("#monparas").serialize(), function(result) {
						//$("#tbody_dat tr td").removeClass('load_bgpic_hight');
						//$("#tbody_dat").html(result);
						$("#icon_init").hide();
						$("#icon_ok").show();
						$("#icon_ok").hide("fade", 1000);
						//alert("OK");
					});
				});
				/* 隐藏的按钮用于初始化,应为post的form只能使用按钮触发*/
				$("#init").click(function() {
					$("#icon_init").show();
					$.post('/goform/monparas', "init=1", function(result) {
						$("#tbody_dat").html(result);
						$("#icon_init").hide("fade", 2000);
						//alert("OK");
					});
				});
				/* 首次加载串口参数 */
				$("#init").click();
			});
		</script>
	</head>
	<body>
		<br/>
		<h1  align="center"><img src="/graphics/logo52.png" height="45"></h1>
		<form action="/goform/monparas"  method="post"  id="monparas" name="monparas">
			<table class="monparamTable"  border="1" cellspacing="1" cellpadding="1" >
				<thead>
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
				</thead>
				<tbody id="tbody_dat">
					<% load_monparams(); %>
				</tbody>
			</table>
		</form>
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
		<p align="center">
			<button id="init" class="hideinp" >初始化</button>
			<button id="btnUpdate" class="btn_update">更新</button>
			<input type="text" id="icon_init" class="wait_icon_24x24_load" />
			<input type="text" id="icon_ok" class="wait_icon_24x24 ok_24x24" />
		</p>
	</body>
</html>
