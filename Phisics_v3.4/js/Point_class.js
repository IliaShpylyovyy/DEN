// Це дуже важливий клас. В цьому класы розраховуэться фызика поведынки матерыальноъ точки.
class Point {
    constructor(Position_in, idin) {                // констьруктор  для цієї точки
        this.name = "Point";
        this.Position = Position_in;                // вектор
        this.Position_P = new PVector(0, 0);        // минула позиція  для цієї точки
        this.velocity = new PVector(0, 0);          // швидкість  для цієї точки
        this.acceleration = new PVector(0, 0);      // прискорення для цієї точки
        this.gravity = new PVector(0, 0);           // гравітація для цієї точки
        this.force = new PVector(0, 0);             // сила для цієї точки
        this.demping_vel = 0.9995;                    // демпінг для цієї точки (імітує силу тертя)
        this.mass = 1;                              // маса для цієї точки
        this.id = idin;                             // ідентифікацний номер для цієї точки
        this.scale_velocity = 100;                  // масштаб векторів швидкості для цієї точки
        this.scale_force = 100;                     // масштаб векторів сили для цієї точки
        this.anchor = false;
        this.anchor_type = "XY";                        // встановлений якір на точці (чорний)
        // XY - жорстка опора
        // X - зафіксовано по X
        // Y - зафіксовано по Y
        this.numSubstep = 10;                       // увімкнений якір для цієї точки
        this.select_atribute = 0;                   // якщо точка вибрана, встановити їй цей атрибут
        // 0 - точка не вибрана
        // 1 - точка вибрана як №1 у списку вибраних точок (зелена)
        // 2 - точка вибрана як №2 у списку вибраних точок (червона)
    }


    activate_anchor(anchorin) {
        // встановлювати нове значення на основі старого
        // якщо старе значення == новому  => тоді старе буде false, інакше буде true
        if (this.anchor == anchorin) {
            this.anchor = false;
        } else {
            this.anchor = anchorin;
        }
    }

    set_anchor(anchorin) { // просто встановити потібне значення для якоря (true/false)
        this.anchor = anchorin;
    }

    show() { // намалювати точки і текст

        ctx.setLineDash([0,0]);
        ctx.strokeStyle = "rgba(" + this.mass * 10 + ", 0, " + this.mass * 10 + ", 1)"; // встановити колір ліній в залежності від маси
        ctx.lineWidth = 1;
        circle(this.Position.x, this.Position.y, this.mass); // намалювати кружечок :)
        ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // чорний

        if (checkBox_Dot_number.checked == true) {
            ctx.fillStyle = "rgba(0, 100, 255, 1)";// колір заповнення для тексту
            Text("" + this.id, 11, this.Position.x + 6, this.Position.y);//текст і його позиція

        }

        // атрибути точок ("підствітка точок")
        // атрибут для всіх точок за замовчуванням (чорний кружечок)
        if (this.select_atribute == 0) {
            /*
            ctx.strokeStyle = "rgba(0, 0, 0, 1)";
            ctx.lineWidth = 3;
            circle(this.Position.x, this.Position.y, 4);
            */
            // атрибут (зелений кружечок)
        } else if (this.select_atribute == 1) {
            ctx.strokeStyle = "rgba(0, 200, 0, 1)";
            ctx.lineWidth = 2;
            circle(this.Position.x, this.Position.y, 5);
            // атрибут (червоний кружечок)
        } else if (this.select_atribute == 2) {
            ctx.strokeStyle = "rgba(200, 0, 0, 1)";
            ctx.lineWidth = 2;
            circle(this.Position.x, this.Position.y, 5);
            // атрибут (синій кружечок)
        } else if (this.select_atribute == 3) {
            ctx.strokeStyle = "rgba(0, 0, 0, 1)";
            ctx.lineWidth = 2;
            circle(this.Position.x, this.Position.y, 5);
        }


    }

