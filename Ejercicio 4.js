class Cliente {
    constructor(tipo, tieneCuenta) {
        this.tipo = tipo
        this.tieneCuenta = tieneCuenta
    }
}

class Atencion {
    constructor(tipo) {
        this.tipo = tipo
    }
}

class Caja {
    constructor(numero, tipoAtencion) {
        this.numero = numero
        this.tipoAtencion = tipoAtencion
        this.disponible = true
    }

    atenderCliente(cliente) {
        console.log(`Atendiendo cliente ${cliente.tipo} en caja ${this.numero}`)
    }
}

class Banco {
    constructor() {
        this.cajas = [
            new Caja(1, "retiro"),
            new Caja(2, "retiro"),
            new Caja(3, "deposito"),
            new Caja(4, "deposito"),
            new Caja(5, "asesoria")
        ]
        this.clientesEspera = []
    }

    asignarTurno(cliente, atencion) {
        this.clientesEspera.push({ cliente, atencion })
        console.log(`Se asignó turno a cliente ${cliente.tipo} para atención ${atencion.tipo}`)


        this.atenderClientesEnEspera();
    }

    atenderClientesEnEspera() {
        for (const caja of this.cajas) {
            if (caja.disponible && this.clientesEspera.length > 0) {
                const clienteEnEspera = this.clientesEspera.shift()
                caja.atenderCliente(clienteEnEspera.cliente)
                caja.disponible = false
            }
        }
    }
}


const banco = new Banco()

banco.asignarTurno(new Cliente("preferencial", true), new Atencion("caja"))
banco.asignarTurno(new Cliente("general", false), new Atencion("caja"))
banco.asignarTurno(new Cliente("sinCuenta", false), new Atencion("asesoria"))
banco.asignarTurno(new Cliente("preferencial", false), new Atencion("caja"))

setTimeout(() => {
    banco.cajas[0].disponible = true
    banco.atenderClientesEnEspera()
}, 3000)