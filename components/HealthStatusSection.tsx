import React from "react";

export default function HealthStatusSection({
	healthStatus,
	patient,
	currentDoctor,
}: {
	patient: IPatient;
	currentDoctor: IDoctor;
	healthStatus: IHealthStatus;
}) {
	return <div>HealthStatusSection</div>;
}
