import React from "react";

function Note(props) {
  function deleteCard() {
    console.log("id to delete: ", props.id)
    props.onDelete(props.id);
  }

  return (
    <div>
      <div className="note">
        <h1> {props.title} </h1>
        <p> {props.content} </p>
        <button onClick={deleteCard}>DELETE</button>
      </div>
    </div>
  );
}

export default Note;
