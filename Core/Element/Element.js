import {checkTypeOfArgs} from "../utils.js"
import {TurtleListAttr} from "./ListAttr.js"

export function createElement(name){
	return new TurtleElement(document.createElement(name))
}
export class TurtleElement {
	constructor(dom) {
		checkTypeOfArgs([[HTMLElement, TurtleElement]], [dom])
		this.dom = dom
	}
	attr() {
		return new TurtleListAttr(this.dom, this.dom.attributes)
	}
	hidden(){
		this.dom.hidden = "hidden"
	}
	destroy() {
		this.dom.remove()
	}
	on(event, callback) {
		checkTypeOfArgs(["pass", ["function"]], [event, callback])
		this.dom.addEventListener(event, callback)
	}
	select(query) {
		let result = this.dom.querySelector(query)
		if (result == null) {
			throw "Cannot find element !"
		}
		return new TurtleElement(result)
	}
	selectAll(query) {
		let result = this.dom.querySelectorAll(query)
		return new TurtleListElement(result)
	}
	child () {
		return new TurtleListElement(this.dom.childNodes)
	}
	set value(val) {
		this.dom.value = val
	}
	get value() {
		return this.dom.value
	}
	set text(val) {
		this.dom.textContent = val
	}
	get text() {
		return this.dom.textContent
	}
	set html(val) {
		this.dom.innerHTML = val
	}
	get html() {
		return this.dom.innerHTML
	}
	get classList() {
		return this.dom.classList
	}
	set id(val) {
		this.dom.id = val
	}
	get id() {
		return this.dom.id
	}
	get classList(){
		return this.dom.classList
	}
	computedStyle(pseudo_element) {
		return getComputedStyle(this.dom, pseudo_element)
	}
	get style() {
		return this.dom.style
	}
	set disabled(state) {
		this.dom.disabled = state
	}
	get disabled() {
		return this.dom.disabled
	}
	set type(t) {
		this.dom.type = t
	}
	get type() {
		return this.dom.type
	}
	get tag() {
		return this.dom.tagName
	}
	get checked(){
		return this.dom.checked
	}
	set checked(state){
		this.dom.checked = state
	}
}


export class TurtleListElement {
	constructor(list) {
		checkTypeOfArgs([[NodeList, HTMLCollection]], [list])
		this.list = list
	}
	each(callback) {
		checkTypeOfArgs([["function"]], [callback])
		this.list.forEach((element) => {
			callback(new TurtleElement(element))
		})
	}
}