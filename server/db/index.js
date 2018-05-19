const conn = require('./conn');
const Dancer = require('./Dancer');
const ImageURL = require('./ImageURL');

ImageURL.belongsTo(Dancer);
Dancer.hasMany(ImageURL);

const syncAndSeed = ()=>{
  return conn.sync({force: true})
  .then(()=> {
    return Promise.all([
      Dancer.create({name: 'RoboCop'}),
      ImageURL.create({name: '/images/roboCop1.jpg'}),
      ImageURL.create({name: '/images/roboCop2.jpg'}),
      ImageURL.create({name: '/images/roboCop3.jpg'}),
      ImageURL.create({name: '/images/roboCop4.jpg'}),
      ImageURL.create({name: '/images/roboCop5.jpg'}),
      ImageURL.create({name: '/images/roboCop6.jpg'}),
    ])
    .then(([dancer, img1, img2, img3, img4, img5, img6])=>{
     return Promise.all([
       img1.setDancer(dancer),
       img2.setDancer(dancer),
       img3.setDancer(dancer),
       img4.setDancer(dancer),
       img5.setDancer(dancer),
       img6.setDancer(dancer),
     ]);
    });
  })
  .then(()=>{
    return Promise.all([
      Dancer.create({name: 'Danger'}),
      ImageURL.create({name: '/images/danger1.jpg'}),
      ImageURL.create({name: '/images/danger2.jpg'}),
      ImageURL.create({name: '/images/danger3.jpg'}),
      ImageURL.create({name: '/images/danger4.jpg'}),
      ImageURL.create({name: '/images/danger5.jpg'}),
      ImageURL.create({name: '/images/danger6.jpg'}),
    ])
    .then(([dancer, img1, img2, img3, img4, img5, img6])=>{
      return Promise.all([
        img1.setDancer(dancer),
        img2.setDancer(dancer),
        img3.setDancer(dancer),
        img4.setDancer(dancer),
        img5.setDancer(dancer),
        img6.setDancer(dancer),
      ]);
    });
  })
  .catch(err => {
    throw err;
  });
};

module.exports = {
  syncAndSeed,
  models: {
    Dancer,
    ImageURL
  }
};
