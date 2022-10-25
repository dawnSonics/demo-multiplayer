var peer, conn, origPeerId, destPeerId
var recMouseX = 0, recMouseY = 0

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0)

	peer = new Peer();
	peer.on('open', function (id) {
		origPeerId = id
		console.log('My peer ID is: ' + id);

		destPeerId = prompt("Your peer ID is:\n" + id + "\n\nEnter collaborator's peer ID:")

		conn = peer.connect(destPeerId)
		conn.on('data', function (data) {
			console.log('Data received: ' + data)
			recMouseX = data.x
			recMouseY = data.y
		});
	});

	peer.on('connection', function (dataConnection) {
		console.log("Connected")
	});

}

function draw() {
	if (conn) {
		conn.send({ x: mouseX, y: mouseY })
		console.log(conn.open)
	}


	background(0)
	noStroke()
	fill(255)

	ellipse(mouseX, mouseY, 20, 20)
	ellipse(recMouseX, recMouseY, 20, 20)
}
