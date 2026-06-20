import { prisma } from "../../config/prisma.js";
import type { LoginInput, RegisterInput } from "./auth.validation.js";
import { ApiError } from "../../utils/apiError.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateAccessToken } from "../../utils/jwt.js";


export async function registerUser(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        throw new ApiError('Email already exists', 409);
    }

    const passwordHash = await hashPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    const token = generateAccessToken(newUser.id);

    return {
        user: newUser,
        token,
    };
}



export async function loginUser(data: LoginInput) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
        },
    });

    if (!user) {
        throw new ApiError('Invalid email or password', 401);
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash);

    if (!isPasswordValid) {
        throw new ApiError('Invalid email or password', 401);
    }

    const token = generateAccessToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}


export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    return user;
}