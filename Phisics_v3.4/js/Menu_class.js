// клас для елементі вменю
class Button {
    constructor(x, y, width, height, text, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.state = {
            down: false,
            first_down: true,
        };
        this.Body_area // зона основного тіла
        this.Anchor_area // зона якоря за яку можна переміщати
        this.value ; // значення з яким кнопка працює
        this.controlledObject ; // Об'єкт або масив, який контролюватиметься
        this.propertyName ; // Назва властивості, яку потрібно змінювати
        this.Call_function ; // Назва властивості, яку потрібно змінювати
    }

    // Функція для отримання значення властивості
    getProperty() {
        return this.controlledObject[this.propertyName];
    }

    // Функція для зміни значення властивості
    setObject(value) {
        this.controlledObject = value;
    }

    // Функція для зміни значення властивості
    setProperty(value) {
        [this.propertyName] = value;
    }


    draw() {

        //  основне тіло елемента
        this.Body_area = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
        //  тіло за яке можна переміщати елемент (якір)
        this.Anchor_area = {
            x: this.x + this.width,
            y: this.y,
            width: this.height / 2,
            height: this.height,
        }





        rectangle_fill(this.Body_area.x, this.Body_area.y, this.Body_area.width, this.Body_area.height);
        if (Mouse_is_Over(this.Body_area)) {
            // реалізація утримання кнопки
            if (Mouse.btn_0_down) {
                if ( this.controlledObject!=undefined && this.value!=undefined && this.propertyName!=undefined )
                {
                this.controlledObject[this.propertyName] += this.value;
               // console.log(this.controlledObject);
                }
                // якщо  функція яка була раніше надана цій кнопці не пуста, тоді викликаємо її
                if (this.Call_function!=null && this.state.first_down )
                {
                    this.state.first_down = false;
                    // викликати  функцію яка була раніше надана цій кнопці
                    this.Call_function();
                   // console.log(this.Call_function);
                }

                this.state.down = true;
                Mouse.cursor_is_on_gui = true;
            } else {
                this.state.down = false;
                Mouse.cursor_is_on_gui = false;
            }


            // реалізувати клік кнопки
            //
            
            ctx.fillStyle = "rgba(100, 150, 0, 0.4)";
        } else {
            ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
        }
        ctx.fill();

        Text(this.text, 16, this.Body_area.x + 5, this.Body_area.y + this.Body_area.height / 2 + 5);
        if (this.anchor_is_active == true) {
            // Mouse.cursor_is_on_gui = true;
            this.x = Mouse.x - this.width - this.height / 4;
            this.y = Mouse.y - this.height / 2;
        } else {
            //Mouse.cursor_is_on_gui = false;
        }
        rectangle_fill(this.Anchor_area.x, this.Anchor_area.y, this.Anchor_area.width, this.Anchor_area.height);
        if (Mouse_is_Over(this.Anchor_area)) {
            //  тіло за яке можна переміщати елемент
            ctx.fillStyle = "rgba(50, 100, 0, 0.6)";
            if (Mouse.btn_2_down) {
                ctx.fillStyle = "rgba(150, 100, 0, 0.6)";
                Mouse.selected_point_id_arr[0] = null;
                this.state.down = true;
                Mouse.cursor_is_on_gui = true;
                this.anchor_is_active = true;
            } else {
                this.state.down = false;
                Mouse.cursor_is_on_gui = false;
                this.anchor_is_active = false;
            }
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        }
        ctx.fill();

    }

}






// цей слайдер може приймати і управляти певними характеристиками іншого об'єкта
class Range {
    constructor(x, y, width, height, min, max, value, text, id, controlledObject, propertyName) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.min = min;
        this.max = max;
        this.value = value;
        this.fill_value = value;
        this.text = text;
        this.state = {
            down: false,
            first_down: true,
        };
        this.anchor_is_active = false;
        this.Body_area
        this.Anchor_area

