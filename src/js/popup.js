const find = function(selector) {
	return document.querySelector(selector);
}

const sendMessage = chrome.tabs.sendMessage;
const onMessage = chrome.runtime.onMessage;
const query = chrome.tabs.query;

const container = find('#container');
const showAddBtn = find('#showAddBtn');
const addArea = find('.add-area');
const cancelBtn = find('#cancelBtn');
const confirmBtn = find('#confirmBtn');

const accountBtnArea = find('#accountBtnArea');

const accountNameInput = find('#accountName');
const accountInput = find('#account');
const passwordInput = find('#password');


const Plugin = {

	initButton: function() {
		let that = this;
		let str = '';
		let obj = {};
		let account = '';
		let password = '';
		// 遍历 localStorage ，生成按钮
		for (let key in localStorage) {
			if (localStorage.hasOwnProperty(key)) {

				str = that.getStorage(key);

				obj = JSON.parse(str);

				account = obj.account;
				password = obj.password;

				that.createButton(key);
			}
		}
	},


	bindEvent: function() {

		let that = this;

		// 对 account-btn 和 delete-btn 做事件代理
		accountBtnArea.addEventListener('click', function(e){
			e.stopPropagation();
			let target = e.target;
			let className = e.target.className;
			let key = '';
			let storageObj = {};

			if (className === 'account-btn'){

				// 填充页面的 input
				key = target.parentNode.getAttribute('storage-key');
				storageObj = JSON.parse(that.getStorage(key));
				that.fillTheBlank(storageObj.account, storageObj.password);


			} else if (className === 'fa fa-trash'){
				
				// 删除当前项
				key = target.parentNode.parentNode.getAttribute('storage-key');
				that.removeStorage(key);
				location.reload();


			} else {
				console.log('neither account-btn nor delete-btn.');
			}

		}, false);


		//添加按钮  展示输入面板
		showAddBtn.addEventListener('click', function() {
			addArea.style.display = 'block';
			showAddBtn.style.display = 'none';
		}, false);

		//取消按钮  隐藏输入面板
		cancelBtn.addEventListener('click', function() {
			// addArea.style.display = 'none';
			// showAddBtn.style.display = 'block';
			location.reload();
		}, false);

		//确认按钮
		confirmBtn.addEventListener('click', function() {

			let accountName = accountNameInput.value;
			let account = accountInput.value;
			let password = passwordInput.value;

			// empty check
			if (accountName === '' || account === '' || password === '') {
				console.info('input incomplete.');
				return;
			}


			let _accountObj = {
				account: account,
				password: password
			};

			let _accountStr = JSON.stringify(_accountObj);

			that.setStorage(accountName, _accountStr);

			that.clearInput();
			location.reload();

		}, false);

	},

	showPanel: function() {
		addArea.style.display = 'block';
		showAddBtn.style.display = 'none';
	},

	hidePanel: function() {
		addArea.style.display = 'none';
		showAddBtn.style.display = 'block';
	},


	// 存
	setStorage: function(key, value) {
		localStorage.setItem(key, value);
	},

	// 读
	getStorage: function(key) {
		let _value = localStorage.getItem(key);
		return _value;
	},

	// 删
	removeStorage: function(key) {
		localStorage.removeItem(key);
	},

	// 清空 input
	clearInput: function() {
		accountNameInput.value = '';
		accountInput.value = '';
		passwordInput.value = '';
	},

	// 在 showAddButton 之前加入一个 button
	createButton: function(wording, account, password) {

		// button-row
		let div = document.createElement('div');
		div.className = 'button-row';
		div.setAttribute('storage-key', wording);

		// account-btn
		let btn = document.createElement('button');
		btn.className = 'account-btn';

		btn.innerText = wording;

		// icon-container
		let iconDiv = document.createElement('div');
		iconDiv.className = 'icon-container';

		// icon
		let icon = document.createElement('i');
		icon.className = 'fa fa-trash';

		iconDiv.appendChild(icon);

		div.appendChild(btn);
		div.appendChild(iconDiv);
		
		accountBtnArea.appendChild(div);
	},

	// 发送指令到 content_script，填充页面的 input
	fillTheBlank: function(account, password){
		query({
				active: true,
				currentWindow: true
			}, function(tabs) {
				sendMessage(tabs[0].id, {
					action: 'FILL_THE_BLANK',
					account: account,
					password: password
				}, function(res) {
					console.log(res);
			});
		});
	},

	init: function() {
		this.initButton();
		this.bindEvent();
	}

};

Plugin.init();
