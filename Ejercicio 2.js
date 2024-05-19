class Cuenta {
    constructor(numero, saldo) {
        this.numero = numero
        this.saldo = saldo
    }

    retirar(monto) {
        if (monto <= this.saldo && monto % 50000 === 0) {
            this.saldo -= monto
            return true
        }
        return false
    }

    depositar(monto) {
        this.saldo += monto
    }

    consultarSaldo() {
        return this.saldo
    }

    transferir(monto, cuentaDestino) {
        if (monto <= this.saldo) {
            this.saldo -= monto
            cuentaDestino.depositar(monto)
            return true
        }
        return false
    }
}

class Cliente {
    constructor(identificacion, pin, cuentas) {
        this.identificacion = identificacion;
        this.pin = pin;
        this.cuentas = cuentas
        this.intentosPin = 0
    }

    validarPin(pin) {
        return this.pin === pin
    }

    obtenerCuenta(numeroCuenta) {
        return this.cuentas.find(cuenta => cuenta.numero === numeroCuenta)
    }
}

class Banco {
    constructor(clientes) {
        this.clientes = clientes
    }

    validarCliente(identificacion, pin) {
        const cliente = this.clientes.find(c => c.identificacion === identificacion)
        if (cliente && cliente.validarPin(pin)) {
            cliente.intentosPin = 0
            return cliente
        } else {
            if (cliente) cliente.intentosPin++
            return null
        }
    }

    puedeIntentarPin(cliente) {
        return cliente.intentosPin < 3
    }
}

class CajeroAutomatico {
    constructor(banco) {
        this.banco = banco
        this.clienteActual = null
        this.encendido = false
    }

    encender() {
        this.encendido = true
        console.log("Cajero encendido.")
    }

    apagar() {
        this.encendido = false
        this.clienteActual = null
        console.log("Cajero apagado.")
    }

    insertarDocumento(identificacion, pin) {
        if (!this.encendido) {
            console.log("El cajero está apagado.")
            return;
        }

        const cliente = this.banco.validarCliente(identificacion, pin)
        if (cliente) {
            this.clienteActual = cliente
            console.log("Cliente autenticado.")
            this.mostrarMenu()
        } else {
            console.log("Documento o PIN incorrecto.")
            if (!this.banco.puedeIntentarPin(cliente)) {
                console.log("Demasiados intentos fallidos. Acceso bloqueado.")
            }
        }
    }

    mostrarMenu() {
        console.log("Menú de opciones:")
        console.log("1. Retirar efectivo")
        console.log("2. Depositar")
        console.log("3. Transferir")
        console.log("4. Consultar saldo")
        console.log("5. Salir")
    }

    procesarOpcion(opcion) {
        if (!this.clienteActual) {
            console.log("No hay cliente autenticado.")
            return;
        }

        switch (opcion) {
            case 1:
                const cuentaRetiro = this.clienteActual.obtenerCuenta(prompt("Ingrese número de cuenta:"))
                const montoRetiro = parseInt(prompt("Ingrese monto a retirar (múltiplo de 50000):"))
                if (cuentaRetiro.retirar(montoRetiro)) {
                    console.log(`Retiro exitoso. Puede tomar ${montoRetiro} de la bandeja principal.`)
                } else {
                    console.log("Retiro fallido. Verifique el saldo o el monto.")
                }
                break;
            case 2:
                const cuentaDeposito = this.clienteActual.obtenerCuenta(prompt("Ingrese número de cuenta:"))
                const montoDeposito = parseInt(prompt("Ingrese monto a depositar:"))
                cuentaDeposito.depositar(montoDeposito)
                console.log("Depósito exitoso.")
                break
            case 3:
                const cuentaOrigen = this.clienteActual.obtenerCuenta(prompt("Ingrese número de cuenta de origen:"))
                const cuentaDestino = this.clienteActual.obtenerCuenta(prompt("Ingrese número de cuenta destino:"))
                const montoTransferencia = parseInt(prompt("Ingrese monto a transferir:"))
                if (cuentaOrigen.transferir(montoTransferencia, cuentaDestino)) {
                    console.log("Transferencia exitosa.")
                } else {
                    console.log("Transferencia fallida. Verifique el saldo.")
                }
                break;
            case 4:
                const cuentaConsulta = this.clienteActual.obtenerCuenta(prompt("Ingrese número de cuenta:"))
                console.log(`Saldo actual: ${cuentaConsulta.consultarSaldo()}`)
                break;
            case 5:
                console.log("Gracias por usar el cajero automático.")
                this.clienteActual = null
                break;
            default:
                console.log("Opción no válida.")
                break
        }

        if (this.clienteActual) {
            this.mostrarMenu()
        }
    }
}




const cuenta1 = new Cuenta("12345", 1000000)
const cuenta2 = new Cuenta("67890", 500000)

const cliente = new Cliente("1001", "1234", [cuenta1, cuenta2])
const banco = new Banco([cliente])

const cajero = new CajeroAutomatico(banco)
cajero.encender()


const identificacion = prompt("Ingrese su documento de identidad:")
const pin = prompt("Ingrese su PIN:")

cajero.insertarDocumento(identificacion, pin)

while (cajero.clienteActual) {
    const opcion = parseInt(prompt("Seleccione una opción:"))
    cajero.procesarOpcion(opcion)
}
