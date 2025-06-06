import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const StudentAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [subjectWiseData, setSubjectWiseData] = useState([]);
  const [classAverages, setClassAverages] = useState({});
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const studentId = useSelector((state) => state.userData?._id) || "";

  useEffect(() => {
    if (studentId) fetchAttendance();
  }, [studentId]);

  const fetchAttendance = async () => {

    try {
      setLoading(true);
      const response = await axios.get(`${baseApiURL()}/attendance/getAttendanceByStudent/${studentId}`);
      
      if (response.data.success) {
        const formattedData = response.data.attendanceSummary.map(record => ({
          ...record,
          attendancePercentage: Number(record.attendancePercentage) || 0, // ✅ Fix applied
        }));
        setAttendanceRecords(formattedData);
        setSubjectWiseData(response.data.attendanceDetails);
        setClassAverages(response.data.classAverages);
      } else {
        toast.error("No attendance records found");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Error fetching attendance");
    } finally {
      setLoading(false);
    }
  };
  


  const getAttendanceDatesForCalendar = (subjectId) => {
    return subjectWiseData
      .filter(record => record.subjectId === subjectId)
      .map((rec) => ({
        date: new Date(rec.date),
        status: rec.status,
      }));
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month" || !selectedSubjectId) return "";

    const attendanceDates = getAttendanceDatesForCalendar(selectedSubjectId);
    const record = attendanceDates.find(
      (r) => new Date(r.date).toDateString() === date.toDateString()
    );

    if (!record) return "";
    return record.status === "present" ? "bg-green-200" : "bg-red-200";
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <Heading title="My Attendance" />

      {loading ? (
        <p className="text-center text-gray-600">Loading attendance records...</p>
      ) : (
        <>
          {/* Subject Table with Average and Selection */}
          <div className="mt-4 bg-blue-50 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2">
              <span>Subject</span>
              <span>Attendance %</span>
              <span>Status</span>
              <span>Class Avg %</span>
            </div>
            {attendanceRecords.map((record) => (
              <div
                key={record.subjectId}
                className={`grid grid-cols-4 gap-4 items-center py-2 border-b cursor-pointer hover:bg-blue-100 rounded ${
                  selectedSubjectId === record.subjectId ? "bg-blue-200" : ""
                }`}
                onClick={() =>
                  setSelectedSubjectId((prev) =>
                    prev === record.subjectId ? "" : record.subjectId
                  )
                }
                
              >
                <span className="text-lg">{record.subjectName}</span>

                {/* Attendance bar */}
                <div className="w-full bg-gray-300 rounded-full h-4 relative">
                  <div
                    className={`h-4 rounded-full ${record.attendancePercentage >= 75 ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: `${record.attendancePercentage}%` }}
                  ></div>
                  <span className="absolute inset-0 flex justify-center items-center text-sm font-bold text-white">
                    {record.attendancePercentage.toFixed(1)}%
                  </span>
                </div>

                <span className={`px-2 py-1 rounded text-white ${record.attendancePercentage >= 75 ? "bg-green-600" : "bg-red-600"}`}>
                  {record.attendancePercentage >= 75 ? "Eligible" : "Not Eligible"}
                </span>

                <span className="font-bold">{classAverages[record.subjectId]?.classAveragePercentage}%</span>
              </div>
            ))}
          </div>

          {/* Calendar View */}
          {selectedSubjectId && (
            <div className="mt-6 p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-3">Attendance Calendar</h3>
              <Calendar className="w-full max-w-md mx-auto calendar-custom" tileClassName={tileClassName}/>
              <div className="flex gap-4 mt-3">
                <span className="bg-green-200 px-3 py-1 rounded">Present</span>
                <span className="bg-red-200 px-3 py-1 rounded">Absent</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentAttendance;