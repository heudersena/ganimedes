"use strict";var n=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var E=Object.prototype.hasOwnProperty;var I=(i,r)=>{for(var t in r)n(i,t,{get:r[t],enumerable:!0})},O=(i,r,t,m)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of g(r))!E.call(i,o)&&o!==t&&n(i,o,{get:()=>r[o],enumerable:!(m=a(r,o))||m.enumerable});return i};var c=i=>O(n({},"__esModule",{value:!0}),i);var b={};I(b,{ExceptionProfileStoreValidation:()=>P});module.exports=c(b);var e=require("zod"),s="ESSE CAMPO \xC9 OBRIGAT\xD3RIO PREENCHER";var P=(0,e.object)({body:(0,e.object)({phone:(0,e.string)({required_error:s}).trim().min(1,s),keyPix:(0,e.string)().trim().min(1,s)})});0&&(module.exports={ExceptionProfileStoreValidation});
