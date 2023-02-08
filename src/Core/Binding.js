window.turtle_bind_values = {}

export function getBindValue(name) {
	return window.turtle_bind_values[name]
}

function getValue(element) {
	if (element instanceof HTMLInputElement && (element.type == "checkbox" || element.type == "radio")) {
		let state = element.checked
		return state
	} else {
		return element.value
	}
}

export async function setBindValue(name, value) {
	window.turtle_bind_values[name] = value
	document.querySelectorAll(`[data-bind="${name}"]`).forEach((element) => {
		let bindToAttr = element.dataset.bindto
		if (bindToAttr) {
			bindToAttr.split(",").forEach((attr) => {
				element[attr] = value
			})
		}
	})
}


window.addEventListener("input", function(e) {
	let target = e.target
	if (target.dataset.bind) {
		setBindValue(target.dataset.bind, getValue(target))
	}
})