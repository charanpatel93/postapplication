const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
const multer=require("multer");
const jwt =require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
let app=express();
app.use(cors());

app.use(express.json());

app.use("/Profilepics",express.static("Profilepics"));

const path=require("path");

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Profilepics')
  },
  filename: function (req, file, cb) {
    cb(null,`${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

app.post("/Signup", upload.single("profile"),async(req,res)=>{
    try {
       let dataEmployee=new user({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email,
       password:req.body.password,
       phoneNo:req.body.phoneNo,
       profile:req.file.filename

    })
   await dataEmployee.save();
    console.log(dataEmployee);
    console.log("data is inserted") 
    res.json({status:"success",msg:"data is inserted"})
    } catch (error) {
        res.json({status:"failed",msg:"data is not inserted"})
       console.log("data is not inserted") 
    } 
})
app.post("/validate",upload.none(),async(req,res)=>{
    console.log(req.body);
   let decryptedCredintals=jwt.verify(req.body.token,"salaar");
   console.log(decryptedCredintals);
   
     let getting = await user.find().and([
        {email:decryptedCredintals.email}]);
    if(getting.length > 0){
    if(decryptedCredintals.password === getting[0].password){
       let memberData={
      firstname:getting[0].firstname,
      lastname:getting[0].lastname,
      email:getting[0].email,
      phoneNo:getting[0].phoneNo,
      profile:getting[0].profile 
    }
       res.json({status:"success",msg:"credentials are right",data:memberData})
    }else{
         res.json({status:"unsuccess",msg:"password is wrong"}) 
    }
    }else{
       res.json({status:"unsuccess",msg:"user doen't exist"}) 
    }
    

})
app.post("/login",upload.none(),async(req,res)=>{
     let getting = await user.find().and([
        {email:req.body.email}]);

        let token=jwt.sign({email:req.body.email,password:req.body.password},"salaar")
    if(getting.length > 0){
    if(req.body.password === getting[0].password){
       let memberData={
      firstname:getting[0].firstname,
      lastname:getting[0].lastname,
      email:getting[0].email,
      phoneNo:getting[0].phoneNo,
      profile:getting[0].profile,
       token:token,
    }
       res.json({status:"success",msg:"credentials are right",data:memberData})
    }else{
         res.json({status:"unsuccess",msg:"password is wrong"}) 
    }
    }else{
       res.json({status:"unsuccess",msg:"user doen't exist"}) 
    }
    

})

app.listen(process.env.PORT,()=>{
      console.log(`server is running on port ${process.env.PORT}`);
})
let employeeSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    phoneNo:Number,
    profile:String
})

let user= new mongoose.model("salaar",employeeSchema,"EmployeeDetails")

let connectTodatabase=async()=>{
try {
    await mongoose.connect(process.env.MDBURL);
    console.log("connected to database")
   
} catch (error) {
   console.log("unable to connect the database") 
}
}

connectTodatabase();