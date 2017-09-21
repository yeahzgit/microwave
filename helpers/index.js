const helpers = {
	lengthFilter: function(str, len) {
		if(!str) 
			return ''; 
		return str.length < len ? str : str.substr(0, len) + '...';
	},
	memberStyle: function(str) {
		if(str == 'teacher' || str == 'student')
			return str == 'teacher' ? '教师' : '学生';
		else
			return '未知';
	},
	htmlFilter: function(html, len) {
		if(!html)
			return '';
		len = len || 50;
		var text = html.toString();
		text = text.replace(/<[^>]*>|&nbsp;| /g, '').substr(0, len);
		return text.length < len ? text : text + '...';
	},
	dateFilter(date = new Date().toISOString(), format = 'yyyy-MM-dd HH:mm:ss') {
		let time = date.match(/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/);
		let dateStr = format;
		let fmt = {
			'yyyy': time[1],
			'MM': time[2],
			'dd': time[3],
			'HH': time[4],
			'mm': time[5],
			'ss': time[6]
		}
		for(let key in fmt) {
			if(new RegExp(key).test(format)) {
				dateStr = dateStr.replace(key, fmt[key]);
			}
		}
		return dateStr;
	},
	overwriteIndex(index) {
		return index + 1; 
	}
}

module.exports = helpers;