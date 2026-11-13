"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-editorial-bg flex flex-col justify-between p-6 sm:p-12">
      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-editorial-muted hover:text-editorial-fg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </Link>
      </div>

      {/* Main Login Box */}
      <div className="max-w-md w-full mx-auto my-12 bg-white border border-editorial-border p-8 sm:p-10 space-y-8 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-editorial-accent">
            <Lock className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest">
              CMS Authorization
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-editorial-fg">
            ADMIN PORTAL.
          </h1>
          <p className="text-xs text-editorial-muted">
            Authenticate to access editorial content controls.
          </p>
        </div>

        {/* Global Error Banner */}
        {state && !state.success && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="admin@example.com"
            required
            autoComplete="email"
            error={state && !state.success ? state.fieldErrors?.email?.[0] : undefined}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            error={state && !state.success ? state.fieldErrors?.password?.[0] : undefined}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? "Authenticating..." : "Sign In to Dashboard"}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-editorial-border text-center text-[11px] font-mono text-editorial-muted">
          Protected by Supabase Auth & Role-Based Access Control
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center font-mono text-[11px] text-editorial-muted">
        <span>Editorial CMS // Restricted Access</span>
      </div>
    </div>
  );
}
