var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promo = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Promo.find({}, function(err, promo) {
    if (err) throw err;
    res.json(promo);
  });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req, res, next){
  Promo.create(req.body, function(err, promo){
    if (err) throw err;
    console.log('Promotion created');
    var id = promo._id;
    res.end('Added the Promotion with id:' + id);
    res.writeHead(200,{'Content-Type':'text/plain'});
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req, res, next){
  Promo.remove({}, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

promoRouter.route('/:promoId')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Promo.findById(req.params.promoId, function(err, promo){
    if (err) throw err;
    res.json(promo);
  });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req, res, next){
  Promo.findByIdAndUpdate(req.params.promoId, {$set:req.body}, {new:true}, function(err, promo){
    if (err) throw err;
    res.json(promo);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req, res, next){
  Promo.remove(req.params.promoId, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

module.exports = promoRouter;
