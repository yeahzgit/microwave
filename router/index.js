const request = require('request');
const config = require('../configs');

const options = {
	baseUrl: config.REQUEST
}

const router = {
	home(req, res) {
		var members, news, publication, introduce;
		request('/members?page_no=1&page_size=3', options, (err, response, body) => {
			members = JSON.parse(body);
		})
		.pipe(request('/introduce/593fa3dcd16db1196e9ecfc2', options, (err, response, body) => {
				introduce = JSON.parse(body);
		}))
		.pipe(request('/news?page_no=1&page_size=8&sort=-create_at', options, (err, response, body) => {
				news = JSON.parse(body);
		}))
		.pipe(request('/publication?page_no=1&page_size=3&sort=-create_at', options, (err, response, body) => {
				publication = JSON.parse(body);
				res.render('index', {
					title: '微波创新实验室',
					introduce: introduce,
					publication: publication,
					news: news,
					members: members
				})
		}))
	},
	members(req, res) {
		request('/members', options, (err, response, body) => {
			const members =  JSON.parse(body);
			const teachers = [];
			const students = [];
			members.forEach(function(val) {
				if(val.member_style == 'teacher')
					teachers.push(val);
				else
					students.push(val);
			})
			res.render('members', {
				title: '实验室成员',
				teachers: teachers,
				students: students
			})
		})
	},
	publications(req, res) {
		request('/publication?sort=-create_at', options, (err, response, body) => {
			const publications = JSON.parse(body);
			res.render('publications', {
				title: '实验室成果展示',
				publications: publications
			})
		})
	},
	news(req, res) {
		request('/news?sort=-create_at', options, (err, response, body) => {
			const news = JSON.parse(body);
			res.render('news', {
				title: '新闻列表',
				news: news
			})
		})
	},
	introduce(req, res) {
		request('/introduce/593fa3dcd16db1196e9ecfc2', options, (err, response, body) => {
			const introduce = JSON.parse(body);
			res.render('details', {
				title: '实验室介绍',
				article: introduce
			})
		})
	},
	pubDetails(req, res) {
		request('/publication/' + req.params.id, options, (err, response, body) => {
			const publication = JSON.parse(body);
			res.render('details', {
				title: publication.title,
				article: publication
			})
		})
	},
	newsDetails(req, res) {
		request('/news/' + req.params.id, options, (err, response, body) => {
			const news = JSON.parse(body);
			res.render('details', {
				title: news.title,
				article: news
			})
		})
	}
}

module.exports = router;