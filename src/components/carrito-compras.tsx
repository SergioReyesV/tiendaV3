import { createSignal, For, Show } from "solid-js";
import type { Producto } from "../App";

interface ProductoConCantidad extends Producto {
	cantidad: number;
}

interface PropsCarrito {
	carrito: ProductoConCantidad[]; // Cambié el tipo aquí para reflejar que carrito ya tiene la cantidad
	removeProduct: (id: number) => void;
}

export function CarritoCompras(props: PropsCarrito) {
	// Calcular el total sumando los productos y sus cantidades
	const total = () =>
		props.carrito.reduce(
			(acc, product) => acc + product.price * product.cantidad,
			1,
		);

	// Eliminar un producto del carrito
	const handleRemoveProduct = (id: number) => {
		props.removeProduct(id);
	};
	return (
  <div class="p-4 bg-red-50 shadow-md rounded-lg border">
    <Show
      when={props.carrito.length > 0 && props.carrito.some(product => product.cantidad > 0)} // Comprobamos que haya productos con cantidad mayor a 0
      fallback={<p class="text-center text-gray-600">No hay productos en el carrito.</p>} // Mostramos el mensaje si no hay productos con cantidad mayor a 0
    >
      <div class="space-y-4">
        <ul class="space-y-3">
          <For each={props.carrito}>
            {(product) => (
              <li class="p-4 border-b flex justify-between items-center">
                <div class="flex-1">
                  <p class="font-semibold text-lg">{product.name}</p>
                  <p class="text-gray-500">{product.price}$</p>
                  <p class="text-sm text-gray-600">
                    Cantidad: {product.cantidad}
                  </p>
                </div>
                <div class="flex items-center space-x-3">
                  <button
                    type="button"
                    class="text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
        <div class="mt-4 p-3 bg-rose-50 text-center rounded-md shadow-md border">
          <p class="font-bold text-xl">Total: {total()}$</p>
        </div>
      </div>
    </Show>
  </div>
);


	// return (
	// 	<div class="p-4 bg-red-50 shadow-md rounded-lg border">
	// 		<Show
	// 			when={props.carrito.length > 0}
	// 			fallback={
	// 				<p class="text-center text-gray-600">
	// 					No hay productos en el carrito.
	// 				</p>
	// 			}
	// 		>
	// 			<div class="space-y-4">
	// 				<ul class="space-y-3">
	// 					<For each={props.carrito}>
	// 						{(product) => (
	// 							<li class="p-4 border-b flex justify-between items-center">
	// 								<div class="flex-1">
	// 									<p class="font-semibold text-lg">{product.name}</p>
	// 									<p class="text-gray-500">{product.price}$</p>
	// 									<p class="text-sm text-gray-600">
	// 										Cantidad: {product.cantidad}
	// 									</p>
	// 								</div>
	// 								<div class="flex items-center space-x-3">
	// 									<button
	// 										type="button"
	// 										class="text-red-600 hover:text-red-800"
	// 										onClick={() => handleRemoveProduct(product.id)}
	// 									>
	// 										Eliminar
	// 									</button>
	// 								</div>
	// 							</li>
	// 						)}
	// 					</For>
	// 				</ul>
	// 				<div class="mt-4 p-3 bg-rose-50 text-center rounded-md shadow-md border">
	// 					<p class="font-bold text-xl">Total: {total()}$</p>
	// 				</div>
	// 			</div>
	// 		</Show>
	// 	</div>
	// );
}
