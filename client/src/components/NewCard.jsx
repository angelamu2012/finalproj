import React from "react";

function NewCard(props) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
    console.log(title);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
    console.log(content);
  }

  function saveNote(event) {
    event.preventDefault();

    async function postData () {
      console.log("db: ", title, content)
      const response = await fetch("http://localhost:3000/api/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // converting userinput into json 
        body: JSON.stringify({
          title: title,
          content: content
        })
      })
      if(response?.status === 200) {
        setTitle("");
        setContent("");
        props.onAdd(title, content);
      }
    };
    if (title.length > 0 && content.length > 0) {
      postData(); // sending data 
    }
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Take a note..."
          onChange={handleContentChange}
          value={content}
        ></textarea>
        {}
        <button onClick={saveNote}> Add </button>
      </form>
    </div>
  );
}

export default NewCard;
