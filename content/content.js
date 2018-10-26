if(typeof browser === 'undefined'){
	if(typeof chrome !== 'undefined'){
		browser = chrome
	} else {
		throw new Error('Could not find the WebExtension API')
	}
}

const GetKSSAction = 'getKSS'
const PutKSSAction = 'putKSS'
const GetStyleTreeAction = 'getStyleTree'
const PutStyleTreeAction = 'putStyleTree'

function handleRuntimeMessage(data, sender, sendResponse){
	switch(data.action){
		case GetKSSAction:
			window.postMessage({
				action: GetKSSAction
			}, "*")
			break
		case GetStyleTreeAction:
			window.postMessage({
				action: GetStyleTreeAction
			}, "*")
			break
	}
}
browser.runtime.onMessage.addListener(handleRuntimeMessage); 


function handleWindowMessage(event){
	switch(event.data.action){
		case PutKSSAction:
			browser.runtime.sendMessage({
				action: PutKSSAction,
				kss: event.data.kss
			})
			break
		case PutStyleTreeAction:
			browser.runtime.sendMessage({
				action: PutStyleTreeAction,
				tree: event.data.tree
			})
			break
	}
}
window.addEventListener("message", handleWindowMessage)
