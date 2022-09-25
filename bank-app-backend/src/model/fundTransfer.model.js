const mongoose = require("mongoose");

const FundTransferSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nic: { type: String, required: true },
    phone: { type: String, required: true },
    bank: { type: String, required: true },
    accNo: { type: String, required: true },
    amount: { type: String, required: true },
    remarks: { type: String, required: false }
});

const FundTransfer = mongoose.model('fundTransfer', FundTransferSchema);
module.exports = FundTransfer;