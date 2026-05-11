import { error, fail } from '@sveltejs/kit';

export async function load({ url }) {
    //Paginacion
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;

    let apiUrl = new URL('http://127.0.0.1:8000/api/equipos');
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw error(response.status, `Response status: ${response.status}`);
    } 
    const equipos = await response.json();
    const hasMore = equipos.length === pageSize;

    return {
        equipos: equipos,
        currentPage: page,
        hasMore: hasMore
    };
}

export const actions = {

    eliminar: async ({ cookies,request}) => {
        const data = await request.formData();

        let url = new URL(`http://127.0.0.1:8000/api/equipos/${data.get('id_equipo')}`)
        const response = await fetch(url, {
            method: 'DELETE',
          
        });
        if (!response.ok) {
            throw error(response.status,`response status: ${response.status}`);
        }
    },

    actualizar: async ({ cookies,request}) => {
        const data = await request.formData();

        let url = new URL(`http://127.0.0.1:8000/api/equipos/${data.get('equipo_id')}`)
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre: data.get("nombre_nuevo") })
          
        });
        if (response.status == 400){
            const cuerpo = await response.json();
            return fail(400,{error: true,mensaje: cuerpo.detail,equipo_id: data.get('equipo_id'),cambiar: true})
        }
       
        return {success: true};
    } ,

    crear: async ({ cookies,request}) => {
        const data = await request.formData();

        let url = new URL('http://127.0.0.1:8000/api/equipos')
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre: data.get("nombre_crear") })
          
        });
        if (response.status == 400){
            const cuerpo = await response.json();
            return fail(400,{error: true,mensaje: cuerpo.detail,equipo_id: data.get('equipo_id'),cambiar: true})
        }
        if (!response.ok){
            throw error(response.status,`response status: ${response.status}`);
        }
        
    }
}



