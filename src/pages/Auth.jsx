import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

function Shell({ title, sub, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-forest-800 p-14 text-ivory lg:flex lg:flex-col lg:justify-between">
        <div className="grain absolute inset-0" />
        <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-3/5 w-full"><path d="M0 420 Q 150 300 300 380 T 600 350 V800 H0Z" fill="#223A31" /><path d="M0 540 Q 200 450 360 520 T 600 500 V800 H0Z" fill="#1A2D26" /><path d="M0 660 Q 250 590 450 650 T 600 640 V800 H0Z" fill="#111E19" /></svg>
        <div className="relative"><Logo light /></div>
        <div className="relative"><h2 className="h-display max-w-md text-6xl">Come as you are. <span className="italic text-brass-light">Stay as long as you like.</span></h2></div>
      </div>
      <div className="flex items-center justify-center bg-ivory px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><Logo /></div>
          <h1 className="h-display text-5xl">{title}</h1><p className="mt-3 text-mist">{sub}</p>
          <div className="mt-10">{children}</div><div className="mt-8 text-center text-sm text-mist">{footer}</div>
        </div>
      </div>
    </div>
  );
}
const Pw = ({ value, onChange, show, toggle, ...p }) => (
  <div className="relative"><input type={show ? "text" : "password"} className="field !pr-12" value={value} onChange={onChange} {...p} />
    <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-mist" aria-label="Toggle password">{show ? <FiEyeOff /> : <FiEye />}</button></div>
);

export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { state } = useLocation();
  const [f, setF] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setBusy(true);
    try {
      const u = await login(f.email.trim(), f.password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}`);
      nav(u.role === "customer" ? state?.from || "/" : "/admin", { replace: true });
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };
  return (
    <Shell title={state?.staff ? "Staff sign in" : "Welcome back"} sub={state?.staff ? "Admins and managers sign in here." : "Sign in to manage bookings and saved stays."}
      footer={<>New to Aveline? <Link to="/register" className="font-semibold text-forest underline">Create an account</Link></>}>
      <form onSubmit={submit} className="space-y-5">
        <div><label className="label">Email</label><input type="email" required className="field" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" /></div>
        <div><label className="label">Password</label><Pw required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} show={show} toggle={() => setShow(!show)} autoComplete="current-password" /></div>
        <button disabled={busy} className="btn-primary w-full !py-4">{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </Shell>
  );
}

export function Register() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (f.password.length < 6) return toast.error("Password must be at least 6 characters.");
    setBusy(true);
    try { const u = await signup({ ...f, email: f.email.trim() }); toast.success(`Welcome, ${u.name.split(" ")[0]}!`); nav("/"); }
    catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Shell title="Create your account" sub="Save stays, book in seconds and plan trips with AI."
      footer={<>Already a member? <Link to="/login" className="font-semibold text-forest underline">Sign in</Link></>}>
      <form onSubmit={submit} className="space-y-5">
        <div><label className="label">Full name</label><input required className="field" value={f.name} onChange={on("name")} /></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><label className="label">Email</label><input type="email" required className="field" value={f.email} onChange={on("email")} /></div>
          <div><label className="label">Phone</label><input className="field" value={f.phone} onChange={on("phone")} /></div></div>
        <div><label className="label">Password</label><Pw required value={f.password} onChange={on("password")} show={show} toggle={() => setShow(!show)} minLength={6} /></div>
        <button disabled={busy} className="btn-primary w-full !py-4">{busy ? "Creating…" : "Create account"}</button>
      </form>
    </Shell>
  );
}
