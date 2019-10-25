class SnakeCell {
    constructor(row, col, dir) {
        this.row = row;
        this.col = col;
        this.dir = dir;
        this.cell_view = board_view.children[row].children[col];
        this.cell_view.style.backgroundColor = '#A3BE8C';
    }

    shift() {
        this.cell_view.style.backgroundColor = '#3B4252';

        switch (this.dir) {
            case 37:
                this.col -= 1;
                break;
            case 38:
                this.row -= 1;
                break;
            case 39:
                this.col += 1;
                break;
            case 40:
                this.row += 1;
                break;
        }

        this.cell_view = board_view.children[this.row].children[this.col];
        this.cell_view.style.backgroundColor = '#A3BE8C';
    }

    has_hit_wall(board_len) {
        if (this.dir == 37 && this.col == 0) {
            return true;
        } else if (this.dir == 38 && this.row == 0) {
            return true;
        } else if (this.dir == 39 && this.col == board_len - 1) {
            return true;
        } else if (this.dir == 40 && this.row == board_len - 1) {
            return true;
        }
        return false;
    }

    has_collided_with(obj) {
        return obj.row == this.row && obj.col == this.col;
    }

    grow_tail() {
        switch (this.dir) {
            case 37:
                return new SnakeCell(this.row, this.col+1, this.dir);
            case 38:
                return new SnakeCell(this.row+1, this.col, this.dir);
            case 39:
                return new SnakeCell(this.row, this.col-1, this.dir);
            case 40:
                return new SnakeCell(this.row-1, this.col, this.dir);
        }
    }
}