/*! jQuery UI - v1.8.20 - 2012-04-30
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.datepicker-zh-CN.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery(function(a) {
	a.datepicker.regional["zh-CN"] = {
		closeText : "�ر�",
		prevText : "&#x3c;����",
		nextText : "����&#x3e;",
		currentText : "����",
		monthNames : [ "һ��", "����", "����", "����", "����", "����", "����", "����", "����",
				"ʮ��", "ʮһ��", "ʮ����" ],
		monthNamesShort : [ "һ", "��", "��", "��", "��", "��", "��", "��", "��", "ʮ",
				"ʮһ", "ʮ��" ],
		dayNames : [ "������", "����һ", "���ڶ�", "������", "������", "������", "������" ],
		dayNamesShort : [ "����", "��һ", "�ܶ�", "����", "����", "����", "����" ],
		dayNamesMin : [ "��", "һ", "��", "��", "��", "��", "��" ],
		weekHeader : "��",
		dateFormat : "yy-mm-dd",
		firstDay : 0,
		isRTL : !1,
		showMonthAfterYear : !0,
		yearSuffix : "��"
	}, a.datepicker.setDefaults(a.datepicker.regional["zh-CN"])
});
