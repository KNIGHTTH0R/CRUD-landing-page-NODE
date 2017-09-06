const router = require('express').Router(),
    Contact = require('../models/contact');

let contactMessages = [];

router.get('/contact/messages', (request, response) => {
    Contact.find({}, (error, messages) => {
        if (error) throw new Error(error);
    }).then(messages => {
        contactMessages = messages;
        response.render('messages', { contactMessages: messages });
    });
});

router.get('/contact', (request, response) => {
    response.render('contact');
})


router.post('/contact', (request, response) => {
    let contactMessage = new Contact();
    contactMessage.email = request.body.emailFromUser;
    contactMessage.message = request.body.emailMessage;

    contactMessage.save((error, contact) => {
        if (error) throw new Error(error);
        console.log(`CONTACT MESSAGE RECEIVED: ${JSON.stringify(contact, undefined, 2)}`)
        response.redirect('/contact')
    })
})


router.post('/contact/readed/:index', (request, response) => {
    Contact.findOneAndUpdate({ email: contactMessages[request.params.index].email }, {
            $set: { unreaded: false, classReaded: "readed" }
        }, { new: true },
        (error, doc) => {
            if (error) throw new Error(error);
            console.log(`EMAIL NOW IS READED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
            response.redirect('/contact/messages');
        })
})

router.post('/contact/remove/:index', (request, response) => {
    Contact.findOneAndRemove({ email: contactMessages[request.params.index].email },
        (error, doc) => {
            if (error) throw new Error(error);
            console.log(`EMAIL MESSAGE DELETED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
            response.redirect('/contact/messages');
        })
})

module.exports = router;