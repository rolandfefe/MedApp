"use client";

import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNavigation,
} from "../motion-primitives/carousel";
import Void from "../custom/Void";
import {
	Apple,
	BottleWine,
	Bug,
	Cigarette,
	Cross,
	ForkKnife,
	Hospital,
	Hotel,
	Link,
	Notebook,
	TreeDeciduous,
	Users,
	Weight,
} from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Badge } from "../ui/badge";
import moment from "moment";
import { Separator } from "../ui/separator";

export default function HistoryCard({
	currentUser,
	history,
	className,
}: {
	currentUser: IUser;
	history: IHistory;
	className?: string;
}) {
	const {
		diseaseHistory,
		surgicalHistory,
		familyHistory,
		allergies,
		socialHistory,
		exercise,
		diet,
		notes,
	} = history;

	const { state: sidebarState } = useSidebar();

	return (
		<div className={cn("", className)}>
			<DiseaseHistorySection diseaseHistory={diseaseHistory} />
			<Separator className="my-4" />
			<SurgicalHistorySection surgicalHistory={surgicalHistory} />
			<Separator className="my-4" />

			<FamilyHistorySection familyHistory={familyHistory} />
			<Separator className="my-4" />

			<AllergiesSection allergies={allergies} />
			<Separator className="my-4" />

			<SocialHistorySection socialHistory={socialHistory} />
			<Separator className="my-4" />

			<section>
				<div className="mb-3">
					<p className="font-medium">Additional History</p>
				</div>

				<div className="space-y-3">
					{exercise && (
						<Card className={cn("glass-shadow")}>
							<CardContent className="space-y-4">
								<h6 className="font-medium flex items-center gap-x-1 ">
									<Weight />
									<span>Exercise</span>
								</h6>

								<p className="text-sm text-muted-foreground">{exercise}</p>
							</CardContent>
						</Card>
					)}

					{diet && (
						<Card className={cn("glass-shadow")}>
							<CardContent className="space-y-4">
								<h6 className="font-medium flex items-center gap-x-1 ">
									<Apple />
									<span>Diet</span>
								</h6>

								<p className="text-sm text-muted-foreground">{diet}</p>
							</CardContent>
						</Card>
					)}

					{notes && (
						<Card className={cn("glass-shadow")}>
							<CardContent className="space-y-4">
								<h6 className="font-medium flex items-center gap-x-1 ">
									<Notebook />
									<span>Notes</span>
								</h6>
								<p className="text-sm font-medium text-muted-foreground">
									{notes}
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</section>
		</div>
	);
}

const DiseaseHistorySection = ({
	diseaseHistory,
}: {
	diseaseHistory: IHistory["diseaseHistory"];
}) => {
	const { state: sidebarState } = useSidebar();

	return (
		<section>
			<div className="mb-3">
				<p className="font-medium">Disease History</p>
			</div>

			<Carousel className="hidden sm:inline">
				<CarouselContent className="gap-x-3">
					{diseaseHistory.length > 0 ? (
						diseaseHistory.map((disease, i) => (
							<CarouselItem
								key={i}
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32.5%] ",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<DiseaseCard dx={disease} className="" />
							</CarouselItem>
						))
					) : (
						<Void msg="No disease history" />
					)}
				</CarouselContent>
			</Carousel>

			<div className="space-y-3 sm:hidden">
				{diseaseHistory.length > 0 ? (
					diseaseHistory.map((disease, i) => (
						<DiseaseCard dx={disease} key={i} />
					))
				) : (
					<Void msg="No disease history" />
				)}
			</div>
		</section>
	);
};

const SurgicalHistorySection = ({
	surgicalHistory,
}: {
	surgicalHistory: IHistory["surgicalHistory"];
}) => {
	const { state: sidebarState } = useSidebar();

	return (
		<section>
			<div className="mb-3">
				<p className="font-medium">Surgical History</p>
			</div>

			<Carousel className="hidden sm:inline">
				<CarouselContent className="gap-x-3">
					{surgicalHistory.length > 0 ? (
						surgicalHistory.map((sg, i) => (
							<CarouselItem
								key={i}
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32%]",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<SurgicalCard sg={sg} />
							</CarouselItem>
						))
					) : (
						<Void msg="No disease history" />
					)}
				</CarouselContent>
			</Carousel>

			<div className="space-y-3 sm:hidden">
				{surgicalHistory.length > 0 ? (
					surgicalHistory.map((sg, i) => <SurgicalCard sg={sg} key={i} />)
				) : (
					<Void msg="No disease history" />
				)}
			</div>
		</section>
	);
};

