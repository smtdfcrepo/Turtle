export function checkType(types = [], arg) {
	let passed = false
	types.forEach((type) => {

		if (typeof type == "string") {
			if (type == typeof arg) {
				passed = true
			}
		} else if (typeof type == "function" || typeof type == "function") {
			if (arg instanceof type) {
				passed = true
			}
		}
	})
	if (!passed) {
		return false
	}
	return true
}


export function checkTypeOfArgs(types = [], args = []) {
	types.forEach((t, i) => {
		if (t != "pass") {
			if (!checkType(t, args[i])) {
				throw `The argument at position ${i} must be: ${function() {
					let r = ""; t.forEach((u, k)=> {
						r += typeof u == "string" ? u: u.name; if (k < (t.length -1)) {
							r += " , ";
						}
					}); return r
				}()}`
			}
		}
	})
}