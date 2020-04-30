function isTouching (a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const player = document.querySelector('#player');
const coin = document.getElementById('coin');
const input = document.querySelector('#input');
const name = document.querySelector('#name');
const score = document.querySelector('#score');
const inputName = document.querySelector('input');
inputName.focus();
inputName.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		name.innerText = inputName.value;
		if (inputName.value !== '') {
			input.style.display = 'none';
			play();
		}
		else {
			inputName.placeholder = 'ENTER YOUR NAME';
		}
	}
});

const play = () => {
	window.addEventListener('keyup', function (e) {
		if (e.key === 'ArrowDown') {
			const currentTop = extractPos(player.style.top);
			if (currentTop < window.innerHeight - 150) {
				player.style.top = `${currentTop + 50}px`;
			}
		}
		else if (e.key === 'ArrowUp') {
			const currentTop = extractPos(player.style.top);
			if (currentTop > 0) {
				player.style.top = `${currentTop - 50}px`;
			}
		}
		else if (e.key === 'ArrowRight') {
			const currentLeft = extractPos(player.style.left);
			if (currentLeft < window.innerWidth - 100) {
				player.style.left = `${currentLeft + 50}px`;
				player.style.transform = 'scale(1,1)';
			}
		}
		else if (e.key === 'ArrowLeft') {
			const currentLeft = extractPos(player.style.left);
			if (currentLeft > 0) {
				player.style.left = `${currentLeft - 50}px`;
				player.style.transform = 'scale(-1,1)';
			}
		}
		if (isTouching(player, coin)) coinPosition();
	});
};
const coinPosition = () => {
	let topp = `${Math.floor(Math.random() * (window.innerHeight - 100))}px`;
	let leftt = `${Math.floor(Math.random() * (window.innerWidth - 100))}px`;
	coin.style.top = topp;
	coin.style.left = leftt;
	score.innerText++;
};
// coinPosition()

const extractPos = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
};
