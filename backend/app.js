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
  
  app.post('/api/eventdata/delete/:id', async (req, res) => {
    const { ids } = req.body;
    try {
      await Todo.deleteMany({ _id: { $in: ids } });
    } catch (error) {
     console.log("error del")
     console.log(ids)
    }
  });
  


const PORT = 5000;
app.listen(PORT,()=>{console.log("server on")})

