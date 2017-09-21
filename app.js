const express = require('express');
const request = require('request');
const handlebars = require('express-handlebars');
const path = require('path');
const configs = require('./configs');
const router = require('./router');
const helpers = require('./helpers');
const proxy = require('http-proxy-middleware')

const hbs = handlebars.create({
	defaultLayout: 'main',
	helpers: helpers
})

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use('/microwave/api', proxy(configs.PROXY_OPTIONS));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', router.home);
app.get('/home', router.home);
app.get('/members', router.members);
app.get('/publications', router.publications);
app.get('/news', router.news);
app.get('/introduce', router.introduce);
app.get('/publications/:id', router.pubDetails);
app.get('/news/:id', router.newsDetails);

app.listen(configs.LISTEN);
console.log('App started on port ' + configs.LISTEN);