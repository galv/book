// Generated by CoffeeScript 1.7.1
(function() {
  var cube, cube2, geometry, light1, light2, lightVisualizer, material, paused, render, renderer;

  paused = false;

  window.scope = {
    x: 0,
    y: 0,
    color: 0x0000ff,
    light1position: new THREE.Vector3(1, 1, 1),
    pause: function() {
      return paused = !paused;
    },
    rate: 1
  };

  window.scene = new THREE.Scene();

  window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMapEnabled = true;

  document.body.appendChild(renderer.domElement);

  material = new THREE.MeshPhongMaterial({
    color: scope.color
  });

  material = new THREE.MeshPhongMaterial({
    color: scope.color
  });

  collisionMesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial(0x555555));
  collisionMesh.position = scope.light1position;
  scene.add(collisionMesh);
  collidableMeshList = [collisionMesh];

  camera.position.fromArray([0, 3, 10]);

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  light1 = new THREE.DirectionalLight(0xffffff, 3.5, 10);

  light1.castShadow = true;

  light1.position = scope.light1position;

  scene.add(light1);

  light2 = new THREE.DirectionalLight(0xffffff, 0.5);

  light2.position.set(0, -1, 0);
  //var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
  //cube = new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2), wireMaterial);
  //cubes = [new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2)];
  scene.add(light2);
  console.log("Scene finished");
  render = function() {
    if (!paused) {
      window.scope.x += scope.rate * 0.004;
      window.scope.y += scope.rate * 0.002;
    }
    material.color.setHex(scope.color);
    renderer.render(scene, camera);
    return requestAnimationFrame(render);
  };
  
  render();

}).call(this);
