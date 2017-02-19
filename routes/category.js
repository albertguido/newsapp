var express = require('express');
var router = express.Router();
var dbProvider = require('../db').dbProvider;

var db = new dbProvider('localhost', 27017);


router.get('/', function(req, res, next) {
	db.getAllCategories(function(error, cat){
		res.render('category', { 
			title: 'Categories',
			categories: cat
		});
	});
});

router.get('/new', function(req, res, next) {
  res.render('category_new', { title: 'Category' });
});

router.post('/new', function(req, res){
	db.addCategory({
		name: req.param('categoryName')
	}, function(error, docs){
		res.redirect('/');
	});
});

router.get('/:id', function(req, res){
	db.getNewsByCategoryId(req.params.id, function(error, news){
		res.render('news_by_category', { news: news });
	});
});

// export
module.exports = router;