const FamilyHistorySection = ({
	familyHistory,
}: {
	familyHistory: IHistory["familyHistory"];
}) => {
	const { state: sidebarState } = useSidebar();

	return (
		<section>
			<div className="mb-3">
				<p className="font-medium">Family History</p>
			</div>

			<Carousel className="hidden sm:inline">
				<CarouselContent className="gap-x-3">
					{familyHistory.length > 0 ? (
						familyHistory.map((fm, i) => (
							<CarouselItem
								key={i}
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32%]",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<FamilyCard fm={fm} />
							</CarouselItem>
						))
					) : (
						<Void msg="No Family history" />
					)}
				</CarouselContent>
			</Carousel>

			<div className="space-y-3 sm:hidden">
				{familyHistory.length > 0 ? (
					familyHistory.map((fm, i) => <FamilyCard fm={fm} key={i} />)
				) : (
					<Void msg="No disease history" />
				)}
			</div>
		</section>
	);
};

const AllergiesSection = ({
	allergies,
}: {
	allergies: IHistory["allergies"];
}) => {
	const { state: sidebarState } = useSidebar();

	return (
		<section>
			<div className="mb-3">
				<p className="font-medium">Allergies</p>
			</div>

			<Carousel className="hidden sm:inline">
				<CarouselContent className="gap-x-3">
					{allergies.length > 0 ? (
						allergies.map((al, i) => (
							<CarouselItem
								key={i}
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32%]",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<AllergyCard al={al} />
							</CarouselItem>
						))
					) : (
						<Void msg="No Family history" />
					)}
				</CarouselContent>
			</Carousel>

			<div className="space-y-3 sm:hidden">
				{allergies.length > 0 ? (
					allergies.map((al, i) => <AllergyCard al={al} key={i} />)
				) : (
					<Void msg="No disease history" />
				)}
			</div>
		</section>
	);
};

const SocialHistorySection = ({
	socialHistory,
}: {
	socialHistory: IHistory["socialHistory"];
}) => {
	const { state: sidebarState } = useSidebar();
	const { smoking, alcohol, substanceUse } = socialHistory;

	return (
		<section>
			<div className="mb-3">
				<p className="font-medium">Social History</p>
			</div>

			<Carousel className="hidden sm:inline">
				<CarouselContent className="gap-x-3">
					{socialHistory ? (
						<>
							<CarouselItem
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32%]",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<Card className={cn("glass-shadow")}>
									<CardContent className="space-y-4">
										<h6 className="font-medium flex items-center gap-x-1 ">
											<Cigarette />
											<span>Smoking</span>
										</h6>

										<div className="flex items-center justify-between">
											<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
												{smoking.status}-{smoking.years && smoking.years} yrs
											</Badge>

											<p className="text-xs text-muted-foreground">
												{moment(smoking.lastUse ?? smoking.quitDate).format(
													"D-MMM-YY"
												)}
											</p>
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
							<CarouselItem
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32%]",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<Card className={cn("glass-shadow")}>
									<CardContent className="space-y-4">
										<h6 className="font-medium flex items-center gap-x-1 ">
											<BottleWine />
											<span>Alcohol</span>
										</h6>

										<div className="flex items-center justify-between">
											<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
												{alcohol.status}-{alcohol.years && alcohol.years} yrs
											</Badge>

											<p className="text-xs text-muted-foreground">
												{moment(alcohol.lastUse ?? alcohol.quitDate).format(
													"D-MMM-YY"
												)}
											</p>
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
							<CarouselItem
								className={cn(
									"basis-[80%] sm:basis-[46%] md:basis-[32%]",
									sidebarState === "expanded" &&
										"md:basis-[46%] xl:basis-[32.5%]"
								)}
							>
								<Card className={cn("glass-shadow")}>
									<CardContent className="space-y-4">
										<h6 className="font-medium flex items-center gap-x-1 ">
											<TreeDeciduous />
											<span>Substance</span>
										</h6>
										<p className="text-sm font-medium text-muted-foreground">
											{substanceUse?.substances.join(", ")}
										</p>

										<div className="flex items-center justify-between">
											<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
												{substanceUse?.status}
											</Badge>

											<p className="text-xs text-muted-foreground">
												{moment(
													substanceUse?.lastUse ?? substanceUse?.quitDate
												).format("D-MMM-YY")}
											</p>
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
						</>
					) : (
						<Void msg="No Family history" />
					)}
				</CarouselContent>
			</Carousel>

			<div className="space-y-3 sm:hidden">
				{socialHistory ? (
					<>
						<CarouselItem
							className={cn(
								"basis-[80%] sm:basis-[46%] md:basis-[32%]",
								sidebarState === "expanded" && "md:basis-[46%] xl:basis-[32.5%]"
							)}
						>
							<Card className={cn("glass-shadow")}>
								<CardContent className="space-y-4">
									<h6 className="font-medium flex items-center gap-x-1 ">
										<Cigarette />
										<span>Smoking</span>
									</h6>

									<div className="flex items-center justify-between">
										<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
											{smoking.status}-{smoking.years && smoking.years} yrs
										</Badge>

										<p className="text-xs text-muted-foreground">
											{moment(smoking.lastUse ?? smoking.quitDate).format(
												"D-MMM-YY"
											)}
										</p>
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
						<CarouselItem
							className={cn(
								"basis-[80%] sm:basis-[46%] md:basis-[32%]",
								sidebarState === "expanded" && "md:basis-[46%] xl:basis-[32.5%]"
							)}
						>
							<Card className={cn("glass-shadow")}>
								<CardContent className="space-y-4">
									<h6 className="font-medium flex items-center gap-x-1 ">
										<BottleWine />
										<span>Alcohol</span>
									</h6>

									<div className="flex items-center justify-between">
										<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
											{alcohol.status}-{alcohol.years && alcohol.years} yrs
										</Badge>

										<p className="text-xs text-muted-foreground">
											{moment(alcohol.lastUse ?? alcohol.quitDate).format(
												"D-MMM-YY"
											)}
										</p>
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
						<CarouselItem
							className={cn(
								"basis-[80%] sm:basis-[46%] md:basis-[32%]",
								sidebarState === "expanded" && "md:basis-[46%] xl:basis-[32.5%]"
							)}
						>
							<Card className={cn("glass-shadow")}>
								<CardContent className="space-y-4">
									<h6 className="font-medium flex items-center gap-x-1 ">
										<TreeDeciduous />
										<span>Substance</span>
									</h6>
									<p className="text-sm font-medium text-muted-foreground">
										{substanceUse?.substances.join(", ")}
									</p>

									<div className="flex items-center justify-between">
										<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
											{substanceUse?.status}
										</Badge>

										<p className="text-xs text-muted-foreground">
											{moment(
												substanceUse?.lastUse ?? substanceUse?.quitDate
											).format("D-MMM-YY")}
										</p>
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
					</>
				) : (
					<Void msg="No Family history" />
				)}
			</div>
		</section>
	);
};

