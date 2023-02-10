const http = require("http")

function queryParse(url) {
  const results = url.match("/\?(?<query>.*)/");
  if (!results) {
    return {};
  }
  const { groups: { query } } = results;

  const pairs = query.match("/(?<param>\w+)=(?<value>\w+)/g");
  const params = pairs.reduce((acc, curr) => {
    const [key, value] = curr.split(("="));
    acc[key] = value;
    return acc;
  }, {});
  return params;
}

function parse(url) {
  let str = "";

  for (var i =0; i < url.length; i++) {
    const c = url.charAt(i);
    if (c === ":") {
      // eat all characters
      let param = "";
      for (var j = i + 1; j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }
      str += `(?<${param}>\\w+)`;
      i = j -1;
    } else {
      str += c;
    }
  }
  return str;
}


function createResponse(res) {
	res.send = (message) => res.end(message);
	res.json = (data) => {
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(data));
	};
	return res;
}


function handle(middleware, req, res) {
	if (!middleware) {
		return new Promise((resolve) => resolve(true));
	}

	return new Promise((resolve) => {
		middleware(req, res, function() {
			resolve(true);
		});
	});
}

class TurtleServer {
	constructor() {
		this.routeTable = {};
		let parseMethod = "json"; 
		
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
		
		this.server = http.createServer(async (req, res) => {
			const routes = Object.keys(this.routeTable);
			let match = false;
			for (var i = 0; i < routes.length; i++) {
				const route = routes[i];
				const parsedRoute = parse(route);
				let r = new RegExp(parsedRoute).test(req.url) && this.routeTable[route][req.method.toLowerCase()]
				if (r) {
					let callback = this.routeTable[route][req.method.toLowerCase()];
					let middleware = this.routeTable[route][`${req.method.toLowerCase()}-middleware`];
					const m = req.url.match(new RegExp(parsedRoute))
					/**************************************************************/
					req.params = m.groups
					req.query = queryParse(req.url)
					let body = await readBody(req)
					body = body ? JSON.parse(body) : {}
					req.body = body
					callback.forEach(async function(f){
						await handle(f, req, createResponse(res));
					})
					match = true
					break
				}
			}
			if (!match) {
				res.statusCode = 404;
				res.end("Not found");
			}
		})
	}
	
	on(path, method,...callback) {
		if (!this.routeTable[path]) {
			this.routeTable[path] = {};
			this.routeTable[path][method] =[...callback]
		}
		this.routeTable[path][method].push(...callback)
	}
	listen(port){
		this.server.listen(port)
	}
}


module.exports ={
	TurtleServer
}