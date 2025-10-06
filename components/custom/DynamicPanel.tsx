import React, { ComponentProps, ReactNode } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";

export function DynamicPanel({
	children,
	...props
}: {
	children: ReactNode;
	dialogProps?: ComponentProps<typeof Dialog>;
	drawerProps?: ComponentProps<typeof Drawer>;
}) {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	if (isSmScreen) {
		return <Drawer {...props.drawerProps}>{children}</Drawer>;
	} else {
		return <Dialog {...props.dialogProps}>{children}</Dialog>;
	}
}

export const DynamicPanelTrigger = ({
	children,
	className,
	...props
}: {
	children: ReactNode;
	className?: string;
	dialogProps?: ComponentProps<typeof DialogTrigger>;
	drawerProps?: ComponentProps<typeof DrawerTrigger>;
}) => {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	if (isSmScreen) {
		return (
			<DrawerTrigger
				className={cn("", className)}
				{...props.drawerProps}
				asChild
			>
				{children}
			</DrawerTrigger>
		);
	} else {
		return (
			<DialogTrigger
				className={cn("", className)}
				{...props.dialogProps}
				asChild
			>
				{children}
			</DialogTrigger>
		);
	}
};

export const DynamicPanelContent = ({
	children,
	className,
	...props
}: {
	children: ReactNode;
	className?: string;
	dialogProps?: ComponentProps<typeof DialogContent>;
	drawerProps?: ComponentProps<typeof DrawerContent>;
}) => {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	if (isSmScreen) {
		return (
			<DrawerContent
				className={cn("min-h-[50vh] p-3", className)}
				{...props.drawerProps}
			>
				<DrawerHeader className="hidden">
					<DrawerTitle>Title</DrawerTitle>
					<DrawerDescription>Description</DrawerDescription>
				</DrawerHeader>
				{children}
			</DrawerContent>
		);
	} else {
		return (
			<DialogContent className={cn("", className)} {...props.dialogProps}>
				<DialogHeader className="hidden">
					<DialogTitle>Title</DialogTitle>
					<DialogDescription>Description</DialogDescription>
				</DialogHeader>

				{children}
			</DialogContent>
		);
	}
};
