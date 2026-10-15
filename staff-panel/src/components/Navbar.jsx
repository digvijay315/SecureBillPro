import React, { useState, useEffect, useRef } from "react";
import { 
  LogOut, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Utensils, 
  BedDouble, 
  FileText, 
  Receipt, 
  Monitor, 
  ChevronDown, 
  Tv, 
  ChefHat, 
  Sparkles,
  ClipboardList,
  LayoutDashboard
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ currentUser, onLogout, theme, toggleTheme, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu structure with submenus
  const navMenuGroups = [
    {
      id: "billing",
      title: "Billing",
      icon: Receipt,
      items: [
        {
          label: "KOT & Orders",
          description: "Dining, Parcel & Room Guest Orders",
          path: "/staff/kot",
          icon: ClipboardList,
          permission: !currentUser?.staffPermissions || currentUser.staffPermissions.kot,
        },
        {
          label: "Room Booking",
          description: "Check-in, Check-out & Rooms",
          path: "/staff/rooms",
          icon: BedDouble,
          permission: !currentUser?.staffPermissions || currentUser.staffPermissions.roomBooking,
        },
      ],
    },
    {
      id: "kitchen_display",
      title: "KDS & Displays",
      icon: Monitor,
      items: [
        {
          label: "Hall Display",
          description: "Order status token screen",
          path: "/staff/hall-display",
          icon: Tv,
          permission: !currentUser?.staffPermissions || currentUser.staffPermissions.restaurant,
        },
        {
          label: "Kitchen Display (KDS)",
          description: "Live kitchen chef screen",
          path: "/staff/kds",
          icon: ChefHat,
          permission: !currentUser?.staffPermissions || currentUser.staffPermissions.restaurant,
        },
      ],
    },
    {
      id: "documents",
      title: "Front Desk & GRC",
      icon: FileText,
      items: [
        {
          label: "Print GRC",
          description: "Guest Registration Cards",
          path: "/staff/grc",
          icon: FileText,
          permission: !currentUser?.staffPermissions || currentUser.staffPermissions.grc,
        },
      ],
    },
  ];

  // Filter groups where at least one item has permission
  const visibleGroups = navMenuGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.permission),
  })).filter((group) => group.items.length > 0);

  const isCurrentPathInGroup = (group) => {
    return group.items.some((item) => item.path === location.pathname);
  };

  return (
    <nav className="glass border-b border-saffron-500/20 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-40 no-print transition-colors">
      <div className="flex items-center gap-3">
        {currentUser && currentUser.role === "admin" && (
          <button 
            onClick={toggleSidebar} 
            className="md:hidden p-2 text-slate-300 hover:text-saffron-500 hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/staff")}>
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-saffron-500/30 flex items-center justify-center shadow-md bg-slate-900">
            <img src="/secure_bill_pro_logo.jpg" alt="Secure Bill Pro Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-slate-100 leading-none uppercase">
              {currentUser?.hotelName?.replace("Zoox", "Secure Bill Pro") || "Secure Bill Pro"}
            </h1>
            <p className="text-[10px] text-saffron-500 font-bold tracking-widest uppercase hidden sm:block mt-0.5">
              Secure Bill Pro Staff Desk
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop Menu with Submenu Dropdowns */}
        <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
          {currentUser && currentUser.role === "staff" && (
            <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl mr-1 border transition-all ${
              theme === "light"
                ? "bg-white/80 border-lagoon-900/10 shadow-sm shadow-lagoon-900/5"
                : "bg-slate-900/60 border-slate-800/80"
            }`}>
              {/* Direct Dashboard Link */}
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  navigate("/staff");
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === "/staff"
                    ? theme === "light"
                      ? "bg-amber-500/15 text-amber-700 border border-amber-500/40 font-semibold shadow-sm"
                      : "bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 font-semibold shadow-sm"
                    : theme === "light"
                    ? "text-slate-700 hover:text-lagoon-900 hover:bg-slate-100/80"
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                <LayoutDashboard className={`w-4 h-4 ${
                  location.pathname === "/staff"
                    ? (theme === "light" ? "text-amber-600" : "text-saffron-400")
                    : (theme === "light" ? "text-slate-500" : "text-slate-400")
                }`} />
                <span>Dashboard</span>
              </button>
              {visibleGroups.map((group) => {
                const GroupIcon = group.icon;
                const isGroupActive = isCurrentPathInGroup(group);
                const isOpened = activeDropdown === group.id;

                return (
                  <div key={group.id} className="relative">
                    <button
                      onClick={() => setActiveDropdown(isOpened ? null : group.id)}
                      onMouseEnter={() => setActiveDropdown(group.id)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                        isGroupActive
                          ? theme === "light"
                            ? "bg-amber-500/15 text-amber-700 border border-amber-500/40 font-semibold shadow-sm"
                            : "bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 font-semibold shadow-sm"
                          : isOpened
                          ? theme === "light"
                            ? "bg-slate-100 text-lagoon-900 border border-slate-300"
                            : "bg-slate-800/80 text-slate-100 border border-slate-700/60"
                          : theme === "light"
                          ? "text-slate-700 hover:text-lagoon-900 hover:bg-slate-100/80"
                          : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
                      }`}
                    >
                      <GroupIcon className={`w-4 h-4 ${
                        isGroupActive 
                          ? (theme === "light" ? "text-amber-600" : "text-saffron-400") 
                          : (theme === "light" ? "text-slate-500" : "text-slate-400")
                      }`} />
                      <span>{group.title}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpened 
                            ? (theme === "light" ? "rotate-180 text-amber-600" : "rotate-180 text-saffron-400") 
                            : (theme === "light" ? "text-slate-400" : "text-slate-400")
                        }`}
                      />
                    </button>

                    {/* Submenu Dropdown Panel */}
                    {isOpened && (
                      <div
                        onMouseLeave={() => setActiveDropdown(null)}
                        className={`absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 border ${
                          theme === "light"
                            ? "bg-white/95 border-slate-200 shadow-xl shadow-lagoon-900/10 text-slate-800"
                            : "bg-[#0a2f2f]/95 border-saffron-500/30 shadow-2xl text-slate-100"
                        }`}
                      >
                        <div className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border-b mb-1 flex items-center justify-between ${
                          theme === "light"
                            ? "text-amber-700/90 border-slate-100"
                            : "text-saffron-400/80 border-saffron-500/10"
                        }`}>
                          <span>{group.title} Options</span>
                          <Sparkles className={`w-3 h-3 ${theme === "light" ? "text-amber-600" : "text-saffron-400"}`} />
                        </div>
                        <div className="flex flex-col gap-1">
                          {group.items.map((item) => {
                            const SubIcon = item.icon;
                            const isItemActive = location.pathname === item.path;

                            return (
                              <button
                                key={item.path}
                                onClick={() => {
                                  navigate(item.path);
                                  setActiveDropdown(null);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                                  isItemActive
                                    ? theme === "light"
                                      ? "bg-amber-500/15 text-amber-900 border border-amber-500/30 shadow-sm font-semibold"
                                      : "bg-saffron-500/25 text-saffron-300 border border-saffron-500/40 shadow-sm font-semibold"
                                    : theme === "light"
                                    ? "text-slate-700 hover:bg-slate-100/90 hover:text-slate-900"
                                    : "text-slate-200 hover:bg-slate-800/70 hover:text-white"
                                }`}
                              >
                                <div
                                  className={`p-2 rounded-lg transition-colors ${
                                    isItemActive
                                      ? theme === "light"
                                        ? "bg-amber-500/20 text-amber-700"
                                        : "bg-saffron-500/20 text-saffron-400"
                                      : theme === "light"
                                      ? "bg-slate-100 text-slate-600"
                                      : "bg-slate-800/60 text-slate-400"
                                  }`}
                                >
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm leading-tight font-medium">{item.label}</div>
                                  <div className={`text-[11px] truncate mt-0.5 ${
                                    theme === "light" ? "text-slate-500" : "text-slate-400"
                                  }`}>
                                    {item.description}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* User Profile Capsule */}
          {currentUser && (
            <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-3.5 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-500">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left flex flex-col">
                <p className="text-sm font-semibold text-slate-200">{currentUser.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-saffron-500 uppercase font-bold tracking-wider">
                    {currentUser.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-saffron-500 hover:border-saffron-500/30 transition-all flex items-center justify-center active:scale-95 no-print"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon className="w-4 h-4 text-lagoon-700" /> : <Sun className="w-4 h-4 text-saffron-400" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-950 to-red-900 border border-red-800/40 hover:from-red-900 hover:to-red-800 text-red-200 text-sm font-medium rounded-xl transition-all duration-300 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        {currentUser && (
          <button 
            onClick={() => setIsStaffMenuOpen(!isStaffMenuOpen)} 
            className="md:hidden p-2 text-slate-300 hover:text-saffron-500 hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            {isStaffMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu with Accordion Submenus */}
      {isStaffMenuOpen && currentUser && (
        <div className="absolute top-[64px] left-0 right-0 glass border-b border-saffron-500/20 p-4 flex flex-col gap-3 z-50 md:hidden shadow-2xl animate-fade-in backdrop-blur-2xl max-h-[85vh] overflow-y-auto">
          {/* User Info inside menu */}
          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-4 py-3 rounded-xl mb-1">
            <div className="w-10 h-10 rounded-lg bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="text-left flex flex-col">
              <p className="text-base font-semibold text-slate-200">{currentUser.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-saffron-500 uppercase font-bold tracking-wider">
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>

          {/* Staff Nav Links (Accordion Style) */}
          {currentUser.role === "staff" && (
            <div className={`flex flex-col gap-2 border-b pb-4 mt-2 ${
              theme === "light" ? "border-slate-200" : "border-slate-800/50"
            }`}>
              {/* Dashboard Mobile Button */}
              <button
                onClick={() => {
                  navigate("/staff");
                  setIsStaffMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${
                  location.pathname === "/staff"
                    ? theme === "light"
                      ? "bg-amber-500/15 text-amber-800 font-semibold border border-amber-500/30"
                      : "bg-saffron-500/20 text-saffron-300 font-semibold border border-saffron-500/30"
                    : theme === "light"
                    ? "text-slate-800 hover:bg-slate-100"
                    : "text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <LayoutDashboard className={`w-5 h-5 ${
                  location.pathname === "/staff"
                    ? (theme === "light" ? "text-amber-600" : "text-saffron-400")
                    : (theme === "light" ? "text-slate-500" : "text-slate-400")
                }`} />
                <span>Operational Dashboard</span>
              </button>
              {visibleGroups.map((group) => {
                const GroupIcon = group.icon;
                const isExpanded = mobileExpandedGroup === group.id || (!mobileExpandedGroup && isCurrentPathInGroup(group));
                const isGroupActive = isCurrentPathInGroup(group);

                return (
                  <div key={group.id} className={`rounded-xl border overflow-hidden transition-colors ${
                    theme === "light"
                      ? "border-slate-200 bg-white/70"
                      : "border-slate-800/80 bg-slate-900/40"
                  }`}>
                    <button
                      onClick={() => setMobileExpandedGroup(isExpanded ? "" : group.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left font-medium transition-all ${
                        isGroupActive
                          ? theme === "light"
                            ? "bg-amber-500/15 text-amber-800 font-semibold"
                            : "bg-saffron-500/15 text-saffron-300 font-semibold"
                          : theme === "light"
                          ? "text-slate-800 hover:bg-slate-100/70"
                          : "text-slate-200 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <GroupIcon className={`w-5 h-5 ${
                          isGroupActive
                            ? (theme === "light" ? "text-amber-600" : "text-saffron-400")
                            : (theme === "light" ? "text-slate-500" : "text-slate-400")
                        }`} />
                        <span>{group.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded 
                            ? (theme === "light" ? "rotate-180 text-amber-600" : "rotate-180 text-saffron-400") 
                            : (theme === "light" ? "text-slate-400" : "text-slate-400")
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className={`px-2 py-2 flex flex-col gap-1 border-t ${
                        theme === "light"
                          ? "bg-slate-50/80 border-slate-200"
                          : "bg-black/20 border-slate-800/40"
                      }`}>
                        {group.items.map((item) => {
                          const SubIcon = item.icon;
                          const isItemActive = location.pathname === item.path;

                          return (
                            <button
                              key={item.path}
                              onClick={() => {
                                navigate(item.path);
                                setIsStaffMenuOpen(false);
                              }}
                              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-sm transition-all ${
                                isItemActive
                                  ? theme === "light"
                                    ? "bg-amber-500/15 text-amber-900 font-semibold border border-amber-500/30 shadow-sm"
                                    : "bg-saffron-500/25 text-saffron-300 font-semibold border border-saffron-500/30"
                                  : theme === "light"
                                  ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                              }`}
                            >
                              <SubIcon className={`w-4 h-4 shrink-0 ${
                                theme === "light" ? "text-amber-600" : "text-saffron-400"
                              }`} />
                              <div className="flex-1 min-w-0">
                                <div className="leading-tight">{item.label}</div>
                                <div className={`text-[11px] truncate mt-0.5 ${
                                  theme === "light" ? "text-slate-500" : "text-slate-400"
                                }`}>
                                  {item.description}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Theme & Logout */}
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-saffron-500 transition-all"
            >
              {theme === "light" ? <Moon className="w-5 h-5 text-lagoon-700" /> : <Sun className="w-5 h-5 text-saffron-400" />}
              <span className="font-medium text-sm">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>
            
            <button
              onClick={onLogout}
              className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-red-950 to-red-900 border border-red-800/40 hover:from-red-900 text-red-200 font-medium rounded-xl transition-all shadow-sm"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
