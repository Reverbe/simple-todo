module.exports = function(grunt) {
	grunt.initConfig({
		// require js optimization
		requirejs: {
			compile: {
				options: {
					// name is required
					name: "todo-main",
					// the base path of our optimization
					baseUrl: "public/js/todo",
					// include almond to get define (in place of require.js)
					include: "../lib/almond-0.2.5",
					// use our original main configuration file to avoid
					// duplication.  this file will pull in all our dependencies
					mainConfigFile: "public/js/todo/todo-main.js",
					// the output optimized file name
					out: "public/js/todo/todo-min.js"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-requirejs");

	grunt.registerTask("default", ["requirejs"]);

	// Helper task to clean up generated code
	grunt.registerTask("clean", function() {
		// delete our todo-min.js generated by requirejs optimization
		grunt.file.delete("public/js/todo/todo-min.js");
	});
};