/* 实时数据脚本,所有实时数据都在这里实现,只要实现:
* 1. 构造查询字符串,0表示不查询,1表示查询
* 2. 解析服务器返回的对象.
* 类别分为一下部分:
* 1. tou 电量,正有,反有,正无,反无*5(总尖峰平谷) ,
*    abTou 为查询使能的数组类似 10000100001000010000 表示4个总
* 2. qr 象限无功 4(象限)*5(分时电量)=20
*/

//表号显示每几个换一行
var newline = 40;
//var ie = !-[1,]; //ie则返回true,否则返回false
var timeZoneMs = 8 * 60 * 60;
// 当前显示类型.显示参数还是显示数据.开始时显示参数设置
var isShowSet = true;
var ShowData = true;
var ChangeTimeColor = false;
//时钟id
var refreshIntervalId;
var tou_dir = new Array("正向", "反向");
var tou_pa = new Array("有功", "无功");
var tou_time = new Array("<b>总</b>", "尖", "峰", "平", "谷");
var qr_phase = new Array("第一象限无功", "第二象限无功", "第三象限无功", "第四象限无功");
var qr_time = new Array("<b>总</b>", "尖", "峰", "平", "谷");
var maxn_phase = new Array("正向有功需量", "反向有功需量", "正向无功需量", "反向无功需量");
var maxn_time = new Array("<b>总</b>", "尖", "峰", "平", "谷");
var phase = new Array("A", "B", "C");
var power = new Array("<b>总</b>", "A", "B", "C");
var oTable = new Object();
$(document).ready(function() {
	$.extend($.fn.dataTable.defaults, {//设置表格属性
		"bInfo" : false, //显示一共几条这种信息
		"bFilter" : false, //不要搜索
		"bSort" : false, //不要排序
		//"sScrollY" : "320px", //固定高度
		"bPaginate" : false, //不显示分页
		//"bScrollCollapse" : true, //显示滚动条
		"bRetrieve" : true,
		//"bJQueryUI" : true,
		"bDestroy" : true,
		//"bAutoWidth" : true
	});

	///主过程
	var btnAutoRefresh = $("#btnAutoRefresh");
	var btnStopRefresh = $("#btnStopRefresh");
	var obtnRefresh = $("#btnManualRefresh");
	//界面的生成
	setMtr();
	initSubCategoryName();
	initMainCategoryName();
	$("#tabs").tabs();
	initEvent();
	//然后才是事件的绑定
	obtnRefresh.click(function() {
		refresh();
	});
	$("#btnHideMenu").click(function() {
		if (isShowSet) {
			$("#tabs").hide();
		} else {
			$("#tabs").show();
		}
		isShowSet = !isShowSet;
	});

	btnAutoRefresh.click(function() {
		btnAutoRefresh.hide();
		var t = parseInt($("#autoRefresh_interval").val()) || 0;
		if (t < 5) {
			t = 5;
			$("#autoRefresh_interval").val("5");
		}
		//点击开始就立刻刷新一次,之后按照定时器刷新.
		refresh();
		$("#btnManualRefresh").attr("disabled", "disabled");
		refreshIntervalId = setInterval(refresh, t * 1000);
		btnStopRefresh.show();
	});
	btnStopRefresh.click(function() {
		btnStopRefresh.hide();
		$("#btnManualRefresh").removeAttr("disabled");
		clearInterval(refreshIntervalId);
		btnAutoRefresh.show();
	});
	init();
});
//根据系统参数设置表个数
function setMtr() {
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
		//width: 44px; str += "<span><input type=checkbox name=" + name + " id=\"" + name
		// + "\" />" + "<label for=" + name + ">" + "表" + i + "</label><span>";
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
			values : [0, 1],
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

//构造查询的字符串,组合他们
function makePostStr() {
	var strPost = "action=get";
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

//刷新函数,手动刷新
function refresh() {
	if (ShowData) {
		$("#realtime_dat").show();
		ShowData = false;
	}

	if ($(".meterNumber:checked:enabled").length <= 0) {
		alert("至少选择一个表");
		return;
	}
	if ($(".subcategory:checked:enabled").length <= 0) {
		alert("至少选择一个监视项目");
		return;
	}

	$("#btnManualRefresh").attr("disabled", "disabled");
	//时间

	$.ajax({
		type : "post",
		url : "/goform/srv_time",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "text",
		data : "action=get",
		success : function(result, textStatus) {
			var oTime = eval("(" + result + ")");
			//转化成为标准时间（减去时区偏移即可），
			srvTimestarmp = Number(oTime.timestamp - timeZoneMs);
			$("#timestamp").html(fillDataTimestarmp(srvTimestarmp));
			//fillDataTimestarmp(srvTimestarmp);
		},
		error : function() {//失败
			alert("服务器通讯错误,获取时间失败");
		}
	});
	var strPost = makePostStr();

	//开始通讯
	//oTable.fnDestroy();
	$.ajax({
		type : "post",
		url : "/goform/realtime_tou",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "text",
		data : strPost,
		beforeSend : function(XMLHttpRequest) {
			$("#icon_load").show();
		},
		success : function(result, textStatus) {
			var oTou = eval("(" + result + ")");
			var oRealTimeData = eval("(" + result + ")");
			//每一行列的数据对齐,方便datetable插件使用
			fillDataHead(oRealTimeData, $("#dateHead"));
			fillData($("#touData"), oTou.mtr, oTou.abMtr);
			var oTable = $("#realtime_dat").dataTable();
		},
		error : function() {//失败
			alert("服务器通讯错误,获取数据失败");
		},
		//完成(发生在失败或成功之后)
		complete : function(XMLHttpRequest, textStatus) {
			$("#btnManualRefresh").removeAttr("disabled");
			$("#icon_load").hide("fade", 400);
		}
	});
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

//生成数据表头
function fillDataHead(oRealTimeData, oHead) {
	oHead.html("");
	str = "";
	str += "<th>表号</th>";
	str += "<th>抄表时刻</th>";
	var fullName = false;
	//电量头
	str += fillHead_tou(oRealTimeData.abTou);
	str += fillHead_qr(oRealTimeData.abQr);
	//瞬时量也放在一个表格里
	str += fillHead_instan(oRealTimeData.abV, "电压", phase);
	str += fillHead_instan(oRealTimeData.abI, "电流", phase);
	str += fillHead_instan(oRealTimeData.abP, "有功功率", power);
	str += fillHead_instan(oRealTimeData.abQ, "无功功率", power);
	str += fillHead_instan(oRealTimeData.abPf, "功率因数", power);
	//最大需量
	str += fillHead_maxn(oRealTimeData.abMaxn);
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

function fillData_OneData(aData) {
	var j;
	var str = "";
	var iv;
	for ( j = 0; j < aData.length; j++) {
		iv = (aData[j][1] == "1") ? "valid " : "iv";
		// *有效*标识
		str += "<td class=" + iv + ">" + aData[j][0] + "</td>";
	}
	return str;
}

function fillData_OneData_Maxn(aData) {
	var j;
	var str = "";
	var iv;
	for ( j = 0; j < aData.length; j++) {
		iv = (aData[j][1] == "1") ? "valid " : "iv";
		// *有效*标识
		str += "<td class=" + iv + ">";
		str += aData[j][0];
		//需量无效就不显示发生时间
		if (aData[j][1] == "1") {
			str += "(" + timestarmpToString(parseInt(aData[j][2]) - timeZoneMs) + ")";
		}
		str += "</td>";
	}
	return str;
}

//将数据填充到表格中,aMtr:表计对象数组
function fillData(oTable, aMtr, abMtr) {
	str = "";
	mtrnum = aMtr.length;
	for ( i = 0; i < mtrnum; i++) {
		str += "<tr>";
		str += fillMtrNumber(i, abMtr)
		str += fillMtrReadTime(parseInt(aMtr[i].Meter_ReadTime));
		str += fillData_OneData(aMtr[i].tou);
		str += fillData_OneData(aMtr[i].qr);
		str += fillData_OneData(aMtr[i].i);
		str += fillData_OneData(aMtr[i].v);
		str += fillData_OneData(aMtr[i].p);
		str += fillData_OneData(aMtr[i].q);
		str += fillData_OneData(aMtr[i].pf);
		str += fillData_OneData_Maxn(aMtr[i].maxn);
		str += "</tr>";
	}
	oTable.html(str);
	return;
}

//设定初始(默认)状态.
function init() {
	$(".subcategory.chk_sub_tou")[0].checked = true;
	$(".subcategory.chk_sub_tou")[5].checked = true;
	$(".subcategory.chk_sub_tou")[10].checked = true;
	$(".subcategory.chk_sub_tou")[15].checked = true;
	$(".subcategory.chk_sub_v")[0].checked = true;
	$(".subcategory.chk_sub_i")[0].checked = true;
	$("#btnStopRefresh").hide();
	$("#mtrNo0")[0].checked = true;
	oTable = $("#realtime_dat").dataTable();
	$("#realtime_dat").hide();
	$("#icon_load").hide();
}

//设置高一级的项目(大的项目)主要项目名称
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
	str += initTdMainCategory_tou("qr", qr_phase, qr_time.length);
	obj.html("");
	obj.html(str);
	//瞬时量 主项目表头
	str = "";
	str += initTdMainCategory_instant("v", "电压", phase.length);
	str += initTdMainCategory_instant("i", "电流", phase.length);
	str += initTdMainCategory_instant("p", "有功功率", power.length);
	str += initTdMainCategory_instant("q", "无功功率", power.length);
	str += initTdMainCategory_instant("pf", "功率因数", power.length);
	$("#instant_select_main").html(str);

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
	str += "<input type=checkbox class=\"chk_all_" + id + "\"";
	str += "id=\"" + name + "\"" + "index=" + "0" + " />";
	str += name_cn;
	str += "</label>";
	str += "</td>";
	return str;
}

function initSubCategoryName() {

	var str = "";
	//电量
	str += subCategoryName_tatil("tou", 4, tou_time);
	str += subCategoryName_tatil("qr", qr_phase.length, qr_time);
	$("#select_item").html(str);
	//瞬时量
	str = "";
	str += subCategoryName_instan("v", phase);
	str += subCategoryName_instan("i", phase);
	str += subCategoryName_instan("p", power);
	str += subCategoryName_instan("q", power);
	str += subCategoryName_instan("pf", power);
	$("#instant_select_sub").html(str);
	str = subCategoryName_tatil("maxn", maxn_phase.length, maxn_time);
	$("#maxneed_select_sub").html(str);
}

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
		str += "<input class=\"subcategory chk_sub_" + id + "\" type=\"checkbox\"";
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
	var i = 0;
	$(".chk_all_tou").click(function(event) {
		var bcheck = event.target.checked;
		var index = parseInt(event.target.getAttribute("index"));
		for ( i = 0; i < 5; i++) {
			$(".subcategory.chk_sub_tou")[index * 5 + i].checked = bcheck;
		}
	});
	$(".chk_all_qr").click(function(event) {
		var bcheck = event.target.checked;
		var index = parseInt(event.target.getAttribute("index"));
		for ( i = 0; i < 5; i++) {
			$(".subcategory.chk_sub_qr")[index * 5 + i].checked = bcheck;
		}
	});
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
	$(".chk_all_maxn").click(function(event) {
		var bcheck = event.target.checked;
		var index = parseInt(event.target.getAttribute("index"));
		for ( i = 0; i < 5; i++) {
			$(".subcategory.chk_sub_maxn")[index * 5 + i].checked = bcheck;
		}
	});
}
