"use client";

import { cn } from "@/lib/utils";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ComponentProps, useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Heading from "../custom/Heading";
import Image from "next/image";
import { motion, motionValue } from "motion/react";

export default function DashboardCard({
	title,
	icon,
	n,
	imageSrc,
	...props
}: {
	title: string;
	icon: IconName;
	n: number;
	imageSrc: string;
} & ComponentProps<typeof Card>) {
	const [imgRotate, setImgRotate] = useState(-45);

	console.log(imgRotate);

	return (
		<motion.div
			whileHover={{
				scale: 1.05,
			}}
			whileTap={{
				scale: 0.965,
			}}
			onHoverStart={() => setImgRotate(0)}
		>
			<Card
				{...props}
				className={cn(
					"h-32 w48 p-0 glass-shadow relative cursor-pointer overflow-hidden",
					props.className
				)}
			>
				<CardContent className="p-2">
					<Heading className="font-medium text-primary text-xl">
						<DynamicIcon name={icon} />
						{title}
					</Heading>

					<Badge
						variant={"default"}
						className="textprimary glass-shadow font-semibold absolute bottom-2 right-2"
					>
						{n}
					</Badge>

					<motion.div
						initial={{ rotateZ: -45 }}
						whileHover={{ rotateZ: 0 }}
						className="absolute -bottom-2 left-2 w-24"
					>
						<Image
							src={imageSrc}
							alt="Tile-img"
							width={999}
							height={999}
							className="w-full"
						/>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
