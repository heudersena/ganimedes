"use strict";var s=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var l=(n,t)=>{for(var r in t)s(n,r,{get:t[r],enumerable:!0})},u=(n,t,r,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let e of p(t))!d.call(n,e)&&e!==r&&s(n,e,{get:()=>t[e],enumerable:!(c=m(t,e))||c.enumerable});return n};var w=n=>u(s({},"__esModule",{value:!0}),n);var x={};l(x,{WithDrawDatabaseManagement:()=>o});module.exports=w(x);var f=require("@prisma/client"),i=new f.PrismaClient({});i.$disconnect();var a=(n,t=!1,r="")=>({data:n,error:t,errorMessage:r});var o=class{static async index(){let t=await i.withdrawal.findMany();return a(t,!1,"")}static async getBayId(t){let r=await i.withdrawal.findFirst({where:{id:t}});return a(r,!1,"")}};0&&(module.exports={WithDrawDatabaseManagement});