import { SidebarProvider } from "@/components/ui/sidebar";
import { getPlaygroundsForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const playgroundData = await getPlaygroundsForUser();

    const technologyIconMap: Record<string, string> = {
        REACT: "Zap",
        NEXTJS: "Lightbulb",
        EXPRESS: "Database",
        VUE: "Compass",
        HONO: "Flame",
        ANGULAR: "Terminal",
    };

    const formattedPlaygroundData = playgroundData?.map((item) => ({
        id: item.id,
        name: item.title,
        starred: false,
        icon: technologyIconMap[item.template] || "Code2",
    })) || [];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-x-hidden">
                <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
