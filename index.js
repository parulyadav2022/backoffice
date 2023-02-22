const express = require("express");
const ejs = require("ejs");
const con = require("./db");
const port = 3001;
const app = express();
// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", route);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

    

app.use(express.static("public"));
app.set("view engine","ejs")

app.get("/",(req,res,)=>{
   res.render("pages/dashboard1");
});
app.get("/users",(req,res)=>{
   res.render("pages/allusers");
});

app.get("/activeUsers",(req,res)=>{
   res.render("pages/activeusers");
});
app.get("/inactiveUsers",(req,res)=>{
   res.render("pages/inactiveusers");
});

app.get("/blockedUsers",(req,res)=>{
   let sqlQuery = 'select * from payment_gateway.users where user_status = 2';
  con.query(sqlQuery, function (error, results, field) {
    console.log(field)
    if (error) throw error;
    res.render("pages/blockedusers",{results:results});
    
  });
});




// app.listen(ProgressEvent, () => console.log("server started in 3000 port"));