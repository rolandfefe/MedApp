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
	Building2,
	Calendar1,
	ChartBarIcon,
	CreditCard,
	Cross,
	Crosshair,
	Edit3,
	GraduationCap,
	HandCoins,
	HandPlatter,
	Languages,
	MailIcon,
	Phone,
	PhoneCall,
	User,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Variants, motion, stagger } from "motion/react";
import { ScrollArea } from "../ui/scroll-area";
import moment from "moment";
import Heading from "../custom/Heading";
import { DocumentControls, GearIcon } from "@payloadcms/ui";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "../motion-primitives/carousel";
import MedicalCertificationCard from "../cards/MedicalCertificationCard";
import LicenseCard from "../cards/LicenseCard";
import BoardCertificationCard from "../cards/BoardCertificationCard";
import HospitalAffiliationCard from "../cards/HospitalAffiliationCard";

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

			<DynamicPanelContent className="sm:flex gap-1 items-start p-0 overflow-hidden min-h-[94vh]! sm:min-h-[70vh]! sm:min-w-[75vw]! md:min-w-[60vw]!">
				<DoctorProfilePanel.UserInfoAside
					doctor={doctor}
					className="h-fit w-[97%] rounded-lg sm:rounded-r-none mx-auto sm:h-[75vh] sm:w-56"
				/>

				<div className="flex-1 p-2 w-full">
					<Tabs defaultValue="Fundamentals">
						<TabsList className="flex mx-auto">
							<TabsTrigger value="Fundamentals">Fundamentals</TabsTrigger>
							{/* <TabsTrigger value="Specialties">Specialties</TabsTrigger> */}
							<TabsTrigger value="Contacts">Contacts</TabsTrigger>
							<TabsTrigger value="Credentials">Credentials</TabsTrigger>
						</TabsList>

						<ScrollArea className="h-[52vh] sm:h-[66vh]">
							<TabsContent value="Fundamentals">
								<DoctorProfilePanel.FundamentalsTab doctor={doctor} />
							</TabsContent>
							<TabsContent value="Contacts">
								<DoctorProfilePanel.ContactsTab doctor={doctor} />
							</TabsContent>
							<TabsContent value="Credentials">
								<DoctorProfilePanel.CredentialsTab doctor={doctor} />
							</TabsContent>
						</ScrollArea>
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
		<div className={cn("relative bg-secondary glass-shadow p2", className)}>
			{/* <UserCard user={doctor.user as IUser} /> */}
			<section>
				{/* {isSmScreen ? (
					<DoctorCard.LG doctor={doctor} className="shadow-none border-0" />
					) : (
						<DoctorCard.MD doctor={doctor} hideBadges className="shadow-none" />
						)} */}
				<DoctorCard.LG doctor={doctor} className="shadow-none border-0" />
				{/* <Separator className="mb-2" /> */}
			</section>
			{/* <div className="p-2 bg-background/40 text-xs rounded-lg text-muted-foreground ">
				<p>{doctor.bio}</p>
			</div> */}
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
	const specialties = doctor.specialties!;
	const metrics = doctor.metrics!;

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.9) }}
			className={cn("space-y-4", className)}
		>
			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3) }}
				layout
				className="space-y-2"
			>
				<motion.div variants={motionVariants} layout>
					<Heading className="font-medium text-primary text-lg">
						<User />
						<span>Personal:</span>
					</Heading>
				</motion.div>

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
			</motion.section>

			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3) }}
				layout
				className="space-y-3"
			>
				<motion.div variants={motionVariants} layout className="text-primary">
					<Heading className="font-medium text-primary text-lg">
						<HandCoins />
						<span>Specialties:</span>
					</Heading>
				</motion.div>

				{specialties.map((s) => (
					<motion.div
						variants={motionVariants}
						layout
						key={s.id}
						className="space-y-2"
					>
						<div className="flex items-center gap-x-2">
							<div className="flex-1 space-y-2">
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<Calendar1 size={18} />
									<span>Primary:</span>
								</p>
								<p className="font-mono">{s.primary}</p>
							</div>
							<div className="flex-1 space-y-2">
								<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
									<Calendar1 size={18} />
									<span>Secondary:</span>
								</p>
								<p className="font-mono">{s.secondary}</p>
							</div>
						</div>

						<Separator />
					</motion.div>
				))}
			</motion.section>

			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3), delay: 0.3 * 5 }}
				layout
				className="space-y-3"
			>
				<motion.div variants={motionVariants} layout>
					<Heading className="font-medium text-primary text-lg">
						<ChartBarIcon size={18} />
						<span>Metrics:</span>
					</Heading>
				</motion.div>

				<motion.div variants={motionVariants} layout className="space-y-2">
					<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
						<Cross size={18} />
						<span>Number of Patients:</span>
					</p>
					<p className="font-mono">{metrics.numberOfPatients} patients</p>
					<Separator />
				</motion.div>
				<motion.div variants={motionVariants} layout className="space-y-2">
					<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
						<HandPlatter size={18} />
						<span>Experience:</span>
					</p>
					<p className="font-mono">{metrics.experience} years</p>
					<Separator />
				</motion.div>

				{/* Design Rating Card */}
				{/* <motion.div variants={motionVariants} layout className="space-y-2">
					<p className="text-xs md:text-sm font-medium text-muted-foreground flex items-center gap-x-1">
						<Stars size={18} />
						<span>Rating</span>
					</p>
					<p className="font-mono">{doctor.languages?.join(", ")}</p>
					<Separator />
				</motion.div> */}
			</motion.section>
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
	const contacts = doctor.contact;

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
			className={cn("space-y-3", className)}
		>
			<motion.div variants={motionVariants} layout className="space-y-2">
				<Heading className="font-medium text-primary">
					<Phone size={18} />
					<span>Office Phone:</span>
				</Heading>
				<p className="font-mono">{contacts.officePhone}</p>
				<Separator />
			</motion.div>
			<motion.div variants={motionVariants} layout className="space-y-2">
				<Heading className="font-medium text-primary">
					<MailIcon size={18} />
					<span>Office email:</span>
				</Heading>
				<p className="font-mono">{contacts.officeEmail}</p>
				<Separator />
			</motion.div>
			{contacts.mobilePhone && (
				<motion.div variants={motionVariants} layout className="space-y-2">
					<Heading className="font-medium text-primary">
						<PhoneCall size={18} />
						<span>Personal phone:</span>
					</Heading>
					<p className="font-mono">{contacts.mobilePhone}</p>
					<Separator />
				</motion.div>
			)}{" "}
		</motion.div>
	);
};

