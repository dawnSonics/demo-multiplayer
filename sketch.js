var peer, origPeerId, destPeerId
var outConn, inConn
var recMouseX = 0, recMouseY = 0

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0)

	peer = new Peer();
	peer.on('open', function (id) {
		origPeerId = id
		console.log('My peer ID is: ' + id);

		destPeerId = prompt("Your peer ID is:\n" + id + "\n\nEnter collaborator's peer ID:")

		console.log("Connection sent")
		outConn = peer.connect(destPeerId)
	});

	peer.on('connection', function (dataConnection) {
		inConn = dataConnection
		console.log("Connection received")

		inConn.on('data', function (data) {
			console.log('Data received: ' + data)
			recMouseX = data.x
			recMouseY = data.y
		});
	});

}

function draw() {
	background(0)
	noStroke()
	fill(255)
	
	ellipse(mouseX, mouseY, 20, 20)

	if (outConn) {
		outConn.send({ x: mouseX, y: mouseY })
		console.log("outConn: " + outConn.open)
	}

	if (inConn) {
		console.log("inConn: " + inConn.open)
		ellipse(recMouseX, recMouseY, 20, 20)
	}

}
