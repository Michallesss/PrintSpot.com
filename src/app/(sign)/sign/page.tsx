// sign > in ? up
'use server'
import { redirect } from "next/navigation"

export default function Sign() {
  return redirect("/sign/in");
}