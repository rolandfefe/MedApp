"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import MyBtn from "../custom/MyBtn";
import { useEffect } from "react";
import { setThemeCookieAction } from "@/lib/actions/utils.actions";

export function ThemeBtn({ className }: { className?: string }) {
	const { setTheme, theme, systemTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MyBtn variant="outline" size="icon" className={cn("", className)}>
					{theme === "light" ? (
						<Sun />
					) : theme === "dark" ? (
						<Moon />
					) : (
						<Monitor />
					)}
					<span className="sr-only">Toggle theme</span>
				</MyBtn>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Sun size={20} />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Moon size={20} />
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Monitor size={20} />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
