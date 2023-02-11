!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.turtle=t():e.turtle=t()}(this,(function(){return(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function r(e=[],t=[]){e.forEach(((e,r)=>{if("pass"!=e&&!function(e=[],t){let r=!1;return e.forEach((e=>{"string"==typeof e?e==typeof t&&(r=!0):"function"!=typeof e&&"function"!=typeof e||t instanceof e&&(r=!0)})),!!r}(e,t[r]))throw`The argument at position ${r} must be: ${function(){let t="";return e.forEach(((r,n)=>{t+="string"==typeof r?r:r.name,n<e.length-1&&(t+=" , ")})),t}()}`}))}e.r(t),e.d(t,{Component:()=>y,Element:()=>w,FormValidate:()=>L,FormValidateError:()=>T,ListAttr:()=>f,ListElement:()=>E,Request:()=>b,Response:()=>v,Selector:()=>S,binding:()=>R,client:()=>_,createElement:()=>p});class n{constructor(e,t){r([[HTMLElement,NamedNodeMap]],[e,t]),this.list=t,this.owner=e}each(e){r([[Function,"number"]],[e]);for(var t=0;t<this.list.length;t++)e(this.list[t],t)}set(e,t){this.owner.setAttribute(e,t)}get(e){return this.owner.getAttribute(e)}}class s{constructor(e){r([[HTMLElement,s]],[e]),this.dom=e}attr(){return new n(this.dom,this.dom.attributes)}destroy(){this.dom.remove()}on(e,t){r(["pass",["function"]],[e,t]),this.dom.addEventListener(e,t)}select(e){let t=this.dom.querySelector(e);if(null==t)throw"Cannot find element !";return new s(t)}selectAll(e){let t=this.dom.querySelectorAll(e);return new o(t)}child(){return new o(this.dom.childNodes)}set value(e){this.dom.value=e}get value(){return this.dom.value}set text(e){this.dom.textContent=e}get text(){return this.dom.textContent}set html(e){this.dom.innerHTML=e}get html(){return this.dom.innerHTML}get classList(){return this.dom.classList}set id(e){this.dom.id=e}get id(){return this.dom.id}get classList(){return this.dom.classList}computedStyle(e){return getComputedStyle(this.dom,e)}get style(){return this.dom.style}set disabled(e){this.dom.disabled=e}get disabled(){return this.dom.disabled}set type(e){this.dom.type=e}get type(){return this.dom.type}get tag(){return this.dom.tagName}}class o{constructor(e){r([[NodeList,HTMLCollection]],[e]),this.list=e}each(e){r([["function"]],[e]),this.list.forEach((t=>{e(new s(t))}))}}async function i(e,t){window.turtle_bind_values[e]=t,document.querySelectorAll(`[data-bind="${e}"]`).forEach((e=>{let r=e.dataset.bindto;r&&r.split(",").forEach((r=>{e[r]=t}))}))}window.turtle_bind_values={},window.addEventListener("input",(function(e){let t=e.target;var r;t.dataset.bind&&i(t.dataset.bind,(r=t)instanceof HTMLInputElement&&("checkbox"==r.type||"radio"==r.type)?r.checked:r.value)})),window.turtle_states={};class a extends HTMLElement{constructor(){super()}onRendered(){}setState(e,t){window.turtle_states[this.id][e]=t,this.onStateUpdate(),this.rerender&&(null==this.renderDependent||this.renderDependent.includes(e))&&this.#e()}get state(){return window.turtle_states[this.id]}#e(){this.#t(),this.onRerender()}#t(){this.innerHTML=this.render(),this.onRendered()}requestRerender(){this.#e()}onMount(){}onUnmount(){}onRerender(){}onStateUpdate(){}render(){return"this is component"}connectedCallback(){this.id=`_${Date.now()}`,window.turtle_states[this.id]={},this.renderDependent=null,this.rerender=!0,this.props={props:this.attributes,set:function(e,t){let r=this.props.removeNamedItem(e);r.value=t,this.props.setNamedItem(r)},get:function(e){return this.props.getNamedItem(e).value}},this.onMount(),this.#t()}disconnectedCallback(){delete window.turtle_states[this.id],this.onUnmount()}}class l{constructor(e=document){this.root=e}getById(e){let t=this.root.getElementById(e);if(null==t)throw"Cannot find element !";return new s(t)}getByClassName(e){let t=this.root.getElementsByClassName(e);return new o(t)}getByTagName(e){let t=this.root.getElementsByTagName(e);return new o(t)}getByName(e){let t=this.root.getElementsByName(e);return new o(t)}select(e){let t=this.root.querySelector(e);if(null==t)throw"Cannot find element !";return new s(t)}selectAll(e){let t=this.root.querySelectorAll(e);return new o(t)}}function d(e,t){return"function"==typeof e?e(t):e}const u=new l;class h{constructor(e,t,r,n,s,o){this.name=e,this.msg=t,this.field=r,this.query=n,this.rule=s,this.value=o}}const c={appName:window.navigator.appName,appCodeName:window.navigator.appCodeName,appVersion:window.navigator.appVersion,javaEnabled:window.navigator.javaEnabled(),vendor:window.navigator.vendor,vendorSub:window.navigator.vendorSub,network:window.navigator.connection,hardwareConcurrency:window.navigator.hardwareConcurrency,maxTouchPoints:window.navigator.maxTouchPoints,platform:window.navigator.platform,product:window.navigator.product,productSub:window.navigator.productSub,lang:window.navigator.language,webdriver:window.navigator.webdriver,batteryLevel:0};!async function(){let e=await window.navigator.getBattery();e.onlevelchange=function(){c.batteryLevel=100*e.level,c.batteryCharging=e.charging},c.batteryLevel=100*e.level,c.batteryCharging=e.charging}();class m{constructor(e,t,r={}){this.url=e,this.method=t,this.options=r,this.headers={},this.timeout=500,this.controller=new AbortController,this.signal=this.controller.signal}cancel(){this.controller.abort()}send(){return new Promise(((e,t)=>{let r={method:this.method,headers:this.headers,signal:this.signal};if(fetch(this.url,r).then((t=>{e(new g(t))})),this.timeout){let e=setTimeout((()=>{this.cancel(),t({msg:"Failed to fetch ! Request timeout"}),clearTimeout(e)}),this.timeout)}}))}setHeader(e,t){this.headers[e]=t}}class g{constructor(e){this.response=e}get status(){return this.response.status}get success(){return 1==this.response.ok}async text(){return await this.response.text()}async json(){return await this.response.json()}async blob(){return await this.response.blob()}get URL(){return this.response.url}get headers(){return this.response.headers}}const w=s,p=function(e){return new s(document.createElement(e))},E=o,f=n,y=a,b=m,v=g,_={info:c},R={set:i,get:function(e){return window.turtle_bind_values[e]}},L=class{constructor(e){this.form=u.select(e),this.selector=new l(this.form.dom),this.rules={},this.defaultMsg={}}setRule(e){this.rules=e}handleError(e){console.warn("⚠️ Warning : Cannot handle error ! "),console.log(e)}triggerError(e){this.handleError(e)}validate(){return new Promise(((e,t)=>{Object.keys(this.rules).forEach((t=>{let r=this.selector.select(t),n=r.value,s=this.rules[t];Object.keys(s).forEach((e=>{let o=new h("","",r,t,e,n),i=s[e];if("required"==e)""==n&&i.required&&(o.name="ERR_VALUE_EMPTY",o.msg=d(i.onEmptyErr,o),this.triggerError(o));else if("length"==e)i.min&&n.length<i.mim&&(o.name="ERR_FIELD_TOO_SHORT",o.msg=d(i.onFieldTooShortErr,o),this.triggerError(o)),i.max&&n.length>i.max&&(o.name="ERR_FIELD_TOO_LONG",o.msg=d(i.onFieldTooLongErr,o),this.triggerError(o));else if("pattern"==e)i.pattern&&(i.pattern.test(n)||(o.name="ERR_VALUE_OF_FIELD_NOT_MATCHES",o.msg=d(i.onNotMatchesErr,o),this.triggerError(o)));else if("type"==e){if(i.name)switch(i.name){case"number":!isNaN(n)||(o.name="ERR_FIELD_MUST_BE_NUMBER",o.msg=d(i.onTypeErr,o),this.triggerError(o));break;case"email":/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)||(o.name="ERR_FIELD_MUST_BE_EMAIL",o.msg=d(i.onTypeErr,o),this.triggerError(o));break;case"url":(function(e){try{return new URL(e),!0}catch(e){return!1}})(n)||(o.name="ERR_FIELD_MUST_BE_URL",o.msg=d(i.onTypeErr,o),this.triggerError(o));break;case"json":(function(e){try{return JSON.parse(e),!0}catch(e){return!1}})(n)||(o.name="ERR_FIELD_MUST_BE_JSON",o.msg=d(i.onTypeErr,o),this.triggerError(o))}}else if("equality"==e)i.value&&i.value!=n&&(o.name="ERR_VALUE_OF_FIELD_INCORRECT",o.msg=d(i.onIncorrectErr,o),this.triggerError(o));else{if("include"!=e)throw`Unknown rule name : '${e}' !`;i.values&&(i.values.includes(n)||(o.name="ERR_VALUE_OF_FIELD_NOT_MATCHES",o.msg=d(i.onWeakPasswordErr,o),this.triggerError(o)))}})),e({})}))}))}},T=h,S=l;return window.turtle={Element:w,Component:y,createElement:p,ListElement:E,ListAttr:f,Request:m,Response:g,client:_,binding:R,FormValidate:L,FormValidateError:T,Selector:S},t})()}));