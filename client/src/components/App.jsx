import React, { useEffect, useState } from "react";
import Note from "./Note";
import NewCard from "./NewCard";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [data, setData] = React.useState([]);
  const [dataUpdated, setDataUpdated] = useState(true);

  function saveData(title, content) {
    // setData([...data, { title: title, content: content }]);
    setDataUpdated(!dataUpdated);
  }

  function removeFromList(id) {
    // setData((data) => {
    //   return data.filter((item, index) => {
    //     return index !== id;
    //   });
    // });
    async function deleteData (id) {
      console.log("delete id: ", id)
      const response = await fetch("http://localhost:3000/api/deleteData/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response?.status === 200) {
        setDataUpdated(!dataUpdated);
      }
    };
    deleteData(id.toString());
  }

  // fetching data from backend 
  useEffect(()=>{
    console.log("use effect called")
    fetch("/api").then(
      response => response.json() 
    ).then(
      data =>{
        setData(data);
        console.log(data);
      }
    )
  },[dataUpdated])

  return (
    <div>
      <Header />

      <NewCard onAdd={saveData} />

      <dl>
        {data.map((item, index) => (
          <Note
            key={index}
            id={item._id}
            title={item.title}
            content={item.content}
            onDelete={removeFromList}
          />
        ))}
      </dl>

      <Footer />
    </div>
  );
}

export default App;
