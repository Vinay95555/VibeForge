import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

const AddRepo = () => {
    return (
        <div
            className="group p-5 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:bg-background hover:border-[#E93F3F] hover:scale-[1.01]
      shadow-[0_2px_10px_rgba(0,0,0,0.06)]
      hover:shadow-[0_8px_25px_rgba(233,63,63,0.12)]"
        >
            <div className="flex flex-row justify-center items-center gap-4">
                <Button
                    variant={"outline"}
                    className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
                    size={"icon"}
                >
                    <ArrowDown size={22} className="transition-transform duration-300 group-hover:translate-y-1" />
                </Button>
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-[#e93f3f]">Open Github Repository</h1>
                    <p className="text-xs text-muted-foreground max-w-[220px]">Work with your repositories in our editor</p>
                </div>
            </div>

            <div className="relative shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                    src={"/github.svg"}
                    alt="Open GitHub repository"
                    width={90}
                    height={90}
                    className="transition-transform duration-300 group-hover:scale-110 object-contain"
                />
            </div>
        </div>
    )
}

export default AddRepo
