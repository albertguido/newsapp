var database = require('mongodb').Db;
var connection = require('mongodb').Connection;
var server = require('mongodb').Server;
var objectId = require('mongodb').ObjectId;

dbProvider = function(host, port){
	this.data = new database('newsdb', new server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.data.open(function(){});
};

// categories
dbProvider.prototype.getCategories = function(callback){
	this.data.collection('categories', function(error, categories_collection){
		if(error) callback(error);
		else callback(null, categories_collection);
	});
};

dbProvider.prototype.getAllCategories = function(callback){
	this.getCategories(function(error, categories_collection){
		if(error) callback(error);
		else{
			categories_collection.find().toArray(function(error, response){
				if(error) callback(error);
				else callback(null, response);
			});
		};
	});
};

dbProvider.prototype.addCategory = function(category, callback){
	this.getCategories(function(error, categories_collection){
		if(error) callback(error);
		else{
			categories_collection.insert(category, function(){
				callback(null, category);
			});		
		};
	});
};

// news
dbProvider.prototype.getNews = function(callback){
	this.data.collection('news', function(error, news_collection){
		if(error) callback(error);
		else callback(null, news_collection);
	});
};

dbProvider.prototype.getAllNews = function(callback){
	this.getNews(function(error, news_collection){
		if(error) callback(error);
		else{
			news_collection.find().toArray(function(error, response){
				if(error) callback(error);
				else callback(null, response);
			});
		};
	});
};

dbProvider.prototype.addNews = function(news, callback){
	this.getNews(function(error, news_collection){
		if(error) callback(error);
		else{
			news_collection.insert(news, function(){
				callback(null, news);
			});		
		};
	});
};

dbProvider.prototype.getNewsById = function(id, callback){
	this.getNews(function(error, news_collection){
		if(error) callback(error);
		else{
			news_collection.findOne({_id: new objectId(id)}, function(error, res){
				if(error) callback(error);
				else callback(null, res);
			});
		};
	});
};

dbProvider.prototype.getNewsByCategoryId = function(categoryId, callback){
	this.getNews(function(error, news_collection){
		if(error) callback(error);
		else{
			news_collection.find({category_id: new objectId(categoryId)}, function(error, res){
				if(error) callback(error);
				else callback(null, res);
			});
		};
	});
};

// comments
dbProvider.prototype.getComments = function(callback){
	this.data.collection('comments', function(error, comments_collection){
		if(error) callback(error);
		else callback(null, comments_collection);
	});
};

dbProvider.prototype.getCommentsByNewsId = function(news_id, callback){
	this.getComments(function(error, comments_collection){
		if(error) callback(error);
		else{
			comments_collection.find({news_id: new objectId(news_id)}, function(error, res){
				if(error) callback(error);
				else callback(null, res);
			});
		};
	});
};

dbProvider.prototype.addComment = function(comment, callback){
	this.getComments(function(error, comments_collection){
		if(error) callback(error);
		else{
			comments_collection.insert(comment, function(){
				callback(null, comment);
			});		
		};
	});
};

// export
exports.dbProvider = dbProvider;