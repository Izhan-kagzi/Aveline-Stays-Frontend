import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  Users,
  UserCog,
  Hotel,
  CircleDollarSign,
  UserRound,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../../assets/logo.svg";

export default function AdminLayout({ role }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const base = role === "superadmin" ? "/superadmin" : "/manager";

  const links =
    role === "superadmin"
      ? [
          {
            to: base,
            label: "Dashboard",
            end: true,
            icon: LayoutDashboard,
          },
          {
            to: `${base}/customers`,
            label: "Customers",
            icon: Users,
          },
          {
            to: `${base}/managers`,
            label: "Managers",
            icon: UserCog,
          },
          {
            to: `${base}/hotels`,
            label: "Hotels",
            icon: Hotel,
          },
          {
            to: `${base}/revenue`,
            label: "Revenue",
            icon: CircleDollarSign,
          },
          {
            to: `${base}/profile`,
            label: "Profile",
            icon: UserRound,
          },
        ]
      : [
          {
            to: base,
            label: "Dashboard",
            end: true,
            icon: LayoutDashboard,
          },
          {
            to: `${base}/hotels`,
            label: "Hotels",
            icon: Hotel,
          },
          {
            to: `${base}/profile`,
            label: "Profile",
            icon: UserRound,
          },
        ];

  async function onLogout() {
    await logout();
    navigate("/");
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#15191c]">

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-[#15191c]/10 flex items-center justify-between px-5">

        <Link to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="Aveline Stays"
            className="h-8 w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="w-10 h-10 flex items-center justify-center border border-[#15191c]/10"
        >
          {mobileOpen ? (
            <X size={19} strokeWidth={1.5} />
          ) : (
            <Menu size={19} strokeWidth={1.5} />
          )}
        </button>

      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="lg:hidden fixed inset-0 z-40 bg-[#15191c]/20"
        />
      )}

      {/* Sidebar */}
      <aside
        className={
          "fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-[#15191c]/10 flex flex-col transition-transform duration-300 lg:translate-x-0 " +
          (mobileOpen ? "translate-x-0" : "-translate-x-full")
        }
      >

        {/* Logo */}
        <div className="h-24 px-6 border-b border-[#15191c]/10 flex items-center justify-between">

          <div>
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt="Aveline Stays"
                className="h-9 w-auto"
              />
            </Link>

            <p className="mt-2 text-[9px] uppercase tracking-widest text-[#a78950]">
              {role === "superadmin" ? "Super Admin" : "Manager"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="lg:hidden"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">

          <p className="px-4 pt-2 pb-3 text-[9px] uppercase tracking-widest text-[#15191c]/30">
            Management
          </p>

          <div className="space-y-1">

            {links.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-3 bg-[#15191c] text-white"
                      : "flex items-center gap-3 px-4 py-3 text-[#15191c]/60 hover:bg-[#f1f1ee]"
                  }
                >
                  <Icon size={17} strokeWidth={1.5} />

                  <span className="text-sm">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* Back to Store */}
        <div className="p-4 border-t border-[#15191c]/10">

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 text-sm text-[#15191c]/60 hover:text-[#a78950]"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />

            <span>
              Back to Store
            </span>
          </Link>

        </div>

        {/* Account */}
        <div className="p-5 border-t border-[#15191c]/10 bg-[#fafaf8]">

          <p className="text-[9px] uppercase tracking-widest text-[#15191c]/30 mb-2">
            Signed in as
          </p>

          <p className="text-sm text-[#15191c]/60 truncate mb-4">
            {auth && auth.user ? auth.user.email : "Account"}
          </p>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-[#a78950] hover:text-[#15191c]"
          >
            <LogOut size={15} strokeWidth={1.5} />

            <span>
              Sign out
            </span>
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="min-h-screen lg:ml-72 pt-16 lg:pt-0">

        <div className="p-5 sm:p-7 md:p-10 lg:p-12">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
