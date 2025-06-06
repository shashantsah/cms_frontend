import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Result = () => {
  const studentId = useSelector((state) => state.userData?._id);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [result, setResult] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const resultRef = useRef();

  const fetchResult = async (semester) => {
    try {
      const response = await axios.get(`${baseApiURL()}/result/student/getStudentFinalResult`, {
        params: { studentId, semester },
      });

      if (response.data.success) {
        setResult(response.data.result);
        setStudentInfo(response.data.student);
      } else {
        setResult(null);
        toast.error("Result not found");
      }
    } catch (error) {
      setResult(null);
      toast.error("Failed to fetch result");
      console.error(error);
    }
  };

  const downloadPDF = async () => {
    const input = resultRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Semester-${selectedSemester}-Result.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Semester Result</h1>

      {/* Semester Selection */}
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="semester" className="text-lg font-medium">
          Select Semester:
        </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">-- Select Semester --</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (selectedSemester) {
              fetchResult(selectedSemester);
            } else {
              toast.error("Please select a semester first.");
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Get Result
        </button>
      </div>

      {/* Download Button Outside PDF Content */}
      {result && (
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      )}

      {/* Result Display (Captured in PDF) */}
      {result && (
        <div ref={resultRef} className="bg-white p-6 shadow rounded-lg border">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Semester {result.semester} Result</h2>
          </div>

          {studentInfo && (
            <div className="mb-4">
              <p><strong>Name:</strong> {studentInfo.name || "N/A"}</p>
              <p><strong>Enrollment No:</strong> {studentInfo.enrollmentNo || "N/A"}</p>
            </div>
          )}

          <p><strong>SGPA:</strong> {result.sgpa}</p>
          <p><strong>CGPA:</strong> {result.cgpa}</p>
          <p><strong>Total Credits:</strong> {result.totalCredits}</p>

          <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Max Marks</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Credits</th>
              </tr>
            </thead>
            <tbody>
              {result.subjectResults.map((subj, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{subj.subjectName}</td>
                  <td className="border px-4 py-2">{subj.marks}</td>
                  <td className="border px-4 py-2">{subj.maxMarks}</td>
                  <td className="border px-4 py-2">{subj.grade}</td>
                  <td className="border px-4 py-2">{subj.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Result;
