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

export {};

declare global {
	interface Base {
		id?: string;
		createdAt?: Date | string;
		updatedAt?: Date | string;
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

	interface IArticle extends Base {
		id: string;
		title: string;
		subtitle?: string;
		authors: IDoctor[];

		// Publication Metadata
		publication?: {
			publisher: string;
			version?: string;
			Date: Date | string;
		};

		content: {
			body: Array<{
				sectionTitle: string;
				sectionContent: string;
			}>;
			supplementaryMaterials?: Array<{
				title: string;
				url: string;
			}>;
			figures: Array<{
				caption: string;
				url: string;
				type: "image" | "chart" | "graph" | "table";
			}>;
			references?: Array<{
				citation: string; // Full APA/AMA/Vancouver format citation
			}>;
		};

		validation: {
			peerReviewed: boolean;
			conflictOfInterestStatement: string;
			isVerified: boolean;
		};

		licensing: {
			copyright: string; // e.g., "© 2023 American Medical Association"
			licenseType: string; // e.g., "CC-BY-NC 4.0"
			isOpenAccess: boolean;
		};

		// Metadata for discoverability and administration
		meta: {
			articleType: eArticleType;
			categories: eArticleCategories; // MeSH terms or other categories

			reads: IUser[] | string[];
			likes: IUser[] | string[];
			dislikes: IUser[] | string[];
		};
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

	// interface IVerdict extends Base {
	// 	diagnosis: IDiagnosis | string; // Links back to the IDiagnosis record
	// 	doctor: IDoctor | string;

	// 	// Clinical Impact & Assessment
	// 	clinicalSummary: string; // Summary of the case and findings
	// 	complications?: string[]; // Any complications identified
	// 	prognosis: {
	// 		outlook: "excellent" | "good" | "fair" | "poor" | "guarded";
	// 		estimatedRecoveryTime?: string; // e.g., "2-4 weeks"
	// 		// notes?: string;
	// 	};

	// 	// Treatment Plan Derived from the Verdict
	// 	treatmentPlan: {
	// 		plan: string; // Overall description of the treatment approach
	// 		medications: IMedication[];
	// 		procedures?: Array<{
	// 			type: string;
	// 			scheduledDate: Date | string;
	// 			status: "recommended" | "scheduled" | "completed";
	// 		}>;
	// 		therapies?: Array<{
	// 			type: string; // e.g., "Physical Therapy", "Occupational Therapy"
	// 			frequency: string;
	// 			duration: string;
	// 		}>;
	// 	};

	// 	// Patient Education & Communication
	// 	patientNotes: string; // How the diagnosis was explained to the patient in layman's terms

	// 	// Verification & Sign-off
	// 	dateFinalized?: Date | string;
	// 	isConfirmed: boolean;
	// 	requiresSecondOpinion: boolean;
	// 	secondOpinionClinicianId?: string;
	// }

	interface CustomJwtSessionClaims extends Base {
		metadata: {
			onboardingComplete?: boolean;
		};
	}
}
