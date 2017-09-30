console.log('autoLogin：insert script => segmentfault.js');

const find = function(selector) {
	return document.querySelector(selector);
};

const sendMessage = chrome.runtime.sendMessage;
const onMessage = chrome.runtime.onMessage;


let accountInput = find('input[name=username]');
let passwordInput = find('input[name=password]');
let loginButton = find('button[type=submit]');

const Page = {


	bindEvent: function() {
		onMessage.addListener(function(req, sender, sendResponse) {

			const pathname = location.pathname;

			if (pathname !== '/user/login'){
				accountInput = find('div.col-md-push-7.login-wrap input[name=username]');
				passwordInput = find('div.col-md-push-7.login-wrap input[name=password]');
				loginButton = find('div.col-md-push-7.login-wrap button[type=submit]');
			}

			if (req.action === 'FILL_THE_BLANK') {
				console.log('Fill the login information of Segmentfault...');
				accountInput.value = req.account;
				passwordInput.value = req.password;
				loginButton.click();
				sendResponse('Success.');
			}
		});
	},

	init: function() {
		this.bindEvent();
	}
};

Page.init();
