
// Функція для обчислення і всякі різні функції )

// округлення до певної кількості знаків після коми

// Округлення до певної кількості знаків після коми
function precision(number, num_of_digits_after_coma) {
    if (typeof number === 'number' && !isNaN(number)) {
        if (Math.abs(number) > Math.pow(10, -num_of_digits_after_coma)) {
            return Number(number.toFixed(num_of_digits_after_coma));
        } else {
            return 0;
        }
    } else {
     //   console.error("Input is not a valid number.");
      //  return NaN;
    }
}




// обчислення довжини гіпотенузи
// C^2=A^2+B^2
// A = x2-x1
// B = y2-y1
// C=sqrt(A^2+B^2)
function calculate_hypotenus(x1, y1, x2, y2)
{
    let hypotenus = Math.sqrt(  Math.pow(x2-x1,2) + Math.pow(y2-y1,2)  ) ;
  //  console.log(hypotenus);
    return hypotenus; 
}



// Функція для обчислення відстані від точки до відрізка
/*          
                            x1.y1
                            |
                            |
        *x.y ←----dist-----→|
                            |
                            |
                            x2.y2
 */

// Функція для обчислення відстані від точки до відрізка
function distToLine(x, y, x1, y1, x2, y2) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) {
        param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

// Функція для обчислення координат точки перпендикуляра від даної точки до відрізка
function Dot_on_Line(x, y, x1, y1, x2, y2) {
    // Знаходимо відстань від точки (x, y) до відрізка (x1, y1), (x2, y2)
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let t = -1;

    // Обчислюємо параметр t
    if (lenSq !== 0) {
        t = dot / lenSq;
    }

    let xx, yy;

    // Обчислюємо координати точки перпендикуляра
    if (t < 0) {
        xx = x1;
        yy = y1;
    } else if (t > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + t * C;
        yy = y1 + t * D;
    }

    return { x: xx, y: yy };
}

// глобальна Функція для обчислення кута між точками
function calculate_Angle(x1, y1, x2, y2) {
    // Обчислення різниці у координатах для обох відрізків
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Використання арктангенсу для обчислення кута у радіанах
    let angleRad = Math.atan2(deltaY, deltaX);

    // Перетворення кута з радіанів у градуси
    let angleDeg = angleRad * (180 / Math.PI);

    // Переконання, що кут у межах 0-360 градусів
    if (angleDeg < 0) {
        angleDeg += 360;
    }

    return angleDeg; // Повертаємо кут у градусах
}


function point_info() {
    let pos_x = 540;
    let step = 15;
    ctx.font = "20px serif"; // шрифт
    ctx.fillText(Mouse.selected_point_id_arr[0] + " - вибрана точка", 20, pos_x + step * 0);
    ctx.fillText(Mouse.selected_point_id_arr[1] + " - точка №1", 20, pos_x + step * 1);
    ctx.fillText(Mouse.selected_point_id_arr[2] + " - точка №2", 20, pos_x + step * 2);
    ctx.fillText(Mouse.selected_spring_id_arr[0] + " - вибрана пружина", 20, pos_x + step * 3);
  
    ctx.setLineDash([5,5]);
    rectangle_s(10, 500, 350, 90);
}


        // за допомогою цієї функції можна закоментувати всі виводи в консоль одночасно.
        function conslog(txt) {
            if (checkBox_1_global.checked == true) {
                console.log(txt);
            } else {
            }
        }

