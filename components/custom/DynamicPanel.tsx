import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

export function DynamicPanel({
	children,
	...props
}: {
	dialogProps?: ComponentProps<typeof Dialog>;
	drawerProps?: ComponentProps<typeof Drawer>;
	children: ReactNode;
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
				{...props.drawerProps}
				className={cn("", className)}
				asChild
			>
				{children}
			</DrawerTrigger>
		);
	} else {
		return (
			<DialogTrigger
				{...props.dialogProps}
				className={cn("", className)}
				nativeButton={false}
				render={<div>{children}</div>}
			/>
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
				{children}
			</DialogContent>
		);
	}
};
