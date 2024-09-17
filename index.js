const express = require("express");
const { con } = require("./config");
const app = express();
const port = 4000;



app.use(express.json());


// get api
app.get("/", (req, res) =>{
    con.query("SELECT * FROM users",(err, result)=>{
        if(err){
            console.log('error',err);
        }
        else{
            console.log(result);
            res.send(result)
        }
    })
});


// post api
app.post('/',(req,res)=>{
    // let data = {id: 1, git : "amit kumar", email:"rahul@gmail.com" , password: "2234",user_type:"visiter"}
    let data = req.body;
    
    con.query("INSERT INTO users SET ?", data, (err,result,fields)=>{
        if(err){
            console.log("data is not inserted",err)
        } 
        else{
            res.send(result)
            console.log("data inserted sucessfully!")
        }
    })
})

//Put api
// app.put('/',(req,res)=>{

//     const data  = ["changedName","5432","reader,8"];
//     con.query("UPDATE users SET name = ?, password = ?,user_type = ? WHERE email = ?",data,(err,result,fields)=>{
//         if(err){
//             console.log("data is not Updated ",err)
//         } 
//         else{
//             res.send(result)
//             console.log("data Updated sucessfully!")
//         }
//     })

// })



app.put('/:id', (req, res) => {
    // Extract data from request body
    // const { name, password, userType, id } = req.body;

    // Array of values for the query
    // const data = ["changedName", 34242, "Admin", "id"];
    const data = [req.body.name, req.body.password, req.body.user_type, "req.params.email"];


    // Update query
    con.query("UPDATE users SET name = ?, password = ?, user_type = ? WHERE email = ?", data, (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: 'Error updating data' });
        } 

        if (result.affectedRows === 0) {
            // No rows were updated, possibly because the email did not match any user
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Data updated successfully!' });
        console.log("Data updated successfully!");
    });
});



// delete api 
app.delete('/:id', (req,res)=>{
    // res.send(req.params.id);

    con.connect((err)=>{
        if (err){
            console.log("error",err);
        }else{
            con.query("DELETE FROM customers WHERE address ="+req.params.id ,(err, result)=> {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
              });
        }
    })
})


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
