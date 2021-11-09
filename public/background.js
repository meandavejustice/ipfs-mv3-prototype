// const ipfsHTTPClient = require('ipfs-http-client');
// const { create } = ipfsHTTPClient;

const url = require('url');
const isIPFS = require('is-ipfs');

let lifeline;

keepAlive();

const settings = {
  host: 'localhost',
  port: '8080'
};

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  if (lifeline) lifeline.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  console.log('LOGGING INFO: ', info, info.url, tab);
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }

  if (info.url) {
    var parsedUrl = url.parse(info.url);
    console.log('isIPFS: ', isIPFS.url(info.url));
    
    if (isIPFS.url(info.url) && parsedUrl.host.indexOf(settings.host) === -1) {
      const hostArray = parsedUrl.host.split('.');
      const node = `${settings.host}:${settings.port}`
      parsedUrl.protocol = 'http:';
      hostArray.splice(-2);
      hostArray.push(node);
      const newHost = hostArray.join('.');
      parsedUrl.host = newHost;
      parsedUrl.hostname = newHost;
      const localUrl = url.format(parsedUrl);
      
      console.log('redirected', info.url, 'to', node, localUrl);
      
      chrome.tabs.update({
        url: localUrl
      });
    }
  }
}