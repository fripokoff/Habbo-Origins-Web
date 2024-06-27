var habboEmbed = "";

function updateEmbedSize() {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	console.log(screenHeight);
	const embed = document.getElementById('habboEmbed');
	const fixedRight = document.getElementById('fixedRight');
	const main_console = document.getElementById('main-console');

	if (embed) {
		embed.style.width = screenWidth + 'px';
		embed.style.height = screenHeight + 'px';
	}

	if (fixedRight) {
		fixedRight.style.width = (screenWidth * 0.165) + 'px';
		fixedRight.style.height = screenHeight + 'px';
	}
	if (main_console) {
		main_console.style.width = (screenWidth * 0.157) + 'px';
		main_console.style.height = screenHeight + 'px';
	}
}

window.addEventListener('resize', function() {
	updateEmbedSize();
});

updateEmbedSize();

document.getElementById('fullscreenBtn').addEventListener('click', function() {
	const elem = document.documentElement;

	const isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

	if (!isFullscreen) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	} else { // Sortir du plein écran
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari & Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
	}
});

if (!localStorage.getItem('origins_hotel')) {
	localStorage.setItem('origins_hotel', 'us');
}

setLoaderbyCouuntryCode(countryCode);