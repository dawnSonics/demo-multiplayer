var peer, conn, sessionId, myPeerId
var recMouseX = 0, recMouseY = 0

var connected = false

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0)

	let url = new URL(window.location.href);
	let sessionId = url.searchParams.get("sessionId");

	peer = new Peer();
	peer.on('open', function (id) {
		myPeerId = id

		let div = createDiv('')
		div.style('color', '#ffffff');
		div.position(20, 20)
		if (sessionId) {
			conn = peer.connect(sessionId)
			conn.on('data', receiveData);
			div.html('Connected to session ' + sessionId)
		} else {
			// div.html('Invite link: <input type=text style="width: 300px;" value="https://dawnsonics.github.io/demo-multiplayer/?sessionId=' + id + '">')
			div.html('Invite link: <input type=text style="width: 300px;" value="localhost:5500/demo-multiplayer/?sessionId=' + id + '">')
		}
	});

	peer.on('connection', function (dataConnection) {
		conn = dataConnection
		conn.on('data', receiveData);
	});

}

function draw() {
	background(0)
	noStroke()
	fill(255)

	ellipse(mouseX, mouseY, 20, 20)

	if (conn) {
		sendData(conn)
		ellipse(recMouseX, recMouseY, 20, 20)
	}

}

function sendData(dataConnection) {
	data = { x: mouseX, y: mouseY }
	console.log('Sending data: ' + data)
	dataConnection.send(data)
}

function receiveData(data) {
	console.log('Data received: ' + data)
	recMouseX = data.x
	recMouseY = data.y
}