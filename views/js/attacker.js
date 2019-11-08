class Attacker {
    constructor(pos) {
        if (pos == 0) {
            this.col = 0;
            this.row = 0;
        } else if (pos == 1) {
            this.col = 19;
            this.row = 0;
        } else if (pos == 2){
            this.col = 0;
            this.row = 19;
        } else if (pos == 4) {
            this.col = 19;
            this.row = 19;
        } else {
            this.row = 0;
            this.col = 0;
        }

        this.cell_view = board_view.children[this.row].children[this.col];
        if (pos == 0) {
            this.cell_view.style.backgroundColor = 'orange'
        }
    }

    chase(snake, index) {
        if (this.row == food.row && this.col == food.col) {
            this.cell_view.style.backgroundColor = '#BF616A';
        } else {
            this.cell_view.style.backgroundColor = '#3B4252';
        }

        let snake_part = snake[index];

        if (snake_part.row > this.row) {
            this.row += 1;
        } else if (snake_part.row < this.row) {
            this.row -= 1;
        }

        if (snake_part.col > this.col) {
            this.col += 1;
        } else if (snake_part.col < this.col) {
            this.col -= 1;
        }

        this.cell_view = board_view.children[this.row].children[this.col];
        this.cell_view.style.backgroundColor = 'orange';

        if (this.col == snake[0].col && this.row == snake[0].row) {
            handle_loss();
        }
    }

    reset() {
        this.cell_view.style.backgroundColor = '#3B4252';
    }
}