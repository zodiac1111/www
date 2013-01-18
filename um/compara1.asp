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
				$("#btnsio").click(function() {
					var errobj = document.getElementById("errobj");
					if (errobj != null) {
						alert("非法参数");
						return;
					}
					$("#icon_init").show();
					//$("#tbody_dat").html("<tr><td colspan=\"6\" ></td></tr>");
					//$("#tbody_dat tr td").addClass('load_bgpic_hight');
					$.post('/goform/sioplan', $("#paraform").serialize(), function(result) {
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
					$.post('/goform/sioplan', "init=1", function(result) {
						$("#tbody_dat").html(result);
						$("#icon_init").hide("fade", 2000);
						//alert("OK");
					});
				});
				/* 首次加载串口参数 */
				$("#init").click();
				//第一次显示页面,直接刷新以显示数据.
				//$("#btnsio").click();
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
				<tbody id="tbody_dat" >
				
				</tbody>
			</table>
		</form>
		<p align="center" height=25>
			<!-- <input type="button" name="Update" value="设置" id="Update" onclick="db_update();" /> -->
			<!-- <input type="button" name="Refresh" value="读取" id="Refresh" onclick="return RefreshWin();" /> -->
			<!-- 提交操作类型 更新,还是其他 -->
			<input class="hideinp" type="text" name="OpType" value="" id="optype" />

			<button  class="hideinp" id="init">初始化</button>
			<button id="btnsio" class="btn_update">更新</button>
			<input type="text" id="icon_init" class="wait_icon_24x24_load" />
			<input type="text" id="icon_ok" class="wait_icon_24x24 ok_24x24" />

		</p>
	</body>
</html>
