<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- ��������-��Ʋ���ҳ�� -->
<html>
	<HEAD>
		<title>��Ʋ���</title>
		<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css" />
		<link rel="stylesheet" href="/style/sys.css" type="text/css" />
		<link href="../style/menuExpandable3.css" rel="stylesheet" type="text/css" />
		<script src="../style/wwyfunc.js" type='text/javascript'></script>
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/clone_tableheader.js"></script>
		<script type="text/javascript">
			//ҳ���ʼ�� ���� JS����
			$(document).ready(cloneTableHeader_Width);
			//���� ����� ������ʾ���  �Լ� ����  ���� ��ͷ����  ��JS������
			function cloneTableHeader_Width() {
				//document.body.clientWidth��ÿͻ�����(���������,�������˵�����״̬��,�������ݴ���)�Ŀ�� - 35���صĹ�������ȡ�
				var myTable_Width = (document.body.clientWidth - 35);
				var myTable_Heigh = (document.body.clientHeight - 100);
				//alert(myTable_Width + "*" + myTable_Heigh);//������Ļ���
				if ((document.body.clientWidth - 35) < 855) {
					myTable_Width = 855;
					//���
				}
				//���� ������ͷ�� �� ��JS����
				$(document).ready(function() {
					FixTable("MyTable", 3, myTable_Width, myTable_Heigh);
				});
			}
		</script>
	</HEAD>
	<body>
		<h1 align="center"><img src="/graphics/logo32.png" height="45"></h1>
		<form action="/goform/formTest" method="post" id="paraform" name="paraform">
			<table width="1200" border="1" cellpadding="0" cellspacing="0" id="MyTable" style="border-bottom-color: black; border-top-color: black; width: 1300px; color: #000000; border-right-color: black; font-size: medium; border-left-color: black">
				<thead>
					<tr style="background-color: #eeeeee; margin: 0px; line-height: 20px; font-weight: bold; padding: 0px 0px 0px 0px;">
						<th width="31" class="mtrparamTableHead">���</th>
						<th width="48" class="mtrparamTableHead"> ��Ч <br>
						<input type="checkbox" name=iv_all value=iv_all onclick="iv_all_click(event);">
						</th>
						<th width="48" class="mtrparamTableHead">��·����</th>
						<th width="48" class="mtrparamTableHead">��Ƶ�ַ</th>
						<th width="48" class="mtrparamTableHead">��ƿ���</th>
						<th width="48" class="mtrparamTableHead">ʹ�ö˿�</th>
						<th width="74" class="mtrparamTableHead"> ���ڷ��� <br> <% sioplan(); %> </th>
						<th width="74" class="mtrparamTableHead"> ��ƹ�Լ <br> <% mtr_protocol(); %> </th>
						<th width="74" class="mtrparamTableHead"> �������� <br> <% factory(); %> </th>
						<th width="74" class="mtrparamTableHead"> ������� <br> <% ph_wire2(); %> </th>
						<th width="74" class="mtrparamTableHead"> ����С�� <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_it_dot value="0" onchange="all_it_dot_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> ����С�� <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_xl_dot value="0" onchange="all_xl_dot_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> ��ѹС�� <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_v_dot value="0" onchange="all_v_dot_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> ����С�� <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_i_dot value="0" onchange="all_i_dot_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> �й�С�� <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_p_dot value="0" onchange="all_p_dot_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> �޹�С�� <br>
						<input class="ntx" type="text" size=1 maxlength=1 name=all_q_dot value="0" onchange="all_q_dot_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> ���ѹ <br>
						<input class="ntx" type="text" size=1 name=all_ue value="0" onchange="all_ue_changed(event);">
						</th>
						<th width="74" class="mtrparamTableHead"> ����� <br>
						<input class="ntx" type="text" size=1 name=all_ie value="0" onchange="all_ie_changed(event);">
						</th>
					</tr>
				</thead>
				<tbody>
					<% load_all_mtr_param(); %>
				</tbody>
			</table>
			<p ALIGN="center" id=subbtns>
				<input type="button" name="Update" value="����" ID="Update" OnClick="db_update();">
				<!-- @TODO ���ɾ����ʱע��,�����ƺ��ٿ���
				<input type=button name=bDelItem value="ɾ��" ID="bDelItem" OnClick="db_del();">
				<input type=button name=bAddItem value="���" ID="bAddItem" OnClick="db_add();" >
				-->
				<input type="button" name=Refresh value="ˢ��" ID="Refresh" OnClick="return RefreshWin();">
				<!-- ���ص�����,�����ύ�������� -->
				<input class="hideinp" type="text" name=OpType value="" id="optype">
				<!-- �ύ�������� ����,�������� -->
				<input class="hideinp" type="text" name=RowNo value="" id="indexno">
				<input class="hideinp" type="text" name="AllSelFlag" value="0" id="AllSelFlag">
			</p>
		</form>
	</body>
</html>
