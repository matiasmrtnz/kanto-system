<script>

    import { enhance } from '$app/forms';
        let { data, form } = $props();

    let mostrarselect = $state(false);
    function mostrarcambiarselect(){

        console.log("click ok")
        mostrarselect = true;
        setTimeout(() => { 
           mostrarselect = false;
        },30000);
    }
    let mostrarModalIntegrante = $state(false);
    let mostrarmodalact = $state(false);
    let integrantactualizado = $state(null);
    let apodoeditado = $state(null);
    let movimientoselegidos = $state([]);
    function mostrarmodalactualizar(integrante){
        integrantactualizado = integrante;
        mostrarmodalact = true;
        apodoeditado = integrante.apodo;
        setTimeout(() => {
            mostrarmodalact = false;
            integrantactualizado = null;
            apodoeditado = null;
            movimientoselegidos = [];
        },1200000);

    }

    
</script>

<div class="container">

    <h1 class="titulo">{data.equipo.nombre}</h1>
    <button 
        type="button" 
        class="btn"
        on:click|stopPropagation={() => {mostrarModalIntegrante = true; form = null}}>
            Agregar Integrante
    </button>


    <div class="tarjeta-principal">

        <div class="id_grupo">
            <p><strong>ID:</strong> {data.equipo.id}</p>
        
        </div>
    </div>
</div>

<!-- --------------------------------------------------------------------INTEGRANTES----------------------------------------------------------------------------------------->

