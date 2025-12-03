// app/gear/page.tsx
// This page has been merged into /about
// Redirecting to the About page where Gear is now located

import { redirect } from "next/navigation";

export default function GearPage() {
  redirect("/about#gear");
}
