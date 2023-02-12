import {TurtleElement} from "./Element/Element.js"
import {TurtleSelector} from "./Selector.js"
import {checkTypeOfArgs} from "./utils.js"

function isJSON(string) {
	try {
		JSON.parse(string)
		return true
	} catch (e) {
		return false
	}
}

function isValidUrl(string) {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}

function isNull(str) {
	return str == ""
}

function isNumber(str) {
	return !isNaN(str)
}

function includeSymbols(str) {
	let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return format.test(str)
}

function count_string_occurrenc(str, count) {
	return str.split(count).length - 1;
}

function countDigitsInString(str) {
	return str.replace(/[^0-9]/g, '').length;
}

function validateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
		return true
	}
	return false
}

/*
{
  ...
  "<field query>":{
    ...
    "<rule name>":{
      ...
      <attr>:<value>
      ...
    }
    ...
  }
  ..
}

*/

function getErrorHandler(d, err) {
	if (typeof d == "function") {
		return d(err)
	} else {
		return d
	}
}


const Selector = new TurtleSelector()
export class TurtleFormValidateError {
	constructor(name, msg, field, query, rule, value) {
		this.name = name
		this.msg = msg
		this.field = field
		this.query = query
		this.rule = rule
		this.value = value
	}
}

export class TurtleFormValidate {
	constructor(form) {
		this.form = Selector.select(form)
		this.selector = new TurtleSelector(this.form.dom)
		this.rules = {}
		this.defaultMsg = {}
	}

	setRule(rules) {
		this.rules = rules
	}
	handleError(err) {
		console.warn("⚠️ Warning : Cannot handle error ! ")
		console.log(err);
	}

	triggerError(err) {
		this.handleError(err)
	}

	validate() {
		return new Promise((resolve, reject) => {
			Object.keys(this.rules).forEach((field_query) => {
				let field = this.selector.select(field_query)
				let field_value = field.value
				let field_rules = this.rules[field_query]
				Object.keys(field_rules).forEach((rule) => {
					let err = new TurtleFormValidateError("", "", field, field_query, rule, field_value)
					let rule_value = field_rules[rule]
					if (rule == "required") {
						if (isNull(field_value)) {
							if (rule_value.required) {
								err.name = "ERR_VALUE_EMPTY"
								err.msg = getErrorHandler(rule_value.onEmptyErr, err)
								this.triggerError(err)
							}
						}
					} else if (rule == "length") {
						if (rule_value.min) {
							if (field_value.length < rule_value.mim) {
								err.name = "ERR_FIELD_TOO_SHORT"
								err.msg = getErrorHandler(rule_value.onFieldTooShortErr, err)
								this.triggerError(err)
							}
						}

						if (rule_value.max) {
							if (field_value.length > rule_value.max) {
								err.name = "ERR_FIELD_TOO_LONG"
								err.msg = getErrorHandler(rule_value.onFieldTooLongErr, err)
								this.triggerError(err)
							}
						}
					} else if (rule == "pattern") {
						if (rule_value.pattern) {
							if (!(rule_value.pattern.test(field_value))) {
								err.name = "ERR_VALUE_OF_FIELD_NOT_MATCHES"
								err.msg = getErrorHandler(rule_value.onNotMatchesErr, err)
								this.triggerError(err)
							}
						}
					} else if (rule == "type") {
						if (rule_value.name) {
							switch (rule_value.name) {
								case "number":
									if (!isNumber(field_value)) {
										err.name = "ERR_FIELD_MUST_BE_NUMBER"
										err.msg = getErrorHandler(rule_value.onTypeErr, err)
										this.triggerError(err)
									}
									break;

								case "email":
									if (!validateEmail(field_value)) {
										err.name = "ERR_FIELD_MUST_BE_EMAIL"
										err.msg = getErrorHandler(rule_value.onTypeErr, err)
										this.triggerError(err)
									}
									break;

								case "url":
									if (!isValidUrl(field_value)) {
										err.name = "ERR_FIELD_MUST_BE_URL"
										err.msg = getErrorHandler(rule_value.onTypeErr, err)
										this.triggerError(err)
									}
									break
								case "json":
									if (!isJSON(field_value)) {
										err.name = "ERR_FIELD_MUST_BE_JSON"
										err.msg = getErrorHandler(rule_value.onTypeErr, err)
										this.triggerError(err)
									}
									break
							}
						}
					} else if (rule == "equality") {
						if (rule_value.value) {
							if (!(rule_value.value == field_value)) {
								err.name = "ERR_VALUE_OF_FIELD_INCORRECT"
								err.msg = getErrorHandler(rule_value.onIncorrectErr, err)
								this.triggerError(err)
							}
						}
					} else if (rule == "include") {
						if (rule_value.values) {
							if (!(rule_value.values.includes(field_value))) {
								err.name = "ERR_VALUE_OF_FIELD_NOT_MATCHES"
								err.msg = getErrorHandler(rule_value.onWeakPasswordErr, err)
								this.triggerError(err)
							}
						}
					} else {
						throw `Unknown rule name : '${rule}' !`
					}
				})
				resolve({})
			})
		})
	}
}