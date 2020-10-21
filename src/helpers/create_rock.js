import ColorLuminance from "./color_luminance"

const createRock = (size, spreadX, maxWidth, maxHeight, maxDepth, scene, asteroidTexture) => {
    const geometry = new THREE.DodecahedronGeometry(size, 1);
    geometry.vertices.forEach(function (v) {
      v.x += (0 - Math.random() * (size / 4));
      v.y += (0 - Math.random() * (size / 4));
      v.z += (0 - Math.random() * (size / 4));
    })
    let color = '#111111';
    color = ColorLuminance(color, 2 + Math.random() * 10);
    // console.log(color);
    const texture = new THREE.MeshStandardMaterial({
      map: asteroidTexture,
      // flatShading: THREE.FlatShading,
      // shininess: 0.5,
      roughness: 0.8,
      metalness: 1
    });
  
    const cube = new THREE.Mesh(geometry, texture);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.scale.set(1 + Math.random() * 0.4, 1 + Math.random() * 0.8, 1 + Math.random() * 0.4);
    cube.rotation.y = Math.PI/4;
    cube.rotation.x = Math.PI/4;
    var x = spreadX / 2 - Math.random() * spreadX;
    var centeredness = 1 - (Math.abs(x) / (maxWidth / 2));
    var y = (maxHeight / 2 - Math.random() * maxHeight) * centeredness
    var z = (maxDepth / 2 - Math.random() * maxDepth) * centeredness
    cube.position.set(x, y, z)
    cube.r = {};
    cube.r.x = Math.random() * 0.005;
    cube.r.y = Math.random() * 0.005;
    cube.r.z = Math.random() * 0.005;
    scene.add(cube);
    return cube;
  }

  export default createRock;