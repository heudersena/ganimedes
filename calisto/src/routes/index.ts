import express from "express"
import { resolve } from "path"
import { WithDrawManagementController } from "../controllers/management/WithDrawManagementController"
import { PercentageController } from "../controllers/PercentageController"
import { ProfileController } from "../controllers/ProfileController"
import { TransactionControler } from "../controllers/TransactionControler"
import { WebhookController } from "../controllers/WebhookController"
import { WithDrawController } from "../controllers/WithDrawController"
import { keycloakAuthenticationMidleware, keycloakRolesMidlleware } from "../middleware/keycloak"
import { validateResource } from "../middleware/validateResource"
import { ExceptionProfileStoreDepositValidation } from "../validations/ExceptionProfileStoreDepositValidation"
import { ExceptionProfileStoreValidation } from "../validations/ExceptionProfileStoreValidation"
import { MercadoPagoManagementController } from "../controllers/management/MercadoPagoManagementController"

const route = express()

route.post("/api/v1/profile/me", keycloakAuthenticationMidleware, ProfileController.me)
route.get("/api/v1/profile/index", keycloakAuthenticationMidleware, ProfileController.index)
route.post("/api/v1/profile/balance", keycloakAuthenticationMidleware, ProfileController.getTotalBalance)
route.post("/api/v1/profile/store", validateResource(ExceptionProfileStoreValidation), keycloakAuthenticationMidleware, ProfileController.store)
route.post("/api/v1/profile/store-deposit", keycloakAuthenticationMidleware, validateResource(ExceptionProfileStoreDepositValidation), ProfileController.store_deposit)
route.post("/api/v1/profile/request-withdrawal", keycloakAuthenticationMidleware, validateResource(ExceptionProfileStoreDepositValidation), ProfileController.request_withdrawal)


// PORCENTAGEM DE BONUS
route.get("/api/v1/percentage", PercentageController.index)
route.post("/api/v1/percentage", PercentageController.store)

route.post("/api/v1/transaction", keycloakAuthenticationMidleware, TransactionControler.index)

// Solicitar Saque
route.get("/api/v1/withdran", keycloakAuthenticationMidleware, WithDrawController.index)
route.get("/api/v1/withdran/:id", keycloakAuthenticationMidleware, WithDrawController.getBayId)
route.post("/api/v1/withdran", keycloakAuthenticationMidleware, WithDrawController.store)
route.patch("/api/v1/withdran/:id", keycloakAuthenticationMidleware, WithDrawController.update)


// CADASTRO
// route.post("/api/v1/mercadopago-create", keycloakAuthenticationMidleware, MercadoPagoController.create)

// MERCADO PAGO - WEBHOOKS
route.post("/process_payment", WebhookController.webhook)
route.get("/cron", WebhookController.cron)
// route.post("/mercadopago/verify", MercadoPagoController.get)

// GERENCIAMENTO INTERNO
// keycloakRolesMidlleware(["ROLE_ADMINISTRATOR", "ROLE_ATENDENTE"])
// keycloakAuthenticationMidleware, 
route.get("/api/management/withdraw/all",  WithDrawManagementController.all)
route.get("/api/management/withdraw",  WithDrawManagementController.index)
route.get("/api/management/withdraw/:id",  WithDrawManagementController.getBayId)
route.patch("/api/management/withdraw/:id",  WithDrawManagementController.update)

route.get("/prejuizo", MercadoPagoManagementController.CREDITO_MERCADO_PAGO)

export { route }