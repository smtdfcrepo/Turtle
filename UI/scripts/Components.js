const turtle = window.turtle
if (!turtle) {
	console.warn("Turtle UI require Turtle Core ")
	throw "Cannot find Turtle Core !"
}
const mainSelector = new turtle.Selector(document)

function disableScroll() { 
  document.body.classList.add("remove-scrolling"); 
} 

function enableScroll() { 
  document.body.classList.remove("remove-scrolling"); 
}


export const TurtleUIMainOverlay = {
	element: turtle.createElement("div"),
	count: 0,
	open: function() {
		this.element.style.display = "block"
		this.count += 1
	},
	close: function() {
		this.count -= 1
		if (this.count <= 0) {
			this.count = 0
			this.element.style.display = "none"
		}
	}
}
TurtleUIMainOverlay.element.classList.add("overlay")

TurtleUIMainOverlay.element.style.zIndex = "1000"
document.body.appendChild(TurtleUIMainOverlay.element.dom)
export class TurtleUIComponent {
	constructor(query) {
		this.component = mainSelector.select(query)
		this.child = {}
	}
	getChildComponent(name, query) {
		this.child[name] = this.component.select(query)
	}
	setAction(name) {}
}
export class TurtleUINavbar extends TurtleUIComponent {
	constructor(query) {
		super(query)
		this.getChildComponent("items", ".navbar-items")
	}
	getState() {
		let display = this.child.items.computedStyle().display
		//console.log(maxHeight);
		if (display == "none") {
			return "off"
		} else {
			return "on"
		}
	}
	setAction(name) {
		switch (name) {
			case "open":
				//this.child.items.style.display = "block"
				this.component.style.background = "var(--navbar-bg)";
				this.child.items.style.display = "block"
				this.component.classList.add("open")
				TurtleUIMainOverlay.open()
				break
			case "close":
				//this.child.items.style.display = "none"
				this.child.items.style.display = "none"
				this.component.classList.remove("open")
				TurtleUIMainOverlay.close()
				break
			case "toggle":
				let s = this.getState()
				//console.log(s);
				if (s == "on") {
					this.setAction("close")
				} else {
					this.setAction("open")
				}
				break
		}
	}
}
export class TurtleUIAccordion extends TurtleUIComponent {
	constructor(query) {
		super(query)

		this.getChildComponent("body", ".accordion-body")
		this.child.body.style.maxHeight = null
	}
	getState() {
		/*
    let display = this.child.body.computedStyle().display
    if (display == "block") {
      return "open"
    }else{
      return "close"
    }*/
		return this.child.body.computedStyle().maxHeight
	}

	setAction(name) {
		switch (name) {
			case "open":
				this.child.body.style.maxHeight = this.child.body.dom.scrollHeight + "px"
				break
			case "close":
				this.child.body.style.maxHeight = "0px"
				break
			case "toggle":
				let mh = this.getState()
				if (mh == "0px") {
					this.child.body.style.maxHeight = this.child.body.dom.scrollHeight + "px"
				}
		}
	}
}
export class TurtleUIOffcanvas extends TurtleUIComponent {
	constructor(query) {
		super(query)
	}
	getState() {
		return this.component.classList.contains("open")
	}

	setAction(name) {
		switch (name) {
			case "open":
				//this.component.style.left = "0%"
				this.component.classList.add("open")
				TurtleUIMainOverlay.open()
				break
			case "close":
				TurtleUIMainOverlay.close()
				//this.component.style.left = "-100%"
				this.component.classList.remove("open")
				break
			case "toggle":
				let l = this.getState()

				if (l) {
					this.setAction("close")
				} else {
					//	console.log(1);
					this.setAction("open")
				}
		}
	}
}
export class TurtleUIOverlay extends TurtleUIComponent {
	constructor(query) {
		super(query)
	}
	getState() {
		let display = this.component.style.display
		if (display == "block") {
			return "open"
		} else {
			return "close"
		}
	}
	setAction(name) {
		switch (name) {
			case "open":
				this.component.style.display = "block"
				break;
			case "close":
				this.component.style.display = "none"
				break;
			case "toggle":
				let s = this.getState()
				if (s == "open") {
					this.setAction("close")
				} else {
					this.setAction("open")
				}
				//this.component.style.display = "block"
				break;

		}
	}
}

export class TurtleUIModal extends TurtleUIComponent {
	constructor(query) {
		super(query)
	}
	getState() {
		return this.component.classList.contains("open")
	}

	setAction(name) {
		switch (name) {
			case "open":
				this.component.classList.add("open")
				break
			case "close":
				this.component.classList.remove("open")
				break
			case "toggle":
				let l = this.getState()
				if (l) {
					this.setAction("close")
				} else {
					this.setAction("open")
				}
		}
	}
}

export class TurtleUISwitch extends TurtleUIComponent {
	constructor(query) {
		super(query)
		this.getChildComponent("input", "input")
	}

	getState() {
		let state = this.child["input"].checked
		return state ? "on" : "off"
	}
	setAction(name) {
		switch (name) {
			case 'on':
				this.child["input"].checked = true
				break;
			case 'off':
				this.child["input"].checked = false
				break;
			case 'toggle':
				let s = this.getState()
				if (s == "on") {
					this.setAction("off")
				}else{
					this.setAction("on")
				}
				break;
			
		}
	}
}