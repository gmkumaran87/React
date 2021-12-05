import React from "react";

function Setters(props) {
  const { length, title } = props;

  let incrBtnClass = "btn";
  let decrBtnClass = "btn";

  incrBtnClass += title === "Break Length" ? " btn-break-incr" : " btn-session";
  decrBtnClass += title === "Break Length" ? " btn-break-decr" : " btn-session";

  let incrBtnId =
    title === "Break Length" ? "break-increment" : "session-increment";

  let decrBtnId =
    title === "Break Length" ? "break-decrement" : "session-decrement";

  let titleId = title === "Break Length" ? "break-label" : "session-label";
  let lengthId = title === "Break Length" ? "break-length" : "session-length";
  return (
    <div className="setters-container">
      <h3 id={titleId}>{props.title}</h3>
      <h2 id={lengthId}>{length}</h2>
      <div className="btn-cntr">
        <button
          type="button"
          className={incrBtnClass}
          id={incrBtnId}
          onClick={(e) => props.breakIncr(incrBtnId)}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
        <button
          type="button"
          className={decrBtnClass}
          id={decrBtnId}
          onClick={(e) => props.breakDecr(decrBtnId)}
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
}

export default Setters;
