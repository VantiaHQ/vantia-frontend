
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Settings, CircleDollarSign, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from 'next/navigation';

import { externalHeading, viewAgentTooltip, savingsTooltip, deleteTooltip, alertDialogTitle, alertDialogDescription, alertDialogCancelButton, alertDialogActionButton, capitalizeFirstWord } from './GeneratedAgentCard.content';

type GeneratedAgentCardProps = {
    slug: string;
    name: string;
    onClear: () => void;
};

export default function GeneratedAgentCard({ slug, name, onClear }: GeneratedAgentCardProps) {
    const agentUrl = `/agente/${slug}`;
    const router = useRouter();

    const formattedName = capitalizeFirstWord(name);

    return (
        <div className="container bg-[#070916] mx-auto pb-24">
            <h2 className="max-w-3xl mx-auto text-xl font-light text-gray-700 pl-4 mb-2">{externalHeading}</h2>
            <Card className="max-w-3xl mx-auto shadow-lg bg-[url('/images/modular-agent.webp')] bg-cover bg-center relative rounded-lg drop-shadow-[0_-16px_32px_rgba(80,200,255,0.2)]">
                <div className="absolute inset-0 bg-black/50 z-0 rounded-lg"></div>
                <CardHeader className="p-6 flex flex-col sm:flex-row items-center justify-between z-10">
                    <Link href={agentUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-headline font-bold text-white drop-shadow-[0_0_16px_rgba(80,200,255,0.3)] break-all hover:underline cursor-target text-2xl sm:text-3xl md:text-xl">
                        {formattedName}
                    </Link>
                    
                    {/* Buttons in header */}
                    <div className="flex items-center gap-2 z-10 mt-4 sm:mt-0">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={agentUrl} target="_blank">
                                        <Button variant="outline" size="icon" className="cursor-target hover:bg-white/10 border-white/80 hover:border-blue-300 hover:shadow-[0_0_8px_rgba(80,200,255,0.4)]">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent><p>{viewAgentTooltip}</p></TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="cursor-target hover:bg-white/10 border-white/80 hover:border-blue-300 hover:shadow-[0_0_8px_rgba(80,200,255,0.4)]" onClick={() => router.push('/calculadora-ahorro')}>
                                        <CircleDollarSign className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>{savingsTooltip}</p></TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="cursor-target hover:bg-red-400/20 border-white/80 hover:border-red-400 hover:shadow-[0_0_8px_rgba(240,150,150,0.4)]">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>{alertDialogTitle}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {alertDialogDescription}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="gap-2">
                                                <AlertDialogCancel className="cursor-target rounded-full border border-gray-400 text-gray-400 hover:bg-white/20 hover:text-white">{alertDialogCancelButton}</AlertDialogCancel>
                            <AlertDialogAction onClick={onClear} className="cursor-target rounded-full border border-red-600 text-red-600 hover:bg-red-600/20 hover:text-white bg-transparent">{alertDialogActionButton}</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TooltipTrigger>
                                <TooltipContent><p>{deleteTooltip}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
