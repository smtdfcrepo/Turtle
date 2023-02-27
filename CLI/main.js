const fs = require("fs")
const path = require ("path")
const yargs = require("yargs");

const turtleDeployment = require("../Deployment/build.js")
console.log("Turtle CLI ")
const options = yargs
  .scriptName("turtle")
  .usage('$0 <cmd> [args]')
  .command('build', 'Build a project !', (yargs) => {}, function (argv) {
		let p = process.cwd()
		console.log("Checking configuration file . . .")
		if (!fs.existsSync(path.join(p,"turtle.config.js"))) {
		  console.error('Error : Configuration  File not found!');
			return 
		}
		let file_ ={}
		try{
			 file_ = require(path.join(p,"turtle.config.js"))
	    console.log("Building . . . ")
		}catch(err){
			console.error("Error : Cannot read Configuration file !")
			return 
		}
		turtleDeployment.build(file_)
  })
  .help()
  .argv
