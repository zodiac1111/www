<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-639-1">
<link href="/style/goahead.css" rel="stylesheet" type="text/css" media="screen" />
<link rel="shortcut icon" href="favicon.ico">

<base target="websframe"/>
<title>���ݻ�������</title>
</head>

<body > 
<img src="/graphics/topbluebar.gif" width="100%" height="20"><br/><br/>
<p class="secondmenu"align="center" ></p>^M
<form action=/goform/formTest method=POST>
<% load_mtr_param(); //���ȼ���Ĭ�ϵı�0�Ĳ���
//����ϵͳ����,���� ��Ƹ���,������,������,
//���ڷ�������,�ȵ�,��Ҫ�����ò����ط�����һЩ����,��һ��40���,
//�Ͳ�Ӧ���ܹ���ȡ���40�ı�Ʋ���.
 %>
<table  width="100%" height="400" border="0" background="/graphics/welcome1.jpg">
<tr  align="center">
	<td align="left">���:</td>
	<td align="left"><select name=mtrno><% read_mtr_no(); %> </select></td>
	<td align="left">��·����:</td>
	<td align="left"><input type=text name=line size=12 value="<% line(); %>"></td>
	<td align="left">��Ƶ�ַ:</td>
	<td align="left"><input type=text name=addr size=12 value="<% mtraddr(); %>"></td>
</tr>

<tr  align="left">
	<td align="left">��ƿ���:</td>
	<td align="left"><input type=text name=pwd size=12 value="<% pwd(); %>"></td>
	<td align="left">����С��:</td>
	<td align="left"><input type=text name=it_dot size=12 value="<% it_dot(); %>"></td>
	<td  align="left">��ѹС��:</td>
	<td  align="left"><input type=text name=v_dot size=12 value="<% v_dot (); %>"></td>
</tr>
  
<tr  align="left">
	<td align="left">�й�����С��:</td>
	<td align="left"><input type=text name=p_dot size=12 value="<% p_dot (); %>"></td> 
	<td align="left">�޹�����С��:</td>
	<td align="left"><input type=text name=q_dot size=12 value="<% q_dot (); %>"></td>
  	<td align="left">����С��:</td>
	<td align="left"><input type=text name=xl_dot size=12 value="<% i_dot (); %>"></td>
</tr>
<tr  align="left">    
	<td align="left">����С��:</td>
	<td align="left"><input type=text name=xl_dot size=12 value="<% xl_dot (); %>"></td>
	<td align="left">���ѹ:</td>
  	<td align="left"><input type=text name=ue size=12 value="<% ue (); %>"></td>
  	<td align="left">�����:</td>
  	<td align="left"><input type=text name=ie size=12 value="<% ie (); %>"></td>
</tr>

<tr  align="left">
	<td align="left">ʹ�ö˿�:</td>
	<td align="left"><select name=port>
	<% port(); %>  
        </select></td>
  <td align="left">���ڷ���:</td>
  <td align="left"><select name=portplan>
	<% portplan(); %> 
        </select> </td>
  <td align="left">��ƹ�Լ:</td>
	<td align="left"><select name=protocol>
 	<% protocol(); %> 
        </select></td>
</tr>

<tr  align="left">
	<td align="left">�������:</td>
	<td align="left"><select name=ph_wire>
	<% ph_wire(); %> 
      	</select></td>
  <td align="left">��������: &nbsp;</td>
	<td align="left"><select name=factory>
	<% factory(); %> 
      	</select></td>
  <td align="left">��Ч��ʶ:</td>
	<td align="left">
	<% iv(); %>
	</td>
  </tr>
  
  <tr align="left">
      <td></td>    
      <td ALIGN="CENTER"> 
        <input type=submit name=save value="���ò���"> 
      </td>
      <td></td>
      <td ALIGN="CENTER">
      <input type=submit name=load value="��ȡ����"> 
    </td>
    <td></td>
    <td ALIGN="CENTER">
    <input type=reset name=reset value="��������">
    </td>
  </tr>
</table>
</form>
<br clear=all>

</body>
</html>
