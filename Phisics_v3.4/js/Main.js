
///////////////////////////////////////////////////////////////////////////////////////////////////
// глобальні змінні
var time_interval = 1000; // інтервал через який оновлюється кадр за умовчуванням
var Position; // позиція точки
var velocity; // швидкість точки
var gravity; // гравітація точки
var force; // сила точки
var id = 0; // id точки
var point_arr = []; // Масив точок
var spring_arr = []; // Масив пружин

var btn_for_active_point = []; // масив кнопок 
var btn_for_active_spring = []; // масив кнопок 
var range_for_active_spring = []; // масив слайдерів
var range_for_active_point = []; // масив слайдерів
var range_for_active_point_vertical = []; // масив слайдерів
var range = []; // масив слайдерів
var plane = []; // масив полів
var Trace_path_arr = [1];
var Plot = []; // плотер - графік


setTimeout(mainSetup, 10);// виконується один раз із вказаною затримкою після старту
let intervalId = setInterval(mainLoop, 1);// Початковий інтервал



///////////////////////////////////////////////////////////////////////////////////////////////////
// цикл який  запуститься один раз на початку програми
//  
// ↓ 
// 
function mainSetup() {
    checkBox_function() // перевірити всі налаштування чекбоксів 
    prepare() // приготувати необхідні данні для створення точок і пружин в формі сітки
    rangeValue(); // викликати функцію для оновлення даних із повзунків

    // створити кнопку
    // Button(x, y, width, height, text, id)
    // варіант управління властивостями із другого об'єкта при натисненні
    // для точок
    btn_for_active_point[0] = new Button(1150, 50, 30, 20, "→", id = 0);
    btn_for_active_point[0].controlledObject = point_arr[0].acceleration; // Об'єкт або масив, який контролюватиметься 
    btn_for_active_point[0].propertyName = "x"; // Назва властивості, яку потрібно змінювати
    btn_for_active_point[0].value = 0.1; // значення яке будемо додавати до propertyName.

    btn_for_active_point[1] = new Button(1150, 75, 30, 20, "←", id = 0);
    btn_for_active_point[1].controlledObject = point_arr[0].velocity; // Об'єкт або масив, який контролюватиметься 
    btn_for_active_point[1].propertyName = "x"; // Назва властивості, яку потрібно змінювати
    btn_for_active_point[1].value = -0.1; // значення яке будемо додавати до propertyName.


    btn_for_active_point[2] = new Button(1150, 100, 30, 20, "↓", id = 0);
    btn_for_active_point[2].controlledObject = point_arr[0].velocity;
    btn_for_active_point[2].propertyName = "y";
    btn_for_active_point[2].value = 0.1;

    btn_for_active_point[3] = new Button(1150, 125, 30, 20, "↑", id = 0,);
    btn_for_active_point[3].controlledObject = point_arr[0].velocity;
    btn_for_active_point[3].propertyName = "y";
    btn_for_active_point[3].value = -0.1;

    // варіант виклику функції при натисненні
    btn_for_active_point[4] = new Button(1000, 200, 190, 20, "властивості вибраної точки ", id = 1);
    btn_for_active_point[4].Call_function = () => { getObjectValues2(point_arr[Mouse.selected_point_id_arr[0]]) }; // функція яку будем викликати при натисканні



    // для прижин
    btn_for_active_spring[0] = new Button(1100, 150, 90, 20, "довжина + ", id = 0);
    btn_for_active_spring[0].controlledObject = spring_arr[10];
    btn_for_active_spring[0].propertyName = "len";
    btn_for_active_spring[0].value = 1;

    btn_for_active_spring[1] = new Button(1100, 175, 90, 20, "довжина - ", id = 0);
    btn_for_active_spring[1].controlledObject = spring_arr[10];
    btn_for_active_spring[1].propertyName = "len";
    btn_for_active_spring[1].value = -1;




    //getObjectValues2(point_arr[Mouse.selected_point_id_arr[0]]);

    // створити слайдер
    //Range(x, y, width, height, min, max, value, text, id)

    // створити новий слайдер і передати йому властивість якою він буде управляти
    // Приклад використання:
    let controlledObject = spring_arr[10]; // Об'єкт, який буде контролюватися
    let propertyName = "len"; // Властивість об'єкта, яку потрібно змінювати
    range.push(new Range(1000, 240, 150, 15, 0, 100, 10, "Змінити довжину", id = 4, controlledObject, propertyName));
    // інший приклад
    range.push(new Range(1000, 270, 150, 15, 0, point_arr[43].Position.x * 2, point_arr[43].Position.x, "Змінити позицію", id = 4, point_arr[43].Position, "x"));
    range_for_active_spring.push(new Range(1000, 300, 150, 15, 0, spring_arr[0].len * 2, spring_arr[0].len, "Змінити довжину вибраної точки ", id = 4, spring_arr[0], "len"));
    range_for_active_point.push(new Range(1000, 330, 150, 15, 0, point_arr[1].Position.x, point_arr[1].Position.x, "Змінити позицію", id = 4, point_arr[1].Position, "x"));
    range_for_active_point.push(new Range(1000, 360, 150, 15, 0, point_arr[1].Position.y * 2, point_arr[1].Position.y, "Змінити позицію", id = 4, point_arr[1].Position, "y"));
    range_for_active_point_vertical.push(new Range_vertical(1170, 400, 15, 150, 0, point_arr[1].Position.y, point_arr[1].Position.y, "Змінити позицію", id = 4, point_arr[1].Position, "y"));

    // створити нове поле 
    plane[0] = new Plane(950, 20, 100, 100, "Поле", id = 1);


    // створити слід від точки
    Trace_path_arr[0] = new Trace_path(10);
    Trace_path_arr[1] = new Trace_path(10);

    // створення об'эктів для графіку 
    //конструктор (позиція x ,позиція y,висота , ширина,"назва","тип") 
    Plot[0] = new Plotter(-200, 700, 100, 500, "швидкість", "horisontal");
    Plot[1] = new Plotter(100, -500, 100, 500, "сила", "horisontal");
    Plot[2] = new Plotter(100, 350, 100, 500, "прискорення", "horisontal");
    Plot[3] = new Plotter(-200, 0, 200, 200, "позиція y", "horisontal");
    Plot[4] = new Plotter(0, -200, 200, 800, "позиція x", "vertical");
    Plot[5] = new Plotter(2000, -200, 200, 200, "позиція x 2", "vertical");
    Plot[6] = new Plotter(-200, 500, 200, 200, "позиція y 2", "vertical");

}


