import { 
	TurtleUIComponent,
	TurtleUINavbar, 
	TurtleUIAccordion,
	TurtleUIOverlay,
	TurtleUIModal,
	TurtleUIMainOverlay,
	TurtleUISwitch
} from "./Components.js"

import { actions } from "./Actions.js"
export const UIComponent = TurtleUIComponent
export const Navbar = TurtleUINavbar
export const Accordion = TurtleUIAccordion
export const Overlay = TurtleUIOverlay
export const Modal = TurtleUIModal
export const Switch = TurtleUISwitch
export const Actions = actions
export const MainOverlay = TurtleUIMainOverlay

try {
	var prevScrollpos = window.pageYOffset;
let navbar =  new TurtleUINavbar(".navbar")
navbar.getChildComponent("items",".navbar-items")

if (navbar.component.classList.contains("navbar-auto-transparent")) {
	if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
		navbar.component.style.background = "var(--navbar-bg)";
	} else {
	
		navbar.component.style.background = "transparent"
	}
}

window.onscroll = function() {
	console.log(1);
	if (navbar.component.classList.contains("navbar-auto-transparent") && (!navbar.component.classList.contains("open"))) {
		if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
			navbar.component.style.background = "var(--navbar-bg)";
		} else {
			navbar.component.style.background = "transparent"
		}
	}
	let m = window.matchMedia("(max-width: 600px)")
	if(navbar.component.classList.contains("navbar-auto-hide") ){
		if(m.matches && navbar.getState() != "off"){
			return
		}
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			navbar.component.style.top = "0";
		} else {
			navbar.component.style.top = "-100px";
		}
		prevScrollpos = currentScrollPos;
	}
	
}


	
} catch (e) {}
