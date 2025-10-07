import React from "react";

export default function VitalsSection({
	vitals,
	patient,
	currentDoctor,
}: {
	patient: IPatient;
	currentDoctor: IDoctor;
	vitals: IHealthStatus["vitals"];
}) {
	return <div>VitalsSection</div>;
}
