import {
	eArticleCategories,
	eArticleType,
	eConfidenceLevel,
	eLaterality,
	eRouteOfAdministration,
	eReminderVariants,
	eSeverity,
	eWeekDays,
} from "@/types/enums/enums";
import {
	Appointment,
	Article,
	Diagnosis,
	Doctor,
	DoctorNav,
	HealthStatus,
	History,
	LandingNav,
	Message,
	Patient,
	PatientNav,
	RecurrencePlan,
	Referral,
	User,
	Verdict,
} from "./payload";
import { IntersectingRef } from "@/hooks/useLoadMore";

export {};

declare global {
	interface Base {
		id?: string;
		createdAt?: Date | string;
		updatedAt?: Date | string;
	}

	interface IPagination {
		// nextPg: number; // ? Might not be needed
		isLoading: boolean;
		loadRef: IntersectingRef;
	}

	type IUser = User;
	type IPatient = Patient;
	type IDoctor = Doctor;
	type IAppointment = Appointment;
	type IReferral = Referral;
	type IMessage = Message;
	type IHistory = History;
	type IDiagnosis = Diagnosis;
	type IRecurrencePlan = RecurrencePlan;
	type IHealthStatus = HealthStatus;
	type IVerdict = Verdict;
	type IArticle = Article

	// Globals
	type ILandingNav = LandingNav;
	type IPatientNav = PatientNav;
	type IDoctorNav = DoctorNav;

	interface ISchedule extends Base {
		doctor: IDoctor | string;
		officeHours: Array<{
			dayOfWeek: eWeekDays;
			startTime: string; // in HH:MM format
			endTime?: string;
			isAvailable: boolean;
		}>;
		averageAppointmentDuration: string;
		isAcceptingNewPatients: boolean;
		nextAvailableAppointmentDate?: Date | string;
	}


	interface IReminder extends Base {
		user: IUser | string;

		variant: eReminderVariants;
		item: IAppointment | IMedication | string;
		body: string;

		scheduledTime: Date | string;
		sent: boolean;
		status?: "pending" | "sent" | "failed";
	}


	interface CustomJwtSessionClaims extends Base {
		metadata: {
			onboardingComplete?: boolean;
		};
	}
}
