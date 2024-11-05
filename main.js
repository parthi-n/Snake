/*-------------------------------- Constants --------------------------------*/
const gameEl = document.getElementById("game-area");
const width = 40; // Width of the area
const height = 20; // Height of the area

const rightBtnEl = document.getElementById("right");
const leftBtnEl = document.getElementById("left");
const upBtnEl = document.getElementById("up");
const downBtnEl = document.getElementById("down");
const startBtnEl = document.getElementById("start");
const pauseBtnEl = document.getElementById("pause");
const restartBtnEl = document.getElementById("restart");
const scoreDisplay = document.getElementById("score");
const scoreboardEl = document.getElementById("scoreboard");
const gameDialogEl = document.getElementById("game-dialog");
const wallCheckboxEl = document.getElementById("wall");
const snakeBodyEl = document.getElementsByClassName("s-body");

const right = { x: 1, y: 0 }; // Right movement
const left = { x: -1, y: 0 }; // Left movement
const up = { x: 0, y: -1 }; // Up movement
const down = { x: 0, y: 1 }; // Down movement

const bodyClassID = [1, 2, 3, 4, 5];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFBD33"];

const foodAvlTime = 5000; // Time to regenerate food
const lifeAvlTime = 5000; // Time to regenerate food


/*---------- Variables (state) ---------*/
let snake = [{ x: 0, y: 0 }]; // Initial Snake position
let direction = right; // Initial direction
let food = { x: 5, y: 0 }; // Initial food position
let score = 0; // Initial Score
let game; // Store the game interval
let gamePaused = false;
let wallsEnabled = false;
let foodTimer;
let lifeTimer;
let life = { x: 5, y: 5 };

/*-------------- Functions -------------*/

// Create Game Area
const gameArea = () => {
	gameEl.style.width = `${width * 20}px`; // Set width
	gameEl.style.height = `${height * 20}px`; // Set height
	scoreboardEl.style.width = `${width * 20}px`;
	gameEl.style.gridTemplateColumns = `repeat(${width}, auto)`;
	gameEl.style.gridTemplateRows = `repeat(${height}, auto)`;

	for (let i = 0; i < width * height; i++) {
		const tile = document.createElement("div");
		tile.className = "tile";
		gameEl.appendChild(tile);
	}
};

// Draw Snake
const drawSnake = () => {
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach((tile) => (tile.className = "tile"));

	snake.forEach((seg, index) => {
		const tilePos = seg.y * width + seg.x;
		tiles[tilePos].classList.add("snake"); // Add "snake" class to all segments
		if (index === 0) {
			tiles[tilePos].classList.add("s-head"); // Add "head" class to the first segment
		} else {
			tiles[tilePos].classList.add("s-body"); // Add "body" class to all segments after the first
		}
	});

	for (let i = 0; i < snakeBodyEl.length; i++) {
		// Generate a random index to pick a suffix
		const randomIndex = Math.floor(Math.random() * bodyClassID.length);
		const randomClass = `b-${bodyClassID[randomIndex]}`;

		// Add the random class to the element
		snakeBodyEl[i].classList.add(randomClass);
	}

	// Draw Food
	const foodPos = food.y * width + food.x;
	tiles[foodPos].classList.add("food");

	// Draw life
	const lifePos = life.y * width + life.x;
	tiles[lifePos].classList.add("life");
};

// Generate food
const addFood = () => {
	do {
		food.x = Math.floor(Math.random() * width);
		food.y = Math.floor(Math.random() * height);
	} while (snake.some((segment) => segment.x === food.x && segment.y === food.y) || (food.x === life.x && food.y === life.y)); // Also check against life
};

// Generate life
const addLife = () => {
	do {
		life.x = Math.floor(Math.random() * width);
		life.y = Math.floor(Math.random() * height);
	} while (snake.some((segment) => segment.x === life.x && segment.y === life.y));
};

// Check Wall contact
const checkWall = (head) => {
	if (wallsEnabled && (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height)) {
		console.log("Wall contact");
		return true;
	}
	return false;
};

// Check self contact
const selfCollision = (head) => {
	return snake.some((segment) => segment.x === head.x && segment.y === head.y);
};

