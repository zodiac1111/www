/**
 * @author leepeigang
 */
$(document).ready(function() {
	$.ajaxSetup({
		async:false
	});
	$("#btnSysParam").click(function() {
		//$("#inter_page").html("");
		//$("#inter_page").addClass('load_bgpic_hight');
		// $.get("/um/syspara.html", function(result) {
		// $("#inter_page").removeClass('load_bgpic_hight');
		// $("#inter_page").html(result);
		// });
		$("#inter_page").load("um/syspara.html");
	});
	$("#btnSioParam").click(function() {
		$("#inter_page").html("");
		$("#inter_page").addClass('load_bgpic_hight');
		$.get("um/sioplan.html", function(result) {
			$("#inter_page").removeClass('load_bgpic_hight');
			$("#inter_page").html(result);
		});
	});
	$("#btnNetParam").click(function() {
		$("#inter_page").html("");
		$("#inter_page").addClass('load_bgpic_hight');
		$.get("/um/netpara.html", function(result) {
			$("#inter_page").removeClass('load_bgpic_hight');
			$("#inter_page").html(result);
		});
	});
	$("#btnMonParam").click(function() {
		$("#inter_page").html("");
		$("#inter_page").addClass('load_bgpic_hight');
		$.get("/um/monpara.html", function(result) {
			$("#inter_page").removeClass('load_bgpic_hight');
			$("#inter_page").html(result);
		});
	});
	$("#btnMtrParam").click(function() {
		$("#inter_page").html("");
		$("#inter_page").addClass('load_bgpic_hight');
		$.get("/um/meterpara.html", function(result) {
			$("#inter_page").removeClass('load_bgpic_hight');
			$("#inter_page").html(result);
		});
	});
	$("#btnSaveCycle").click(function() {
		$("#inter_page").html("");
		$("#inter_page").addClass('load_bgpic_hight');
		$.get("/um/saveCycle.html", function(result) {
			$("#inter_page").removeClass('load_bgpic_hight');
			$("#inter_page").html(result);
		});
	});
	$(function() {
		$("#accordion").accordion({
			heightStyle : "content",
			// heightStyle: "fill",
			collapsible : true
		});
	});
	$(function() {
		$(".btn").button({
			icons : {
				primary : "ui-icon-power"
			}
		});
	});
	//起始动作,加载到系统参数页面
	$("#btnSysParam").click();
});
