// цей клас створює звязок мід точками із класу point.
class Spring {
    constructor(lenin, idin) {                // конструктор
        this.name = "Spring";
        this.firstCall = 1;                   // перший цикл для функції connect()
        this.len = lenin;                     // відстань між двома точками - довжина пружини у спокійному стані
        this.k = 0.1;                         // жорсткість пружини. краще встановлювати в межах 0.02-0.5
        this.scale_force = 10;                // масштаб для векторів сили/реакції
        this.scale_stress_positive = 200;     // масштаб для кольору лінії при стисканні
        this.scale_stress_negative = 200;     // масштаб для кольору лініїї при стисненні
        this.scale_thiknes = 0.2;             // масштаб товщини лінії при зміні стиску/розтягнення
        this.id = idin;                       // ідентифікатор
        this.firstPoint_id;                   // перша точка для пружини за замовчуванням
        this.SecondPoint_id;                  // друга точка для пружини за замовчуванням
        this.firstPoint;                      // об'эктр класу Point
        this.SecondPoint;                     // об'эктр класу Point
        this.stretch = 0.0;                   // розтянутість  для пружини за замовчуванням
        this.angle = 0.0;                     // кут пружини
        this.force = 0.0;                     // сила мотора
        this.motor = false;                   // стан пружини як мотора
        this.motor_angle = 0;                 // кут повороту мотора
        this.motor_speed = 0.1;               // швидкість мотора
        this.direction = -1;                  // напрямок повороту мотора
        this.select_atribute = 0;             // якщо пружина вибрана, встановити їй цей атрибут
        // 0 - пружина не вибрана
        // 1 - пружина вибрана як №1  (зелена)
        // 2 - пружина вибрана як №2  (червона)
        this.points = [
            { x: 10, y: 20 },
        ];
    }

    update() {

        /*
        // Додавання нової точки до масиву
        let newPoint = { x: 70, y: 80 };
        this.points.push(newPoint);
*/
        /*
                // Доступ до значень точок
                console.log("        "); 
                console.log(this.points[0].x);
                console.log(this.points[0].y);
                */


        //console.log ( this.joint);
        // якщо пружина без жорсткості, то її не треба обробляти
        // це може бути використано при руйнуванні
        // при цьому параметри пружини зберігаються і
        //if (this.k > 0.1) {
        // Намалюватmake_motorи список створених пружин
        ctx.fillStyle = "rgba(0, 100, 255, 1)";// колір заповнення для тексту
        //текст і його позиція
        // Text("Spring id = " + this.id + " point id = " + " ( " + this.firstPoint_id + "." + this.SecondPoint_id + " ) ", 10, 1000, this.firstPoint_id * 20 + 50);
        if (this.firstPoint_id === undefined) {
            return;
        }
            
    
        // Визначення newforce
        // відняти першу точку від другої
        var newforce = new PVector(point_arr[this.firstPoint_id].Position.x - point_arr[this.SecondPoint_id].Position.x,
            point_arr[this.firstPoint_id].Position.y - point_arr[this.SecondPoint_id].Position.y);
        // Вивід результату
        let dist = 0.0; // магнітуда вектора
        dist = newforce.mag(); // магнітуда вектора
        this.stretch = (dist - this.len); //
        newforce.normalize(); // нормалізувати
        newforce.mult(-1 * this.k * this.stretch); // розтягнути

   
        // передача точкам сили    0--f←→f--O
        point_arr[this.firstPoint_id].velocity.x = point_arr[this.firstPoint_id].velocity.x + newforce.x; //перша точка
        point_arr[this.firstPoint_id].velocity.y = point_arr[this.firstPoint_id].velocity.y + newforce.y; //перша точка

        point_arr[this.SecondPoint_id].velocity.x = point_arr[this.SecondPoint_id].velocity.x - newforce.x; //друга точка
        point_arr[this.SecondPoint_id].velocity.y = point_arr[this.SecondPoint_id].velocity.y - newforce.y; //друга точка

        

        ctx.setLineDash([0, 0]);

        this.draw_line();
        // трикутник між точками
        // this. draw_triangle();
        // точка на лінії
        //this.draw_point_on_line_far_from_selected_point(-this.stretch + this.len / 2);
        // текст
        this.draw_text();

        ctx.lineWidth = (1);// товщина лінії

        line(point_arr[this.SecondPoint_id].Position.x + (newforce.x * this.scale_force),
            point_arr[this.SecondPoint_id].Position.y + (newforce.y * this.scale_force),
            point_arr[this.SecondPoint_id].Position.x - (newforce.x * this.scale_force),
            point_arr[this.SecondPoint_id].Position.y - (newforce.y * this.scale_force)); //// реакція лили від першої точки

        line(point_arr[this.firstPoint_id].Position.x + (newforce.x * this.scale_force),
            point_arr[this.firstPoint_id].Position.y + (newforce.y * this.scale_force),
            point_arr[this.firstPoint_id].Position.x - (newforce.x * this.scale_force),
            point_arr[this.firstPoint_id].Position.y - (newforce.y * this.scale_force)); //// реакція лили від першої точки 

        //////////////// вектори сили в навігаторі 
        ctx.lineWidth = (1);// товщина лінії
        line(100, 100, 100 + newforce.x * this.scale_force, 100 + newforce.y * this.scale_force);
        ctx.lineWidth = (1);// товщина лінії

        // Вирахувати кут положення пружини
        this.angle = calculate_Angle(
            point_arr[this.firstPoint_id].Position.x,
            point_arr[this.firstPoint_id].Position.y,
            point_arr[this.SecondPoint_id].Position.x,
            point_arr[this.SecondPoint_id].Position.y)
        //console.log(this.angle);
        // }
        // оновити мотор
        this.run_motor();
    }



