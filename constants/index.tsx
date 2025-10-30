import { IconName } from "lucide-react/dynamic";

export const LANDING_NAV_ITEMS: {
	name: string;
	link: string;
	icon: IconName;
}[] = [
	{
		name: "Home",
		link: "/home",
		icon: "home",
	},
	{
		name: "Reviews",
		link: "#Reviews",
		icon: "star",
	},
	{
		name: "Feedback",
		link: "#Feedback",
		icon: "bot-message-square",
	},
	{
		name: "Support",
		link: "#Support",
		icon: "headset",
	},
];

export const getDoctorNavItems = (
	id: IDoctor["id"]
): {
	name: string;
	link: string;
	icon: IconName;
}[] => [
	{
		name: "Dashboard",
		link: `/doctor/${id}`,
		icon: "layout-dashboard",
	},
	{
		name: "Appointments",
		link: `/doctor/${id}/appointments`,
		icon: "headset",
	},
	{
		name: "Profile",
		link: `/doctor/${id}/profile`,
		icon: "user-circle",
	},
	{
		name: "Referrals",
		link: `/doctor/${id}/referrals`,
		icon: "arrow-big-right-dash",
	},
	{
		name: "Follow ups",
		link: `/doctor/${id}/follow-ups`,
		icon: "arrow-down-right-from-circle",
	},
];

export const PATIENT_NAV_ITEMS: {
	name: string;
	link: string;
	icon: IconName;
}[] = [
	{
		name: "Home",
		link: "/home",
		icon: "home",
	},
	{
		name: "Doctors",
		link: "/doctors",
		icon: "user-plus",
	},
	{
		name: "Appointments",
		link: "/appointments",
		icon: "headset",
	},
	{
		name: "Follow ups",
		link: "/follow-ups",
		icon: "arrow-down-right-from-circle",
	},
	{
		name: "History",
		link: "/history",
		icon: "notebook-text",
	},
	{
		name: "Medications",
		link: "/medications",
		icon: "pill",
	},
	{
		name: "Health Status",
		link: "/health-status",
		icon: "heart-pulse",
	},
	// {
	// 	name: "Profile",
	// 	link: "/profile",
	// 	icon: <UserCircle size={20} />,
	// },
	{
		name: "Referrals",
		link: "/referrals",
		icon: "arrow-big-right-dash",
	},
];

export const ADMIN_NAV_ITEMS = [
	{
		name: "Appointments",
		link: "",
		icon: "headset",
	},
];
