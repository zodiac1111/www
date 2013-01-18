<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<HEAD>
		<title>Arm Home</title>
		<!- Copyright (c) Echon., 2006. All Rights Reserved. ->
		<meta http-equiv="Pragma" content="no-cache" charset="utf-8">
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css" />
		<link rel="stylesheet" href="/style/sys.css" type="text/css" />
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css" />
		<!-- 基于jquery的日期时间控件所需要的文件 -开始 -->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN.js"></script>
		<!-- 基于jquery的日期时间控件所需要的文件 -结束 -->
		<script src="/style/wwyfunc.js" type='text/javascript'></script>
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
					$.post('/goform/sysparam', $("#sysparam").serialize(), function(result) {
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
					$.post('/goform/sysparam', "init=1", function(result) {
						//alert(result);
						var asys = result.split(",");
						if (asys.length != 6) {
							alert("服务器返回错误: " + result);
						} else {
							//document.getElementById("mtr_num").value= asys[0];
							$("#mtr_num").val(asys[0]);
							$("#sioplan_num").val(asys[1]);
							$("#monitor_ports").val(asys[2]);
							$("#netports_num").val(asys[3]);
							$("#sioports_num").val(asys[4]);
							$("#control_ports").val(asys[5]);
						}
						$("#icon_init").hide("fade", 2000);
						//alert("OK");
					});
				});
				/* 首次加载串口参数 */
				$("#init").click();
			});
		</script>
		<% init_sysparam(); //加载系统参数 %>
	</HEAD>
	<body>
		<form action="/goform/sysparam" method="post" id="sysparam" name="sysparam">
			<table width="60%"  align="center" id="Table1" border="0" cellspacing="0" cellpadding="1">
				<tr>
					<td class="lb-top-head" valign="top" align="center" height="100%">
					<table width="50%" border="0" cellspacing="1" cellpadding="1" class="sysBgTable" ID="Table2">
						<tr>
							<td align="center"><img src="/graphics/logo22.png" height="45"></td>
						</tr>
					</table></td>
				</tr>
				<tr>
					<td class="lb-body" valign="top" align="center" height="100%">
					<table border="0" width="98%" align="center" style="margin-top: 5">
						<tr>
							<td class="lb-bkg" valign="top">
							<table width="90%" height=220 align="center" border="0" cellspacing="0" cellpadding="2" id="tblSysPara">
								<tr align="center">
									<td align="center">表计总数目:</td>
									<td align="left">
									<input id="mtr_num" type="text" name="meter_num" size=12 value="<% meter_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
									</td>
									<td align="center">串口方案数:</td>
									<td align="left">
									<input id="sioplan_num"type="text" name="sioplan_num" size=12 value="<% sioplan_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
									</td>
								</tr>
								<tr align="left">
									<td align="center">监视参数:</td>
									<td align="left">
									<input id="monitor_ports" type="text" name="monitor_ports" size=12 value="<% monitor_ports(); %>" maxlength=3 onchange="lessthan1byte(event);">
									</td>
									<td align="center">网口数目:</td>
									<td align="left">
									<input id="netports_num" type="text" name="netports_num" size=12 value="<% netports_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
									</td>
								</tr>
								<tr align="left">
									<td align="center">串口总数目:</td>
									<td align="left">
									<input id="sioports_num" type="text" name="sioports_num" size=12 value="<% sioports_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
									</td>
									<td align="center">控制端口数:</td>
									<td align="left">
									<input id="control_ports" type="text" name="control_ports" size=12 value="<% control_ports(); %>" maxlength=3 onchange="lessthan1byte(event);">
									</td>
								</tr>
							</table></td>
						</tr>
					</table></td>
				</tr>
			</table>
			<p ALIGN="CENTER">
				<input type="button"accept="" name="Update" value="设置" ID="Update" OnClick="db_update();">
				<input type="button" name=ok value="读取" OnClick="return RefreshWin();">
				<!- 隐藏的输入框,用于提交form命令类型 ->
				<input class="hideinp" type="text" name="OpType" value="" id="optype">
			</p>
		</form>
		<button id="init" class="hideinp" >初始化</button>
		<button id="btnUpdate" class="btn_update">更新</button>
		<input type="text" id="icon_init" class="wait_icon_24x24_load" />
		<input type="text" id="icon_ok" class="wait_icon_24x24 ok_24x24" />
	</body>
</html>
