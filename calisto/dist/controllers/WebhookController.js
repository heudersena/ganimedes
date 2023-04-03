"use strict";var O=Object.create;var m=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var C=(o,t)=>{for(var e in t)m(o,e,{get:t[e],enumerable:!0})},b=(o,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of T(t))!v.call(o,a)&&a!==e&&m(o,a,{get:()=>t[a],enumerable:!(i=E(t,a))||i.enumerable});return o};var w=(o,t,e)=>(e=o!=null?O(R(o)):{},b(t||!o||!o.__esModule?m(e,"default",{value:o,enumerable:!0}):e,o)),k=o=>b(m({},"__esModule",{value:!0}),o);var A={};C(A,{WebhookController:()=>g});module.exports=k(A);var y=require("@prisma/client"),s=new y.PrismaClient({});s.$disconnect();var u=w(require("mercadopago")),P=w(require("dayjs"));u.default.configurations.setAccessToken(String(process.env.MERCADO_PAGO_KEY_PROD));var p=class{static async CreatePayment(t){var e;try{let i={transaction_amount:t.transaction_amount,payment_method_id:t.payment_method_id,payer:{email:t.payer.email},installments:1,date_of_expiration:String((0,P.default)(new Date).add(6,"minutes").format("YYYY-MM-DDTHH:mm:ss.000ZZ"))};return await((e=u.default.payment)==null?void 0:e.save(i))}catch(i){return i}}static async GetPayment(t){try{return await u.default.payment.findById(t)}catch(e){return e}}};var l=class{static async WebHook(t,e){let i=t,a=await this.InternalFunctionMercadoPagoGetTransactionId(i),r=await p.GetPayment(Number(i));if((a==null?void 0:a.m_status)!=="approved"){try{switch(e){case"payment.updated":if(r.response.status_detail==="expired"){let c=await s.mercadoPago.update({where:{id:a==null?void 0:a.id},data:{m_action:"updated",m_status:r.response.status,m_status_detail:r.response.status_detail,m_net_received_amount:r.response.transaction_details.net_received_amount,m_transaction_id:r.response.transaction_details.transaction_id??"NULL"}});await s.transaction.update({where:{id:c.transaction_id},data:{mercado_pago_transaction_status:r.response.status}})}else{let c=await s.mercadoPago.update({where:{id:a==null?void 0:a.id},data:{m_action:"updated",m_status:r.response.status,m_status_detail:r.response.status_detail,m_net_received_amount:r.response.transaction_details.net_received_amount,m_transaction_id:r.response.transaction_details.transaction_id??"NULL"}}),n=await s.transaction.update({where:{id:c.transaction_id},data:{mercado_pago_transaction_status:r.response.status}});console.log("transaction_update=>",n);let d=await s.accumulator_bonus.findFirst({where:{profile_id:n.profile_id}});console.log("acc_bonus=>",d);let f=Number(d==null?void 0:d.bonus_amount)+Number(n.bonus);console.log("TOTAL BONUS: ",f);let M=await s.accumulator_bonus.update({where:{profile_id:n.profile_id},data:{bonus_amount:f}});console.log("finish=> ",M);let _=await s.profile.findFirst({where:{id:n==null?void 0:n.profile_id}}),h=n==null?void 0:n.balance,I=_==null?void 0:_.balance,x=Number(h)+Number(I),N=await s.profile.update({where:{id:n==null?void 0:n.profile_id},data:{balance:x}});console.log("PROFILE::BALANCE:: ",N)}break;default:console.log("METHOD::ACTION: ",e);break}}catch(c){console.log(c)}return!0}}static async InternalFunctionMercadoPagoGetTransactionId(t){return await s.mercadoPago.findFirst({where:{m_id:t}})}};var g=class{static async webhook(t,e,i){console.log("=============== WEBHOOK ================"),console.log(t.body),console.log("=============== WEBHOOK ================");try{let a=await l.WebHook(t.body.data.id,t.body.action);return console.log(a),e.json({MethodPayment:!0})}catch(a){return console.log(a),e.json(a)}}};0&&(module.exports={WebhookController});