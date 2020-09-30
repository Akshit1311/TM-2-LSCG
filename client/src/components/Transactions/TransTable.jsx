import React from "react";
import { logDOM } from "@testing-library/react";
import { acceptedData } from "../../data/transData";

//Data

function TransTable({ data, status, handleAcception, handleRejection }) {
  return (
    <React.Fragment>
      {/* Modal  */}
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          {/* Modal Content  */}
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Reject AML Transaction</h3>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <p className="font-weight-bold">Reason for rejecting: </p>
                <select name="cars" className="custom-select">
                  <option defaultValue="reason1">Reason 1</option>
                  <option value="reason2">Reason 2</option>
                  <option value="reason3">Reason 3</option>
                  <option>other</option>
                </select>
                <div className="form-group">
                  <label className="font-weight-bold" htmlFor="comment">
                    Comment:
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    id="comment"
                  ></textarea>
                </div>

                <p className="font-weight-bold">Nature and Purpose/Activity:</p>
                <select name="cars" className="custom-select">
                  <option defaultValue="reason1">Reason 1</option>
                  <option value="reason2">Reason 2</option>
                  <option value="reason3">Reason 3</option>
                  <option>other</option>
                </select>

                <button
                  onClick={(e) => e.preventDefault()}
                  className="btn btn-success float-right my-3 mx-3 px-4"
                >
                  Save
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <table
        style={{ height: "500px ", width: "100%" }}
        className="table table-striped table-hover table-responsive"
      >
        <thead class="table-header">
          <tr>
            <th
              className="my-auto d-block"
              style={{ border: "none", height: "100% !important" }}
            >
              {status === "pending" ? "Actions" : "Status"}
            </th>
            <th>Flag</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Customer ID</th>
            <th>oldbalOrg</th>
            <th>newbalOrig</th>
            <th>nameDest</th>
            <th>oldbalDest</th>
            <th>newbalDest</th>
            <th>Origin Country</th>
            <th>Destination Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td style={{ display: "flex" }}>
                  <button
                    style={{
                      borderRadius: "50%",
                      padding: " 1rem auto",
                      display: "inline",
                    }}
                    className={
                      status !== "pending" ? "d-none" : "btn btn-success"
                    }
                    onClick={() => handleAcception(transaction)}
                  >
                    <i className="fa fa-check"></i>
                  </button>
                  &nbsp;
                  <button
                    style={{ borderRadius: "50%", display: "inline" }}
                    className={
                      status !== "pending" ? "d-none" : "btn btn-danger"
                    }
                    onClick={() => handleRejection(transaction)}
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                  <i
                    className={
                      status === "accepted"
                        ? "fa fa-check text-success"
                        : "d-none"
                    }
                    aria-hidden="true"
                  ></i>
                  <i
                    className={
                      status === "rejected"
                        ? "fa fa-times text-danger"
                        : "d-none"
                    }
                    aria-hidden="true"
                  ></i>
                </td>
                <td>
                  <i
                    className="fa fa-flag"
                    style={{ color: transaction.Flag }}
                    aria-hidden="true"
                  ></i>
                </td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.nameOrig}</td>
                <td>{transaction.oldbalanceOrg}</td>
                <td>{transaction.newbalanceOrig}</td>
                <td>{transaction.nameDest}</td>
                <td>{transaction.oldbalanceDest}</td>
                <td>{transaction.newbalanceDest}</td>
                <td>{transaction.OrigCountry}</td>
                <td>{transaction.DestCountry}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default TransTable;
