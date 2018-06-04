
AFRAME.registerComponent('one-mouse-click', {

	init: function () {
		this.el.addEventListener('click', function () {
			window.location = 'https://vine-bottom.glitch.me/About.html';
		});
	}
});

AFRAME.registerComponent('two-mouse-click', {

	init: function () {
		this.el.addEventListener('click', function (evt) {
			document.querySelector('#my-image').setAttribute('src', 'https://i.imgur.com/SOhErdr.jpg')

		});
	}
});

AFRAME.registerComponent('three-mouse-click', {

	init: function () {
		this.el.addEventListener('click', function (evt) {
			document.querySelector('#my-image').setAttribute('src', 'https://cdn.glitch.com/4595849b-59cd-45ea-9177-33c09310a27d%2Fkitchen.png?1525377700514')

		});
	}
});

AFRAME.registerComponent('play-on-window-click', {
	init: function () {
		this.onClick = this.onClick.bind(this);
	},
	play: function () {
		window.addEventListener('click', this.onClick);
	},
	pause: function () {
		window.removeEventListener('click', this.onClick);
	},
	onClick: function (evt) {
		var video = this.el.components.material.material.map.image;
		if (!video) { return; }
		video.play();
	}
});

AFRAME.registerComponent('play-on-vrdisplayactivate-or-enter-vr', {
	init: function () {
		this.playVideo = this.playVideo.bind(this);
		this.playVideoNextTick = this.playVideoNextTick.bind(this);
	},
	play: function () {
		window.addEventListener('vrdisplayactivate', this.playVideo);
		this.el.sceneEl.addEventListener('enter-vr', this.playVideoNextTick);
	},
	pause: function () {
		this.el.sceneEl.removeEventListener('enter-vr', this.playVideoNextTick);
		window.removeEventListener('vrdisplayactivate', this.playVideo);
	},
	playVideoNextTick: function () {
		setTimeout(this.playVideo);
	},
	playVideo: function () {
		var video = this.el.components.material.material.map.image;
		if (!video) { return; }
		video.play();
	}
});

AFRAME.registerComponent('toggle-play-on-window-click', {
	init: function () {
		this.onClick = this.onClick.bind(this);
	},
	play: function () {
		window.addEventListener('click', this.onClick);
	},
	pause: function () {
		window.removeEventListener('click', this.onClick);
	},
	onClick: function (evt) {
		var video = this.el.components.material.material.map.image;
		if (!video) { return; }
		video.paused ? video.play() : video.pause();
	}
});

AFRAME.registerComponent('hide-once-playing', {
	schema: { type: 'selector' },
	init: function () {
		this.onPlaying = this.onPlaying.bind(this);
		this.onPause = this.onPause.bind(this);
	},
	play: function () {
		if (this.data) {
			this.data.addEventListener('playing', this.onPlaying);
			this.data.addEventListener('pause', this.onPause);
		}
	},
	pause: function () {
		if (this.data) {
			this.data.removeEventListener('playing', this.onPlaying);
			this.data.removeEventListener('pause', this.onPause);
		}
	},
	onPlaying: function (evt) {
		this.el.setAttribute('visible', false);
	},
	onPause: function (evt) {
		this.el.setAttribute('visible', true);
	}
});