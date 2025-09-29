import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { headerFont } from "../../app/fonts";

export default function Heading({
	children,
	className,
}: // icon,
{
	children: ReactNode;
	className?: string;
	// icon?: JSX.Element;
}) {
	return (
		<p
			className={cn(
				`${headerFont.className} flex items-center gap-x-1 font-medium`,
				className
			)}
		>
			{/* {icon} */}
			{children}
		</p>
	);
}
