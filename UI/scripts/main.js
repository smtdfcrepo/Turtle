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

var prevScrollpos = window.pageYOffset;
let navbar = document.querySelector(".navbar") || document.createElement("div")

if (navbar.classList.contains("navbar-auto-transparent")) {
	if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
		navbar.style.background = "var(--navbar-bg)";
	} else {
	
		navbar.style.background = "transparent"
	}
}

window.onscroll = function() {
	if (navbar.classList.contains("navbar-auto-transparent")) {
		if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
			navbar.style.background = "var(--navbar-bg)";
		} else {
	
			navbar.style.background = "transparent"
		}
	}
	if(navbar.classList.contains("navbar-auto-hide")){
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			navbar.style.top = "0";
		} else {
			navbar.style.top = "-100px";
		}
		prevScrollpos = currentScrollPos;
	}
	
}

