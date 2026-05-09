document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculas(peliculas);
    document.getElementById('searchInput').addEventListener('input', filtrarPeliculas);
    document.getElementById('genreFilter').addEventListener('change', filtrarPeliculas);
    document.getElementById('clearFilters').addEventListener('click', limpiarFiltros);
});

function cargarPeliculas(peliculasArray) {
    const container = document.getElementById('peliculasContainer');
    if (!peliculasArray.length) {
        container.innerHTML = `<div class="col-12 text-center py-5"><h4>No se encontraron películas</h4></div>`;
        return;
    }
    let html = '';
    peliculasArray.forEach(p => {
        let estrellas = '';
        for(let i=0; i<Math.floor(p.calificacion); i++) estrellas += '<i class="fas fa-star"></i>';
        if(p.calificacion - Math.floor(p.calificacion) >= 0.5) estrellas += '<i class="fas fa-star-half-alt"></i>';
        for(let i=0; i<5-Math.ceil(p.calificacion); i++) estrellas += '<i class="far fa-star"></i>';
        html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3"><div class="card pelicula-card h-100" onclick="verDetalle(${p.id})"><img src="${p.imagen}" class="card-img-top" alt="${p.titulo}"><div class="card-body"><h5 class="card-title">${p.titulo}</h5><div class="rating">${estrellas}<span>(${p.calificacion})</span></div><p class="card-text text-muted small">${p.anio} • ${p.duracion}</p><span class="genero-badge">${p.genero}</span></div></div></div>`;
    });
    container.innerHTML = html;
}

function filtrarPeliculas() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const genre = document.getElementById('genreFilter').value;
    const filtradas = peliculas.filter(p => p.titulo.toLowerCase().includes(search) && (genre === 'todos' || p.genero === genre));
    cargarPeliculas(filtradas);
}

function limpiarFiltros() {
    document.getElementById('searchInput').value = '';
    document.getElementById('genreFilter').value = 'todos';
    cargarPeliculas(peliculas);
}

function verDetalle(id) {
    window.location.href = `detalle.html?id=${id}`;
}