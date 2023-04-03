"use strict";var C=Object.create;var S=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,T=Object.prototype.hasOwnProperty;var U=(n,t)=>{for(var e in t)S(n,e,{get:t[e],enumerable:!0})},l=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of L(t))!T.call(n,r)&&r!==e&&S(n,r,{get:()=>t[r],enumerable:!(s=N(t,r))||s.enumerable});return n};var m=(n,t,e)=>(e=n!=null?C(M(n)):{},l(t||!n||!n.__esModule?S(e,"default",{value:n,enumerable:!0}):e,n)),f=n=>l(S({},"__esModule",{value:!0}),n);var P={};U(P,{keycloakAuthenticationMidleware:()=>k,keycloakRolesMidlleware:()=>d});module.exports=f(P);var A=m(require("keycloak-connect/middleware/auth-utils/token")),I=m(require("keycloak-connect/middleware/auth-utils/signature"));var i=n=>n,o=function(n,t,e=!1){return{error:e,content:n,message:t}};var d=n=>(t,e,s)=>{var E,O,a,_,g;let r=(E=t.headers)==null?void 0:E.authorization;if(!r)return e==null?void 0:e.json(o([],i("Bearer token fail"),!0));let[,R]=r.split(" ");if(!R)return e==null?void 0:e.json(o([],i("Bearer token invalid"),!0));try{let c=new A.default(R,process.env.KEYCLOAK_CLIENT_ID);return(a=(O=c.content)==null?void 0:O.realm_access)!=null&&a.roles.ROLE_ADMINISTRATOR||((g=(_=c.content)==null?void 0:_.realm_access)==null?void 0:g.roles.map(u=>u).some(u=>n.includes(u)))?s():e.json(o([],i("VOC\xCA N\xC3O TEM PERMISS\xC3O"),!0))}catch(c){e.json(o([],i(c.message),!0))}},k=(n,t,e)=>{var R;let s=(R=n.headers)==null?void 0:R.authorization;if(!s)return t==null?void 0:t.json(o([],i("Bearer token fail"),!0));let[,r]=s.split(" ");if(!r)return t==null?void 0:t.json(o([],i("Bearer token invalid"),!0));try{let E=new A.default(r,process.env.KEYCLOAK_CLIENT_ID);if(E.content.exp==0)return t==null?void 0:t.status(400).json(o([],i("token invalid"),!0));let O=new I.default({realmUrl:process.env.KEYCLOAK_REALM_URL,publicKey:process.env.KEYCLOAK_PUBLIC_KEY,minTimeBetweenJwksRequests:0});try{O.verify(E,null).then(a=>{n.user=a,e()}).catch(a=>(console.log(a),t.json(o([],i(a.message),!0))))}catch(a){return t.json(o([],i(a.message),!0))}}catch(E){t.json(o([],i(E.message),!0))}};0&&(module.exports={keycloakAuthenticationMidleware,keycloakRolesMidlleware});