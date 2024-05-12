function Viewport_point_tracking() {

    let X_offset = 50;
    let Y_offset = 50;

    // при зумуванні працює неправильно
    // здається офсет стає більшим
    // камера слідує за вибраною точкою
    if (!Mouse.btn_0_down) {
        if (Mouse.selected_point_id_arr[0] != undefined) {
            // отримати координати точки відносно canvas
            let right_Screen_border = point_arr[Mouse.selected_point_id_arr[0]].Position.x + Mouse.pan_x / Mouse.zoom;
            let down_Screen_border = point_arr[Mouse.selected_point_id_arr[0]].Position.y + Mouse.pan_y / Mouse.zoom;

            if ((right_Screen_border > (canvas.width-X_offset) / Mouse.zoom)) {
                Mouse.pan_x -= 1 + (right_Screen_border - (canvas.width-X_offset) / Mouse.zoom) / 10;
                console.log("right_Screen_border = " + right_Screen_border);
            } else if ((right_Screen_border < X_offset)) {
                Mouse.pan_x += 1 - (right_Screen_border - X_offset) / 10;
                console.log("right_Screen_border = " + right_Screen_border);
            }

            if ((down_Screen_border > (canvas.height-Y_offset) / Mouse.zoom)) {
                Mouse.pan_y -= 1 + (down_Screen_border - (canvas.height-Y_offset) / Mouse.zoom) / 10;
                console.log("down_Screen_border = " + down_Screen_border);
            } else if ((down_Screen_border < Y_offset)) {
                Mouse.pan_y += 1 - (down_Screen_border - Y_offset) / 10;
                console.log("down_Screen_border = " + down_Screen_border);
            }
        }
    }
}