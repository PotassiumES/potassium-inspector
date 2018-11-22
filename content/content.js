if(typeof browser === 'undefined'){
	if(typeof chrome !== 'undefined'){
		browser = chrome
	} else {
		throw new Error('Could not find the WebExtension API')
	}
}

const ContentConstants = {
	GetKSSAction: 'getKSS',
	PutKSSAction: 'putKSS',
	GetStyleTreeAction: 'getStyleTree',
	PutStyleTreeAction: 'putStyleTree',
	ShowFlatDisplayAction: 'showFlatDisplay',
	HideFlatDisplayAction: 'hideFlatDisplay',
	ToggleEdgesAction: 'toggleEdges'
}


function handleRuntimeMessage(data, sender, sendResponse){
	switch(data.action){
		case ContentConstants.GetKSSAction:
		case ContentConstants.GetStyleTreeAction:
		case ContentConstants.ShowFlatDisplayAction:
		case ContentConstants.HideFlatDisplayAction:
		case ContentConstants.ToggleEdgesAction:
			window.postMessage(data, "*")
			break
	}
}
browser.runtime.onMessage.addListener(handleRuntimeMessage); 


function handleWindowMessage(event){
	switch(event.data.action){
		case ContentConstants.PutKSSAction:
			browser.runtime.sendMessage({
				action: ContentConstants.PutKSSAction,
				kss: event.data.kss
			})
			break
		case ContentConstants.PutStyleTreeAction:
			browser.runtime.sendMessage({
				action: ContentConstants.PutStyleTreeAction,
				tree: event.data.tree
			})
			break
	}
}
window.addEventListener("message", handleWindowMessage)
