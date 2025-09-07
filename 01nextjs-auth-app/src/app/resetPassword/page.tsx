"use client";
import React, { Suspense } from "react";
import ResetPasswordClient from "./resetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading reset password...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
