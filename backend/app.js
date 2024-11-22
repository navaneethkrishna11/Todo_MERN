const express = require('express')
const cors = require('cors')
const mongoose =require('mongoose')

const app = express();
app.use(express.json());
app.use(cors());

////////////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/todo',)
.then(()=>{
    console.log("MongoDB is connected")
})
.catch(()=>{
    console.log("not connected")
})

//////////////////////////////////////////

const todo = new mongoose.Schema({
    eventName:String,
    eventData:String,
  //task:String,
   // isCompleted :{type:Boolean,default:false},
})

const Todo = mongoose.model("Todo",todo);

////////////////////////////////////////////////

app.post("/api/eventdata", async (req, res) => {
    try {
      console.log(req.body)
      const newTodo = new Todo({
        eventData: req.body.eventData,
        eventName:req.body.eventName
      });
    
      await newTodo.save();
     
    } catch (err) {
     console.log("error add")
    }
  });
  
  app.get("/api/eventdata", async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      console.log("error fetch")
    }
  });
  
  app.post('/api/eventdata/delete', async (req, res) => {
    const { ids } = req.body; // Extract ids from the request body
    console.log(ids);
  
    try {
      // Use Mongoose to delete multiple documents matching the _id in the provided array
      const result = await Todo.deleteMany({ _id: { $in: ids } });
  
      // Respond with success message and deletion details
      res.status(200).json({
        message: "Events deleted successfully",
        deletedCount: result.deletedCount, // Number of deleted documents
      });
    } catch (error) {
      // Handle errors
      console.error("Error deleting events:", error);
      res.status(500).json({ message: "Failed to delete events", error });
    }
  })


const PORT = 5000;
app.listen(PORT,()=>{console.log("server on")})

