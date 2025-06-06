import {
  ChevronLast,
  ChevronFirst
} from "lucide-react";
import { useContext, createContext, useState } from "react";
import React from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray-50 border-r shadow-md">

        {/* Header */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Menu */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  // Clone icon with dynamic color
  const dynamicIcon = React.cloneElement(icon, {
    color: active ? "#FFFFFF" : "#4F46E5", // white when active, indigo when inactive
  });

  return (
    <li
      onClick={onClick}
      className={`relative flex items-center py-2 px-3 my-1 cursor-pointer rounded-md transition-colors group
        ${
          active
            ? "bg-indigo-700 text-white"
            : "hover:bg-indigo-100 text-gray-700"
        }`}
    >
      {dynamicIcon}

      <span
        className={`overflow-hidden whitespace-nowrap transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Alert dot */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-500 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* Tooltip for collapsed state */}
      {!expanded && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1 rounded-md bg-indigo-700 text-white text-sm whitespace-nowrap
            opacity-0 -translate-x-2 pointer-events-none
            group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:pointer-events-auto
            transition-all ease-in-out border border-white"
        >
          {text}
        </div>
      )}
    </li>
  );
}