function Plotter_init() {
    // малюэм графік
    if (Mouse.selected_point_id_arr[0] != undefined) {
       // let global_scale = Math.min(Plot[0].check_scale(), Plot[1].check_scale(), Plot[2].check_scale());
        let data;

        // швидкість
        Plot[0].color = "rgba(0, 0,255 , 0.5)";
        data = Math.abs(point_arr[Mouse.selected_point_id_arr[0]].velocity.x) + Math.abs(point_arr[Mouse.selected_point_id_arr[0]].velocity.y);
        Plot[0].push_data(data);
        Plot[0].draw();
        Plot[0].number_of_hiden_points=speed_range.value;

        // сила
        Plot[1].color = "rgba(0, 255,0 , 0.5)";
        data = Math.abs(point_arr[Mouse.selected_point_id_arr[0]].force.x) + Math.abs(point_arr[Mouse.selected_point_id_arr[0]].force.y);
        Plot[1].push_data(data);
        Plot[1].draw();
        Plot[1].number_of_hiden_points=speed_range.value;

        // прискорення
        Plot[2].color = "rgba(50, 50,50 , 0.5)";
        Plot[2].push_data(point_arr[Mouse.selected_point_id_arr[0]].acceleration.x);
        Plot[2].draw();
        Plot[2].number_of_hiden_points=speed_range.value;

        // позиція y
        Plot[3].color = "rgba(250, 100,50 , 0.9)";
        data = ( point_arr[Mouse.selected_point_id_arr[0]].Position.y);
        Plot[3].flip_data = 1;
        Plot[3].set_scale(1);
        Plot[3].auto_scale = false;
        Plot[3].push_data(data);
        Plot[3].draw();
        Plot[3].number_of_hiden_points=speed_range.value;

        // позиція x
        Plot[4].color = "rgba(250, 100,50 , 0.9)";
        data = (point_arr[Mouse.selected_point_id_arr[0]].Position.x);
        Plot[4].flip_data = 1;
        Plot[4].set_scale(1);
        Plot[4].auto_scale = false;
        Plot[4].push_data(data);
        Plot[4].draw();
        Plot[4].number_of_hiden_points = speed_range.value;

        // позиція x2
        data = (point_arr[Mouse.selected_point_id_arr[0]].force.y);
        Plot[5].color = "rgba(150, 250, 100 , 0.9)";
        Plot[5].number_of_hiden_points = speed_range.value;
         Plot[5].auto_scale = false;
        Plot[5].flip_data = 1;
        Plot[5].set_scale(1);
        Plot[5].push_data(data);
        Plot[5].draw();

        // позиція y2 
        data = (point_arr[Mouse.selected_point_id_arr[0]].force.y);
        Plot[6].color = "rgba(0, 0, 0 , 0.9)";
        Plot[6].number_of_hiden_points = speed_range.value;
       // Plot[6].auto_scale = false;
       // Plot[6].set_scale(1);
        Plot[6].push_data(data);
        Plot[6].draw();

    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
// цикл який працюватиме постійно
//  ←←
// ↓  ↑
//  →→

var startTime;
var endTime
var elapsedTime


function mainLoop() {

    elapsedTime = endTime - startTime;
    //console.log('Час одного циклу (ms):', elapsedTime);
    startTime = performance.now();

    // console.log (intervalId);
    // очищення фону кожен раз
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // оновлюємо всі точки. відбувається розрахунок фізики
    for (let i = 0; i < point_arr.length; i++) {
        point_arr[i].update(1); //  треба передати дельта Т
        // малюєм вектор сили гравітації для кожної точки
        Draw_arrow(point_arr[i].Position.x, point_arr[i].Position.y, 180, point_arr[i].gravity.y * graviti_scale_range.value, point_arr[i].gravity.y);
    }
    // сітка
    Grid();
    // малюєм всі кнопки
    Menu_elemets();
    // малюэм графік
    Plotter_init();
    // вивести інформацію про вибрані точки в навігаційне меню
   // point_info();
    // переміщати камеру за виділеною точкою
    Viewport_point_tracking();
    // намалювати щось
    //  Draw_polygon(Mouse.x,Mouse.y,angle_range.value);
    Mouse_action_function();
    // вмикаємо режим руйнування пружин
    destruction_mode();
    // якщо вибрана точка далеко выд курсора - не вибирати її
    Unselect_point();

    // Отримання посилання на textarea за його ідентифікатором
    const Point_list_textarea = document.getElementById('Point_list_textarea');
    Point_list_textarea.value = is_on_point();

    // малюєм слід від точки
    Trace_path_arr[0].draw(Mouse.selected_point_id_arr[1]);
    Trace_path_arr[1].draw(Mouse.selected_point_id_arr[2]);

    // проста лінія
    ctx.setLineDash([0, 0]);
    // пунктирна лінія
    // ctx.setLineDash([5,5]);
    // намалювати новий курсор у вигляді приціла
    //draw_img();2
    endTime = performance.now();
    //requestAnimationFrame(mainLoop);
}





///////////////////////////////////////////////////////////////////////////////////////////////////
// приготувати один із варіантів сітки
function prepare() {
    let id_ = 0;
    let springIndex = 0;
    let num_Row = 2;                            // число горизонтальних з'єднань
    let num_Col = 20;                           // число вертикальних з'єднань
    let size = 40;                              // розмір пружини
    let num_Springs = num_Row * num_Col * 1.6;
    let num_Points = num_Row * num_Col * 3;

    // створити точки
    for (let i = 0; i < num_Points; i++) {
        id = i;
        velocity = new PVector(0, 0);
        gravity = new PVector(0, 0.01);
        force = new PVector(0, 0);
        Position = new PVector(10, 10); // позиція
        point_arr[id] = new Point(Position, id); // Створюємо точку
        point_arr[id].set_mass(2); // Встановлюємо масу точки
        point_arr[id].set_gravity(gravity); // Встановлюємо гравітацію для точки
        point_arr[id].set_force(force); // Встановлюємо силу для точки
    }

    // створити пружини
    for (let id_ = 0; id_ < num_Springs; id_++) {
        spring_arr[id_] = new Spring(size, id_);
    }
    // в цьому циклі виконується з'єднання пружин із точками в трикутну сітку.
    // приклад побудови сітки із різними параметрами стовпців і рядів.
    //    1 --- 3
    //   /  \  /
    //  2 --- 4

    //    1 --- 3 --- 5
    //   /  \  /  \  /
    //  2 --- 4 --- 6

    //       1 --- 4 --- 7
    //      /  \  /  \  /
    //     2 --- 5 --- 8
    //    /  \  /  \  /
    //   3 --- 6 --- 9
    // Зовнішній цикл для стовпців
    for (let col = 1; col < num_Col; col++) {
        // Внутрішній цикл для рядків
        for (let row = 0; row < num_Row; row++) {
            id_++;
            point_arr[id_].Position.x = 200 + col * size - row * size / 2;
            point_arr[id_].Position.y = 100 + row * size;

            // З'єднання точок за допомогою пружин всередині циклу
            if (col < num_Col - 1) {
                const nextPointCol = id_ + num_Row;
                if (springIndex < num_Springs) {
                    spring_arr[springIndex].connect_point(id_, nextPointCol);// з'єднати пружини
                    springIndex++;
                }
            }
            conslog(springIndex);

            if (row < num_Row - 1) {
                const nextPointRow = id_ + 1;
                if (springIndex < num_Springs) {
                    spring_arr[springIndex].connect_point(id_, nextPointRow);// з'єднати пружини
                    springIndex++;
                }
            }
            conslog(springIndex);

            if (row < num_Row - 1) {
                const nextPointRow = id_ + num_Row + 1;
                if (springIndex < num_Springs) {
                    spring_arr[springIndex].connect_point(id_, nextPointRow);// з'єднати пружини
                    springIndex++;
                }
            }
            conslog("id = " + id_);
            conslog(springIndex);
        }
    }

    // створити опору в вузлі №15
    point_arr[2].set_anchor(true);
    // тип фіксації переміщень
    point_arr[2].anchor_type = "XY";

    // створити опору в вузлі №54
    point_arr[34].set_anchor(true);
    point_arr[34].anchor_type = "Y";

}











function Unselect_point() {
    if (point_arr[Mouse.selected_point_id_arr[0]] != undefined) {
        let x1 = point_arr[Mouse.selected_point_id_arr[0]].Position.x;
        let y1 = point_arr[Mouse.selected_point_id_arr[0]].Position.y;
        let x2 = Mouse.x;
        let y2 = Mouse.y;
        let dist = calculate_hypotenus(x1, y1, x2, y2);
        if (dist > 500) {
            point_arr[Mouse.selected_point_id_arr[0]].select_atribute = 0;
            Mouse.selected_point_id_arr[0] = null
        }
    }
}

function Menu_elemets() {

    for (let i = 0; i < plane.length; i++) {
        if (plane[i] != null) {
            plane[i].draw();
        }
    }

    for (let i = 0; i < btn_for_active_point.length; i++) {
        if (btn_for_active_point[i] != null) {
            btn_for_active_point[i].draw();
            // змінити точку до якої застосовуємо зміни на останню активну
            if ((point_arr[Mouse.selected_point_id_arr[0]] != undefined)) {
                btn_for_active_point[i].controlledObject = point_arr[Mouse.selected_point_id_arr[0]].velocity;
            }

        }
    }

    for (let i = 0; i < btn_for_active_spring.length; i++) {
        if (btn_for_active_spring[i] != null) {
            btn_for_active_spring[i].draw();
            // змінити точку до якої застосовуємо зміни на останню активну
            if ((spring_arr[Mouse.selected_spring_id_arr[0]] != undefined)) {
                btn_for_active_spring[i].controlledObject = spring_arr[Mouse.selected_spring_id_arr[0]];
            }

        }
    }

    for (let i = 0; i < range_for_active_spring.length; i++) {
        if (range_for_active_spring[i] != null) {
            range_for_active_spring[i].draw();
            // змінити точку до якої застосовуємо зміни на останню активну
            if ((spring_arr[Mouse.selected_spring_id_arr[0]] != undefined)) {
                range_for_active_spring[i].controlledObject = spring_arr[Mouse.selected_spring_id_arr[0]];
            }

        }
    }


    for (let i = 0; i < range_for_active_point.length; i++) {
        if (range_for_active_point[i] != undefined) {
            range_for_active_point[i].draw();
            // змінити точку до якої застосовуємо зміни на останню активну
            if ((point_arr[Mouse.selected_point_id_arr[0]] != undefined)) {
                range_for_active_point[i].controlledObject = point_arr[Mouse.selected_point_id_arr[0]].Position;
            }

        }
    }

    for (let i = 0; i < range_for_active_point_vertical.length; i++) {
        if (range_for_active_point_vertical[i] != undefined) {
            range_for_active_point_vertical[i].draw();
            // змінити точку до якої застосовуємо зміни на останню активну
            if ((point_arr[Mouse.selected_point_id_arr[0]] != undefined)) {
                range_for_active_point_vertical[i].controlledObject = point_arr[Mouse.selected_point_id_arr[0]].Position;
            }

        }
    }







    for (let i = 0; i < range.length; i++) {
        if (range[i] != null) {
            range[i].draw();
        }
    }

}





function Grid() {
    // треба доробити метод побудови нових сіток якщо ми виходимо за габарити екрана і при масштабуванні
    // при масштабуванні і переміщенні точки на велику відстань сітки з'являються із "запізненням"
    let grid_size = 800;
    let col_num = 4;
    let row_num = 3;

    let x_point = 1;
    let y_point = 1;


    /*
    if (Mouse.selected_point_id_arr[0]!=undefined)
        {
     x_point = point_arr[Mouse.selected_point_id_arr[0]].Position.x ;
     y_point = point_arr[Mouse.selected_point_id_arr[0]].Position.y ;
        }
        */
    x_point = Mouse.x;
    y_point = Mouse.y;

    for (let col = 0; col < grid_size * col_num; col = col + grid_size) {
        for (let row = 0; row < grid_size * row_num; row = row + grid_size) {
            if (true) {

                let x = -grid_size * col_num / 2 + grid_size * Math.round(x_point / grid_size);
                let y = -grid_size * row_num / 2 + grid_size * Math.round(y_point / grid_size);

                draw_grid(x + col, y + row, grid_size, grid_size, grid_size / 40);
                draw_grid(x + col, y + row, grid_size, grid_size, grid_size / 8);
                draw_grid(x + col, y + row, grid_size, grid_size, grid_size / 4);
                draw_grid(x + col, y + row, grid_size, grid_size, grid_size / 2);
            }

        }
    }
}