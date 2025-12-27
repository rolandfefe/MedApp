"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import {
	DynamicPanel,
	DynamicPanelContent,
	DynamicPanelTrigger,
} from "../custom/DynamicPanel";
import { useMediaQuery } from "@uidotdev/usehooks";
import UserCard from "../cards/UserCard";
import DoctorCard from "../cards/DoctorCard";
import { DoctorFormPanel } from "../forms/DoctorForm";
import MyBtn from "../custom/MyBtn";
import {
	ArrowUpRightFromCircleIcon,
	Calendar1,
	Edit3,
	HandCoins,
	Languages,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Variants, motion, stagger } from "motion/react";
import { ScrollArea } from "../ui/scroll-area";
import moment from "moment";

const motionVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

export default function DoctorProfilePanel({
	doctor,
	children,
	className,
	...props
}: {
	doctor: IDoctor;
} & ComponentProps<typeof DynamicPanelTrigger>) {
	const user = doctor.user as IUser;

	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<DynamicPanel>
			<DynamicPanelTrigger {...props} className={cn("", className)}>
				{children}
			</DynamicPanelTrigger>

			<DynamicPanelContent className="sm:flex gap-1 items-start p-0 overflow-hidden min-h-[90vh]! sm:min-h-[70vh]! sm:min-w-[75vw]! md:min-w-[60vw]!">
				<DoctorProfilePanel.UserInfoAside
					doctor={doctor}
					className="h-fit w-[97%] rounded-lg mx-auto sm:h-[75vh] sm:w-56"
				/>

				<div className="flex-1 p-2">
					<Tabs defaultValue="Fundamentals">
						<TabsList className="flex mx-auto">
							<TabsTrigger value="Fundamentals">Fundamentals</TabsTrigger>
							<TabsTrigger value="Specialties">Specialties</TabsTrigger>
							<TabsTrigger value="Contacts">Contacts</TabsTrigger>
							<TabsTrigger value="Credentials">Credentials</TabsTrigger>
						</TabsList>

						{/* <ScrollArea></ScrollArea> */}
						<TabsContent value="Fundamentals">
							<DoctorProfilePanel.FundamentalsTab doctor={doctor} />
						</TabsContent>
						<TabsContent value="Contacts">
							<DoctorProfilePanel.ContactsTab doctor={doctor} />
						</TabsContent>
						<TabsContent value="Credentials">
							<DoctorProfilePanel.CredentialsTab doctor={doctor} />
						</TabsContent>
						<TabsContent value="Specialties">
							<DoctorProfilePanel.SpecialtiesTab doctor={doctor} />
						</TabsContent>
					</Tabs>
				</div>
			</DynamicPanelContent>
		</DynamicPanel>
	);
}

DoctorProfilePanel.UserInfoAside = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<div className={cn("relative bg-secondary glass-shadow p-2 ", className)}>
			{/* <UserCard user={doctor.user as IUser} /> */}
			<section>
				<DoctorCard.MD doctor={doctor} hideBadges className="shadow-none" />
				<Separator className="mb-2" />
			</section>
			<div className="p-2 bg-background/40 text-xs rounded-lg text-muted-foreground ">
				<p>{doctor.bio}</p>
			</div>

			<div className="sm:absolute bottom-0 left-0 w-full p-2">
				<DoctorFormPanel>
					<MyBtn variant={"outline"} size={"sm"}>
						<Edit3 />
						Edit Doctor profile
					</MyBtn>
				</DoctorFormPanel>
			</div>
		</div>
	);
};

DoctorProfilePanel.FundamentalsTab = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
			className="space-y-4"
		>
			<motion.div variants={motionVariants} layout className="space-y-2">
				<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
					<Calendar1 size={18} />
					<span>Date of birth:</span>
				</p>
				<p className="font-mono">{moment(doctor.DOB).format("Do-MM-YYYY")}</p>
				<Separator />
			</motion.div>
			<motion.div variants={motionVariants} layout className="space-y-2">
				<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
					<ArrowUpRightFromCircleIcon size={18} />
					<span>Gender:</span>
				</p>
				<p className="font-mono">{doctor.gender}</p>
				<Separator />
			</motion.div>
			<motion.div variants={motionVariants} layout className="space-y-2">
				<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
					<Languages size={18} />
					<span>Languages:</span>
				</p>
				<p className="font-mono">{doctor.languages?.join(", ")}</p>
				<Separator />
			</motion.div>
		</motion.div>
	);
};

DoctorProfilePanel.ContactsTab = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
		></motion.div>
	);
};

DoctorProfilePanel.SpecialtiesTab = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
		></motion.div>
	);
};

DoctorProfilePanel.ContactsTab = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
		></motion.div>
	);
};

DoctorProfilePanel.CredentialsTab = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
		></motion.div>
	);
};
