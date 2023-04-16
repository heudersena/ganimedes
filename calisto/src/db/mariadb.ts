import mariadb from "mysql"

export class MariaDbDatabase {
    static async execute() {
        const pool = await mariadb.createConnection({
            host: "192.168.0.103",
            port: 3306,
            user: "root",
            password: "docker",
            database:"db_wallet"
        })

        return pool
    }
}