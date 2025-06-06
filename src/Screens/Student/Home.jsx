import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Curriculum from "./Curriculum";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import Attendance from "./Attendance";
import Resources from "./Resources";
import AssignmentDashboard from "./AssignmentDashboard";
import Result from "./Result";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar, { SidebarItem } from "../../components/sidebar"
import {
  User,
  GraduationCap,
  Bell,
  Book,
  ClipboardList,
  Trophy,
  FileText,
  FileCheck,
  CalendarCheck,
  Archive,

} from "lucide-react";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);
  return (
    <section>
      {load && (
        <div className="flex bg-[#E8F9FF] min-h-screen flex-col overflow-visible">
          <Navbar />
          <div className="flex flex-1 overflow-visible">
            <Sidebar>
              <SidebarItem
                icon={<User size={20} color="#4F46E5" />} // Indigo-600
                text="My Profile"
                active={selectedMenu === "My Profile"}
                onClick={() => setSelectedMenu("My Profile")}
              />
              <SidebarItem
                icon={<GraduationCap size={20} color="#4F46E5" />}
                text="Timetable"
                active={selectedMenu === "Timetable"}
                onClick={() => setSelectedMenu("Timetable")}
              />
              <SidebarItem
                icon={<Bell size={20} color="#4F46E5" />}
                text="Notice"
                active={selectedMenu === "Notice"}
                onClick={() => setSelectedMenu("Notice")}
              />
              <SidebarItem
                icon={<Book size={20} color="#4F46E5" />}
                text="Material"
                active={selectedMenu === "Material"}
                onClick={() => setSelectedMenu("Material")}
              />
              <SidebarItem
                icon={<ClipboardList size={20} color="#4F46E5" />}
                text="Marks"
                active={selectedMenu === "Marks"}
                onClick={() => setSelectedMenu("Marks")}
              />
              <SidebarItem
                icon={<Trophy size={20} color="#4F46E5" />}
                text="Results"
                active={selectedMenu === "Results"}
                onClick={() => setSelectedMenu("Results")}
              />
              <SidebarItem
                icon={<FileText size={20} color="#4F46E5" />}
                text="Curriculum"
                active={selectedMenu === "Curriculum"}
                onClick={() => setSelectedMenu("Curriculum")}
              />
              <SidebarItem
                icon={<FileCheck size={20} color="#4F46E5" />}
                text="Assignment"
                active={selectedMenu === "Assignment"}
                onClick={() => setSelectedMenu("Assignment")}
              />
              <SidebarItem
                icon={<CalendarCheck size={20} color="#4F46E5" />}
                text="Attendance"
                active={selectedMenu === "Attendance"}
                onClick={() => setSelectedMenu("Attendance")}
              />
              <SidebarItem
                icon={<Archive size={20} color="#4F46E5" />}
                text="Resources"
                active={selectedMenu === "Resources"}
                onClick={() => setSelectedMenu("Resources")}
              />
            </Sidebar>





            <div className="flex-1">
              <div className="max-w-6xl mx-auto py-4 px-6">
                {selectedMenu === "Timetable" && <Timetable />}
                {selectedMenu === "Marks" && <Marks />}
                {selectedMenu === "Material" && <Material />}
                {selectedMenu === "Notice" && <Notice />}
                {selectedMenu === "Results" && <Result />}
                {selectedMenu === "Curriculum" && <Curriculum />}
                {selectedMenu === "My Profile" && <Profile />}
                {selectedMenu === "Attendance" && <Attendance />}
                {selectedMenu === "Resources" && <Resources />}
                {selectedMenu === "Assignment" && <AssignmentDashboard />}
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
