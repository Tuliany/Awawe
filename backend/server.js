import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/awave"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)


const User = mongoose.model('User', {
  name: {
    type: String,
    unique:true
  },
  password:{
    type: String,
    required: true
  },
  accessToken:{
    type: String,
    defaulr: () => crypto.randomBytes(128).toString('hex')
  }
})

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080
const app = express()



//Middleware
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({
    accessToken: req.header('Authorization')
  })
  if (user) {
    req.user = user;
    next()
  } else {
    res.status(401).json({
      loggedOut: true
    })
  }
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())



// Home
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Users
app.get('/users', (req, res)=> {
  res.json([
    {name: 'Alice'},
    {name:'Bob' },
    {name: 'Chris'}
  ])
})


// Profile
app.get('/profile', authenticateUser)
app.get ('/profile', (req,res) => {
  res.send('Hello User')
})

app.post('/profile', async (req,res)=> {
  const user = await User.findOne({name: req.body.name})
  if(user && bcrypt.compareSync(req.body.password, user.password)){
   res.status(201).json({ userId: user._id, accessToken: user.accessToken})
  } else {
   res.status(404).json({ notFound: true })

  }

})

//Registration (creates the user)
app.post('/signup', async (req,res)=>{
  try{
    const {name, password} = req.body
    const user = await new User({name, password: bcrypt.hashSync(password)}).save()
    // await user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (err){
    res.status(400).json({message: 'could not create user', errors: err.errors})
  }
})


app.post('/login', async (req, res) => {
   
try {
  const { name, password } = req.body
  const user = await User.findOne({ name })
  	  console.log(password, user.password);
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(201).json({ userId: user._id, accessToken: user.accessToken})
  } else {
    res.status(404).json({ notFound: true })
  }
	} catch (err) {
	  console.log(err);
    res.status(404).json({ error: err })	
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

