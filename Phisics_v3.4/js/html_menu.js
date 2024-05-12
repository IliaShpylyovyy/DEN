
var checkBox_1_global; // глобальна змінна для чекбокса
var checkBox_Spring_number; // глобальна змінна для чекбокса
var checkBox_Dot_number; // глобальна змінна для чекбокса
var checkBox_stretch; // глобальна змінна для чекбокса
var checkBox_destruction; // глобальна змінна для чекбокса руйнування

        /// функції для елементів інтерфейсу (кнопки, повзунки,поля для введення)
        function Set_interval() {
            var time_interval_range = document.getElementById('time_interval_range');
            var time_interval_range_text = document.getElementById('time_interval_range_text');
            time_interval_range_text.innerHTML = time_interval_range.value;
            time_interval = Math.round(time_interval_range.value);
            // Щоб змінити інтервал
            clearInterval(intervalId);  // Очистити поточний інтервал
            intervalId = setInterval(mainLoop, time_interval);  // Встановити новий інтервал
        }

        function Set_numSubstep() {
            var range_2 = document.getElementById('range_2');
            var range_2_text = document.getElementById('range_2_text');
            range_2_text.innerHTML = range_2.value;

            for (let i = 0; i < point_arr.length; i++) {
                point_arr[i].numSubstep = Math.round(range_2.value);
                conslog(Math.round(range_2.value));
            }
        }



        function Button_1_function() {
            const constructorProperties = Object.getOwnPropertyNames(point_arr[0].constructor.prototype);
            // Функція для створення текстового елементу
            function createTextElement(propertyName) {
                const div = document.createElement('div');
                const input = document.createElement('input');
                const p = document.createElement('p');

                input.type = 'input';
                input.id = propertyName;
                input.name = 'name';
                input.classList.add('number_input');
                input.value = '0';

                p.textContent = `заготовка тексту для ${propertyName}`;

                div.appendChild(input);
                div.appendChild(p);

                return div;
            }

            // Отримання контейнера, в який будемо додавати елементи
            const container = document.querySelector('.block__column');

            // Створення та додавання текстових елементів для кожної властивості
            constructorProperties.forEach(property => {
                const textElement = createTextElement(property);
                container.appendChild(textElement);
            });

        }
            // функція яка викликається при зміні чекбоксів
        function checkBox_function() {
            checkBox_1_global = document.getElementById('checkBox_1');
            checkBox_stretch = document.getElementById('checkBox_stretch');
            checkBox_Spring_number = document.getElementById('checkBox_Spring_number');
            checkBox_Dot_number = document.getElementById('checkBox_Dot_number');
            checkBox_destruction = document.getElementById('checkBox_destruction');
        }

        // функція яка викликається при зміні повзунків
        function rangeValue() {
            // оновити ынтервали на всякий випадок
            Set_interval();
            Set_numSubstep();
            var angle_range = document.getElementById('angle_range'); // range
            var angle_range_text = document.getElementById('angle_range_text'); // p
            angle_range_text.innerHTML = angle_range.value; // innerHTML

            // повзунок кута повороту
            var scale_velocity_range = document.getElementById('scale_velocity'); // range
            var scale_velocity_range_text = document.getElementById('scale_velocity_text'); // p
            scale_velocity_text.innerHTML = scale_velocity.value; // innerHTML
            

            // повзунок масштабу вектора швидкості
            var scale_velocity_range = document.getElementById('scale_velocity'); // range
            var scale_velocity_range_text = document.getElementById('scale_velocity_text'); // p
            scale_velocity_text.innerHTML = scale_velocity.value; // innerHTML
            
            // повзунок масштабу вектора сили
            var scale_force_range = document.getElementById('scale_force'); // range
            var scale_velocity_range_text = document.getElementById('scale_force_text'); // p
            scale_force_text.innerHTML = scale_force.value; // innerHTML

            // повзунок масштабу вектора сили
            var scale_thiknes_range = document.getElementById('scale_thiknes'); // range
            var scale_thiknes_text = document.getElementById('scale_thiknes_text'); // p
            scale_thiknes_text.innerHTML = scale_thiknes.value; // innerHTML

            // повзунок масштабу вектора сили
            var scale_stress_positive_range = document.getElementById('scale_stress_positive'); // range
            var scale_stress_positive_text = document.getElementById('scale_stress_positive_text'); // p
            scale_stress_positive_text.innerHTML = scale_stress_positive.value; // innerHTML

            // повзунок масштабу вектора сили
            var scale_stress_negative_range = document.getElementById('scale_stress_negative'); // range
            var scale_stress_negative_text = document.getElementById('scale_stress_negative_text'); // p
            scale_stress_negative_text.innerHTML = scale_stress_negative.value; // innerHTML

            // повзунок зміни жорсткості пружини   
            var stifness_range = document.getElementById('stifness_range');
            var stifness_range_text = document.getElementById('stifness_range_text');
            stifness_range_text.innerHTML = stifness_range.value;


            var range_2 = document.getElementById('range_2');
            var range_2_text = document.getElementById('range_2_text');
            range_2_text.innerHTML = range_2.value; // innerHTML

            // повзунок гравітації
            var graviti_range = document.getElementById('graviti_range'); // range
            var graviti_range_text = document.getElementById('graviti_range_text'); // p
            graviti_range_text.innerHTML = graviti_range.value; // innerHTML

            // повзунок масштаба гравітації
            var graviti_scale_range = document.getElementById('graviti_scale_range'); // range
            var graviti_scale_range_text = document.getElementById('graviti_scale_range_text'); // p
            graviti_scale_range_text.innerHTML = graviti_scale_range.value; // innerHTML

            // повзунок масштаба розмыру шрифту
            var font_size_range = document.getElementById('font_size_range'); // range
            var font_size_range_text = document.getElementById('font_size_range_text'); // p
            font_size_range_text.innerHTML = font_size_range.value; // innerHTML

            // повзунок масштаба розмыру шрифту
            var mass_range = document.getElementById('mass_range'); // range
            var fmass_range_text = document.getElementById('mass_range_text'); // p
            fmass_range_text.innerHTML = mass_range.value; // innerHTML

            var speed_range = document.getElementById('speed_range'); // range
            var speed_range_text = document.getElementById('speed_range_text'); // p
            speed_range_text.innerHTML = speed_range.value; // innerHTML

            


            // інпути 
            var input_2 = document.getElementById('input_2');
            var input_3 = document.getElementById('input_3');
            var input_4 = document.getElementById('input_4');
            var input_5 = document.getElementById('input_5');


            // змінити гравітацію
            for (let i = 0; i < point_arr.length; i++) {
                point_arr[i].set_gravity(new PVector(0, graviti_range.value/1 ));
            }

            // змінити масштаб вектору швидкості
            for (let i = 0; i < point_arr.length; i++) {
                point_arr[i].scale_velocity = scale_velocity_range.value;
            }

            // змінити масштаб вектору cbkb
            for (let i = 0; i < point_arr.length; i++) {
                point_arr[i].scale_force = scale_force_range.value;
            }


            // змінити
            for (let i = 0; i < spring_arr.length; i++) {
                spring_arr[i].scale_force = scale_force_range.value;
            }

            // змінити
            for (let i = 0; i < spring_arr.length; i++) {
                spring_arr[i].k = stifness_range.value;
            }

            // змінити
             for (let i = 0; i < spring_arr.length; i++) {
            spring_arr[i].scale_thiknes = scale_thiknes_range.value;
            }

            // змінити
            for (let i = 0; i < spring_arr.length; i++) {
            spring_arr[i].scale_stress_positive = scale_stress_positive_range.value;
            spring_arr[i].scale_stress_negative = scale_stress_negative_range.value;
            }

            // змінити
            for (let i = 0; i < point_arr.length; i++) {
            point_arr[i].mass = mass_range.value;
            }

            var range_3 = document.getElementById('range_3');

            /*
            // Змінити колір фону
            var blockColumn = document.querySelector('.block__column');
            blockColumn.style.backgroundColor = 'rgb(' + range_3.value + ', 125, 125)';
            blockColumn.style.backgroundColor = "rgb(" + spring_arr[2].stretch*10 + "," + spring_arr[3].stretch*10 + ","+spring_arr[4].stretch*10+ ")";
            */

        }
