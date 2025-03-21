import {
	createEffect,
	createResource,
	createSignal,
	For,
	Match,
	Show,
} from "solid-js";


const fetchProducto = async () => {
	const res = await fetch("http://localhost:4000/products");
	return res.json();
};

export function ListaProductos() {
	const [products] = createResource(fetchProducto);
	const [getProducto, setProducto] = createSignal(0);
	const [cart, setCart] = createSignal<Product[]>([]); // Especificar el tipo de cart como Cart

	const addToCart = (product: Product) => {
		setCart((prev) => {
			const newCart = [...prev];
			return [...newCart, product];
		});
	};

	createEffect(() => {
		console.log(cart());
	});

	return (
		<div class="flex flex-wrap">
			<Show when={products()} fallback={<p>Loading...</p>}>
				<div class="flex flex-wrap w-full">
					<For each={products()}>
						{(product) => (
							<div class="w-1/3 p-2 ">
								<img class="" src={product.image.desktop} alt="img" />
								<div class="flex border justify-center">
									<ul>
										<li>
											<button
												type="button"
												class="text-2x1 pl-15 pr-15 border bg-white hover:bg-gray-400 rounded-2xl"
												onClick={
													/*{() => setProducto((v) => v + 1)}*/ () =>
														addToCart(product)
												}
											>
												Agregar {getProducto()}
											</button>
										</li>
										<li>Categoria: {product.category}</li>
										<li>Nombre: {product.name}</li>
										<li>Precio: {product.price}</li>
									</ul>
								</div>
							</div>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
}
