import React, { useState, version } from "react";
import { useDropzone } from "react-dropzone";

// Axios
import axios from "axios";

import { Link } from "react-router-dom";

function NewFU(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: ".xlsx",
    onDropAccepted: () => {
      console.log("accepted");
      setUploadStatus("accepted");
      setUploadClass("spinner-grow text-dark correct");
    },
    onDropRejected: () => {
      setUploadClass("fa fa-times text-danger correct");
      setUploadStatus("rejected");
    },
  });

  const [uploadStatus, setUploadStatus] = useState("upload");
  const [uploadClass, setUploadClass] = useState(
    "fa fa-upload text-dark correct"
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <div key={file.path}>
      {file.path} - {file.size} bytes
    </div>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <div key={e.code}>{e.message}</div>
        ))}
      </ul>
    </div>
  ));

  //react drop-zone ends

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", ...acceptedFiles);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      if (res.data.isUploaded) {
        setUploadStatus("uploaded");
        setUploadClass("fa fa-check text-success correct");
      }

      // const { fileName, filePath } = res.data;
    } catch (err) {
      if (err.status === 500) {
        // setMessage("Issues with server");
        console.log("Issues with the server");
      } else {
        // setMessage(err.response.data.msg);
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <section className="container">
      <form onSubmit={onSubmit}>
        <div
          style={styles.dropable}
          {...getRootProps({ className: "dropzone" })}
          className="drop-area text-dark"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>

          <i className={uploadClass}></i>

          {/* <h1 className="text-danger">{acceptedFileItems.length}</h1> */}
          <h2 className="text-success">{acceptedFileItems}</h2>
          <h2 className="text-danger">{fileRejectionItems}</h2>
          <em>(Only *.xlsx files will be accepted)</em>
        </div>
        {/* <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside> */}

        {uploadStatus === "accepted" && (
          <React.Fragment>
            <input
              type="submit"
              value="Upload"
              className="btn btn-primary mx-auto d-block upload-btn mt-4"
            />
            <h2 className="text-center mt-4">Please Click on Upload</h2>
          </React.Fragment>
        )}

        {uploadStatus === "uploaded" && (
          <React.Fragment>
            <h2 className="text-center text-success mt-4">
              File Uploaded Successfully!
            </h2>

            <Link to="/dashboard">
              <input
                type="submit"
                value="Generate Report"
                className="btn btn-primary mx-auto d-block upload-btn mt-4"
              />
            </Link>
          </React.Fragment>
        )}
      </form>
    </section>
  );
}

const styles = {
  dropable: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "darkgray",
    padding: "20px",
    borderWidth: "0.5em",
    borderRadius: "2px",
    // borderColor: ${props => getColor(props)},
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    // outline: "none",
    transition: "border .24s ease-in-out",
  },
};

export default NewFU;
