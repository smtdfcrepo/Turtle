import {	checkTypeOfArgs} from "./utils.js"
import {TurtleElement,TurtleListElement} from "./Element/Element.js"

export class TurtleSelector {
	constructor(root = document) {
		this.root = root
	}
	getById(id) {
		let result = this.root.getElementById(id)
		if (result == null) {
			throw "Cannot find element !"
		}
		return new TurtleElement(result)
	}
	getByClassName(className) {
		let result = this.root.getElementsByClassName(className)
		return new TurtleListElement(result)
	}

	getByTagName(tagName) {
		let result = this.root.getElementsByTagName(tagName)
		return new TurtleListElement(result)
	}

	getByName(name) {
		let result = this.root.getElementsByName(name)
		return new TurtleListElement(result)
	}

	select(q) {
		let result = this.root.querySelector(q)
		if (result == null) {
			throw "Cannot find element !"
		}
		return new TurtleElement(result)
	}

	selectAll(q) {
		let result = this.root.querySelectorAll(q)
		return new TurtleListElement(result)
	}

}