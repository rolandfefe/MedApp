import { cn, containsRegex } from "@/lib/utils";
import { eGender, eLanguages, eMedicalSpecialties } from "@/types/enums/enums";
import { uniqBy } from "lodash-es";
import {
	ChevronsUpDown,
	FunnelPlus,
	HandCoins,
	Languages,
	Loader,
	Search,
	UserPen,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
	useTransition,
} from "react";
import DoctorCard from "./cards/DoctorCard";
import Heading from "./custom/Heading";
import MyBtn from "./custom/MyBtn";
import Void from "./custom/Void";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "./ui/input-group";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface DoctorFilters {
	specialties?: eMedicalSpecialties;
	gender?: eGender;
	languages?: eLanguages;

	// ?Board filters
	// ?License filters
}

export default function DoctorSearchBox({
	doctors = [],
	setSelectedDoctor,
	selectedDoctor,
	mode = "Inset",
	setSearchResults,
	className,
}: {
	doctors: IDoctor[];
	setSelectedDoctor: Dispatch<SetStateAction<IDoctor | undefined>>;
	selectedDoctor: IDoctor | undefined;
	mode?: "Inset" | "Node";
	setSearchResults?: Dispatch<SetStateAction<IDoctor[]>>;
	className?: string;
}) {
	const [results, setResults] = useState<IDoctor[]>();
	const [q, setQ] = useState<string>("");
	const [filters, setFilters] = useState<DoctorFilters>();
	const [isSearching, startTransition] = useTransition();

	const handleSearch = () => {
		const regex = containsRegex(q);

		startTransition(() => {
			const queryResults = doctors.filter(
				({ user, bio, contact }) =>
					regex.test(user.username) ||
					regex.test(user.fname) ||
					regex.test(user.lname) ||
					regex.test(bio) ||
					regex.test(contact.officeEmail) ||
					// regex.test(contact.mobilePhone!) ||
					regex.test(contact.officePhone)
			);

			const filterResults = queryResults.filter(
				({ specialties, languages, gender }) => {
					return (
						specialties.find(
							({ primary, secondary }) =>
								primary == filters?.specialties ||
								secondary == filters?.specialties
						) ||
						languages.includes(filters?.languages) ||
						gender == filters?.gender
					);
				}
			);

			setResults(filters ? filterResults : queryResults);
			if (mode === "Node" && setSearchResults)
				setSearchResults(filters ? filterResults : queryResults);
		});
	};

	// console.log(results, doctors);

	useEffect(() => {
		if (q || filters) handleSearch();
	}, [q, filters]);

	return (
		<Card className={cn("", className)}>
			<CardContent className="space-y-3 p-3">
				<section>
					<Heading className="text-xl">
						<Search /> Search for
						<span className="text-primary">Doctor</span>
					</Heading>
					<p className="text-xs text-muted-foreground">
						Use filters for faster search
					</p>
				</section>

				<section>
					<InputGroup>
						<InputGroupInput
							placeholder="Doctor deep search..."
							// placeholder="username /first name/ last name/ bio/ office email/office phone..."
							value={q}
							onChange={(e) => setQ(e.target.value)}
						/>
						<InputGroupAddon align={"inline-start"}>
							{isSearching ? (
								<Loader className="animate-spin text-primary" />
							) : (
								<Search />
							)}
						</InputGroupAddon>

						{q && (
							<InputGroupAddon align="inline-end">
								<InputGroupButton variant="secondary" onClick={() => setQ("")}>
									<X />
								</InputGroupButton>
							</InputGroupAddon>
						)}
						{results && (
							<InputGroupAddon align={"inline-end"}>
								<Badge variant={"outline"} className="text-primary">
									{results.length}
								</Badge>
							</InputGroupAddon>
						)}
					</InputGroup>
				</section>

				<section className="">
					<Filters filters={filters} setFilters={setFilters} />
				</section>

				{mode === "Inset" && (
					<>
						{results && (q || filters) && (
							<ScrollArea className="h-80">
								<section className={cn(results.length > 0 && "pb-10")}>
									<AnimatePresence>
										{results.length > 0 ? (
											results.map((doctor) => {
												const isSelected = selectedDoctor?._id == doctor._id;

												return (
													<motion.div
														key={doctor._id}
														layout
														initial={{ opacity: 0, y: 100 }}
														animate={{ opacity: 1, y: 0 }}
														exit={{ opacity: 0, y: 100 }}
														onClick={() =>
															setSelectedDoctor(isSelected ? undefined : doctor)
														}
														className="mb-3"
													>
														<DoctorCard
															doctor={doctor}
															className={cn(
																"w-full",
																isSelected && "border-primary bg-muted"
															)}
														/>
														{/* {doctor.user.username} */}
													</motion.div>
												);
											})
										) : (
											<Void
												msg={`🔎 No results for "${q}"😢`}
												className="w-full sm:w-1/2"
											/>
										)}
									</AnimatePresence>
								</section>
								<ScrollBar className="!hidden" />
							</ScrollArea>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
}

const Filters = ({
	setFilters,
	filters,
}: {
	setFilters: Dispatch<SetStateAction<DoctorFilters | undefined>>;
	filters: DoctorFilters | undefined;
}) => {
	return (
		<div className="flex items-center gap-2 flex-wrap sm:justify-center">
			{filters ? (
				<MyBtn
					size="sm"
					variant="secondary"
					className="rounded-2xl shadow-none"
					onClick={() => setFilters(undefined)}
				>
					<X />
					<span className="hidden sm:inline">Clear</span>
				</MyBtn>
			) : (
				<MyBtn
					size="sm"
					variant="secondary"
					className="rounded-2xl shadow-none"
				>
					<FunnelPlus />
					<span className="hidden sm:inline">Filters</span>
				</MyBtn>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="text-sm">
					<MyBtn
						variant={filters?.specialties ? "secondary" : "outline"}
						size="sm"
						className={cn("rounded-2xl !text-xs text-muted-foreground")}
					>
						<HandCoins />
						<span
							className={cn(
								filters?.specialties ? "text-primary" : "text-muted-secondary"
							)}
						>
							{filters?.specialties ?? "Specialties"}
						</span>
						<ChevronsUpDown />
					</MyBtn>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{Object.entries(eMedicalSpecialties).map(([k, v]) => (
						<DropdownMenuItem
							key={k}
							onClick={() =>
								setFilters((prev) => ({ ...prev, specialties: v }))
							}
						>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild className="text-sm">
					<MyBtn
						variant={filters?.gender ? "secondary" : "outline"}
						size="sm"
						className={cn("rounded-2xl !text-xs text-muted-foreground")}
					>
						<UserPen />
						<span
							className={cn(
								filters?.gender ? "text-primary" : "text-muted-secondary"
							)}
						>
							{filters?.gender ?? "Gender"}
						</span>
						<ChevronsUpDown />
					</MyBtn>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{Object.entries(eGender).map(([k, v]) => (
						<DropdownMenuItem
							key={k}
							onClick={() => setFilters((prev) => ({ ...prev, gender: v }))}
						>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild className="text-sm">
					<MyBtn
						variant={filters?.languages ? "secondary" : "outline"}
						size="sm"
						className={cn("rounded-2xl !text-xs text-muted-foreground")}
					>
						<Languages />
						<span
							className={cn(
								filters?.languages ? "text-primary" : "text-muted-secondary"
							)}
						>
							{filters?.languages ?? "Languages"}
						</span>
						<ChevronsUpDown />
					</MyBtn>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{Object.entries(eLanguages).map(([k, v]) => (
						<DropdownMenuItem
							key={k}
							onClick={() => setFilters((prev) => ({ ...prev, languages: v }))}
						>
							{v}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
