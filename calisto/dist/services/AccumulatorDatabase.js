"use strict";var o=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var x=(r,t)=>{for(var e in t)o(r,e,{get:t[e],enumerable:!0})},d=(r,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of p(t))!f.call(r,n)&&n!==e&&o(r,n,{get:()=>t[n],enumerable:!(i=m(t,n))||i.enumerable});return r};var l=r=>d(o({},"__esModule",{value:!0}),r);var y={};x(y,{AccumulatorDatabase:()=>c});module.exports=l(y);var u=require("@prisma/client"),a=new u.PrismaClient({});a.$disconnect();var s=(r,t=!1,e="")=>({data:r,error:t,errorMessage:e});var c=class{static async DatabaseMethodCreation(t){try{let e=await a.accumulator_bonus.create({data:{bonus_amount:0,profile_id:t}});return s(e)}catch(e){return s([],!0,e)}}};0&&(module.exports={AccumulatorDatabase});