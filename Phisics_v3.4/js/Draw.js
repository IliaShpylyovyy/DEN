/// функції для малювання/////////////////////////////////
/*
всі координати того що ми малюємо, треба переводити із системи координат світу в систему координат екрану
*/


function Text(text, size, x, y, angle = 0) {
    // Перетворення кута з градусів в радіани
    angle = angle * Math.PI / 180;
    ctx.save(); // Зберігаємо поточний стан контексту
    ctx.translate(x * Mouse.zoom + Mouse.pan_x, y * Mouse.zoom + Mouse.pan_y); // Переміщення в точку (x, y)
    ctx.rotate(angle); // Поворот на заданий кут (в радіанах)
    ctx.fillStyle = "rgba(0, 0, 0 , 0.5)";
    ctx.font = size * font_size_range.value * Mouse.zoom + "px serif"; // Шрифт
    ctx.fillText(text, 0, 0); // Вивід тексту
    ctx.restore(); // Відновлюємо попередній стан контексту
}



function Text_S(text, size, x, y) {
    ctx.font = size * font_size_range.value + "px serif"; // шрифт
    ctx.fillText(text, x * Mouse.zoom + Mouse.pan_x, y * Mouse.zoom + Mouse.pan_y);//текст і його позиція      

}

function line(x1, y1, x2, y2) {
    // переводимо координати екрану в координати світу
    let x1_w = x1 * Mouse.zoom + Mouse.pan_x;
    let y1_w = y1 * Mouse.zoom + Mouse.pan_y;
    let x2_w = x2 * Mouse.zoom + Mouse.pan_x;
    let y2_w = y2 * Mouse.zoom + Mouse.pan_y;

    // малюємо лінії в координатах світу
    ctx.beginPath();
    ctx.moveTo(x1_w, y1_w);
    ctx.lineTo(x2_w, y2_w);
    ctx.stroke();
}

function circle(x, y, radius) {
    let x_ = x * Mouse.zoom + Mouse.pan_x;
    let y_ = y * Mouse.zoom + Mouse.pan_y;
    let radius_ = Math.abs(radius * Mouse.zoom);

    ctx.beginPath();
    ctx.arc(x_, y_, radius_, 0, 2 * Math.PI);
    ctx.stroke();
}
// намалювати в системі координат світу
function rectangle(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x * Mouse.zoom + Mouse.pan_x, y * Mouse.zoom + Mouse.pan_y, width * Mouse.zoom, height * Mouse.zoom);
    ctx.stroke();
}

// намалювати в системі координат світу
function rectangle_fill(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x * Mouse.zoom + Mouse.pan_x, y * Mouse.zoom + Mouse.pan_y, width * Mouse.zoom, height * Mouse.zoom);
    // завершувати малювання треба в іншому місцію це треба для зміни кольору і типу заливки для кнопки наприклад.
}



// намалювати в системі координат екрану
function rectangle_s(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x , y , width , height );
    ctx.f;
    ctx.stroke();
}

function Draw_anchor(x, y,type) {
    let scale = 1;
    if (type == "XY")
    {
    
    line(x, y, x + 10 * scale, y + 10 * scale);
    line(x, y, x - 10 * scale, y + 10 * scale);
    line(x - 10 * scale, y + 10 * scale, x + 10 * scale, y + 10 * scale);

    line(x-8*scale, y+10*scale, (x-8*scale)-2*scale, y+ 15*scale);
    line(x-4*scale, y+10*scale, (x-4*scale)-2*scale, y+ 15*scale);
    line(x-0*scale, y+10*scale, (x-0*scale)-2*scale, y+ 15*scale);
    line(x+4*scale, y+10*scale, (x+4*scale)-2*scale, y+ 15*scale);
    line(x+8*scale, y+10*scale, (x+8*scale)-2*scale, y+ 15*scale);
    

    }else if (type == "X")
    {
        line(x-10*scale, y-10*scale, x-10*scale , y + 10 * scale);
        line(x-10*scale, y-10*scale, x , y );
        line(x-10*scale, y+10*scale, x , y );

        circle(x-13*scale,y,3*scale);
        circle(x-13*scale,y-6*scale,3*scale);
        circle(x-13*scale,y+6*scale,3*scale);

    } else if (type == "Y")
    {
        line(x, y, x + 10 * scale, y + 10 * scale);
        line(x, y, x - 10 * scale, y + 10 * scale);
        line(x - 10 * scale, y + 10 * scale, x + 10 * scale, y + 10 * scale);
        circle(x,y+13*scale,3*scale);
        circle(x-6*scale,y+13*scale,3*scale);
        circle(x+6*scale,y+13*scale,3*scale);
    }
}


