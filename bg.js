/*
	Web Hi Desktop Notification

	Todo: 修改桌面消息窗口，支持HTML。
*/
//桌面通知
function notify(icon, username, message) {	
		var notification = webkitNotifications.createNotification(
				icon,
				username,
				message
		);
		notification.show();
		setTimeout(function() {
			notification.close();
		}, 5000);
}
//是否打开桌面消息推送功能，在页面顶部增加开启按钮
function checkNotification() {
	var button = document.createElement("button");
	button.title = "check";
	button.innerHTML = "打开桌面通知功能";
	button.style.position = "fixed";
	button.style.left = "50%";
	button.style.top = "0";
	button.style.display = "block";
	button.style.width = "150px";
	button.style.zIndex = "1000";

	button.addEventListener('click', function(event) {
		if(window.webkitNotifications.checkPermission() == 0) {
			alert("通知可用");
		}
		else {
			window.webkitNotifications.requestPermission();
		}
		return false;
	}, false);
	var headArea = document.getElementById('headArea');
	headArea.getElementsByClassName('topLeftArea')[0].appendChild(button);
}
//聊天信息监听
function notice() {
	var insertedNodes = [], pos=0, len;
	document.addEventListener("DOMNodeInserted", function(e) {
		if(e.target.className == 'messageBlock') {
			insertedNodes.push(e.target);
			console.log(1);
		}
	}, false);
	function show() {
		clearTimeout(time);
		len=insertedNodes.length;
		if(len > pos) {
			for(var i = pos; i < len; i++) {
				var ele = insertedNodes[i];
				var title = ele.getElementsByClassName('messageTitle')[0].innerHTML;
				var content = ele.getElementsByClassName('messageText')[0].innerHTML;
				notify("http://im.baidu.com/html/promo/images/itieba.jpg", title, content);			
			}
			pos = len;
		}
		time = setInterval(show, 1000);
	}
	var time = setInterval(show, 1000);
}

function init() {
	checkNotification();
	notice();
}
init();
