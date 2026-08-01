"use client";

import { Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import TemplateSelectingModal from "./template-selecting-modal";
import { createPlayground } from "@/modules/dashboard/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddNewButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleCreatePlayground = async (data: {
        title: string;
        template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
        description?: string;
    }) => {
        try {
            const playground = await createPlayground(data);
            toast.success("Playground created successfully!");
            if (playground?.id) {
                router.push(`/playground/${playground.id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create playground");
        }
    };

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="group p-5 flex flex-row justify-between items-center border border-border/70 rounded-2xl bg-card cursor-pointer 
                transition-all duration-300 ease-in-out
                hover:border-[#E93F3F]/60 hover:bg-gradient-to-r hover:from-[#E93F3F]/5 hover:to-transparent hover:scale-[1.01]
                shadow-sm hover:shadow-xl hover:shadow-[#E93F3F]/10"
            >
                <div className="flex flex-row justify-center items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex justify-center items-center bg-[#E93F3F]/10 text-[#E93F3F] border border-[#E93F3F]/20 group-hover:bg-[#E93F3F] group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-xs">
                        <Plus size={22} className="transition-transform duration-300 group-hover:rotate-90" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-lg font-bold text-foreground group-hover:text-[#E93F3F] transition-colors">
                                Add New Playground
                            </h2>
                            <Sparkles size={14} className="text-[#E93F3F] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground max-w-[220px]">
                            Create a new project from React, Next.js, Express & more
                        </p>
                    </div>
                </div>

                <div className="relative shrink-0 overflow-hidden flex items-center justify-center w-20 h-20">
                    <Image
                        src={"/add-new.svg"}
                        alt="Create new playground"
                        width={80}
                        height={80}
                        className="transition-transform duration-300 group-hover:scale-110 object-contain drop-shadow-sm"
                    />
                </div>
            </div>

            <TemplateSelectingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePlayground}
            />
        </>
    );
};

export default AddNewButton;
