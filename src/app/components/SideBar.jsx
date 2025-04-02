import Link from 'next/link';
import React from 'react';
import {
  FiGrid,
  FiCalendar,
  FiSliders,
  FiUsers,
  FiCreditCard,
  FiPower,
  FiUser, // Doctor icon stand-in
} from 'react-icons/fi';

// Reusable Nav Item Component (Icon stays fixed, expands right)
const NavItemFixedIcon = ({ icon: Icon, label, href }) => {
  return (
    <Link
      href={href} // Use the href prop to define the route
      className="group flex h-12 w-full items-center rounded-lg bg-transparent text-gray-600 transition-all duration-300 ease-in-out hover:w-48 hover:bg-indigo-50 hover:text-indigo-700 overflow-hidden"
      aria-label={label}
    >
      {/* Icon Area */}
      <div className="flex h-full w-12 flex-shrink-0 items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 group-hover:bg-indigo-100 transition-colors duration-200">
          <Icon className="h-5 w-5 transition-colors duration-200" />
        </div>
      </div>

      {/* Label */}
      <span className="ml-1 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-100 z-10">
        {label}
      </span>
    </Link>
  );
};

const SideBar = () => {
  const avatarUrl = 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp';

  return (
    // Sidebar container: Fixed width for collapsed state
    <aside className="flex h-full w-20 flex-col items-center space-y-4 bg-white/60 p-3 shadow-lg"> {/* w-20 defines collapsed width */}
      {/* Profile Section */}
      <div className="flex flex-col items-center pt-2">
        <img
          src={avatarUrl}
          alt="Sarah Smith"
          className="mb-2 h-12 w-12 rounded-full object-cover"
        />
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-1 flex-col space-y-2 pt-6 w-full"> {/* w-full ensures buttons can fill */}
        <NavItemFixedIcon icon={FiGrid} label="Dashboard" href="/" />
        <NavItemFixedIcon icon={FiCalendar} label="Appointments" href="/appointment" />
        <NavItemFixedIcon icon={FiUser} label="Staffs" href="/staff" />
        <NavItemFixedIcon icon={FiSliders} label="Settings" href="/setting" />
        <NavItemFixedIcon icon={FiUsers} label="Users" href="/users" />
        {/* <NavItemFixedIcon icon={FiCreditCard} label="Payments" href="/payments" /> */}
      </nav>

      {/* Logout Section */}
      <div className="pb-2 w-full">
        <NavItemFixedIcon icon={FiPower} label="Logout" href="/logout" />
      </div>
    </aside>
  );
};

export default SideBar;