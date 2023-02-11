const http = require("http")
const url = require('url');
const Route = require("route-parser")

class TurtleClientRequest{
	constructor(req){
		this.req = req
		this.params = {}
		this.query = {}
		this.cookie = {}
	}
	
	get headers(){
		return this.req.headers
	}
	
	get method(){
		return this.req.method
	}
}
function checkParams(urlParams, routeParams) {
	urlParams = urlParams.split("/")
	routeParams = routeParams.split("/")
	let params = {}
	if (urlParams.length != routeParams.length) {
		return { matched: false }
	}
	for (var i = 0; i < routeParams.length; i++) {
		if (routeParams[i][0] == ":") {
			if (urlParams[i] == undefined) {
				return { matched: false }
			}
			params[routeParams[i].replace(":", "")] = urlParams[i]
		} else if (routeParams[i] != urlParams[i]) {
			return { matched: false }
		}
	}


	return {
		matched: true,
		st: urlParams.length - i,
		params
	}
}

function readBody(req) {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += "" + chunk;
		});
		req.on("end", () => {
			resolve(body);
		});
		req.on("error", (err) => {
			reject(err);
		});
	});
}

class TurtleClientResponse{
	constructor(res){
		this.res = res
	}
	send(content ){
		this.res.end(content)
	}
	json(j){
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(data));
	}
}

class TurtleRouter{
	constructor() {
		this.routeTable = {}
		this.middlewares = {
			all: [],
			route: {},
		}
	}
	
	middleware(a, ...b) {
		if (typeof a == "string") {
			if (!this.middlewares.route[a]) {
				this.middlewares.route[a] = []
			}
			this.middlewares.route[a].push(...b)
		} else {
			this.middlewares.all.push(a, ...b)
		}
	
	}
	
	on(method, path, callback) {
		if (!this.routeTable[path]) {
			this.routeTable[path] = {
				handle: {},
				middleware: [],
			}
		}
		this.routeTable[path].handle[method] = callback
	}
	handle(req,res) {
		let req_ = new TurtleClientRequest(req)
		let res_ = new TurtleClientResponse(res)
		let path = new url(req.url).pathname
		
		this.middlewares.all.forEach((f) => {
			f()
		})
		
		Object.keys(this.routeTable).forEach((route) => {
			let r = checkParams(path, route)
			if (r.matched && r.st == 0) {
				this.middlewares.route[route].forEach(f=>{
					f()
				})
				if (!this.routeTable[route].handle[method]) {
					res.statusCode = 404;
					res.end("Not found");
				}
			}
		})
	}
}

class TurtleServer{
	constructor(){
		this.router = new TurtleRouter()
		this.sever = http.createServer(async (req,res)=>{
			this.router.handle(req,res)
		})
	}
	listen(port){
		this.sever.listen(port,function(){
			console.log(`Tuttle Server is running on port ${port} !`)
		})
	}
}


module.export ={
	TurtleServer,
	TurtleClientRequest,
	TurtleClientResponse
}