<script>
    let { data } = $props();
    // Paginacion
    import Paginacion from "$lib/componentes/Paginacion.svelte";
    let currentPage = $derived(data.currentPage);
    let hasMore = $derived(data.hasMore);

    //Busqueda
    import { goto } from "$app/navigation";
    let valorBusqueda = $state(data.busquedaActual || "");
    let valorMinStat = $state(data.minStatActual || "");
    let valorTipo = $state(data.tipoActual || "");
    let tipos = $state(data.tipos || []);

    function Busqueda() {
        let params = new URLSearchParams();
        params.set("page", "1");
        if (valorBusqueda) params.set("nombre", valorBusqueda);
        if (valorMinStat) params.set("min_stat", valorMinStat);
        if (valorTipo) params.set("tipo", valorTipo);
        goto(`/pokemon?${params.toString()}`);
    }
    function prcionarEnter(event) {
        if (event.key === "Enter") {
            Busqueda();
        }
    }
</script>

<h1 class="titulo">POKEMONES</h1>
<div class="buscador-container">
    <select
        class="buscador select-tipo"
        bind:value={valorTipo}
        onchange={Busqueda}
    >
        <option value="">Todos</option>
        {#each tipos as tipo}
            <option value={tipo.id}>{tipo.nombre}</option>
        {/each}
    </select>

    <input
        class="buscador"
        placeholder="Nombre del Pokémon..."
        bind:value={valorBusqueda}
        onkeydown={prcionarEnter}
    />

    <input
        class="buscador input-stat"
        type="number"
        placeholder="Min Stat"
        bind:value={valorMinStat}
        onkeydown={prcionarEnter}
    />
    <input class="btn" type="button" value="Buscar" onclick={Busqueda} />
</div>
<div class="padre">
    {#each data.pokemones as pokemon}
        <a href={`/pokemon/${pokemon.id}`} class="detalle">
            <div class="tarjeta borde-neon">
                <img src={pokemon.imagen} alt={pokemon.nombre} />
                <h3>{pokemon.nombre}</h3>
                <div class="tipos">
                    {#each pokemon.tipos as tipo}
                        <span class="tipo">
                            {tipo.nombre}
                        </span>
                    {/each}
                </div>
                <p>ID: {pokemon.id}</p>
            </div>
        </a>
    {/each}
</div>
<Paginacion {currentPage} {hasMore} />

<!-- Para que no me las flechitas de numeros a la hora de buscar por minimo de stats -->
<style>
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>