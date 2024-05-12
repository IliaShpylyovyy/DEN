class Key_Pressed {
    constructor() {
        this.keys = {}; // Об'єкт для зберігання статусу натискання клавіш
        // Підключення обробників подій keydown та keyup до відповідних методів класу
        window.addEventListener('keydown', this.keyDownHandler.bind(this));
        window.addEventListener('keyup', this.keyUpHandler.bind(this));
    }

    // Метод, який встановлює значення true для клавіші, яка була натиснута
    keyDownHandler(event) {
        this.keys[event.code] = true;
    }

    // Метод, який встановлює значення false для клавіші, яка була відпущена
    keyUpHandler(event) {
        this.keys[event.code] = false;
    }
}

const key_pressed = new Key_Pressed(); // Створення екземпляру класу Key_Pressed

function keydown_function(event) {
    window.addEventListener('keydown', keydown_function);
    // Виведення інформації про подію натискання клавіші в консоль
    console.log("Keydown event:");
    console.log("Key code:", event.code);
    console.log("Key char:", event.key);

    // Обробка подій для різних клавіш

    // Видалення пружини, якщо натиснута клавіша "Delete"
    if (key_pressed.keys["Delete"]) {
        delete_spring(Mouse.selected_spring_id_arr[0]);
        console.log("пружина № " + Mouse.selected_spring_id_arr[0] + " видалена");
    }

    // Додавання мотора до пружини, якщо натиснута клавіша "ShiftLeft" або "ControlLeft"
    if (key_pressed.keys["ShiftLeft"]) {
        spring_arr[Mouse.selected_spring_id_arr[0]].make_motor(true, 0, 1);
        spring_arr[Mouse.selected_spring_id_arr[0]].motor_speed = 0.5;
        console.log("мотор № " + Mouse.selected_spring_id_arr[0] + " доданий");
    }

    if (key_pressed.keys["ControlLeft"]) {
        spring_arr[Mouse.selected_spring_id_arr[0]].make_motor(true, 0.01, -1);
        console.log("мотор № " + Mouse.selected_spring_id_arr[0] + " доданий");
    }

    // Створення нової точки, якщо натиснута клавіша "Digit1" або "Numpad1"
    if (key_pressed.keys["Digit1"] || key_pressed.keys["Numpad1"]) {
        circle(Mouse.x, Mouse.y, 5);
        Position = new PVector(Mouse.x, Mouse.y);
        point_arr.push(new Point(Position, point_arr.length));
        console.log("точка № " + Mouse.selected_spring_id_arr[0] + " додана");
    }

    // Створення нової пружини з фактичною довжиною, якщо натиснуті клавіші "Digit7" або "Numpad7"
if (key_pressed.keys["Digit2"] || key_pressed.keys["Numpad2"]) {
    // Визначення координат вибраних точок
    let x1 = point_arr[Mouse.selected_point_id_arr[1]].Position.x;
    let y1 = point_arr[Mouse.selected_point_id_arr[1]].Position.y;
    let x2 = point_arr[Mouse.selected_point_id_arr[2]].Position.x;
    let y2 = point_arr[Mouse.selected_point_id_arr[2]].Position.y;

    // Обчислення відстані між вибраними точками
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Створення нової пружини з обчисленою довжиною та під'єднання до вибраних точок
    spring_arr.push(new Spring(distance, spring_arr.length));
    spring_arr[spring_arr.length - 1].connect_point(Mouse.selected_point_id_arr[1], Mouse.selected_point_id_arr[2]);
}

// Активація якоря для вибраної точки, якщо натиснуті клавіші "Digit3" або "Numpad3"
if (key_pressed.keys["Digit3"] || key_pressed.keys["Numpad3"]) {
    // Активація якоря для вибраної точки
    point_arr[Mouse.selected_point_id_arr[0]].activate_anchor(true);
      // тип фіксації переміщень
      point_arr[Mouse.selected_point_id_arr[0]].anchor_type = "XY";
}

// Запам'ятовування вибраної точки як другої для створення пружини, якщо натиснуті клавіші "Digit5" або "Numpad5"
if (key_pressed.keys["Digit4"] || key_pressed.keys["Numpad4"]) {
    // Активація якоря для вибраної точки
    point_arr[Mouse.selected_point_id_arr[0]].activate_anchor(true);
    // тип фіксації переміщень
    point_arr[Mouse.selected_point_id_arr[0]].anchor_type = "Y";
}


// Запам'ятовування вибраної точки як другої для створення пружини, якщо натиснуті клавіші "Digit5" або "Numpad5"
if (key_pressed.keys["Digit5"] || key_pressed.keys["Numpad5"]) {
    // Активація якоря для вибраної точки
    point_arr[Mouse.selected_point_id_arr[0]].activate_anchor(true);
      // тип фіксації переміщень
      point_arr[Mouse.selected_point_id_arr[0]].anchor_type = "X";
}

// Під'єднання вибраних точок за допомогою пружини, якщо натиснуті клавіші "Digit6" або "Numpad6"
if (key_pressed.keys["Digit6"] || key_pressed.keys["Numpad6"]) {
    // Під'єднання вибраних точок до останньої створеної пружини
    spring_arr[spring_arr.length - 1].connect_point(Mouse.selected_point_id_arr[1], Mouse.selected_point_id_arr[2]);
}


   // Створення нової пружини з фіксованою довжиною, якщо натиснуті клавіші "Digit2" або "Numpad2"
if (key_pressed.keys["Digit7"] || key_pressed.keys["Numpad7"]) {
    // Додавання нової пружини до масиву пружин з фіксованою довжиною
    spring_arr.push(new Spring(50, spring_arr.length));
    // Під'єднання вибраних точок до нової пружини
    spring_arr[spring_arr.length - 1].connect_point(Mouse.selected_point_id_arr[1], Mouse.selected_point_id_arr[2]);
}



// Запам'ятовування вибраної точки як першої для створення пружини, якщо натиснуті клавіші "Digit4" або "Numpad4"
if (key_pressed.keys["Digit4"] || key_pressed.keys["Numpad4"]) {
    // Запам'ятовування вибраної точки як першої
    Mouse.selected_point_id_arr[1] = Mouse.selected_point_id_arr[0];
}



if (key_pressed.keys["ArrowDown"]) {
    point_arr[Mouse.selected_point_id_arr[0]].force.y += 1;
}
if (key_pressed.keys["ArrowUp"]) {
    point_arr[Mouse.selected_point_id_arr[0]].force.y -= 1;
}
if (key_pressed.keys["ArrowRight"]) {
    point_arr[Mouse.selected_point_id_arr[0]].force.x += 1;
}
if (key_pressed.keys["ArrowLeft"]) {
    point_arr[Mouse.selected_point_id_arr[0]].force.x -= 1;
}






}
