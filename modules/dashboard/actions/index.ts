"use server";

import { currentUser } from "@/modules/auth/actions";
import { db } from "@/lib/db";

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
        console.error(error);
        return [];
    }
};
