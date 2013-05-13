/**
 * init* 初始化相关函数,包括界面和事件触发的初始化
 * fill*数据相关函数
 *   fillHead*数据表格的表头,根据查询的需要动态生成
 *   fillData*数据表格的数据,根据查询的类型type(电量/象限/瞬时量/需量)填写对应的数据.
 * 历史数据查询脚本,包括
 * 1. 历史电量
 * 2. 历史象限无功
 * 3. 进行中...
 */
//时区之在客户端处理,默认与服务端交互时都使用的标准时区,所以需要转换.
var timeZoneMs = 8 * 60 * 60;
var tou_dir = new Array("正向", "反向");
var tou_pa = new Array("有功", "无功");
var tou_time = new Array("<b>总</b>", "尖", "峰", "平", "谷");
var qr_phase = new Array("第一象限无功", "第二象限无功", "第三象限无功", "第四象限无功");
var qr_time = new Array("<b>总</b>", "尖", "峰", "平", "谷");
var maxn_phase = new Array("正向有功需量", "反向有功需量", "正向无功需量", "反向无功需量");
var maxn_time = new Array("<b>总</b>", "尖", "峰", "平", "谷");
var phase = new Array("A", "B", "C");
var power = new Array("<b>总</b>", "A", "B", "C");
//判断ie,ie6和7使用不同方式选择日期,因为控件太慢
var ie = !!window.ActiveXObject;
var ie6 = ie && !window.XMLHttpRequest;
var ie8 = ie && !!document.documentMode;
var ie7 = ie && !ie6 && !ie8;
//var isIE =!+[1,];
var isIE = ie6 || ie7;
//设置表格属性
$.extend($.fn.dataTable.defaults, {
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
//表号显示每几个换一行
var newline = 40;
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
	initUI();
	initEvent();
	initTimeBox();
	obtnQurey.click(function() {
		postQuery();
	});
});
//发送post请求
function postQuery() {
	//检查输入合法性,
	if (!isSelectedLegal()) {
		return;
	}
	var postsStr = makePostStr();
	$.ajax({
		type : "post",
		url : "/goform/get_tou",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "text",
		data : postsStr,
		beforeSend : function(XMLHttpRequest) {
			$("#icon_load").show();
			oTable.fnDestroy(false);
		},
		success : function(result, textStatus) {
			var oRealTimeData = eval("(" + result + ")");
			fillDataHead(oRealTimeData, $("#dateHead"));
			fillData($("#touData"), oRealTimeData, oRealTimeData.abMtr);
			oTable = $('#history_dat').dataTable();
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
	initMtr();
	initMainCategoryName();
	initSubCategoryName();
	$("#save_log").hide();
	$("#icon_load").hide();
	$(".selectTable").hide();
	$("#tbl_select_tou_qr").show();
	//$('#tbl_select_tou_qr').dataTable();
	//$('#tbl_select_instant').dataTable();
	//$('#tbl_select_maxneed').dataTable();
	oTable = $('#history_dat').dataTable();

}

//界面添加表号
function initMtr() {
	var mtrNumber = 0;
	var str = "";
	$.ajax({
		type : "post",
		//同步方式,必须等到获得了表数才进行下一步
		async : false,
		url : "/goform/sysparam",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "text",
		data : "action=get",
		success : function(data, textStatus) {//成功
			var oSysPara = eval("(" + data + ")");
			mtrNumber = parseInt(oSysPara.meter_num);
		},
		error : function() {//失败
			alert("服务器通讯错误,获取表号失败");
		}
	});

	for ( i = 0; i < mtrNumber; i++) {
		var name = "mtrNo" + i;
		str += "<span style=\"display: inline-block; width: 25px;\">";
		str += "<label><input class=\"meterNumber\" type=checkbox name=\"" + name + "\"";
		str += "id=\"" + name + "\" /><br>" + "表" + i + "</label></span>";
		//如果有20个,则分两行,第二行末尾不增加换行
		if ((i % newline == newline - 1) && (i < (mtrNumber - 1))) {
			str += "<br>";
		}
	}
	$("#mtr_selected").html("");
	$("#mtr_selected").html(str);
	$(function() {
		$("#slider-range").slider({
			range : true,
			min : 0,
			max : mtrNumber,
			values : [0, 0],
			slide : function(event, ui) {
				for ( i = 0; i < mtrNumber; i++) {
					$("#mtrNo" + i)[0].checked = false;
				}
				for ( i = ui.values[0]; i < ui.values[1]; i++) {
					$("#mtrNo" + i)[0].checked = true;
				}
			}
		});
	});
}

//设置高一级的项目(大的项目)主要项目名称,如正向有功,电压,反向无功需量 这些
function initMainCategoryName() {
	var obj = $("#select_item_first");
	var str = "";
	var i = 0;
	var name = "";
	var main_category_len = tou_dir.length * tou_pa.length;
	var subcategory_len = tou_time.length;
	for ( i = 0; i < main_category_len; i++) {
		name = "all_tou" + i;
		str += "<td colspan=\"" + subcategory_len + "\">";
		str += "<label>";
		str += "<input type=checkbox class=\"chk_all_tou\"";
		str += "id=\"" + name + "\"" + "index=" + i + " />";
		str += tou_dir[i % 2];
		str += tou_pa[parseInt(i / 2)];
		str += "</label>";
		str += "</td>";
	}
	$("#select_item_first").html(str);
	//象限无功
	str = initTdMainCategory_tou("qr", qr_phase, qr_time.length);
	$("#qr_select_main").html(str);
	//瞬时量 主项目表头
	str = initTdMainCategory_instant("v", "电压", phase.length);
	str += initTdMainCategory_instant("i", "电流", phase.length);
	str += initTdMainCategory_instant("p", "有功功率", power.length);
	str += initTdMainCategory_instant("q", "无功功率", power.length);
	str += initTdMainCategory_instant("pf", "功率因数", power.length);
	$("#instant_select_main").html(str);
	//需量
	str = initTdMainCategory_tou("maxn", maxn_phase, maxn_time.length);
	$("#maxneed_select_main").html(str);
}

///电量选择列表,主项目
function initTdMainCategory_tou(id, nameArrayCn, sub_len) {
	var str = "";
	var name = "";
	for ( i = 0; i < nameArrayCn.length; i++) {
		name = "all_" + id + i;
		str += "<td colspan=\"" + sub_len + "\">";
		str += "<label>";
		str += "<input type=checkbox class=\"chk_all_" + id + " \"";
		str += "id=\"" + name + "\"" + "index=" + i + " />";
		str += nameArrayCn[i];
		str += "</label>";
		str += "</td>";
	}
	return str;
}

//瞬时量选择列表,主项目
function initTdMainCategory_instant(id, name_cn, sub_len) {
	var str = "";
	var name = "all_" + id + "0";
	str += "<td colspan=\"" + sub_len + "\">";
	str += "<label>";
	str += "<input type=checkbox class=\" chk_all_instant chk_all_" + id + "\"";
	str += "id=\"" + name + "\"" + "index=" + "0" + " />";
	str += name_cn;
	str += "</label>";
	str += "</td>";
	return str;
}

/**
 * 生成子项目,如正想有功的总,最大需量的平这些小项目的勾选
 */
function initSubCategoryName() {
	var str = "";
	//电量
	str = subCategoryName_tatil("tou", 4, tou_time);
	$("#select_item").html(str);
	//无功
	str = subCategoryName_tatil("qr", qr_phase.length, qr_time);
	$("#qr_select_sub").html(str);
	//瞬时量
	str = subCategoryName_instan("v", phase);
	str += subCategoryName_instan("i", phase);
	str += subCategoryName_instan("p", power);
	str += subCategoryName_instan("q", power);
	str += subCategoryName_instan("pf", power);
	$("#instant_select_sub").html(str);
	//最大需量
	str = subCategoryName_tatil("maxn", maxn_phase.length, maxn_time);
	$("#maxneed_select_sub").html(str);
}

//(电量,无功,需量)子项目名称生成
function subCategoryName_tatil(id, mainArrayLen, subArray) {
	var str = "";
	var name = "";
	var subLen = subArray.length;
	var TotalNum = mainArrayLen * subLen;
	for ( i = 0; i < TotalNum; i++) {
		name = "Item_" + id + i;
		str += "<td>";
		str += "<label>";
		str += "<input class=\"subcategory chk_sub_" + id + "\" type=\"checkbox\"";
		str += " name=" + name;
		str += " id=" + name + " />";
		str += "<br>" + subArray[parseInt(i % subLen)];
		str += "</label>";
		str += "</td>";
	}
	return str;
}

//瞬时量选择框生成
function subCategoryName_instan(id, array) {
	var str = "";
	var name = "";
	var vTotalNum = array.length
	for ( i = 0; i < vTotalNum; i++) {
		name = "Item" + id + i;
		str += "<td>";
		str += "<label>";
		str += "<input class=\"subcategory chk_sub_instant chk_sub_" + id + "\" type=\"checkbox\"";
		str += " name=" + name;
		str += " id=" + name + " />";
		str += "<br>" + array[i];
		str += "</label>";
		str += "</td>";
	}
	return str;
}

//设置一些对象的触发事件,ini
//如: 点击高层的项目,全选其下层的所有子项目
function initEvent() {
	//选择查询的数据类型
	$("#type").change(function() {
		$(".selectTable").hide();
		var a = $('#type').val();
		if (a == "tou") {
			$("#tbl_select_tou_qr").show();
		} else if (a == "qr") {
			$("#tbl_select_qr").show();
		} else if (a == "instant") {
			$("#tbl_select_instant").show();
		} else if (a == "maxn") {
			$("#tbl_select_maxneed").show();
		}
	});
	//电度量
	var i = 0;
	$(".chk_all_tou").click(function(event) {
		var bcheck = event.target.checked;
		var index = parseInt(event.target.getAttribute("index"));
		for ( i = 0; i < 5; i++) {
			$(".subcategory.chk_sub_tou")[index * 5 + i].checked = bcheck;
		}
	});
	//电度量全选
	$("#chk_tou_all").click(function(event) {
		var bcheck = event.target.checked;
		var objAll = $(".chk_all_tou,.chk_sub_tou");
		var len = objAll.length;
		for ( i = 0; i < len; i++) {
			objAll[i].checked = bcheck;
		}
	});
	$(".chk_all_qr").click(function(event) {
		var bcheck = event.target.checked;
		var index = parseInt(event.target.getAttribute("index"));
		for ( i = 0; i < 5; i++) {
			$(".subcategory.chk_sub_qr")[index * 5 + i].checked = bcheck;
		}
	});
	//四象限无功全选
	$("#chk_qr_all").click(function(event) {
		var bcheck = event.target.checked;
		var objAll = $(".chk_all_qr,.chk_sub_qr");
		var len = objAll.length;
		for ( i = 0; i < len; i++) {
			objAll[i].checked = bcheck;
		}
	});
	//各种瞬时量
	$(".chk_all_v").click(function(event) {
		var bcheck = event.target.checked;
		for ( i = 0; i < phase.length; i++) {
			$(".subcategory.chk_sub_v")[i].checked = bcheck;
		}
	});
	$(".chk_all_i").click(function(event) {
		var bcheck = event.target.checked;
		for ( i = 0; i < phase.length; i++) {
			$(".subcategory.chk_sub_i")[i].checked = bcheck;
		}
	});
	$(".chk_all_p").click(function(event) {
		var bcheck = event.target.checked;
		for ( i = 0; i < power.length; i++) {
			$(".subcategory.chk_sub_p")[i].checked = bcheck;
		}
	});
	$(".chk_all_q").click(function(event) {
		var bcheck = event.target.checked;
		for ( i = 0; i < power.length; i++) {
			$(".subcategory.chk_sub_q")[i].checked = bcheck;
		}
	});
	$(".chk_all_pf").click(function(event) {
		var bcheck = event.target.checked;
		for ( i = 0; i < power.length; i++) {
			$(".subcategory.chk_sub_pf")[i].checked = bcheck;
		}
	});
	//瞬时量全选
	$("#chk_instant_all").click(function(event) {
		var bcheck = event.target.checked;
		var objAll = $(".chk_all_instant,.chk_sub_instant");
		var len = objAll.length;
		for ( i = 0; i < len; i++) {
			objAll[i].checked = bcheck;
		}
	});

	//最大需量
	$(".chk_all_maxn").click(function(event) {
		var bcheck = event.target.checked;
		var index = parseInt(event.target.getAttribute("index"));
		for ( i = 0; i < 5; i++) {
			$(".subcategory.chk_sub_maxn")[index * 5 + i].checked = bcheck;
		}
	});
	//全选所有最大需量项目
	$("#chk_maxneed_all").click(function(event) {
		var bcheck = event.target.checked;
		var objAll = $(".chk_all_maxn,.chk_sub_maxn");
		var len = objAll.length;
		for ( i = 0; i < len; i++) {
			objAll[i].checked = bcheck;
		}
	});
}

//构造查询(post)的字符串,组合他们
function makePostStr() {
	var strPost = "action=get";
	var stime_stamp = 0;
	var etime_stamp = 0;
	if (isIE) {
		var dateStr = $('#stime').val();
		var a = dateStr.split(" ");
		var d = a[0].split("-");
		var t = a[1].split(":");
		stime_stamp = +new Date(d[0], (d[1] - 1), d[2], t[0], t[1]) / 1000 || 0;
		var dateStr = $('#etime').val();
		var a = dateStr.split(" ");
		var d = a[0].split("-");
		var t = a[1].split(":");
		etime_stamp = +new Date(d[0], (d[1] - 1), d[2], t[0], t[1]) / 1000 || 0;
	} else {
		var testStartDate = $('#stime').datetimepicker('getDate');
		if (testStartDate != null) {
			stime_stamp = testStartDate.getTime() / 1000;
		} else {
			alert("开始时间错误");
		}
		var testEndDate = $('#etime').datetimepicker('getDate');
		if (testEndDate != null) {
			etime_stamp = testEndDate.getTime() / 1000;
		} else {
			alert("结束时间错误");
		}
	}

	strPost += "&stime_stamp=" + stime_stamp;
	strPost += "&etime_stamp=" + etime_stamp;
	strPost += "&timezone=" + timeZoneMs;
	strPost += "&type=" + $("#type").val();
	var abMtr = ""
	var abTou = "";
	var abQr = "";
	var abV = "";
	var abI = "";
	var abP = "";
	var abQ = "";
	var abPf = "";
	var abMaxn = "";
	var objMtr = $(".meterNumber");
	var objTou = $(".subcategory.chk_sub_tou");
	var objQr = $(".subcategory.chk_sub_qr");
	var objV = $(".subcategory.chk_sub_v");
	var objI = $(".subcategory.chk_sub_i");
	var objP = $(".subcategory.chk_sub_p");
	var objQ = $(".subcategory.chk_sub_q");
	var objPf = $(".subcategory.chk_sub_pf");
	var objMaxn = $(".subcategory.chk_sub_maxn");
	//构造表号和项目字串 如 001100 1表示有效 项目/表
	for ( i = 0; i < objMtr.length; i++) {
		abMtr += objMtr[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objTou.length; i++) {
		abTou += objTou[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objQr.length; i++) {
		abQr += objQr[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objV.length; i++) {
		abV += objV[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objI.length; i++) {
		abI += objI[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objP.length; i++) {
		abP += objP[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objQ.length; i++) {
		abQ += objQ[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objPf.length; i++) {
		abPf += objPf[i].checked ? "1" : "0";
	}
	for ( i = 0; i < objMaxn.length; i++) {
		abMaxn += objMaxn[i].checked ? "1" : "0";
	}
	strPost += "&mtr=" + abMtr;
	strPost += "&tou=" + abTou;
	strPost += "&qr=" + abQr;
	strPost += "&v=" + abV;
	strPost += "&i=" + abI;
	strPost += "&p=" + abP;
	strPost += "&q=" + abQ;
	strPost += "&pf=" + abPf;
	strPost += "&maxn=" + abMaxn;
	return strPost;
}

//初始化时间控件
function initTimeBox() {
	var startDateTextBox = $('#stime');
	var endDateTextBox = $('#etime');
	//检查ie
	if (isIE) {
		startDateTextBox.removeAttr('readonly');
		endDateTextBox.removeAttr('readonly');
		var now_stamp = +new Date() || -1;
		//向前追溯至1小时以前为默认开始时刻
		now_stamp -= 1 * 60 * 60 * 1000;
		startDateTextBox.val(timestarmpToString_Query(now_stamp / 1000))
		var now_stamp = +new Date() || -1;
		endDateTextBox.val(timestarmpToString_Query(now_stamp / 1000))
		return;
	} else {
		startDateTextBox.attr('readonly', 'readonly');
		endDateTextBox.attr('readonly', 'readonly');
	}
	startDateTextBox.datetimepicker({
		maxDate : 0,
		controlType : 'select', //选择方式选时刻
		dateFormat : "yy-mm-dd", //日期格式
		timeFormat : 'HH:mm', //时刻格式
		separator : ' ', //日期时刻分割字符(串)
		onClose : function(dateText, inst) {
			var testStartDate = startDateTextBox.datetimepicker('getDate');
			var testEndDate = endDateTextBox.datetimepicker('getDate');
			if (testEndDate == null || testStartDate > testEndDate) {
				endDateTextBox.datetimepicker('setDate', testStartDate);
			}
		},
		//选择时 限定开始时间必须早于结束时间
		onSelect : function(selectedDateTime) {
			endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
		}
	});
	endDateTextBox.datetimepicker({
		maxDate : 0, //不能选择未来
		controlType : 'select', //选择方式选时刻
		dateFormat : "yy-mm-dd", //日期格式
		timeFormat : 'HH:mm', //时刻格式
		separator : ' ', //日期时刻分割字符(串)
		onClose : function(dateText, inst) {//关闭时候判断
			var testStartDate = startDateTextBox.datetimepicker('getDate');
			var testEndDate = endDateTextBox.datetimepicker('getDate');
			if (testStartDate == null || testStartDate > testEndDate) {
				startDateTextBox.datetimepicker('setDate', testEndDate);
			}
		},
		onSelect : function(selectedDateTime) {//选择时候防止误选
			startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
		}
	});
}

//生成数据表头
function fillDataHead(oRealTimeData, oHead) {
	oHead.html("");
	str = "";
	str += "<th>表号</th>";
	//str += "<th>序号</th>";
	str += "<th>时刻</th>";
	var fullName = false;
	//数据分类讨论
	if (oRealTimeData.type == "tou") {
		str += fillHead_tou(oRealTimeData.abTou);
	} else if (oRealTimeData.type == "qr") {
		str += fillHead_qr(oRealTimeData.abQr);
	} else if (oRealTimeData.type == "instant") {
		//瞬时量也放在一个表格里
		str += fillHead_instan(oRealTimeData.abV, "电压", phase);
		str += fillHead_instan(oRealTimeData.abI, "电流", phase);
		str += fillHead_instan(oRealTimeData.abP, "有功功率", power);
		str += fillHead_instan(oRealTimeData.abQ, "无功功率", power);
		str += fillHead_instan(oRealTimeData.abPf, "功率因数", power);
	} else if (oRealTimeData.type == "maxn") {
		//最大需量
		str += fillHead_maxn(oRealTimeData.abMaxn);
	}
	oHead.html(str);
}

function fillHead_instan(oRealTimeData_abInstan, name_cn, subArray) {
	var str = "";
	var len = oRealTimeData_abInstan.length;
	var fullName = true;
	for ( i = 0; i < len; i++) {
		if (oRealTimeData_abInstan.charAt(i) == "1") {
			str += "<th>";
			if (fullName) {
				//同项的分时数据不需要全名称
				fullName = false;
				str += name_cn;
			}
			str += subArray[i];
			str += "</th>";
		}
	}
	return str;
}

function fillHead_maxn(oRealTimeData_abMaxn) {
	var str = "";
	var len = oRealTimeData_abMaxn.length;
	for ( i = 0; i < len; i++) {
		if (i % 5 == 0) {//每种数据[总尖峰平谷]开始使用全名称
			fullName = true;
		}
		if (oRealTimeData_abMaxn.charAt(i) == "1") {
			str += "<th>";
			if (fullName) {
				//同项的分时数据不需要全名称
				fullName = false;
				str += maxn_phase[parseInt(i / 4)];
			}
			str += maxn_time[i % 5];
			str += "</th>";
		}
	}
	return str;
}

function fillHead_qr(oRealTimeData_abQr) {
	var str = "";
	var qr_len = oRealTimeData_abQr.length;
	for ( i = 0; i < qr_len; i++) {
		if (i % 5 == 0) {//每种数据[总尖峰平谷]开始使用全名称
			fullName = true;
		}
		if (oRealTimeData_abQr.charAt(i) == "1") {
			str += "<th>";
			if (fullName) {
				//同项的分时数据不需要全名称
				fullName = false;
				str += qr_phase[parseInt(i / 4)];
			}
			str += qr_time[i % 5];
			str += "</th>";
		}
	}
	return str;
}

function fillHead_tou(oRealTimeData_abTou) {
	var str = "";
	var tou_len = oRealTimeData_abTou.length;
	for ( i = 0; i < tou_len; i++) {
		if (i % 5 == 0) {//每种数据[总尖峰平谷]开始使用全名称
			fullName = true;
		}
		if (oRealTimeData_abTou.charAt(i) == "1") {
			str += "<th>";
			//同项的分时数据不需要全名称
			if (fullName) {
				fullName = false;
				str += tou_dir[parseInt(i / 4) % 2];
				str += tou_pa[parseInt(i / 10)];
			}
			str += tou_time[i % 5];
			str += "</th>";
		}
	}
	return str;
}

//在mtrArray 中找到第 i 个 等于"1"的字符,返回这个字符的index
function fillMtrNumber(i, abMtr) {
	var num = 0;
	for ( j = 0; j < abMtr.length; j++) {
		if (abMtr.charAt(j) == "1") {//tian sha de ie!
			if (num == i) {
				break;
			}
			num++;
		}
	}
	return "<td>" + j + "</td>";
}

//填写抄表时刻表格
function fillMtrReadTime(UnixUTCTimestarmp) {
	return "<td>" + timestarmpToString(UnixUTCTimestarmp - timeZoneMs) + "</td>";
}

/* 一类瞬时量,比如电压,或者几个电流的二位数组
 * 比如:
 * aData =[["380","1"],["378","1"]] <-查询了2个电压
 */
function fillData_Instant(aData) {
	var j;
	var str = "";
	var iv;
	for ( j = 0; j < aData.length; j++) {
		// *无效*标识 1=无效
		iv = (aData[j][1] == "1") ? "iv" : "valid";
		str += "<td class=" + iv + ">" + aData[j][0] + "</td>";
	}
	return str;
}

//功率因数 除以100
function fillData_Instant_pf(aData) {
	var j;
	var str = "";
	var iv;
	for ( j = 0; j < aData.length; j++) {
		// *无效*标识 1=无效
		iv = (aData[j][1] == "1") ? "iv" : "valid";
		str += "<td class=" + iv + ">" + strip(aData[j][0] / 100) + "</td>";
	}
	return str;
}

//修正js浮点数bug
function strip(number) {
	return (parseFloat(number.toPrecision(12)));
}

function fillData_Tou(aData) {
	var j;
	var str = "";
	var iv;
	for ( j = 2; j < aData.length; j++) {
		// *无效*标识 ,1=无效
		iv = (aData[j][1] == "1") ? "iv" : "valid";
		str += "<td class=" + iv + ">" + aData[j][0] + "</td>";
	}
	return str;
}

/**
 * 填写最大需量数据 一条记录
 * @param {int} perLen 一条记录前面还保存有1个表号,1个时间,去除这些项目
 * @param {Array} aData 一天完整的最大需量数据记录,包含前面的表号,时间
 */
function fillData_OneData_Maxn(perLen, aData) {
	var j;
	var str = "";
	var iv;
	for ( j = perLen; j < aData.length; j++) {
		// *无效*标识
		iv = (aData[j][1] == "1") ? "iv" : "valid";
		str += "<td class=" + iv + ">";
		str += aData[j][0];
		//需量无效就不显示发生时间,
		//有效但是没有发生时间的,也不显示时间,但还是绿色的,与为采集区分开来
		if (aData[j][1] == "0" && parseInt(aData[j][2]) > 0) {
			str += "<br>" + timestarmpToStringWithNewLine(parseInt(aData[j][2]) - timeZoneMs);
		}
		str += "</td>";
	}
	return str;
}

/**
 * 将数据填充到表格中,oData:表计对象数组
 * @param {Object} oTable 填写到这个表格
 * @param {Object} oData 要填写的数据
 * @param {string} abMtr 查询了哪几块表,01组成的字符串,表示使能
 */
function fillData(oTable, oData, abMtr) {
	str = "";
	mtrnum = oData.mtr.length;
	if (oData.type == "tou") {
		for ( i = 0; i < mtrnum; i++) {
			for ( j = 0; j < oData.mtr[i].tou.length; j++) {
				str += "<tr>";
				//表号
				str += "<td>" + oData.mtr[i].tou[j][0] + "</td>";
				//历史数据时刻
				str += "<td>" + oData.mtr[i].tou[j][1] + "</td>";
				str += fillData_Tou(oData.mtr[i].tou[j]);
				str += "</tr>";
			}
		}
	} else if (oData.type == "qr") {
		//象限无功
		for ( i = 0; i < mtrnum; i++) {
			for ( j = 0; j < oData.mtr[i].qr.length; j++) {
				str += "<tr>";
				//表号
				str += "<td>" + oData.mtr[i].qr[j][0] + "</td>";
				//历史数据时刻
				str += "<td>" + oData.mtr[i].qr[j][1] + "</td>";
				str += fillData_Tou(oData.mtr[i].qr[j]);
				str += "</tr>";
			}
		}
	} else if (oData.type == "instant") {
		for ( i = 0; i < mtrnum; i++) {
			for ( j = 0; j < oData.mtr[i].instant.length; j++) {
				str += "<tr>";
				//表号
				str += "<td>" + oData.mtr[i].instant[j][0] + "</td>";
				//时刻
				str += "<td>" + oData.mtr[i].instant[j][1] + "</td>";
				str += fillData_Instant(oData.mtr[i].instant[j][2].v);
				str += fillData_Instant(oData.mtr[i].instant[j][2].i);
				str += fillData_Instant(oData.mtr[i].instant[j][2].p);
				str += fillData_Instant(oData.mtr[i].instant[j][2].q);
				str += fillData_Instant_pf(oData.mtr[i].instant[j][2].pf);
				str += "</tr>";
			}
		}
	} else if (oData.type == "maxn") {
		//最大需量
		for ( i = 0; i < mtrnum; i++) {
			for ( j = 0; j < oData.mtr[i].maxn.length; j++) {
				str += "<tr>";
				//表号
				str += "<td>" + oData.mtr[i].maxn[j][0] + "</td>";
				//历史数据时刻
				str += "<td>" + oData.mtr[i].maxn[j][1] + "</td>";
				//2:去掉前面2项
				str += fillData_OneData_Maxn(2, oData.mtr[i].maxn[j]);
				str += "</tr>";
			}
		}
	}
	oTable.html(str);
	return;
}

//填写时间戳(标识终端实时数据的时间)
function fillDataTimestarmp(srvTimestarmp) {
	var str = "刷新时刻:";
	var timeColor = "";
	if (ChangeTimeColor) {//变色,使效果看上去更加明显
		timeColor = "style=\"color: green;\""
	} else {
		timeColor = "style=\"color: blue;\""
	}
	ChangeTimeColor = !ChangeTimeColor;
	str += "<span " + timeColor + ">" + timestarmpToString(srvTimestarmp) + "</span>";
	return str;
}

//将时间戳换算成为完整的日期时刻格式,
//输入 srvTimestarmp 为数值型整形 时间戳(标准时间),到现在的秒数(Unix格式)
//返回形如 2013-02-20 14:45:09 的字符串
function timestarmpToString(UnixUtcTimestarmp) {
	if (UnixUtcTimestarmp <= 0) {//时区的关系(可能要扩展到24个小时)
		return "---------- --:--:--";
	}
	var now = new Date(UnixUtcTimestarmp * 1000);
	//js中是毫秒
	var str = $.datepicker.formatDate('yy-mm-dd ', now);
	str += now.getHours() < 10 ? "0" : "";
	str += now.getHours();
	str += ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
	str += ":" + (now.getSeconds() < 10 ? "0" : "") + now.getSeconds();
	return str;
}

//用于ie浏览器查询时间的字符串
function timestarmpToString_Query(UnixUtcTimestarmp) {
	if (UnixUtcTimestarmp <= 0) {//时区的关系(可能要扩展到24个小时)
		return "---------- --:--";
	}
	//js中是毫秒
	var now = new Date(UnixUtcTimestarmp * 1000);
	var str = $.datepicker.formatDate('yy-mm-dd ', now);
	str += now.getHours() < 10 ? "0" : "";
	str += now.getHours();
	str += ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
	return str;
}

//检查日期是否符合格式,符合则返回时间戳,否则返回0-1
function ieCheckDataTime(strData) {
	var patrn = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}/;
	if (patrn.exec(strData) == null) {
		return -1;
	}
	var a = strData.split(" ");
	var d = a[0].split("-");
	var t = a[1].split(":");
	//年
	if (d[0] > 2100 || d[0] < 1970) {
		return -1;
	}
	//月
	if (d[1] > 12 || d[1] < 1) {
		return -1;
	}
	//日
	if (d[2] > 31 || d[2] < 1) {
		return -1;
	}
	//月日组合
	if ((d[1] == 4 || d[1] == 6 || d[1] == 9 || d[1] == 11) && (d[2] > 30)) {
		return -1;
	}
	if ((d[1] == 2) && (d[2] > 29)) {
		return -1;
	}
	//时
	if (t[0] > 23 || t[0] < 0) {
		return -1;
	}
	//分
	if (t[0] > 59 || t[0] < 0) {
		return -1;
	}
	var time_stamp = +new Date(d[0], (d[1] - 1), d[2], t[0], t[1]) / 1000 || -1;
	return time_stamp;
}

//检查选择的项目是否有效,必选选至少一个项目(表/数据项)
function isSelectedLegal() {
	if (isIE) {
		var stime_stamp = ieCheckDataTime($('#stime').val());
		if (stime_stamp <= 0) {
			alert("开始时刻格式错误:\n yyyy-mm-dd hh:mm")
			var now_stamp = +new Date() || -1;
			//向前追溯至1小时以前为默认开始时刻
			now_stamp -= 1 * 60 * 60 * 1000;
			$('#stime').val(timestarmpToString_Query(now_stamp / 1000))
		}
		var etime_stamp = ieCheckDataTime($('#etime').val());
		if (etime_stamp <= 0) {
			alert("结束时刻格式错误:\n yyyy-mm-dd hh:mm")
			var now_stamp = +new Date() || -1;
			$('#etime').val(timestarmpToString_Query(now_stamp / 1000))
		}
		if (stime_stamp > etime_stamp) {
			alert("开始时间应小于结束时间.");
			return false;
		}
		if (stime_stamp <= 0 || etime_stamp <= 0) {
			return false;
		}
	} else {
		var startDateTextBox = $('#stime');
		var endDateTextBox = $('#etime');
		if (startDateTextBox.val() == "0" || startDateTextBox.val() == "") {
			alert("请选择开始时刻")
			return false;
		}
		if (endDateTextBox.val() == "0" || endDateTextBox.val() == "") {
			alert("请选择截止时刻")
			return false;
		}
	}

	if ($(".meterNumber:checked:enabled").length <= 0) {
		alert("至少选择一个表");
		return;
	}
	var a = $('#type').val();
	var len = 0;
	if (a == "tou") {
		len = $(".chk_sub_tou:checked:enabled").length;
	} else if (a == "qr") {
		len = $(".chk_sub_qr:checked:enabled").length;
	} else if (a == "instant") {
		len = $(".chk_sub_instant:checked:enabled").length;
	} else if (a == "maxn") {
		len = $(".chk_sub_maxn:checked:enabled").length;
	}
	if (len <= 0) {
		alert("至少选择一个监视项目");
		return;
	}
	return true;
}

//时间个数,换行的,最小宽度 需要jQuery UI  中的日期datepicker控件支持
function timestarmpToStringWithNewLine(UnixUtcTimestarmp) {
	if (UnixUtcTimestarmp <= 0) {//时区的关系(可能要扩展到24个小时)
		return "--/--<br>--:--";
	}
	var t = new Date(UnixUtcTimestarmp * 1000);
	//js中是毫秒
	var str = $.datepicker.formatDate('mm/dd<br>', t);
	str += t.getHours() < 10 ? "0" : "";
	str += t.getHours();
	str += ":" + (t.getMinutes() < 10 ? "0" : "") + t.getMinutes();
	return str;
}