DoctorProfilePanel.CredentialsTab = ({
	doctor,
	className,
}: {
	doctor: IDoctor;
	className?: string;
}) => {
	const medicalCertifications = doctor.credentials.medicalCertifications!;
	const licenses = doctor.credentials.licenses!;
	const boardCertifications = doctor.credentials.boardCertifications!;
	const hospitalAffiliations = doctor.credentials.hospitalAffiliations!;

	return (
		<motion.div
			variants={motionVariants}
			initial="hidden"
			animate="visible"
			transition={{ delayChildren: stagger(0.3) }}
			className={cn("space-y-3", className)}
		>
			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3) }}
				layout
				className="space-y-2"
			>
				<motion.div variants={motionVariants} layout>
					<Heading className="font-medium text-primary text-lg">
						<GraduationCap />
						<span>Medical Certifications:</span>
					</Heading>
				</motion.div>

				<motion.div variants={motionVariants} layout>
					<Carousel>
						<CarouselContent className="gap-x-2">
							{medicalCertifications.map((m) => (
								<CarouselItem key={m.id} className="basis-full sm:basis-[90%]">
									<MedicalCertificationCard certification={m} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</motion.div>
			</motion.section>

			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3) }}
				layout
				className="space-y-2"
			>
				<motion.div variants={motionVariants} layout>
					<Heading className="font-medium text-primary text-lg">
						<CreditCard />
						<span>Licenses:</span>
					</Heading>
				</motion.div>

				<motion.div variants={motionVariants} layout>
					<Carousel>
						<CarouselContent className="gap-x-2">
							{licenses.map((l) => (
								<CarouselItem key={l.id} className="basis-full sm:basis-[90%]">
									<LicenseCard license={l} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</motion.div>
			</motion.section>

			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3) }}
				layout
				className="space-y-2"
			>
				<motion.div variants={motionVariants} layout>
					<Heading className="font-medium text-primary text-lg">
						<Building2 />
						<span>Board Certifications:</span>
					</Heading>
				</motion.div>

				<motion.div variants={motionVariants} layout>
					<Carousel>
						<CarouselContent className="gap-x-2">
							{boardCertifications.map((b) => (
								<CarouselItem key={b.id} className="basis-full sm:basis-[90%]">
									<BoardCertificationCard certification={b} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</motion.div>
			</motion.section>

			<motion.section
				variants={motionVariants}
				transition={{ delayChildren: stagger(0.3) }}
				layout
				className="space-y-2"
			>
				<motion.div variants={motionVariants} layout>
					<Heading className="font-medium text-primary text-lg">
						<Crosshair />
						<span>Hospital affiliations:</span>
					</Heading>
				</motion.div>

				<motion.div variants={motionVariants} layout>
					<Carousel>
						<CarouselContent className="gap-x-2">
							{hospitalAffiliations.map((h) => (
								<CarouselItem key={h.id} className="basis-full sm:basis-[90%]">
									<HospitalAffiliationCard hospital={h} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</motion.div>
			</motion.section>
		</motion.div>
	);
};
