Business = require('../models/Business');

exports.index = function (req, res) {
    Business.get(function (err, business) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Business retrieved successfully",
            data: business
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var business = new Business();
    business.name= req.body.name;
        business.type=req.body.type;
        business.location=req.body.location;
        business.phone=req.body.phone;
        business.timings=req.body.timings;
        business.delivery=req.body.delivery;
    
// save the contact and check for errors
    business.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New business created!',
            data: business
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Business.findById(req.params.contact_id, function (err, business) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: business
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Business.findById(req.params.contact_id, function (err, business) {
        if (err)
            res.send(err);
business.name = req.body.name ? req.body.name : business.name;
        business.type=req.body.type;
        business.location=req.body.location;
        business.phone=req.body.phone;
        business.timings=req.body.timings;
        business.delivery=req.body.delivery;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: business
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Business.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Business deleted'
        });
    });
};