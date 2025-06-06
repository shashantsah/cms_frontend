import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../../baseUrl";

const UploadResult = () => {
  const facultyId = useSelector((state) => state.userData?._id) || "";
  const [file, setFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [maxMarks, setMaxMarks] = useState("");


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
      console.error("Error fetching subjects:", error);
      toast.error("Error fetching subjects");
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    // Check file type (only allow .xlsx or .xls)
    const validFileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    if (uploadedFile && validFileTypes.includes(uploadedFile.type)) {
      setFile(uploadedFile);
    } else {
      toast.error("Please upload a valid Excel file (.xlsx, .xls).");
      setFile(null);  // Clear file if invalid
    }
  };

  const handleSubmit = async () => {
    if (!file || !semester || !selectedSubject._id || !maxMarks) {
      toast.error("Please fill all the fields and upload a file.");
      return;
    }

    toast.loading("Uploading Result");

    const formData = new FormData();
    formData.append("semester", semester);
    formData.append("subjectId", selectedSubject._id);
    formData.append("subjectName", selectedSubject.name);
    formData.append("facultyId", facultyId);
    formData.append("type", "result");
    formData.append("file", file);
    formData.append("maxMarks", maxMarks);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    try{
      const response = await axios.post(`${baseApiURL()}/result/faculty/upload-result`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if(response.data.success) {
        toast.dismiss();
        toast.success("File uploaded successfully!");
        setSelectedSubject({});
        setSemester("");
        setFile(null);
        setMaxMarks("");
      }else{
        toast.dismiss();
        toast.error(response.data.message);
        console.log(response.data);
      }
    }catch(error){
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error uploading result");
      console.error("Error uploading result:", error);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Upload Result</h1>
      </div>

      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          {/* Semester Dropdown */}
          <div className="w-[80%] mt-2">
            <label htmlFor="semester" className="leading-7 text-base">
              Select Semester
            </label>
            <select
              id="semester"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="" disabled>
                -- Select Semester --
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}{" "}
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

          {/* Maximum Marks Input */}
          <div className="w-[80%] mt-2">
            <label htmlFor="maxMarks" className="leading-7 text-base">
              Maximum Marks
            </label>
            <input
              type="number"
              id="maxMarks"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full mt-1"
              placeholder="Enter maximum marks"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
            />
          </div>

          {/* Subject Dropdown */}
          <div className="w-[80%] mt-2">
            <label htmlFor="subject" className="leading-7 text-base">
              Select Subject
            </label>
            <select
              id="subject"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={selectedSubject._id || ""}
              onChange={(e) => {
                const selected = subjects.find(
                  (subj) => subj._id === e.target.value
                );
                setSelectedSubject(selected || {});
              }}
            >
              <option value="" disabled>
                -- Select Subject --
              </option>
              {subjects &&
                subjects.map((subj) => (
                  <option value={subj._id} key={subj._id}>
                    {subj.name}
                  </option>
                ))}
            </select>
          </div>

          {/* File Upload */}
          {!file && (
            <label
              htmlFor="upload"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
            >
              Upload Result
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
          )}

          {file && (
            <div className="w-[80%] mt-4 flex flex-col items-center">
              <p className="text-sm mb-2 text-gray-700 truncate w-full text-center">
                Selected File: <strong>{file.name}</strong>
              </p>
              <p
                className="px-2 border-2 border-blue-500 py-2 rounded text-base w-full flex justify-center items-center cursor-pointer"
                onClick={() => setFile(null)}
              >
                Remove File
                <span className="ml-2">
                  <AiOutlineClose />
                </span>
              </p>
            </div>
          )}
          <input
            type="file"
            id="upload"
            hidden
            accept=".xls,.xlsx"  // Only allow Excel files
            onChange={handleFileChange}
          />

          {/* Submit Button */}
          <button
            className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
            onClick={handleSubmit}
          >
            Upload Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResult;
