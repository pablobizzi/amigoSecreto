const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/amigoSecreto', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get User
router.get('/users/:id', function (req, res, next) {
    connection((db) => {
        db.collection('users')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((user) => {
                response.data = user[0];
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// Add Users
router.post('/users', function (req, res, next) {
    connection((db) => {
        db.collection('users')
            .insert(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
    });
});

// Edit User
router.put('/users/:id', function (req, res, next) {
    connection((db) => {
        db.collection('users')
            .update(
            { "_id": ObjectID(req.params.id) },
            req.body,
            function (err, post) {
                if (err) return next(err);
                if(req.body.secretSanta){
                    sendMail(req.body.email, req.body.secretSanta);
                }
                res.json(post);
            });
    });
});

//Remove User
router.delete('/users/:id', function (req, res, next) {
    connection((db) => {
        db.collection('users')
            .remove({ "_id": ObjectID(req.params.id) },
            function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
    });
});

function sendMail(mailTo, secretSanta) {
    const msg = {
        to: mailTo,
        from: 'pablo.bizzi@gmail.com',
        subject: 'Your secret santa is...',
        // text: 'and easy to do anywhere, even with Node.js',
        html: "<strong>Your secret santa is: " + secretSanta + "</strong>",
    };
    sgMail.send(msg);
}

module.exports = router;