import createRock from "./create_rock";

const createAsteroids = (scene, asteroidTexture) => {
    var maxWidth = 1000;
    var maxHeight = 200;
    var maxDepth = 200;
    var asteroids = [];
    for (var i = 0; i < 7; i++) {
      asteroids.push(createRock(5 + Math.random() * 50, 200, maxWidth, 300, 400, scene, asteroidTexture));
    }
    for (var i = 0; i < 30; i++) {
      asteroids.push(createRock(5 + Math.random() * 10, 500, maxWidth, 200, 600, scene, asteroidTexture));
    }
    for (var i = 0; i < 160; i++) {
      asteroids.push(createRock(2 + Math.random() * 5, 1000, maxWidth, 150, 800, scene, asteroidTexture));
    }
    return asteroids;
  }

  export default createAsteroids;