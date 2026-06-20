import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: fieldErrors,
            });
        }

        req.body = result.data;

        next();
    };
}