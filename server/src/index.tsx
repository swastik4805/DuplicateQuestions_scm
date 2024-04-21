import express from 'express';
import bodyParser from 'body-parser';
import cors from  'cors'
const app=express();
const port=3001;


const allowedOrigins = ['https://duplicate-questions-ol2ro9l5m-swastik4805s-projects.vercel.app/', 
                        'https://duplicate-questions-scm-admin-53zccq4r4-swastik4805s-projects.vercel.app/'];
let selection="";
app.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
app.use(bodyParser.json());


const questions = ["Question 1", "Question 2"];

app.get('/questions', (req, res) => {
    res.json({ questions });
  });

app.post('/questions',(req,res)=>{
    console.log(req.body);
    console.log("hi");
    const {question1, question2}=req.body;
    questions[0]=question1;
    questions[1]=question2;
    console.log("from server", question1,question2);
    res.send({message: "questions received successfully"})
})

app.post("/selection",(req,res)=>{
    console.log(req.body);
    selection=req.body;
    console.log("selection from server", selection);
    res.send({message: "selection received fully"});
})

app.get("/selection",(req,res)=>{
    console.log("selection sent successfully");
    res.send(selection);
})


app.listen(port,()=>{
    console.log(`connected to port ${port}`);
})
