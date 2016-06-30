/*
 * Serve content over a socket
 */

module.exports = function (io) {
	var name = 'Bot #'+Math.floor((Math.random() * 100) + 1);

	io.emit('init', {
	    name: name
	});

	// io.emit('message', {
	// 	user: 'blabla',
	// 	message: 'some message'
	// });

	io.on('send:message', function (message) {
		console.log(message, name);
		io.broadcast.emit('send:message', {
			user: {
			    name: name
			},
			body: message
	    });
	});
};