        this.controlledObject = controlledObject; // Об'єкт або масив, який контролюватиметься
        this.propertyName = propertyName; // Назва властивості, яку потрібно змінювати


    }

    // Функція для отримання значення властивості
    getProperty() {
        return this.controlledObject[this.propertyName];
    }

    // Функція для зміни значення властивості
    setObject(value) {
        this.controlledObject = value;
    }

    // Функція для зміни значення властивості
    setProperty(value) {
        [this.propertyName] = value;
    }

    resize()
    {
        // масштабування 
        if (this.value > this.max-20 ) { this.max += 20; this.min += 20;  }// підняти максимум
        if (this.value < this.min+20) { this.min -= 20; this.max -= 20;} // опустити мінімум
        this.fill_value = (this.value-this.min) / (this.max-this.min) * this.Body_area.width;
    }


    draw() {
        //  основне тіло елемента
        this.Body_area = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
        //  тіло за яке можна переміщати елемент (якір)
        this.Anchor_area = {
            x: this.x + this.width,
            y: this.y,
            width: this.height / 2,
            height: this.height,
        }

        rectangle_fill(this.Body_area.x, this.Body_area.y, this.Body_area.width, this.Body_area.height);
        if (Mouse_is_Over(this.Body_area)) {
            // основне тіло
            ctx.fillStyle = "rgba(100, 150, 0, 0.4)";
            if (Mouse.btn_0_down) {
                this.controlledObject[this.propertyName] = this.value;
                this.state.down = true;
                Mouse.cursor_is_on_gui = true;

                ctx.fillStyle = "rgba(150, 100, 0, 0.6)";
                // втсановити нове значення
                this.value =  this.min + ((this.max-this.min)/(this.Body_area.width) * (Mouse.x - this.x)) ;
                 this.fill_value = (this.value-this.min) / (this.max-this.min) * this.Body_area.width;
            } else {
                this.resize();
                this.state.down = false;
                Mouse.cursor_is_on_gui = false;
            }
        } else {
            // якщо мишка не на тілі
            ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
            // отримати значення із елемента
            this.value = this.controlledObject[this.propertyName];
            this.resize();
        }
        ctx.fill();


        // треба щоб переміщення не припинялось коли курсор виходить за зону якоря
        if (this.anchor_is_active == true) {
            // Mouse.cursor_is_on_gui = true;
            this.x = Mouse.x - this.width - this.height / 4;
            this.y = Mouse.y - this.height / 2;
        } else {
            //Mouse.cursor_is_on_gui = false;
        }

        rectangle_fill(this.Anchor_area.x, this.Anchor_area.y, this.Anchor_area.width, this.Anchor_area.height);
        if (Mouse_is_Over(this.Anchor_area)) {
            //  тіло за яке можна переміщати елемент
            ctx.fillStyle = "rgba(50, 100, 0, 0.6)";
            if (Mouse.btn_2_down) {
                ctx.fillStyle = "rgba(150, 100, 0, 0.6)";
                Mouse.selected_point_id_arr[0] = null;
                
                this.anchor_is_active = true;
                this.state.down = true;
                Mouse.cursor_is_on_gui = true;
            } else {
                this.anchor_is_active = false;
                this.state.down = false;
                Mouse.cursor_is_on_gui = false;
            }
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        }
        ctx.fill();

        //console.log(Mouse.cursor_is_on_gui);




        ctx.fillStyle = "rgba(100, 150, 250, 0.8)";
        rectangle_fill(this.x, this.y + this.height / 4, this.fill_value, this.height / 2);
        ctx.fill();


        Text(this.controlledObject.name + " " + this.controlledObject.id + " " + this.propertyName, 10, this.x + 20 + this.width, this.y + this.height);
        Text(this.text, 10, this.x + 5, this.y - 5);
        Text(precision(this.min,2), 10, this.x + 10, this.y + this.height / 2 + 5);
        Text(precision(this.value,2), 10, this.x + this.width / 2, this.y + this.height / 2 + 5);
        Text(precision(this.max,2), 10, this.x + this.width - 25, this.y + this.height / 2 + 5);
    }
}


