import express from "express"
import { resolve } from "path"
import { PercentageController } from "../controllers/PercentageController"
import { ProfileController } from "../controllers/ProfileController"
import { TransactionControler } from "../controllers/TransactionControler"
import { WebhookController } from "../controllers/WebhookController"
import { keycloakAuthenticationMidleware } from "../middleware/keycloak"
import { validateResource } from "../middleware/validateResource"
import { ExceptionProfileStoreDepositValidation } from "../validations/ExceptionProfileStoreDepositValidation"
import { ExceptionProfileStoreValidation } from "../validations/ExceptionProfileStoreValidation"

const route = express()

route.get("/", (req, res) => res.sendFile(resolve(__dirname, "..", "view", "index.html")))

route.post("/api/v1/profile/me", keycloakAuthenticationMidleware, ProfileController.me)
route.get("/api/v1/profile/index", keycloakAuthenticationMidleware, ProfileController.index)
route.post("/api/v1/profile/store", validateResource(ExceptionProfileStoreValidation), keycloakAuthenticationMidleware, ProfileController.store)
route.post("/api/v1/profile/store-deposit", keycloakAuthenticationMidleware, validateResource(ExceptionProfileStoreDepositValidation), ProfileController.store_deposit)
route.post("/api/v1/profile/request-withdrawal", keycloakAuthenticationMidleware, validateResource(ExceptionProfileStoreDepositValidation), ProfileController.request_withdrawal)


// PORCENTAGEM DE BONUS
route.get("/api/v1/percentage", PercentageController.index)
route.post("/api/v1/percentage", PercentageController.store)

route.post("/api/v1/transaction", keycloakAuthenticationMidleware, TransactionControler.index)


// CADASTRO
// route.post("/api/v1/mercadopago-create", keycloakAuthenticationMidleware, MercadoPagoController.create)

// MERCADO PAGO - WEBHOOKS
route.post("/process_payment", WebhookController.webhook)
// route.post("/mercadopago/verify", MercadoPagoController.get)

export { route }