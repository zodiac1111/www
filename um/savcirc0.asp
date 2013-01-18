<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--  Copyright (c) Echon., 2006. All Rights Reserved. 存储周期页面-->
<html>
	<head>
		<title>存储周期</title>
		<meta http-equiv="Pragma" content="no-cache" charset="utf-8">
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"/>
		<link rel="stylesheet" href="/style/sys.css" type="text/css"/>
		<link rel="stylesheet" href="/style/table.css" type="text/css"/>
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"/>
		<script type="text/JavaScript" src="/style/wwyfunc.js" ></script>
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
					$.post('/goform/savecycle', $("#savecycle").serialize(), function(result) {
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
					$.post('/goform/savecycle', "init=1", function(result) {
						$("#tbody_dat").html(result);
						$("#icon_init").hide("fade", 2000);
						// alert("result");
					});
				});
				/* 首次加载串口参数 */
				$("#init").click();
			});
		</script>
	</head>
	<body>
		<noscript>
			Your browser does not support JavaScript. 你的浏览器不支持JavaScript.
		</noscript>
		<br />
		<h1 align="center"><img src="/graphics/logo72.png" height="45"></h1>
		<form action="/goform/savecycle"  id="savecycle" >
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
				</thead>
				<tbody id="tbody_dat">
					
				</tbody>
			</table>
		</form>
		<p align="center">
			<button id="init" class="hideinp" >初始化</button>
			<button id="btnUpdate" class="btn_update">更新</button>
			<input type="text" id="icon_init" class="wait_icon_24x24_load" />
			<input type="text" id="icon_ok" class="wait_icon_24x24 ok_24x24" />
		</p>
	</body>
</html>
