!function(){"use strict";var n={811:function(n,o){Object.defineProperty(o,"__esModule",{value:!0}),o.main=void 0;const e=[["q","w","a"],["a","b"],["a","c"],["q","e"],["q","r"]];o.main=function(){const n=function(n){const o=new Map;return n.forEach((n=>{n.forEach((n=>{let e=o.get(n);e?(e+=1,o.set(n,e)):o.set(n,1)}))})),o}(e);console.log(n);const o=new Map([...n.entries()].sort(((n,o)=>o[1]-n[1])));console.log(o);const t=(r=o,new Map([...r].filter((([n,o])=>o>=1))));var r;console.log(t);const s=function(n,o){const e=[];return n.forEach((n=>{e.push(function(n,o){const e=n.slice(),t=Array.from(o.keys());return e.sort(((n,o)=>t.indexOf(n)-t.indexOf(o))),e}(n,o))})),e}(e,t);console.log(s)}}},o={};(0,function e(t){var r=o[t];if(void 0!==r)return r.exports;var s=o[t]={exports:{}};return n[t](s,s.exports,e),s.exports}(811).main)()}();