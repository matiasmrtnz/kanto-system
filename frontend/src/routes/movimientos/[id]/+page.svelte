<script>
    let { data } = $props();
    let mov = data.movimiento;

    const categoriaMap = {
        físico: "/iconos/categorias/fisico.png",
        especial: "/iconos/categorias/especial.png",
        estado: "/iconos/categorias/estado.png",
    };

    function getIcono(id) {
        return `/iconos/tipos/${id}.svg`;
    }

    function getCatIcono(nombre) {
        if (!nombre) return "";
        return categoriaMap[nombre] || "";
    }
</script>

<div class="contenedor-principal">
    <div class="tarjeta-maestra borde-neon">
        <h1 class="nombre-mov">{mov.nombre}</h1>
        <p class="id-mov">#{mov.id}</p>

        <div class="grilla-info">
            {#if mov.tipo}
                <div class="sub-tarjeta tipo-box borde-neon">
                    <span class="label-box">TIPO</span>
                    <div class="contenido-tipo">
                        <img
                            src={getIcono(mov.tipo.id)}
                            alt="icono"
                            class="icono-tipo"
                        />
                        <div class="texto-tipo">
                            <span class="nombre-tipo">{mov.tipo.nombre}</span>
                            <span class="id-tipo-badge"
                                >Tipo ID: {mov.tipo.id}</span
                            >
                        </div>
                    </div>
                </div>
            {/if}

            <div class="sub-tarjeta categoria-box borde-neon">
                <span class="label-box">CATEGORÍA</span>
                {#if mov.categoria}
                    <div class="contenido-cat">
                        {#if getCatIcono(mov.categoria) !== ""}
                            <img
                                src={getCatIcono(mov.categoria)}
                                alt={mov.categoria}
                                class="icono-cat"
                            />
                        {/if}
                        <span class="nombre-cat">{mov.categoria}</span>
                    </div>
                {:else}
                    <span class="valor-stat texto-categoria">
                        {mov.categoria}
                    </span>
                {/if}
            </div>

            <div class="sub-tarjeta stat-box borde-neon">
                <span class="label-box">Potencia</span>
                <span class="valor-stat">{mov.potencia || "-"}</span>
            </div>

            <div class="sub-tarjeta stat-box borde-neon">
                <span class="label-box">Precisión</span>
                <span class="valor-stat"
                    >{mov.precision ? mov.precision : "-"}</span
                >
            </div>

            <div class="sub-tarjeta stat-box borde-neon">
                <span class="label-box">PP</span>
                <span class="valor-stat">{mov.usos}</span>
            </div>

            <div class="sub-tarjeta descripcion-box borde-neon">
                <p class="texto-descripcion">"{mov.efecto}"</p>
            </div>
        </div>
    </div>

    <h1 class="titulo-metodo">Pokemones que pueden aprenderlo segun metodo</h1>

    <h1 class="ppm">Pokemon por huevo</h1>
    {#if mov.pokemon_por_huevo.length > 0}
        <div class="lista-pokemones">
            {#each mov.pokemon_por_huevo as pokemon}
                <a href={`/pokemon/${pokemon.id}`}>
                    <div class="borde-neon-poks contenedor-p">
                        <div class="contenido-pokemon">
                            <img
                                src={pokemon.imagen}
                                alt={pokemon.nombre}
                                class="imagen-pokemon"
                            />
                            <span class="nombre-pokemon">{pokemon.nombre}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}

    {#if mov.pokemon_por_huevo.length === 0}
        <h3 class="sin-registro">Sin registros</h3>
    {/if}

    <h1 class="ppm">Pokemon por nivel</h1>
    {#if mov.pokemon_por_nivel.length > 0}
        <div class="lista-pokemones">
            {#each mov.pokemon_por_nivel as pokemon}
                <a href={`/pokemon/${pokemon.id}`}>
                    <div class="borde-neon-poks contenedor-p">
                        <div class="contenido-pokemon">
                            <img
                                src={pokemon.imagen}
                                alt={pokemon.nombre}
                                class="imagen-pokemon"
                            />
                            <span class="nombre-pokemon">{pokemon.nombre}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
    {#if mov.pokemon_por_nivel.length === 0}
        <h3 class="sin-registro">Sin registros</h3>
    {/if}

    <h1 class="ppm">Pokemon por maquina</h1>
    {#if mov.pokemon_por_maquina.length > 0}
        <div class="lista-pokemones">
            {#each mov.pokemon_por_maquina as pokemon}
                <a href={`/pokemon/${pokemon.id}`}>
                    <div class="borde-neon-poks contenedor-p">
                        <div class="contenido-pokemon">
                            <img
                                src={pokemon.imagen}
                                alt={pokemon.nombre}
                                class="imagen-pokemon"
                            />
                            <span class="nombre-pokemon">{pokemon.nombre}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
    {#if mov.pokemon_por_maquina.length === 0}
        <h3 class="sin-registro">Sin registros</h3>
    {/if}
</div>

<style>
    .contenedor-principal {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
    .imagen-pokemon {
        width: 150px;
        height: 150px;
    }

    .lista-pokemones {
        display: flex;
        flex-wrap: wrap; /* Permite que los elementos se envuelvan en varias filas */
        justify-content: center; /* Centra las filas dentro del contenedor */
        align-items: center; /* Alinea los elementos verticalmente en el centro */
        gap: 10px; /* Espacio entre los elementos */
        padding: 20px;
        margin-bottom: 20px;
    }
    a {
        text-decoration: none;
        color: white;
    }
    .contenedor-p {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 10px 12px 20px 12px;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        cursor: pointer;
    }

    .titulo-metodo {
        margin: 40px 0 20px 0px;
        font-size: 50px;
        color: #e7d7ff;
        letter-spacing: 1px;
        text-shadow: 0 0 18px #b75cff;
    }

    .ppm {
        font-size: 30px;
        color: aliceblue;
        margin-top: px;
        margin-bottom: 10px;
    }
    .contenido-pokemon {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
    }
    .contenido-pokemon:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    .nombre-pokemon {
        margin-top: 10px;
        font-size: 20px;
        text-align: center;
    }

    .sin-registro {
        font-size: 24px;
        color: #e7d7ff;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 25px;
    }

    .borde-neon-poks {
        border: 2px solid var(--color-neon);
        box-shadow: 0 0 15px var(--color-neon);
        border-radius: 15px;
        transition: all 0.3s ease-in-out;
    }
    .borde-neon-poks:hover {
        transform: scale(
            1.01
        ); /* Aumenta ligeramente el tamaño de la carta para el efecto de hover */
    }
</style>
