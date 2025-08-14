const Contact = require('../models/contact-models');

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.send(200).json({ message: "message send successfully" });

    } catch (error) {
        return res.send(500).json({ message: "message not delivered" });
    };
};

module.exports ={
    contactForm
};