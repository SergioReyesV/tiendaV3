import { createSignal, For, Show } from "solid-js";
import type { Producto } from "../App";

interface PropsCarrito {
	updateCarrito: (product: Producto, cantidad: number) => void;
	products: Producto[];
	carrito: Producto[]; // Asegúrate de tener el carrito
}

export function ListaProductos(props: PropsCarrito) {
	// Aumentar cantidad de producto en el carrito
	const aumentarCantidad = (product: Producto) => {
		props.updateCarrito(product, 1); // Aumentamos cantidad en 1
	};

	// Disminuir cantidad de producto en el carrito
	const disminuirCantidad = (product: Producto) => {
		props.updateCarrito(product, -1); // Disminuimos cantidad en 1
	};

	return (
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
			<Show
				when={props.products.length > 0}
				fallback={
					<p class="text-center text-gray-600">Cargando productos...</p>
				}
			>
				<For each={props.products}>
					{(product) => {
						// Buscar si el producto ya está en el carrito
						const productoEnCarrito = props.carrito.find(
							(item) => item.id === product.id,
						);
						const cantidad = productoEnCarrito ? productoEnCarrito.cantidad : 0;

						return (
							<div class="bg-red-50 border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
								<img
									class="w-full h-56 object-cover"
									src={product.image.desktop}
									alt={product.name}
								/>
								<div class="p-4 flex flex-col justify-between space-y-4">
									<div class="space-y-2">
										<p class="text-xl font-semibold text-gray-800">
											{product.name}
										</p>
										<p class="text-sm text-gray-500">{product.category}</p>
										<p class="text-lg text-gray-700 font-medium">
											{product.price}$
										</p>
									</div>
									{cantidad === 0 && (
										<div class="flex items-center">
											<button
												type="button"
												class="p-2 bg-rose-400 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
												onClick={() => aumentarCantidad(product)} // Aumentar cantidad
											>
												Agregar
											</button>
										</div>
									)}
									{/* Agregar al carrito si no está en el carrito */}
									{cantidad > 0 && (
										<div class="flex items-center">
											<button
												type="button"
												class="p-2 bg-rose-400 text-white rounded-l-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
												onClick={() => disminuirCantidad(product)} // Disminuir cantidad
											>
												-
											</button>
											<button
												type="button"
												class="p-2 bg-rose-400 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
												onClick={() => aumentarCantidad(product)} // Aumentar cantidad
											>
												Agregar
											</button>
											<button
												type="button"
												class="p-2 bg-rose-400 text-white rounded-r-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
												onClick={() => aumentarCantidad(product)} // Aumentar cantidad
											>
												+
											</button>
										</div>
									)}
								</div>
							</div>
						);
					}}
				</For>
			</Show>
		</div>
	);
}

// import { createSignal, For, Show } from "solid-js";
// import type { Producto } from "../App";

// interface PropsCarrito {
//   updateCarrito: (product: Producto, cantidad: number) => void;
//   products: Producto[];
//   carrito: Producto[]; // Agregamos el carrito para acceder a las cantidades
// }

// export function ListaProductos(props: PropsCarrito) {
//   // Aumentar cantidad de producto en el carrito
//   const aumentarCantidad = (product: Producto) => {
//     props.updateCarrito(product, 1); // Aumentamos cantidad en 1
//   };

//   // Disminuir cantidad de producto en el carrito
//   const disminuirCantidad = (product: Producto) => {
//     props.updateCarrito(product, -1); // Disminuimos cantidad en 1
//   };

//   // Obtener la cantidad de un producto en el carrito
//   const getCantidad = (productId: number) => {
//     const productInCart = props.carrito.find((p) => p.id === productId);
//     return productInCart ? productInCart.cantidad : 0; // Si no está en el carrito, la cantidad es 0
//   };

//   return (
//     <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//       <Show
//         when={props.products.length > 0}
//         fallback={<p class="text-center text-gray-600">Cargando productos...</p>}
//       >
//         <For each={props.products}>
//           {(product) => {
//             const cantidad = getCantidad(product.id); // Obtener la cantidad del producto en el carrito

//             return (
//               <div class="bg-red-50 border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
//                 <img
//                   class="w-full h-56 object-cover"
//                   src={product.image.desktop}
//                   alt={product.name}
//                 />
//                 <div class="p-4 flex flex-col justify-between space-y-4">
//                   <div class="space-y-2">
//                     <p class="text-xl font-semibold text-gray-800">{product.name}</p>
//                     <p class="text-sm text-gray-500">{product.category}</p>
//                     <p class="text-lg text-gray-700 font-medium">{product.price}$</p>
//                     {cantidad > 0 && (
//                       <p class="text-sm text-gray-600">
//                         En carrito: {cantidad}
//                       </p>
//                     )}
//                   </div>
//                   <div class="flex items-center space-x-4 mt-4">
//                     {cantidad > 0 && (
//                       <button
//                         type="button"
//                         class="w-1/4 py-2 px-4 bg-rose-400 text-black rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                         onClick={() => disminuirCantidad(product)} // Disminuir la cantidad
//                       >
//                         -
//                       </button>
//                     )}
//                     <button
//                       type="button"
//                       class="w-1/2 py-2 px-4 bg-rose-400 text-black rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                       onClick={() => aumentarCantidad(product)} // Aumentar la cantidad
//                     >
//                       {cantidad > 0 ? "Agregar más" : "Agregar al carrito"}
//                     </button>
//                     {cantidad > 0 && (
//                       <button
//                         type="button"
//                         class="w-1/4 py-2 px-4 bg-red-400 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//                         onClick={() => disminuirCantidad(product)} // Disminuir la cantidad
//                       >
//                         -
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           }}
//         </For>
//       </Show>
//     </div>
//   );
// }
