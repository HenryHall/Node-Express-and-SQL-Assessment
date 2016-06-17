var randomNumberGen = function(){
  console.log("In randomNumberGen module");

  return Math.floor(Math.random() * (1 + 100 - 1) + 1);
}

module.exports = randomNumberGen;
