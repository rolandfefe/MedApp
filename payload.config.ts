import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Appointments } from "./lib/collections/Appointments.collection";
import { Diagnosis } from "./lib/collections/Diagnosis.collection";
import { Doctors } from "./lib/collections/Doctors.collection";
import { DoctorNav } from "./lib/collections/globals/DoctorNav.global";
import { LandingNav } from "./lib/collections/globals/LandingNav.global";
import { PatientNav } from "./lib/collections/globals/PatientNav.global";
import { HealthStatus } from "./lib/collections/HealthStatus.collection";
import { Histories } from "./lib/collections/History.collection";
import { Media } from "./lib/collections/Media.collection";
import { Messages } from "./lib/collections/Messages.collection";
import { Patients } from "./lib/collections/Patients.collection";
import { RecurrencePlan } from "./lib/collections/RecurrencePlan.collection";
import { Referrals } from "./lib/collections/Referrals.collection";
import { Reminders } from "./lib/collections/Reminders.collection";
import { Users } from "./lib/collections/Users.collection";
import { Verdict } from "./lib/collections/Verdict.collection";
import { Articles } from "./lib/collections/Article.collection";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			providers: ["@/Providers/AuthProvider"],
		},
	},
	globals: [LandingNav, PatientNav, DoctorNav],
	collections: [
		Users,
		Media,
		Articles,
		Patients,
		Doctors,
		HealthStatus,
		Histories,
		Diagnosis,
		Reminders,
		Appointments,
		Messages,
		Referrals,
		RecurrencePlan,
		Verdict,
	],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "./types/payload.d.ts"),
	},
	db: mongooseAdapter({
		url: process.env.MONGO_URI_LOCAL || "",
	}),
	sharp,
	plugins: [
		payloadCloudPlugin(),
		uploadthingStorage({
			collections: { media: true },
			options: {
				token: process.env.UPLOADTHING_TOKEN,
				acl: "public-read",
			},
		}),
	],
});
