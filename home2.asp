<html>
	<head>
		<title>时间显示</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" href="/style/normal_ws.css" type="text/css"/>
		<link rel="stylesheet" href="/style/sys.css" type="text/css"/>
		<!-- jquery -开始-->
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui.css" />
		<link rel="stylesheet" media="all" type="text/css" href="/style/jquery-ui-timepicker-addon.css" />
		<script type="text/javascript" src="/style/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/style/jquery-ui.min-zh-CN.js"></script>
		<!-- jquery的 -结束 -->
		<style type="text/css">
			.time {
				color: #00FFFF;
				font-size:160%;
			}
			body {
				background-color: gray;
			}
		</style>
	</head>
	<body>
		<script type="text/javascript">
			var srvTimestarmp;
			function Year_Month() {
				var now = new Date();
				var yy = now.getFullYear();
				var mm = now.getMonth();
				var mmm = new Array();
				mmm[0] = "1月";
				mmm[1] = "2月";
				mmm[2] = "3月";
				mmm[3] = "4月";
				mmm[4] = "5月";
				mmm[5] = "6月";
				mmm[6] = "7月";
				mmm[7] = "8月";
				mmm[8] = "9月";
				mmm[9] = "10月";
				mmm[10] = "11月";
				mmm[11] = "12月";
				mm = mmm[mm];
				return (mm );
			}

			function thisYear() {
				var now = new Date();
				var yy = now.getFullYear();
				return (yy);
			}

			function Date_of_Today() {
				var now = new Date();
				return (now.getDate() );
			}

			function Date_of_week() {
				var now = new Date();
				var w;
				if (now.getDay() == 0)
					w = "星期日";
				if (now.getDay() == 1)
					w = "星期一";
				if (now.getDay() == 2)
					w = "星期二";
				if (now.getDay() == 3)
					w = "星期三";
				if (now.getDay() == 4)
					w = "星期四";
				if (now.getDay() == 5)
					w = "星期五";
				if (now.getDay() == 6)
					w = "星期六";
				return (w);
			}

			/**
			 *本地时间
			 */
			function CurentTime() {
				var now = new Date();
				var hh = now.getHours();
				var mm = now.getMinutes();
				var ss = now.getTime() % 60000;
				ss = (ss - (ss % 1000)) / 1000;
				var clock = hh + ':';
				if (mm < 10)
					clock += '0';
				clock += mm + ':';
				if (ss < 10)
					clock += '0';
				clock += ss;
				return (clock);
			}

			function CurenDate() {
				var now = new Date();
				var year = thisYear();
				var month = Year_Month();
				var Today = Date_of_Today();
				var week = Date_of_week();
				var day = year + '年' + month + Today + '日  ' + week;
				return (day);
			}

			/**
			 *服务器时间
			 */
			function srvDate(val) {
				var now = new Date(val);
				var year = thisYear();
				var month = Year_Month();
				var Today = Date_of_Today();
				var week = Date_of_week();
				var day = year + '年' + month + Today + '日  ' + week;
				return (day);
			}

			function srvTime(val) {
				var now = new Date(val);
				var hh = now.getHours();
				var mm = now.getMinutes();
				var ss = now.getTime() % 60000;
				ss = (ss - (ss % 1000)) / 1000;
				var clock = hh + ':';
				if (mm < 10)
					clock += '0';
				clock += mm + ':';
				if (ss < 10)
					clock += '0';
				clock += ss;
				return (clock);
			}

			function refreshCalendarClock() {
				//document.all.calendarClock1.innerHTML = CurenDate();
				//document.all.calendarClock2.innerHTML = CurentTime();
				$("#calendarClock1").html(CurenDate());
				$("#calendarClock2").html(CurentTime());
				$("#srvDate").html(srvDate(srvTime));
				$("#srvTime").html(CurentTime(srvTime));
				srvTimestarmp += 1000;
				//以后的服务器时间时在首次的基础上累加,不涉及服务端通讯
			};
			//仅开始刷新完成后读取一次服务器时间.
			$(document).ready(function() {
				/* 隐藏的按钮用于初始化,应为post的form只能使用按钮触发*/
				$("#init").click(function() {
					$.post('/goform/srv_time', "init=init", function(result) {
						//$("#tbody_dat").html(result);
						srvTimestarmp = result
						//alert(result);
					});
				});
				/* 首次加载,获取一次服务器时间戳 */
				$("#init").click();
				//同步/过去服务器时间=点一下获取
				function syn_server_time() {
					$("#init").click();
				};
				//
				setInterval(refreshCalendarClock, 1000);
				//刷新显示.
				setInterval(syn_server_time, 1 * 60 * 1000);
				//每隔一段时间同步一次,消除累计误差.
			});
		</script>
		<span style="float:left"> 
			<label class="time">本地时间:</label> 
			<label id="calendarClock1" class="time" > 获取中...</label> 
			<label id="calendarClock2" class="time" > 获取中...</label>
		</span>
		<span style="float:right"> 
			<label class="time">终端时间:</label>
			<label id="srvDate" class="time"> 获取中...</label> 	
			<label id="srvTime" class="time"> 获取中...</label> 	
		</span>

		<button  class="hideinp" id="init">获取服务器时间</button>
	</body>
</html>