// Move Snake
const moveSnake = () => {
	if (gamePaused) return;
	const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

	// Check collision with food
	if (head.x === food.x && head.y === food.y) {
		score++;
		addFood(); // Generate new food
	} else {
		snake.pop(); // Remove last segment if not eating
	}

	// Check collision with life - remove 3 segments
	if (head.x === life.x && head.y === life.y) {
		score++;
		if (snake.length >= 6) {
			snake.splice(-3); // Removes the last 3 segments
		}
		addLife(); // Generate new life
	}

	// If walls are disabled, wrap around the edges
	if (!wallsEnabled) {
		if (head.x < 0) head.x = width - 1; // Wrap from left to right
		else if (head.x >= width) head.x = 0; // Wrap from right to left
		if (head.y < 0) head.y = height - 1; // Wrap from top to bottom
		else if (head.y >= height) head.y = 0; // Wrap from bottom to top
	} else {
		// Check collision with walls
		if (checkWall(head)) {
			gameOver();
		}
	}

	// Check self collision
	if (selfCollision(head)) {
		gameOver();
	}

	// Add new head
	snake.unshift(head);
	scoreDisplay.innerText = score;
	drawSnake();
};

// Initialize game
const initGame = () => {
	snake = [
		{ x: 2, y: 0 },
		{ x: 1, y: 0 },
		{ x: 0, y: 0 },
	];
	score = 0;
	direction = right; // Reset direction
	scoreDisplay.innerText = score;
	drawSnake();
	addFood(); // Generate initial food
};

// Start game
const startBtnClick = () => {
	hideDialog();
	if (gamePaused) return;
	console.log("Game started");
	initGame();
	wallCheckboxEl.disabled = true;
	startBtnEl.disabled = true;
	if (game) clearInterval(game); // Clear any existing game loop
	game = setInterval(moveSnake, 75);
	foodTimer = setInterval(addFood, foodAvlTime); // Keep generating food
	lifeTimer = setInterval(addLife, lifeAvlTime); // Keep generating food
	pauseBtnEl.disabled = false;
};

const gameOver = () => {
	//alert(`Game Over! Your score: ${score}`);
	clearInterval(game);
	clearInterval(foodTimer);
	pauseBtnEl.disabled = true;
	wallCheckboxEl.disabled = true;
	startBtnEl.disabled = false;
};

// Pause game
const pauseBtnClick = () => {
	gamePaused = !gamePaused; // Toggle pause state
	pauseBtnEl.innerText = gamePaused ? "Resume" : "Pause"; // Update button text
};

// Restart game
const restartGame = () => {
	clearInterval(game); // Clear the game loop
	clearInterval(foodTimer); // Clear the food timer
	gamePaused = false;
	initGame(); // Initialize game state
	game = setInterval(moveSnake, 75); // Restart game loop
	foodTimer = setInterval(addFood, foodAvlTime); // Restart food timer
	pauseBtnEl.disabled = false; // Enable pause button
	startBtnEl.disabled = true; // Disable start button
	wallCheckboxEl.disabled = true; // Disable wall checkbox
};

//hide Dialog
const hideDialog = () => {
	gameDialogEl.style.visibility = "hidden";
};

// Change Direction
const rightBtnClick = () => {
	if (direction.x !== -1) direction = right; // Prevent reversing
};
const leftBtnClick = () => {
	if (direction.x !== 1) direction = left; // Prevent reversing
};
const upBtnClick = () => {
	if (direction.y !== 1) direction = up; // Prevent reversing
};
const downBtnClick = () => {
	if (direction.y !== -1) direction = down; // Prevent reversing
};

/*----------- Event Listeners ----------*/
rightBtnEl.addEventListener("click", rightBtnClick);
leftBtnEl.addEventListener("click", leftBtnClick);
upBtnEl.addEventListener("click", upBtnClick);
downBtnEl.addEventListener("click", downBtnClick);
startBtnEl.addEventListener("click", startBtnClick);
restartBtnEl.addEventListener("click", restartGame);
pauseBtnEl.addEventListener("click", pauseBtnClick);
wallCheckboxEl.addEventListener("change", () => {
	wallsEnabled = wallCheckboxEl.checked;
});
document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowRight":
			rightBtnClick();
			break;
		case "ArrowLeft":
			leftBtnClick();
			break;
		case "ArrowUp":
			upBtnClick();
			break;
		case "ArrowDown":
			downBtnClick();
			break;
		case " ":
			startBtnClick();
			break;
		case "Escape":
			pauseBtnClick();
			break;
	}
});

// Initialize game area on page load
gameArea();
