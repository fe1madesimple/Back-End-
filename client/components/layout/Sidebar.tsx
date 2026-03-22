"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  Filter,
  Settings,
  TrendingUp,
  Cpu,
  Shield,
  Sparkles,
  Bell,
  Play,
  User,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/lib/sidebar-context";
import { navItems } from "@/lib/nav-items";
import styles from "./Sidebar.module.css";

function renderIcon(item: (typeof navItems)[0], color: string) {
  if (item.type === "emoji") {
    return (
      <span style={{ fontSize: "17px", lineHeight: 1 }}>{item.emoji}</span>
    );
  }
  const props = { size: 17, color, strokeWidth: 2 };
  switch (item.icon) {
    case "LayoutDashboard":
      return <LayoutDashboard {...props} />;
    case "Users":
      return <Users {...props} />;
    case "Filter":
      return <Filter {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    case "Shield":
      return <Shield {...props} />;
    case "Sparkles":
      return <Sparkles {...props} />;
    case "Bell":
      return <Bell {...props} />;
    case "Play":
      return <Play {...props} />;
    case "Mic":
      return <Play {...props} />;
    case "Settings":
      return <Settings {...props} />;
    default:
      return null;
  }
}

export default function Sidebar() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const handleMenuClick = (route?: string) => {
    setShowAdminMenu(false);
    if (route) router.push(route);
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}
    >
      <AnimatePresence>
        {showAdminMenu && (
          <motion.div
            className={styles.adminBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setShowAdminMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Toggle button — positioned at vertical center of right edge */}
      <button
        className={styles.toggleBtn}
        onClick={toggleCollapsed}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          size={14}
          className={isCollapsed ? styles.chevronFlipped : styles.chevronNormal}
        />
      </button>

      {/* Logo */}
      <div
        className={`${styles.logoWrap} ${isCollapsed ? styles.logoCollapsed : styles.logoExpanded}`}   
      >
        <Image
          src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1773753081/Frame_23_1_thcowx.svg"
          alt="FE-1 Admin"
          width={isCollapsed ? 32 : 120}
          height={isCollapsed ? 32 : 32}
          style={{ objectFit: "contain", transition: "all 0.28s ease" }}
        />
        <span>Made Simple</span>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(item.route + "/");
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : styles.navItemInactive} ${isCollapsed ? styles.navItemCollapsed : styles.navItemExpanded}`}
              title={isCollapsed ? item.label : undefined}
            >
              <div
                className={styles.iconBox}
                style={{ background: item.itemColor + "26" }}
              >
                {renderIcon(item, item.itemColor)}
              </div>
              <span
                className={`${styles.navLabel} ${isCollapsed ? styles.navLabelHidden : styles.navLabelVisible}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <AnimatePresence>
        {showAdminMenu && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`${styles.adminMenu} ${isCollapsed ? styles.adminMenuCollapsed : styles.adminMenuExpanded}`}
          >
            <button
              className={styles.adminMenuItem}
              onClick={() => handleMenuClick()}
            >
              <User size={16} />
              <span>View Profile</span>
            </button>
            <button
              className={styles.adminMenuItem}
              onClick={() => handleMenuClick("/audit-trail")}
            >
              <Shield size={16} />
              <span>Audit Trail</span>
            </button>
            <button
              className={styles.adminMenuItem}
              onClick={() => handleMenuClick("/notifications")}
            >
              <Bell size={16} />
              <span>Notification Logs</span>
            </button>
            <button
              className={styles.adminMenuItem}
              onClick={() => handleMenuClick("/settings")}
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <div className={styles.adminDivider} />
            <button
              className={`${styles.adminMenuItem} ${styles.adminDanger}`}
              onClick={() => handleMenuClick()}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom user section */}
      <div
        className={`${styles.userSection} ${styles.userSectionClickable} ${isCollapsed ? styles.userCollapsed : styles.userExpanded}`}
        onClick={() => setShowAdminMenu((prev) => !prev)}
      >
        <div className={styles.avatar}>SA</div>
        {!isCollapsed && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>Super Admin</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        )}
        {!isCollapsed && <div className={styles.onlineDot} />}
      </div>
    </aside>
  );
}
