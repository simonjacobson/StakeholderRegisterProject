
//Parse data from JSON POST and insert into MYSQL

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// Configure MySQL connection
var connection = mysql.createConnection({
    host     : 'DESKTOP-QNCKG1S',
    user     : 'webapp',
    password : 'as43vE54',
    database : 'contactsDB',
});

//Establish MySQL connection
connection.connect(function(err) {
   if (err)
      throw err
   else {
       console.log('Connected to MySQL');
       // Start the app when connection is ready
       app.listen(3000);
       console.log('Server listening on port 3000');
 }
});

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/my-new-view.html'));
});

app.post('/', function(req, res) {

var jsondata = req.body;
var values = [];

for(var i=0; i< jsondata.length; i++)
  values.push([jsondata[i].c_firstName,jsondata[i].c_lastName],jsondata[i].c_Position);

//Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
connection.query('INSERT INTO contact (Contact_FirstName, Contact_LastName, Contact_Position) VALUES ?', [values], function(err,result) {
  if(err) {
     res.send('Error');
  }
 else {
     res.send('Success');
  }
});
});



/*

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from contact",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);
