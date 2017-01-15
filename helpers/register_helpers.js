define([
	'handlebars',
	'jquery'
	], function(Handlebars, $){

	Handlebars.registerHelper("counter", function (index){
	    return index;
	});

	Handlebars.registerHelper("emoji", function (rating){
		if(rating >= 4)
	    	return "em em-smile";
		else if(rating<4 && rating>=3)
			return "em em-expressionless";
		else if(rating<3)
			return "em em-rage";
	});
});