import { ComponentProps, ReactNode } from "react";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";

export default function DoctorNotesForm({
	appointment,
}: {
	appointment: IAppointment;
}) {
	const doctor = appointment.doctor as IDoctor
	const patient = appointment.patient as IPatient

	return <div>DoctorFormPanel</div>;
}

export const DoctorNotesFormPanel = ({
	children,
	...props
}: { children: ReactNode } & ComponentProps<typeof DoctorNotesForm>) => {
	return (
		<FormPanel>
			<FormPanelTrigger asChild>{children}</FormPanelTrigger>

			<FormPanelContent>
				<DoctorNotesForm {...props} />
			</FormPanelContent>
		</FormPanel>
	);
};
