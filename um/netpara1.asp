<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- Copyright (c) Echon., 2006. All Rights Reserved. 网口监视参数页面-->
<html>
	<head>
		<title>网络参数设置</title>
		<meta http-equiv="Pragma" content="no-cache" charset=utf-8>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css" />
		<link rel="stylesheet" href="/style/sys.css" type="text/css" />
		<link rel="stylesheet" href="/style/table.css" type="text/css" />
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css" />
		<script src="/style/wwyfunc.js"  type='text/javascript'></script>
		<!-- jquery -开始-->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui-timepicker-addon.css" />
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN.js"></script>
		<!-- jquery的 -结束 -->
		<% init_sysparam(); //初始化系统参数,获得例如表计个数,串口个数,串口方案个数等参数 %>
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
					$.post('/goform/netpara', $("#netpara").serialize(), function(result) {
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
					$.post('/goform/netpara', "init=1", function(result) {
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
		<br />
		<h1 align="center"><img src="/graphics/logo42.png" height="45"></h1>
		<form id="netpara"  name="netpara">
			<table class="sioplanTable" border="1">
				<thead>
					<tr>
						<th>网口号</th>
						<th>使用网口</th>
						<th>IP地址</th>
						<th>子网掩码</th>
						<th>网关</th>
					</tr>
				</thead>
				<tbody id="tbody_dat">
				</tbody>
			</table>
		</form>
		<p ALIGN="center">
			<!-- <input type="button" name="Update" value="设置" ID="Update" OnClick="db_update();"> -->
			<!--<input type=button name=bDelItem value="删除" ID="bDelItem"  onclick="return
			DelSubmit();">
			<input type="button"  name=bAddItem value="添加" ID="bAddItem" OnClick="return
			Redirect('AddRoutePara.asp');" >
			-->
			<!-- <input type="button" name=Refresh value="读取" ID="Refresh" OnClick="return RefreshWin();"> -->
			<!-- 提交操作类型 更新,还是其他 -->
			<input class="hideinp" type="text" name="OpType" value="" id="optype">
			<button id="init" class="hideinp" >初始化</button>
			<button id="btnsio" class="btn_update">更新</button>
			<input type="text" id="icon_init" class="wait_icon_24x24_load" />
			<input type="text" id="icon_ok" class="wait_icon_24x24 ok_24x24" />
		</p>

	</body>
</html>
