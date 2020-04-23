// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';
const Constants = require('../shared/constants');

const keycodes = {
  LEFT: 37,
  A: 65,
  RIGHT: 39,
  D: 68,
  DOWN: 40,
  S: 83,
  UP: 38,
  W: 87,
}

var direction = [0,0];
var keysDown = {
  LEFT: false,
  RIGHT: false,
  UP: false,
  DOWN: false,
};

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function onKeyInput() {
  updateDirection(direction);
  console.log('direction: ' + direction);
}

function keylogic() {
  if(keysDown.LEFT || keysDown.RIGHT) {
    if (keysDown.LEFT && keysDown.RIGHT) { 
      direction[0] = Constants.DIRECTIONS.NEUTRAL;
    }else if(keysDown.RIGHT) {
      direction[0] = Constants.DIRECTIONS.RIGHT;
    } else if(keysDown.LEFT) {
      direction[0] = Constants.DIRECTIONS.LEFT;
    }
  } else if (!keysDown.LEFT && !keysDown.RIGHT) {
    direction[0] = Constants.DIRECTIONS.NEUTRAL;
  }

  if(keysDown.UP || keysDown.DOWN) {
    if (keysDown.UP && keysDown.DOWN) { 
      direction[1] = Constants.DIRECTIONS.NEUTRAL;
    } else if(keysDown.DOWN) {
      direction[1] = Constants.DIRECTIONS.DOWN;
    } else if(keysDown.UP) {
      direction[1] = Constants.DIRECTIONS.UP;
    }
  } else if (!keysDown.UP && !keysDown.DOWN) {
    direction[1] = Constants.DIRECTIONS.NEUTRAL;
  }

  onKeyInput();
}

function onKeyDown(e) {
  switch (e.keyCode)
  {
    case (keycodes.LEFT): 
      keysDown.LEFT = true;
      break;
    case (keycodes.RIGHT): 
      keysDown.RIGHT = true;
      break;
    case (keycodes.UP): 
      keysDown.UP = true;
      break;
    case (keycodes.DOWN): 
      keysDown.DOWN = true;
      break;
  }
  keylogic();
}

function onKeyUp(e) {
  switch (e.keyCode)
  {
    case (keycodes.LEFT): 
      keysDown.LEFT = false;
      break;
    case (keycodes.RIGHT): 
      keysDown.RIGHT = false;
      break;
    case (keycodes.UP): 
      keysDown.UP = false;
      break;
    case (keycodes.DOWN): 
      keysDown.DOWN = false;
      break;
  }
  keylogic();
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
}