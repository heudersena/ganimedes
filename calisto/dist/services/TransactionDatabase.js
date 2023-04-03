"use strict";var F=Object.create;var l=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,G=Object.prototype.hasOwnProperty;var Y=(r,t)=>{for(var e in t)l(r,e,{get:t[e],enumerable:!0})},A=(r,t,e,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of v(t))!G.call(r,o)&&o!==e&&l(r,o,{get:()=>t[o],enumerable:!(a=q(t,o))||a.enumerable});return r};var y=(r,t,e)=>(e=r!=null?F(B(r)):{},A(t||!r||!r.__esModule?l(e,"default",{value:r,enumerable:!0}):e,r)),N=r=>A(l({},"__esModule",{value:!0}),r);var U={};Y(U,{TransactionDatabase:()=>h});module.exports=N(U);var C=require("@prisma/client"),n=new C.PrismaClient({});n.$disconnect();var m=y(require("mercadopago")),I=y(require("dayjs"));m.default.configurations.setAccessToken(String(process.env.MERCADO_PAGO_KEY_PROD));var u=class{static async CreatePayment(t){var e;try{let a={transaction_amount:t.transaction_amount,payment_method_id:t.payment_method_id,payer:{email:t.payer.email},installments:1,date_of_expiration:String((0,I.default)(new Date).add(6,"minutes").format("YYYY-MM-DDTHH:mm:ss.000ZZ"))};return await((e=m.default.payment)==null?void 0:e.save(a))}catch(a){return a}}static async GetPayment(t){try{return await m.default.payment.findById(t)}catch(e){return e}}};var i=(r,t=!1,e="")=>({data:r,error:t,errorMessage:e});var p=class{static async DatabaseMethodSelectAll(){try{let t=await n.percentage_today.findFirst();return i(Number(t==null?void 0:t.percentage))}catch(t){return i([],!0,t)}}static async DatabaseMethodCreation(t){let e=await this.DatabaseMethodAuxiliariesCheckExistsPercentage();if(e){let a=await n.percentage_today.update({where:{id:e},data:{percentage:t}});return i(a)}else{let a=await n.percentage_today.create({data:{percentage:t}});return i(a)}}static async DatabaseMethodAuxiliariesCheckExistsPercentage(){let t=await n.percentage_today.findFirst();return t==null?void 0:t.id}};var O=y(require("gerar-cpf")),R=()=>"G-"+(0,O.default)();var f=class{static async DatabaseMethodCreation(t){try{let e=await n.accumulator_bonus.create({data:{bonus_amount:0,profile_id:t}});return i(e)}catch(e){return i([],!0,e)}}};var g=class{static async DatabaseMethodSelectAll(){try{let t=await n.profile.findMany();return i(t)}catch(t){return i([],!0,t)}}static async DatabaseMethodGetTotalBalance(t){try{let e=await n.profile.findFirst({where:{keycloak_id:t},select:{balance:!0,bonus:!0}});return i(e)}catch(e){return i([],!0,e)}}static async DatabaseMethodSelectOne(t){try{let e=await n.profile.findFirst({where:{keycloak_id:t},orderBy:{created_at:"desc"}});return i(e)}catch(e){return i([],!0,e)}}static async DatabaseMethodCreation(t){try{if(console.log("0000000000000000000000000000000000"),console.log(await this.DatabaseMethodAuxiliariesCheckExistsCPF(t.cpf)),console.log(await this.DatabaseMethodAuxiliariesCheckExistsEMAIL(t.email)),console.log("0000000000000000000000000000000000"),await this.DatabaseMethodAuxiliariesCheckExistsCPF(t.cpf)||await this.DatabaseMethodAuxiliariesCheckExistsEMAIL(t.email))return i([],!0,"EMAIL OU CPF J\xC1 EXISTE EM NOSSOS CADASTRO!");let e=await n.profile.create({data:{keycloak_id:t.keycloak_id,first_name:t.first_name,second_name:t.second_name,email:t.email,cpf:t.cpf??R(),balance:t.balance??0,bonus:t.bonus??0,phone:t.phone,type_profile:"ROLE_PLAYER",keyPix:t.keyPix,reference_code:t.reference_code??"NULL"}}),a=await f.DatabaseMethodCreation(e.id);return i({content:e,accumulator_create:a})}catch(e){return i([],!0,e)}}static async DatabaseMethodEditAdmin(t,e,a){try{let o=await n.profile.update({where:{id:t},data:{type_profile:e.roles,reference_code:a}});return i(o)}catch(o){return i([],!0,o)}}static async DatabaseMethodEditUser(t,e,a,o){try{let c=await n.profile.update({where:{keycloak_id:t},data:{phone:e,cpf:a,keyPix:o}});return i(c)}catch(c){return c}}static async DatabaseMethodAuxiliariesCheckExistsCPF(t){return t===void 0?!1:!!await n.profile.findFirst({where:{cpf:t}})}static async DatabaseMethodAuxiliariesCheckExistsEMAIL(t){return!!await n.profile.findFirst({where:{email:t}})}};var h=class{static async DatabaseMethodGetAll(t){var a;return(a=(await n.profile.findMany({where:{email:t},include:{Transaction:{include:{MercadoPago:!0},orderBy:{created_at:"desc"}}},orderBy:{created_at:"desc"}}))[0])==null?void 0:a.Transaction}static async DatabaseMethodCreation(t,e){var a,o,c,b,M,w,P,x,E,D;try{let d=await g.DatabaseMethodSelectOne(t),S=d.data.id,k=(await p.DatabaseMethodSelectAll()).data,L=e*k/100,s=await u.CreatePayment({transaction_amount:e,payment_method_id:"pix",installments:1,payer:{email:(a=d.data)==null?void 0:a.email}}),_=await n.transaction.create({data:{profile_id:S,balance:e,bonus:L,percentage_bonus:k,type_transaction:"ROLE_DEPOSIT"}}),T=await n.mercadoPago.create({data:{m_id:String((o=s.response)==null?void 0:o.id),m_action:"created",m_qr_code:(c=s.response)==null?void 0:c.point_of_interaction.transaction_data.qr_code,m_status:(b=s.response)==null?void 0:b.status,m_net_received_amount:(M=s.response)==null?void 0:M.transaction_details.net_received_amount,m_ticket_url:(w=s.response)==null?void 0:w.point_of_interaction.transaction_data.ticket_url,m_total_paid_amount:(P=s.response)==null?void 0:P.transaction_details.total_paid_amount,m_status_detail:(x=s.response)==null?void 0:x.status_detail,m_transaction_id:((E=s.response)==null?void 0:E.point_of_interaction.transaction_data.transaction_id)??"null",m_qr_code_base64:(D=s.response)==null?void 0:D.point_of_interaction.transaction_data.qr_code_base64,transaction_id:_==null?void 0:_.id}});return{transaction:_,mercado_pago:T,mp:s}}catch(d){return d}}};0&&(module.exports={TransactionDatabase});