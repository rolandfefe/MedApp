import { getCurrentUser } from "@/lib/actions/user.actions";
import React from "react";

export default async function page() {
	const currentUser = await getCurrentUser();


  
	return <div>page</div>;
}
