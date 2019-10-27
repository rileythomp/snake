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

    chase(snake_tail) {
        if (this.row == food.row && this.col == food.col) {
            this.cell_view.style.backgroundColor = '#BF616A';
        } else {
            this.cell_view.style.backgroundColor = '#3B4252';
        }

        if (snake_tail.row > this.row) {
            this.row += 1;
        } else if (snake_tail.row < this.row) {
            this.row -= 1;
        }

        if (snake_tail.col > this.col) {
            this.col += 1;
        } else if (snake_tail.col < this.col) {
            this.col -= 1;
        }

        this.cell_view = board_view.children[this.row].children[this.col];
        this.cell_view.style.backgroundColor = 'orange';

        if (this.col == snake_tail.col && this.row == snake_tail.row) {
            handle_loss();
        }
    }

    reset() {
        this.cell_view.style.backgroundColor = '#3B4252';
    }
}