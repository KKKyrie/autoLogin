console.log('autoLogin：insert script => github.js');

const find = function(selector) {
	return document.querySelector(selector);
};
const sendMessage = chrome.runtime.sendMessage;
const onMessage = chrome.runtime.onMessage;


const accountInput = find('#login_field');
const passwordInput = find('#password');
const loginButton = find('input[name=commit]');

const Page = {


	bindEvent: function() {
		onMessage.addListener(function(req, sender, sendResponse) {

			if (req.action === 'FILL_THE_BLANK') {
				console.log('Fill the login information of Github...');
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
