class Producto {
    constructor(id, nombre, fecha, precioInicial) {
        this.id = id
        this.nombre = nombre
        this.fecha = fecha
        this.precioInicial = precioInicial
        this.ofertas = []
    }

    realizarOferta(persona, valorOferta, fechaOferta) {
        this.ofertas.push({ persona, valorOferta, fechaOferta })
        console.log(`Oferta realizada por ${persona} de ${valorOferta} en ${fechaOferta} para el producto ${this.nombre}.`)
    }

    verOfertas() {
        console.log(`Ofertas para el producto ${this.nombre}:`);
        this.ofertas.forEach(oferta => console.log(`${oferta.persona}: $${oferta.valorOferta} (${oferta.fechaOferta})`))
    }

    seleccionarGanador() {
        if (this.ofertas.length === 0) {
            console.log(`No hay ofertas para el producto ${this.nombre}.`)
            return null
        }

        let ofertaGanadora = this.ofertas[0]
        for (const oferta of this.ofertas) {
            if (oferta.valorOferta > ofertaGanadora.valorOferta) {
                ofertaGanadora = oferta
            }
        }

        console.log(`La oferta ganadora para el producto ${this.nombre} es de ${ofertaGanadora.persona} por $${ofertaGanadora.valorOferta}.`);
        return ofertaGanadora
    }
}

class Subasta {
    constructor() {
        this.productos = []
    }

    registrarProducto(id, nombre, fecha, precioInicial) {
        const producto = new Producto(id, nombre, fecha, precioInicial)
        this.productos.push(producto)
        console.log(`Producto ${nombre} registrado en la subasta.`)
    }

    verProductos() {
        console.log("Lista de productos registrados en la subasta:")
        this.productos.forEach(producto => console.log(`${producto.id}: ${producto.nombre} (Precio inicial: $${producto.precioInicial})`))
    }

    realizarOferta(idProducto, persona, valorOferta, fechaOferta) {
        const producto = this.productos.find(producto => producto.id === idProducto)
        if (producto) {
            producto.realizarOferta(persona, valorOferta, fechaOferta)
        } else {
            console.log(`No se encontró ningún producto con el ID ${idProducto}.`)
        }
    }

    verOfertasProducto(idProducto) {
        const producto = this.productos.find(producto => producto.id === idProducto)
        if (producto) {
            producto.verOfertas()
        } else {
            console.log(`No se encontró ningún producto con el ID ${idProducto}.`)
        }
    }

    seleccionarGanador(idProducto) {
        const producto = this.productos.find(producto => producto.id === idProducto)
        if (producto) {
            return producto.seleccionarGanador();
        } else {
            console.log(`No se encontró ningún producto con el ID ${idProducto}.`)
            return null
        }
    }
}


const subasta = new Subasta()


subasta.registrarProducto(1, "Pintura", "2024-05-20", 50)
subasta.registrarProducto(2, "Escultura", "2024-05-21", 100)


subasta.realizarOferta(1, "Juan", 60, "2024-05-20")
subasta.realizarOferta(1, "Ana", 70, "2024-05-21")
subasta.realizarOferta(2, "Pedro", 120, "2024-05-21")
subasta.realizarOferta(2, "Maria", 150, "2024-05-22")


subasta.verOfertasProducto(1)
subasta.verOfertasProducto(2)


subasta.seleccionarGanador(1)
subasta.seleccionarGanador(2)