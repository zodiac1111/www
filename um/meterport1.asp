<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html>
<HEAD>
<title>Arm Home</title><!- Copyright (c) Echon., 2006. All Rights Reserved. ->
<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"></link>
<link rel="stylesheet" href="/style/sys.css" type="text/css"></link>
<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"></link>
<script src="/style/wwyfunc.js" language='javascript' type='text/JavaScript' > </script>
</HEAD>
<body> 
	<form action="/goform/SetRoute"  method=post  ID="paraform" name="paraform">
		<table width="60%" align=center ID="Table1" border="0" cellspacing="0" cellpadding="1" bgcolor=#ffffff >
			<tr>
				<td>&nbsp</td>
			</tr>
			<tr>
				<td>&nbsp</td>
			</tr>
			<tr>
        <td class="lb-top-head"  valign=top  align=center height="100%">
					<table width="50%" border="0" cellspacing="1" cellpadding="2" class="sysBgTable" ID="Table2">
						<tr>
							<td class="sysTDHeadCLStyle">
								<table width="100%" border="0" cellspacing="1" cellpadding="2" ID="Table3">
									<tr>
										<td  align="center"><p class=cx>���ƶ˿ڲ���</p></td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
      <tr>
	      <td class="lb-top-head"  valign=top  align=center >
		      <table width="60%" border="0" cellspacing="1" cellpadding="2" class="sysBgTable" ID="Table1">
			     <tr>
				     <td class="sysTDHeadCLStyle">
					     <table width="100%" border="0" cellspacing="0" cellpadding="2" ID="Table2">
						     <tr>
							     <td>
								   <a>�˿���Ŀ</a>
								   <input type=text size=6  id="Text1" name="hao"  maxsize="5" datatype="number" namefs="������Ŀ" nullable="yesnoz"  value="">
								   <a class=acs onclick="return  Search();">��ȡ</a>
							     </td>
						     </tr>
					     </table>
				     </td>
			     </tr>
		      </table>
	      </td>
      </tr>
      <tr >
	     <td class="lb-body" valign=top  align=center>
		    <table border="0" width="99%" " style="margin-top:5" ID="Table3">
			   <tr>
				  <td class="lb-bkg" valign="top">
				   <table width="70%" cellspacing="1" cellpadding="2"  border="0" class="sysBgTable" ID="Table4">
						<tr>
							<td  colspan="19"  align=center class="sysTDHeadCCStyle">�����б�</td>
						</tr>
						<tr>  
							<td width="5%" class="sysTDCLItemStyle">���ڷ���</td>
							<td width="6%" class="sysTDCLItemStyle">У��λ</td>
							<td width="4%" class="sysTDCLItemStyle">����λ</td>
							<td width="6%" class="sysTDCLItemStyle">ֹͣλ</td>
							<td width="6%" class="sysTDCLItemStyle">����λ</td>
							<td width="5%" class="sysTDCLItemStyle">ͨѶ��ʽ</td>
						</tr>
					  <tr>
						  <td class=sysTDNcLItemStyle ><input  class=ntx type=text size=2 name=no0 value="0" ></td>
						  <td class=sysTDNcLItemStyle><SELECT name=type0 >
							  <OPTION selected value=0>��У��</OPTION>
							  <OPTION selected value=1>żУ��</OPTION>
							  <OPTION  value=2>��У��</OPTION>
							  </SELECT>
							</td>
							<td class=sysTDNcLItemStyle ><input class=ntx type=text size=5 name=v_iedNo0 id=v_iedNo0 value=0></td>
							<td class=sysTDNcLItemStyle ><input class=ntx type=text size=5 name=v_iedNo0 id=v_iedNo0 value=0></td>
							<td class=sysTDNcLItemStyle><SELECT name=type0 >
							 	 <OPTION  value=0>300</OPTION>
							 	 <OPTION  value=1>600</OPTION>
							 	 <OPTION  selected value=3>1200</OPTION>
							 	 <OPTION  value=4>4800</OPTION>
							 	 <OPTION  value=5>9600</OPTION>
							 	 <OPTION  value=6>19200</OPTION>
							 	 </SELECT>
							</td>
							<td class=sysTDNcLItemStyle><SELECT name=type0 >
							 	  <OPTION selected value=0>�첽</OPTION>
							 	  <OPTION  value=1>ͬ��</OPTION>
							 	  </SELECT>
							</td> 
						</tr> 	 
					 </table>
				  </td>
			   </tr>
		    </table>
	     </td>
      </tr>
	    <tr valign=top>
		   <td>
		   </td>
	    </tr>
 	    <tr>
		    <td ALIGN="center" height=25> 
			  <input type=button name="Update" value="����" ID="Update" OnClick="UpdateTheSelect();">
			  <input type=button name=bDelItem value="ɾ��" ID="bDelItem"  onclick="return DelSubmit();">
			  <input type=button  name=bAddItem value="���" ID="bAddItem" OnClick="return Redirect('AddRoutePara.asp');" >
			  <input type=button  name=Refresh value="ˢ��" ID="Refresh" OnClick="return RefreshWin();" > 
		    </td>
	    </tr> 		
		</table>
  </form>
</body>
</html>
