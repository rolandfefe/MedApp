"use client";

import React, { ComponentProps, ReactNode } from "react";
import {
	DrawerTrigger,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";

export function FormPanel({
	children,
	currentUser,
}: {
	children: ReactNode;
	currentUser: IUser;
}) {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<Drawer direction={isSmScreen ? "bottom" : "right"}>{children}</Drawer>
	);
}

export const FormPanelTrigger = ({ children }: { children: ReactNode }) => {
	return (
		<DrawerTrigger asChild className="sm:border">
			{children}
		</DrawerTrigger>
	);
};

export const FormPanelContent = ({
	children,
	...props
}: ComponentProps<typeof DrawerContent>) => {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<DrawerContent {...props} className={cn("sm:min-w-[70vw] md:min-w-[60vw]")}>
			{children}
		</DrawerContent>
	);
};

export const FormPanelHeader = ({
	children,
	...props
}: ComponentProps<typeof DrawerHeader>) => {
	return (
		<DrawerHeader {...props} className="sm:min-w-[70vw] md:min-w-[60vw]">
			{children}
		</DrawerHeader>
	);
};

export const FormPanelTitle = ({
	children,
	...props
}: ComponentProps<typeof DrawerTitle>) => {
	return (
		<DrawerTitle {...props} className="sm:min-w-[70vw] md:min-w-[60vw]">
			{children}
		</DrawerTitle>
	);
};
