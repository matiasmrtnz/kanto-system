import { error } from '@sveltejs/kit';

export async function load() {
    const url = 'http://127.0.0.1:8000/api/pokemon';
    const response = await fetch(url);
    
    if (!response.ok) {
        error(500, `Error: ${response.status}`);
    }
    
    const pokemones = await response.json();

    return {
        pokemones: pokemones
    };
}

export const actions = {
    fusionar: async ({ request }) => {
        const formData = await request.formData();
        const primerPokemonId = parseInt(formData.get('primerPokemonId'));
        const segundoPokemonId = parseInt(formData.get('segundoPokemonId'));
        
        const res1 = await fetch(`http://127.0.0.1:8000/api/pokemon/${primerPokemonId}`);
        const res2 = await fetch(`http://127.0.0.1:8000/api/pokemon/${segundoPokemonId}`);
        
        const pokemon1 = await res1.json();
        const pokemon2 = await res2.json();
        
        const tiposPokemon1 = pokemon1.tipos.map(t => t.id);
        const tiposPokemon2 = pokemon2.tipos.map(t => t.id);
        const todosLosTipos = tiposPokemon1.concat(tiposPokemon2);
        const tiposUnicos = [...new Set(todosLosTipos)];
        
        const movHuevoPokemon1 = pokemon1.movimientos_huevo.map(m => m.id);
        const movHuevoPokemon2 = pokemon2.movimientos_huevo.map(m => m.id);
        const todosMovHuevo = movHuevoPokemon1.concat(movHuevoPokemon2);
        const movHuevoUnicos = [...new Set(todosMovHuevo)];
        
        const movMaquinaPokemon1 = pokemon1.movimientos_maquina.map(m => m.id);
        const movMaquinaPokemon2 = pokemon2.movimientos_maquina.map(m => m.id);
        const todosMovMaquina = movMaquinaPokemon1.concat(movMaquinaPokemon2);
        const movMaquinaUnicos = [...new Set(todosMovMaquina)];
        
        const movNivelPokemon1 = pokemon1.movimientos_nivel.map(m => m.id);
        const movNivelPokemon2 = pokemon2.movimientos_nivel.map(m => m.id);
        const todosMovNivel = movNivelPokemon1.concat(movNivelPokemon2);
        const movNivelUnicos = [...new Set(todosMovNivel)];
        
        const requestBody = {
            altura: pokemon1.altura,
            peso: pokemon1.peso,
            tipos: tiposUnicos,
            estadisticas: {
                puntos_de_golpe: Math.floor((pokemon1.estadisticas.PS + pokemon2.estadisticas.PS) / 2),
                ataque: Math.floor((pokemon1.estadisticas.Ataque + pokemon2.estadisticas.Ataque) / 2),
                defensa: Math.floor((pokemon1.estadisticas.Defensa + pokemon2.estadisticas.Defensa) / 2),
                ataque_especial: Math.floor((pokemon1.estadisticas["Ataque Especial"] + pokemon2.estadisticas["Ataque Especial"]) / 2),
                defensa_especial: Math.floor((pokemon1.estadisticas["Defensa Especial"] + pokemon2.estadisticas["Defensa Especial"]) / 2),
                velocidad: Math.floor((pokemon1.estadisticas.Velocidad + pokemon2.estadisticas.Velocidad) / 2)
            },
            movimientos_huevo: movHuevoUnicos,
            movimientos_maquina: movMaquinaUnicos,
            movimientos_nivel: movNivelUnicos,
            primer_padre: [primerPokemonId],
            segundo_padre: [segundoPokemonId]
        };
        
        const response = await fetch('http://127.0.0.1:8000/api/pokemon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        
        const resultado = await response.json();
        
        return { success: true, pokemon: resultado };
    }
};