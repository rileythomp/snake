class Food {
    generate_food(snake) {
        let food_on_snake;

        do {
            food_on_snake = false;
            this.row = Math.floor(Math.random() * board_len);
            this.col = Math.floor(Math.random() * board_len);

            for (let i = 0; i < snake.length; ++i) {
                let snake_cell = snake[i];

                if (snake_cell.row == this.row && snake_cell.col == this.col) {
                    food_on_snake = true;
                    break;
                }
            }
        } while (food_on_snake);

        this.cell_view = board_view.children[this.row].children[this.col];
        this.cell_view.style.backgroundColor = '#BF616A';
    }
}