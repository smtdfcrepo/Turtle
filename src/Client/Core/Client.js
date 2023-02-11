export const ClientInfo = {
	appName: window.navigator.appName,
	appCodeName: window.navigator.appCodeName,
	appVersion: window.navigator.appVersion,
	javaEnabled: window.navigator.javaEnabled(),
	vendor: window.navigator.vendor,
	vendorSub: window.navigator.vendorSub,
	network: window.navigator.connection,
	hardwareConcurrency: window.navigator.hardwareConcurrency,
	maxTouchPoints: window.navigator.maxTouchPoints,
	platform: window.navigator.platform,
	product: window.navigator.product,
	productSub: window.navigator.productSub,
	lang: window.navigator.language,
	webdriver: window.navigator.webdriver,
	batteryLevel: 0,
}


async function getBattery() {
	let info = await window.navigator.getBattery()
	info.onlevelchange = function() {
		ClientInfo.batteryLevel = info.level * 100
		ClientInfo.batteryCharging = info.charging
	}
	ClientInfo.batteryLevel = info.level*100
	ClientInfo.batteryCharging = info.charging
}

getBattery()