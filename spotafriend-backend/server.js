const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()


var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)


const db = require('./models')
const Role = db.role;

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db')
//     initial();
// })


function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: 'moderator'
    });

    Role.create({
        id: 3,
        name: 'admin'
    })
}

app.get('/', (req, res) => {
    res.json({message: "Welcome to my application"});
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})