# IPFS MV3 Prototype

Experimental extension with the goal of testing how much of the feature set from [ipfs-companion](https://github.com/ipfs/ipfs-companion) will fit into the new [manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/) spec.

## service_worker_alpha

This branch (`service_worker_alpha`) parses the url the tab update event, tests that it `is-ipfs`, formats the url, and updates the tab with the local IPFS node url.

Currently this only supports:
* redirects from https://ipfs.io/ => local ipfs nodes(localhost:8080)
* redirects from https://dweb.link/ => local ipfs nodes(localhost:8080)

