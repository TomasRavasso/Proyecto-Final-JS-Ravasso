class Producto {
    constructor(nombre, precio, id, cantidad, clase, img, descripcion) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.cantidad = cantidad;
        this.clase = clase;
        this.img = img;
        this.descripcion = descripcion;
    }

    aumentarCantidad() {
        this.cantidad += 1;
    }
}

class Carrito {
    constructor() {
        this.arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];
    }

    guardarStorage() {
        localStorage.setItem("arrayCarrito", JSON.stringify(this.arrayCarrito));
    }

    agregar(productoAgregar) {
        let existeProducto = this.arrayCarrito.find(producto => producto.id === productoAgregar.id);

        if (existeProducto) {
            existeProducto.cantidad += 1;
        } else {
            productoAgregar.aumentarCantidad();
            this.arrayCarrito.push(productoAgregar);
        }

        this.guardarStorage();
    }
}

class ControladorProducto {
    constructor() {
        this.arrayProductos = [];
    }

    agregar(producto) {
        this.arrayProductos.push(producto);
    }

    sweetAlertAñadir() {
        Swal.fire({
            background: 'grey',
            position: 'center',
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1500
        });
    }

    mostrarProductosUsuario() {
        let mainTienda = document.getElementById("main-discos");
        mainTienda.innerHTML = '';

        this.arrayProductos.forEach(producto => {
            mainTienda.innerHTML += `
                <div class="card-${producto.clase}">
                    <img class="card-img" src="${producto.img}" alt="">
                    <div class="card-texto">
                        <h5 class="card-h5">${producto.nombre}</h5>
                        <p class="card-p">${producto.descripcion}</p>
                        <a href="#" class="btn btn-primary" id="p-${producto.id}">Comprar</a>
                    </div>
                </div>
            `;
        });

        this.arrayProductos.forEach(producto => {
            const btn = document.getElementById(`p-${producto.id}`);
            btn.addEventListener("click", () => {
                carrito.agregar(producto);
                controladorDiscos.sweetAlertAñadir();
            });
        });
    }
}

const carrito = new Carrito();
const controladorDiscos = new ControladorProducto();

controladorDiscos.agregar(new Producto("A 18' del Sol", 1000, 1, 0, "a18delsol", "../img/albuma18delsol.jpg", "A 18' del Sol: Este álbum presenta una mezcla única de rock y jazz, característica del enfoque musical diverso de Spinetta en su etapa solista."));
controladorDiscos.agregar(new Producto("Fuego Gris", 2000, 2, 0, "fuegogris", "../img/albumfuegogris.jpg", "Fuego Gris: El debut solista de Spinetta luego de Almendra. Este álbum es una joya del rock argentino, con canciones llenas de poesía y experimentación."))
controladorDiscos.agregar(new Producto("Kamikaze" , 4000, 3, 0, "kamikaze", "../img/albumkamikaze.jpg", "Kamikaze: Un álbum con un sonido más fresco y accesible, pero sin perder la profundidad lírica que caracteriza a Spinetta."))
controladorDiscos.agregar(new Producto("La La La", 3200, 4, 0, "lalala", "../img/albumlalala.jpg", "La La La: Un álbum con influencias folclóricas y una combinación de canciones alegres y melancólicas. Un clásico de la carrera de Spinetta. "))
controladorDiscos.agregar(new Producto("Para los arboles", 1250, 5, 0, "paralosarboles", "../img/albumparalosarboles.jpg", "Para los arboles:  En este álbum, Spinetta muestra su habilidad para combinar diferentes estilos, desde el rock hasta la música electrónica."))
controladorDiscos.agregar(new Producto("Pelúson of milk", 1000, 6, 0, "pelusonofmilk", "../img/albumpelusonofmilk.jpg", "Pelúson of milk: Un álbum en el que Spinetta exploró ritmos brasileños y folclóricos, creando un trabajo musicalmente diverso y lleno de energía. "))
controladorDiscos.agregar(new Producto("Príve", 1500, 7, 0, "prive", "../img/albumprive.jpg", "Príve:  Un álbum en vivo que captura la atmósfera íntima de los conciertos de Spinetta en solitario, con versiones únicas de sus canciones."))
controladorDiscos.agregar(new Producto("Mañana", 3000, 8, 0, "mañana", "../img/albummaniana.jpg","Mañana:  Spinetta muestra su capacidad para crear música experimental y atmosférica en este álbum, con letras reflexivas." ))
controladorDiscos.agregar(new Producto("Don Lucero", 2500, 9, 0, "donlucero", "../img/albumdonlucero.jpg",  "Don Lucero: Un álbum con un enfoque más acústico, que explora temas de amor y espiritualidad. La voz de Spinetta brilla en este trabajo."))

controladorDiscos.mostrarProductosUsuario();