    // основний код для імітації фізики.
    // код треба поліпшити
    update(dt) { // оновити розрахунки для точки. dt керує розміром проміжних обчислень.

        this.Draw_velocity_Vector();
        this.Draw_Force_Vector();
        this.show();
        // Substep потрібний для поліпшення стабільності
        const Sub_dt = dt / 20;
   
    

        for (let Substep = 1; Substep <= 20; Substep++) {
            this.chek();

            this.velocity.x += this.acceleration.x ;
            this.velocity.y += this.acceleration.y ;

            this.Position_P.x = this.Position.x;
            this.Position_P.y = this.Position.y;

            this.velocity.x *=  this.demping_vel ;
            this.velocity.y *=  this.demping_vel ;


            this.acceleration.x = this.force.x / this.mass + this.gravity.x * Sub_dt;
            this.acceleration.y = this.force.y / this.mass + this.gravity.y * Sub_dt;

            this.force.x = this.acceleration.x * this.mass * Sub_dt ;
            this.force.y = this.acceleration.y * this.mass * Sub_dt ;
           
            
            if (this.anchor == true) {
                // якщо зафіксувати точку по X і по X то це жорсткий шарнір
                // якщо зафіксувати точку по X чи X то це плаваючий шарнір
                Draw_anchor(this.Position.x, this.Position.y, this.anchor_type);
                rectangle(this.Position.x - 2.5, this.Position.y - 2.5, 5, 5);
                if (this.anchor_type == "XY") {
                    this.Position.x = this.Position.x;
                    this.Position.y = this.Position.y;
                } else if (this.anchor_type == "X") {
                    this.Position.x = this.Position.x;
                    this.Position.y = this.Position.y + this.velocity.y * Sub_dt;

                } else if (this.anchor_type == "Y") {
                    this.Position.x = this.Position.x + this.velocity.x * Sub_dt;
                    this.Position.y = this.Position.y;
                }


            } else {
                // розраховувати переміщення точки додаючи кожен кадр швидкість помножену на дельта T
                // дельта T потрібно

                /*
                // імітує плавання в воді
                if (this.Position.y>0)
                {
                this.Position.x = this.Position.x + this.velocity.x * Sub_dt;
                this.Position.y = this.Position.y*0.9999 + this.velocity.y * Sub_dt;
                }else{
                this.Position.x = this.Position.x + this.velocity.x * Sub_dt;
                this.Position.y = this.Position.y + this.velocity.y * Sub_dt;
                }
                // імітує плавання в воді
                */

                // нормальне переміщення
                this.Position.x = this.Position.x + this.velocity.x * Sub_dt;
                this.Position.y = this.Position.y + this.velocity.y * Sub_dt;

                /*
               // нормальне переміщення
                this.Position.x = this.Position.x + this.velocity.x* Sub_dt;
                this.Position.y = this.Position.y + this.velocity.y * Sub_dt;
                */

            }
 

        }

    
    }


    chek() { // перевірка і зниження швидкості
        let s = 100;
        let d = 0.00019;
        if (Math.abs(this.velocity.x) > s) {

            this.velocity.x *= d;
            this.force.x *= d;
            this.acceleration.x *= d;

        }
        if (Math.abs(this.velocity.y) > s) {
            this.velocity.y *= d;
            this.force.y *= d;
            this.acceleration.y *= d;

        }

    }


    // вектор швидклсті V
    Draw_velocity_Vector() {
        ctx.strokeStyle = "rgba(0, 0, 250, 1)";// колір лінії
        line(this.Position.x, this.Position.y, this.Position.x + this.velocity.x * this.scale_velocity, this.Position.y + this.velocity.y * this.scale_velocity); // побудова збільшених лінії(вектор сили)
    }
    // вектор сили курсора F
    Draw_Force_Vector() {
        ctx.strokeStyle = "rgba(100, 250, 10, 1)";// колір лінії
        ctx.lineWidth = 4; // товщина лінії
        line(this.Position.x, this.Position.y, this.Position.x + this.force.x * this.scale_force, this.Position.y + this.force.y * this.scale_force);// побудова збільшених лінії(вектор сили)
    }

    set_mass(mass_in) {
        this.mass = mass_in;
    }

    set_gravity(gravity_in) {
        this.gravity = gravity_in;
    }

    set_force(force_in) {
        this.force = force_in;
    }

    add_force(force_in) {
        this.force.add(force_in);
    }

    set_velocity(velocity_in) {
        this.velocity = velocity_in;
    }

    add_velocity(velocity_in) {
        this.velocity.add(velocity_in);
    }

    set_acceleration(acceleration_in) {
        this.acceleration = acceleration_in;
    }
    add_acceleration(acceleration_in) {
        this.acceleration.add(acceleration_in);
    }

    set_Position(Xin, Yin) {
        this.Position.x = Xin;
        this.Position.y = Yin;
    }

    screenDetect() {
        if (this.Position.x > width) {
            this.velocity.x = this.velocity.x * -1;
            this.acceleration.x = 0;
            this.Position.x = width;
        }

        if (this.Position.x < 0) {
            this.velocity.x = this.velocity.x * -1;
            this.acceleration.x = 0;
            this.Position.x = 0;
        }

        if (this.Position.y > height) {
            this.velocity.y = this.velocity.y * -1;
            this.acceleration.y = 0;
            this.Position.y = height;
        }

        if (this.Position.y < 0) {
            this.velocity.y = this.velocity.y * -1;
            this.acceleration.y = 0;
            this.Position.y = 0;
        }
    }
}