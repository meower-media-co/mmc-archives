function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
  //Make sure to put the function as "async function"
}

function playaudio() {
  var audio = new Audio('Audio/hover.wav');
  audio.play();
}

function playaudio2() {
  var audio2 = new Audio('Audio/start.wav');
  audio2.play();
}

async function changecssformeoweranim() {
  document.getElementById('meower').style.animation = 'shrinkgrowfade 1s';
  playaudio2();
  await delay(550);
  location.replace('https://app.meower.org/');
}

async function changecssformeoweranim2() {
  document.getElementById('wiki').style.animation = 'shrinkgrowfade 1s';
  playaudio2();
  await delay(550);
  location.replace('https://wiki.meower.org/');
}

async function changecssformeoweranim4() {
  document.getElementById('openly').style.animation = 'shrinkgrowfade 1s';
  playaudio2();
  await delay(550);
  location.replace('https://openly.meower.org/');
}
