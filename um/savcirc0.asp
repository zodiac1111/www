<html>
<head>
<title>Arm Home</title>
<!--  Copyright (c) Echon., 2006. All Rights Reserved. -->
<meta http-equiv="Pragma" content="no-cache" charset=gb2312>
<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"></link>
<link rel="stylesheet" href="/style/sys.css" type="text/css"></link>
<link href="/style/menuExpandable3.css" rel="stylesheet" type="text/css"></link>
<script src="/style/wwyfunc.js" language='javascript' type='text/JavaScript'>
	
</script>
</head>
<body>
  <br />
  <h1 align="center">
    <img src="/graphics/logo72.png" height="45">
  </h1>
  <form action="/goform/savecycle" method=post ID="paraform" name="paraform">
    <table ID="Table1" class="sioplanTable" border="1" cellspacing="1" cellpadding="1">
      <thead>
        <tr>
          <th>�洢����</th>
          <th>�ܵ���</th>
          <th>��ʱ����</th>
          <th>�����޹�����</th>
          <th>�������</th>
          <th>ʵʱң����</th>
          <th>ʧѹ����</th>
        </tr>
      <thead>
      <tbody><% savecycle(); %>
      </tbody>
    </table>
    <p align="center">
      <input type=button name="Update" value="����" ID="Update" OnClick="db_update();">
      <input type=button name=Refresh value="��ȡ" ID="Refresh" OnClick="return RefreshWin();">
      <!-- �ύ�������� ����,��������-->
      <input class=hideinp type=text name=optype value="" id="optype">
    </p>
  </form>
</body>
</html>
