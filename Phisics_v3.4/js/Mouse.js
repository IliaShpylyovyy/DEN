// Клас для координат миші
// самий поганий код який треба переписати і упростити

class MousePosition { // просто зружно зберігати в одному місці данні про координати миші по X і Y.
    constructor(x, y) {
        this.x = x; //  координати курсора по x у світі програми
        this.y = y; //  координати курсора по y у світі програми
        this.x_s = x; //  координати курсора по x відносно екрану
        this.y_s = y; //  координати курсора по y відносно екрану
        this.x_temp = 0;
        this.y_temp = 0;


        this.x_delta_s = 0;
        this.y_delta_s = 0;
        this.x_mouse_down_s = 1;//  координати курсора по x, коли була натиснута кнопка мишка 
        this.y_mouse_down_s = 1;//  координати курсора по y, коли була натиснута кнопка мишка 
        this.x_mouse_up_s = 1;
        this.y_mouse_up_s = 1
        this.zoom = 1; // зум viewport
        // панорама треба для переміщення по viewport
        this.pan_x = 0; // панорама по x
        this.pan_y = 0; // панорама по y

        // стан кнопок
        this.btn_0_down = false; // ліва кнопка миші не натиснута
        this.btn_1_down = false; // ролик
        this.btn_2_down = false; // права кнопка миші не натиснута
        this.btn_3_down = false; // права і ліва кнопка миші не натиснута

        this.btn_0_up = false; // ліва кнопка миші не відтиснута
        this.btn_1_up = false; // ролик
        this.btn_2_up = false; // права кнопка миші не відтиснута
        this.btn_3_up = false; // права і ліва кнопка миші не відтиснута

        // клік для кнопок
        this.btn_0_click = false;
        this.btn_1_click = false;
        this.btn_2_click = false;
        this.btn_3_click = false;

               // клік для кнопок
               this.btn_0_click_count = 0;
               this.btn_1_click_count = 0;
               this.btn_2_click_count = 0;
               this.btn_3_click_count = 0;


        this.selected_point_id_arr = [null, 1, 2, 3];// масив точок які вибрані
        this.selected_spring_id_arr = [null, 1, 2, 3];// масив пружин які вибрані

        this.list_created = false; // порядковий номер листа ы його стан. true - був створений 
        this.cursor_is_on_gui = false;

    }
}

document.getElementById("canvas").addEventListener("wheel", wheel_Function);

/*
function counter ()
{
    this.btn_0_click_count++;
    this.btn_1_click_count++;
    this.btn_2_click_count++;
    this.btn_3_click_count++;
}
*/


///  Моніторим яку кенопку натискаєм мишкою
const Mouse = new MousePosition(0, 0);// Об'єкт для зберігання координат миші

let canvasElem = document.querySelector("canvas");// Отримання координат миші
canvasElem.addEventListener("mousemove", function (e) {// коли мишка рухається
    mousemove_function(e);
});
canvasElem.addEventListener("mousedown", function (e) {// коли мишка натиснута
    mousedown_function(e);
});
canvasElem.addEventListener("mouseup", function (e) {// коли мишка "відтиснута"
    mouseup_function(e);
});


canvasElem.addEventListener("click", function (e) {// коли мишка "відтиснута"
    mouseclick_function(e);
});

document.addEventListener("keydown", function (e) {
    keydown_function(e);
});



// виводимо порядковий номер точки на якій стоїть курсор
function is_on_point() {
    let point_list = []
    let spot = 2; // границя відступу від точки
    //якщо курсор знаходиться на цій точці
    for (let id = 0; id < point_arr.length; id++) {
        if (Mouse.x < point_arr[id].Position.x + spot &&
            Mouse.x > point_arr[id].Position.x - spot &&
            Mouse.y < point_arr[id].Position.y + spot &&
            Mouse.y > point_arr[id].Position.y - spot) {
            point_list.push(id);
        } else {

        }
    }
    return (point_list);
}





// функції миші

function Mouse_action_function() {
    const spot = 5; // Радіус області навколо точки, де курсор вважається на точці
    ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // Чорний колір для контексту малювання

    // Перебираємо всі точки 
    for (let id = 0; id < point_arr.length; id++) {
        // Перевіряємо, чи курсор миші на даній точці
        if (is_cursor_on_point(id, spot)) {
            do_cursor_on_point(id); // Обробляємо подію, коли курсор на точці
        } else {
            // Ваша логіка, якщо курсор не на точці
        }

        // Обробляємо натискання лівої кнопки миші
        if (Mouse.btn_1_down && Mouse.selected_point_id_arr[0] !== null) {
            handle_mouse_btn_1();
        }

        // Обробляємо натискання правої кнопки миші
        if (Mouse.btn_2_down && Mouse.selected_point_id_arr[0] !== null) {
            handle_mouse_btn_2();
        }
    }

    // Перебираємо всі пружини 
    for (let id = 0; id < spring_arr.length; id++) {
        // курсор на пружині ?
        if (is_cursor_on_spring(id, spot)) {
            // робимо щось
            do_cursor_on_spring(id);
            Mouse.selected_spring_id_arr[0] = id;
        } else {
            // шукаємо  атрибути які не 0
            if (spring_arr[id].select_atribute != 0) {
                // ставимо атрибут 0
                spring_arr[id].select_atribute = 0;
            }
        }
    }

}


