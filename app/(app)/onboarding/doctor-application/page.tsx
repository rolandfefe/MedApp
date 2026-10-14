import DoctorForm from "@/components/forms/DoctorForm";

export const dynamic = "force-dynamic";

export default function page() {
	return (
		<div>
			<DoctorForm
				action="Create"
				className="w-full p-2 mx-auto sm:w-[90vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw] "
			/>
		</div>
	);
}