const DiseaseCard = ({
	dx,
	className,
	...props
}: { dx: IHistory["diseaseHistory"][number] } & ComponentProps<
	typeof Card
>) => {
	return (
		<Card {...props} className={cn("glass-shadow", className)}>
			<CardContent className="space-y-4">
				<h6 className="font-medium flex items-center gap-x-1 ">
					<Bug />
					<span>{dx.name}</span>
				</h6>

				<div className="flex items-center gapx3 justify-between">
					{dx.resolved ? (
						<Badge className="text-primary bg-primary/30">
							resolved-<span>{moment(dx.resolutionDate).fromNow(true)}</span>
						</Badge>
					) : (
						<Badge className="text-destructive bg-destructive/30">
							unresolved
						</Badge>
					)}

					<p className="text-xs text-muted-foreground">
						{moment(dx.diagnosisDate).format("D-MMM-YY")}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

const SurgicalCard = ({
	sg,
	className,
	...props
}: { sg: IHistory["surgicalHistory"][number] } & ComponentProps<
	typeof Card
>) => {
	return (
		<Card {...props} className={cn("glass-shadow", className)}>
			<CardContent className="space-y-4">
				<h6 className="font-medium flex items-center gap-x-1 ">
					<ForkKnife />
					<span>{sg.procedure}</span>
				</h6>

				<div className="flex items-center gapx3 justify-between">
					<Badge className="text-primary bg-primary/30">
						<Hospital />
						{sg.facility}
					</Badge>

					<p className="text-xs text-muted-foreground">
						{moment(sg.date).format("D-MMM-YY")}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

const FamilyCard = ({
	fm,
	className,
	...props
}: { fm: IHistory["familyHistory"][number] } & ComponentProps<typeof Card>) => {
	return (
		<Card {...props} className={cn("glass-shadow", className)}>
			<CardContent className="space-y-4">
				<h6 className="font-medium flex items-center gap-x-1 ">
					<Users />
					<span>{fm.condition}</span>
				</h6>
				<p className="text-xs text-muted-foreground">{fm.notes}</p>

				<div className="flex items-center justify-between">
					<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
						<Link />
						{fm.relation}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

const AllergyCard = ({
	al,
	className,
	...props
}: { al: IHistory["allergies"][number] } & ComponentProps<typeof Card>) => {
	return (
		<Card {...props} className={cn("glass-shadow", className)}>
			<CardContent className="space-y-4">
				<h6 className="font-medium flex items-center gap-x-1 ">
					<Cross />
					<span>{al.substance}</span>
				</h6>
				<p className="text-xs text-muted-foreground">{al.reaction}</p>

				<div className="flex items-center justify-between">
					<Badge className="text-primary bg-primary/30 dark:bg-primary/20">
						{al.severity}
					</Badge>

					<p className="text-xs text-muted-foreground">
						{moment(al.lastReactionDate).format("D-MMM-YY")}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
