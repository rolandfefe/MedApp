import { cn } from "@/lib/utils";
import React, { JSX, ReactNode } from "react";
import { headerFont } from "../layouts/fonts";

export default function Heading({
	children,
	className,
	// icon,
}: {
	children: ReactNode;
	className?: string;
	// icon?: JSX.Element;
}) {
	return (
		<h3 className={cn(`${headerFont.className} flex items-center gap-x-1 font-medium`, className)}>
			{/* {icon} */}
			{children}
		</h3>
	);
}