// цей слайдер може приймати і управляти певними характеристиками іншого об'єкта
class Range_vertical {
    constructor(x, y, width, height, min, max, value, text, id, controlledObject, propertyName) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.min = min;
        this.max = max;
        this.value = value;
        this.fill_value = value;
        this.text = text;
        this.state = {
            down: false,
            first_down: true,
        };
        this.anchor_is_active = false;
        this.Body_area
        this.Anchor_area

        this.controlledObject = controlledObject; // Об'єкт або масив, який контролюватиметься
        this.propertyName = propertyName; // Назва властивості, яку потрібно змінювати


    }

    // Функція для отримання значення властивості
    getProperty() {
        return this.controlledObject[this.propertyName];
    }

    // Функція для зміни значення властивості
    setObject(value) {
        this.controlledObject = value;
    }

    // Функція для зміни значення властивості
    setProperty(value) {
        [this.propertyName] = value;
    }

    resize()
    {
        // масштабування 
        if (this.value > this.max-20 ) { this.max += 20; this.min += 20;  }// підняти максимум
        if (this.value < this.min+20) { this.min -= 20; this.max -= 20;} // опустити мінімум
        this.fill_value = (this.value-this.min) / (this.max-this.min) * this.Body_area.height;
    }


    draw() {
        //  основне тіло елемента
        this.Body_area = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
        //  тіло за яке можна переміщати елемент (якір)
        this.Anchor_area = {
            x: this.x ,
            y: this.y - this.width,
            width: this.width ,
            height: this.width,
        }



        rectangle_fill(this.Body_area.x, this.Body_area.y, this.Body_area.width, this.Body_area.height);
        if (Mouse_is_Over(this.Body_area)) {
            // основне тіло
            ctx.fillStyle = "rgba(100, 150, 0, 0.4)";
            if (Mouse.btn_0_down) {
                this.controlledObject[this.propertyName] = this.value;
                this.state.down = true;
                Mouse.cursor_is_on_gui = true;

                ctx.fillStyle = "rgba(150, 100, 0, 0.6)";
                this.value =  this.min + ((this.max-this.min)/(this.Body_area.height) * (Mouse.y - this.y)) ;
                 this.fill_value = (this.value-this.min) / (this.max-this.min) * this.Body_area.height;
            
            } else {
                this.resize();
                this.state.down = false;
                Mouse.cursor_is_on_gui = false;
            }
        } else {
            ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
            this.value = this.controlledObject[this.propertyName];
            this.resize();         
        }
        ctx.fill();

        // треба щоб переміщення не припинялось коли курсор виходить за зону якоря
        if (this.anchor_is_active == true) {
            // Mouse.cursor_is_on_gui = true;
            this.x = Mouse.x - this.Body_area.width/ 2 ;
            this.y = Mouse.y + this.Body_area.width / 4 ;
        } else {
            //Mouse.cursor_is_on_gui = false;
        }

        rectangle_fill(this.Anchor_area.x, this.Anchor_area.y, this.Anchor_area.width, this.Anchor_area.height);
        if (Mouse_is_Over(this.Anchor_area)) {
            //  тіло за яке можна переміщати елемент
            ctx.fillStyle = "rgba(50, 100, 0, 0.6)";
            if (Mouse.btn_2_down) {
                ctx.fillStyle = "rgba(150, 100, 0, 0.6)";
                Mouse.selected_point_id_arr[0] = null;
                
                this.anchor_is_active = true;
                this.state.down = true;
                Mouse.cursor_is_on_gui = true;
            } else {
                this.anchor_is_active = false;
                this.state.down = false;
                Mouse.cursor_is_on_gui = false;
            }
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        }
        ctx.fill();

        //console.log(Mouse.cursor_is_on_gui);



// намалювати повзунок
        ctx.fillStyle = "rgba(100, 150, 250, 0.8)";
        rectangle_fill(this.x + this.width / 4, this.y , this.width / 2,  this.fill_value);
        ctx.fill();


        Text(this.controlledObject.name + " " + this.controlledObject.id + " " + this.propertyName, 10, this.x + 10 + this.width, this.y + this.height,-90);
        Text(this.text, 10, this.x -5, this.y + this.Body_area.height - 5,-90);
        Text(this.max.toFixed(1), 10, this.x + this.Body_area.width /2, this.y + this.Body_area.height  + 5,-90);
        Text(this.value.toFixed(2), 10, this.x + this.Body_area.width/2  , this.y + this.Body_area.height / 2 + 15,-90);
        Text(this.min.toFixed(1), 10, this.x + this.Body_area.width /2, this.y  + 5,-90);
    }
}







