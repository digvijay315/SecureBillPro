import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  FileText, 
  BedDouble, 
  BookOpen, 
  Settings, 
  CreditCard, 
  Grid, 
  Database, 
  Crown, 
  QrCode, 
  ChevronDown,
  Layers
} from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar }) {
  const location = useLocation();

  const manageSubItems = [
    { name: "Staff", path: "/admin/staff", icon: Users },
    { name: "Dishes & Menu", path: "/admin/dishes", icon: UtensilsCrossed },
    { name: "Rooms", path: "/admin/rooms", icon: BedDouble },
    { name: "Tables", path: "/admin/tables", icon: Grid },
    { name: "Inventory", path: "/admin/inventory", icon: FileText },
  ];

  const isManageActive = manageSubItems.some(sub => location.pathname === sub.path);
  const [isManageOpen, setIsManageOpen] = useState(isManageActive);

  // Auto-expand Manage group when navigating to any of its subpaths
  useEffect(() => {
    if (isManageActive) {
      setIsManageOpen(true);
    }
  }, [location.pathname, isManageActive]);

  const topMenuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Scan & Order (QR)",
      path: "/admin/qr-orders",
      icon: QrCode,
    },
    {
      name: "KOT Orders & Reports",
      path: "/admin/kot-reports",
      icon: UtensilsCrossed,
    },
    {
      name: "Print Pending KOT",
      path: "/admin/kot-print",
      icon: FileText,
    },
    {
      name: "Room Bookings",
      path: "/admin/room-reports",
      icon: BookOpen,
    },
  ];

  const bottomMenuItems = [
    {
      name: "Subscription",
      path: "/admin/subscription",
      icon: Crown,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden top-[73px]"
          onClick={closeSidebar}
        />
      )}
      <aside className={`w-72 glass border-r border-lagoon-700/25 min-h-[calc(100vh-80px)] p-4 flex flex-col gap-3 no-print shrink-0 
        fixed md:static top-[73px] md:top-0 bottom-0 left-0 z-50 md:z-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        bg-slate-950 md:bg-transparent overflow-y-auto
      `}>
        <div className="px-3 pt-2 pb-1">
          <p className="text-xs uppercase font-extrabold tracking-wider text-saffron-400">
            Admin Control Center
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {/* Main Top Items */}
          {topMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => closeSidebar && closeSidebar()}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group text-base font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-saffron-500/20 via-saffron-500/10 to-transparent border border-saffron-500/35 text-saffron-400 font-bold shadow-sm shadow-saffron-500/5"
                    : "hover:bg-lagoon-800/40 hover:text-lagoon-100 text-slate-300 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-saffron-400" : "text-slate-400 group-hover:text-lagoon-200"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Manage Accordion Dropdown */}
          <div className="my-1 border-t border-b border-lagoon-700/30 py-2">
            <button
              type="button"
              onClick={() => setIsManageOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-base font-medium ${
                isManageActive
                  ? "bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 font-bold"
                  : "hover:bg-lagoon-800/40 hover:text-lagoon-100 text-slate-300 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Layers className={`w-5 h-5 shrink-0 transition-colors ${isManageActive ? "text-saffron-400" : "text-slate-400 group-hover:text-lagoon-200"}`} />
                <span>Manage</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  isManageOpen ? "rotate-180 text-saffron-400" : "text-slate-400"
                }`}
              />
            </button>

            {isManageOpen && (
              <div className="mt-2 pl-3 flex flex-col gap-1.5 border-l-2 border-saffron-500/30 ml-5">
                {manageSubItems.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = location.pathname === sub.path;

                  return (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => closeSidebar && closeSidebar()}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                        isSubActive
                          ? "bg-saffron-500/20 text-saffron-400 font-bold border border-saffron-500/30 shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium"
                      }`}
                    >
                      <SubIcon className={`w-4 h-4 shrink-0 ${isSubActive ? "text-saffron-400" : "text-slate-400"}`} />
                      <span>{sub.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Items */}
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => closeSidebar && closeSidebar()}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group text-base font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-saffron-500/20 via-saffron-500/10 to-transparent border border-saffron-500/35 text-saffron-400 font-bold shadow-sm shadow-saffron-500/5"
                    : "hover:bg-lagoon-800/40 hover:text-lagoon-100 text-slate-300 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-saffron-400" : "text-slate-400 group-hover:text-lagoon-200"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
