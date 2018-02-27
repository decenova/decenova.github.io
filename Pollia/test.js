function nextStep(i, j, next) {
    if (i >= 0 && i < 10 && j >= 0 && j < 10 && arrTest[i][j] == 0) {
        // console.log(arrTest[i] + '-' + arrTest[i][j] + '-' + arrTest[i][j] == 0);
        arrTest[i][j] = next;
        if (
            checkPosition(checkPos.x,checkPos.y) ||
            (next > 60 && checkArray())
        ) {
            arrTest[i][j] = 0;
            return;
        }
        if (next < 100) {
            nextStep(i + 3, j, next + 1);
            nextStep(i, j + 3, next + 1);
            nextStep(i, j - 3, next + 1);
            nextStep(i - 3, j, next + 1);
            nextStep(i + 2, j + 2, next + 1);
            nextStep(i + 2, j - 2, next + 1);
            nextStep(i - 2, j + 2, next + 1);
            nextStep(i - 2, j - 2, next + 1);
        }
        else {
            print(arrTest);
            arrRes.push(arrTest);
        }
        arrTest[i][j] = 0;
    }
    else {
        return;
    }

}

function print(arrTest) {
    var s = "\n";
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            s += arrTest[i][j] + " ";
        }
        s += "\n";
    }
    console.log(s);
}

function checkArray() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if (arrTest[x][y] == 0 && checkPosition(x,y)){
                checkPos = {x: x, y: y};
                return true;
            }
        }
    }
    return false;
}

function checkPosition(x,y) {
    if (
        x == -1 || y == -1 ||
        isEmpty(x + 3,y) ||
        isEmpty(x,y + 3) ||
        isEmpty(x - 3,y) ||
        isEmpty(x,y - 3) ||
        isEmpty(x + 2,y + 2) ||
        isEmpty(x + 2,y - 2) ||
        isEmpty(x - 2,y + 2) ||
        isEmpty(x - 2,y - 2)      
       ){
            checkPos = {x:-1,y:-1}
            return false;
    }
    return true;
}

function isEmpty(x,y){
    if((x >= 0 && x < 10 && y >= 0 && y < 10) && arrTest[x][y] == 0)
        return true;
    return false;
}


var arrTest = new Array(10);
var arrRes = new Array();
for (var i = 0; i < 10; i++) {
    arrTest[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
var step = 1;
var checkPos = { x: -1, y: -1 };
function run() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            arrTest[i][j] = 1;
            nextStep(i + 3, j, 2);
            nextStep(i, j + 3, 2);
            nextStep(i, j - 3, 2);
            nextStep(i - 3, j, 2);
            nextStep(i + 2, j + 2, 2);
            nextStep(i + 2, j - 2, 2);
            nextStep(i - 2, j + 2, 2);
            nextStep(i - 2, j - 2, 2);
            arrTest[i][j] = 0;
            console.log(step++);
        }
    }
}
