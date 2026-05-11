import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = 40;
    const offset = (page - 1) * pageSize;
    const terminoBusqueda = url.searchParams.get('nombre') || '';
    const tipo = url.searchParams.get('tipo') || '';
    const tiposRespuesta = await fetch('http://127.0.0.1:8000/api/tipo/');
    const tipos = await tiposRespuesta.json();

    let apiUrl = new URL('http://127.0.0.1:8000/api/movimientos/');
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());

    // Filtro de busqueda nombre parcial y tipo
    if (terminoBusqueda) {
        apiUrl.searchParams.set('nombre_parcial', terminoBusqueda);
    }
    if (tipo) {
        apiUrl.searchParams.set('tipo', tipo);
    }

    console.log("Consultando API:", apiUrl.toString());
    const response = await fetch(apiUrl);
    if (!response.ok) {
        error(response.status, `Error API: ${response.statusText}`);
    }

    const movimientos = await response.json();
    const hasMore = movimientos.length === pageSize;
    return {
        movimientos: movimientos,
        currentPage: page,
        pageSize: pageSize,
        hasMore: hasMore,
        busquedaActual: terminoBusqueda,
        tipoActual: tipo,
        tipos: tipos
    };
};