    draw_point_on_line_far_from_selected_point(dist) {
        let x1 = point_arr[this.firstPoint_id].Position.x;
        let y1 = point_arr[this.firstPoint_id].Position.y;
        let x2 = point_arr[this.SecondPoint_id].Position.x;
        let y2 = point_arr[this.SecondPoint_id].Position.y;
        let hypotenus = calculate_hypotenus(x1, y1, x2, y2);
        let devider = (hypotenus / dist);
        let x3 = x1 + (x2 - x1) / devider;
        let y3 = y1 + (y2 - y1) / devider;
        let r = 5;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        circle(x3, y3, r);
        //   this.points[0].x = x3;
        //   this.points[0].y = y3;1
        Text("( " + x3.toFixed(1) + " , " + y3.toFixed(1) + " ) ", 9, x3 + 10, y3);
    }



    draw_triangle() {
        let x1 = point_arr[this.firstPoint_id].Position.x;
        let y1 = point_arr[this.firstPoint_id].Position.y;
        let x2 = point_arr[this.SecondPoint_id].Position.x;
        let y2 = point_arr[this.SecondPoint_id].Position.y;
        line(x1, y1, x2, y2);
        line(x2, y1, x2, y2);
        line(x1, y1, x2, y1);
    }



    draw_text() {
        // намалювати текст
        if (checkBox_Spring_number.checked == true) {
            ctx.fillStyle = "rgba(" + this.stretch / this.scale_thiknes + ", 0, 0, 1)";

            Text("" + this.id, 5, (point_arr[this.firstPoint_id].Position.x + point_arr[this.SecondPoint_id].Position.x) / 2, (point_arr[this.firstPoint_id].Position.y + point_arr[this.SecondPoint_id].Position.y) / 2);
        }
        // колір тексту значення сиили
        // якщо більше 0 - червоне
        // якщо менше 0 - синє
        if (checkBox_stretch.checked == true) {
            if (this.stretch > 0) {
                ctx.fillStyle = "rgba(" + this.stretch * 15 + ", 0, 0, 1)";
            } else {
                ctx.fillStyle = "rgba(0, 0, " + this.stretch * -1 * 100 + ", 1)";
            }
            // розмір шрифту в залежності від навантаження
            let size = Math.round(Math.abs(this.stretch / 2)) + 10; // шриифт
            // написати величину розтяжнення над пружиною
            Text("" + (this.stretch).toFixed(1), size, (point_arr[this.firstPoint_id].Position.x + point_arr[this.SecondPoint_id].Position.x) / 2, (point_arr[this.firstPoint_id].Position.y + point_arr[this.SecondPoint_id].Position.y) / 2 + 10);
            // написати кут під пружиною
            // Text("" + (this.angle).toFixed(1), size, (point_arr[this.firstPoint_id].Position.x + point_arr[this.SecondPoint_id].Position.x) / 2, (point_arr[this.firstPoint_id].Position.y + point_arr[this.SecondPoint_id].Position.y) / 2 - 10);
        }


    }

    set_len(len_in) {// змінити довжину пружини
        this.len = len_in;
    }
    // з'єднуюємо дві точки (класи "Point") між собою
    connect_point(firstPoint_id_in, SecondPoint_id_in) {
        this.firstPoint_id = firstPoint_id_in;
        this.SecondPoint_id = SecondPoint_id_in;
    }
    // роз'єднуємо дві вибрані точки - переназначаємо звязок пружини між
    // вибраними точками на звязок між точкою 0 і точкою 0 )).
    disconnect_point(firstPoint_id_in, SecondPoint_id_in) {
        this.firstPoint_id = 0;
        this.SecondPoint_id = 0;
    }


