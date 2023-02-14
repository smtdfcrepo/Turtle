export function component(options) {
	let Component_Options = {
		render: options.render ?? new Function(),
		beforeRender: options.beforeRender ?? new Function(),
		afterRender: options.afterRender ?? new Function(),
		onMount: options.onMount ?? new Function(),
		onUnmount: options.onUnmount ?? new Function(),
		setState: options.setState ?? new Function(),
		onStateChange: options.onStateChange ?? new Function()
	}

	let COMPONENT = class extends HTMLElement {
		constructor() {
			super()
			this.renderDependents = null
			this._state = {}
		}

		setState(name, value) {
			Component_Options.onStateChange.call(this, name, value)
			this._state[name] = value
			if (this.renderDependents == null) {
				this.renderContent()
			} else if (this.renderDependents instanceof Array && this.renderDependents.length > 0 && this.renderDependents.includes(name)) {
				this.renderContent()
			}
			return
		}
		get props() {

			return {
				props: this.attributes?? new NamedNodeMap(),
				set: function(name, value) {
					let p = this.props.removeNamedItem(name)
					p.value = value
					this.props.setNamedItem(p)
				},
				get: function(name) {
					return (this.props.getNamedItem(name)?? {value:null}).value
				}
			}
		}

		get state() {
			return this._state
		}

		async renderContent() {
			Component_Options.beforeRender.call(this)
			let content = Component_Options.render.call(this)
			this.innerHTML = content
			Component_Options.afterRender.call(this)
		}

		requestRender() {
			this.renderContent()
		}

		connectedCallback() {
			Component_Options.onMount.call(this)
			this.renderContent()
		}

		disconnectedCallback() {
			Component_Options.onUnmount.call(this)
		}
	}

	window.customElements.define(options.name, COMPONENT)
}