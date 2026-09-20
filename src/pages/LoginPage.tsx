import { useState, type FormEvent } from "react";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      const from =
        (location.state as { from?: { pathname?: string } } | null)?.from
          ?.pathname ?? "/dashboard";
      navigate(from, { replace: true });
    } catch {
      setError("We could not sign you in. Check your email and password.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <section className="relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-indigo-500 p-8 text-white sm:p-12 lg:min-h-screen lg:p-16">
        <div className="flex items-center gap-2 font-display text-[21px] font-bold">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-white text-indigo-500">
            V
          </div>
          <span>
            velozity<span className="text-orange-300">.</span>
          </span>
        </div>
        <div className="relative z-10">
          <p className="mb-4 text-[10px] tracking-[.2em] text-indigo-100">
            GLOBAL SOLUTIONS / WORKSPACE
          </p>
          <h1 className="max-w-xl font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
            Make the work visible.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-indigo-100">
            One calm view for the projects, people, and decisions moving your
            agency forward.
          </p>
        </div>
        <div className="hidden items-center gap-2 text-xs text-indigo-100 lg:flex">
          <ShieldCheck size={17} />
          Secure workspace access
        </div>
      </section>
      <section className="grid place-items-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-xs text-slate-400">Welcome back</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-800">
            Sign in to your workspace
          </h2>
          <p className="mb-8 mt-2 text-xs text-slate-400">
            Use your Velozity account to continue.
          </p>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-xs font-semibold text-slate-600">
              Email address
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-400 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <Mail size={17} />
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent text-xs text-slate-700 outline-none"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </label>
            <label className="grid gap-2 text-xs font-semibold text-slate-600">
              Password
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-400 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <LockKeyhole size={17} />
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent text-xs text-slate-700 outline-none"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  autoComplete="current-password"
                />
              </div>
            </label>
            {error && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-200 disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign in"}
              <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-5 text-center text-[10px] text-slate-400">
            Use your Velozity account to continue.
          </p>
        </div>
      </section>
    </main>
  );
}