// Перевіряє, чи курсор миші знаходиться на точці з вказаним ідентифікатором
function is_cursor_on_point(id, spot) {
    const point = point_arr[id];
    const x_within_range = Mouse.x >= point.Position.x - spot && Mouse.x <= point.Position.x + spot;
    const y_within_range = Mouse.y >= point.Position.y - spot && Mouse.y <= point.Position.y + spot;
    return x_within_range && y_within_range;
}


// Перевіряє, чи курсор миші знаходиться на пружині з вказаним ідентифікатором
function is_cursor_on_spring(id, spot) {

    const point1 = spring_arr[id].firstPoint_id;
    const point2 = spring_arr[id].SecondPoint_id;

    // Координати точок пружини
    const x1 = point_arr[point1].Position.x;
    const y1 = point_arr[point1].Position.y;
    const x2 = point_arr[point2].Position.x;
    const y2 = point_arr[point2].Position.y;


    // Відстань між точкою і відрізком пружини
    const dist = distToLine(Mouse.x, Mouse.y, x1, y1, x2, y2);

    // Чи знаходиться курсор між точками пружини з урахуванням spot
    return dist <= spot;

}

// робимо запис всіх об'єкти вобраної пружини
function do_cursor_on_spring(id) {
    if (Mouse.selected_spring_id_arr[0] !== undefined) {
        spring_arr[id].select_atribute = 1;
        conslog("Курсор на пружині");

        const textarea = document.getElementById('Spring_list_textarea');
        const selectedSpring = spring_arr[Mouse.selected_spring_id_arr[0]];
        const valuesString = " Вибрана пружина № " + Mouse.selected_spring_id_arr[0] + getObjectValues(selectedSpring);
        textarea.value = valuesString;
    }

}


// Обробка події, коли курсор миші знаходиться на точці з вказаним ідентифікатором
function do_cursor_on_point(id) {
    const is_new_point = Mouse.selected_point_id_arr[0] !== id;
    if (is_new_point) {
        Mouse.selected_point_id_arr[0] = id;
    }
    point_arr[id].select_atribute = 1;



    const textarea = document.getElementById('parametr_list');
    const selectedPoint = point_arr[Mouse.selected_point_id_arr[0]];
    const valuesString = " Вибрана точка № " + Mouse.selected_point_id_arr[0] + getObjectValues(selectedPoint);
    textarea.value = valuesString;


    /*
         console.log(" такий елемент вже э " + selectedPoint.id);
         // Отримання елемента, до якого будемо додавати повзунки
         const sliderColumn = document.getElementById('slider_column');
 
         // Функція для створення та додавання нового повзунка
         function createSlider(id, label, min, max, step, value) {
             const sliderLabel = document.createElement('label');
             sliderLabel.textContent = label;
             sliderLabel.setAttribute('for', id);
 
             const slider = document.createElement('input');
             slider.type = 'range';
             slider.id = id;
             slider.min = min;
             slider.max = max;
             slider.step = step;
             slider.value = value;
 
             sliderColumn.appendChild(sliderLabel);
             sliderColumn.appendChild(slider);
         }
         
        
         // Створення та додавання повзунків для кожного параметра точки
         // for each  getObjectValues element
         for (const parametr in getObjectValues(selectedPoint)) {
             createSlider('x_pos_slider', parametr, 0, 1000, 1, 0);
         }
         */



    // Додайте подібні команди для інших параметрів точки




    // Оновлюємо інформацію про вибрану точку та в текстовому полі
    if (Mouse.selected_point_id_arr[0] !== Mouse.selected_point_id_arr[1]) {
        const prev_selected_point = point_arr[Mouse.selected_point_id_arr[1]];
        prev_selected_point.select_atribute = 2;
        point_arr[Mouse.selected_point_id_arr[2]].select_atribute = 0;

        console.log("зелена точка № " + Mouse.selected_point_id_arr[0] + " червона точка № " + Mouse.selected_point_id_arr[1]);

        Mouse.selected_point_id_arr[2] = Mouse.selected_point_id_arr[1];
        Mouse.selected_point_id_arr[1] = Mouse.selected_point_id_arr[0];
    }
}






