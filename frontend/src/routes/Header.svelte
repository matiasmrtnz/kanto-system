<a href="/">
    <div class="banner">
            <img src="/media/images/banner_gengar.png" alt="Banner de la página web"> 
    </div>

</a>

<nav class="nav borde-neon">
    <a href="/" class="nav-button">Home</a>
    <a href=/pokemon class="nav-button">Pokemones</a>
       
    <a href="/movimientos" class="nav-button">Movimientos</a>
       
    <a href="/equipos" class="nav-button">Equipos</a>

    <a href="/pokemon_fusion" class="nav-button" id="opcion_fusionar">Pokefusión</a>
</nav>


<style>
    nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0; 
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.781);
    border-top: 5px solid #1a0021;
    border-bottom: 5px solid #1a0021;
}

a {
    font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.nav-button {
    margin: 0 40px; 
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.nav-button:hover {
    box-shadow: 0 0 15px #ff546e, 0 0 25px #ff546e;
    border: 2px solid #ff546e;
}

.nav-button:active,
.nav-button:focus {
    box-shadow: 0 0 15px #ff546e, 0 0 25px #ff546e;
    border: 2px solid #ff546e;
    outline: none;
}

.banner {
    display: flex;
    align-items: center; 
    width: 100%;
    height: 190px;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
}
</style>