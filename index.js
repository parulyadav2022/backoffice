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
app.set("view engine", "ejs")
const resultsPerPage = 5;
app.get("/", (req, res,) => {
   res.render("pages/dashboard1");
});

// app.get("/users",(req,res)=>{
//    let sqlQuery = 'select * from payment_gateway.users';
//   con.query(sqlQuery, function (error, results, field) {
//     console.log(field)
//     if (error) throw error;
//     res.render("pages/allusers",{results:results});

// });
// });

app.get('/users', (req, res) => {
   let sqlQuery = 'select * from payment_gateway.users';
   con.query(sqlQuery, function (error, results, field) {
      console.log(field)
      if (error) throw error;
      res.render("pages/allusers", { results: results });
 try {
         var query = {};
         var page = 1;
         var perpage = 3;
         if (req.query.page != null) {
            page = req.query.page
         }
         query.skip = (perpage * page) - perpage;
         query.limit = perpage;

         results.find({}, {}, query, (err, data) => {
            if (err) {
               console.log(err);
            }
            results.count((err, count) => {
               if (err) {
                  console.log(err)
               }
               res.render('pages/allusers', {
                  data: data,
                  current: page,
                  pages: Math.ceil(count / perpage)
               })
            });
         });
      } catch (error) {
         console.log(error);
      } });});


app.get("/activeUsers", (req, res) => {
   let sqlQuery = 'select * from payment_gateway.users where user_status = 1';
   con.query(sqlQuery, function (error, results, field) {
      console.log(field)
      if (error) throw error;
      res.render("pages/activeusers", { results: results });

   });

});
app.get("/inactiveUsers", (req, res) => {
   let sqlQuery = 'select * from payment_gateway.users where user_status = 0';
   con.query(sqlQuery, function (error, results, field) {
      console.log(field)
      if (error) throw error;
      res.render("pages/inactiveusers", { results: results });

   });

});

app.get("/blockedUsers", (req, res) => {
   let sqlQuery = 'select * from payment_gateway.users where user_status = 2';
   con.query(sqlQuery, function (error, results, field) {
      console.log(field)
      if (error) throw error;
      res.render("pages/blockedusers", { results: results });

   });
});


// app.listen(ProgressEvent, () => console.log("server started in 3000 port"));

// const numOfResults = results.length;
//     const numberOfPages = Math.cell(numOfResults/resultsPerPage);
//     let page = req.query.page ? Number(req.query.page) :1;
//     if(page > numberOfPages){
//       res.send('/?page=' + encodeURIComponent('1'));
//     }
//     const startingLimit = (page-1) * resultsPerPage;
//     sql = `select * from payment_gateway.users LIMIT $(startingLimit),$(resultsPerPage)`;
//     con.query(sql,(err,result)=>{
//       if(err) throw err;
//       let iterator = (page - 5)<1 ? 1: (page - 5);
//       let endingLink = (iterator + 9) <= numberOfPages ? (iterator+9) : page +  (numberOfPages);
//       if(endingLink < (page +4)){
//          iterator -= (page +4) - numberOfPages;
//       }
//       res.render('allusers',{data:result,page , iterator , endingLink , numberOfPages});
//     })
//   });
