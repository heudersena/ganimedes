"use strict";var o=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var i=(r,e)=>{for(var t in e)o(r,t,{get:e[t],enumerable:!0})},m=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of s(e))!u.call(r,n)&&n!==t&&o(r,n,{get:()=>e[n],enumerable:!(a=c(e,n))||a.enumerable});return r};var b=r=>m(o({},"__esModule",{value:!0}),r);var g={};i(g,{CurrencyToIntegerTransformationGetDatabase:()=>T,CurrencyToIntegerTransformationInsertToDatabase:()=>y});module.exports=b(g);var y=r=>r*100,T=r=>r.toLocaleString("pt-br",{style:"currency",minimumFractionDigits:2,currency:"BRL"});0&&(module.exports={CurrencyToIntegerTransformationGetDatabase,CurrencyToIntegerTransformationInsertToDatabase});