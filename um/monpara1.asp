<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html>
	<HEAD>
		<title>Arm Home</title><!- Copyright (c) Echon., 2006. All Rights Reserved. ->
		<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"></link>
		<link rel="stylesheet" href="/style/sys.css" type="text/css"></link>
		<link rel="stylesheet" href="/style/table.css" type="text/css"></link>
		<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"></link>
		<script src="/style/wwyfunc.js"  type='text/javascript' > </script>
		<% init_sysparam(); //��ʼ��ϵͳ����,��������Ƹ���,���ڸ���,���ڷ��������Ȳ��� %>
	</HEAD>
	<body> 
		<br/>
	<h1  align="center"><img src="/graphics/logo52.png" height="45"></h1>
		<form action="/goform/monparas"  method=post  ID="paraform" name="paraform">
			<table class="monparamTable"  border="1" cellspacing="1" cellpadding="1" >
				<tr>  
					<th width="5%" class="monparamTableHead">���</th>
					<th width="6%" class="monparamTableHead">ʹ�ö˿�</th>
					<th width="4%" class="monparamTableHead">����˿�</th>
					<th width="6%" class="monparamTableHead">���ڷ���</th>
					<th width="6%" class="monparamTableHead">ʹ�ù�Լ</th>
					<th width="5%" class="monparamTableHead">�ն˵�ַ</th>
					<th width="6%" class="monparamTableHead">��ʱ��Ч</th>
					<th width="6%" class="monparamTableHead">ת����Ч</th>
					<th width="5%" class="monparamTableHead">ת����Ŀ</th>
					<th width="5%" class="monparamTableHead">���1</th>
					<th width="6%" class="monparamTableHead">���2</th> 
					<th width="5%" class="monparamTableHead">���3</th>
					<th width="5%" class="monparamTableHead">���4</th>
					<th width="5%" class="monparamTableHead">���5</th>
					<th width="5%" class="monparamTableHead">���6</th>
					<th width="4%" class="monparamTableHead">���7</th> 
					<th width="5%" class="monparamTableHead">���8</th>
					<th width="5%" class="monparamTableHead">���9</th>
				</tr>
				<% load_monparams(); %>
				<!--
				<tr>
					<td class=sysTDNcLItemStyle ><input class=ntx type=text size=2 name=no0 value="0" ></td>
					<td class=sysTDNcLItemStyle><SELECT name=type0 >
							<OPTION selected value=0>ETH1</OPTION>
							<OPTION  value=1>ETH2</OPTION>
							<OPTION  value=2>ETH3</OPTION>
							<OPTION  value=2>ETH4</OPTION>
							<OPTION  value=2>COM1</OPTION>
							<OPTION  value=2>COM2</OPTION>
						</SELECT>
					</td>
					<td class=sysTDNcLItemStyle ><input class=ntx type=text size=5 name=v_iedNo0 id=v_iedNo0 value=0></td>
					<td class=sysTDNcLItemStyle><SELECT name=type0 >
							<OPTION selected value=0>����0</OPTION>
							<OPTION  value=1>����1</OPTION>
							<OPTION  value=2>����2</OPTION>
							<OPTION  value=2>����3</OPTION>
							<OPTION  value=2>����4</OPTION>
							<OPTION  value=2>����5</OPTION>
						</SELECT>
					</td>
					<td class=sysTDNcLItemStyle><SELECT name=type0 >
							<OPTION selected value=0>sx102</OPTION>
							<OPTION  value=1>gx102</OPTION>
						</SELECT>
					</td> 
					<td class=sysTDNcLItemStyle><input class=ntx type=text size=5 name=no0 value="000001" ></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=checkbox  size=12 name=name0 >��Ч</td>
					<td class=sysTDNcLItemStyle><input class=ntx type=checkbox size=5 name=maxAiNum0 >��Ч</td>				 	      
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=maxDiNum0 size=2 value="4"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=maxEiNum0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=syncTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
					<td class=sysTDNcLItemStyle><input class=ntx type=text name=deadTime0 size=2 value="2"></td>
				</tr>
				-->
			</table>
			<p ALIGN="center" height=25> 
			<input type=button name="Update" value="����" ID="Update" OnClick="db_update();">
			<!--
			<input type=button name=bDelItem value="ɾ��" ID="bDelItem"  onclick="return DelSubmit();">
			<input type=button  name=bAddItem value="���" ID="bAddItem" OnClick="return Redirect('AddRoutePara.asp');" >
			-->
			<input type=button  name=Refresh value="��ȡ" ID="Refresh" OnClick="return RefreshWin();" > 
			<!- ���ص��ı���:�����ύ�������� ����,��������->
			<input class=hideinp  type=text name=OpType value=""  id="optype" > 
			</p>
		</form>
	</body>
</html>
