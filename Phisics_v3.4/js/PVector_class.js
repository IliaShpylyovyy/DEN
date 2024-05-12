// клас для вектору.В ньому зручним чином зберігаються координати точок. Доданы деякы функції для роботи із векторами
class PVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static dist(v1, v2) {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    mag() {// мігнітуда цього вектора (дистанція)
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(v) {// додати вектор до від цього вектора
        this.x += v.x;
        this.y += v.y;
    }

    static sub2(v1, v2) { //відняти один вектор від другого. статична функція може примінятись без об'єкта класу.
        return new PVector(v1.x - v2.x, v1.y - v2.y);
    }

    sub1(v) { // відняти вектор від цього вектора
        this.x -= v.x;
        this.y -= v.y;
    }

    mult(scale) {//  множення, "збільшення" цього вектору
        this.x *= scale;
        this.y *= scale;
    }

    div(scale) {//  ділення, "збільшення" цього вектору
        // Додаємо перевірку, щоб уникнути ділення на нуль
        if (scale !== 0) {
            this.x /= scale;
            this.y /= scale;
        } else {
        }
    }

    normalize() { // нормалізація цього вектора до загальної довжини в 1 одиницю.
        const magnitude = this.mag();
        // Перевіряємо, чи магнітуда не є нульовою, щоб уникнути ділення на нуль
        if (magnitude !== 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        } 
    }

}

