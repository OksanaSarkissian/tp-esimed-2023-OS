console.log('Hello there');

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
let users = [{
    id: 0,
    firstname: "testModif",
    lastname: "testModification",
    password: "testPassword"
}]
let incremente = 1

app.post('/users', function (req, res, next) {
    const newUser = req.body
    newUser.id = incremente++
    users.push(newUser)
    console.log(newUser)
    res.send(newUser)
    res.sendStatus(201)
})

app.get('/users', function (req, res, next) {
    res.send(users)
    console.log()
})

app.get('/users/:firstname', function (req, res, next) {
    console.log('Firstname:', req.params.firstname);
    res.send(users.filter(user => { return req.params.firstname === user.firstname }))
    // res.send(req.params.firstname);
    res.sendStatus(200)
    next();
}, function (req, res, next) {
    res.send('User Info');
});

app.put('/users/:id', (req, res) => {

    if (req.params.id) {

        let user = users.filter(user => { return user.id == req.params.id })

        if (req.body.firstname) {

            user[0].firstname = req.body.firstname

        }
        if (req.body.lastname) {

            user[0].lastname = req.body.lastname

        }
        if (req.body.password) {

            user[0].password = req.body.password

        }

        res.status(300).send(users)

    } else {

        res.status(500).send("Aucun paramètre")

    }

})

app.delete('/users/:id', (req, res) => {
    if (req.params.id) {
        let indexToDelete = users.findIndex((user) => { return user.id == req.params.id })

        users.splice(indexToDelete, 1)

        res.status(300).send(users)
    } else {
        res.status(500).send("Aucun paramètre")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})