<div class= "integrantes">
    {#each data.equipo.integrantes as integrante}
        <div class="tarjeta">
            <h3 class="apodo-integrante">{integrante.apodo}</h3>
            <h2 class="pokemon-nombre">
                <a href={`/pokemon/${integrante.pokemon.id}`}>{integrante.pokemon.nombre}</a>
            </h2>
            <img class="imagen" src={integrante.pokemon.imagen} alt={integrante.pokemon.nombre}>

            <h2 class="subtitulo">Movimientos</h2>
            <table class="tabla-movimientos movimientos-personalizados">
                <tbody>
                    {#each integrante.movimientos as movimiento}
                    <tr>
                        <td><a class="movimiento-nombre" href={`/movimientos/${movimiento.id}`}>{movimiento.nombre}</a></td>
                    </tr>
                    {/each}
                </tbody>
            </table>

            <button type="button" on:click={() => {mostrarselect = integrante.id, form=null}} class="btn">
                Agregar movimiento
            </button>
            {#if mostrarselect === integrante.id}
            <form method="POST" action="?/agregar_movimiento" use:enhance>
                <input type="hidden" name="id_equipo" value={data.equipo.id} />
                <input type="hidden" name="id_integrante" value={integrante.id} />
                <select class="select-mov"  name="id_movimiento" required>
                    <option disabled selected>elige el movimiento</option>
        
                    {#each data.mov_de_integrante[integrante.id] ?? [] as mov_posible}
                        <option value={mov_posible.id_movimiento}>{mov_posible.nombre}</option>
                    {/each}
                </select>
                {#if form?.error}
                <p class="error-msg">{form.msg}</p>
                {/if}
                <button class="btn" type="submit" >Agregar</button>
                </form>
            {/if}
        
<!-----------------------------------------------------------------------ESTADISTICAS---------------------------------------------------------------------------------------->
            <div class="Estadisticas">
                <h2 class="subtitulo">Atributos</h2>


                <div class="habilidad">
                    <span class="label">PS</span>

                    <div class="barra-base">
                        <div class="barra-fill" style="width: {(integrante.puntos_de_golpe / 255) * 100}%"></div>
                    </div>
                    <span class="valor">{integrante.puntos_de_golpe}</span>
                </div>
                <div class="habilidad">
                    <span class="label">ATAQUE</span>

                        <div class="barra-base">
                            <div class="barra-fill" style="width: {(integrante.ataque / 255) * 100}%"></div>
                        </div>
                        <span class="valor">{integrante.ataque}</span>
                </div>
                <div class="habilidad">
                    <span class="label">DEFENSA</span>

                        <div class="barra-base">
                            <div class="barra-fill" style="width: {(integrante.defensa / 255) * 100}%"></div>
                        </div>
                        <span class="valor">{integrante.defensa}</span>
                </div>
                <div class="habilidad">
                    <span class="label">ATAQUE ESPECIAL</span>

                        <div class="barra-base">
                            <div class="barra-fill" style="width: {(integrante.ataque_especial / 255) * 100}%"></div>
                        </div>
                        <span class="valor">{integrante.ataque_especial}</span>
                </div>
                <div class="habilidad">
                    <span class="label">DEFENSA ESPECIAL</span>

                    <div class="barra-base">
                        <div class="barra-fill" style="width: {(integrante.defensa_especial / 255) * 100}%"></div>
                        </div>
                        <span class="valor">{integrante.defensa_especial}</span>
                </div>
                <div class="habilidad">
                    <span class="label">VELOCIDAD</span>

                        <div class="barra-base">
                            <div class="barra-fill" style="width: {(integrante.velocidad / 255) * 100}%"></div>
                        </div>
                        <span class="valor">{integrante.velocidad}</span>
                </div>
            </div>
            
            <button class="btn" type="button" on:click={() => mostrarmodalactualizar(integrante)}>
                Editar
            </button>

            <form method="POST" action="?/eliminar">
                <input type="hidden" name="id_equipo" value={data.equipo.id}>
                <input type="hidden" name="id_integrante" value={integrante.id}>
                <button class="btn" type="submit">Eliminar Integrante</button>
            </form>
            </div>

        
    {/each}
</div>

<!-- --------------------------------------------------------------------MODALES----------------------------------------------------------------------------------------->


{#if mostrarModalIntegrante}
<div class="modal-fondo" on:click={() => {mostrarModalIntegrante = false, form = null}}>
    <div class="modal" on:click|stopPropagation>
        
        <h2>Agregar integrante</h2>
        <form method="POST" action="?/agregarIntegrante" use:enhance>
            <input type="hidden" name="id_equipo" value={data.equipo.id} />

            <label>Apodo</label>
            <input name="apodo" required>

            <label>ID Pokémon</label>
            <input name="pokemon_id" required>
            {#if form?.error}
                <p class="error-msg">{form.msg}</p>
            {/if}

            <button type="submit" class="btn">Guardar</button>
           
        </form>
        

        <button class="btn btn-cerrar" on:click={() => {mostrarModalIntegrante = false, form = null}}>
            Cerrar
        </button>

    </div>
</div>

{/if}

{#if mostrarmodalact}
<div class="modal-fondo" on:click={() => {mostrarmodalact= false,form = null}}>
    <div class="modal" on:click|stopPropagation>

        <h2>Actualizar Integrante</h2>
        <form method="POST" action="?/actualizarIntegrante" use:enhance>
            
            <input type="hidden" name="id_equipo" value={data.equipo.id}/>
            <input type="hidden" name="id_integrante" value={integrantactualizado.id}/>

            <label>Apodo nuevo</label>
            <input name="apodo_nuevo" placeholder={integrantactualizado.apodo} required>

            <label class="titulo-movs">Seleccione Movimientos</label>
            <p class="subtitulo-selec-mov">mantener Ctrl mientras elige</p>
            <select class="select-movs" name="movimientos" multiple>
                {#each data.mov_de_integrante[integrantactualizado.id] ?? [] as mov_posible}
                    <option value={mov_posible.id_movimiento}>{mov_posible.nombre}</option>
                {/each}
            </select>
            <label class="titulo-evs">Indique EVS</label>
            <input type="number" name="ev_puntosdepoder" max="255" min="0" placeholder="Puntos de poder"/>
            <input type="number" name="ev_ataque" max="255" min="0" placeholder="Ataque"/>
            <input type="number" name="ev_defensa" max="255" min="0" placeholder="Defensa"/>
            <input type="number" name="ev_ataque_especial" max="255" min="0" placeholder="Ataque Especial"/>
            <input type="number" name="ev_defensa_especial" max="255" min="0" placeholder="Defensa Especial"/>
            <input type="number" name="ev_velocidad" max="255" min="0" placeholder="Velocidad"/>
            {#if form?.error}
                <p class="error-msg">{form.msg}</p>
            {/if}

            <button type="submit" class="btn">Guardar</button>
        </form>

    </div>

    
</div> 
{/if}


<!-- --------------------------------------------------------------------ESTILOS----------------------------------------------------------------------------------------->

<style>




    .container {

        justify-content: center;
        font-size: 35px;
        text-align: center;
        
    }
    .integrantes {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin: 5px;
    }
    .imagen {
        height: 150px;
        width: 150px;
    }
    .id_grupo {
        font-size: 30px;
        color: white;
        margin-top: -50px;
    }
    .tarjeta {
        height:auto;
        width: 325px;
        min-height:800px;
    }
    .apodo-integrante {
        font-size: 50px;
        margin: 10px;

    }
    .pokemon-nombre {
        color: white;
    }
    .tabla-movimientos td {
        color: white;
        border: 1px solid white;
        padding: 4px 8px;
        width: 100% ;
        max-width: 100%;
        box-sizing: border-box;

    }
    select {
        background: black !important;
        color: white !important;
        border: 1px solid white !important;
        margin-top: 10px;
        font-size: 20px;

    }

    .movimiento-nombre {
    color: white;
    margin: 0;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 1px;
}
    .subtitulo {
        text-align: center;
        color: white;
    }
    .barra-base { width: 200px; height: 10px; background: #3a1d47; border-radius: 10px; }
    .barra-fill { height: 100%; background: #c26bff; border-radius: 10px; }
    .habilidad {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 8px;
    }
    .label {
        width: 90px;
        color: white;
        font-size: 14px;
    }
    .valor {
        width: 20px;
        text-align: right;
    }
    .movimientos-personalizados {
        border-collapse: separate;
        border-spacing: 0 8px;
        width: 95%;
        max-width: 350px;
        margin: 0 auto 16px auto;
        background: rgba(60,0,100,0.15);
        border-radius: 10px;
        box-shadow: 0 0 8px #c26bff55;
}

    .movimientos-personalizados td {
        border: 2px solid #c26bff;
        color: #fff;
        font-size: 20px;
        text-align: center;
        background: rgba(60,0,100,0.3);
        border-radius: 6px;
        padding: 12px 0;
        font-family: 'Montserrat', Arial, sans-serif;
        letter-spacing: 1px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0;
}

    .movimientos-personalizados .movimiento-nombre {
        display: block;
        width: 100%;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        font-family: 'Montserrat', Arial, sans-serif;
        font-weight: 700;
        letter-spacing: 1px;
        transition: color 0.2s;
}
    .movimientos-personalizados .movimiento-nombre:hover {
        color: #c26bff;
        text-shadow: 0 0 8px #c26bff99;
}

    .container button {
        margin-bottom: 25px;
        margin-top: 15px;
        position: relative;
        z-index: 1;
}



/* MODAL */

/* Fondo oscuro difuminado */
    .modal-fondo {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(6px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        padding: 20px;
}

/* Caja del modal */
    .modal {
        background: #1a0226;
        border: 2px solid #b04aff;
        padding: 30px 35px;
        border-radius: 15px;
        width: 380px;
        color: white;
        box-shadow: 0 0 25px #b04affaa, 0 0 8px #d983ff;
        animation: modalFade 0.25s ease-out;
}

/* Animación suave */
    @keyframes modalFade {
        from { transform: scale(0.8); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
    }

    .modal h2 {
        margin-top: 0;
        text-align: center;
        font-size: 26px;
        color: #e9caff;
        text-shadow: 0 0 8px #c974ff;
    }

/* Inputs */
    .modal input {
        width: 100%;
        margin: 8px 0 14px;
        padding: 10px;
        border-radius: 8px;
        border: 2px solid #b04aff;
        background: #2d0b39;
        color: white;
        font-size: 16px;
        outline: none;
        box-shadow: 0 0 6px #a05aff88;
}
    .modal input:focus {
        box-shadow: 0 0 10px #c974ff;
        border-color: #d89fff;
}

/* Botones */
    .modal button {
        width: 100%;
        margin-top: 10px;
}

/* Botón cerrar */
    .btn-cerrar {
        background: #5e1a8a;
        margin-top: 12px;
}
    .btn-cerrar:hover {
        background: #8f28c3;
}

    .error-msg {
        color: #ff5c8a;
        font-weight: bold;
        margin-top: 10px;
        text-align: center;
}

.select-mov {
    background: #2d0b39 !important;               
    color: #e5d4ff;                    
    padding: 8px 12px;
    font-size: 16px;
    border: 2px solid #a258ff;         
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    box-shadow: 0 0 8px #a258ff80, 
                0 0 16px #a258ff40;

    transition: 0.25s ease;
}

/* Hover */
.select-mov:hover {
    box-shadow: 0 0 12px #c47cff, 
                0 0 24px #b366ff;
    border-color: #d08aff;
}

/* Focus */
.select-mov:focus {
    background: #241327;
    border-color: #d590ff;
    box-shadow: 0 0 12px #e3a6ff, 
                0 0 26px #d590ff;
}

    .subtitulo-selec-mov {
        font-size: 15px;
        margin: 0px 10px 0px 0px;
    }
    .titulo-movs {
        font-size: 20px;
    }
    .titulo-evs {
        font-size: 20px !important;
        text-align: left !important;
        display: block;
        color: white;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .select-movs {
        background: #2d0b39 !important;
        color: white !important;
        border: #b04aff !important;
        margin-top: 10pxS;
        font-size: 16px;
        width: 250px !important;
        height: 120px !important;
        border-radius: 8px;
    }

</style>

