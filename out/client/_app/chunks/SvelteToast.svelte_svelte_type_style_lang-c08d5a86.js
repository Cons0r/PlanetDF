var m=Object.defineProperty,v=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var d=(n,t,a)=>t in n?m(n,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[t]=a,r=(n,t)=>{for(var a in t||(t={}))h.call(t,a)&&d(n,a,t[a]);if(_)for(var a of _(t))x.call(t,a)&&d(n,a,t[a]);return n},u=(n,t)=>v(n,b(t));import{w as y}from"./index-3d7e81ac.js";const g={duration:4e3,initial:1,next:0,pausable:!1,dismissable:!0,reversed:!1,intro:{x:256}},T=()=>{const{subscribe:n,update:t}=y([]);let a=0;const p={},f=e=>e instanceof Object;return{subscribe:n,push:(e,o={})=>{const c=r({target:"default"},f(e)?e:u(r({},o),{msg:e})),s=p[c.target]||{},l=u(r(r(r({},g),s),c),{theme:r(r({},s.theme),c.theme),classes:[...s.classes||[],...c.classes||[]],id:++a});return t(i=>l.reversed?[...i,l]:[l,...i]),a},pop:e=>{t(o=>{if(!o.length||e===0)return[];if(f(e))return o.filter(s=>e(s));const c=e||Math.max(...o.map(s=>s.id));return o.filter(s=>s.id!==c)})},set:(e,o={})=>{const c=f(e)?r({},e):u(r({},o),{id:e});t(s=>{const l=s.findIndex(i=>i.id===c.id);return l>-1&&(s[l]=r(r({},s[l]),c)),s})},_init:(e="default",o={})=>(p[e]=o,p)}},k=T();export{k as t};