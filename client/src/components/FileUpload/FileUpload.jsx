import React from "react";
import { useState, useRef, Fragment } from "react";

import { Link } from "react-router-dom";

// Axios
import axios from "axios";

// Styles
import "./FileUpload.css";
import Message from "./Message";

function FileUpload() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Click here to upload file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const inputFileRef = useRef(null);

  const [isUploaded, setIsUploaded] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
      setIsUploaded(true);
    } catch (err) {
      if (err.status === 500) {
        setMessage("Issues with server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const handleUpload = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="container">
      <div className="uploaded-file text-dark">
        {isUploaded ? (
          <Fragment>
            <i
              className="fa fa-check text-success correct"
              onClick={handleUpload}
            ></i>
            {fileName}
          </Fragment>
        ) : (
          <Fragment>
            <i className="fa fa-plus" onClick={handleUpload}></i>

            <h3>{fileName}</h3>
          </Fragment>
        )}
      </div>
      {message && <Message msg={message} />}

      <form onSubmit={onSubmit}>
        <div className="custom-file d-none">
          <input
            type="file"
            className="custom-file-input hide"
            id="customFile"
            onChange={onChange}
            ref={inputFileRef}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary mx-auto d-block upload-btn mt-4"
        />
        {isUploaded && (
          <Link to="/dashboard">
            <input
              type="submit"
              value="Generate Report"
              className="btn btn-success mx-auto d-block upload-btn mt-4"
            />
          </Link>
        )}
      </form>
    </div>
  );
}

export default FileUpload;
