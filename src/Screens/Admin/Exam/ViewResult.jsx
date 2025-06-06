import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseApiURL } from "../../../baseUrl";

const ViewResult = () => {
  const [enrollment, setEnrollment] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!enrollment) {
      toast.error("Please enter enrollment number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${baseApiURL()}/result/admin/getStudentFinalResults`, {
        params: { enrollment },
      });

      if (response.data.success) {
        setResults(response.data.results);
        toast.success("Results fetched successfully!");
      } else {
        toast.error(response.data.message || "No results found.");
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      toast.error("Error fetching results.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">View Student Results</h1>

      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Enrollment Number"
          className="border p-3 rounded-md flex-grow"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
        />
        <button
          onClick={fetchResults}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results Display */}
      {results.length > 0 ? (
        results.map((result, idx) => (
          <div key={idx} className="mb-6 border p-4 rounded-md bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Semester {result.semester}
            </h2>
            <p><strong>SGPA:</strong> {result.sgpa}</p>
            <p><strong>CGPA:</strong> {result.cgpa}</p>
            <p><strong>Total Credits:</strong> {result.totalCredits}</p>

            <h3 className="mt-4 font-medium">Subjects:</h3>
            <ul className="list-disc pl-5">
              {result.subjectResults.map((subject, i) => (
                <li key={i}>
                  <p><strong>Subject:</strong> {subject?.subjectName || "N/A"}</p>
                  <p><strong>Marks:</strong> {subject.marks}/{subject.maxMarks}</p>
                  <p><strong>Grade:</strong> {subject.grade}</p>
                  <p><strong>Credits:</strong> {subject.credits}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-gray-500">{loading ? "" : "No results to display."}</p>
      )}
    </div>
  );
};

export default ViewResult;
