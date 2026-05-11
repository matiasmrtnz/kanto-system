<script>
    import { goto } from '$app/navigation';
    import '../../styles/styles.css';
    let { data, form } = $props();
    let cambiar = $state(!!form?.cambiar);
    let equipo_id = $state(form?.equipo_id ?? null);
    function mostrarmodalcambiarnombre(id){

        cambiar = true;
        equipo_id = id;
        setTimeout(() => { 
           cambiar = false;
           equipo_id = null
        },20000);
    }
        //Paginacion
    import Paginacion from '$lib/componentes/Paginacion.svelte';
    let currentPage = $derived(data.currentPage);
    let hasMore = $derived(data.hasMore);

</script>
 
{#if cambiar}
    <dialog open class="modal" id="modal">
        <h3>Escriba el nombre nuevo del equipo</h3>
        <p>Recuerde que el nombre del equipo no puede pertenecer a ningun otro equipo.</p>
        <form method='POST' action="?/actualizar" >
            <input type="hidden" name="equipo_id" value={equipo_id}>
            <label>
                Nombre:
                <input type="text" maxlength="12" name="nombre_nuevo" required>
            </label>
        <button type="submit">
            <strong>Cambiar Nombre</strong>
        </button>
        </form>
        {#if form?.error}
            <p class="alerta">⚠️{form.mensaje}⚠️</p>
        {/if}
    </dialog>
{/if}



<div class="flex-titulo">
    <h1 id="titulo-equipos">EQUIPOS</h1>

    <form method="POST" class="boton-crear" action="?/crear">
    <label>
        <input class="input-crear" type="text" maxlength="12" placeholder="Ingrese el nombre" name="nombre_crear" required>
    </label>
    <button type="submit" class="titulo-principal"><strong>Crear Equipo</strong></button>

</form>

</div>




<div class="padre">
    {#each data.equipos as equipo}
            <div class="completo" on:click={() => goto(`/equipos/${equipo.id}`)}>  
                <div class="tarjeta">
                    <h3 class="nombre-equipos">{equipo.nombre}</h3>
                    <h3 class="integrantes">Integrantes: <strong>{equipo.cant_integrantes}</strong> </h3>
                    <form method="PUT" class="boton-actualizar" >
                        <input type="hidden" name="id_equipo" value={equipo.id}>
                        <button type="submit" on:click|stopPropagation={() => mostrarmodalcambiarnombre(equipo.id)}><strong>Cambiar Nombre</strong> </button>
                    </form>
                    <form method="POST" class="boton-eliminar" action="?/eliminar">
                        <input type="hidden" name="id_equipo" value={equipo.id}>
                        <button type="submit" on:click|stopPropagation={action}><strong>Eliminar</strong></button>
                    </form>
                </div>
            </div>
            
        
    {/each}
</div> 
<Paginacion 
    currentPage={currentPage} 
    hasMore={hasMore} 
/>

<style>

    #titulo-equipos {
        color: white;
        text-align: center;
        margin-top: 50px;
    }

    .flex-titulo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;
    }

    .nombre-equipos {
        font-family: 'DM Serif Display', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 32px;
        color: white;
        margin: 20px 0 0 0;
    }

    .integrantes {
        font-family: 'DM Serif Display', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: white;
    }

    button {
        width: 180px;
        height: 40px;
        padding: 10px 18px;
        border: 2px solid #8a2be2;
        background: transparent;
        color: #e7d7ff;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.25s;
        box-shadow: 0 0 8px #8a2be2, 0 0 18px #300040;
    }

    button:hover {
        background: #8a2be2;
        box-shadow: 0 0 12px #c56aff, 0 0 25px #8a2be2, 0 0 45px #300040;
    }

    .boton-eliminar button {
        border-color: #ff2e63;
        box-shadow: 0 0 8px #ff2e63, 0 0 18px #4a0011;
    }

    .boton-eliminar button:hover {
        background: #ff2e63;
        box-shadow: 0 0 12px #ff6b9d, 0 0 25px #ff2e63, 0 0 45px #4a0011;
    }

    .boton-crear button {
        font-size: 15px;
        font-weight: bold;
    }

    .input-crear,
    #modal input[type="text"] {
        height: 35px;
        padding: 10px 15px;
        background: rgba(40, 0, 60, 0.6);
        color: #e7d7ff;
        border: 2px solid #8a2be2;
        border-radius: 10px;
        outline: none;
        font-size: 1rem;
        box-shadow: 0 0 10px #8a2be2cc, 0 0 25px #300040aa;
        transition: 0.25s ease;
        box-sizing: border-box;
    }

    .input-crear:focus,
    #modal input[type="text"]:focus {
        background: rgba(80, 10, 110, 0.75);
        border-color: #c56aff;
        box-shadow: 0 0 15px #c56aff, 0 0 35px #8a2be2, 0 0 60px #300040;
    }

    .input-crear::placeholder,
    #modal input[type="text"]::placeholder {
        color: #e7d7ff;
        opacity: 0.7;
    }

    #modal input[type="text"] {
        width: 100%;
        margin-top: 8px;
    }

    #modal {
        background: #1a0026;
        border: 2px solid #8a2be2;
        border-radius: 15px;
        padding: 30px;
        color: white;
        text-align: center;
        box-shadow: 0 0 20px #8a2be2cc, 0 0 40px #300040aa;
        z-index: 1000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #modal h3 {
        color: #e7d7ff;
        margin-bottom: 15px;
    }

    #modal p {
        color: #e7d7ff;
        opacity: 0.9;
        margin-bottom: 20px;
    }

    #modal form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }

    #modal label {
        color: #e7d7ff;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .alerta {
        color: #ff6b9d;
        background: rgba(255, 46, 99, 0.2);
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ff2e63;
        margin-top: 10px;
    }

    .tarjeta {
        margin: 15px;
        background: rgba(40, 0, 60, 0.6);
        border: 2px solid #8a2be2;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px #8a2be2cc, 0 0 25px #300040aa;
    }

    .boton-crear { 
        display: flex;
        align-items: center;
        gap: 10px;
    }


</style>
