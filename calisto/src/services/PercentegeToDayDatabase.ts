import { prisma } from "../db"
import { ExecuteReturn } from "../utils/ExecuteReturn";



export class PercentegeToDayDatabase {

    static async DatabaseMethodSelectAll() {
        try {

            const content = await prisma.percentage_today.findFirst();
            return ExecuteReturn(Number(content?.percentage))

        } catch (error) {
            return ExecuteReturn([], true, error)
        }
    }

    static async DatabaseMethodCreation(value_percentage: number) {

        const is_id = await this.DatabaseMethodAuxiliariesCheckExistsPercentage();

        if (is_id) {
            const content = await prisma.percentage_today.update({
                where: {
                    id: is_id
                },
                data: {
                    percentage: value_percentage
                }
            })

            return ExecuteReturn(content)
        } else {
            const content = await prisma.percentage_today.create({
                data: {
                    percentage: value_percentage
                }
            })

            return ExecuteReturn(content)

        }
    }

    static async DatabaseMethodAuxiliariesCheckExistsPercentage() {
        const content = await prisma.percentage_today.findFirst();
        return content?.id
    }

}