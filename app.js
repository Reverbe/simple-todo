var express = require("express"),
	fs = require("fs"),
	lessMiddleware = require("less-middleware");

var app = express();

app.configure(function() {
	app.set("port", 3000);
	app.set("views", __dirname + "/views");
	app.engine('html', require('ejs').renderFile);
	app.use(express.cookieParser("simple-todo"));
	app.use(express.cookieSession());
	app.use(express.bodyParser());
	// pull in all the controllers
	fs.readdirSync("controllers").forEach(function(controllerName) {
		require("./controllers/" + controllerName)(app);
	});
	app.use(app.router);
	app.use(lessMiddleware({
		src: __dirname + "/less",
		dest: __dirname + "/public/css",
		// if you're using a different src/dest directory, you MUST
		// include the prefex, which matches the dest public directory
		prefix: "/css",
		// force true recompiles on every request... not the best
		// for production, but fine in debug while working through changes
		force: true
	}));
	app.use(express.static(__dirname + "/public"));
});

app.configure("development", function() {
	app.use(express.errorHandler());
});

app.listen(app.get("port"), function() {
	console.log("Express server listening on port " + app.get("port"));
});