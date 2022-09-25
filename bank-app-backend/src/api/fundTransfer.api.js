const express = require('express');
const router = express.Router();
const FundTransferController = require('../controller/fundTransfer.controller');

module.exports = function () {
    router.get('/', FundTransferController.getAllFundTransfers);
    router.get('/:id', FundTransferController.getFundTransferById);
    router.post('/create', FundTransferController.createFundTransfer);;
    return router;
}
