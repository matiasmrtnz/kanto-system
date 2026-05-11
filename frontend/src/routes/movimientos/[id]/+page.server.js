import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const id = params.id;
    let url = new URL(`http://127.0.0.1:8000/api/movimientos/${id}`);
    const response = await fetch(url);
    if (!response.ok) {
        error(response.status, `No se encontró el movimiento con id: ${id}`);
    }
    let movimiento = await response.json();
    return {
        movimiento : movimiento
    };
};