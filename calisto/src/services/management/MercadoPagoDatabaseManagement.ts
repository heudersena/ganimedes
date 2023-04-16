import { Prisma } from "@prisma/client";
import { prisma } from "../../db";
import { MariaDbDatabase } from "../../db/mariadb";

const pool = MariaDbDatabase.execute()

export class MercadoPagoDatabaseManagement {
    static async VIEW_CREDITO_MERCADO_PAGO() {
        try {
            const result = await prisma.$queryRaw`SELECT * FROM VIEW_SOMA_TOTAL_ACCUMULATOR_BONUS`;

            await prisma.$disconnect()

            return result;
        } catch (error) {
            return error
        }
    }
}