import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import { Toaster } from "react-hot-toast";
import Material from "./Material";
import Curriculum from "./Curriculum";
import Marks from "./Marks";
import Student from "./Student";
import Temporary from "./Temporary";
import AssignmentDashboard from "./AssignmentDashboard";
import Attendance from "./Attendance";
import  Result  from "./Result";
import Sidebar, { SidebarItem } from "../../components/sidebar";
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
  Archive
} from "lucide-react";
const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);
  const [employeeid , setemployeeid] = useState("");
  const [temporary, setTemporary] = useState(false);
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    
<section>
  {load && (
    <div className="flex flex-col min-h-screen bg-[#E8F9FF] overflow-hidden">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar>
          <SidebarItem
            icon={<User size={20} color="#4F46E5" />}
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
            text="Upload Marks"
            active={selectedMenu === "Upload Marks"}
            onClick={() => setSelectedMenu("Upload Marks")}
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
            text="Student Info"
            active={selectedMenu === "Student Info"}
            onClick={() => setSelectedMenu("Student Info")}
          />
          <SidebarItem
            icon={<Archive size={20} color="#4F46E5" />}
            text="Temporary Access"
            active={selectedMenu === "Temporary_Access"}
            onClick={() => setSelectedMenu("Temporary_Access")}
          />
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto py-6 px-4">
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Upload Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Attendance" && <Attendance />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "Results" && <Result />}
            {selectedMenu === "Curriculum" && <Curriculum />}
            {selectedMenu === "Assignment" && <AssignmentDashboard />}
            {selectedMenu === "My Profile" && (
              <Profile setemployeeid={setemployeeid} setTemporary={setTemporary} />
            )}
            {selectedMenu === "Student Info" && <Student />}
            {selectedMenu === "Temporary_Access" && (
              <Temporary employeeid={employeeid} temporary={temporary} />
            )}
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
