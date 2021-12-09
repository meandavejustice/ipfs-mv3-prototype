const browser = require('webextension-polyfill');
const { create } = require('ipfs-http-client');
const IsIpfs = require('is-ipfs');
const check = String.fromCodePoint(0x2714);

let lifeline;
const client = create('http://localhost:5001/api/v0');

browser.runtime.onConnect.addListener(port => {
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
  for (const tab of await browser.tabs.query({ url: '*://*/*' })) {
    try {
      await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => browser.runtime.connect({ name: 'keepAlive' }),
      });
      browser.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  browser.tabs.onUpdated.addListener(retryOnTabUpdate);
}

function isNewTabURL(url) {
  if (!url) return true;
  return url.includes('chrome://');
}

async function resolveDNSAndAddRule(domain) {
  const cid = await client.dns(domain);
  if (!cid) return;

  const id = Math.floor(Math.random() * 29999);
  browser.declarativeNetRequest.updateDynamicRules(
    {
      addRules: [
        {
          "id": id,
          "priority": 1,
          "action": { "type": "redirect", "redirect": { "url": `https://ipfs.io/${cid}` } },
          "condition": { "urlFilter": domain, "resourceTypes": ["main_frame"] }
        }
      ]
    },
    (result) => {console.log(`Added rule ${id}, cid: ${id}, domain: ${domain}. Will redirect to ipfs gateway on next page load ${check}`)}
  );
}

async function clearDynamicRules() {
  browser.declarativeNetRequest.getDynamicRules(
    (rules) => {
      browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map((r) => r.id)
      });
    }
  )
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (isNewTabURL(info.url) || IsIpfs.url(info.url)) return;

  const currentUrl = new URL(info.url);
  await resolveDNSAndAddRule(currentUrl.host);
}

clearDynamicRules();
keepAlive();