    draw_line() {

        //////////////// вектори сили на кінці пружини 
        if (this.stretch < 0) {//- синій колір при стисненні
            ctx.strokeStyle = "rgba(0, 0, " + -this.stretch * this.scale_stress_negative + ", 0.7)";
            ctx.lineWidth = (5 * this.k + -this.stretch * this.scale_thiknes);// товщина лінії
        }

        if (this.stretch > 0) {// + //- червоний колір при розтягненні
            ctx.strokeStyle = "rgba(" + this.stretch * this.scale_stress_positive + ", 0, 0, 0.7)";
            ctx.lineWidth = (5 * this.k + this.stretch * this.scale_thiknes);// товщина лінії
        }


        line(point_arr[this.firstPoint_id].Position.x,
            point_arr[this.firstPoint_id].Position.y,
            point_arr[this.SecondPoint_id].Position.x,
            point_arr[this.SecondPoint_id].Position.y); //// основна лінія пружини             textSize(11);    


        // атрибути точок ("підствітка точок")
        // атрибут для всіх точок за замовчуванням (чорний кружечок)
        if (this.select_atribute == 0) {

            // атрибут (зелений кружечок)
        } else if (this.select_atribute == 1) {
            ctx.strokeStyle = "rgba(0, 200, 0, 1)";
            ctx.lineWidth = 2;
            line(point_arr[this.firstPoint_id].Position.x,
                point_arr[this.firstPoint_id].Position.y,
                point_arr[this.SecondPoint_id].Position.x,
                point_arr[this.SecondPoint_id].Position.y);

            circle(point_arr[this.firstPoint_id].Position.x, point_arr[this.firstPoint_id].Position.y, 3);
            circle(point_arr[this.SecondPoint_id].Position.x, point_arr[this.SecondPoint_id].Position.y, 3);
            // атрибут (червоний кружечок)
        } else if (this.select_atribute == 2) {

            // атрибут (синій кружечок)
        } else if (this.select_atribute == 3) {

        }


    }
    make_motor(state, force_in, direction_in) {
        this.motor = state;
        this.force = force_in;
        this.direction = direction_in;
    }

    run_motor() {
        if (this.motor == true) {
            if (this.motor_angle > 360) {
                this.motor_angle = 0;
            }

            if (this.force == 0) {
                // переміщення навколо точки (момент безкінечний)
                let X = point_arr[this.SecondPoint_id].Position.x;
                let Y = point_arr[this.SecondPoint_id].Position.y;

                this.motor_angle = this.motor_angle + this.motor_speed * this.direction;
                let force = new PVector(Math.cos(this.motor_angle * Math.PI / 180) * this.len + X, Math.sin(this.motor_angle * Math.PI / 180) * this.len + Y);

                point_arr[this.firstPoint_id].set_anchor(true);
                point_arr[this.SecondPoint_id].set_anchor(true);

                point_arr[this.firstPoint_id].Position.x = force.x;
                point_arr[this.firstPoint_id].Position.y = force.y;

                ctx.strokeStyle = "rgba(0, 200, 0, 0.5)";

                ctx.setLineDash([5, 5]);
                circle(X, Y, this.len);
                // console.log (force);
            }
            else if (this.force > 0) {
                let X = point_arr[this.SecondPoint_id].Position.x;
                let Y = point_arr[this.SecondPoint_id].Position.y;
                // момент задається силою
                point_arr[this.SecondPoint_id].set_anchor(true);
                this.motor_angle = this.angle + 90 * this.direction; // сила на плече під вказаним кутом 
                let force = new PVector(Math.cos(this.motor_angle * Math.PI / 180), Math.sin(this.motor_angle * Math.PI / 180));
                point_arr[this.firstPoint_id].force.x = + force.x * this.force;
                point_arr[this.firstPoint_id].force.y = + force.y * this.force;

                ctx.setLineDash([5, 5]);
                ctx.strokeStyle = "rgba(200, 200, 0, 0.5)";
                circle(X, Y, this.len);
            }
        }

    }


}

//режим руйнування пружин
function destruction_mode() {
    // оновлюємо всі пружини. відбувається розрахунок зв'язків між точками
    for (let i = 0; i < spring_arr.length; i++) {
        spring_arr[i].update();
        // руйнувати пружину якщо стрес більший ніж вказано
        if ((spring_arr[i].stretch > 4) & (checkBox_destruction.checked == true)) {
            delete_spring(i)
        }
    }
}


function delete_spring(id) {
    spring_arr[id].disconnect_point(1, 1);
    spring_arr[id].k = 0;
}
// видалити пружину