class Plane {
    constructor(x, y, width, height, text, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.state = {
            down: false,
            first_down: true,
        };
        this.Body_area
        this.Anchor_area
    }

    draw() {
        //  основне тіло елемента
        this.Body_area = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
        //  тіло за яке можна переміщати елемент (якір)
        this.Anchor_area = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: 15,
        }

        rectangle_fill(this.Body_area.x, this.Body_area.y, this.Body_area.width, this.Body_area.height);
        if (Mouse_is_Over(this.Body_area)) {
            ctx.fillStyle = "rgba(100, 150, 0, 0.4)";
        } else {
            ctx.fillStyle = "rgba(250, 250, 200, 0.3)";
        }
        ctx.fill();
        Text(this.text, 16, this.x + 5, this.y + this.height / 2 + 5);



        if (this.anchor_is_active == true) {
            //  Mouse.cursor_is_on_gui = true;
            this.x = Mouse.x - this.width / 2;
            this.y = Mouse.y - 5;
        } else {
            // Mouse.cursor_is_on_gui = false;
        }

        rectangle_fill(this.Anchor_area.x, this.Anchor_area.y, this.Anchor_area.width, this.Anchor_area.height);

        if (Mouse_is_Over(this.Anchor_area)) {
            if (Mouse.btn_2_down) {
                Mouse.selected_point_id_arr[0] = null;
                this.anchor_is_active = true;
                ctx.fillStyle = "rgba(150, 100, 0, 0.6)";
            } else {
                this.anchor_is_active = false;
                ctx.fillStyle = "rgba(50, 100, 0, 0.6)";
            }
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        }
        ctx.fill();

    }


}









// приймає об'єкт  "area" (наприклад this.Anchor_area, this.Body_area )
// перевіряє чи курсор знаходиться в зоні габаритів об'єкта
function Mouse_is_Over(area) {
    return Mouse.x > area.x && Mouse.x < area.x + area.width && Mouse.y > area.y && Mouse.y < area.y + area.height;
}

// перевіряэ чи була "клікнута"  кнопка миші у відповідній зоні об'єкта 
function isDownClicked(Obj) {
    if (Mouse_is_Over(Obj.Body_area)) {
        if (Mouse.btn_0_down) {
            Obj.state.down = true;
            if (Obj.state.first_down) {
                Obj.state.first_down = false;
                // код який перевірить чи це перший цикл при натисненні чи ні
                console.log("first_down");
                return true;
            }
        } else {
            Obj.state.first_down = true;
        }
    }
    return false;
}

// перевіряэ чи натиснута кнопка миші у відповідній зоні об'єкта 
function isDown(Obj) {
    if (Mouse_is_Over(Obj.Body_area)) {
        if (Mouse.btn_0_down) {
            Obj.state.down = true;
            console.log("first_down");
            return true;
        }
        return false;
    }
}


var ID = 0;
// Функція для отримання значень з об'єкта та його вкладених об'єктів
function getObjectValues2(obj, prefix = "") {
    let values = "Об'єкт " + obj;

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                values += getObjectValues2(value, prefix + key + '.');

            } else {
                values += "\n" + prefix + key + " : " + value;
                if (typeof value === 'number') {
                    range.push(new Range(0, 0 + ID * 18, 150, 15, 0, value * 2, value, "", ID, obj, key));
                }
                else {
                  //  range.push(new Range(0, 0 + ID * 18, 150, 15, 0, 100, 1, "", ID, obj, key));
                }
                ID++;
            }
        }
    }
    //ID = 0;
    return values;
}






