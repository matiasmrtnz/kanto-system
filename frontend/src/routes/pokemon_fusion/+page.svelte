<script>
    let { data, form } = $props();

    let primerPokemonId = $state('');
    let segundoPokemonId = $state('');
    let busquedaPrimero = $state('');
    let busquedaSegundo = $state('');
    let mostrarSugerenciasPrimero = $state(false);
    let mostrarSugerenciasSegundo = $state(false);
    
    let pokemonesFiltradosPrimero = $derived(
        busquedaPrimero.length > 0 
            ? data.pokemones.filter(p => 
                p.nombre.toLowerCase().includes(busquedaPrimero.toLowerCase())
              ).slice(0, 10)
            : []
    );
    
    let pokemonesFiltradosSegundo = $derived(
        busquedaSegundo.length > 0 
            ? data.pokemones.filter(p => 
                p.nombre.toLowerCase().includes(busquedaSegundo.toLowerCase())
              ).slice(0, 10)
            : []
    );
    
    function seleccionarPrimero(pokemon) {
        primerPokemonId = pokemon.id;
        busquedaPrimero = pokemon.nombre;
        mostrarSugerenciasPrimero = false;
    }
    
    function seleccionarSegundo(pokemon) {
        segundoPokemonId = pokemon.id;
        busquedaSegundo = pokemon.nombre;
        mostrarSugerenciasSegundo = false;
    }


    function randomizePokemons() {
    const max = data.pokemones.length;
    if (max < 2) return;
    let idx1 = Math.floor(Math.random() * max);
    let idx2;
    do {
        idx2 = Math.floor(Math.random() * max);
    } while (idx2 === idx1);

    const poke1 = data.pokemones[idx1];
    const poke2 = data.pokemones[idx2];

    primerPokemonId = poke1.id;
    segundoPokemonId = poke2.id;
    busquedaPrimero = poke1.nombre;
    busquedaSegundo = poke2.nombre;
}
</script>


<h1>Pokefusión</h1>

<div class="contenedor-flex">
    <form method="POST" action="?/fusionar" class="formulario">
        <div class="selector-pokemon">
            <label for="primer">Seleccione el primer padre:</label>
            <div class="autocompletado">
                <input 
                    id="primer"
                    type="text" 
                    bind:value={busquedaPrimero}
                    onfocus={() => mostrarSugerenciasPrimero = true}
                    onblur={() => setTimeout(() => mostrarSugerenciasPrimero = false, 200)}
                    placeholder="Escribe el nombre..."
                    class="buscador"
                    autocomplete="off"
                />
                {#if mostrarSugerenciasPrimero && pokemonesFiltradosPrimero.length > 0}
                    <div class="sugerencias">
                        {#each pokemonesFiltradosPrimero as pokemon}
                            <button 
                                type="button"
                                class="sugerencia"
                                onclick={() => seleccionarPrimero(pokemon)}
                            >
                                {pokemon.nombre}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <div class="selector-pokemon">
            <label for="segundo">Seleccione el segundo padre:</label>
            <div class="autocompletado">
                <input 
                    id="segundo"
                    type="text" 
                    bind:value={busquedaSegundo}
                    onfocus={() => mostrarSugerenciasSegundo = true}
                    onblur={() => setTimeout(() => mostrarSugerenciasSegundo = false, 200)}
                    placeholder="Escribe el nombre..."
                    class="buscador"
                    autocomplete="off"
                />
                {#if mostrarSugerenciasSegundo && pokemonesFiltradosSegundo.length > 0}
                    <div class="sugerencias">
                        {#each pokemonesFiltradosSegundo as pokemon}
                            <button 
                                type="button"
                                class="sugerencia"
                                onclick={() => seleccionarSegundo(pokemon)}
                            >
                                {pokemon.nombre}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <input type="hidden" name="primerPokemonId" value={primerPokemonId} />
        <input type="hidden" name="segundoPokemonId" value={segundoPokemonId} />

        <button type="submit" class="boton-fusionar" disabled={!primerPokemonId || !segundoPokemonId}>
            Fusionar!
        </button>
        <button type="button" onclick={randomizePokemons} class="boton-fusionar">
    Random
</button>
    </form>

    <div class="resultado">
        {#if form?.success}
            <h2 class="nombre-fusion">{form.pokemon.nombre}</h2>
            <img src={form.pokemon.imagen} alt={form.pokemon.nombre} class="imagen-fusion" />
        {/if}
    </div>
</div>


<style>
    .autocompletado {
        position: relative;
        padding-top: 3px;
    }
    
    .sugerencias {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
    }
    
    .sugerencia {
        display: block;
        width: 100%;
        padding: 10px;
        text-align: left;
        border: none;
        background: white;
        cursor: pointer;
    }
    
    .sugerencia:hover {
        background: #f0f0f0;
    }

    h1{
        color: white;
        text-align: center;
        padding-top: 50px;
        margin-bottom: 50px;
    }

    label{
        color:white;
        font-family:"Montserrat" ,system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }

    .contenedor-flex {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        gap: 10px;
        max-width: 1000px;
        margin: 0 auto;
    }


    .formulario {
        font-size: 20px;
        font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        flex: 1;
        max-width: 400px;
    }

    .formulario .selector-pokemon{
        margin-bottom: 5px;
    }

    .boton-fusionar {
        margin-top: 5px;
        background: transparent;
        border: 2px solid rgba(180, 60, 255, 1);
        box-shadow: 0 0 25px rgba(180, 60, 255, 1);
        border-radius: 20px;
        padding: 10px 20px;
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .boton-fusionar:hover {
        box-shadow: 0 0 40px rgba(180, 60, 255, 1), inset 0 0 10px rgba(180, 60, 255, 1);
    }

    .boton-fusionar:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .resultado {
        padding: 20px;
        border: 2px solid #ccc;
        min-height: 200px;
        max-width: 300px;
        text-align: center;
        background: transparent;
        border: 2px solid rgba(180, 60, 255, 1);
        box-shadow: 0 0 25px rgba(180, 60, 255, 1);
        transition: all 0.3s ease-in-out;
        border-radius: 20px;
        flex: 1;
    }

    .resultado .nombre-fusion{
        color:white;
        font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 28px;
    }
</style>