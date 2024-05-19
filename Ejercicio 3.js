class Habitacion {
    constructor(tipo, capacidad, fumador) {
        this.tipo = tipo
        this.capacidad = capacidad
        this.fumador = fumador
        this.reservada = false
        this.mascotasPermitidas = this.tipo === "familiar"
    }

    puedeReservar(personas, mascotas) {
        return !this.reservada && personas <= this.capacidad && (!mascotas || this.mascotasPermitidas)
    }

    reservar() {
        this.reservada = true
    }

    liberar() {
        this.reservada = false
    }
}

class Reserva {
    constructor(nombre, pais, personas, fechaInicio, fechaFin, mascotas) {
        this.nombre = nombre
        this.pais = pais
        this.personas = personas
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
        this.mascotas = mascotas
    }
}

class Hotel {
    constructor() {
        this.habitaciones = {
            individual: Array(3).fill(new Habitacion("individual", 2, false)),
            doble: Array(3).fill(new Habitacion("doble", 4, false)),
            familiar: Array(3).fill(new Habitacion("familiar", 6, false))
        }
        this.reservas = []
    }

    hacerReserva(nombre, pais, tipoHabitacion, personas, fechaInicio, fechaFin, mascotas) {
        const habitacionDisponible = this.habitaciones[tipoHabitacion].find(habitacion =>
            habitacion.puedeReservar(personas, mascotas)
        );

        if (habitacionDisponible) {
            habitacionDisponible.reservar()
            const reserva = new Reserva(nombre, pais, personas, fechaInicio, fechaFin, mascotas)
            this.reservas.push(reserva)
            console.log("Reserva realizada con éxito.")
        } else {
            console.log("Lo sentimos, no hay habitaciones disponibles para esa solicitud.")
        }
    }

    obtenerEstadisticas() {
        const totalReservas = this.reservas.length;
        const totalPersonasOcupadas = this.reservas.reduce((total, reserva) => total + reserva.personas, 0)
        const totalMascotas = this.reservas.filter(reserva => reserva.mascotas).length

        return {
            totalReservas,
            totalPersonasOcupadas,
            totalMascotas
        }
    }
}


const hotel = new Hotel()


hotel.hacerReserva("Juan", "España", "individual", 1, "2024-06-01", "2024-06-05", false)


const estadisticas = hotel.obtenerEstadisticas()
console.log("Estadísticas del hotel:", estadisticas)