if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-e4307c29"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-4df9b0a1.css",revision:null},{url:"assets/index-90b54030.js",revision:null},{url:"index.html",revision:"e2416fa8985ecacb3fd492c6456c8887"},{url:"registerSW.js",revision:"b8c0cae0e3c5cb28df0f68e7473f7387"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
