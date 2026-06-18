import dotenv from "dotenv";
import {z} from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().positive()),
    DATABASE_URL: z.string().startsWith("postgresql://"),
    JWT_SECRET: z.string().min(8),
})

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid environment configuration variables:');
  console.error(JSON.stringify(result.error.format(), null, 2));
  process.exit(1); 
}

export const env = result.data;