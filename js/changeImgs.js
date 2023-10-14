var pictArray = [

	"00077.jpg", "00078.jpg", "00080.jpg", "00081.jpg", "00082.jpg", "00084.jpg", "00088.jpg",
	"00089.jpg", "00093.jpg", "00094.jpg", "00097.jpg", "00098.jpg", "00101.jpg", "00108.jpg",
	"00110.jpg", "00112.jpg", "00113.jpg", "00114.jpg", "00115.jpg", "00117.jpg", "00131.jpg",
	"00141.jpg", "00143.jpg", "00146.jpg", "00147.jpg", "00151.jpg", "00158.jpg", "00161.jpg",
	"00165.jpg", "00172.jpg", "00173.jpg", "00178.jpg", "00181.jpg", "00187.jpg", "00190.jpg",
	"00191.jpg", "00198.jpg", "00199.jpg", "00200.jpg", "00205.jpg", "00217.jpg", "00218.jpg",
	"00238.jpg", "00248.jpg", "00249.jpg", "00252.jpg"

];

var step = 0.01;
var dir = -step;
var opaq1 = 1;
var opaq2 = step;

var timerId;

var pauseTotal = 100;//100;
var pauseChange = pauseTotal;
var pause = false;

var pict1 = document.getElementById('pict1');
var pict2 = document.getElementById('pict2');

pict1.src = flFolder() + pictArray[Math.floor((Math.random() * (pictArray.length - 1)) + 0)];
pict2.src = flFolder() + pictArray[Math.floor((Math.random() * (pictArray.length - 1)) + 0)];

timerId = setInterval(changeimgs, 50);

cntrTemp = 0;

var pictMoveStepX = 0;
var pictMoveStepY = 0;

var pictMoveX = 0;
var pictMoveY = 0;

function changeimgs() {

	var winH = window.innerHeight - 3;
	var winW = window.innerWidth - 1;

	var pict1 = document.getElementById('pict1');
	var pict2 = document.getElementById('pict2');
	var img1 = document.getElementById('img1');
	var img2 = document.getElementById('img2');

	// DEBUG
	//		cntrTemp++;
	//		document.getElementById('textC').innerHTML = "" + cntrTemp + "<p>" + pict1.src + "<p>" + pict2.src;

	var pictH = pict1.height;
	var pictW = pict1.width;

	var pictrel = pictW / pictH;

	if ((pictW > 0) && (pictH > 0)) // Проверяем, что картинка еще не загрузилась
	{

	}
	else {
		return;
	}

	pict1.height = winH;
	pict2.height = winH;
	pict1.width = pict1.height * pictrel;
	pict2.width = pict2.height * pictrel;

	var pictH = pict1.height;
	var pictW = pict1.width;

	var pictrel = pictW / pictH;


	//if (pictW > winW)
	if (pictW < winW) {
		pict1.width = winW;
		pict2.width = winW;
		pict1.height = pict1.width / pictrel;
		pict2.height = pict2.width / pictrel;
	}


	img1.style.left = (winW - pict1.width) / 2 + pictMoveX + "px";
	img2.style.left = img1.style.left;

	img1.style.top = (winH - pict1.height) / 2 + pictMoveY + "px";
	img2.style.top = img1.style.top;


	//pictMoveX = pictMoveX + pictMoveStepX;
	//pictMoveY = pictMoveY + pictMoveStepY;
	//checkMaxBorder();

	if (pause) {
		pauseChange = pauseChange - 1;

		if (pauseChange <= 0) {
			pause = false;
			pauseChange = pauseTotal;
		}

		return;
	}

	opaq1 = opaq1 + dir;
	opaq2 = opaq2 - dir;

	// Изменение размера лого в зависимости от экрана
	let cw = window.innerWidth;
	let ch = window.innerHeight;

	var logoSize = 431;

	if (ch < cw) {
		minSize = ch;
	} else {
		minSize = cw;
	}

	if (logoSize > minSize * 0.5) {
		logoSize = minSize * 0.5;
	}

	document.getElementById('logo').width = logoSize;
	document.getElementById('logo').height = logoSize;

	if (dir < 0) {
		if (opaq1 <= 0) {
			pause = true;

			opaq1 = step;
			opaq2 = 1;
			dir = step;

			document.getElementById('img1').style.opacity = opaq1;
			document.getElementById('img2').style.opacity = opaq2;

			pict1.src = flFolder() + pictArray[Math.floor((Math.random() * (pictArray.length - 1)) + 0)];

			//updateMoveStep();

			return;
		}
	}

	if (dir > 0) {
		if (opaq2 <= 0) {
			pause = true;

			opaq1 = 1;
			opaq2 = step;
			dir = -step;

			document.getElementById('img1').style.opacity = opaq1;
			document.getElementById('img2').style.opacity = opaq2;

			pict2.src = flFolder() + pictArray[Math.floor((Math.random() * (pictArray.length - 1)) + 0)];

			//updateMoveStep();

			return;
		}
	}

	document.getElementById('img1').style.opacity = opaq1;
	document.getElementById('img2').style.opacity = opaq2;

}

function updateMoveStep() {

	//pictMoveX = 0;
	//pictMoveY = 0;
	pictMoveStepX = (Math.random() - 1)/2.0;
	pictMoveStepY = (Math.random() - 1)/2.0;

	checkMaxBorder()
}

function checkMaxBorder() {

	const maxBorder = 20;

	if (((pictMoveX > maxBorder) && (pictMoveStepX > 0))
		||
		((pictMoveX < -maxBorder) && (pictMoveStepX < 0))) {
		pictMoveStepX = pictMoveStepX * -1;
	}

	if (((pictMoveY > maxBorder) && (pictMoveStepY > 0))
		||
		((pictMoveY < -maxBorder) && (pictMoveStepY < 0))) {
		pictMoveStepY = pictMoveStepY * -1;
	}
}

function flFolder() {
	var p = "img/photos/";
	return p;
}