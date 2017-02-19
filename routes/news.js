var express = require('express');
var router = express.Router();
var dbProvider = require('../db').dbProvider;

var db = new dbProvider('localhost', 27017);


router.get('/', function(req, res, next) {
	db.getAllNews(function(error, news){
		res.render('index', { 
			title: 'All News',
			allNews: news
		});
	});
});

router.get('/news/new', function(req, res, next) {
	db.getAllCategories(function(error, cat){
		res.render('news_new', { 
			title: 'Post News',
			categories: cat
		});
	});
});

router.post('/news/new', function(req, res){
	db.addNews({
		category_id: req.param('categoryId'),
		title: req.param('newsTitle'),
		description: req.param('newsDesc')
	}, function(error, docs){
		res.redirect('/category');
	});
});

router.get('/news/:id', function(req, res){
	db.getNewsById(req.params.id, function(error, news){
		res.render('news_detail', { news: news });
	});
});

module.exports = router;
