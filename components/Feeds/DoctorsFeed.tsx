"use client";

import { useCurrent } from "@/contexts/Current.context";
import { useDoctors } from "@/contexts/Doctors.context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import DoctorCard from "../cards/DoctorCard";
import Void from "../custom/Void";
import DoctorSearchBox from "../DoctorSearchBox";

export default function DoctorsFeed() {
	const currentPatient = useCurrent().currentPatient as IPatient;
	const { doctors } = useDoctors();

	const [results, setResults] = useState<IDoctor[]>(doctors);
	const [selected, setSelected] = useState<IDoctor>();

	return (
		<div className="space-y-3 sm:p-3">
			<DoctorSearchBox
				doctors={doctors}
				selectedDoctor={selected}
				setSelectedDoctor={setSelected}
				setSearchResults={setResults}
				mode="Node"
				className="glass-bg glass-shadow"
			/>

			<section>
				<AnimatePresence>
					{results.length > 0 ? (
						results?.map((doctor) => {
							return (
								<motion.div
									key={doctor.id}
									layout
									initial={{ opacity: 0, y: 100 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 100 }}
									className="mb-3"
								>
									<DoctorCard doctor={doctor} className={cn("w-full")} />
									{/* {doctor.user.username} */}
								</motion.div>
							);
						})
					) : (
						<Void msg={`🔎 Not Found !😢`} className="w-full sm:w-1/2" />
					)}
				</AnimatePresence>
			</section>
		</div>
	);
}
