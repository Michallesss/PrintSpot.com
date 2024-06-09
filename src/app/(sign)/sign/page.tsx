// sign > in ? up
'use client'
import { redirect } from "next/navigation"

export default function Sign() {
  return redirect("/sign/in");
}