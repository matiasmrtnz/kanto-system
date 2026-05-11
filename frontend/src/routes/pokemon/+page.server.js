import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = 24;
    const offset = (page - 1) * pageSize;

    const terminoBusqueda = url.searchParams.get('nombre') || '';
    const minStat = url.searchParams.get('min_stat') || '';
    const tipo = url.searchParams.get('tipo') || '';
    const tiposRespuesta = await fetch('http://127.0.0.1:8000/api/tipo/');
    const tipos = await tiposRespuesta.json();

    let apiUrl = new URL('http://127.0.0.1:8000/api/pokemon/');
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());

    // Filtros busqueda (nombre parcial / minimo de stats / tipos)
    if (terminoBusqueda) {
        apiUrl.searchParams.set('nombre', terminoBusqueda);
    }
    if (minStat) apiUrl.searchParams.set('min_stat', minStat);
    if (tipo) apiUrl.searchParams.set('tipo', tipo);

    const response = await fetch(apiUrl);
    if (!response.ok) {
        error(response.status, `Error API: ${response.statusText}`);
    }
    const pokemones = await response.json();
    const hasMore = pokemones.length === pageSize;
    return {
        pokemones: pokemones,
        currentPage: page,
        pageSize: pageSize,
        hasMore: hasMore,
        busquedaActual: terminoBusqueda,
        minStatActual: minStat,
        tipoActual: tipo,
        tipos: tipos
    };
};
