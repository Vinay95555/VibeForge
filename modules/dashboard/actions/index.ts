"use server";

import { currentUser } from "@/modules/auth/actions";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getPlaygroundsForUser = async (userId?: string) => {
    try {
        const user = userId ? null : await currentUser();
        const targetUserId = userId || user?.id;

        if (!targetUserId) {
            return [];
        }

        const playgrounds = await db.playground.findMany({
            where: {
                userId: targetUserId,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return playgrounds;
    } catch (error) {
        console.error("Database connection error in getPlaygroundsForUser:", error);
        return [];
    }
};

export const getAllPlaygroundForUser = getPlaygroundsForUser;

export const createPlayground = async (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
}) => {
    try {
        const user = await currentUser();
        if (!user || !user.id) {
            throw new Error("Unauthorized");
        }

        const playground = await db.playground.create({
            data: {
                title: data.title,
                template: data.template,
                description: data.description,
                userId: user.id,
            },
        });

        revalidatePath("/dashboard");
        return playground;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deletePlayground = async (id: string) => {
    try {
        const user = await currentUser();
        if (!user || !user.id) {
            throw new Error("Unauthorized");
        }

        await db.playground.delete({
            where: {
                id,
            },
        });

        revalidatePath("/dashboard");
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePlayground = async (
    id: string,
    data: { title: string; description: string }
) => {
    try {
        const user = await currentUser();
        if (!user || !user.id) {
            throw new Error("Unauthorized");
        }

        const playground = await db.playground.update({
            where: {
                id,
            },
            data: {
                title: data.title,
                description: data.description,
            },
        });

        revalidatePath("/dashboard");
        return playground;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const duplicatePlayground = async (id: string) => {
    try {
        const user = await currentUser();
        if (!user || !user.id) {
            throw new Error("Unauthorized");
        }

        const existing = await db.playground.findUnique({
            where: { id },
        });

        if (!existing) {
            throw new Error("Playground not found");
        }

        const playground = await db.playground.create({
            data: {
                title: `${existing.title} (Copy)`,
                template: existing.template,
                description: existing.description,
                userId: user.id,
            },
        });

        revalidatePath("/dashboard");
        return playground;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
