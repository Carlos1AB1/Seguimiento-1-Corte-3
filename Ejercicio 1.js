class Usuario {
    constructor(id, tipo) {
        this.id = id
        this.tipo = tipo
    }
}

class ModuloAtencion {
    constructor(nombre) {
        this.nombre = nombre
        this.usuariosAtendidos = []
        this.transferencias = []
    }

    atenderUsuario(usuario, fecha) {
        this.usuariosAtendidos.push({ usuario, fecha })
    }

    transferirUsuario(usuario, otroModulo, fecha) {
        this.transferencias.push({ usuario, otroModulo, fecha })
        otroModulo.atenderUsuario(usuario, fecha)
    }

    obtenerEstadisticasPorSegmento() {
        const estadisticas = { Estudiante: 0, Docente: 0 }
        this.usuariosAtendidos.forEach((registro) => {
            estadisticas[registro.usuario.tipo]++
        })
        return estadisticas
    }

    obtenerEstadisticasDiarias() {
        const estadisticasDiarias = {}
        this.usuariosAtendidos.forEach((registro) => {
            const fecha = registro.fecha
            if (!estadisticasDiarias[fecha]) {
                estadisticasDiarias[fecha] = { Estudiante: 0, Docente: 0 }
            }
            estadisticasDiarias[fecha][registro.usuario.tipo]++
        })
        return estadisticasDiarias
    }
}

class SistemaAtencion {
    constructor() {
        this.modulos = {
            telefono: new ModuloAtencion("Teléfono"),
            oficina: new ModuloAtencion("Oficina")
        }
    }

    atenderUsuarioEnModulo(usuario, modulo, fecha) {
        this.modulos[modulo].atenderUsuario(usuario, fecha)
    }

    transferirUsuarioEntreModulos(usuario, moduloOrigen, moduloDestino, fecha) {
        this.modulos[moduloOrigen].transferirUsuario(usuario, this.modulos[moduloDestino], fecha)
    }

    obtenerEstadisticasTotales() {
        const totalAtendidos = { Estudiante: 0, Docente: 0 }
        Object.values(this.modulos).forEach((modulo) => {
            const stats = modulo.obtenerEstadisticasPorSegmento()
            totalAtendidos.Estudiante += stats.Estudiante
            totalAtendidos.Docente += stats.Docente
        });
        return totalAtendidos;
    }

    obtenerEstadisticasDiariasPorModulo(modulo) {
        return this.modulos[modulo].obtenerEstadisticasDiarias()
    }

    obtenerTransferenciasPorModulo(modulo) {
        return this.modulos[modulo].transferencias
    }
}


const sistema = new SistemaAtencion()

const usuario1 = new Usuario(1, "Estudiante")
const usuario2 = new Usuario(2, "Docente")

sistema.atenderUsuarioEnModulo(usuario1, "telefono", "2024-05-19")
sistema.atenderUsuarioEnModulo(usuario2, "oficina", "2024-05-19")

sistema.transferirUsuarioEntreModulos(usuario1, "telefono", "oficina", "2024-05-19")

console.log(sistema.obtenerEstadisticasTotales())
console.log(sistema.obtenerEstadisticasDiariasPorModulo("telefono"))
console.log(sistema.obtenerEstadisticasDiariasPorModulo("oficina"))
console.log(sistema.obtenerTransferenciasPorModulo("telefono"))
