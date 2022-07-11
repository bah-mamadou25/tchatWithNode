const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

/* using session to delete the red error message if you reload the page 
 * if before that user try to send empty  message
 */
const session = require('express-session')
app.use(session({
    secret: 'ffgeez',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
let Message = require('./models/Message');
app.get('/', (req, res) => {
    if (req.session.result) {
        res.locals.result = req.session.result;
        req.session.result = undefined;
    }
    Message.all(function(message) {
        res.render('pages/index', { messages: message })
    });
})

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/', (req, res, next) => {
    let message = req.body.message
    if (message === "undefined" || message == '') {
        req.session.result = "saisir au moins un caractère";
    } else {
        Message.create(req.body.message);
    }
    res.redirect('/')
})

app.listen(3000);