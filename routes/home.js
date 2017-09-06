const router = require('express').Router();
const Profile = require('../models/profile'),
    Services = require('../models/services'),
    Benefit = require('../models/benefit'),
<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
    Contact = require('../models/contact'),
    ContactData = require('../models/contact_data');
=======
    Contact = require('../models/contact');
>>>>>>> First commit

let servicesData = [],
    benefitsData = [],
    contactMessages = [];

router.get('/', (request, response) => {
<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
=======

>>>>>>> First commit
    let profileData = {};

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

            }).then(benefits => {
<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
                ContactData.findById('59aeee169b9dcf1ac06b4e3f', (error, contactData) => {
                    if (error) throw new Error(error);
                    response.render('index', {
                        title: profileData.title,
                        url: profileData.imageURL,
                        description: profileData.description,
                        services: servicesData,
                        benefits: benefitsData,
                        contactData: contactData,
                    });
                })

            })
        })

    });
});

=======
                response.render('index', {
                    title: profileData.title,
                    url: profileData.imageURL,
                    description: profileData.description,
                    services: servicesData,
                    benefits: benefitsData,
                });
            })
        })

    });
});


router.get('/options', (request, response) => {
    let profileData = {},
        messageLength = 0;;


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
                    contactMessages = messages;
                    response.render('options', {
                        valueTitle: profileData.title,
                        valueUrl: profileData.imageURL,
                        valueDescription: profileData.description,
                        services: servicesData,
                        benefits: benefitsData,
                        messagesLength: messageLength
                    });
                });
            })
        })
    })
})


router.post('/options', (request, response) => {
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

router.get('/contact/messages', (request, response) => {
    Contact.find({}, (error, messages) => {
        if (error) throw new Error(error);
    }).then(messages => {
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


router.post('/contact/remove/:index', (request, response) => {
    Contact.findOneAndRemove({ email: contactMessages[request.params.index].email },
        (error, doc) => {
            if (error) throw new Error(error);
            console.log(`EMAIL MESSAGE DELETED WITH SUCCESS: ${JSON.stringify(doc, undefined, 2)}`)
            response.redirect('/contact/messages');
        })
})

>>>>>>> First commit


module.exports = router;