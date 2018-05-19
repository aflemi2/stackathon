const router = require('express').Router();
const db = require('../db');
const { Dancer } = db.models;

router.get('/', (req, res, next) => {
  Dancer.findAll()
    .then( dancers => res.send(dancers))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Dancer.create(req.body)
    .then( dancer => res.send(dancer))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Dancer.findById(req.params.id)
    .then( dancer => {
      dancer.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Dancer.findById(req.params.id)
    .then( dancer => {
      Object.assign(dancer, req.body);
      return dancer.save();
    })
    .then( dancer => res.send(dancer))
    .catch(next);
});

module.exports = router;
