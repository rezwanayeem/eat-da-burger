var express = require('express');
var burgers = require('../models/burger.js');
var router = express.Router();
routes = require('./routes')


router.get('/', function(req, res) {
	res.redirect('/*');
});


router.get('/*', function(req, res) {
	burgers.all(function(burgerData) {
		var data = {
			burgers: burgerData
		};
		res.render('index', data);
	});
});

//post route
router.post('/*/create', function(req, res) {
	console.log(req.body.name);
	console.log(req.body.devoured);
	burgers.create(['name', 'devoured'], [req.body.name, req.body.devoured], function() {
		res.redirect('/burgers');
	});
});

//put route
router.put('/*/devour/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('burgers', condition);

	burgers.devour({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect('/*');
	});
});


//Route for delete
router.delete('/*/clear/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('burgers', condition);

	burgers.clear(condition, function() {
		res.redirect('/*');
	});
});

module.exports = router;