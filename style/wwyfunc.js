var MTR_ADD = 1;// ��ɾ���?...
var MTR_DEL = 2;
var MTR_SEARCH = 3;
var MTR_UPDATE = 4;
// var errobj=null;//��ǰ�д����������
function verifyInput(input) {
	if (input.nullable == "no") {
		if (isnull(input.value)) {
			alert(input.namefs + "����Ϊ��");
			input.focus();
			return false;
		}
	}
	if (input.nullable == "yes") {verify_rtu_addr
		if (isnull(input.value)) {
			if (input.datatype == "number") {
				input.value = '0';
				return true;
			}
		}
	}
	if (input.nullable == "yesnoz") {
		if (isnull(input.value)) {
			if (input.datatype == "number") {
				input.value = '';
				return true;
			}
		}
	}
	switch (input.datatype) {
	case "number": {
		if (!isnumber(input.value)) {
			alert(input.namefs + "����Ϊ����!");
			input.value = '';
			input.focus();
			return false;
		}
	}
		break;
	case "string":
		break;
	default:
		break;
	}
	if (input.value.length > input.maxsize) {
		alert(input.namefs + "���볤��̫��!");
		input.focus();
		return false;
	}
	return true;
}

/*--
 * type--0:����һ��  1:ɾ��һ��  2:����  3:��ҳ 4:ɾ��ѡ�е� 5:���� 6:������rtu��
 * noOfRow--��type==3, 5 ,6 ʱ, ��ʵ������
 */
function fdex(type, noOfRow) {
	document.paraform.optype.value = type;
	// alert(document.paraform.optype.value);
	if (3 != type && 5 != type && 6 != type) {
		document.paraform.indexno.value = noOfRow; // ���к�
	}
	return true;
}

