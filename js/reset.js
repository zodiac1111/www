/**
 * ����ҳ���õ��Ľű�
 */
var stime = document.getElementById("stime_stamp");
var etime = document.getElementById("etime_stamp");
var mtr_no = document.getElementById("mtr_no");
var form_load_monport = "/goform/load_monport_cfg";
var form_save_monport = "/goform/save_monport_cfg";

$(document).ready(function() { // ���нű������ĵ�������ȫ��ִ��
	/**
	 * ���ܲ���
	 */
	$("#btnResetPro").click(function() {
		$.post('/goform/reset', "OpType=1", function(result) {
			alert("�������");
		});
	});
	$("#btnResetWeb").click(function() {
		$.post('/goform/reset', "OpType=2", function(result) {
			alert("�������");
		});
	});
	$("#btnResetSample").click(function() {
		$.post('/goform/reset', "OpType=3", function(result) {
			alert("�������");
		});
	});
	$("#btnResetRtu").click(function() {
		$.post('/goform/reset', "OpType=4", function(result) {
			alert("�������");
		});
	});
	/**
	 * �Ի���
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
	 * ��ʷ������ѯpost
	 */
	$("#btnPost").click(function() {
		// ��ʾ
		//$("#tr_dat").html("");
		$("#msgbox_wait").show("fade", {}, 1);
		$.post('/goform/get_tou', $("#history_tou").serialize() + "&mtr_no=" + $("#mtr_no").val(), function(result) {
			$("#tr_dat").html(result);
			// ��̬�������ҳ��ſ��Խ��������ͣ���¼�
			$("#history_tou tr").mouseover(function() {
				$(this).addClass("over");
			});
			$("#history_tou tr").mouseout(function() {
				$(this).removeClass("over");
			});
			// ���֮������
			$("#msgbox_wait").hide("fade", {}, 1000);
		});
	});
	/**
	 * �ӷ��������ش�����־�ļ�
	 */
	$("#load_log").click(function() {
		// ��ʾ
		$("#log_wait").show("fade", {}, 1);
		$("#log_wait").attr("disabled", "true");
		//��ť��Ӧ���ܰ�
		$.post("/goform/load_log", "load", function(result) {
			$("#log_wait").attr("disabled", "false");
			$("#log_wait").hide("fade", {}, 1000);
			var b = document.getElementById("log_text");
			b.value = result;
		});
	});
	/**
	 * ���ı����浽�������Ĵ�����־�ļ�
	 */
	$("#save_log").click(function() {
		var b = document.getElementById("log_text");
		if (b.value == "") {
			alert("�ı�����Ϊ��");
		} else {
			//ȷ����Ϣ��
			$(function() {
				$("#dialog-confirm").dialog({
					modal : true,
					buttons : {
						"����" : function() {
							$(this).dialog("close");
							//alert("ȷ�ϱ���");
							$("#log_wait").show("fade", {}, 1);
							$.post("/goform/save_log", $("#log_text").val(), function(result) {
								// ���֮������
								$("#log_wait").hide("fade", {}, 1000);
							});
						},
						"ȡ��" : function() {
							$(this).dialog("close");
							//alert("ȡ����");
						}
					}
				});
			});
		}
	});
	//   ���Ӷ˿������ļ�
	/**
	 * �ӷ��������� ���Ӷ˿������ļ�(�˿��ı�����)
	 */
	$("#load_monport").click(function() {
		$("#load_monport").attr("disabled", "true");
		$("#monprot_wait").show("fade", {}, 1);
		$.post(form_load_monport, "load_monport", function(result) {
			$("#monprot_wait").hide("fade", {}, 1000);
			monport_txt.value = result;
			$("#load_monport").attr("disabled", "fasle");
			//$("#log_text").html("1231");
			//$("#log_text").html(result);
			// ���֮������

		});
	});
	/**
	 * ���ı����浽�������ļ��Ӷ˿������ļ�
	 */
	$("#save_monport").click(function() {
		if (monport_txt.value == "") {
			alert("�ı�����Ϊ��");
		} else {
			//ȷ����Ϣ��
			$(function() {
				$("#dialog-confirm-monport").dialog({
					modal : true,
					//position: { my: "center", at: "center", of: window },
					buttons : {
						"����" : function() {
							$(this).dialog("close");
							//alert("ȷ�ϱ���");
							$("#monprot_wait").show("fade", {}, 1);
							$.post(form_save_monport, $("#monport_text").val(), function(result) {
								// ���֮������
								$("#monprot_wait").hide("fade", {}, 1000);
							});
						},
						"ȡ��" : function() {
							$(this).dialog("close");
							//alert("ȡ����");
							//return;
						}
					}
				});
			});
		}
	});
	/**
	 * ���ļ���
	 */
	//$("#msg_text").addClass("textarea_bgpic"); //���Ա���ͼƬʱ�õ���.
	$("#mon_msg").click(function() {
		// alert("���");
		$("#mon_msg_stop").show();//��ť�仯
		$("#mon_msg").hide();
		$("#msg_text").addClass("textarea_bgpic");	//�ı���ȴ�����
		$("#msg_text").html("");//�������
		//����ı���
		$.ajax({
			type : "post",
			url : "/goform/msg",
			data : $("#cmd").val(),
			beforeSend : function(XMLHttpRequest) {
				//ShowLoading(); //����ǰ
				//alert("����ǰ");
				//$("#msg_text").addClass("textarea_bgpic_t");
			},
			//�ɹ�(�ȳɹ�,�����)
			success : function(data, textStatus) {
				//alert("�ɹ�"+textStatus);
				//start();
				$("#msg_text").html(data);//�������
			},
			//���(�ɹ�/ʧ��)
			complete : function(XMLHttpRequest, textStatus) {
				//alert("���");
				//HideLoading();
				$("#mon_msg").show();
				$("#mon_msg_stop").hide();
				$("#msg_text").removeClass("textarea_bgpic");
			},
			error : function() {
				$("#msg_text").html("Ajax����");
			}
		});
	});
	/**
	 * ֹͣ�˿ڼ��Ӱ�ť
	 */
	$("#mon_msg_stop").click(function() {
		$("#mon_msg").show();
		$("#mon_msg_stop").hide();
		$.post('/goform/msg_stop', "stop", function(result) {
			alert("�ֶ�ֹͣ����");
			// ��̬�������ҳ��ſ��Խ��������ͣ���¼�
			//alert("�������");
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
		//alert("��ʾ����");
		$("#msg_text").append();
	});
	//�ı���ʾ��Ϣ,������� ��ʾ��ʾ��Ϣ
	$(function() {
		$(document).tooltip();
	});
	//������ť
	$(function() {
		$(".reboot").button({
			icons : {
				primary : "ui-icon-power"
			},
			text : true
		});
	});
	///������־��ť
	$(function() {
		$("#load_log").button({
			icons : {
				primary : "ui-icon-arrowstop-1-s"
			},
			text : true
		});
	});
	///������־��ť
	$(function() {
		$("#save_log").button({
			icons : {
				primary : "ui-icon-arrowstop-1-n"
			},
			text : true
		});
	});
	///���ؼ��Ӷ˿ڰ�ť
	$(function() {
		$("#load_monport").button({
			icons : {
				primary : "ui-icon-arrowstop-1-s"
			},
			text : true
		});
	});
	///������Ӷ˿ڲ�����ť
	$(function() {
		$("#save_monport").button({
			icons : {
				primary : "ui-icon-arrowstop-1-n"
			},
			text : true
		});
	});
	///���ļ��Ӱ�ť-��ʼ
	$(function() {
		$("#mon_msg").button({
			icons : {
				primary : "ui-icon-play"
			},
			text : true
		});
	});
	///���ļ��Ӱ�ť-ֹͣ
	$(function() {
		$("#mon_msg_stop").button({
			icons : {
				primary : "ui-icon-pause"
			},
			text : true
		});
	});
	///��ť,��ѯ��ʷ����
	$(function() {
		$("#btnPost").button({
			icons : {
				primary : "ui-icon-search"
			},
			text : true
		});
	});
	//��ǩҳ ��ǩid tabs
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
