import { prisma } from "../db";
import { CUSTOM_MESSAGE, MESSAGE_RETURN, SUCCESS_MESSAGE } from "../utils/messages";

export class AccumulatorService {
    static async store(user_id: string) {
        const bonus = await prisma.accumulator_bonus.create({ data: { profile_id: user_id, bonus_amount: 0.00 } })
        return MESSAGE_RETURN(bonus, SUCCESS_MESSAGE(), true)
    }

    static async update_to_bonus(bonus: number, user_id: string) {
        try {
            const values = await prisma.accumulator_bonus.findFirst({ where: { id: user_id } })

            let new_values = 0.00;

            if (!(values?.bonus_amount)) {
                new_values = values?.bonus_amount != undefined ? Number(values?.bonus_amount) + bonus : bonus
            }

            console.log("UPDATE_BONUS: ", new_values);


            const bonus_db = await prisma.accumulator_bonus.update({
                where: {
                    profile_id: user_id
                },
                data: {
                    bonus_amount: new_values
                }
            })
            return MESSAGE_RETURN(bonus_db, SUCCESS_MESSAGE(), false)
        } catch (error) {
            return MESSAGE_RETURN(error, CUSTOM_MESSAGE("ERROR AO ATUALIZAR O VALOR DO BONUS DO USUARIO."), true)

        }

    }
}