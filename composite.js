const jimp = require('jimp'),
      fs = require('fs'),
      year = process.env.npm_config_year;

let dirContents = fs.readdirSync(`assets/awards/${year}`),
    jimps = [];

for(let i = 0; i < dirContents.length; i++) {
  console.log(`assets/awards/${year}/${dirContents[i]}`);
  if(dirContents[i] !== '.DS_Store') jimps.push(jimp.read(`assets/awards/${year}/${dirContents[i]}`));
}

Promise.all(jimps).then(data => {
  return Promise.all(jimps);
}).then(data => {

  // Shuffle

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  const background = new jimp(540, 320, 0x0, (err, image) => {
    
    image.composite(data[0].resize(quickAdjust(), jimp.AUTO), quickAdjust(0), quickAdjust(0));
    image.composite(data[1].resize(quickAdjust(), jimp.AUTO), quickAdjust(225), quickAdjust(0));
    if(data.length === 3) {
      image.composite(data[2].resize(quickAdjust(), jimp.AUTO), quickAdjust(135), quickAdjust(75));
    } else {
      image.composite(data[2].resize(quickAdjust(), jimp.AUTO), quickAdjust(0), quickAdjust(150));
      image.composite(data[3].resize(quickAdjust(), jimp.AUTO), quickAdjust(225), quickAdjust(150));
      if(data.length === 5) {
        image.composite(data[4].resize(quickAdjust(), jimp.AUTO), quickAdjust(135), quickAdjust(75));
      }
    }

    image.write(`assets/thumbs/awards/${year}.png`, () => {
      console.log('success');
    });
  });
});

function quickAdjust(base = 240, variance = 50) {
  return (Math.random() * variance) + base;
};