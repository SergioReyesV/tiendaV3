import { createResource, createSignal, Show } from "solid-js";
import "./App.css";
import { CarritoCompras } from "./components/carrito-compras";
import { ListaProductos } from "./components/lista-productos";

export interface Producto {
	cantidad: number;
	id: number;
	name: string;
	category: string;
	price: number;
	image: {
		thumbnail: string;
		mobile: string;
		tablet: string;
		desktop: string;
	};
}

const fetchProducto = async (): Promise<Producto[]> => {
	const res = await fetch("http://localhost:4000/products");
	return res.json();
};

export function App() {
	const [productsFetch] = createResource(fetchProducto);
	const [carrito, setCarrito] = createSignal<Producto[]>([]);

	// App.tsx
function updateCarrito(product: Producto, cantidad: number) {
	setCarrito((prevCarrito) => {
	  const carritoActualizado = [...prevCarrito];
	  const index = carritoActualizado.findIndex((p) => p.id === product.id);
  
	  if (index !== -1) {
		const existingProduct = carritoActualizado[index];
		// Actualizamos la cantidad correctamente
		carritoActualizado[index] = {
		  ...existingProduct,
		  cantidad: Math.max(0, (existingProduct.cantidad || 0) + cantidad), // Asegura que la cantidad no sea negativa
		};
	  } else {
		carritoActualizado.push({ ...product, cantidad: 1 });
	  }
  
	  return carritoActualizado;
	});
  }
  

	// Función para eliminar producto del carrito
	function removeProduct(productId: number) {
		setCarrito((prev) => prev.filter((product) => product.id !== productId));
	}

	return (
		<>
			<div class="min-h-screen bg-gray-50 flex flex-col">
				<header class="bg-white text-rose-500 p-4 shadow-md">
					<h1 class="text-3xl font-semibold text-center">Tienda De Postres</h1>
				</header>

				<main class="flex flex-1 p-6 space-x-6">
					{/* Sección de Productos */}
					<div class="flex-1 bg-rose-50 rounded-lg shadow-md p-6 border">
						<h2 class="text-2xl font-semibold text-gray-800 mb-4">Productos</h2>
						<Show
							when={productsFetch}
							fallback={<p class="text-center text-gray-600">Cargando...</p>}
						>
							<ListaProductos
								products={productsFetch() || []}
								updateCarrito={updateCarrito}
								carrito={carrito()} // Aquí estamos pasando el carrito también
							/>
						</Show>
					</div>

					{/* Sección de Carrito */}
					<div class="w-full md:w-1/3 bg-rose-50 rounded-lg shadow-md p-6 border">
						<h2 class="text-2xl font-semibold text-gray-800 mb-4">
							Carrito de Compras
						</h2>
						<CarritoCompras carrito={carrito()} removeProduct={removeProduct} />
					</div>
				</main>

				<footer class="bg-white text-rose-500 text-center p-4">
					<p>&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
				</footer>
			</div>
		</>
	);
}

export default App;
