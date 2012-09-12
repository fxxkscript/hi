/*
	Web Hi Desktop Notification
*/
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

function checkTitle() {
	if(document.title !== "百度Hi网页版") {
		notify("48.png", "ray", "hello");
		document.title = "百度Hi网页版";
	};
}

function checkNotification() {
	var a = document.createElement("button");
	a.title = "check";
	a.innerHTML = "打开桌面通知功能";
	a.style.position = "fixed";
	a.style.left = "50%";
	a.style.top = "0";
	a.style.display = "block";
	a.style.width = "150px";
	a.style.zIndex = "1000";

	a.addEventListener('click', function(event) {
		if(window.webkitNotifications.checkPermission() == 0) {
			alert("通知可用");
		}
		else {
			window.webkitNotifications.requestPermission();
		}
		return false;
	}, false);
	var b = document.getElementById('headArea');
	b.getElementsByClassName('topLeftArea')[0].appendChild(a);
}

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