// Функція для отримання значень з об'єкта та його вкладених об'єктів
function getObjectValues(obj, prefix = '') {
    let values = '';
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                values += getObjectValues(value, prefix + key + '.');
            } else {
                values += "\n" + prefix + key + " : " + value;
            }
        }
    }
    return values;
}










// Обробка натискання лівої кнопки миші для перетаскування точки
function handle_mouse_btn_1() {

    // Додаємо силу до точки, якщо вона досягла мінімального порогу
    if (point_arr[Mouse.selected_point_id_arr[0]].anchor == false) {
        point_arr[Mouse.selected_point_id_arr[0]].set_Position(Mouse.x, Mouse.y);
    } else {

        point_arr[Mouse.selected_point_id_arr[0]].Position.x = Mouse.x;
        point_arr[Mouse.selected_point_id_arr[0]].Position.y = Mouse.y;

    }

}

// Обробка натискання правої кнопки миші для перетаскування точки
function handle_mouse_btn_2() {
    const force = calculate_force();
    // якщо курсор не на опорі  то тянемо із певною силою
    if (point_arr[Mouse.selected_point_id_arr[0]].anchor == false) {
        point_arr[Mouse.selected_point_id_arr[0]].force.x = force.x * 200;
        point_arr[Mouse.selected_point_id_arr[0]].force.y = force.y * 200;


    } else {
        // якщо курсор на опорі то переміщуємо точку з опорою
        point_arr[Mouse.selected_point_id_arr[0]].velocity.x *= 0.9;
        point_arr[Mouse.selected_point_id_arr[0]].velocity.y *= 0.9;

        point_arr[Mouse.selected_point_id_arr[0]].Position.x = Mouse.x;
        point_arr[Mouse.selected_point_id_arr[0]].Position.y = Mouse.y;
    }
}

// Обчислення сили, яка діє на точку від курсора миші
function calculate_force() {
    const mouse_x_force = (Mouse.x - point_arr[Mouse.selected_point_id_arr[0]].Position.x) * 0.0001;
    const mouse_y_force = (Mouse.y - point_arr[Mouse.selected_point_id_arr[0]].Position.y) * 0.0001;
    return new PVector(mouse_x_force, mouse_y_force);
}






function wheel_Function(event) {
    if (event.deltaY > 0) {
        Mouse.zoom = Mouse.zoom / 1.1
    } else {
        Mouse.zoom = Mouse.zoom * 1.1
    }
    // Mouse.zoom += -event.deltaY / 1000;// Отримуємо значення прокрутки колесика миші
    // не працює правильно
    // Збільшення при розрахунку панорами
    // Mouse.pan_x = Mouse.x_delta_s + Mouse.x_temp;//переміщення
    // Mouse.pan_y = Mouse.y_delta_s + Mouse.y_temp;//переміщення




    conslog("pan_x = " + Mouse.pan_x);
    conslog("pan_y = " + Mouse.pan_y);

    conslog("x_delta_s = " + Mouse.x_delta_s);
    conslog("y_delta_s = " + Mouse.y_delta_s);

    conslog("Wheel delta: " + event.deltaY); // 
    conslog("Mouse.zoom = " + Mouse.zoom); // накопичені данні 
    conslog("    "); // накопичені данні 

}


function mousemove_function(event) { // коли мишка рухається
    let rect = canvasElem.getBoundingClientRect();

    // Перевірка, чи канвас розгорнутий на весь екран
    if (document.fullscreenElement) {
        // Під час повноекранного режиму, отримуємо координати відносно канвасу
        Mouse.x_s = event.clientX;
        Mouse.y_s = event.clientY;
    } else {
        // В іншому випадку використовуємо координати відносно екрану
        Mouse.x_s = event.clientX - rect.left;
        Mouse.y_s = event.clientY - rect.top;
    }

    // координати відносно екрану



    

    // при переміщенні коли натиснутий ролик
    if (Mouse.btn_0_down == true && Mouse.cursor_is_on_gui==false) {
        circle(Mouse.x_s, Mouse.y_s, 10);

        Mouse.x_delta_s = Mouse.x_s - Mouse.x_mouse_down_s; //дистанція між натиском і відпуском кнопки
        Mouse.y_delta_s = Mouse.y_s - Mouse.y_mouse_down_s; //дистанція між натиском і відпуском кнопки 

        // накопичене зміщення - панорама
        Mouse.pan_x = Mouse.x_delta_s + Mouse.x_temp;//переміщення
        Mouse.pan_y = Mouse.y_delta_s + Mouse.y_temp;//переміщення

        conslog("_x = " + Mouse.x);
        conslog("_y = " + Mouse.y);

        conslog("pan_x = " + Mouse.pan_x);
        conslog("pan_y = " + Mouse.pan_y);

        conslog("x_delta_s = " + Mouse.x_delta_s);
        conslog("y_delta_s = " + Mouse.y_delta_s);

    }
    // переводимо координати з урахуванням зуму і зміщення світу
    Mouse.x = Mouse.x_s / Mouse.zoom - Mouse.pan_x / Mouse.zoom;
    Mouse.y = Mouse.y_s / Mouse.zoom - Mouse.pan_y / Mouse.zoom;



}


