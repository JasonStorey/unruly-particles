(function(global, THREE) {
	var document = global.document;

	var scene = new THREE.Scene(),
		camera = new THREE.PerspectiveCamera(75, global.innerWidth / global.innerHeight, 0.1, 1000),
		renderer = new THREE.WebGLRenderer(),
		windowHalfX = global.innerWidth / 2,
		windowHalfY = global.innerHeight / 2,
		mouseY = 1000,
		mouseX = 0;

	renderer.setSize(global.innerWidth, global.innerHeight);
	renderer.setClearColorHex( 0xFFFFFF, 1 );
	// scene.fog = new THREE.FogExp2( 0xffffff, 0.001 );
	scene.fog = new THREE.Fog( 0xffffff );
	camera.position.z = 1000;
	
	document.body.appendChild(renderer.domElement);
	// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function initParticles() {
		var geometry = new THREE.Geometry();

		for (var i = 0; i < 5000; i++) {
			geometry.vertices.push(
				new THREE.Vector3((Math.random() * 2000) - 1000, (Math.random() * 2000) - 1000, (Math.random() * 2000) - 1000)
			);

		};
		
		// geometry.faces.push(new THREE.Face3(0, 1, 2));

		var geometryLines = geometry.clone();

		var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x0bbbef
		});

		var pointCloudMaterial = new THREE.PointCloudMaterial({
			color: 0x0bbbef,
			size: 5.0
		});

		// var net = new THREE.SceneUtils.createMultiMaterialObject(geometry, [lineMaterial, pointCloudMaterial]);
		var lines = new THREE.Line(geometryLines, lineMaterial);
		var points = new THREE.PointCloud(geometry, pointCloudMaterial);
		scene.add( lines );
		scene.add( points );
		camera.position.z = 50;
	}
	
	function animate() {
		var time = Date.now() * 0.0001;
		// for ( i = 0; i < scene.children.length; i ++ ) {
		// 	var object = scene.children[ i ];
		// 	if ( object instanceof THREE.PointCloud || object instanceof THREE.Line) {
		// 		object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
		// 	}
		// }
		
		mouseX = Math.sin(time) * 1000;
		
		mouseY = Math.sin(time) * 700;
		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt( scene.position );

		renderer.render( scene, camera );
		global.requestAnimationFrame(animate);
	}
	
	initParticles();
	animate();

}(window, THREE))