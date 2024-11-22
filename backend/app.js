const express = require('express')
const cors = require('cors')
const mongoose =require('mongoose')

const app = express();
app.use(express.json());
app.use(cors());

////////////////////////////////////////////////

mongoose.connect('mongodb+srv://navaneethkrishna11:navaneethkrishna7711@cluster0.g2uufai.mongodb.net/',)
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
      const savedTodo = await newTodo.save();
      res.json(savedTodo);    
     
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

  app.put("/api/eventdata/:id", async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          eventName: req.body.eventName,
          eventData: req.body.eventData
        },
        { new: true } 
      );
      res.json(updatedTodo);
    } catch (err) {
      console.log("error updating");
    }
  });
  
  app.post('/api/eventdata/delete', async (req, res) => {
    const { ids } = req.body; 
    try {
      const result = await Todo.deleteMany({ _id: { $in: ids } });
      res.status(200).json({
        message: "Events deleted successfully",
        deletedCount: result.deletedCount, 
      });
    } catch (error) {
      console.error("Error deleting events:", error);
    }
  })


const PORT = 5000;
app.listen(PORT,()=>{console.log("server on")})

