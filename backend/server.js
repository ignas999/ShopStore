const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const multer = require("multer")
const path = require("path")


const app = express();


app.use(cors());
app.use(express.json())
app.use('/assets', express.static('assets/'))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "" ,
    database: "reactapp"
})


const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, "assets/")
    },
    filename: (req,file,callback)=>{
        
        callback(null, file.fieldname +"_"+ Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


app.get("/", (req,res)=>{
    return res.json("From backend side")
})

app.get("/users", (req,res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (err,data) =>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
})

//registracija

app.post("/register", (req,res) =>{

    if(req.body.Email && req.body.Username && req.body.Password) {
        const receivedEmail = req.body.Email
        const receivedUsername = req.body.Username
        const receivedPassword = req.body.Password
    
        //gavus duomenis sukuriame sql requesta
        const Values = [receivedUsername, receivedPassword, receivedEmail]
        const sql = 'INSERT INTO users (Username, Password, Email) VALUES (?,?,?)'
    
        //issiunciame sql query i db
        
        db.query(sql, Values, (err,result) =>{
            
            if(err){
                return res.send({message:'egzistuoja jau ',
                showstyle: "showMessagebad"})
            }
            else{
                console.log("user inserted into a database ")
                res.send({message: "pavyko",
                          showstyle: "showMessagegood"})
            }
        })
    }
    else{

        return res.send({message:'palikti Tusti laukai! ',
                        showstyle: "showMessagebad"})


}
})


//Prisijungimas
app.post("/login" ,(req,res)=>{

    
    const receivedloginUsername = req.body.Username
    const receivedloginPassword = req.body.Password

    //gavus duomenis sukuriame sql requesta kuris patikrina visus laukus
    const Values = [receivedloginUsername, receivedloginPassword]
    const sql = 'SELECT * FROM users WHERE Username = ? && Password = ?'

    //issiunciame sql query i db
    db.query(sql, Values, (err,result) =>{
    
        if(err){
          return res.send({error: err})
        }
        if(result.length > 0){
            res.send(result)
        }
        else{
            res.send({message: "Blogai suvedete duomenis"})
        }
        })
})

app.get("/products" ,(req,res)=>{
    const sql = " Select * from prekes"
    db.query(sql , (err,result) =>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(result)
        }
    })
})

app.get("/orders/:id" ,(req,res)=>{
    const username = req.params.id
    console.log(username)
   // const sql = " Select * from uzsakymas INNER JOIN users on uzsakymas.VartotojoID = users.userID INNER JOIN prekes on uzsakymas.prekesID = prekes.PrekesID where uzsakymas.VartotojoID = ?"
   
    const sql = " SELECT uzsakymas.uzsakymoID, prekes.Pavadinimas ,uzsakymas.Kiekis ,uzsakymas.Laikotarpis_MEN, uzsakymas.Statusas from uzsakymas INNER JOIN users on uzsakymas.VartotojoID = users.userID INNER JOIN prekes on uzsakymas.prekesID = prekes.PrekesID where uzsakymas.VartotojoID = ?"
    db.query(sql, [username] ,(err,result) =>{
        if(err){
            
            return res.json(err)
        }
        else{
           // console.log(result)
            return res.json(result)
        }
    })
})

app.get("/getorders" ,(req,res)=>{
    
    const sql2 = "SELECT uzsakymas.uzsakymoID, users.Username, users.Email ,prekes.Pavadinimas ,uzsakymas.Kiekis, uzsakymas.Laikotarpis_MEN, statusas.Status_Name as Statusas from uzsakymas INNER JOIN users on uzsakymas.VartotojoID = users.userID INNER JOIN prekes on uzsakymas.prekesID = prekes.PrekesID  INNER JOIN statusas on uzsakymas.Statusas = statusas.StatusoID order by  statusas.statusoID asc"
    
    db.query(sql2 , (err,result) =>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(result)
        }
    })
})

app.put("/setorders", (req,res)=>{
    const orderID = req.body.orderID
    const statusValue= req.body.statusvalue
   // console.log(orderID, statusValue)
    const sql = "UPDATE uzsakymas SET uzsakymas.Statusas = ? WHERE uzsakymas.UzsakymoID = ?"


    db.query(sql,[statusValue,orderID] , (err,data)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json("uzsakymas atnaujintas")
        }
    })
})

