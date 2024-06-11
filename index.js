
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8080

const { users } = require('./state')

app.use(express.json())
/* BEGIN - create routes here */
app.use((req, res, next) => {
  next()
});

app.get("/users", (req, res) => {
    res.json(users)
  });
  
app.get("/users/:userId", (req, res) => {
  console.log("this is the current param",req.params.userId)
  const foundUser = users.find((user)=>{
    return user._id == req.params.userId
  })
  res.json(foundUser)
});

app.post("/users", (req, res) => {
  // const newUser = {
    //   "_id": 6,
  //   "name": "John Todd",
  //   "occupation": "Cook",
  //   "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  // }
  const counter = users.length + 1
  console.log('current counter: ', counter)
  console.log(req.body);
  const newUser = {
    ...req.body,
    _id: counter
  }
  users.push(newUser)
  res.json(users[users.length - 1])
});

// app.post("/users", (req, res) => {
//   req.body =  {
//     "_id": 6,
//     "name": req.body.name,
//     "occupation": "Cook",
//     "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
//   }
//   users.push(newUser)
//   console.log(req.body);
//   res.json(users[users.length - 1])
// });

app.put("/users/:userId", (req, res) => {
  // users[0].occupation = "Teacher"
  const foundIndex = users.findIndex ((user) => {
   return user._id == req.params.userId  
  })
  users[foundIndex] = {
    ...users[foundIndex],
    ...req.body
  }
  res.json(users)
}); 

app.delete("/users/:userId", (req, res) => {
  // users.shift()
  const foundIndex = users.findIndex ((user) => {
    return user._id == req.params.userId  
   })
   users[foundIndex] = {
     ...users[foundIndex],
     isActive: false
   }
 
  res.send({message: "deleted"})
});


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))