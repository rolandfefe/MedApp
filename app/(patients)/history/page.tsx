import CopyBadge from "@/components/custom/CopyBadge";
import Heading from "@/components/custom/Heading";
import MyBtn from "@/components/custom/MyBtn";
import { HistoryFormPanel } from "@/components/forms/historyForm";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getHistory } from "@/lib/actions/history.action";
import { getPatient } from "@/lib/actions/patient.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { Edit3, History, PlusCircle } from "lucide-react";
import Image from "next/image";

export default async function page() {
	const currentUser = await getCurrentUser();
	const patient = await getPatient({ userId: currentUser._id! });
	const history = await getHistory({ patientId: patient._id });
	return (
		<div className="pt-5 md:px-10 space-y-3">
			<section className="flex flex-col sm:flex-row sm:items-start gap-3">
				<Image
					src={"/assets/doctors.svg"}
					alt="doctors"
					width={999}
					height={999}
					className="w-[70vw] sm:w-1/3 md:w-1/2 mx-auto sm:mx-0"
				/>

				<div className="space-y-2">
					<Heading className="text-2xl sm:text-3xl">
						<span>Patient</span>
						<span className="text-primary">History ⌛</span>
					</Heading>

					<div className="text-sm md:text-base space-y-2">
						<p>👉 This is where you can detail your Medical details.</p>
						<p>
							👉 This data will be visible to the Doctors who attend to you
							during appointments.
						</p>
						<p>👉 For best experience, maintain accuracy & credibility.</p>
					</div>
				</div>
			</section>

			<section className="relative border p-2 rounded-xl min-h-[45vh]">
				<div className="px-3 flex items-center gap-x-3 justify-between">
					<div>
						<Heading className="text-xl sm:text-2xl line-clamp-1">
							<span className="text-primary">
								{currentUser.fname} {currentUser.lname}'s
							</span>
							<span> History</span>
						</Heading>

						<CopyBadge variant="secondary" content={patient._id!}>
							{patient._id}
						</CopyBadge>
					</div>
					{history && (
						<HistoryFormPanel
							action="Update"
							currentUser={currentUser}
							history={history}
						>
							<MyBtn variant={"outline"}>
								<Edit3 />
								<span className="hidden md:inline">Update</span>
							</MyBtn>
						</HistoryFormPanel>
					)}
				</div>
				<Separator className="my-2" />

				<div className="">
					{history ? (
						"history data"
					) : (
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%]">
							<p className="text-muted-foreground text-center text-sm">
								No history data
							</p>
							<HistoryFormPanel action="Create" currentUser={currentUser}>
								<MyBtn variant={"secondary"} size="lg">
									Create history <PlusCircle />
								</MyBtn>
							</HistoryFormPanel>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
