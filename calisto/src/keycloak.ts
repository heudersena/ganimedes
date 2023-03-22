import keycloakConnect from "keycloak-connect";

const config: keycloakConnect.KeycloakConfig = {
    "realm": 'desenvolvimento',
    "auth-server-url": "http://192.168.0.103:8080/auth",
    "resource": 'account_api',
    "confidential-port": 0,
    "ssl-required": ""
}


const keycloak = new keycloakConnect({}, config)

