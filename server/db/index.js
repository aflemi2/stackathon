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
      ImageURL.create({name: '/images/RoboCop1.jpg'}),
      ImageURL.create({name: '/images/RoboCop2.jpg'}),
      ImageURL.create({name: '/images/RoboCop3.jpg'}),
      ImageURL.create({name: '/images/RoboCop4.jpg'}),
      ImageURL.create({name: '/images/RoboCop5.jpg'}),
      ])
    .then(([dancer, img1, img2, img3, img4, img5])=>{
     return Promise.all([
       img1.setDancer(dancer),
       img2.setDancer(dancer),
       img3.setDancer(dancer),
       img4.setDancer(dancer),
       img5.setDancer(dancer),
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
