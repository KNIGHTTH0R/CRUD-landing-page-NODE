const router = require('express').Router();
const Profile = require('../models/profile'),
    Services = require('../models/services'),
    Benefit = require('../models/benefit'),
    Contact = require('../models/contact'),
    ContactData = require('../models/contact_data');

let servicesData = [],
    benefitsData = [],
    contactMessages = [];

router.get('/', (request, response) => {
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



module.exports = router;