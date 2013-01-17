/**
 * 重启页面用到的脚本
 */
var stime = document.getElementById("stime_stamp");
var etime = document.getElementById("etime_stamp");
var mtr_no = document.getElementById("mtr_no");
var form_load_monport = "/goform/load_monport_cfg";
var form_save_monport = "/goform/save_monport_cfg";
var form_load_protocol = "/goform/load_procotol_cfg";
var form_save_protocol = "/goform/save_procotol_cfg";

$(document).ready(function() {// 所有脚本都在文档加载完全后执行
	/**
	 * 功能操作
	 */
	$("#btnResetPro").click(function() {
		$.post('/goform/reset', "OpType=1", function(result) {
			alert("操作完成");
		});
	});
	$("#btnResetWeb").click(function() {
		$.post('/goform/reset', "OpType=2", function(result) {
			alert("操作完成");
		});
	});
	$("#btnResetSample").click(function() {
		$.post('/goform/reset', "OpType=3", function(result) {
			alert("操作完成");
		});
	});
	$("#btnResetRtu").click(function() {
		$.post('/goform/reset', "OpType=4", function(result) {
			alert("操作完成");
		});
	});
	/**
	 * 对话框
	 */
	var monport_txt = document.getElementById("monport_text");
	$(".dialog").hide();
	$("#btn").click(function() {
		$.get("/um/compara1.asp", function(result) {
			$("#log").html(result);
		});
	});
	$("#mon_msg_stop").hide();
	/**
	 * 历史电量查询post
	 */
	$("#btnPost").click(function() {
		// 显示
		//$("#tr_dat").html("");
		//$("#msgbox_wait").show("fade", {}, 1);
		//$("#msgbox_wait").addClass("waiticon");
		$("#tr_dat").html("<tr><td colspan=\"999\" ></td></tr>");
		$("#tr_dat tr td").addClass('load_bgpic_hight');
		$.post('/goform/get_tou', $("#history_tou").serialize() + "&mtr_no=" + $("#mtr_no").val(), function(result) {
			$("#tr_dat tr td").removeClass('load_bgpic_hight');
			$("#tr_dat").html(result);
			// 动态加载完的页面才可以接收鼠标悬停等事件
			$("#tr_dat tr").mouseover(function() {
				$(this).addClass("over");
			});
			$("#tr_dat tr").mouseout(function() {
				$(this).removeClass("over");
			});
			// 完成之后隐藏
			//$("#msgbox_wait").hide("fade", {}, 1000);
			//$("#msgbox_wait").removeClass("waiticon");
		});
	});
	/**
	 * 从服务器加载错误日志文件
	 */
	$("#load_log").click(function() {
		$("#log_text").addClass("textarea_bgpic");
		$("#log_text").val("");
		$.ajax({
			type : "post",
			url : "/goform/load_log",
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			dataType : "text",
			data : "load",
			beforeSend : function(XMLHttpRequest) {
				//ShowLoading(); //发送前
				//alert("发送前");
				//$("#msg_text").addClass("textarea_bgpic_t");
			},
			//成功(先成功,后完成)
			success : function(data, textStatus) {
				//alert("ajax成功,状态:" + textStatus + ",数据:" + data);
				$("#log_text").val(data);//填充数据
			},
			//完成(成功/失败)
			complete : function(XMLHttpRequest, textStatus) {
				//alert("ajax完成,接收:对象:" + XMLHttpRequest + ",状态:" + textStatus);
				$("#log_text").removeClass("textarea_bgpic");
			},
			error : function() {
				alert("ajax错误");
				//$("#msg_text").html("Ajax错误");
			}
		});
	});
	/**
	 * 将文本保存到服务器的错误日志文件
	 */
	$("#save_log").click(function() {
		var b = document.getElementById("log_text");
		if (b.value == "") {
			alert("文本不能为空");
		} else {
			//确认信息框
			$(function() {
				$("#dialog-confirm").dialog({
					modal : true,
					buttons : {
						"保存" : function() {
							$(this).dialog("close");
							//alert("确认保存");
								$("#log_text").addClass("textarea_bgpic");
							$.post("/goform/save_log", $("#log_text").val(), function(result) {
								// 完成之后隐藏
									$("#log_text").removeClass("textarea_bgpic");
							});
						},
						"取消" : function() {
							$(this).dialog("close");
							//alert("取消了");
						}
					}
				});
			});
		}
	});
	//   监视端口配置文件
	/**
	 * 从服务器加载 监视端口配置文件(端口文本描述)
	 */
	$("#load_monport").click(function() {
		$("#monport_text").addClass("textarea_bgpic");
		$("#monport_text").val("");
		$.post(form_load_monport, "load_monport", function(result) {
			$("#monport_text").removeClass("textarea_bgpic");
			$("#monport_text").val(result);
			// 完成之后隐藏
		});
	});
	/**
	 * 将文本保存到服务器的 监视端口配置文件
	 */
	$("#save_monport").click(function() {
		if (monport_txt.value == "") {
			alert("文本不能为空");
		} else {
			//确认信息框
			$(function() {
				$("#dialog-confirm-monport").dialog({
					modal : true,
					//position: { my: "center", at: "center", of: window },
					buttons : {
						"保存" : function() {
							$(this).dialog("close");
							//alert("确认保存");
							$("#monport_text").addClass("textarea_bgpic");
							$.post(form_save_monport, $("#monport_text").val(), function(result) {
								// 完成之后隐藏
								$("#monport_text").removeClass("textarea_bgpic");
							});
						},
						"取消" : function() {
							$(this).dialog("close");
							//alert("取消了");
						}
					}
				});
			});
		}
	});
	/**
	 * 加载规约配置文件
	 */
	$("#load_procotol").click(function() {
		$("#procotol_text").addClass("textarea_bgpic");
		$("#procotol_text").val("");
		$.post(form_load_protocol, "load_monport", function(result) {
			//alert("ajax完成");
			$("#procotol_text").removeClass("textarea_bgpic");
			$("#procotol_text").val(result);
		});
	});
	/**
	 * 保存规约配置文件
	 */
	$("#save_procotol").click(function() {
		if (monport_txt.value == "") {
			alert("文本不能为空");
		} else {
			//确认信息框
			$(function() {
				$("#dialog-confirm-monport").dialog({
					modal : true,
					//position: { my: "center", at: "center", of: window },
					buttons : {
						"保存" : function() {
							$(this).dialog("close");
							//alert("确认保存");
							$("#procotol_text").addClass("textarea_bgpic");
							$.post(form_save_protocol, $("#procotol_text").val(), function(result) {
								// 完成
								$("#procotol_text").removeClass("textarea_bgpic");
							});
						},
						"取消" : function() {
							$(this).dialog("close");
							//alert("取消了");
						}
					}
				});
			});
		}
	});
	/**
	 * 报文监视
	 */
	//$("#msg_text").addClass("textarea_bgpic"); //测试背景图片时用到的.
	$("#mon_msg").click(function() {
		// alert("点击");
		$("#mon_msg_stop").show();
		//按钮变化
		$("#mon_msg").hide();
		$("#msg_text").addClass("textarea_bgpic");
		//文本框等待动画
		$("#msg_text").html("");
		//清空内容
		//清空文本框
		$.ajax({
			type : "post",
			url : "/goform/msg",
			data : $("#cmd").val(),
			beforeSend : function(XMLHttpRequest) {
				//ShowLoading(); //发送前
				//alert("发送前");
				//$("#msg_text").addClass("textarea_bgpic_t");
			},
			//成功(先成功,后完成)
			success : function(data, textStatus) {
				//alert("成功"+textStatus);
				//start();
				$("#msg_text").html(data);
				//填充数据
			},
			//完成(成功/失败)
			complete : function(XMLHttpRequest, textStatus) {
				//alert("完成");
				//HideLoading();
				$("#mon_msg").show();
				$("#mon_msg_stop").hide();
				$("#msg_text").removeClass("textarea_bgpic");
			},
			error : function() {
				$("#msg_text").html("Ajax错误");
			}
		});
	});
	/**
	 * 停止端口监视按钮
	 */
	$("#mon_msg_stop").click(function() {
		$("#mon_msg").show();
		$("#mon_msg_stop").hide();
		$.post('/goform/msg_stop', "stop", function(result) {
			alert("手动停止监听");
			// 动态加载完的页面才可以接收鼠标悬停等事件
			//alert("监听完毕");
			// $("#history_tou tr").mouseover(function() {
			// $(this).addClass("over");
			// });
			// $("#history_tou tr").mouseout(function() {
			// $(this).removeClass("over");
			//});
		});
	});
	$("#mon_test").click(function() {
		//
		//alert("显示测试");
		$("#msg_text").append();
	});
	//文本提示信息,鼠标移上 显示提示信息
	$(function() {
		$(document).tooltip();
	});
	//重启按钮
	$(function() {
		$(".reboot").button({
			icons : {
				primary : "ui-icon-power"
			},
			text : true
		});
	});
	///加载日志按钮
	$(function() {
		$("#load_log").button({
			icons : {
				primary : "ui-icon-arrowstop-1-s"
			},
			text : true
		});
	});
	///保存日志按钮
	$(function() {
		$("#save_log").button({
			icons : {
				primary : "ui-icon-arrowstop-1-n"
			},
			text : true
		});
	});
	///加载监视端口按钮
	$(function() {
		$("#load_monport").button({
			icons : {
				primary : "ui-icon-arrowstop-1-s"
			},
			text : true
		});
	});
	///保存监视端口参数按钮
	$(function() {
		$("#save_monport").button({
			icons : {
				primary : "ui-icon-arrowstop-1-n"
			},
			text : true
		});
	});
	///加载规约配置文件
	$(function() {
		$("#load_procotol").button({
			icons : {
				primary : "ui-icon-arrowstop-1-s"
			},
			text : true
		});
	});
	///保存规约配置文件
	$(function() {
		$("#save_procotol").button({
			icons : {
				primary : "ui-icon-arrowstop-1-n"
			},
			text : true
		});
	});
	///报文监视按钮-开始
	$(function() {
		$("#mon_msg").button({
			icons : {
				primary : "ui-icon-play"
			},
			text : true
		});
	});
	///报文监视按钮-停止
	$(function() {
		$("#mon_msg_stop").button({
			icons : {
				primary : "ui-icon-pause"
			},
			text : true
		});
	});
	///按钮,查询历史数据
	$(function() {
		$("#btnPost").button({
			icons : {
				primary : "ui-icon-search"
			},
			text : true
		});
	});
	//标签页 标签id tabs
	$(function() {
		var tabs = $("#tabs").tabs();
		tabs.find(".ui-tabs-nav").sortable({
			axis : "x",
			stop : function() {
				tabs.tabs("refresh");
			}
		});
	});
});
