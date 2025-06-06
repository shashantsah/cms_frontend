import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../../baseUrl";

const ViewResult = () => {
  const facultyId = useSelector((state) => state.userData?._id) || "";
  const [semester, setSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (facultyId) fetchSubjects();
  }, [facultyId]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `${baseApiURL()}/faculty/details/getFacultySubjects/${facultyId}`
      );
      if (response.data.success) {
        setSubjects(response.data.subjects);
      } else {
        toast.error("Failed to fetch subjects");
      }
    } catch (error) {
      toast.error("Error fetching subjects");
    }
  };

  const fetchResults = async () => {
    if (!selectedSubject._id || !semester) {
      toast.error("Please select both subject and semester.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${baseApiURL()}/result/faculty/view-result`,
        {
          params: {
            subjectId: selectedSubject._id,
            semester,
          },
        }
      );

      if (response.data.success) {
        setResults(response.data.results);
      } else {
        toast.error("No results found.");
        setResults([...[]]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching results");
      setResults([...[]]);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col items-center mb-10">
      <h1 className="text-2xl font-bold mb-6">View Results</h1>

      <div className="w-1/2 flex flex-col items-center">
        {/* Semester Dropdown */}
        <div className="w-[80%] mt-2">
          <label htmlFor="semester" className="leading-7 text-base">
            Select Semester
          </label>
          <select
            id="semester"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full mt-1"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="" disabled>
              -- Select Semester --
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
                {sem === 1
                  ? "st"
                  : sem === 2
                    ? "nd"
                    : sem === 3
                      ? "rd"
                      : "th"}{" "}
                Semester
              </option>
            ))}
          </select>
        </div>

        {/* Subject Dropdown */}
        <div className="w-[80%] mt-2">
          <label htmlFor="subject" className="leading-7 text-base">
            Select Subject
          </label>
          <select
            id="subject"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full mt-1"
            value={selectedSubject._id || ""}
            onChange={(e) => {
              const subj = subjects.find((s) => s._id === e.target.value);
              setSelectedSubject(subj || {});
            }}
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {subjects.map((subj) => (
              <option key={subj._id} value={subj._id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-sm"
          onClick={fetchResults}
        >
          {loading ? "Loading..." : "View Results"}
        </button>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="w-[80%] mt-8 overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Roll Number</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {res.studentId?.enrollmentNo || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {res.studentId
                      ? `${res.studentId.firstName || ""} ${res.studentId.middleName || ""} ${res.studentId.lastName || ""}`.trim()
                      : "N/A"}
                  </td>

                  <td className="border px-4 py-2">{res.marks}</td>
                  <td className="border px-4 py-2">{res.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewResult;
