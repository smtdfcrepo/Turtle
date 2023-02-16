import * as components from "./Components.js"

export const actions = {
	"navbar": {
		"open": function(target, args) {
			let navbar = new components.TurtleUINavbar(args.navbar)
			navbar.setAction("open")
		},
		"close": function(target, args) {
			let navbar = new components.TurtleUINavbar(args.navbar)
			navbar.setAction("close")
		},
		"toggle": function(target, args) {
			let navbar = new components.TurtleUINavbar(args.navbar)
			navbar.setAction("toggle")
		}
	},
	"accordion": {
		"open": function(target, args) {
			let accordion = new components.TurtleUIAccordion(args.accordion)
			accordion.setAction("open")
		},
		"close": function(target, args) {
			let accordion = new components.TurtleUIAccordion(args.accordion)
			accordion.setAction("close")
		},
		"toggle": function(target, args) {

			let accordion = new components.TurtleUIAccordion(args.accordion)
			accordion.setAction("toggle")
		}
	},
	"offcanvas": {
		"open": function(target, args) {
			let offcanvas = new components.TurtleUIOffcanvas(args.offcanvas)
			offcanvas.setAction("open")
		},
		"close": function(target, args) {
			let offcanvas = new components.TurtleUIOffcanvas(args.offcanvas)
			offcanvas.setAction("close")
		},
		"toggle": function(target, args) {

			let offcanvas = new components.TurtleUIOffcanvas(args.offcanvas)
			offcanvas.setAction("toggle")
		}
	},
	"overlay": {
		"open": function(target, args) {
			let overlay = new components.TurtleUIOverlay(args.overlay)
			overlay.setAction("open")
		},
		"close": function(target, args) {
			let overlay = new components.TurtleUIOverlay(args.overlay)
			overlay.setAction("close")
		},
		"toggle": function(target, args) {
			let overlay = new components.TurtleUIOverlay(args.overlay)
			overlay.setAction("toggle")
		}
	},
	"modal": {
		"open": function(target, args) {
			let modal = new components.TurtleUIModal(args.modal)
			modal.setAction("open")
		},
		"close": function(target, args) {
			let overlay = new components.TurtleUIModal(args.modal)
			modal.setAction("close")
		},
		"toggle": function(target, args) {
			let modal = new components.TurtleUIModal(args.modal)
			modal.setAction("toggle")
		}
	},
	"switch": {
		"on": function(target, args) {
			let switch_ = new components.TurtleUISwitch(args.switch)
			switch_.setAction("on")
		},
		"off": function(target, args) {
			let switch_ = new components.TurtleUISwitch(args.switch)
			switch_.setAction("off")
		},
		"toggle": function(target, args) {
			let switch_ = new components.TurtleUISwitch(args.switch)
			switch_.setAction("toggle")
		},

	}
}

window.addEventListener("click", function(event) {
	let target = event.target
	let args = target.dataset
	let control = args.control
	let action = args.action
	if (control) {
		if (!actions[control]) {
			throw `TurtleUI : No control support for element named '${control}' !`
		}
		if (!actions[control][action]) {
			throw `TurtleUI : Component '${control}' does not support action '${action}'!`
		}
		actions[control][action](target, args)
	}
})