import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function DoctorCard({
	doctor,
	variant = "sm",
	className,
}: {
	doctor: IDoctor;
	variant?: "xs" | "sm" | "md" | "lg";
	className?: string;
}) {
	const user = doctor.user as IUser;
	if (variant === "xs") {
		return (
			<Card className={cn("w-fit bg-transparent hover:bg-muted", className)}>
				<CardContent className="">
					<section className="flex items-start gap-x-2">
						<Avatar className="size-10 rounded-lg">
							<AvatarImage src={user.imageUrl!} />
							<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						{/* <Tooltip>
							<TooltipTrigger asChild> */}
						<div className="space-y-2 ">
							<div className="leading-tight">
								<p className="line-clamp-1 font-medium">
									Dr. <span>{user.fname}</span> <span>{user.lname}</span>
								</p>

								<p className="text-xs text-muted-foreground line-clamp-1">
									{doctor.contact.officeEmail ?? `@${user.username}`}
								</p>
							</div>
						</div>
						{/* </TooltipTrigger>
							<TooltipContent>
								{doctor.specialties.map((s, i) => (
									<Badge
										key={i}
										variant="secondary"
										className="rounded-2xl bg-transparent"
									>
										{s.primary}
									</Badge>
								))}
							</TooltipContent>
						</Tooltip> */}
					</section>
				</CardContent>
			</Card>
		);
	} else if (variant === "sm") {
		return (
			<Card className={cn(" bg-transparent hover:bg-muted", className)}>
				<CardContent className="">
					<section className="flex items-start gap-x-2">
						<Avatar className="size-10 rounded-lg">
							<AvatarImage src={user.imageUrl!} />
							<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-2 ">
							<div className="leading-tight">
								<p className="line-clamp-1 font-medium">
									Dr. <span>{user.fname}</span> <span>{user.lname}</span>
								</p>

								<p className="text-xs text-muted-foreground">
									{doctor.contact.officeEmail ?? `@${user.username}`}
								</p>
							</div>
							{/* <div className="hidden sm:flex items-center gap-2 flex-wrap">
								{doctor.specialties.map((s, i) => (
									<Badge key={i} variant="secondary" className="rounded-2xl">
										{s.primary}
									</Badge>
								))}
							</div> */}
						</div>
					</section>
					<div className="flex items-center gap-1">
						{doctor.specialties!.map((s, i) => (
							<Badge key={i} variant="secondary" className="rounded-2xl">
								{s.primary}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		);
	} else {
	}
	return <div></div>;
}

DoctorCard.XS = ({ doctor, className }: ComponentProps<typeof DoctorCard>) => {
	const user = doctor.user as IUser;

	return (
		<Card className={cn("w-fit bg-transparent hover:bg-muted", className)}>
			<CardContent className="">
				<section className="flex items-start gap-x-2">
					<Avatar className="size-10 rounded-lg">
						<AvatarImage src={user.imageUrl!} />
						<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>

					{/* <Tooltip>
							<TooltipTrigger asChild> */}
					<div className="space-y-2 ">
						<div className="leading-tight">
							<p className="line-clamp-1 font-medium">
								Dr. <span>{user.fname}</span> <span>{user.lname}</span>
							</p>

							<p className="text-xs text-muted-foreground line-clamp-1">
								{doctor.contact.officeEmail ?? `@${user.username}`}
							</p>
						</div>
					</div>
				</section>
			</CardContent>
		</Card>
	);
};

DoctorCard.SM = ({ doctor, className }: ComponentProps<typeof DoctorCard>) => {
	const user = doctor.user as IUser;

	return (
		<Card className={cn("bg-transparent hover:bg-muted", className)}>
			<CardContent className="space-y-2">
				<section className="flex items-start gap-x-2">
					<Avatar className="size-10 rounded-lg">
						<AvatarImage src={user.imageUrl!} />
						<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="space-y-2 ">
						<div className="leading-tight">
							<p className="line-clamp-1 font-medium">
								Dr. <span>{user.fname}</span> <span>{user.lname}</span>
							</p>

							<p className="text-xs text-muted-foreground">
								{doctor.contact.officeEmail ?? `@${user.username}`}
							</p>
						</div>
						{/* <div className="hidden sm:flex items-center gap-2 flex-wrap">
								{doctor.specialties.map((s, i) => (
									<Badge key={i} variant="secondary" className="rounded-2xl">
										{s.primary}
									</Badge>
								))}
							</div> */}
					</div>
				</section>
				<div className="flex items-center gap-1">
					{doctor.specialties!.map((s, i) => (
						<Badge key={i} variant="secondary" className="rounded-2xl">
							{s.primary}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
