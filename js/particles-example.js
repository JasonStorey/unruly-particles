(function(global, THREE) {
	var document = global.document,
		materials = [],
		container,
		camera,
		scene,
		renderer,
		particles,
		geometry,
		parameters,
		i,
		h,
		color;

	var mouseX = 0,
		mouseY = 0;

	var windowHalfX = global.innerWidth / 2,
		windowHalfY = global.innerHeight / 2;

	init();
	animate();

	function init() {
		container = document.createElement( 'div' );
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 75, global.innerWidth / global.innerHeight, 1, 3000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

		geometry = new THREE.Geometry();

		for ( i = 0; i < 20000; i ++ ) {
			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2000 - 1000;
			vertex.y = Math.random() * 2000 - 1000;
			vertex.z = Math.random() * 2000 - 1000;

			geometry.vertices.push( vertex );
		}

		parameters = [
			[ [1, 1, 0.5], 5 ],
			[ [0.95, 1, 0.5], 4 ],
			[ [0.90, 1, 0.5], 3 ],
			[ [0.85, 1, 0.5], 2 ],
			[ [0.80, 1, 0.5], 1 ]
		];

		for ( i = 0; i < parameters.length; i ++ ) {
			color = parameters[i][0];
			size  = parameters[i][1];

			materials[i] = new THREE.PointCloudMaterial( { size: size } );

			particles = new THREE.PointCloud( geometry, materials[i] );

			particles.rotation.x = Math.random() * 6;
			particles.rotation.y = Math.random() * 6;
			particles.rotation.z = Math.random() * 6;

			scene.add( particles );
		}

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( global.innerWidth, global.innerHeight );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		global.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
		windowHalfX = global.innerWidth / 2;
		windowHalfY = global.innerHeight / 2;

		camera.aspect = global.innerWidth / global.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( global.innerWidth, global.innerHeight );
	}

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart( event ) {
		if ( event.touches.length === 1 ) {
			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove( event ) {
		if ( event.touches.length === 1 ) {
			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		var time = Date.now() * 0.00005;

		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

		camera.lookAt( scene.position );

		for ( i = 0; i < scene.children.length; i ++ ) {
			var object = scene.children[ i ];

			if ( object instanceof THREE.PointCloud ) {
				object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
			}
		}

		for ( i = 0; i < materials.length; i ++ ) {
			color = parameters[i][0];

			h = ( 360 * ( color[0] + time ) % 360 ) / 360;
			materials[i].color.setHSL( h, color[1], color[2] );
		}

		renderer.render( scene, camera );
	}
}(window, THREE))