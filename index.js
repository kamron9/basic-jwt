const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cors = require('cors')

// const PORT = process.env.PORT || 5000
const URL =
	'mongodb+srv://kamron:kamron99@auth.cewe8xi.mongodb.net/?retryWrites=true&w=majority&appName=auth'
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
	res.send('server is running')
})

app.use('/auth', authRouter)
const start = async () => {
	try {
		await mongoose.connect(URL)
		app.listen(5000, () => console.log(`server running ${5000}`))
	} catch (e) {
		console.log(e)
	}
}
start()
