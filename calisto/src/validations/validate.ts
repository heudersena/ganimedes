import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod"

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (err:any) {        
        return res.status(400).json(err.errors);
    }
};