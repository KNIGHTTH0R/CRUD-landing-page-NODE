const router = require('express').Router(),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

const Profile = require('../models/profile'),
    Services = require('../models/services'),
    Benefit = require('../models/benefit'),
    Contact = require('../models/contact'),
    User = require('../models/user'),
    ContactData = require('../models/contact_data');

let servicesData = [],
    benefitsData = [];


function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
router.get('/login', (request, response) => {
    if (request.user) {
        response.redirect('/options')
    } else {
        response.render('login');
    }
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/options',
        failureRedirect: '/login',
        failureFlash: false
    })
);
router.get('/options', loggedIn, (request, response) => {
    let profileData = {},
        messageLength = 0,
        newMessages = 0;

    Profile.findById("59abc4c29f6c941060343599", (error, profile) => {
        if (error) throw new Error(error);
    }).then(profile => {
        profileData = profile;

    }).then(data => {

        Services.find({}, (error, services) => {
            if (error) throw new Error(error)
        }).then(services => {

            servicesData = services;

        }).then((final) => {
            Benefit.find({}, (error, benefits) => {
                if (error) throw new Error(error);
            }).then(benefits => {
                benefitsData = benefits;

            }).then((final) => {
                Contact.find({}, (error, messages) => {
                    if (error) throw new Error(error);
                }).then(messages => {
                    messageLength = messages.length;
                    for (let i = 0; i < messageLength; i++) {
                        if (messages[i].unreaded) {
                            newMessages++;
                        }
                    }
                }).then((data) => {
                    ContactData.findById('59aeee169b9dcf1ac06b4e3f', (error, contactData) => {
                        if (error) throw new Error(error);
                    }).then((contactData) => {
                        response.render('options', {
                            valueTitle: profileData.title,
                            valueUrl: profileData.imageURL,
                            valueDescription: profileData.description,
                            services: servicesData,
                            benefits: benefitsData,
                            newMessages: newMessages,
                            contactData: contactData,
                        });
                    })
                });
            })
        })
    })
})

router.post('/options/edit/profile', (request, response) => {
    let dataUpdateProfile = {};
    if (request.body.title) dataUpdateProfile.title = request.body.title.toUpperCase();
    if (request.body.imageUrl) dataUpdateProfile.imageURL = request.body.imageUrl;
    if (request.body.description) dataUpdateProfile.description = request.body.description;

    Profile.findByIdAndUpdate("59abc4c29f6c941060343599", {
        $set: dataUpdateProfile
    }, { new: true }, (error, doc) => {
        if (error) throw new Error(error);
        console.log(`DOCUMENT UPDATED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
        response.redirect('/options');
    })
})

router.post('/options/:index', (request, response) => {
    let serviceDataUpdate = {};

    if (request.body.serviceTitle) serviceDataUpdate.nameService = request.body.serviceTitle;
    if (request.body.serviceDescription) serviceDataUpdate.description = request.body.serviceDescription;

    Services.findOneAndUpdate({ nameService: servicesData[request.params.index].nameService }, {
        $set: serviceDataUpdate
    }, { new: true }, (error, doc) => {
        if (error) throw new Error(error);
        console.log(`DOCUMENT UPDATED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
        response.redirect('/options');
    })
})


router.post('/options/delete/:index', (request, response) => {

    Services.findOneAndRemove({ nameService: servicesData[request.params.index].nameService },
        (error, doc) => {
            if (error) throw new Error(error);
            console.log(`DOCUMENT DELETED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
            response.redirect('/options');
        })
})

router.post('/options/add/new', (request, response) => {
    let service = new Services();

    service.save((error, service) => {
        if (error) throw new Error(error);
        console.log(`NEW SERVICE ADDED: ${JSON.stringify(service, undefined, 2)}`)
        response.redirect('/options');
    })
})

router.post('/options/addbenefit/new', (request, response) => {
    let benefit = new Benefit();

    benefit.save((error, benefit) => {
        if (error) throw new Error(error);
        console.log(`NEW BENEFIT ADDED: ${JSON.stringify(benefit, undefined, 2)}`)
        response.redirect('/options');
    })
})


router.post('/options/benefit/:index', (request, response) => {
    let benefitDataUpdate = {};

    if (request.body.benefitTitle) benefitDataUpdate.title = request.body.benefitTitle;
    if (request.body.benefitURL) benefitDataUpdate.imageURL = request.body.benefitURL;

    Benefit.findOneAndUpdate({ title: benefitsData[request.params.index].title }, {
        $set: benefitDataUpdate
    }, { new: true }, (error, doc) => {
        if (error) throw new Error(error);
        console.log(`DOCUMENT UPDATED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
        response.redirect('/options');
    })
})

router.post('/options/remove/:index', (request, response) => {
    Benefit.findOneAndRemove({ title: benefitsData[request.params.index].title },
        (error, doc) => {
            if (error) throw new Error(error);
            console.log(`DOCUMENT DELETED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
            response.redirect('/options');
        })
})

router.post('/options/contact_info/update', (request, response) => {
    let contactDataUpdate = {};

    if (request.body.contact_email) contactDataUpdate.email = request.body.contact_email;
    if (request.body.contact_phone) contactDataUpdate.phone = request.body.contact_phone;

    ContactData.findByIdAndUpdate("59aeee169b9dcf1ac06b4e3f", {
        $set: contactDataUpdate
    }, { new: true }, (error, doc) => {
        if (error) throw new Error(error);
        console.log(`DOCUMENT UPDATED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
        response.redirect('/options');
    })
})

module.exports = router;