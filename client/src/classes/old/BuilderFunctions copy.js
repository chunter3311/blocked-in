export class Vehicle {
    constructor(id) {
        this.id = id;
        this.imageUrl = null;
        this.position = [];
        this.orientation = null;
        this.length = 0;
        this.start = null;
        this.end = null;
        this.row = null;
        this.column = null;
    }
}

export class Puzzle {
    constructor(layout) {
        this.layout = layout;
        this.vehicles = [];
        this.initialize();
    }

    initialize() {
        for (let v = 1; v <= 18; v++) {
            const vehicle = new Vehicle(v);
            this.vehicles.push(vehicle);
        }
        return;
    }

    addVehicle(row, column, length, orientation, imageUrl) {
        if (!this.isValidMove(row, column, length, orientation)) return;
        for (let v = 0; v < this.vehicles.length; v++) {
            if (this.vehicles[v].length === 0) {
                this.vehicles[v].length = length;
                this.vehicles[v].orientation = orientation;
                this.vehicles[v].imageUrl = imageUrl;
                if (orientation === 'h') {
                    let columnEnd = column;
                    let columnStart = columnEnd - (length - 1);
                    for (let c = columnStart; c <= columnEnd; c++) {
                        this.vehicles[v].position.push([row, c]);
                    }

                    this.vehicles[v].row = row;
                    this.vehicles[v].start = columnStart;
                    this.vehicles[v].end = columnEnd;
                }
                else if (orientation === 'v') {
                    let rowEnd = row;
                    let rowStart = rowEnd - (length - 1);
                    for (let r = rowStart; r <= rowEnd; r++) {
                        this.vehicles[v].position.push([r, column]);
                    }

                    this.vehicles[v].column = column;
                    this.vehicles[v].start = rowStart;
                    this.vehicles[v].end = rowEnd;
                }
                break;
            }
        }

        this.updateLayout();
        return;
    }

    isValidMove(row, column, length, orientation) {
        if (orientation === 'h') {
            let columnEnd = column;
            let columnStart = columnEnd - (length - 1);
            if (columnStart < 0) return false;
            if (columnEnd > 5) return false;
            for (let c = columnStart; c <= columnEnd; c++) {
                if (this.layout[row][c] > 0) return false;
            }
        }
        else if (orientation === 'v') {
            let rowEnd = row;
            let rowStart = rowEnd - (length - 1);
            if (rowStart < 0) return false;
            if (rowEnd > 5) return false;
            for (let r = rowStart; r <= rowEnd; r++) {
                if (this.layout[r][column] > 0) return false;
            }
        }
        return true;
    }

    move(row, column, vehicle) {
        if (vehicle.orientation === 'v') {
            if (row === 5 && vehicle.length === 2) row--;
            else if (row === 5 && vehicle.length === 3) row = row - 2;
            for (let r = row; r < row + vehicle.length; r++) {
                
                if (this.layout[r][column] > 0 && this.layout[r][column] !== vehicle.id) return;
            }
            vehicle.column = column;
            vehicle.start = row;
            vehicle.end = vehicle.start + (vehicle.length - 1);
            this.updateLayout();
            return;
        }
        else if (vehicle.orientation === 'h') {
            if (column === 5 && vehicle.length === 2) column--;
            else if (column === 5 && vehicle.length === 3) column = column - 2;
            for (let c = column; c < column + vehicle.length; c++) {
                if (this.layout[row][c] > 0 && this.layout[row][c] !== vehicle.id) return;
            }
            vehicle.row = row;
            vehicle.start = column;
            vehicle.end = vehicle.start + (vehicle.length - 1);
            this.updateLayout();
            return;
        }
        return;
    }

    remove(i) {
        this.vehicles.splice(i, 1);
        this.updateLayout();
        return;
    }

    updateLayout() {
        this.layout.forEach(row => {
            row.forEach((column, i) => {
                row[i] = 0;
            })
        })
        this.vehicles.forEach(vehicle => {
            if (vehicle.length > 0) {
                if (vehicle.orientation === 'h') {
                    for (let column = vehicle.start; column <= vehicle.end; column++) {
                        this.layout[vehicle.row][column] = vehicle.id;
                    }
                }
                else if (vehicle.orientation === 'v') {
                    for (let row = vehicle.start; row <= vehicle.end; row++) {
                        this.layout[row][vehicle.column] = vehicle.id;
                    }
                }
            }
        })
    }

    getDatabaseLayout() {
        console.log(this.layout)
        let databaseLayout = '';
        this.layout.forEach((row, i) => {
            row.forEach((value, i) => {
                databaseLayout += `${value}0`;
            })
        })
        return databaseLayout;
    }
}