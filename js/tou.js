/**
 * 历史数据查询脚本,包括
 * 1. 历史电量
 * 2. 历史象限无功
 * 3. 进行中...
 */
$.extend($.fn.dataTable.defaults, {//设置表格属性
	"bInfo" : false, //显示一共几条这种信息
	"bFilter" : false, //不要搜索
	"bSort" : false, //不要排序
	"sScrollY" : "320px", //固定高度
	"bPaginate" : false, //不分页
	"bScrollCollapse" : true, //显示滚动条
	//"bRetrieve" : true,
	"bJQueryUI" : true,
	"bDestroy" : true,
	"bAutoWidth" : true
});
var oTable;
$(document).ready(function() {
	var stime_stamp = $("#stime_stamp");
	var etime_stamp = $("#etime_stamp");
	var obtnQurey = $("#btnQuery");
	///按钮,查询历史数据
	obtnQurey.button({
		icons : {
			primary : "ui-icon-search"
		}
	});
	$("#history_tou").hide();

	initUI();
	//$('#tbl_sysReset').dataTable();
	//oTable=$('#tbl_history_tou').dataTable();
	obtnQurey.click(function() {
		postQuery();
	});
});
//发送post请求
function postQuery() {
	var stime_stamp = $("#stime_stamp");
	var etime_stamp = $("#etime_stamp");
	var obtnQurey = $("#btnQuery");
	//$('#tbl_history_tou').dataTable();
	//$("#tr_dat").html("<tr><td colspan=\"23\" ></td></tr>");
	//$("#tr_dat tr td").addClass('load_bgpic_hight');
	if (stime_stamp.val() == "0" || stime_stamp.val() == "") {
		alert("请选择开始时刻")
		return false;
	}
	if (etime_stamp.val() == "0" || etime_stamp.val() == "") {
		alert("请选择截止时刻")
		return false;
	}
	$.ajax({
		type : "post",
		url : "/goform/get_tou",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "text",
		data : $("#history_tou").serialize() + "&mtr_no=" + $("#mtr_no").val(),
		beforeSend : function(XMLHttpRequest) {
			$("#icon_load").show();
			oTable.fnDestroy(false);
		},
		success : function(result, textStatus) {
			$("#tr_dat").html(result);
			oTable = $('#tbl_history_tou').dataTable();
		},
		error : function() {//失败
			alert("服务器通讯错误,获取数据失败");
		},
		//完成(发生在失败或成功之后)
		complete : function(XMLHttpRequest, textStatus) {
			$("#icon_load").hide("fade", 400);
		}
	});
}

//生成/初始化界面
function initUI() {
	$("#save_log").hide();
	$("#icon_load").hide();
	oTable = $('#tbl_history_tou').dataTable();
}
