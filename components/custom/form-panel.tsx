"use client";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import { ComponentProps } from "react";
import { ScrollArea } from "../ui/scroll-area";
import MyBtn from "./MyBtn";

export function FormPanel({
	children,
	...props
}: ComponentProps<typeof Drawer>) {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<Drawer
			{...props}
			modal={false}
			direction={isSmScreen ? "bottom" : "right"}
		>
			{children}
		</Drawer>
	);
}

export const FormPanelTrigger = ({
	children,
	...props
}: ComponentProps<typeof DrawerTrigger>) => {
	return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
};

export const FormPanelContent = ({
	children,
	// setIsOpen,
	...props
}: {
	// setIsOpen: Dispatch<SetStateAction<boolean>>;
} & ComponentProps<typeof DrawerContent>) => {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<DrawerContent
			{...props}
			className={cn(
				isSmScreen ? "min-h-[95vh]" : "sm:min-w-[70vw] md:min-w-[60vw]"
			)}
		>
			<DrawerHeader className="hidden">
				<DrawerTitle>DynamicForm Panel</DrawerTitle>
				<DrawerDescription>Fill in your details</DrawerDescription>
			</DrawerHeader>

			<DrawerClose className="glass absolute top-2 right-2 z-30 inline-flex items-center justify-center rounded-lg border border-transparent h-7 w-7">
				<X className="size-4" />
			</DrawerClose>

			<ScrollArea className="h-[93vh] sm:h-screen p-2 sm:p-3">
				{children}
			</ScrollArea>
			{/* {children} */}
		</DrawerContent>
	);
};
