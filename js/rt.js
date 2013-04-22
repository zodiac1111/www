/* 实时数据脚本,所有实时数据都在这里实现,只要实现:
 * 1. 构造查询字符串,0表示不查询,1表示查询
 * 2. 解析服务器返回的对象.
 * 类别分为一下部分:
 * 1. tou 电量,正有,反有,正无,反无*5
 * 2. qr 象限无功 4(象限)*5(分时电量)=20
 */
$.extend($.fn.dataTable.defaults, {//设置表格属性
	"bInfo" : false, //显示一共几条这种信息
	"bFilter" : false, //不要搜索
	"bSort" : false, //不要排序
	//"sScrollY" : "320px", //固定高度
	"bPaginate" : false, //不显示分页
	//"bScrollCollapse" : true, //显示滚动条
	"bRetrieve" : true,
	"bJQueryUI" : true,
	"bDestroy" : true
	//"bAutoWidth" : true
});
//表号显示每几个换一行
var newline = 20;
//var ie = !-[1,]; //ie则返回true,否则返回false
var timeZoneMs = 8 * 60 * 60;
// 当前显示类型.显示参数还是显示数据.开始时显示参数设置
var isShowSet = true;
var ShowData = true;
//时钟id
var refreshIntervalId;
$(document).ready(function() {
	///主过程
	var btnAutoRefresh = $("#btnAutoRefresh");
	var btnStopRefresh = $("#btnStopRefresh");
	var obtnRefresh = $("#btnManualRefresh");
	//界面的生成
	setMtr();
	setItem($("#select_item"));
	setItemFirst($("#select_item_first"));
	//然后才是事件的绑定
	obtnRefresh.click(function() {
		refresh();
	});
	$("#btnSelectItem").click(function() {
		if (isShowSet) {
			$("#tbl_realtime_dat_select").hide();
		} else {
			$("#tbl_realtime_dat_select").show();
		}
		isShowSet = !isShowSet;
	});

	btnAutoRefresh.click(function() {
		btnAutoRefresh.hide();
		$("#btnManualRefresh").attr("disabled", "disabled");
		var t = parseInt($("#autoRefresh_interval").val()) || 0;
		if (t < 5) {
			t = 5;
			$("#autoRefresh_interval").val("5");
		}
		//点击开始就立刻刷新一次,之后按照定时器刷新.
		refresh();
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

//刷新函数,手动刷新
function refresh() {
	if (ShowData) {
		$("#realtime_dat").show();
		ShowData = false;
	}
	var itemArray = "";
	var abQr = "";
	var mtrArray = ""
	var aItem = $("[id^='touItem']");
	var aMtr = $("[id^='mtrNo']");
	var len = aItem.length;
	var lenMtr = aMtr.length;
	if ($(".subcategory:checked:enabled").length <= 0) {
		alert("至少选择一个监视项目");
		return;
	}
	if ($(".meterNumber:checked:enabled").length <= 0) {
		alert("至少选择一个表");
		return;
	}
	//构造表号和项目字串 如 001100 1表示有效 项目/表
	for ( i = 0; i < lenMtr; i++) {
		mtrArray += aMtr[i].checked ? "1" : "0";
	}
	for ( i = 0; i < 20; i++) {
		itemArray += aItem[i].checked ? "1" : 0;
	}
	for ( i = 4; i < len; i++) {
		abQr += aItem[i].checked ? "1" : 0;
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
			fillDataTimestarmp(srvTimestarmp);
		},
		error : function() {//失败
			alert("服务器通讯错误,获取时间失败");
		}
	});
	var strPost = "";
	strPost += "action=get";
	strPost += "&mtrArray=" + mtrArray;
	strPost += "&tou=" + itemArray;
	strPost += "&qr=" + abQr;
	//开始通讯
	$.ajax({
		type : "post",
		url : "/goform/realtime_tou",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "text",
		data : strPost,
		success : function(result, textStatus) {
			var oTou = eval("(" + result + ")");
			fillDataHead($("#dateHead"), oTou.item_selected);
			fillData($("#touData"), oTou.mtr, oTou.mtr_selected);
			//oTable.fnDestroy(false);
			$('#realtime_dat').dataTable();
		},
		error : function() {//失败
			alert("服务器通讯错误,获取数据失败");
		},
		//完成(发生在失败或成功之后)
		complete : function(XMLHttpRequest, textStatus) {
			$("#btnManualRefresh").removeAttr("disabled");
		}
	});

}

//填写时间戳(标识终端实时数据的时间)
function fillDataTimestarmp(srvTimestarmp) {
	var str = "数据时刻:";
	str += timestarmpToString(srvTimestarmp);
	$("#timestamp").html(str);
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
function fillDataHead(oHead, itemArray) {
	oHead.html("");
	str = "";
	len = itemArray.length;
	str += "<th>表号</th>";
	str += "<th>抄表时刻</th>";
	var head = false;
	for ( i = 0; i < len; i++) {
		if (i % 5 == 0) {//每种数据开始使用全名称
			head = true;
		}
		//ie 不能使用 string[i]来索引char,只能使用charAt
		if (itemArray.charAt(i) == "1") {
			str += "<th>";
			switch (parseInt(i/5)) {
				case 0:
					str += head ? "正向<br>有功<br>" : "<br><br>";
					head = false;
					break;
				case 1:
					str += head ? "反向<br>有功<br>" : "<br><br>";
					head = false;
					break;
				case 2:
					str += head ? "正向<br>无功<br>" : "<br><br>";
					head = false;
					break;
				case 3:
					str += head ? "反向<br>无功<br>" : "<br><br>";
					head = false;
					break;
				case 4:
					str += head ? "一象限<br>无功<br>" : "<br><br>";
					head = false;
					break;
				case 5:
					str += head ? "二象限<br>无功<br>" : "<br><br>";
					head = false;
					break;
				case 6:
					str += head ? "三象限<br>无功<br>" : "<br><br>";
					head = false;
					break;
				case 7:
					str += head ? "四象限<br>无功<br>" : "<br><br>";
					head = false;
					break;
			}
			switch (i%5) {
				case 0:
					str += "总";
					break;
				case 1:
					str += "尖";
					break;
				case 2:
					str += "峰";
					break;
				case 3:
					str += "平";
					break;
				case 4:
					str += "谷";
					break;
			}
			str += "</th>";
		}
	}
	oHead.html(str);
}

//在mtrArray 中找到第 i 个 等于"1"的字符,返回这个字符的index
function fillMtrNumber(i, mtrArray) {
	var num = 0;
	for ( j = 0; j < mtrArray.length; j++) {
		if (mtrArray.charAt(j) == "1") {//tian sha de ie!
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

//将数据填充到表格中,aMtr:表计对象数组
function fillData(oTable, aMtr, mtrArray) {
	str = "";
	mtrnum = aMtr.length;
	for ( i = 0; i < mtrnum; i++) {
		str += "<tr>";
		str += fillMtrNumber(i, mtrArray)
		str += fillMtrReadTime(parseInt(aMtr[i].Meter_ReadTime));
		for ( j = 0; j < aMtr[i].tou.length; j++) {
			var iv = (aMtr[i].tou[j][1] == "1") ? "valid " : "iv";
			// *有效*标识
			str += "<td class=" + iv + ">" + aMtr[i].tou[j][0] + "</td>";
		}
		for ( j = 0; j < aMtr[i].qr.length; j++) {
			var iv = (aMtr[i].qr[j][1] == "1") ? "valid " : "iv";
			// *有效*标识
			str += "<td class=" + iv + ">" + aMtr[i].qr[j][0] + "</td>";
		}
		str += "</tr>";
	}
	oTable.html("");
	oTable.html(str);
	return;
}

//设定初始(默认)状态.
function init() {
	set_val(0, true);
	set_val(5, true);
	set_val(10, true);
	set_val(15, true);
	$("#btnStopRefresh").hide();
	$("#mtrNo0")[0].checked = true;
	//$('#realtime_dat').dataTable();
	$("#realtime_dat").hide();
}

//设置高一级的项目(大的项目)
function setItemFirst(obj) {
	var str = "";
	var i = 0;
	var name = "";
	for ( i = 0; i < 8; i++) {
		name = "all_tou" + i;
		str += "<td colspan=\"5\">" + "<input type=\"checkbox\" name=" + name + " value=\"" + "0" + "\" id=\"" + name + "\" onclick= \"check_click(" + i + ");\"" + " />" + "<label for=" + name + ">";
		switch(i) {
			case 0:
				str += "正向有功";
				break;
			case 1:
				str += "反向有功";
				break;
			case 2:
				str += "正向无功";
				break;
			case 3:
				str += "反向无功";
				break;
			case 4:
				str += "第一象限无功";
				break;
			case 5:
				str += "第二象限无功";
				break;
			case 6:
				str += "第三象限无功";
				break;
			case 7:
				str += "第四象限无功";
				break;
		}
		str += "</label></td>";
	}
	obj.html("");
	obj.html(str);
}

//单击上层选中下层的5个分时电量
function check_click(i) {
	var bchecked = $("#all_tou"+i)[0].checked;
	for ( ind = 0; ind < 5; ind++) {
		set_val(i * 5 + ind, bchecked);
	}
}

//设置checkbox选中/不选中
function set_val(i, bchecked) {
	$("#touItem" + i)[0].checked = bchecked;
	$("#touItem" + i)[0].value = bchecked ? "1" : "0";
}

//选中/不选中中切换,同时更新value
function change_val(i) {
	bchecked = $("#touItem" + i)[0].checked;
	$("#touItem" + i)[0].checked = bchecked;
	$("#touItem" + i)[0].value = bchecked ? "1" : "0";
}

function setItem(obj) {
	var str = "";
	for ( i = 0; i < 40; i++) {
		var name = "touItem" + i;
		str += "<td><input class=\"subcategory\" type=checkbox name=" + name + " value=" + "0" + " onclick= \"change_val(" + i + ");\"" + " id=" + name + " /><br><label for=" + name + ">";
		switch(i % 5) {
			case 0:
				str += "总";
				break;
			case 1:
				str += "尖";
				break;
			case 2:
				str += "峰";
				break;
			case 3:
				str += "平";
				break;
			case 4:
				str += "谷";
				break;
		}
		str += "</label></td>";
	}
	obj.html("");
	obj.html(str);
}