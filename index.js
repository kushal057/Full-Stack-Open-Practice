require('dotenv').config()
const Note = require('./models/note')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    Note.find({}).then(notes =>
        response.json(notes)
    )
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note);
    })
})

app.delete("/api/notes/:id", (request, response) => {
    Note.findByIdAndDelete(request.params.id).then(
        console.log("Successfully deleted!")
    )
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(body.content === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.json(savedNote);
    })
    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})