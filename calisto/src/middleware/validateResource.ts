import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod"
import { CUSTOM_MESSAGE, MESSAGE_RETURN } from "../utils/messages";

export const validateResource = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (err: any) {
        const data = err.errors.map(item => {
            return {
                input: item.path[1],
                message: item.message
            }
        })

        return res.status(400).json(MESSAGE_RETURN(data, CUSTOM_MESSAGE("validateResource"), true));
    }
};