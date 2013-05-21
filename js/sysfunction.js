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
//重试百分比,在运行到这个百分比的时候重新尝试连接终端.(重启终端动作)
var RETRY = 90;
$(document).ready(function() {// 所有脚本都在文档加载完全后执行
	/**
	 * 功能操作
	 */
	//进度条
	var oProbar = $("#divProgressbar");
	var progressLabel = $(".progress-label");
	//按钮
	var obtnResetPro = $("#btnResetPro");
	var obtnResetWeb = $("#btnResetWeb");
	var obtnResetSample = $("#btnResetSample");
	var oBtnResetRtu = $("#btnResetRtu");
	var oBtnClearData = $("#btnClearData");
	var oBtnUpdate = $("#btnWebsUpdate");
	oProbar.hide();
	//标签页 标签id tabs
	var tabs = $("#tabs").tabs();
	///@todo TODO 传递的参数名称有意义,易于人类阅读
	oBtnClearData.click(function() {
		oBtnClearData.attr("disabled", "disabled");
		$.ajax({
			type : "post",
			url : "/goform/reset",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			dataType : "text",
			data : "OpType=5",
			success : function(result, textStatus) {
				alert("操作完成");
				oBtnClearData.removeAttr('disabled');
			},
			error : function() {//失败
				alert("服务器通讯错误");
				oBtnClearData.removeAttr('disabled');
			}
		});
	});
	obtnResetPro.click(function() {
		obtnResetPro.attr("disabled", "disabled");
		$.ajax({
			type : "post",
			url : "/goform/reset",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			dataType : "text",
			data : "OpType=1",
			success : function(result, textStatus) {
				alert("操作完成");
				obtnResetPro.removeAttr('disabled');
			},
			error : function() {//失败
				oProbar.hide();
				alert("服务器通讯错误");
				obtnResetPro.removeAttr('disabled');
			}
		});
	});
	obtnResetWeb.click(function() {
		obtnResetWeb.attr("disabled", "disabled");
		$.ajax({
			type : "post",
			url : "/goform/reset",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			dataType : "text",
			data : "OpType=2",
			success : function(result, textStatus) {
				alert("操作完成");
				obtnResetWeb.removeAttr('disabled');
			},
			error : function() {//失败
				oProbar.hide();
				alert("服务器通讯错误");
				obtnResetWeb.removeAttr('disabled');
			}
		});
	});
	//采集程序,即主程序
	obtnResetSample.click(function() {
		obtnResetSample.attr("disabled", "disabled");
		$.ajax({
			type : "post",
			url : "/goform/reset",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			dataType : "text",
			data : "OpType=3",
			success : function(result, textStatus) {
				alert("操作完成");
				obtnResetSample.removeAttr('disabled');
			},
			error : function() {//失败
				oProbar.hide();
				alert("服务器通讯错误");
				obtnResetSample.removeAttr('disabled');
			}
		});
	});
	/**
	 * 重启终端,先发送命令重启,
	 * 		此时若通讯错误,则终端并没有收到重启信号,例如webs服务器没有响应等.
	 * 如果正确发送给终端重启信号
	 *    前端运行一个进度条(仅按时间累加),
	 *    运行时间到后,第二次post一个测试数据,
	 *    检查是否正确返回:
	 *       正确返回:则终端已经完全重启.
	 *       ajax没有正确返回,则等待用户手动刷新页面.
	 */
	oBtnResetRtu.click(function() {
		oBtnResetRtu.attr('disabled', 'disabled');
		var progressLabel = $(".progress-label");
		$.ajax({
			type : "post",
			url : "/goform/reset",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			dataType : "text",
			data : "OpType=4",
			success : function(result, textStatus) {
				oProbar.show();
				oProbar.progressbar({
					value : 0
				});
				updateProgressbarValue();
				//调用函数
				function updateProgressbarValue() {
					//初始化进度条，如果已经初始化则会跳过
					var value = oProbar.progressbar("option", "value") + 1;
					//读取进度条现有值并计算出新值
					oProbar.progressbar("option", "value", value);
					if (value < RETRY) {
						progressLabel.text("重启终端... " + oProbar.progressbar("value") + "%");
					} else if (value >= RETRY && value < 100) {
						progressLabel.text("连接终端... " + oProbar.progressbar("value") + "%");
					}
					//设置进度条新值
					if (value < 99) {
						setTimeout(updateProgressbarValue, 130);
						if (value == RETRY) {
							//一段后时间到尝试重连服务器,判断终端和服务器是否真的重启完毕
							$.ajax({
								type : "POST", //提交的类型
								url : "/goform/reset", //提交地址
								data : "OpType=12", //参数
								success : function(result, textStatus) {
									//oProbar.hide();
									oProbar.progressbar("option", "value", 100);
									progressLabel.text("终端重启成功");
									alert("终端重启成功");
									oBtnResetRtu.removeAttr('disabled');
									//这里是方法内容，和上面的get方法一样
								},
								error : function() {//失败
									//oProbar.hide();
									progressLabel.text("请稍后手动刷新页面");
									oBtnResetRtu.removeAttr('disabled');
									//alert("请手动刷新页面");
								}
							});
						}
					} else {
						clearTimeout(updateProgressbarValue);
					}
					//使用setTimeout函数延迟调用updateProgressbarValue函数，延迟时间为500毫秒
				}

			},
			error : function() {//失败
				oProbar.hide();
				alert("服务器通讯错误");
				oBtnResetRtu.removeAttr('disabled');
			}
		});
	});

	/**
	 * 对话框
	 */
	var monport_txt = document.getElementById("monport_text");
	$(".dialog").hide();
	$("#mon_msg_stop").hide();
	/**
	 * 历史电量查询post
	 */

	/**
	 * 从服务器加载错误日志文件
	 */
	$("#load_log").click(function() {
		$("#log_text").addClass("textarea_bgpic");
		$("#log_text").val("");
		$.ajax({
			type : "post",
			url : "/goform/load_log",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
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
				$("#log_text").val(data);
				//填充数据
			},
			//完成(成功/失败)
			complete : function(XMLHttpRequest, textStatus) {
				//alert("ajax完成,接收:对象:" + XMLHttpRequest + ",状态:" + textStatus);
				$("#log_text").removeClass("textarea_bgpic");
			},
			error : function() {
				alert("服务器通讯错误");
			}
		});
	});
	/**
	 * 将文本保存到服务器的错误日志文件//清空日志文件
	 */
	$("#save_log").click(function() {
		var b = document.getElementById("log_text");
		if (b.value == "空") {
			alert("文本不能为空");
		} else {
			//确认信息框
			$(function() {
				$("#dialog-confirm").dialog({
					modal : true,
					buttons : {
						"取消" : function() {
							$(this).dialog("close");
							//alert("取消了");
						},
						"确认" : function() {
							$(this).dialog("close");
							//alert("确认保存");
							$("#log_text").addClass("textarea_bgpic");
							$.post("/goform/save_log", "No Log", function(result) {
								// 完成之后隐藏
								$("#log_text")[0].value = "";
								$("#log_text").removeClass("textarea_bgpic");
							});
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
						"取消" : function() {
							$(this).dialog("close");
							//alert("取消了");
						},
						"保存" : function() {
							$(this).dialog("close");
							//alert("确认保存");
							$("#monport_text").addClass("textarea_bgpic");
							$.post(form_save_monport, $("#monport_text").val(), function(result) {
								// 完成之后隐藏
								$("#monport_text").removeClass("textarea_bgpic");
							});
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
		var t = document.getElementById("procotol_text");
		if (t.value == "") {
			alert("文本不能为空");
		} else {
			//确认信息框
			$(function() {
				$("#dialog-confirm-procotol").dialog({
					modal : true,
					//position: { my: "center", at: "center", of: window },
					buttons : {
						"取消" : function() {
							$(this).dialog("close");
							//alert("取消了");
						},
						"保存" : function() {
							$(this).dialog("close");
							//alert("确认保存");
							$("#procotol_text").addClass("textarea_bgpic");
							$.post(form_save_protocol, $("#procotol_text").val(), function(result) {
								// 完成
								$("#procotol_text").removeClass("textarea_bgpic");
							});
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
	//读取配置信息
	$("#info").click(function() {
		$.post('/goform/info', "action=get", function(result) {
			//alert(result);
			var oInfo = eval("(" + result + ")");
			var str;
			str = oInfo.major + "." + oInfo.minor + "." + oInfo.patchlevel + " [" + oInfo.git_version + "]";
			$("#webs-version").html(str);
			$("#info_webconf").html(oInfo.info_webconf);
			$("#info_weblog").html(oInfo.info_weblog);
			$("#info_rtuconf").html(oInfo.info_rtuconf);
			$("#info_rtupara").html(oInfo.info_rtupara);
			$("#info_wwwroot").html(oInfo.info_wwwroot);
			$("#info_webbin").html(oInfo.info_webbin);
			$("#build_time").html(oInfo.build_time);
			$("#main_version_string").html(oInfo.main_version_string);
			//$("#procotol_text").removeClass("textarea_bgpic");
			//$("#procotol_text").val(result);
		});
	});
	$("#info").click();
	$("#mon_test").click(function() {
		//alert("显示测试");
		$("#msg_text").append();
	});
	initUI();
	initEvent();
});

//初始化事件,如按钮的点击事件等
function initEvent() {
	$("#btnConfFile").click(function() {
		onBackConfFileCilck();
	});
	$("#btnSysDir").click(function() {
		onBackupSysDir();
	});
	$("#btnWebsInstaller").click(function() {
		onBackupInstaller();
	});
	$("body").keydown(function(event) {
		var KEY_H = 72;
		if (event.which == KEY_H) {
			$("#backup_soft").show();
			$("#backup_conf").show();
			$("#backup_installer").show();
			$("#web_shell_title").show();
			$("#tabs-msg").show();
		} /*else {
			$("#backup_soft").hide();
			$("#backup_conf").hide();
			$("#backup_installer").hide();
			$("#web_shell_title").hide();
			$("#tabs-msg").hide();
		}*/
	});
	$("#btnWebsUpdate").click(function() {
		if ($("#file").val() == "") {
			alert("请选择文件.");
			return false;
		}
	});
}

function onBackupSysDir() {
	var strPost = "action=sys";
	$.ajax({
		type : "post",
		url : "/goform/conf_file",
		data : strPost,
		beforeSend : function(XMLHttpRequest) {
			$("#btnSysDir").attr("disabled", "disabled");
			$("#sys_file_link").hide();
			$("#sys_file_load").show();
		},
		success : function(data, textStatus) {
			//alert("成功"+textStatus);
			$("#btnSysDir").hide()
			$("#sys_file_link").show();
			alert("生成备份文件,点击链接下载");
		},
		error : function() {
			alert("服务器通讯错误(ajax错误)");
		},
		//完成(成功/失败)之后
		complete : function(XMLHttpRequest, textStatus) {
			$("#sys_file_load").hide();
			//$("#btnSysDir").removeAttr("disabled");
		}
	});
}
function onBackupInstaller() {
	var strPost = "action=webs_installer";
	$.ajax({
		type : "post",
		url : "/goform/conf_file",
		data : strPost,
		beforeSend : function(XMLHttpRequest) {
			$("#btnWebsInstaller").attr("disabled", "disabled");
			$("#installer_link").hide();
			$("#installer_load").show();
		},
		success : function(data, textStatus) {
			//alert("成功"+textStatus);
			$("#btnWebsInstaller").hide();
			$("#installer_link").show();
			var ver=$("#main_version_string").html().toLowerCase().replace(/[^a-z]/ig,"");
			$("#installer_link").attr("href","/tmp/webs-binary-hl3104"+ver+".tar.gz");
			alert("生成备份文件,点击链接下载");
		},
		error : function() {
			alert("服务器通讯错误(ajax错误)");
		},
		//完成(成功/失败)之后
		complete : function(XMLHttpRequest, textStatus) {
			$("#installer_load").hide();
			//$("#btnWebsInstaller").removeAttr("disabled");
		}
	});
}
function onBackConfFileCilck() {
	var strParaDir = $("#info_rtupara").text();
	var strConfDir = $("#info_rtuconf").text();
	var strPost = "action=export";
	// strPost += "&items=" + strParaDir + "/sysspara.cfg";
	// strPost += "&items=" + strParaDir + "/sioplan.cfg";
	// strPost += "&items=" + strParaDir + "/netpara.cfg";
	// strPost += "&items=" + strParaDir + "/ctspara.cfg";
	// strPost += "&items=" + strParaDir + "/monpara.cfg";
	// strPost += "&items=" + strParaDir + "/stspara.cfg";
	// strPost += "&items=" + strParaDir + "/mtrspara.cfg";
	// strPost += "&items=" + strParaDir + "/monpara.cfg";
	// strPost += "&items=" + strParaDir + "/gprs.txt";
	// strPost += "&items=" + strParaDir + "/rtu.xml";
	//默认下载这两个文件夹写所有文件
	strPost += "&items=" + strParaDir + "/*";
	strPost += "&items=" + strConfDir + "/*";
	$.ajax({
		type : "post",
		url : "/goform/conf_file",
		data : strPost,
		beforeSend : function(XMLHttpRequest) {
			$("#btnConfFile").attr("disabled", "disabled");
			$("#back_file_link").hide();
			$("#back_file_load").show();
		},
		success : function(data, textStatus) {
			//alert("成功"+textStatus);
			$("#btnConfFile").hide();
			$("#back_file_link").show();
			alert("生成备份文件,点击链接下载");
		},
		error : function() {
			alert("服务器通讯错误(ajax错误)");
		},
		//完成(成功/失败)之后
		complete : function(XMLHttpRequest, textStatus) {
			$("#back_file_load").hide();
			//$("#btnConfFile").removeAttr("disabled");
		}
	});
}

//初始化界面中按钮/标签也等UI
function initUI() {
	$("#import_monprot").hide();
	$("#export_monprot").hide();
	$("#import_procotol").hide();
	//
	$("#export_procotol").hide();
	$("#backup_soft").hide();
	$("#backup_conf").hide();
	$("#backup_installer").hide();
	$("#back_file_link").hide();
	$("#back_file_load").hide();
	$("#sys_file_link").hide();
	$("#sys_file_load").hide();
	$("#installer_link").hide();
	$("#installer_load").hide();
	//
	$("#web_shell_title").hide();
	$("#tabs-msg").hide();

	$("#info").hide();
	//文本提示信息,鼠标移上 显示提示信息
	$(document).tooltip();
	//重启按钮
	$(".reboot").button({
		icons : {
			primary : "ui-icon-power"
		}
	});
	//上传按钮
	$(".update").button({
		icons : {
			primary : "ui-icon-document"
		}
	});
	$(".run").button({
		icons : {
			primary : "ui-icon-play"
		}
	});
	$(".stop").button({
		icons : {
			primary : "ui-icon-pause"
		}
	});
	$(".manual").button({
		icons : {
			primary : "ui-icon-pause"
		}
	});
	$(".simple_button").button({

	});
	$(".btnSet").button({
		icons : {
			primary : "ui-icon-gear"
		}
	});

	$(".select_file").button({
		icons : {
			primary : "ui-icon-power"
		}
	});
	///加载日志按钮
	$("#load_log").button({
		icons : {
			primary : "ui-icon-arrowstop-1-s"
		}
	});
	///保存日志按钮
	$("#save_log").button({
		icons : {
			primary : "ui-icon-arrowstop-1-n"
		}
	});
	///加载监视端口按钮
	$("#load_monport").button({
		icons : {
			primary : "ui-icon-arrowstop-1-s"
		}
	});
	///保存监视端口参数按钮
	$("#save_monport").button({
		icons : {
			primary : "ui-icon-arrowstop-1-n"
		}
	});
	//加载规约配置文件
	$("#load_procotol").button({
		icons : {
			primary : "ui-icon-arrowstop-1-s"
		}
	});
	///保存规约配置文件
	$("#save_procotol").button({
		icons : {
			primary : "ui-icon-arrowstop-1-n"
		}
	});
	///报文监视按钮-开始
	$("#mon_msg").button({
		icons : {
			primary : "ui-icon-play"
		}
	});
	///报文监视按钮-停止
	$("#mon_msg_stop").button({
		icons : {
			primary : "ui-icon-pause"
		}
	});
	///配置文件
	//$("#btnConfFile").button();
	//$("#btnSysDir").button();
}

//文件名过滤
function fileFilter(obj) {
	var file = obj.value.match(/[^\/\\]+$/gi)[0];
	var rx = new RegExp('webs-binary-hl3104(ha|jd|ja|j).tar.gz$', 'gi');
	if (file && !file.match(rx)) {
		$("#file").val("");
		var str = "根据终端类型,升级包文件应为:\n";
		str += "\"webs-binary-hl3104ha.tar.gz\" 或\n";
		str += "\"webs-binary-hl3104jd.tar.gz\".\n";
		str += "\"webs-binary-hl3104ja.tar.gz\".\n"
		str += "\"webs-binary-hl3104j.tar.gz\".\n"
		str += "请选择正确的升级包文件.";
		alert(str);
	}
}