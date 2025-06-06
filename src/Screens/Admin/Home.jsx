/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";
import Examination from "./Examination";
import Sidebar, { SidebarItem } from "../../components/sidebar";
import {
  User,
  Users,
  School,
  Building2,
  Bell,
  BookOpen,
  FileText,
  ShieldCheck,
} from "lucide-react"; // Add/remove icons as needed

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  useEffect(() => {
    getStudentCount();
    getFacultyCount();
  }, []);

  const getStudentCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            studentCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFacultyCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            facultyCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section>
  {load && (
    <div className="flex bg-[#E8F9FF] min-h-screen flex-col overflow-visible">
      <Navbar />
      <div className="flex flex-1 overflow-visible">
        <Sidebar>
          <SidebarItem
            icon={<User size={20} color="#4F46E5" />}
            text="Profile"
            active={selectedMenu === "Profile"}
            onClick={() => setSelectedMenu("Profile")}
          />
          <SidebarItem
            icon={<Users size={20} color="#4F46E5" />}
            text="Student"
            active={selectedMenu === "Student"}
            onClick={() => setSelectedMenu("Student")}
          />
          <SidebarItem
            icon={<School size={20} color="#4F46E5" />}
            text="Faculty"
            active={selectedMenu === "Faculty"}
            onClick={() => setSelectedMenu("Faculty")}
          />
          <SidebarItem
            icon={<Building2 size={20} color="#4F46E5" />}
            text="Branch"
            active={selectedMenu === "Branch"}
            onClick={() => setSelectedMenu("Branch")}
          />
          <SidebarItem
            icon={<Bell size={20} color="#4F46E5" />}
            text="Notice"
            active={selectedMenu === "Notice"}
            onClick={() => setSelectedMenu("Notice")}
          />
          <SidebarItem
            icon={<BookOpen size={20} color="#4F46E5" />}
            text="Subjects"
            active={selectedMenu === "Subjects"}
            onClick={() => setSelectedMenu("Subjects")}
          />
          <SidebarItem
            icon={<FileText size={20} color="#4F46E5" />}
            text="Examination"
            active={selectedMenu === "Examination"}
            onClick={() => setSelectedMenu("Examination")}
          />
          <SidebarItem
            icon={<ShieldCheck size={20} color="#4F46E5" />}
            text="Admin"
            active={selectedMenu === "Admin"}
            onClick={() => setSelectedMenu("Admin")}
          />
        </Sidebar>

        <div className="flex-1">
          <div className="max-w-6xl mx-auto py-4 px-6">
            {selectedMenu === "Branch" && <Branch />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "Student" && <Student />}
            {selectedMenu === "Faculty" && <Faculty />}
            {selectedMenu === "Subjects" && <Subjects />}
            {selectedMenu === "Admin" && <Admin />}
            {selectedMenu === "Profile" && <Profile />}
            {selectedMenu === "Examination" && <Examination />}
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
