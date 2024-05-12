// створює фіксований масив точком із певним проміжком від останньої
class Trace_path {
    constructor(id_in) {
        // створює фіксований масив точком із певним проміжком від останньої
        this.id_ = id_in;
        this.selected_point_id = 0;
        this.X = 0;
        this.Y = 0;
        this.X_arr = [];
        this.Y_arr = [];
        this.Size = 1;
        this.number_of_points = 50;  // кількість точок масиву
        this.step = 2; // дистанція між точками
        this.color;
        this.first_take = true;
    }

    draw(Poin_id) {
        this.selected_point_id= Poin_id;
       // console.log("this.X_arr.length = " + this.X_arr.length);
        if (this.first_take == true) {
            this.X = point_arr[this.selected_point_id].Position.x;
            this.Y = point_arr[this.selected_point_id].Position.y;
            this.X_arr.push(point_arr[this.selected_point_id].Position.x);
            this.Y_arr.push(point_arr[this.selected_point_id].Position.y);
            this.first_take = false;
 
            circle(this.X, this.Y, this.Size);
        }
        this.make_list();
        // пройтись по всім точкам масиву і намалювати кружечок
        for (let id = 0; id < this.X_arr.length; id++) {
            ctx.strokeStyle = "rgba(50, 150, 0, 0.5)";
            circle(this.X_arr[id], this.Y_arr[id], this.Size);
        }
    }

    make_list() {
        let new_x = point_arr[this.selected_point_id].Position.x;
        let new_y = point_arr[this.selected_point_id].Position.y;
        let old_x = this.X_arr[this.X_arr.length - 1];
        let old_y = this.Y_arr[this.Y_arr.length - 1];

        if ((Math.abs(new_x - old_x) > this.step) || (Math.abs(new_y - old_y) > this.step)) {
            if (this.X_arr.length > this.number_of_points) {
                // Оновлення існуючих точок
                for (let i = 0; i < this.X_arr.length - 1; i++) {
                    this.X_arr[i] = this.X_arr[i + 1];
                    this.Y_arr[i] = this.Y_arr[i + 1];
                }
                // Оновлення останньої точки
                this.X_arr[this.X_arr.length - 1] = new_x;
                this.Y_arr[this.Y_arr.length - 1] = new_y;
            } else {
                // Додавання нових координат
                this.X_arr.push(new_x);
                this.Y_arr.push(new_y);
            }
        }
    }


}