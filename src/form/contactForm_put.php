<script>

contactForm.addEventListener('iron-form-submit', function(event) {
  this.querySelector('.output').innerHTML = JSON.stringify(event.detail);
 });

 </script>

<?php
    $con = mysql_connect("webapp","as43vE54","") or die('Could not connect: ' . mysql_error());
    mysql_select_db("contactsDB", $con);
?>

<?php
    //read the json Post contents
$jsondata = file_get_contents(echo $_POST["*"];);
?>

<?php
    //convert json object to php associative array
    $data = json_decode($jsondata, true);
?>

<?php
    //get the contact details
    $fname = $data['c_firstName'];
    $lname = $data['c_lastName'];
    $position = $data['c_Position'];
?>

<?php
    //insert into mysql table
    $sql = "INSERT INTO contactsdb.contact(idContact, Contact_FirstName, Contact_LastName, Contact_Position)
    VALUES('','$fname', '$lname', '$position')";
    if(!mysql_query($sql,$con))
    {
        die('Error : ' . mysql_error());
    }
?>
