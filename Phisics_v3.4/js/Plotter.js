class Plotter {
    constructor(x = 0, y = 0, height = 100, width = 100, name = "", type = "horisontal") {
        this.name = name;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.Temp_Data = [];
        this.Data = [];
        this.auto_scale = true; // увымкнути масштаб графіка
        this.scale = 1; // масштаб графіка
        this.number_of_points = 200; // кількість точок на графіку
        this.number_of_hiden_points = 1; // кількість точок на графіку
        this.step; // крок між відрізками графіка
        this.color = "rgba(100, 150,0 , 1)"; // колір
        this.first_take = true;
        this.count = 0;
        this.range = 1;
        this.maxNumber = 5; // знайти найбільше число
        this.minNumber = -5; // знайти найбільше число
        this.type = type; // графік будється горизонтально чи вертикально
        this.text_position_index = this.number_of_points; // 
        this.data_position_index = 0; // позиційний індекс данних
        this.flip_data = -1;
    }

    draw() {

        ctx.strokeStyle = this.color; // колір
        ctx.lineWidth = 2;// товщина лінії
        ctx.fillStyle = "rgba(100, 100, 100, 0.1)";
        rectangle(this.x, this.y, this.width, this.height);
        ctx.fill();

        //   circle(this.x, this.y, this.Size);
        Text("Графік " + this.name, 12, this.x + 10, this.y + 12);
        Text("тип " + this.type, 12, this.x + 10, this.y + 24);

        // намалювати всі точки
        // графік будується із ліній
        /*
         _ _ _ _ _ _ _ _ _ _ X
        |             
        | x2,y2 . _ _ _ _.
        |      /          \
        |     /            \
        |x,y .              .
        Y
        */

        this.draw_graph(this.Data);
    }

    push_data(data) {

        // пропускаємо всі данні
        //  this.push_when_changed(data);

        // пропускаємо середнє арифметичне певної кількості данних  
        //this.push_Aproximation(data);

        // пропускаємо якщо щось змінилось
        // величина мінімальної зміни treshhold
        // якщо нічого не змінилось данних не додаєм, графік стоїть на місці
     //   let treshhold = 0;
      //  this.push_when_changed(data, treshhold);

      this.push_everething(data);
    }

    draw_value_on_line() {
        this.text_position_index = this.data_position_index; // Індекс для вибору позиції тексту на графіку
        let x_text, y_text; // Координати тексту
        let val = (this.Data[this.Data.length - this.data_position_index]); // Округлений до двох знаків після коми текст
        // округлюємо до 2-х знаків
        val = precision(val,2);
    
 

   

        if (this.type == "horisontal") {
            // Графік горизонтальний
            x_text = this.x + this.width - this.text_position_index * this.step; // Координата X тексту
            y_text = this.y + this.height + this.Data[this.Data.length - this.data_position_index] * this.scale; // Координата Y тексту
        } else {
            // Графік вертикальний
            x_text = this.x + this.width + this.Data[this.Data.length - this.data_position_index] * this.scale; // Координата X тексту
            y_text = this.y + this.height - this.text_position_index * this.step * this.scale; // Координата Y тексту
        }

        // Відображення тексту та кола на графіку
        Text(this.name + val, 10, x_text, y_text - 10);
        circle(x_text, y_text, 3);
    }


    push_Aproximation(data) {
        // берем малий діапазон данних і вираховуємо середнє арифметичне яке і пушимо для побудови графіка
        if (this.Temp_Data.length > this.number_of_hiden_points) {
            // Обчислення суми всіх елементів масиву
            let sum = 0;
            for (let i = 0; i < this.Temp_Data.length; i++) {
                sum += this.Temp_Data[i];
            }
            // Обчислення середнього арифметичного
            let average = sum / this.Temp_Data.length;
            this.Data.push(average);
            this.Temp_Data = [];
        }
    }

    push_when_changed(data, treshhold) {
        this.count++;
        if (this.count >= this.number_of_hiden_points) {
            this.count = 0;

            if (this.Data.length < 2 || (Math.abs(data - this.Data[this.Data.length - 1])) > treshhold) {
                //   console.log(this.name + " : " + data);
                this.Data.push(data);
                if (this.data_position_index > this.Data.length) {
                    this.data_position_index = 0;
                } else {
                    this.data_position_index++;
                }

            }
        }
    }

    push_everething(data) {
        this.count++;
        if (this.count >= this.number_of_hiden_points) {
            this.count = 0;
            this.Data.push(data);
        }
    }

    check_scale() {
        this.range = (Math.abs(this.minNumber) + Math.abs(this.maxNumber));
        return (this.height) / this.range;
    }

    set_scale(scale_in) {
        this.scale = scale_in;
    }

  


    draw_graph(data) {

        this.maxNumber = Math.max(...data); // знайти найбільше число
        this.minNumber = Math.min(...data); // знайти найбільше число 
        this.draw_value_on_line();
        for (let i = 0; i < this.number_of_points; i++) {

            ctx.lineWidth = 3;

            if (this.type == "horisontal") {
                
                this.step = this.width / this.number_of_points;
                let X1 = this.step * i + this.x;
                let Y1 = this.flip_data * data[i] * this.scale  ;
                let X2 = this.step * i + this.step + this.x;
                let Y2 = this.flip_data * data[i + 1] * this.scale  ;

                if (this.auto_scale == true) {
                    this.range = (Math.abs(this.minNumber) + Math.abs(this.maxNumber));
                    this.scale = (this.height) / this.range;
                    Y1 += this.maxNumber * this.scale  + this.y;
                    Y2 += this.maxNumber * this.scale  + this.y;
                }

                if (this.Is_in_pllot_area(X1, Y1)) {
                    line(X1, Y1, X2, Y2);
                }

            } else {
                
                this.step = this.height / this.number_of_points;
                let X1 = this.flip_data * data[i] * this.scale  ;
                let Y1 = this.step * i + this.y;
                let X2 = this.flip_data * data[i + 1] * this.scale  ;
                let Y2 = this.step * i + this.step + this.y;

                if (this.auto_scale == true) {
                    this.range = (Math.abs(this.minNumber) + Math.abs(this.maxNumber));
                    this.scale = (this.width) / this.range;
                    X1 += this.minNumber * this.scale;
                    X2 += this.minNumber * this.scale;
                }

                if (this.Is_in_pllot_area(X1, Y1)) {
                    line(X1, Y1, X2, Y2);
                }

            }

            if (data.length > this.number_of_points) {
                data.shift();
            } else {
                // data.push(Math.abs(point_arr[this.selected_point_id].velocity.y) + Math.abs(point_arr[this.selected_point_id].velocity.x));
            }
        }

        
         let x1 = point_arr[Mouse.selected_point_id_arr[0]].Position.x
         let y1 = point_arr[Mouse.selected_point_id_arr[0]].Position.y
         let x2 = point_arr[Mouse.selected_point_id_arr[0]].Position.x;
         let y2 = 0
        if ( this.Is_in_pllot_area(x2, -100))
         {
        line(x1, y1, x2, y2);
         }

        let x12 = point_arr[Mouse.selected_point_id_arr[0]].Position.x
        let y12 = point_arr[Mouse.selected_point_id_arr[0]].Position.y
        let x22 = 0
        let y22 = point_arr[Mouse.selected_point_id_arr[0]].Position.y
        if (this.Is_in_pllot_area(-100, y12))
        {
        line(x12, y12, x22, y22);
        }
        
    }

    Is_in_pllot_area(X1, Y1) {
        if ((X1 < this.x + this.width) && (X1 > this.x)) {
            if ((Y1 < this.y + this.height) && (Y1 > this.y)) {
                return true
            } else {
                return false
            }
        }
        return false
    }

}
