import { error } from '@sveltejs/kit';



export async function load({ params,fetch }) {
    
    const res_equipo = await fetch(`http://127.0.0.1:8000/api/equipos/${params.id}`);
    if (!res_equipo.ok) {
        throw error(res_equipo.status)
    }

    let equipo = await res_equipo.json();

    let mov_de_integrante = {};
    for (const integrante of equipo.integrantes){
        const movimientos = await fetch (`http://127.0.0.1:8000/api/equipos/${equipo.id}/integrantes/${integrante.id}/movimientos_anadibles`)
        mov_de_integrante[integrante.id] = movimientos.ok ? await movimientos.json() : [];
    };
    

    return {equipo,mov_de_integrante};
}


export const actions = {

    eliminar: async ({ cookies,request}) => {
        
        const data = await request.formData();


        let url = new URL(`http://127.0.0.1:8000/api/equipos/${data.get("id_equipo")}/integrantes/${data.get("id_integrante")}`)

        const response = await fetch(url, {
            method: 'DELETE',
          
        });
        if (!response.ok) {
            throw error(response.status,`response status: ${response.status}`);
            
        }
    },
        agregar_movimiento: async ({ request }) => {
            const data = await request.formData();
            const id_equipo = data.get("id_equipo");
            const id_integrante = data.get("id_integrante");
            const id_movimiento = data.get("id_movimiento");

            const url = new URL(`http://127.0.0.1:8000/api/equipos/${id_equipo}/integrantes/${id_integrante}/movimientos`);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_equipo, id_integrante, id_movimiento })
            });

            if (!response.ok) {
                const errorResponse = await response.json().catch(() => ({}));
                return {
                    error: true,
                    status: response.status,
                    msg: errorResponse.detail ?? "No se pudo agregar el movimiento"
                };
            }
        },
        agregarIntegrante: async ({ request }) => {
            const data = await request.formData();

            const id_equipo = data.get("id_equipo");
            const id_pokemon = data.get("pokemon_id");
            const apodo = data.get("apodo");

            const url = `http://127.0.0.1:8000/api/equipos/${id_equipo}/integrantes`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_pokemon: Number(id_pokemon), 
                    apodo
                })
            });

                if (!response.ok) {
                    const errorResponse = await response.json().catch(() => ({}));

                    return {
                        error: true,
                        status: response.status,
                        msg: errorResponse.detail ?? "Error desconocido"
                    };
                }

            return { success: true };
        },
        
        actualizarIntegrante: async ({request}) => {
            
            const data = await request.formData();

            const id_equipo = data.get("id_equipo");
            const id_integrante = data.get("id_integrante");
            const apodo = data.get("apodo_nuevo");
            const movimientos = data.getAll("movimientos").map(Number);

            if (movimientos.length > 4) {
                return {
                    error: true,
                    msg: `Maximo de 4 movimientos permitido. Seleccionaste ${movimientos.length}`
                };
            }

            const ev_puntosdepoder = Number(data.get("ev_puntosdepoder")) || 0;
            const ev_ataque = Number(data.get("ev_ataque")) || 0;
            const ev_defensa = Number(data.get("ev_defensa")) || 0;
            const ev_ataque_especial = Number(data.get("ev_ataque_especial")) || 0;
            const ev_defensa_especial = Number(data.get("ev_defensa_especial")) || 0;
            const ev_velocidad = Number(data.get("ev_velocidad")) || 0;

            const sumaEvs = ev_puntosdepoder + ev_ataque + ev_defensa + ev_ataque_especial + ev_defensa_especial + ev_velocidad;

            if (sumaEvs > 510){
                return {
                    error: true,
                    msg: `La suma de EVs no puede ser mayor a 510. Actualmente es ${sumaEvs}`
                }
            }

            const url = new URL(`http://127.0.0.1:8000/api/equipos/${id_equipo}/integrantes/${id_integrante}`)
            
            const response = await fetch(url,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    apodo,
                    movimientos,
                    ev_puntosdepoder,
                    ev_ataque,
                    ev_defensa,
                    ev_ataque_especial,
                    ev_defensa_especial,
                    ev_velocidad
                })
            })

                if (!response.ok) {
                    const errorResponse = await response.json().catch(() => ({}));

                    return {
                        error: true,
                        status: response.status,
                        msg: errorResponse.detail ?? "Error desconocido"
                    };
                }
            return { success: true};
        }   




};





    