// ˢ��ҳ��
function RefreshWin() {
	// alert('refresh');
	window.location = window.location;
	return true;
}
// ��õ�ַ��Ŀ�������ֵ
function Request(strName) {
	var strHref = window.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);

	var arrTmp = strRight.split("&");
	for ( var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");

		if (arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}

/* ����ַ����Ƿ�Ϊ�� */
function isnull(str) {
	var i;
	for (i = 0; i < str.length; i++) {
		if (str.charAt(i) != ' ')
			return false;
	}
	return true;
}

/* ����ַ����Ƿ�ȫΪ����--��ͷ������'-' */
function isnumber(str) {
	var number_chars = "1234567890";
	var i;
	if (number_chars.indexOf(str.charAt(0)) == -1 && str.charAt(0) != '-') {
		return false;
	}
	if (str.length == 1 && str.charAt(0) == '-') {
		return false;
	}
	for (i = 1; i < str.length; i++) {
		if (number_chars.indexOf(str.charAt(i)) == -1)
			return false;
	}
	return true;
}
// ��ǰҳ���ҳ -1:ǰ
function GoForNPage(ward) {
	var curpagevalue = document.paraform.pageselect.value;
	var PageCount = 1;
	if (ward == -1) {
		document.paraform.pageselect.value = curpagevalue
				- (curpagevalue == 0 ? 0 : 1);
		// �� ��server�˴�ҳ��Ŀؼ�дҳ��(0,1...)
		document.paraform.pageindex.value = document.paraform.pageselect.value;
		// alert("to pageIndex"+document.paraform.pageselect.value);
	} else if (ward == 1) {
		PageCount = document.paraform.pageselect.count;
		if (PageCount - 1 > (document.paraform.pageselect.value)) {
			document.paraform.pageselect.value++;
		}
		// �� ��server�˴�ҳ��Ŀؼ�дҳ��(0,1...)
		document.paraform.pageindex.value = document.paraform.pageselect.value;
		// alert("to pageIndex"+document.paraform.pageselect.value);
	}
	if (null != document.paraform.pageindex.value
			&& document.paraform.pageindex.value != "") {
		fdex(3, -1); // ׼���ύ��ҳ����
		document.paraform.submit();
	}

}

function DelSubmit() {
	fdex(4, -1);
	document.paraform.submit();
}

function Redirect(page) {
	window.location = page;
}

function PageChange() {
	document.paraform.pageindex.value = document.paraform.pageselect.value;
	fdex(3, -1);
	document.paraform.submit();
}

// yc, yx,kwh��ҳ RTU�����򴥷�����
function RtuChange() {
	document.paraform.rtuNo.value = document.paraform.RtuSelect.value;
	fdex(6, -1); // ���������
	document.paraform.submit();
}

/*******************************************************************************
 * ����textѡ��������ĵ�ǰֵ
 */
// �ָ�select�����б�ǰѡ�е�ֵ
function LoadSelectByText(obj, text) {
	for ( var i = 0; i < obj.options.length; i++) {
		if (obj.options[i].text == text) {
			obj.selectedIndex = i;
			break;
		}
	}
}
/*******************************************************************************
 * ����valueѡ��������ĵ�ǰֵ
 */
// �ָ�select�����б�ǰѡ�е�ֵ
function LoadSelectByValue(obj, value) {
	for ( var i = 0; i < obj.options.length; i++) {
		if (obj.options[i].value == value) {
			obj.selectedIndex = i;
			break;
		}
	}
}
// ���������кŵõ����� (����id="namerow")
function GetObj(name, row) {
	var obj = document.getElementById(name + row);
	return obj;
}
// �ύ�ǳ�
function logout() {
	alert('���Ѿ���ʱ,�����µ�¼!');
	parent.frames[1].document.forms[0].submit();
}

// �ж��Ƿ�ѡ���˴�������,��ѡ�о��ύ,���򷵻�.11y27
function UpdateTheSelect() {
	var selobj;
	var num = 0;
	for ( var i = 0; i < 17; i++) {
		selobj = GetObj('selCheck', i);
		if (selobj && selobj.checked == true) {
			// alert('selCheck'+i+'checked');
			num++;
		}
	}
	if (num > 0) {
		fdex(2, -1);
		document.paraform.submit();
	} else {
		alert("�����ѡ��Ҫ���µ���!");
		return false;
	}
}

// ȫѡ��ȫȡ������11y28
function AllSelOrFree() {
	var i = 0;
	var aflag = document.getElementById('AllSelFlag');
	if (aflag && aflag.value == 1) {// �Ѿ�ȫѡ,��ȫȡ������
		aflag.value = 0; // �ñ�
		while ((checkObj = GetObj("selCheck", i++)) != null) {
			checkObj.checked = false;
		}

	} else {
		aflag.value = 1; // �ñ�
		while ((checkObj = GetObj("selCheck", i++)) != null) {
			checkObj.checked = true;
		}
	}
}
// ���ݿ����
function db_add()// ��
{
	document.paraform.optype.value = MTR_ADD;
	document.paraform.submit();
}
function db_del()// ɾ
{
	document.paraform.optype.value = MTR_DEL;
	document.paraform.submit();
}
function db_update()// ��
{
	var errobj = document.getElementById("errobj");
	if (errobj != null) {
		alert("�Ƿ�����");
		return;
	}
	document.paraform.optype.value = MTR_UPDATE;
	document.paraform.submit();
}
/**
 * ���� ��Ʋ���ȫ����Ч��ʶ
 */
function iv_all_click(e) {
	// e�����¼�Դ����,src��arguments[0]��Firefox�ķ���,window.event��IE�ķ��� \
	// chrome or ff no ie
	var curobj = e.srcElement || e.target;
	// var curobj=e.target;
	// chrome
	// var curobj=window.event.target
	var chklist = document.getElementsByName("iv_check");
	var chktxt = document.getElementsByName("iv");
	var i = 0;
	var n = chklist.length;
	for (i = 0; i < n; i++) {
		chklist[i].checked = curobj.checked;
		chktxt[i].value = (curobj.checked) ? 1 : 0;
	}
}
// ���ĳһ�����������Ч��ʶ,��ѡ����ı�������,�ı�������post.
// chkbox����txt�ؼ�ֵ0��1,txt��chkbox���ֵ�Ԫ��,
// parent--chk_box (��Ԫ��1)
// `-input(txt) (��Ԫ��2)
function chk_change(e) {
	// ��ȡ������Ķ���,�кܶ��nameΪivchk��chkbox,��������
	// var curobj=this.event.target;
	var curobj = e.srcElement || e.target;
	if (curobj.checked) {
		// alert("1");
		// ivchk.checked=false;
		curobj.parentElement.children[1].value = 1;
	} else {
		// alert("2");
		curobj.parentElement.children[1].value = 0;
		// ivchk.checked=true;
	}
}
// �������,���༸������
function type_all_changed(e) {
	var curobj = e.srcElement || e.target;
	var typelist = document.getElementsByName("ph_wire");
	var i = 0;
	var n = typelist.length;
	for (i = 0; i < n; i++) {
		typelist[i].value = curobj.value;
	}
}
// ���ڷ���,���б������.
function changeall_sioplan(e) {
	var curobj = e.srcElement || e.target;
	var typelist = document.getElementsByName("portplan");
	var i = 0;
	var n = typelist.length;
	for (i = 0; i < n; i++) {
		typelist[i].value = curobj.value;
	}
}
// ͳһ�������е���"��Ƴ���"����.
function setall_factory(e) {
	var curobj = e.srcElement || e.target;
	var typelist = document.getElementsByName("factory");
	var i = 0;
	var n = typelist.length;
	for (i = 0; i < n; i++) {
		typelist[i].value = curobj.value;
	}
}
// ��ƹ�Լȫѡ����
function changeall_mtr_protocol(e) {
	var curobj = e.srcElement || e.target;
	var typelist = document.getElementsByName("protocol");
	var i = 0;
	var n = typelist.length;
	for (i = 0; i < n; i++) {
		typelist[i].value = curobj.value;
	}
}
// ���е���С�� ����
function all_it_dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var it_dotlist = document.getElementsByName("it_dot");
	var rNums = /^[0-9]{1}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = it_dotlist.length;
	for (i = 0; i < n; i++) {
		it_dotlist[i].value = curobj.value;
		// it_dotlist[i].onchange(e);
	}
}
// ʹ��������С����������
function all_xl_dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("xl_dot");
	var rNums = /^[0-9]{1}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
