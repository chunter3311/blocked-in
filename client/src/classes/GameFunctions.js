export class Car {
    constructor(row, column, id) {
        this.id = id;
        this.initialCoordinates = [[row, column]];
        this.start = null;
        this.end = null;
        this.orientation = null;
        this.length = 1;
        this.row = null;
        this.column = null;
        this.moveOptions = []
    }

    add(row, column) {
        this.initialCoordinates.push([row, column]);
        this.length++;
        return;
    }
}

export class Game {
    constructor(layout) {
        this.isSolved = false;
        this.layout = layout;
        this.ids = new Set();
        this.originalLayout = [[], [], [], [], [], []];
        this.cars = [];
        this.validMoves = {};
        this.previousCarIndex = -1;
        this.currentCarIndex = -1;
        this.moves = 0;
        this.movesList = [];
        this.solutionMovesList = [];
        this.initialize(this.layout);
    }

    initialize(layout) {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.originalLayout[row].push(layout[row][column]);
                if (layout[row][column] === 0) continue;
                let id = layout[row][column];
                if (this.ids.has(id)) {
                    this.cars[this.getCarIndex(id)].add(row, column);
                }
                else {
                    this.ids.add(id);
                    this.cars.push(new Car(row, column, id));
                }
            }
        }
        this.cars.forEach(car => {
            if (car.initialCoordinates[0][0] === car.initialCoordinates[1][0]) {
                car.orientation = 'h';
                car.row = car.initialCoordinates[0][0];
            }
            else {
                car.orientation = 'v';
                car.column = car.initialCoordinates[0][1];
            }
            this.setCarEndPoints(car);
        });
        // this.setMoveOptions()
        return;
    }

    getCarIndex(id) {
        const carId = parseInt(id);
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === carId) return i;
        }
    }

    setCarEndPoints(car) {
        if (car.orientation === 'h') {
            car.start = car.initialCoordinates[0][1];
            car.end = car.initialCoordinates[car.length - 1][1];
        }
        else {
            car.start = car.initialCoordinates[0][0];
            car.end = car.initialCoordinates[car.length - 1][0];
        }
        return;
    }

    // setMoveOptions() {
    //     this.cars.forEach(car => {
    //         if (car.orientation === 'v') {
    //             if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) car.moveOptions.push('D');
    //             if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) car.moveOptions.push('U');
    //         }
    //         else {
    //             if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) car.moveOptions.push('R');
    //             if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) car.moveOptions.push('L');
    //         }

    //     })
    // }

    // updateMoveOptions_VerticalPositive(column, oldStart, oldEnd, newStart, newEnd) {

    // }

    positiveMove(car) {
        let unitsMoved = 0;
        if (car.orientation === 'v') {
            for (let row = car.end + 1; row <= 5 && this.layout[row][car.column] === 0; row++) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row - car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            const oldStart = car.start;
            const oldEnd = car.end;
            car.start += unitsMoved;
            car.end += unitsMoved;
            // this.updateMoveOptions_VerticalPositive(car.column, oldStart, oldEnd, car.start, car.end);
        }
        else if (car.orientation === 'h') {
            for (let column = car.end + 1; column <= 5 && this.layout[car.row][column] === 0; column++) {
                unitsMoved++;
                this.layout[car.row][column] = car.id;
                this.layout[car.row][column - car.length] = 0;
            }
            if (!unitsMoved) return false;
            car.start += unitsMoved;
            car.end += unitsMoved;
            if (car.row === 2 && car.end === 5) {
                car.start += 2;
                car.end += 2;
                this.isSolved = true;
            }
        }
        // this.updateMoveOptions(car);

        return true;
    }

    negativeMove(car) {
        let unitsMoved = 0;
        // console.log(car);
        if (car.orientation === 'v') {
            for (let row = car.start - 1; row >= 0 && this.layout[row][car.column] === 0; row--) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row + car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
        }
        else if (car.orientation === 'h') {
            for (let column = car.start - 1; column >= 0 && this.layout[car.row][column] === 0; column--) {
                unitsMoved++;
                this.layout[car.row][column] = car.id;
                this.layout[car.row][column + car.length] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
        }
        return true;
    }

    reset() {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.layout[row][column] = this.originalLayout[row][column];
            }
        }
        this.cars.forEach(car => {
            this.setCarEndPoints(car);
        });

        this.previousCarIndex = -1;
        this.currentCarIndex = -1;
        this.moves = 0;
        this.movesList = [];
        this.isSolved = false;
    }

    // this.validMoves = {
    //     '0': {
    //         '0': ['U'],
    //         '1': ['L', 'R']
    //     }
    // }
    // for (const move in this.validMoves) {
    //     if (index == this.validMoves[index] && this.validMoves[index] > luckyInt) luckyInt = this.validMoves[index];
    // }
    // let carIndexes = [];
    // this.cars.forEach(car, i => {
    //     carIndexes.push(i);
    // })
    // let carIndexSet = new Set(carIndexes);
    // if (this.previousCarIndex >= 0) carIndexSet.delete(this.previousCarIndex);

    // getSolution(setMoveCount) {
    //     var start = new Date().getTime();
    //     for (let attempt = 1; attempt <= 500; attempt++) {
    //         console.log();
    //         console.log(`Beginning Attempt ${attempt}`);
    //         console.log('-------------------------------');
    //         for (let moveCount = 1; moveCount <= 30; moveCount++) {
    //             // console.log(`Beginning Move ${moveCount} (of  attempt ${attempt})`);
    //             // console.log(`(best solution so far: ${this.solutionMovesList.length})`)
    //             // console.log('----------------------');
    //             const move = this.getMove();
    //             const car = move[0];
    //             const direction = move[1];
    //             console.log(`moving car ${car.id} in ${direction} direction`)
    //             if (direction === 'U' || direction === 'L') this.negativeMove(car);
    //             else this.positiveMove(car);
    //             this.movesList.push([`${car.id}`, `${direction}`])
    //             this.previousCarIndex = this.currentCarIndex;
    //             this.moves++;
    //             setMoveCount(this.moves);
    //             if (this.solutionMovesList.length < this.moves && this.solutionMovesList.length > 0) {
    //                 console.log(`current moves (${this.moves}) has exceeded the best solution (${this.solutionMovesList.length} moves)`)
    //                 break;
    //             }
    //             else if (this.isSolved) {
    //                 this.solutionMovesList = this.movesList.slice(0);
    //                 console.log(`a better solution was found (${this.solutionMovesList.length} moves)`);
    //                 break;
    //             }
    //         }
    //     }
    //     var elapsed = new Date().getTime() - start;
    //     console.log()
    //     console.log(`ALL DONE (${elapsed / 1000} seconds)`);
    //     console.log('=============')
    //     console.log(this.solutionMovesList);
    // }

    getSolution() {
        // var start = new Date().getTime();
        // var elapsed = new Date().getTime() - start;
        for (let attempt = 1; attempt <= 500; attempt++) {
            this.reset();
            for (let moveCount = 1; moveCount <= 30; moveCount++) {
                const move = this.getMove();
                const car = move[0];
                const direction = move[1];
                if (direction === 'U' || direction === 'L') this.negativeMove(car);
                else this.positiveMove(car);
                this.movesList.push([`${car.id}`, `${direction}`])
                this.previousCarIndex = this.currentCarIndex;
                this.moves++;

                if (this.solutionMovesList.length === 0) {
                    if (this.isSolved) {
                        this.solutionMovesList = this.movesList.slice(0);
                    }
                }
                else {
                    if (this.moves >= this.solutionMovesList.length) break;
                    else if (this.isSolved) {
                        this.solutionMovesList = this.movesList.slice(0);
                        break;
                    }
                }
            }
        }
    }

    // getMove() {
    //     const move = [];
    //     let direction = null;
    //     let car = null;
    //     let carIndex = null;
    //     const carIndexes = new Set();
    //     this.cars.forEach((car, i) => {
    //         carIndexes.add(i);
    //     })
    //     // console.log('og carIndexes', carIndexes);
    //     carIndexes.delete(this.previousCarIndex);
    //     do {
    //         carIndex = Math.floor(Math.random() * carIndexes.size);
    //         // console.log('carIndex', carIndex)
    //         car = this.cars[carIndex];
    //         direction = this.getDirection(car);
    //         // console.log('direction', direction)
    //         if (direction === null) carIndexes.delete(carIndex);
    //     } while (direction === null)
    //     // console.log('updated carIndexes', carIndexes);
    //     this.currentCarIndex = carIndex;
    //     move.push(car);
    //     move.push(direction);
    //     // console.log('move', move)
    //     return move;
    // }

    getMove() {
        const move = [];
        let direction = null;
        let car = null;
        let carIndex = null;
        do {
            carIndex = Math.floor(Math.random() * this.cars.length);
            car = this.cars[carIndex];
            direction = this.getDirection(car);
        } while (direction === null || carIndex === this.previousCarIndex)
        this.currentCarIndex = carIndex;
        move.push(car);
        move.push(direction);

        return move;
    }

    getDirection(car) {
        const directions = [];
        if (car.orientation === 'v') {
            if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) directions.push('D');
            if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) directions.push('U');
        }
        else {
            if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) directions.push('R');
            if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) directions.push('L');
        }
        if (directions.length === 1) return directions[0];
        else if (directions.length === 2) return directions[Math.floor(Math.random() * 2)];
        else return null;
    }

    setMoveOptions() {
        this.cars.forEach(car => {
            const directions = [];
            if (car.orientation === 'v') {
                if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) directions.push('D');
                if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) directions.push('U');
            }
            else {
                if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) directions.push('R');
                if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) directions.push('L');
            }
            car.moveOptions = directions.slice(0);
            this.validMoves[car.id] = car.moveOptions;
        })
    }

}

// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0]

// [1, 1, 1, 2, 3, 4],
// [5, 0, 0, 2, 3, 4],
// [5, 0, 0, 6, 6, 4],
// [5, 0, 0, 7, 7, 7],
// [0, 0, 0, 8, 0, 0],
// [0, 0, 0, 8, 9, 9]