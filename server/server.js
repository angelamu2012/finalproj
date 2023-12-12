const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser'); // middleware making object 
const {MongoClient, ObjectId} = require('mongodb');
app.use(cors()); // middleware 
app.use(bodyParser.json());
const uri = 'mongodb+srv://aym2122:mongodbpass@cluster0.pdl3jif.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri); // creating instance 
async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        app.listen(3000,()=>{console.log("server started on port 3000")});
 
    } catch (e) {
        console.error(e);
    }
}


app.get("/api", async (req, res) =>{
    const data = await client.db("db_entries").collection("entry").find().toArray();
    res.send(data);
});
app.post("/api/postData", async (req, res) => {
    console.log("req received");
    const data = req?.body;

    const result = client.db("db_entries").collection("entry").insertOne(data);

    res.send(result);
});
app.delete("/api/deleteData/:id", async (req, res) => {
    console.log("trying to delete data")
    const id = req.params.id.toString();
    console.log(id)
    const result = await client.db("db_entries").collection("entry").deleteOne({ "_id": new ObjectId(id) });
  
    res.send(result);
    console.log("data deleted")
});




main().catch(console.error);

