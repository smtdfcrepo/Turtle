import {createElement as ce_ ,TurtleElement,TurtleListElement} from "./Element/Element.js"
import {TurtleListAttr} from "./Element/ListAttr.js"
import {setBindValue,getBindValue} from "./Binding.js"
import {component} from "./Component/Component.js"
import {} from "./Component/BuiltIn.js"
import {TurtleFormValidate,TurtleFormValidateError} from "./Form.js"
import {ClientInfo} from "./Client.js"
import {TurtleSelector} from "./Selector.js"
import {TurtleRequest,TurtleResponse} from "./HTTP.js"
import {} from "./storage.js"

export const Element = TurtleElement
export const createElement  = ce_
export const ListElement = TurtleListElement
export const ListAttr = TurtleListAttr
export const Component = component
export const Request = TurtleRequest
export const Response = TurtleResponse
export const client = {
	info: ClientInfo,

}
export const binding = {
	set: setBindValue,
	get: getBindValue
}
export const FormValidate = TurtleFormValidate
export const FormValidateError = TurtleFormValidateError
export const Selector = TurtleSelector

window.turtle ={
	Element,
	component,
	createElement,
	ListElement,
	ListAttr,
	Request:TurtleRequest,
	Response:TurtleResponse,
	client,
	binding,
	FormValidate,
	FormValidateError,
	Selector
}
//export const UI = UI_