function Draw_polygon(x, y, angle) {
    // Намалювати фігуру без урахування кута повороту
    /*
    line(50, 50, 50, 100);
    line(50, 100, 100, 100);
    line(100, 100, 100, 50);
    line(100, 50, 50, 50);
    */
    // Перетворити координати вершин з урахуванням кута повороту
    let vertices = [
        [50, 50],
        [50, 100],
        [10, 10],
        [10, 120],
        [100, 50]
    ];

    for (let i = 0; i < vertices.length; i++) {
        let transformed = transformCoordinates(vertices[i][0], vertices[i][1], angle, x, y);
        vertices[i][0] = transformed[0];
        vertices[i][1] = transformed[1];
    }

    // Намалювати фігуру з урахуванням кута повороту
    for (let i = 0; i < vertices.length; i++) {
        let nextIndex = (i + 1) % vertices.length;
        line(vertices[i][0], vertices[i][1], vertices[nextIndex][0], vertices[nextIndex][1]);
    }
}

function transformCoordinates(x, y, angle, offsetX, offsetY) {
    let cosAngle = Math.cos(angle * Math.PI / 180);
    let sinAngle = Math.sin(angle * Math.PI / 180);
    let transformedX = x * cosAngle - y * sinAngle + offsetX;
    let transformedY = x * sinAngle + y * cosAngle + offsetY;
    return [transformedX, transformedY];
}

// малюємо стрілку із текстом на початку
function Draw_arrow(x, y, angle, scale_in, text) {

    // Намалювати фігуру
    let scale = scale_in;
    let cosAngle = Math.cos(angle * Math.PI / 180);
    let sinAngle = Math.sin(angle * Math.PI / 180);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    Line(0, 0, 0, 20, text);
    Line(0, 0, 3, 10, "");
    Line(0, 0, -3, 10, "");

    let newX2_text = 0;
    let newY2 = 0;

    // Перевести координати з урахуванням кута повороту
    function Line(x1, y1, x2, y2, text) {
        let newX1 = x + (x1 * cosAngle - y1 * sinAngle) * scale;
        let newY1 = y + (x1 * sinAngle + y1 * cosAngle) * scale;

        let newX2 = x + (x2 * cosAngle - y2 * sinAngle) * scale;
        let newY2 = y + (x2 * sinAngle + y2 * cosAngle) * scale;
        line(newX1, newY1, newX2, newY2);

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";// колір заповнення для тексту
        ctx.font = "10px serif"; // шрифт
       // Text(text, 10, newX2, newY2);//текст і його позиція   
    }

}


const img = new Image();
const canvas = document.getElementById("canvas");// отримати 
const ctx = canvas.getContext("2d");

canvas.oncontextmenu = function () { // заборонити контекстне меню при натисканні ПКМ.
    return false;
};

function draw_img() {
    img.src = "/pic/1.png";
    // Зображення буде відображено, коли зображення завантажиться
    img.onload = function () {
        // Зменште зображення на 50% від його оригінального розміру
        const width = img.width * 0.05;
        const height = img.height * 0.05;
        ctx.drawImage(img, Mouse.x - width / 2, Mouse.y - height / 2, width, height);
    };
}


function draw_grid(x1, y1, width, height, size) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    // вертикальні лінії
    for (let col = 0; col <= width; col = col + size) {
        line(x1 + col, y1, x1 + col, height + y1);
    }


    // горизонтальні лінії
    for (let row = 0; row <= height; row = row + size) {
        line(x1, y1 + row, x1 + width, row + y1);
    }


}