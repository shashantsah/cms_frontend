/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";

const CurriculumUpload = () => {
  const { fullname } = useSelector((state) => state.userData);
  const [subject, setSubject] = useState([]);
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState({
    subject: "",
    faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
  });

  useEffect(() => {
    toast.loading("Loading Subjects...");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected File:", selectedFile);  // Debugging
    } else {
      console.log("No file selected");
    }
  };

  const addCurriculumHandler = () => {
    if (!selected.subject || !file) {
      toast.error("Please select a subject and upload a file!");
      return;
    }

    toast.loading("Uploading Curriculum...");
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("subject", selected.subject);
    formData.append("faculty", selected.faculty);
    formData.append("type", "curriculum");
    formData.append("curriculum", file);
    
    axios
      .post(`${baseApiURL()}/curriculum/addCurriculum`, formData, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            subject: "",
            faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
          });
          setFile(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Error uploading curriculum");
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Upload Curriculum" />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-[80%] mt-2">
            <label htmlFor="subject">Select Subject</label>
            <select
              value={selected.subject}
              name="subject"
              id="subject"
              onChange={(e) => setSelected({ ...selected, subject: e.target.value })}
              className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1 w-full"
            >
              <option defaultValue value="">
                -- Select Subject --
              </option>
              {subject &&
                subject.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {!file && (
            <label
              htmlFor="upload"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
            >
              Upload Curriculum File
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
          )}
          {file && (
            <p
              className="px-2 border-2 border-blue-500 py-2 rounded text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
              onClick={() => setFile(null)}
            >
              Remove Selected File
              <span className="ml-2">
                <AiOutlineClose />
              </span>
            </p>
          )}

          <input
            type="file"
            name="upload"
            id="upload"
            hidden
            onChange={handleFileChange}
          />

          <button
            className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
            onClick={addCurriculumHandler}
          >
            Add Curriculum
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumUpload;