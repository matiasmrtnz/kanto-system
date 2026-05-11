<script>
    let { data } = $props();
    // Paginacion
    import Paginacion from "$lib/componentes/Paginacion.svelte";
    let movimientos = $derived(data.movimientos);
    let currentPage = $derived(data.currentPage);
    let hasMore = $derived(data.hasMore);

    // Busqueda
    import { goto } from "$app/navigation";
    let valorBusqueda = $state(data.busquedaActual || "");
    let valorTipo = $state(data.tipoActual || "");
    let tipos = data.tipos || [];

    function realizarBusqueda() {
        let params = new URLSearchParams();
        params.set("page", "1");
        if (valorBusqueda) params.set("nombre", valorBusqueda);
        if (valorTipo) params.set("tipo", valorTipo);
        goto(`/movimientos?${params.toString()}`);
    }
    function presionarEnter(event) {
        if (event.key === "Enter") {
            realizarBusqueda();
        }
    }
        function getIcono(id) {
        return `/iconos/tipos/${id}.svg`;
    }
</script>

<h1 class="titulo">MOVIMIENTOS</h1>
<div class="buscador-container">
    <select
        class="buscador select-tipo"
        bind:value={valorTipo}
        onchange={realizarBusqueda}
    >
        <option value="">Todos</option>
        {#each tipos as tipo}
            <option value={tipo.id}>{tipo.nombre}</option>
        {/each}
    </select>
    <input
        class="buscador"
        placeholder="Buscar movimiento..."
        bind:value={valorBusqueda}
        onkeydown={presionarEnter}
    />
    <input
        class="btn"
        type="button"
        value="Buscar"
        onclick={realizarBusqueda}
    />
</div>
<div class="padre-mov">
    {#each data.movimientos as movimiento}
        <a href="/movimientos/{movimiento.id}" class="detalle">
            <div class="tarjeta-mov borde-neon">
                <h3>{movimiento.nombre}</h3>
                <p class="id-movimiento">ID: {movimiento.id}</p>

                <div class="tipos-mov">
                    {#if movimiento.tipo}
                        <span class="tipo-mov">
                            {#if getIcono(movimiento.tipo.id) !== ""}
                                <img
                                    src={getIcono(movimiento.tipo.id)}
                                    alt={movimiento.tipo.nombre}
                                    class="icono-img"
                                />
                            {/if}
                            {movimiento.tipo.nombre}
                        </span>
                    {/if}
                </div>
                <div class="categoria-mov {movimiento.categoria}">
                    Categoría: {movimiento.categoria}
                </div>
                <div class="stats-grid">
                    <div class="stat-box borde-neon">
                        <span class="stat-label">Potencia</span>
                        <span class="stat-valor"
                            >{movimiento.potencia || "-"}</span
                        >
                    </div>
                    <div class="stat-box borde-neon">
                        <span class="stat-label">Precisión</span>
                        <span class="stat-valor"
                            >{movimiento.precision || "-"}</span
                        >
                    </div>
                    <div class="stat-box borde-neon">
                        <span class="stat-label">PP</span>
                        <span class="stat-valor">{movimiento.usos}</span>
                    </div>
                </div>
            </div>
        </a>
    {/each}
</div>
<Paginacion {currentPage} {hasMore} />
