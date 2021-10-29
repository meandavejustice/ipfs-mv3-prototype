# IPFS MV3 Prototype

Experimental extension with the goal of testing how much of the feature set from [ipfs-companion](https://github.com/ipfs/ipfs-companion) will fit into the new [manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/) spec.

## declarativeNetRequest_alpha

This branch (`declarativeNetRequest_alpha`) implements `declarativeNetRequest`, the specification's answer to the now removed blocking WebRequest api. It is rather limiting.

Currently this only supports:
* redirects from https://ipfs.io/ => local ipfs nodes(localhost:8080)

