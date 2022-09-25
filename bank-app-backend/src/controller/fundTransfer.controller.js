const FundTransfer = require("../model/fundTransfer.model");

//Add New FundTransfer
const createFundTransfer = async (req, res) => {
    if (req.body) {

        const fundTransfer = new FundTransfer(req.body);

        await fundTransfer.save()
            .then(data => res.status(200).send({ data: data }))
            .catch(err => res.status(500).send(err));

    }
}

//get All FundTransfers
const getAllFundTransfers = async (req, res) => {
    await FundTransfer.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}

//getFundTransferById
const getFundTransferById = async (req, res) => {
    await FundTransfer.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
};

module.exports = {
    createFundTransfer,
    getAllFundTransfers,
    getFundTransferById
}