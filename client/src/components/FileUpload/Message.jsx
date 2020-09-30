import React from "react";

function Message({ msg }) {
  return (
    <div className="alert alert-primary alert-dismissible">
      <button type="button" className="close" data-dismiss="alert">
        &times;
      </button>
      {msg}
    </div>
  );
}

export default Message;
