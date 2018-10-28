# PotassiumES Inspector

A WebExtension for web creators using the [PotassiumES](https://potassiumes.org/) wider web application framework.

So far the tool allows you to:
- quickly switch between flat, portal, and immersive display mode during development
- dump KSS and computed styles for your SOM

You can see an early version of the dev panel [in this demo clip](https://diode.zone/videos/watch/74588c99-7cc7-497b-8471-c13c3411851d)

This is under development and is not yet published to the extension sites.

In the meantime you can load the inspector from disk.

### On Firefox:

	cd potassium-inspector
	zip -r ../potassium-inspector.xpi *

Now drag potassium-inspector.xpi onto any Firefox window

### On Chrome:

Navigate to chrome://extensions/ then click "Load unpacked" and select the potassium-inspector directory.
