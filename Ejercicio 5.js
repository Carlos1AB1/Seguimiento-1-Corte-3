class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadEnBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento) {
        this.codigo = codigo
        this.descripcion = descripcion
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
        this.cantidadEnBodega = cantidadEnBodega
        this.cantidadMinima = cantidadMinima
        this.cantidadMaxima = cantidadMaxima
        this.porcentajeDescuento = porcentajeDescuento
    }

    solicitarPedido() {
        return this.cantidadEnBodega < this.cantidadMinima
    }

    calcularTotalPagar(cantidad) {
        return this.precioCompra * cantidad
    }
}

class PrendaVestir extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadEnBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla, permitePlanchado) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadEnBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento)
        this.talla = talla;
        this.permitePlanchado = permitePlanchado
    }
}

class Calzado extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadEnBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadEnBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento)
        this.talla = talla
    }
}


const prendas = [
    new PrendaVestir("PV001", "Camisa", 15, 30, 50, 10, 100, 5, "M", true),
    new PrendaVestir("PV002", "Jeans", 20, 40, 30, 5, 80, 10, "L", false),
    new PrendaVestir("PV003", "Blusa", 12, 25, 40, 8, 90, 5, "S", true)
]


const calzados = [
    new Calzado("C001", "Tenis", 25, 50, 60, 15, 120, 8, 38),
    new Calzado("C002", "Sandalias", 18, 35, 45, 10, 100, 5, 37),
    new Calzado("C003", "Zapatos Formales", 30, 60, 35, 8, 80, 10, 40)
]


console.log("¿Solicitar pedido de camisa?:", prendas[0].solicitarPedido())
console.log("Total a pagar por 10 pares de zapatos:", calzados[0].calcularTotalPagar(10))