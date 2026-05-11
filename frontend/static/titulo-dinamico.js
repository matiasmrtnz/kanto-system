const tituloOriginal = document.title;
let running = false;

const mensajes = [
    "¡Volvé! 👻",
    "Gengar te está mirando 😈",
    "Tenemos pokes esperándote 💜",
    "Tu Pokédex te extraña 📘"
];

// Función sleep
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

document.addEventListener("visibilitychange", async () => {
    if (document.hidden) {
        running = true;
        let index = 0;

        while (running) {
            document.title = mensajes[index];
            index = (index + 1) % mensajes.length;

            // Espera más tiempo entre cambios ↓↓↓
            await sleep(2000); // 2 segundos
        }

    } else {
        running = false;
        document.title = tituloOriginal;
    }
});
