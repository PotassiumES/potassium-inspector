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
const ShowFlatDisplayAction = 'showFlatDisplay'
const HideFlatDisplayAction = 'hideFlatDisplay'
const InitAction = 'init'

function handleRuntimeMessage(request, sender, sendResponse) { 
	if (sender.url === browser.runtime.getURL("/devtools/panel/panel.html")) {
		handlePanelRuntimeMessage(request, sender, sendResponse)
	} else {
		handlePageRuntimeMessage(request, sender, sendResponse)
	}
}
browser.runtime.onMessage.addListener(handleRuntimeMessage);

function handlePageRuntimeMessage(request, sender, sendResponse){
	switch(request.action){
		case PutKSSAction:
			browser.runtime.sendMessage({
				kss: request.kss,
				action: PutKSSAction
			})	
			break
		case PutStyleTreeAction:
			browser.runtime.sendMessage({
				tree: request.tree,
				action: PutStyleTreeAction
			})	
			break
	}
}

function handlePanelRuntimeMessage(request, sender, sendResponse){
	if(typeof request.action === undefined){
		console.error('Unknown panel request', request, sender, sendResponse)
		return
	}
	switch(request.action){
		case GetKSSAction:
		case GetStyleTreeAction:
		case ShowFlatDisplayAction:
		case HideFlatDisplayAction:
			relayActionToTab(request)
			break
		case InitAction:
			handleInitAction(request)
			break
		default:
			console.error('unknown action', request)
	}
}

function relayActionToTab(data){
	browser.tabs.sendMessage(data.tabId, data)
}

function handleInitAction(data){
	browser.tabs.executeScript(data.tabId, {
		file: '/content/content.js'
	})
}

browser.webNavigation.onDOMContentLoaded.addListener(ev => {
	// Request that the background script insert content.js into the inspected window	
	handleInitAction({
		tabId: ev.tabId
	})
})
