import {component} from "./Component.js"
component({
	name:"t-eval",
	onMount:function(){
		this.renderDependents = []
		this.setState("expr",this.props.get("expr"))
	},
	render:function(){
		return `${eval(this.state.expr)}`
	}
})