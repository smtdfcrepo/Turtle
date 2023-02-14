export class TurtleRequest {
	constructor(url, method, options = {}) {
		this.url = url
		this.method = method
		this.options = options
		this.headers = {}
		this.timeout = 500
		this.controller = new AbortController()
		this.signal = this.controller.signal
	}
	cancel() {
		this.controller.abort()
	}
	send() {
		return new Promise((resolve, reject) => {
			let options = {
				method: this.method,
				headers: this.headers,
				signal: this.signal
			}
			fetch(this.url, options).then((res)=> {
				resolve(new TurtleResponse(res))
			})
			if (this.timeout) {
				let a = setTimeout(() => {
					this.cancel()
					reject({
						msg: "Failed to fetch ! Request timeout",
					})
					clearTimeout(a)
				}, this.timeout)
			}
		})
	}
	setHeader(name,
		value) {
		this.headers[name] = value
	}
}

export class TurtleResponse {
	constructor(response) {
		this.response = response
	}
	get status () {
		return this.response.status
	}
	get success() {
		return this.response.ok == true
	}
	async text() {
		return await this.response.text()
	}
	async json() {
		return await this.response.json()
	}
	async blob() {
		return await this.response.blob()
	}
	get URL() {
		return this.response.url
	}
	get headers() {
		return this.response.headers
	}
}