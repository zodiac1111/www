<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html>
<HEAD>
<title>Arm Home</title>
<!- Copyright (c) Echon., 2006. All Rights Reserved. ->
<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"></link>
<link rel="stylesheet" href="/style/sys.css" type="text/css"></link>
<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"></link>
<!-- ����jquery������ʱ��ؼ�����Ҫ���ļ� -��ʼ -->
<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
<script type="text/javascript" src="/style/jquery-ui.min-zh-CN-GB2312.js"></script>
<!-- ����jquery������ʱ��ؼ�����Ҫ���ļ� -���� -->
<script src="/style/wwyfunc.js" language='javascript' type='text/JavaScript'></script>
<script type="text/javascript">
	$(document).ready(
		function() {
			$("#load").click(function(){
				alert("click");
			});
		});

	
</script>
<% init_sysparam(); //����ϵͳ���� %>
</HEAD>
<body>
  <h1 align=justify></h1>
  <form action="/goform/sysparam" method=post ID="Form1" name="paraform">
    <table width="60%" align=center ID="Table1" border="0" cellspacing="0" cellpadding="1" bgcolor=#ffffff>
      <tr>
        <td class="lb-top-head" valign=top align=center height="100%">
          <table width="50%" border="0" cellspacing="1" cellpadding="1" class="sysBgTable" ID="Table2">
            <tr>
              <td class="sysTDHeadCLStyle">
                <table width="100%" border="0" cellspacing="1" cellpadding="1" ID="Table3">
                  <tr>
                    <td align="center">
                      <img src="/graphics/logo22.png" height="45">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="lb-body" valign=top align=center height="100%">
          <table border="0" width="98%" align=center style="margin-top: 5">
            <tr>
              <td class="lb-bkg" valign="top">
                <table width="90%" height=220 align="center" border="0" cellspacing="0" cellpadding="2" ID="Table3">
                  <tr align="center">
                    <td align="center">�������Ŀ:</td>
                    <td align="left">
                      <input id=mtr_num type=text name=meter_num size=12 value="<% meter_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
                    </td>
                    <td align="center">���ڷ�����:</td>
                    <td align="left">
                      <input type=text name=sioplan_num size=12 value="<% sioplan_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
                    </td>
                  </tr>
                  <tr align="left">
                    <td align="center">���Ӳ���:</td>
                    <td align="left">
                      <input type=text name=monitor_ports size=12 value="<% monitor_ports(); %>" maxlength=3 onchange="lessthan1byte(event);">
                    </td>
                    <td align="center">������Ŀ:</td>
                    <td align="left">
                      <input id=netport type=text name=netports_num size=12 value="<% netports_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
                    </td>
                  </tr>
                  <tr align="left">
                    <td align="center">��������Ŀ:</td>
                    <td align="left">
                      <input type=text name=sioports_num size=12 value="<% sioports_num(); %>" maxlength=3 onchange="lessthan1byte(event);">
                    </td>
                    <td align="center">���ƶ˿���:</td>
                    <td align="left">
                      <input type=text name=control_ports size=12 value="<% control_ports(); %>" maxlength=3 onchange="lessthan1byte(event);">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p ALIGN="CENTER">
      <input type=button name="Update" value="����" ID="Update" OnClick="db_update();">
      <input type=button name=ok value="��ȡ" OnClick="return RefreshWin();">
      <!- ���ص������,�����ύform�������� ->
      <input class=hideinp type=text name=OpType value="" id="optype">
    </p>
  </form>
   <input id=load type=button name=ok value="�ֲ���ȡ">
</body>
</html>
