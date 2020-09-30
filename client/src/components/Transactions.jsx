import React, { useState, Fragment } from "react";

import TransTable from "./Transactions/TransTable";
// import { pendingData, acceptedData, rejectedData } from "../data/transData";

import NewFU from "./FileUpload/NewFU";

function Transactions({ allFlags }) {
  const [pending, setPending] = useState("pending");
  const [accepted, setAccepted] = useState("accepted d-none");
  const [rejected, setRejected] = useState("rejected d-none");

  const [activeSect, setActiveSect] = useState("pending");

  const [pendingRecords, setPendingRecords] = useState([]);
  const [acceptedRecords, setAcceptedRecords] = useState([]);
  const [rejectedRecords, setRejectedRecords] = useState([]);

  const handleAcception = (trans) => {
    // console.log(trans);

    setAcceptedRecords([...acceptedRecords, trans]);
    setPendingRecords(
      pendingRecords.filter((rec) => rec != trans).map((record) => record)
    );
  };
  const handleRejection = (trans) => {
    // console.log("does this work");

    setRejectedRecords([...rejectedRecords, trans]);
    setPendingRecords(
      pendingRecords.filter((rec) => rec != trans).map((record) => record)
    );
  };

  const handleSection = (event) => {
    const { id } = event.target;

    if (id === "accepted") {
      setAccepted("accepted");
      setPending("pending d-none");
      setRejected("rejected d-none");
      setActiveSect("accepted");
    } else if (id === "rejected") {
      setAccepted("accepted d-none");
      setPending("pending d-none");
      setRejected("rejected");
      setActiveSect("rejected");
    } else {
      setAccepted("accepted d-none");
      setPending("pending");
      setRejected("rejected d-none");
      setActiveSect("pending");
    }
  };
  return (
    <Fragment>
      {pendingRecords.length ? (
        <div className="container-1">
          <div className="trans-types">
            <div className="row">
              <div className="col">
                <div
                  className={
                    activeSect === "pending"
                      ? "text-center active"
                      : "text-center"
                  }
                  id="pending"
                  onClick={handleSection}
                >
                  Pending
                </div>
              </div>
              <div className="col">
                <div
                  className={
                    activeSect === "accepted"
                      ? "text-center active"
                      : "text-center"
                  }
                  id="accepted"
                  onClick={handleSection}
                >
                  Accepted
                </div>
              </div>
              <div className="col">
                <div
                  className={
                    activeSect === "rejected"
                      ? "text-center active"
                      : "text-center"
                  }
                  id="rejected"
                  onClick={handleSection}
                >
                  Rejected
                </div>
              </div>
            </div>
          </div>

          {/* {pendingRecords.length === 0 && (
        <div className="spinner-grow spinner-grow-lg"></div> :
      )} */}

          <div className={pending}>
            <TransTable
              data={pendingRecords}
              status="pending"
              handleAcception={handleAcception}
              handleRejection={handleRejection}
            />
          </div>
          <div className={accepted}>
            <TransTable data={acceptedRecords} status="accepted" />
          </div>
          <div className={rejected}>
            <TransTable data={rejectedRecords} status="rejected" />
          </div>
        </div>
      ) : (
        <NewFU setPendingRecords={setPendingRecords} />
      )}
    </Fragment>
  );
}

export default Transactions;

// <div className="loading-msg">
//           <div className="spinner-grow mx-auto d-block"></div>
//           <br />
//           <h3 className="text-dark text-center ">
//             Please wait until your <br /> data is being processed ...
//           </h3>
//         </div>
