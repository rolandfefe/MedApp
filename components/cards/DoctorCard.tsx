import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { DoctorFormPanel } from "../forms/DoctorForm";
import { Edit3 } from "lucide-react";
import { useCurrent } from "@/contexts/Current.context";
import DoctorProfilePanel from "../panels/DoctorProfilePanel";

export default function DoctorCard({
	doctor,
	className,
	hideProfile = false,
}: {
	doctor: IDoctor;
	className?: string;
	hideProfile?: boolean;
}) {
	const user = doctor.user as IUser;

	return (
		<Card className={cn("bg-transparent hover:bg-muted", className)}>
			<CardContent className="space-y-2">
				<section className="flex items-start gap-x-2">
					<DoctorProfilePanel
						dialogProps={{ disabled: hideProfile }}
						drawerProps={{ disabled: hideProfile }}
						doctor={doctor}
					>
						<Avatar className="size-10 rounded-lg">
							<AvatarImage src={user.imageUrl!} />
							<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</DoctorProfilePanel>

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
}

DoctorCard.XS = ({
	doctor,
	className,
	hideProfile = false,
}: ComponentProps<typeof DoctorCard>) => {
	const user = doctor.user as IUser;

	return (
		<Card className={cn("w-fit bg-transparent hover:bg-muted", className)}>
			<CardContent className="">
				<section className="flex items-start gap-x-2">
					<DoctorProfilePanel
						dialogProps={{ disabled: hideProfile }}
						drawerProps={{ disabled: hideProfile }}
						doctor={doctor}
					>
						<Avatar className="size-10 rounded-lg">
							<AvatarImage src={user.imageUrl!} />
							<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</DoctorProfilePanel>

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

DoctorCard.MD = ({ doctor, className }: ComponentProps<typeof DoctorCard>) => {
	const user = doctor.user as IUser;

	return (
		<Card className={cn("bg-transparent hover:bg-muted border-0", className)}>
			<CardContent className="space-y-3">
				<DoctorProfilePanel
					dialogProps={{ disabled: hideProfile }}
					drawerProps={{ disabled: hideProfile }}
					doctor={doctor}
				>
					<Avatar className="size-20 mx-auto">
						<AvatarImage src={user.imageUrl!} />
						<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DoctorProfilePanel>

				<section className="leading-tight text-center">
					<Heading className="text-lg font-medium justify-center">
						<span>Dr.{user.fname}</span> <span>{user.lname}</span>
					</Heading>
					<p className="text-xs sm:text-sm font-medium text-muted-foreground">
						{user.email}
					</p>
				</section>

				<section className="flex items-center justify-center gap-x-1">
					<Badge variant={"secondary"}>{doctor.gender}</Badge>
					<Badge variant={"secondary"}>
						{doctor.languages && doctor.languages[0]}
					</Badge>
					<Badge variant={"secondary"}>
						{doctor.specialties && doctor.specialties[0].primary}
					</Badge>
				</section>
			</CardContent>
		</Card>
	);
};

DoctorCard.LG = ({
	doctor,
	className,
	hideProfile = false,
	...props
}: ComponentProps<typeof DoctorCard>) => {
	const user = doctor.user as IUser;
	const currentUser = useCurrent().currentUser;

	const isOwner = user.id === currentUser.id;

	return (
		<Card {...props} className={cn("relative bg-transparent", className)}>
			<CardContent>
				<DoctorProfilePanel
					dialogProps={{ disabled: hideProfile }}
					drawerProps={{ disabled: hideProfile }}
					doctor={doctor}
				>
					<Avatar className="size-14 sm:size-20 mx-auto">
						<AvatarImage src={user.imageUrl!} />
						<AvatarFallback className="size-full rounded-lg bg-fuchsia-400 dark:bg-fuchsia-600">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DoctorProfilePanel>

				<section className="leading-tight text-center">
					<Heading className="text-lg font-medium justify-center">
						<span>Dr.{user.fname}</span> <span>{user.lname}</span>
					</Heading>
					<p className="text-xs sm:text-sm font-medium text-muted-foreground">
						{user.email}
					</p>
					<p className="text-sm text-muted-foreground font-mono">
						@{user.username}
					</p>
				</section>

				<div className="p-1 px-2 mt-3 bg-background/40 text-xs rounded-lg text-muted-foreground font-mono">
					<p>{doctor.bio}</p>
				</div>
			</CardContent>

			{isOwner && (
				<DoctorFormPanel className="absolute top-1 right-1">
					<MyBtn
						variant={"outline"}
						size={"icon"}
						className="rounded-full size-8"
					>
						<Edit3 size={20} />
					</MyBtn>
				</DoctorFormPanel>
			)}
		</Card>
	);
};

DoctorCard.Tag = ({
	doctor,
	className,
	hideProfile = false,
}: ComponentProps<typeof DoctorCard>) => {
	return (
		<DoctorProfilePanel
			dialogProps={{ disabled: hideProfile }}
			drawerProps={{ disabled: hideProfile }}
			doctor={doctor}
		>
			<div
				className={cn(
					"font-medium font-mono hover:text-primary cursor-pointer",
					className
				)}
			>
				@Dr.{doctor.user.fname}
			</div>
		</DoctorProfilePanel>
	);
};

DoctorCard.Actions = () => {
	return;
};