// ʹ���е�ѹС����������
function all_v_dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("v_dot");
	var rNums = /^[0-9]{1}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
// �������е���С��λ
function all_i_dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("i_dot");
	var rNums = /^[0-9]{1}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
function all_p_dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("p_dot");
	var rNums = /^[0-9]{1}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
function all_q_dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("q_dot");
	var rNums = /^[0-9]{1}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
function all_ue_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("ue");
	var rNums = /^[0-9]*$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
function all_ie_changed(e) {
	var curobj = e.srcElement || e.target;
	var xl_dotlist = document.getElementsByName("ie");
	var rNums = /^[0-9]*$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
		return;
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
	var i = 0;
	var n = xl_dotlist.length;
	for (i = 0; i < n; i++) {
		xl_dotlist[i].value = curobj.value;
	}
}
// ��·����
function line_changed(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,6}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ��ַ
function addr_changed(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,12}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ����
function pwd_changed(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,12}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ������������С��λ���ĸı�,���.С��λ��һ����һ������.
function dot_changed(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ��ѹ
function ue_changed(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ����
function ie_changed(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	if (!rNums.test(curobj.value)) {// ��ֵ����:
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ��ֵС��256 0~255,�����Ǳ�ʶ���/���ڵȵ�����,����0Ҳ�ǲ����߼���.
function lessthan1byte(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,3}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	// ��ֵ����: 0Ҳ�ǲ����߼���
	if (!rNums.test(curobj.value) || curobj.value <= 0 || curobj.value >= 256) {
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ��֤�ն˵�ַ [0,255]
function verify_rtu_addr(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,4}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	// ��ֵ����:
	if (!rNums.test(curobj.value) || curobj.value < 0) {
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ��֤���Ӳ����� ת����Ŀ
function verify_forward_mtr_num(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,3}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	// ��ֵ����:
	if (!rNums.test(curobj.value) || curobj.value < 0 || curobj.value > 255) {
		curobj.style.backgroundColor = "red";
		curobj.id = "errobj";
	} else {// ��ȷ��ָ�
		curobj.style.backgroundColor = "";
		curobj.id = "";
	}
}
// ��֤����˿��Ƿ�Ϸ� [0,65535] ֮��
function verify_port(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^[0-9]{1,5}$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	// ��ֵ����:
	if (!rNums.test(curobj.value) || curobj.value < 0 || curobj.value > 65535) {
		curobj.id = "errobj";
		curobj.style.backgroundColor = "red";
	} else {// ��ȷ��ָ�
		curobj.id = "";
		curobj.style.backgroundColor = "";
	}
}
// �ж��ǲ���IP
function isIPv4(e) {
	var curobj = e.srcElement || e.target;
	var rNums = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	curobj.style.color = "green";// ��ֵ�ı���,�������ɫ
	// ��ֵ����: 0Ҳ�ǲ����߼���
	if (!rNums.test(curobj.value) || curobj.value <= 0 || curobj.value >= 256) {
		curobj.id = "errobj";
		curobj.style.backgroundColor = "red";
	} else {// ��ȷ��ָ�
		curobj.id = "";
		curobj.style.backgroundColor = "";
	}
}
// ����web������
function reset_web() {
	document.paraform.optype.value = 1;
	document.paraform.submit();
}
// ���³�ʼ����Լ�ļ�,�޸Ĺ�Լ�ļ�����Ե��
function reset_procotol() {
	document.paraform.optype.value = 2;
	document.paraform.submit();
}
// �����ɼ�����
function reset_sample() {
	document.paraform.optype.value = 3;
	document.paraform.submit();
}
// �����ն�
function reset_rtu() {
	document.paraform.optype.value = 4;
	document.paraform.submit();
}
// �����������,���ڲ��Է����
function reset_test() {
	document.paraform.optype.value = 10;
	document.paraform.submit();
}
