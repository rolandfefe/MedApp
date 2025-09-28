export default function getPatientFormStepper({
	form,
	submitHandler,
	errHandler,
}: {
	form;
	submitHandler: () => Promise<void>;
	errHandler: () => void;
}) {
	return <div>patientFormStepper</div>;
}
