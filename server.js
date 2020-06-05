const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
const users = []
app.get("/users",(req, res)=>{
    res.json(users)
})
app.post("/users",async (req, res)=>{
    try{
        const hashedpassword = await bcrypt.hash(req.body.password,10)
        user = {name : req.body.name, password : hashedpassword}
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send()
    }
})



app.post("/users/login",async (req, res)=>{
    const user = users.find( (user) => user.name === req.body.name )
    if(user == null){
        return res.status(401).send('Can not find this user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password )){
            res.send('Login in')
        }else{
            res.send('Not Allowed')
        }
    }catch{
            res.status(500).send()
        }
})
app.listen(3000)