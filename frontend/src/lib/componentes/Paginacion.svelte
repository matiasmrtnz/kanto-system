<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";


    let { currentPage, hasMore } = $props();

    function goToPage(newPage) {
        const url = new URL($page.url);
        url.searchParams.set("page", newPage.toString());
        goto(url.toString());
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function prevPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
</script>

<div class="paginacion-container">
    
    {#if currentPage > 1}
        <button onclick={prevPage} class="boton-paginacion borde-neon"> 
            ← Anterior 
        </button>
    {:else}
        <button class="boton-paginacion borde-neon desactivado" disabled> 
            ← Anterior 
        </button>
    {/if}

    <span class="numero-pagina">
        Página {currentPage}
    </span>

    {#if hasMore}
        <button onclick={nextPage} class="boton-paginacion borde-neon"> 
            Siguiente → 
        </button>
    {:else}
        <button class="boton-paginacion borde-neon desactivado" disabled> 
            Siguiente → 
        </button>
    {/if}
</div>



<style>
    /* -------------------------- Paginacion --------------- */
.paginacion-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-top: 20px;
    margin-bottom: 60px;
    width: 100%;
}

.boton-paginacion {
    text-decoration: none;
    color: aliceblue;
    background-color: rgba(20, 5, 35, 0.8);
    padding: 12px 25px;
    border-radius: 30px; 
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
}

.boton-paginacion.desactivado {
    pointer-events: none;
    opacity: 0.5;
    border-color: gray !important;
    box-shadow: none !important;
    color: gray;
}
.numero-pagina {
    color: aliceblue;
    font-family: "DM Serif Display", serif;
    font-size: 1.5rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>