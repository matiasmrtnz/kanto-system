export async function load({ params, fetch }) {
    const id = params.id;

    const res = await fetch(`http://127.0.0.1:8000/api/pokemon/${id}`);

    if (!res.ok) {
        throw new Error(`Error cargando Pokémon ID ${id}`);
    }

    const pokemon = await res.json();

    // request para traer nombre e imagen de la evolucion
    const evoluciones_detalladas = [];

    for (const evo of pokemon.evoluciones) {
        const r = await fetch(`http://127.0.0.1:8000/api/pokemon/${evo.id}`);
        if (r.ok) {
            evoluciones_detalladas.push(await r.json());
        }
    }

    return {
        pokemon,
        evoluciones_detalladas
    };
}
