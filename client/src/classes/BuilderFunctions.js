export class Car {
    constructor(id) {
        this.id = id;
        this.orientation = null;
        this.imageUrl = null;
        this.length = 0;
        this.row = null;
        this.column = null;
        this.start = null;
        this.end = null;
    }
}

export class Game {
    constructor(layout) {
        this.layout = layout;
        this.cars = [];
        this.newCarIndex = null;
        this.initialize();
    }

    initialize() {
        for (let id = 1; id <= 18; id++) {
            const car = new Car(id);
            this.cars.push(car);
        }
        return;
    }

    addCar(row, column, length, orientation, imageUrl) {
        const car = this.cars[this.getNewCarIndex()];
        if (!this.isValidMove(car.id, row, column, length, orientation)) return false;
        car.length = length;
        car.orientation = orientation;
        car.imageUrl = imageUrl;
        if (orientation === 'h') {
            for (let count = 0; count < car.length; count++) {
                this.layout[row][column + count] = car.id;
            }
            car.row = row;
            car.start = column;
        }
        else if (orientation === 'v') {
            for (let count = 0; count < car.length; count++) {
                this.layout[row + count][column] = car.id;
            }
            car.column = column;
            car.start = row;
        }
        car.end = car.start + car.length - 1;
        return true;
    }

    getNewCarIndex() {
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].length === 0){
                this.newCarIndex = i;
                return i;
            }
        }
    }

    move(row, column, car) {
        if (!this.isValidMove(car.id, row, column, car.length, car.orientation)) return false;
        if (car.orientation === 'h') {
            for (let count = 0; count < car.length; count++) {
                this.layout[car.row][car.start + count] = 0;
                this.layout[row][column + count] = car.id;
            }
            car.row = row;
            car.start = column;
            car.end = column + car.length - 1;
        }
        else if (car.orientation === 'v') {
            for (let count = 0; count < car.length; count++) {
                this.layout[car.start + count][car.column] = 0;
                this.layout[row + count][column] = car.id;
            }
            car.column = column;
            car.start = row;
            car.end = row + car.length - 1;
        }
        return true;
    }

    isValidMove(id, row, column, length, orientation) {
        if (orientation === 'h' && column > (6 - length)) {
            // console.log('invalid horizontal bounds')
            return false;
        }
        else if (orientation === 'v' && row > (6 - length)) {
            // console.log('invalid vertical bounds')
            return false;
        }

        if (orientation === 'h') { // checking for enough space
            for (let c = column; c < column + length; c++) {
                // console.log('c', c);
                // console.log('this.layout[row][c]', this.layout[row][c])
                if (this.layout[row][c] > 0 && this.layout[row][c] !== id) {
                    // console.log('invalid horizontal space')
                    return false;
                }
            }
        }
        else if (orientation === 'v') {
            for (let r = row; r < row + length; r++) {
                if (this.layout[r][column] > 0 && this.layout[r][column] !== id) {
                    // console.log('invalid vertical space')
                    return false;
                }
            }
        }
        return true;
    }

    remove(i) {
        const car = this.cars[i];
        if (car.orientation === 'h') {
            for (let column = car.start; column <= car.end; column++) {
                this.layout[car.row][column] = 0;
            }
        }
        else if (car.orientation === 'v') {
            for (let row = car.start; row <= car.end; row++) {
                this.layout[row][car.column] = 0;
            }
        }
        car.orientation = null;
        car.imageUrl = null;
        car.length = 0;
        car.row = null;
        car.column = null;
        car.start = null;
        car.end = null;
        return;
    }

    getCarIndex(id) {
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === id) return i;
        }
    }

    reset() {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.layout[row][column] = 0;
            }
        }
        this.cars.forEach(car => {
            car.orientation = null;
            car.imageUrl = null;
            car.length = 0;
            car.row = null;
            car.column = null;
            car.start = null;
            car.end = null;
        });
        this.newCarIndex = null;
        return;
    }

    getDatabaseLayout() {
        let databaseLayout = '';
        this.layout.forEach((row, i) => {
            row.forEach((value, i) => {
                databaseLayout += `${value}0`;
            })
        })
        return databaseLayout;
    }

}