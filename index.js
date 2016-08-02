var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname);

var request = require('request');
var urlutils = require('url');


var stringTranslate = '';
app.get('/', function(req, res){
	
			if(!req.cookies.remember)
			res.cookie('remember','',{maxAge: 60 * 1000});
		
			req.cookies.remember = stringTranslate;
			
			res.render('translator', {
				title: 'Введите текст для перевода:(ru->en)',
				cookiesTest: req.cookies.remember
			});	

		
});


app.post('/', function(req, res){
	
				
			
	if(req.body.text !=""){
				var url = urlutils.format({
				protocol: 'https',
				hostname: 'translate.yandex.net',
				pathname: 'api/v1.5/tr.json/translate',
				query: {
				key: 'trnsl.1.1.20160730T185640Z.47dc1ed12b57c784.acf9a4a82c88e7ff3efc5e556dac4d123c58a596',
				lang: 'ru-en',
				text: req.body.text
			}		
		});
	
						
						
		//....
		request.get({url: url,json:true},
					function (error, response, json) {			
						stringTranslate += req.body.text + ' -> ' + json.text + ' | '; 
						res.render('translator', {
							title: 'Введите текст для перевода:(ru->en)',
							baseValue: 'ru:' + req.body.text+'|',
							resault: 'en:' + json.text,
							cookiesTest: stringTranslate
						});
					}
		)
			
	}else{
		
	res.render('translator', {title:'ERROR: Введите текст для перевода'})};

});


app.listen(8080);
console.log('Server started on port 8080');




























