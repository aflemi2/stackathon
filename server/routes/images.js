const router = require('express').Router();
const db = require('../db');
const { ImageURL } = db.models;

router.get('/', (req, res, next) => {
  ImageURL.findAll()
    .then( images => res.send(images))
    .catch(next);
});

router.post('/', (req, res, next) => {
  ImageURL.create(req.body)
    .then( image => res.send(image))
    .catch(next);
});

router.delete('/:id',(req, res, next) => {
  ImageURL.findById(req.params.id)
    .then( image => {
      image.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  ImageURL.findById(req.params.id)
    .then( image => {
      Object.assign(image, req.body);
      return image.save();
    })
    .then( image => res.send(image))
    .catch(next);
});

module.exports = router;
