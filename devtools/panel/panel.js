
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
const ToggleEdgesAction = 'toggleEdges'

const InitAction = 'init'

const focusDOM = document.querySelector('.focus')
const contextDOM = document.querySelector('.context')

const somControlsDOM = document.createElement('div')
somControlsDOM.setAttribute('class', 'section')
contextDOM.appendChild(somControlsDOM)
const somTitle = document.createElement('h2')
somTitle.setAttribute('class', 'section-title')
somControlsDOM.appendChild(somTitle)
somTitle.innerText = 'Display Modes'

const showImmersiveButton = document.createElement('button')
somControlsDOM.appendChild(showImmersiveButton)
showImmersiveButton.innerText = 'Immersive'
showImmersiveButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: ShowFlatDisplayAction,
		display: 'immersive',
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

const showPortalButton = document.createElement('button')
somControlsDOM.appendChild(showPortalButton)
showPortalButton.innerText = 'Portal'
showPortalButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: ShowFlatDisplayAction,
		display: 'portal',
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

const hideSceneButton = document.createElement('button')
somControlsDOM.appendChild(hideSceneButton)
hideSceneButton.innerText = 'Flat'
hideSceneButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: HideFlatDisplayAction,
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

const styleControlsDOM = document.createElement('div')
styleControlsDOM.setAttribute('class', 'section')
contextDOM.appendChild(styleControlsDOM)
const styleTitle = document.createElement('h2')
styleTitle.setAttribute('class', 'section-title')
styleControlsDOM.appendChild(styleTitle)
styleTitle.innerText = 'Styles'

const getKSSButton = document.createElement('button')
styleControlsDOM.appendChild(getKSSButton)
getKSSButton.innerText = 'KSS'
getKSSButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: GetKSSAction,
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

const getStyleTreeButton = document.createElement('button')
styleControlsDOM.appendChild(getStyleTreeButton)
getStyleTreeButton.innerText = 'Computed Styles'
getStyleTreeButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: GetStyleTreeAction,
		tabId: browser.devtools.inspectedWindow.tabId
	})
})

const toggleEdgesButton = document.createElement('button')
styleControlsDOM.appendChild(toggleEdgesButton)
toggleEdgesButton.innerText = 'Toggle Edges'
toggleEdgesButton.addEventListener('click', ev => {
	browser.runtime.sendMessage({
		action: ToggleEdgesAction,
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
