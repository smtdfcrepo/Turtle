window.turtle_states = {}
export class TurtleComponent extends HTMLElement {
	constructor() {
		super()
	}
	onRendered() {}
	setState(name, value) {
		window.turtle_states[this.id][name] = value
		this.onStateUpdate()
		if (this.rerender) {
			if (this.renderDependent == null) {
				this.#startRerender()
			} else if (this.renderDependent.includes(name)) {
				this.#startRerender()
			}
		}
	}
	get state() {
		return window.turtle_states[this.id]
	}
	#startRerender() {
		this.#startRender()
		this.onRerender()
	}
	#startRender() {
		this.innerHTML = this.render()
		this.onRendered()
	}
	requestRerender() {
		this.#startRerender()
	}
	onMount() {}
	onUnmount() {}
	onRerender() {}
	onStateUpdate() {}
	render() {
		return "this is component"
	}
	connectedCallback() {
		this.id = `_${Date.now()}`
		window.turtle_states[this.id] = {}
		this.renderDependent = null
		this.rerender = true
		this.props = {
			props: this.attributes,
			set: function(name, value) {
				let p = this.props.removeNamedItem(name)
				p.value = value
				this.props.setNamedItem(p)
			},
			get: function(name) {
				return this.props.getNamedItem(name).value
			}
		}
		this.onMount()
		this.#startRender()
	}
	disconnectedCallback() {
		delete window.turtle_states[this.id]
		this.onUnmount()
	}
}