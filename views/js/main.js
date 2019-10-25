const board_len = 20;

let board_view = document.getElementById('board');

let first_click = true;

let move_interval;

let t;
let seconds = 0;
let minutes = 0;

function timer() {
    t = setTimeout(add_time, 1000);
}

function format_time(x) {
    return (x > 0 ? (x > 9 ? x : '0' + x) : '00')
}

function add_time() {
    seconds += 1;
    let clock = document.getElementById('timer');

    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    clock.innerHTML = format_time(minutes) + ':' + format_time(seconds);
    timer();
}

for (let row = 0; row < board_len; ++row) {
    let row_view = document.createElement('tr');

    for (let col = 0; col < board_len; ++col) {
        let cell_view = document.createElement('td');
        row_view.appendChild(cell_view);
    }
    board_view.appendChild(row_view);
}

let snake = [new SnakeCell(8, 7, 37)];

let food = new Food();
food.generate_food(snake);

function handle_loss() {
    clearInterval(move_interval);
    clearTimeout(t);
    document.getElementById('game-msg').innerHTML = `Game over! You scored ${snake.length - 1} in ${format_time(minutes) + ':' + format_time(seconds)}`
    document.getElementById('play-again').style.display = 'block';
}

function grow_snake() {
    snake.push(snake[snake.length - 1].grow_tail());
}

function shift_snake_cells() {
    if (snake[0].has_hit_wall(board_len)) {
        handle_loss();
        return;
    }
    
    for (let i = 0; i < snake.length;  ++i) {
        snake[i].shift();
    }

    for (let i = 1; i < snake.length;  ++i) {
        if (snake[0].has_collided_with(snake[i])) {
            handle_loss();
            return;
        }
    }
}

function update_snake_directions() {
    for (let i = snake.length-1; i >= 1;  --i) {
        snake[i].dir = snake[i - 1].dir;
    }
}

function move_in_direction() {
    shift_snake_cells();

    update_snake_directions();

    if (snake[0].has_collided_with(food)) {
        food.generate_food(snake);
        grow_snake();
        document.getElementById('score').innerHTML = snake.length - 1;
    }
}


function start_game(interval) {
    move_interval = setInterval(function() {
        move_in_direction();
    }, interval);

    timer();
}


document.onkeydown = function(ev) {
    if (first_click) {
        first_click = false
        let interval = Number(document.getElementById('level-select').value);
        start_game(interval);
    }

    if (ev.keyCode <= 40 && ev.keyCode >= 37) {
        snake[0].dir = ev.keyCode;
    }
}

document.getElementById('level-select').onchange = function() {
    this.blur();
}

function restart_game() {
    first_click = true;
    seconds = 0;
    minutes = 0;
    let cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; ++i) {
        cells[i].style.backgroundColor = '#3B4252'
    }
    snake = [new SnakeCell(8, 7, 37)];
    food.generate_food(snake);
    document.getElementById('score').innerHTML = snake.length - 1;
    document.getElementById('timer').innerHTML = '00:00';
    document.getElementById('game-msg').innerHTML = '&nbsp;';
}
