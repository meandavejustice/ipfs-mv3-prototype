# IPFS-MV3-Prototype

Experimental extension with the goal of testing how much of the feature set from ipfs-companion will fit into the new manifest v3 spec.

## dnslink

This branch proves functionality of dnslink redirects.
On the first time seeing a new url that matches our criteria, we check to see if it is a dnslink url, if so, we create a new rule using the declarativeNetRequest api. The next time the browser sees that domain, it will redirect to the user's local node.

#### _Note on IPFS HTTP API_

Since we are no longer able to modify request headers in MV3, we need to set the AccessControlAllowOrigin in our local ipfs node config. (you will need to replace the chrome-extension id with your own.)

```
	"API": {
		"HTTPHeaders": {
			"Access-Control-Allow-Methods": [
				"PUT",
				"GET",
				"POST"
			],
			"Access-Control-Allow-Origin": [
				"chrome-extension://gdiahefjcggefcmjpdbahjpipenonllk",
				"webui://-",
				"http://localhost:3000",
				"http://127.0.0.1:5001",
				"https://webui.ipfs.io"
			]
		}
	},
```
