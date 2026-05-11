<script>
    export let data;

    $: pokemon = data.pokemon;
    $: evoluciones = data.evoluciones_detalladas;


</script>

<div class="container">

    <h1 class="titulo">{pokemon.nombre}</h1>

    <!-- TARJETA PRINCIPAL -->
    <div class="tarjeta-principal">

        <img class="imagen" src={pokemon.imagen} alt={pokemon.nombre} />

        <div class="info-basica">
            <p><strong>ID:</strong> {pokemon.id}</p>
            <p><strong>Altura:</strong> {pokemon.altura} m</p>
            <p><strong>Peso:</strong> {pokemon.peso} kg</p>

            <div class="tipos">
                {#each pokemon.tipos as t}
                    <span class="tipo">{t.nombre}</span>
                {/each}
            </div>
        </div>
    </div>

    <!-- ESTADISTICAS -->
    <h2 class="subtitulo">Estadísticas</h2>
    <div class="stats">
        {#each Object.entries(pokemon.estadisticas) as [stat, valor]}
            <div class="stat">
                <label>{stat}</label>
                <div class="barra">
                    <div class="llenado" style="width: {valor * 1.5}px"></div>
                </div>
                <span class="valor">{valor}</span>
            </div>
        {/each}
    </div>

    <!-- EVOLUCIONES -->
    <h2 class="subtitulo">Evoluciones</h2>

    {#if evoluciones.length > 0}
        <div class="contenedor-evo">
            {#each evoluciones as evo}
                <a href={`/pokemon/${evo.id}`} class="tarjeta-evo">

                    <img src={evo.imagen} />
                    <p>{evo.nombre}</p>
                </a>
            {/each}
        </div>
    {:else}
        <p class="no-evo">No tiene evoluciones.</p>
    {/if}

    <!-- MOVIMIENTOS -->
    <h2 class="subtitulo">Movimientos</h2>
    <div class="movimientos">
        {#each pokemon.movimientos_nivel as mov}
            <details class="mov">
                <summary>{mov.nombre} ({mov.tipo.nombre})</summary>
                <p><strong>Potencia:</strong> {mov.potencia}</p>
                <p><strong>Precisión:</strong> {mov.precision}</p>
                <p><strong>Usos:</strong> {mov.usos}</p>
                <p><strong>Efecto:</strong> {mov.efecto}</p>
            </details>
        {/each}
    </div>

</div>

