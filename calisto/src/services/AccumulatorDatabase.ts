import { prisma } from "../db";
import { ExecuteReturn } from "../utils/ExecuteReturn";



export class AccumulatorDatabase {

    static async DatabaseMethodCreation(profile_id: string) {
        try {
            const content = await prisma.accumulator_bonus.create({
                data: {
                    bonus_amount: 0.00,
                    profile_id: profile_id
                }
            })
            return ExecuteReturn(content)
        } catch (error) {
            return ExecuteReturn([], true, error)
        }
    }

}