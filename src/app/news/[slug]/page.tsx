import { redirect } from "next/navigation";

// Temporarily redirect news detail page to home
export default function NewsDetailPage() {
  redirect("/");
}
