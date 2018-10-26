
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
const InitAction = 'init'

const focusDOM = document.querySelector('.focus')
const contextDOM = document.querySelector('.context')

const showImmersiveButton = document.createElement('button')
contextDOM.appendChild(showImmersiveButton)
showImmersiveButton.innerText = 'Immersive Scene'
showImmersiveButton.addEventListener('click', ev => {
	browser.devtools.inspectedWindow.eval('app.toggleFlatDisplay()')
})

const showPortalButton = document.createElement('button')
contextDOM.appendChild(showPortalButton)
showPortalButton.innerText = 'Portal Scene'
showPortalButton.addEventListener('click', ev => {
	browser.devtools.inspectedWindow.eval('app.toggleFlatDisplay(null, false)')
})

const getKSSButton = document.createElement('button')
contextDOM.appendChild(getKSSButton)
getKSSButton.innerText = 'KSS'
getKSSButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: GetKSSAction,
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

const getStyleTreeButton = document.createElement('button')
contextDOM.appendChild(getStyleTreeButton)
getStyleTreeButton.innerText = 'Computed Styles'
getStyleTreeButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: GetStyleTreeAction,
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

function handleRuntimeMessage(request, sender, sendResponse) { 
	switch(request.action){
		case PutKSSAction:
			document.querySelector('.focus').innerHTML = request.kss
			document.querySelector('.focus').setAttribute('data-content', 'kss')
			break
		case PutStyleTreeAction:
			document.querySelector('.focus').innerHTML = request.tree
			document.querySelector('.focus').setAttribute('data-content', 'style-tree')
			break
	}
}
browser.runtime.onMessage.addListener(handleRuntimeMessage);


// Request that the background script insert content.js into the inspected window
browser.runtime.sendMessage({
	action: InitAction,
	tabId: browser.devtools.inspectedWindow.tabId
})