// коли мишка натиснута
// викликається один раз при кожному натисканні
function mousedown_function(event) {
    //conslog(event);
    if (event.button == 1) { // 1 відповідає ролику 
        Mouse.btn_1_down = !Mouse.btn_1_down; // змінити стан кнопки на протилежний (true ←→ false)
        circle(Mouse.x, Mouse.y, 10, 10);
        conslog("Ролик нажатий");
        conslog(Mouse.btn_0_down);
        point_arr[Mouse.selected_point_id_arr[0]].activate_anchor(true);

        Mouse.btn_1_click = true;
        console.log("Mouse.btn_1_click - " + Mouse.btn_1_click);

    } 

     if (event.button == 0) { // 0 відповідає лівій кнопці миші
        Mouse.btn_0_down = !Mouse.btn_0_down;// змінити стан кнопки на протилежний (true ←→ false)

        conslog("ЛКМ_натиснута");
        Mouse.x_mouse_down_s = Mouse.x_s;
        Mouse.y_mouse_down_s = Mouse.y_s;
        conslog("x_mouse_down_s = " + Mouse.x_mouse_down_s);
        conslog("y_mouse_down_s = " + Mouse.y_mouse_down_s);
        console.log("Mouse.btn_0_click - " + Mouse.btn_0_click);

    }

      if (event.button == 2) { // 2 відповідає правій кнопці миші
        Mouse.btn_2_down = !Mouse.btn_2_down;// змінити стан кнопки на протилежний (true ←→ false)
        rectangle(Mouse.x - 5, Mouse.y - 5, 10, 10);
        conslog("down 2");

        Mouse.btn_2_click = true;
        console.log("Mouse.btn_2_click - " + Mouse.btn_2_click);
    }

     if (event.buttons == 3) { //  обидві кнорпки
        Mouse.btn_3_down = !Mouse.btn_3_down; // змінити стан кнопки на протилежний (true ←→ false)
        rectangle(Mouse.x - 5, Mouse.y - 5, 10, 10);
        conslog("down 3");

        Mouse.btn_3_click = true;
        console.log("Mouse.btn_3_click - " + Mouse.btn_3_click);
    }
}


function mouseup_function(event) {// коли мишка "відтиснута"

    if (event.button == 0) { // 1 відповідає ролику
        Mouse.btn_0_down = !Mouse.btn_0_down;// змінити стан кнопки на протилежний (true ←→ false)
        conslog("ЛКМ_відпущена ");

        // записати координати відпускання кнопки
        Mouse.x_mouse_up_s = Mouse.x_s;
        Mouse.y_mouse_up_s = Mouse.y_s;

        // розрахувати дистанцію між натисканням і відтисканням кнопки
        Mouse.x_delta_s = Mouse.x_mouse_up_s - Mouse.x_mouse_down_s;
        Mouse.y_delta_s = Mouse.y_mouse_up_s - Mouse.y_mouse_down_s;

        // записати тимчасові данні про панораму. "накопичене зміщення"
        Mouse.x_temp = Mouse.pan_x;
        Mouse.y_temp = Mouse.pan_y;

        conslog("x_mouse_up_s = " + Mouse.x_mouse_up_s);
        conslog("y_mouse_up_s = " + Mouse.y_mouse_up_s);

        conslog("x_delta_s = " + Mouse.x_delta_s);
        conslog("y_delta_s = " + Mouse.y_delta_s);

        conslog("pan_x = " + Mouse.pan_x);
        conslog("pan_y = " + Mouse.pan_y);
        conslog("                          ");

        Mouse.btn_0_click = false;
    }

  

    //conslog(event);
    if (event.button == 1) { // 0 відповідає лівій кнопці миші
        Mouse.btn_1_down = !Mouse.btn_1_down; // змінити стан кнопки на протилежний (true ←→ false)
        conslog("ЛКМ up 1");

        Mouse.btn_1_click = false;
    }

    if (event.button == 2) { // 2 відповідає правій кнопці миші
        Mouse.btn_2_down = !Mouse.btn_2_down;// змінити стан кнопки на протилежний (true ←→ false)
        conslog("ПКМ up 2");

        Mouse.btn_2_click = false;
    }

    if (event.buttons == 3) { // обидві кнорпки
        if (Mouse.btn_3_down) {
        }
        Mouse.btn_3_down = !Mouse.btn_3_down; // змінити стан кнопки на протилежний (true ←→ false)
        conslog("колесо up 3");

        Mouse.btn_3_click = false;
    }
}

function mouseclick_function(event) {
console.log(event);
}



