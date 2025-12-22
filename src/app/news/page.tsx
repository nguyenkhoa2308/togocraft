import { redirect } from "next/navigation";

// Temporarily redirect news page to home
export default function NewsPage() {
  redirect("/");
}
