import {checkTypeOfArgs} from "../utils.js"
export class TurtleListAttr {
	constructor(owner, list) {
		checkTypeOfArgs([[HTMLElement, NamedNodeMap]], [owner, list])
		this.list = list
		this.owner = owner
	}

	each(callback) {
		checkTypeOfArgs([[Function, "number"]], [callback])
		for (var i = 0; i < this.list.length; i++) {
			callback(this.list[i], i)
		}
	}

	set(name, value) {
		this.owner.setAttribute(name, value)
	}

	get(name) {
		return this.owner.getAttribute(name)
	}

}