//uzsakimo pridejimas
app.post('/makeorder',(req,res)=>{
   //console.log(req.body)
    const userID = req.body.userID
    const itemID = req.body.itemID
    const itemCount = req.body.itemCount
    const rentmonths = req.body.rentmonths
    
    const sql = "INSERT INTO uzsakymas (VartotojoID, PrekesID, Kiekis, Laikotarpis_MEN, Statusas) VALUES (?)"
    const values = [
        userID,
        itemID,
        itemCount,
        rentmonths,
        1
    ]
    db.query(sql, [values],(err,data)=>{
        if (err) {
            
            return res.json(err)
        }
        else{
            return res.json("uzsakymas Pridetas I sarasa")
        }
        
    })
})

app.get("/categories" ,(req,res)=>{
    const sql = " Select * from kategorija"
    db.query(sql , (err,result) =>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(result)
        }
    })
})

//gauti tik vienos  kategorijos prekes
app.get("/productscategory/:id" ,(req,res)=>{

    const productID = req.params.id
    const sql = "Select * FROM prekes  WHERE KategorijaID = ?"

    

    db.query(sql,[productID] , (err,data)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
})

//prekiu pridejimas 
// app.post("/products", (req,res)=>{

//     const receivedPavadinimas = req.body.Pavadinimas
//     const receivedKaina =  req.body.Kaina
//     const receivedKategorijaID = req.body.KategorijaID

//     const sql = "INSERT INTO prekes (PrekesID, Pavadinimas, Kaina, KategorijaID) VALUES (NULL, ?)"
//     const values = [
//         receivedPavadinimas,
//         receivedKaina,
//         receivedKategorijaID,
//         ]

//     db.query(sql, [values],(err,data)=>{
//         if (err) {
//             console.log(err)
//             return res.json(err)
//         }
//         else{
//             return res.json("Preke Prideta I sarasa")
//         }
        
//     })

// })

app.post("/products",upload.single('image'), (req,res)=>{

   
   
  
        
        const receivedPavadinimas = req.body.Pavadinimas
        const receivedKaina =  req.body.Kaina
        const receivedKategorijaID = req.body.KategorijaID
        const receivedPaveikslas = req.file.filename
       // console.log(receivedPaveikslas)
    
        const sql = "INSERT INTO prekes (PrekesID, Pavadinimas, Kaina, KategorijaID, Paveikslas) VALUES (NULL, ?)"
        const values = [
            receivedPavadinimas,
            receivedKaina,
            receivedKategorijaID,
            receivedPaveikslas
            ]
    
            //console.log(values)
        db.query(sql, [values],(err,data)=>{
            if (err) {
                //console.log(err)
                return res.json(err)
            }
            else{
                return res.json("Preke Prideta I sarasa")
            }
            
        })
    
    })

    app.post('/image',upload.single('image') ,(req, res)=>{
        console.log(req.file.filename)
        const image = req.file.filename
        const sql = "UPDATE prekes SET Paveikslas= ?"
        db.query(sql, [image],(err,result)=>{
            if(err) {
                return res.json(err)}
            else{
                return res.json({Message: "good"})
            }
        })
    
    })
    

//prekiu atnaujiniams
app.put("/products/:id", (req,res)=>{
    const productID = req.params.id
    const sql = "UPDATE prekes SET Pavadinimas = ? , Kaina = ? , KategorijaID = ? WHERE prekes.PrekesID = ?"

    const values= [
        req.body.Pavadinimas,
        req.body.Kaina,
        req.body.KategorijaID
    ]
    

    db.query(sql,[...values, productID] , (err,data)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json("preke atnaujinta")
        }
    })
})

//gauti tik vienos prekes aprasyma
app.get("/products/:id" ,(req,res)=>{

    const productID = req.params.id
    const sql = "Select prekes.Pavadinimas, prekes.Kaina , kategorija.Pavadinimas AS Kategorija, prekes.KategorijaID FROM prekes INNER JOIN kategorija on prekes.KategorijaID =kategorija.KategorijaID WHERE prekes.PrekesID = ?"

    

    db.query(sql,[productID] , (err,data)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
})

//prekiu istrinimas
app.delete("/products/:id", (req,res)=>{
        const productID = req.params.id
        const sql = "DELETE FROM prekes WHERE prekes.PrekesID = ?"

        

        db.query(sql,[productID] , (err,data)=>{
            if(err){
                return res.json(err)
            }
            else{
                return res.json("preke istrinta")
            }
        })
})

app.listen(3000, ()=>{
    console.log("server is running")
   
})