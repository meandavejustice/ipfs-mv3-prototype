# IPFS-MV3-Prototype

This is an exploration into the limitations of [manifest v3]().

So far there are 2 branches exploring different options of forwarding IPFS traffic to local nodes.

* [service_worker_alpha](https://github.com/meandavejustice/ipfs-mv3-prototype/tree/service_worker_alpha)
* [declarativeNetRequest_alpha](https://github.com/meandavejustice/ipfs-mv3-prototype/tree/declarativeNetRequest_alpha)


## Releases
To save time there is a release created for `declarativeNetRequest_alpha`, `service_worker_alpha` will need to be pulled down and run `yarn build` to install.


## Browser support for Manifest V3

| Browser           | Supported        | Planned           | links  |
| ----------------- | ---------------- | ----------------  |------- |
| Chrome            |:heavy_check_mark:|:heavy_check_mark: | [:link:][Chrome-MV3]
| Firefox           |:heavy_check_mark:|:heavy_check_mark: | [:link:][Firefox-MV3]
| Safari            |:x:               |:heavy_check_mark: | [:link:][Safari-MV3]


[Chrome-MV3]: https://developer.chrome.com/docs/extensions/mv3/intro/
[Firefox-MV3]: https://blog.mozilla.org/addons/2021/05/27/manifest-v3-update/
[Safari-MV3]: https://developer.apple.com/forums/thread/685530
