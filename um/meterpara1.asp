<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- 华立电力-表计参数页面 -->
<html>
	<HEAD>
		<title>表计参数</title>
		<meta http-equiv="Pragma" content="no-cache" charset=utf-8>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css" />
		<link rel="stylesheet" href="/style/sys.css" type="text/css" />
		<link href="../style/menuExpandable3.css" rel="stylesheet" type="text/css" />
		<link href="/style/table.css" type="text/css" rel="stylesheet" />
		<script src="/style/wwyfunc.js" type="text/javascript"></script>
		<script type="text/javascript" src="/js/jquery-1.8.3.js"></script>
		<script src="/style/clone_tableheader.js"  type="text/javascript"></script>
		<!--jquery ui -->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN.js"></script>
		<!-- jquery plugin:datatable-->
		<link type="text/css" href="/style/jquery.dataTables.css" rel="stylesheet"  />
		<link type="text/css" href="/style/jquery.dataTables_themeroller.css" rel="stylesheet"  />
		<script type="text/javascript" src="/js/jquery.dataTables.js"></script>
		<script type="text/javascript">
			//页面初始化 加载 JS函数
			// $(document).ready(cloneTableHeader_Width);
			// //调整 浏览器 表格的显示宽度  以及 调用  锁定 表头和列  的JS函数。
			// function cloneTableHeader_Width() {
			// //document.body.clientWidth获得客户区域(浏览器窗口,不包括菜单栏和状态栏,就是内容窗口)的宽度 - 35像素的滚动条宽度。
			// var myTable_Width = (document.body.clientWidth - 35);
			// var myTable_Heigh = (document.body.clientHeight - 100);
			// //alert(myTable_Width + "*" + myTable_Heigh);//测试屏幕宽度
			// if ((document.body.clientWidth - 35) < 855) {
			// myTable_Width = 855;
			// //宽度
			// }
			// //调用 锁定表头和 列 的JS函数
			// $(document).ready(function() {
			// //FixTable("MyTable", 3, myTable_Width, myTable_Heigh);
			// });
			// }
			$(document).ready(function() {
				/* 按鈕 */
				$(function() {
					$("#btnPost").button({
						icons : {
							primary : "ui-icon-refresh"
						}
					});
				});
				/* post方法刷新标记参数 */
				$.extend($.fn.dataTable.defaults, {//设置表格属性
					"bInfo": false,
					"bFilter" : false,//不要搜索
					"bSort" : false,//不要排序
					"sScrollY" : "200px",//固定高度
					"bPaginate" : false,//不分页
					"bScrollCollapse" : true,//显示滚动条
					"sPaginationType" : "full_numbers",//翻页按钮类型
				});
				var oTable = $('#MyTable').dataTable();
				$("#btnPost").click(function() {
					$("#optype").val = 4;// 操作类型,更新
					//$("#tr_dat").html("<tr><td colspan=\"999\" ></td></tr>");
					//$("#tr_dat tr td").addClass('load_bgpic_hight');
					/*oTable.$('input').serialize()*/
					/* formTest  get_tou */
					$.post('/goform/formTest', $("#mtrparaform").serialize(), function(result) {
						//$("#tr_dat tr td").removeClass('load_bgpic_hight');
						$("#tr_dat").html(result);
						oTable.fnDraw();//重绘表格
					});
				});
			});
		</script>
	</HEAD>
	<body>
		<h1 align="center"><img src="/graphics/logo32.png" height="45"></h1>
		<form action="/goform/formTest" method="post" id="mtrparaform" name="mtrparaform">
			<table  id="MyTable"  class="sioplanTable" width="100%" border="1" cellspacing="1" cellpadding="1" >
				<!--<table width="1200" border="1" cellpadding="0" cellspacing="0" id="MyTable" style="border-bottom-color: black; border-top-color: black; width: 1300px; color: #000000; border-right-color: black; font-size: medium; border-left-color: black"> -->
				<thead>
					<tr>
						<!--<tr style="background-color: #eeeeee; margin: 0px; line-height: 20px; font-weight: bold; padding: 0px 0px 0px 0px;"> -->
						<th>表号</th>
						<th> 有效 <br>c
						<input type="checkbox" name=iv_all value=iv_all onclick="iv_all_click(event);">
						</th>
						<th>线路名称</th>
						<th>表计地址</th>
						<th>表计口令</th>
						<th>使用端口</th>
						<th> 串口方案 <br> <% sioplan(); %> </th>
						<th> 表计规约 <br> <% mtr_protocol(); %> </th>
						<th> 生产厂家 <br> <% factory(); %> </th>
						<th> 电表类型 <br> <% ph_wire2(); %> </th>
						<th> 电量小数 <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_it_dot value="0" onchange="all_it_dot_changed(event);">
						</th>
						<th  > 需量小数 <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_xl_dot value="0" onchange="all_xl_dot_changed(event);">
						</th>
						<th  > 电压小数 <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_v_dot value="0" onchange="all_v_dot_changed(event);">
						</th>
						<th  > 电流小数 <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_i_dot value="0" onchange="all_i_dot_changed(event);">
						</th>
						<th  > 有功小数 <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_p_dot value="0" onchange="all_p_dot_changed(event);">
						</th>
						<th > 无功小数 <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_q_dot value="0" onchange="all_q_dot_changed(event);">
						</th>
						<th > 额定电压 <br>
						<input class="ntx" type="text" size=1 name=all_ue value="0" onchange="all_ue_changed(event);">
						</th>
						<th > 额定电流 <br>
						<input class="ntx" type="text" size=1 name=all_ie value="0" onchange="all_ie_changed(event);">
						</th>
					</tr>
				</thead>
				<tbody id="tr_dat">
					<% load_all_mtr_param(); %>
				</tbody>
			</table>
			<!-- 隐藏的输入,用于提交命令类型 -->
			<input class="hideinp" type="text" name=OpType value="" id="optype">
			<!-- 提交操作类型 更新,还是其他 -->
			<input class="hideinp" type="text" name=RowNo value="" id="indexno">
			<input class="hideinp" type="text" name="AllSelFlag" value="0" id="AllSelFlag">
		</form>
		<div align="center" id=subbtns>
		<!--
			<input type="button" name="Update" value="设置" ID="Update" OnClick="db_update();">
			// @TODO 添加删除暂时注销,等完善后再开放
			<input type=button name=bDelItem value="删除" ID="bDelItem" OnClick="db_del();">
			<input type=button name=bAddItem value="添加" ID="bAddItem" OnClick="db_add();" >
			
			<input type="button" name=Refresh value="刷新" ID="Refresh" OnClick="return RefreshWin();"> -->
			<button class="ui-button" id="btnPost" title="修改所有表计参数"> 更新 </button>
		</div>
	</body>
</html>
