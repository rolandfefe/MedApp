import { getCurrentUser } from "@/lib/actions/user.actions";

export default async function page() {
  const currentUser = await getCurrentUser();
  return <div>page</div>;
}
