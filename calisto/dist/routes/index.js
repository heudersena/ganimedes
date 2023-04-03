"use strict";var it=Object.create;var D=Object.defineProperty;var ct=Object.getOwnPropertyDescriptor;var dt=Object.getOwnPropertyNames;var ut=Object.getPrototypeOf,lt=Object.prototype.hasOwnProperty;var mt=(s,t)=>{for(var e in t)D(s,e,{get:t[e],enumerable:!0})},Z=(s,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of dt(t))!lt.call(s,a)&&a!==e&&D(s,a,{get:()=>t[a],enumerable:!(n=ct(t,a))||n.enumerable});return s};var A=(s,t,e)=>(e=s!=null?it(ut(s)):{},Z(t||!s||!s.__esModule?D(e,"default",{value:s,enumerable:!0}):e,s)),pt=s=>Z(D({},"__esModule",{value:!0}),s);var _t={};mt(_t,{route:()=>l});module.exports=pt(_t);var rt=A(require("express"));var J=require("@prisma/client"),o=new J.PrismaClient({});o.$disconnect();var c=(s,t=!1,e="")=>({data:s,error:t,errorMessage:e});var C=class{static async index(){let t=await o.withdrawal.findMany();return c(t,!1,"")}static async getBayId(t){let e=await o.withdrawal.findFirst({where:{id:t}});return c(e,!1,"")}};var k=class{static async index(t,e){let n=await C.index();return e.json(n)}static async getBayId(t,e){let n=t.params.id,a=await C.getBayId(n);return e.json(a)}};var h=class{static async DatabaseMethodSelectAll(){try{let t=await o.percentage_today.findFirst();return c(Number(t==null?void 0:t.percentage))}catch(t){return c([],!0,t)}}static async DatabaseMethodCreation(t){let e=await this.DatabaseMethodAuxiliariesCheckExistsPercentage();if(e){let n=await o.percentage_today.update({where:{id:e},data:{percentage:t}});return c(n)}else{let n=await o.percentage_today.create({data:{percentage:t}});return c(n)}}static async DatabaseMethodAuxiliariesCheckExistsPercentage(){let t=await o.percentage_today.findFirst();return t==null?void 0:t.id}};var N=class{static async index(t,e){let n=await h.DatabaseMethodSelectAll();return e.json(n)}static async store(t,e){let n=Number(t.body.money),a=await h.DatabaseMethodCreation(n);return e.json(a)}};var U=class{constructor(){this.FN_LOCAL_VERIFY_EMAIL_EXIST=async t=>!!await o.profile.findUnique({where:{email:t}});this.FN_LOCAL_VERIFY_CPF_EXIST=async t=>!!await o.profile.findUnique({where:{cpf:t}})}};var z=A(require("gerar-cpf")),Q=()=>"G-"+(0,z.default)();var v=class{static async DatabaseMethodCreation(t){try{let e=await o.accumulator_bonus.create({data:{bonus_amount:0,profile_id:t}});return c(e)}catch(e){return c([],!0,e)}}};var w=class{static async DatabaseMethodSelectAll(){try{let t=await o.profile.findMany();return c(t)}catch(t){return c([],!0,t)}}static async DatabaseMethodGetTotalBalance(t){try{let e=await o.profile.findFirst({where:{keycloak_id:t},select:{balance:!0,bonus:!0}});return c(e)}catch(e){return c([],!0,e)}}static async DatabaseMethodSelectOne(t){try{let e=await o.profile.findFirst({where:{keycloak_id:t},orderBy:{created_at:"desc"}});return c(e)}catch(e){return c([],!0,e)}}static async DatabaseMethodCreation(t){try{if(console.log("0000000000000000000000000000000000"),console.log(await this.DatabaseMethodAuxiliariesCheckExistsCPF(t.cpf)),console.log(await this.DatabaseMethodAuxiliariesCheckExistsEMAIL(t.email)),console.log("0000000000000000000000000000000000"),await this.DatabaseMethodAuxiliariesCheckExistsCPF(t.cpf)||await this.DatabaseMethodAuxiliariesCheckExistsEMAIL(t.email))return c([],!0,"EMAIL OU CPF J\xC1 EXISTE EM NOSSOS CADASTRO!");let e=await o.profile.create({data:{keycloak_id:t.keycloak_id,first_name:t.first_name,second_name:t.second_name,email:t.email,cpf:t.cpf??Q(),balance:t.balance??0,bonus:t.bonus??0,phone:t.phone,type_profile:"ROLE_PLAYER",keyPix:t.keyPix,reference_code:t.reference_code??"NULL"}}),n=await v.DatabaseMethodCreation(e.id);return c({content:e,accumulator_create:n})}catch(e){return c([],!0,e)}}static async DatabaseMethodEditAdmin(t,e,n){try{let a=await o.profile.update({where:{id:t},data:{type_profile:e.roles,reference_code:n}});return c(a)}catch(a){return c([],!0,a)}}static async DatabaseMethodEditUser(t,e,n,a){try{let r=await o.profile.update({where:{keycloak_id:t},data:{phone:e,cpf:n,keyPix:a}});return c(r)}catch(r){return r}}static async DatabaseMethodAuxiliariesCheckExistsCPF(t){return t===void 0?!1:!!await o.profile.findFirst({where:{cpf:t}})}static async DatabaseMethodAuxiliariesCheckExistsEMAIL(t){return!!await o.profile.findFirst({where:{email:t}})}};var F=A(require("mercadopago")),$=A(require("dayjs"));F.default.configurations.setAccessToken(String(process.env.MERCADO_PAGO_KEY_PROD));var M=class{static async CreatePayment(t){var e;try{let n={transaction_amount:t.transaction_amount,payment_method_id:t.payment_method_id,payer:{email:t.payer.email},installments:1,date_of_expiration:String((0,$.default)(new Date).add(6,"minutes").format("YYYY-MM-DDTHH:mm:ss.000ZZ"))};return await((e=F.default.payment)==null?void 0:e.save(n))}catch(n){return n}}static async GetPayment(t){try{return await F.default.payment.findById(t)}catch(e){return e}}};var x=class{static async DatabaseMethodGetAll(t){var n;return(n=(await o.profile.findMany({where:{email:t},include:{Transaction:{include:{MercadoPago:!0},orderBy:{created_at:"desc"}}},orderBy:{created_at:"desc"}}))[0])==null?void 0:n.Transaction}static async DatabaseMethodCreation(t,e){var n,a,r,i,d,u,f,b,g,P;try{let E=await w.DatabaseMethodSelectOne(t),V=E.data.id,X=(await h.DatabaseMethodSelectAll()).data,ot=e*X/100,R=await M.CreatePayment({transaction_amount:e,payment_method_id:"pix",installments:1,payer:{email:(n=E.data)==null?void 0:n.email}}),L=await o.transaction.create({data:{profile_id:V,balance:e,bonus:ot,percentage_bonus:X,type_transaction:"ROLE_DEPOSIT"}}),st=await o.mercadoPago.create({data:{m_id:String((a=R.response)==null?void 0:a.id),m_action:"created",m_qr_code:(r=R.response)==null?void 0:r.point_of_interaction.transaction_data.qr_code,m_status:(i=R.response)==null?void 0:i.status,m_net_received_amount:(d=R.response)==null?void 0:d.transaction_details.net_received_amount,m_ticket_url:(u=R.response)==null?void 0:u.point_of_interaction.transaction_data.ticket_url,m_total_paid_amount:(f=R.response)==null?void 0:f.transaction_details.total_paid_amount,m_status_detail:(b=R.response)==null?void 0:b.status_detail,m_transaction_id:((g=R.response)==null?void 0:g.point_of_interaction.transaction_data.transaction_id)??"null",m_qr_code_base64:(P=R.response)==null?void 0:P.point_of_interaction.transaction_data.qr_code_base64,transaction_id:L==null?void 0:L.id}});return{transaction:L,mercado_pago:st,mp:R}}catch(E){return E}}};var Xt=new U,y=class{static async me(t,e,n){let a=await w.DatabaseMethodSelectOne(t.user.content.sub);return e.json({request:t.user,user:a})}static async getTotalBalance(t,e,n){var r,i,d;let a=await w.DatabaseMethodGetTotalBalance(t.user.content.sub);return e.json({balance:Number((r=a.data)==null?void 0:r.balance),balance_br:Number((i=a.data)==null?void 0:i.balance).toLocaleString("pt-br",{style:"currency",currency:"BRL"}),bonus:Number((d=a.data)==null?void 0:d.bonus).toLocaleString("pt-br",{style:"currency",currency:"BRL"})})}static async index(t,e,n){return console.log(t.user),e.json({balance:t.user})}static async store(t,e,n){var i,d,u,f;let a={...t.body,first_name:(i=t.user)==null?void 0:i.content.given_name,second_name:(d=t.user)==null?void 0:d.content.family_name,email:(u=t.user)==null?void 0:u.content.email,keycloak_id:(f=t.user)==null?void 0:f.content.sub},r=await w.DatabaseMethodCreation(a);return e.json(r)}static async store_deposit(t,e,n){let a=Number(t.body.balance),r=await x.DatabaseMethodCreation(t.user.content.sub,a);return t.io.sockets.in(t.user.content.email).emit("new-deposit",{update:!0}),e.json(r)}static async request_withdrawal(t,e,n){var r;let a={...t.body,keycloak_id:(r=t.user)==null?void 0:r.content.sub};return e.json([])}};var q=class{static async index(t,e){let n=await x.DatabaseMethodGetAll(String(t.user.content.email));return e.json(n)}};var j=class{static async WebHook(t,e){let n=t,a=await this.InternalFunctionMercadoPagoGetTransactionId(n),r=await M.GetPayment(Number(n));if((a==null?void 0:a.m_status)!=="approved"){try{switch(e){case"payment.updated":if(r.response.status_detail==="expired"){let i=await o.mercadoPago.update({where:{id:a==null?void 0:a.id},data:{m_action:"updated",m_status:r.response.status,m_status_detail:r.response.status_detail,m_net_received_amount:r.response.transaction_details.net_received_amount,m_transaction_id:r.response.transaction_details.transaction_id??"NULL"}});await o.transaction.update({where:{id:i.transaction_id},data:{mercado_pago_transaction_status:r.response.status}})}else{let i=await o.mercadoPago.update({where:{id:a==null?void 0:a.id},data:{m_action:"updated",m_status:r.response.status,m_status_detail:r.response.status_detail,m_net_received_amount:r.response.transaction_details.net_received_amount,m_transaction_id:r.response.transaction_details.transaction_id??"NULL"}}),d=await o.transaction.update({where:{id:i.transaction_id},data:{mercado_pago_transaction_status:r.response.status}});console.log("transaction_update=>",d);let u=await o.accumulator_bonus.findFirst({where:{profile_id:d.profile_id}});console.log("acc_bonus=>",u);let f=Number(u==null?void 0:u.bonus_amount)+Number(d.bonus);console.log("TOTAL BONUS: ",f);let b=await o.accumulator_bonus.update({where:{profile_id:d.profile_id},data:{bonus_amount:f}});console.log("finish=> ",b);let g=await o.profile.findFirst({where:{id:d==null?void 0:d.profile_id}}),P=d==null?void 0:d.balance,E=g==null?void 0:g.balance,V=Number(P)+Number(E),W=await o.profile.update({where:{id:d==null?void 0:d.profile_id},data:{balance:V}});console.log("PROFILE::BALANCE:: ",W)}break;default:console.log("METHOD::ACTION: ",e);break}}catch(i){console.log(i)}return!0}}static async InternalFunctionMercadoPagoGetTransactionId(t){return await o.mercadoPago.findFirst({where:{m_id:t}})}};var G=class{static async webhook(t,e,n){console.log("=============== WEBHOOK ================"),console.log(t.body),console.log("=============== WEBHOOK ================");try{let a=await j.WebHook(t.body.data.id,t.body.action);return console.log(a),e.json({MethodPayment:!0})}catch(a){return console.log(a),e.json(a)}}};var O=class{static async index(t){let e=await this.INTERNAL_GET_ME_USER(t),n=await o.withdrawal.findMany({where:{profile_id:e==null?void 0:e.id},orderBy:{created_at:"desc"}});return c(n,!1,"")}static async getBayId(t){let e=await o.withdrawal.findFirst({where:{id:t}});return c(e,!1,"")}static async requestWithdrawal(t,e){let n=await o.profile.findUnique({where:{keycloak_id:e}}),a=await this.INTERNAL_GET_ME_USER(e),r=await o.withdrawal.findMany({where:{profile_id:a==null?void 0:a.id,AND:{status:"processing"}}});if(r.length)return c(r,!0,"VOC\xCA J\xC1 FEZ UMA SOLICITA\xC7\xC3O DE SAQUE, AGUARDE O TERMINO DESSE PROCESSO.");if(t>Number(n==null?void 0:n.balance)||(a==null?void 0:a.id)===null)return c(a,!0,"VALOR QUE VOC\xCA SOLICITOU \xC9 MAIOR QUE VOC\xCA POSSU\xCD");let i=await o.withdrawal.create({data:{amount:t,profile_id:a==null?void 0:a.id}});return c(i,!1,"SOLICITA\xC7\xC3O FOI CONCLU\xCDDA COM SUCESSO.")}static async update(t,e,n,a){let r=await this.INTERNAL_GET_ME_USER(e),i=await o.withdrawal.findFirst({where:{id:t,AND:{status:"processing"}}}),d=Number(r==null?void 0:r.balance)-Number(i==null?void 0:i.amount);if(console.log(i),n==="accepted"&&i!=null)try{let u=await o.$transaction([o.profile.update({where:{keycloak_id:e},data:{balance:d}}),o.withdrawal.update({where:{id:t},data:{status:"accepted"}})]);return c(u,!1,"ATUALIZADA COM SUCESSO")}catch(u){return c(u,!0,"Ops!")}else if(n==="refused"&&i!=null){let u=await o.withdrawal.update({where:{id:t},data:{status:"refused",description:a}});return c(u,!1,"VOC\xCA RECUSOU A SOLICITA\xC7\xC3O")}else return c([],!0,"EST\xC1 SOLICITA\xC7\xC3O N\xC3O TEVE NENHUMA A\xC7\xC3O")}static async INTERNAL_GET_ME_USER(t){return await o.profile.findUnique({where:{keycloak_id:t}})}};var S=class{static async index(t,e){let n=t.user.content.sub,a=await O.index(n);e.json(a)}static async getBayId(t,e){let n=t.params.id,a=await O.getBayId(n);e.json(a)}static async store(t,e){let n=Number(t.body.amount),a=t.user.content.sub,r=await O.requestWithdrawal(n,a);return r.error?e.status(400).json(r):e.status(200).json(r)}static async update(t,e){let n=t.user.content.sub,a=t.body.status,r=t.params.id,i=await O.update(r,n,a);e.json(i)}};var H=A(require("keycloak-connect/middleware/auth-utils/token")),tt=A(require("keycloak-connect/middleware/auth-utils/signature"));var m=s=>s,p=function(s,t,e=!1){return{error:e,content:s,message:t}};var et=s=>(t,e,n)=>{var i,d,u,f,b;let a=(i=t.headers)==null?void 0:i.authorization;if(!a)return e==null?void 0:e.json(p([],m("Bearer token fail"),!0));let[,r]=a.split(" ");if(!r)return e==null?void 0:e.json(p([],m("Bearer token invalid"),!0));try{let g=new H.default(r,process.env.KEYCLOAK_CLIENT_ID);return(u=(d=g.content)==null?void 0:d.realm_access)!=null&&u.roles.ROLE_ADMINISTRATOR||((b=(f=g.content)==null?void 0:f.realm_access)==null?void 0:b.roles.map(E=>E).some(E=>s.includes(E)))?n():e.json(p([],m("VOC\xCA N\xC3O TEM PERMISS\xC3O"),!0))}catch(g){e.json(p([],m(g.message),!0))}},_=(s,t,e)=>{var r;let n=(r=s.headers)==null?void 0:r.authorization;if(!n)return t==null?void 0:t.json(p([],m("Bearer token fail"),!0));let[,a]=n.split(" ");if(!a)return t==null?void 0:t.json(p([],m("Bearer token invalid"),!0));try{let i=new H.default(a,process.env.KEYCLOAK_CLIENT_ID);if(i.content.exp==0)return t==null?void 0:t.status(400).json(p([],m("token invalid"),!0));let d=new tt.default({realmUrl:process.env.KEYCLOAK_REALM_URL,publicKey:process.env.KEYCLOAK_PUBLIC_KEY,minTimeBetweenJwksRequests:0});try{d.verify(i,null).then(u=>{s.user=u,e()}).catch(u=>(console.log(u),t.json(p([],m(u.message),!0))))}catch(u){return t.json(p([],m(u.message),!0))}}catch(i){t.json(p([],m(i.message),!0))}};var B=s=>async(t,e,n)=>{try{await s.parse({body:t.body,query:t.query,params:t.params}),n()}catch(a){let r=a.errors.map(i=>({input:i.path[1],message:i.message}));return e.status(400).json(p(r,m("validateResource"),!0))}};var T=require("zod"),at="ESSE CAMPO \xC9 OBRIGAT\xD3RIO PREENCHER (EXEMPLO) 10.22",K=(0,T.object)({body:(0,T.object)({balance:(0,T.number)({required_error:at,invalid_type_error:"VOC\xCA PRECISA PASSAR UM NUMERO VALIDO EXEMPLO 10.22"}).min(1,at)})});var I=require("zod"),Y="ESSE CAMPO \xC9 OBRIGAT\xD3RIO PREENCHER";var nt=(0,I.object)({body:(0,I.object)({phone:(0,I.string)({required_error:Y}).trim().min(1,Y),keyPix:(0,I.string)().trim().min(1,Y)})});var l=(0,rt.default)();l.post("/api/v1/profile/me",_,y.me);l.get("/api/v1/profile/index",_,y.index);l.post("/api/v1/profile/balance",_,y.getTotalBalance);l.post("/api/v1/profile/store",B(nt),_,y.store);l.post("/api/v1/profile/store-deposit",_,B(K),y.store_deposit);l.post("/api/v1/profile/request-withdrawal",_,B(K),y.request_withdrawal);l.get("/api/v1/percentage",N.index);l.post("/api/v1/percentage",N.store);l.post("/api/v1/transaction",_,q.index);l.get("/api/v1/withdran",_,S.index);l.get("/api/v1/withdran/:id",_,S.getBayId);l.post("/api/v1/withdran",_,S.store);l.patch("/api/v1/withdran/:id",_,S.update);l.post("/process_payment",G.webhook);l.get("/api/management/withdraw",_,et(["ROLE_ADMINISTRATOR","ROLE_ATENDENTE"]),k.index);0&&(module.exports={route});