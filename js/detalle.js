document.addEventListener('DOMContentLoaded', () => {
    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const pelicula = peliculas.find(p => p.id === id);
    if(pelicula) cargarDetalle(pelicula);
    else mostrarError();
});

function cargarDetalle(p) {
    let estrellas = '';
    for(let i=0; i<Math.floor(p.calificacion); i++) estrellas += '<i class="fas fa-star"></i>';
    if(p.calificacion - Math.floor(p.calificacion) >= 0.5) estrellas += '<i class="fas fa-star-half-alt"></i>';
    for(let i=0; i<5-Math.ceil(p.calificacion); i++) estrellas += '<i class="far fa-star"></i>';
    
    const actoresHtml = p.actores.map(a => `<li class="list-group-item">${a}</li>`).join('');
    
    document.getElementById('detalleContainer').innerHTML = `
        <div class="col-12 col-lg-4 mb-4"><img src="${p.imagen}" class="poster-detalle img-fluid"></div>
        <div class="col-12 col-lg-8">
            <h2>${p.titulo}</h2>
            <p class="text-muted">${p.anio} • ${p.duracion}</p>
            <div class="mb-3">${estrellas}<span class="ms-2 fw-bold">${p.calificacion}/5</span></div>
            <span class="genero-detalle me-2">${p.genero}</span>
            <div class="sinopsis mt-4"><h5>Sinopsis</h5><p>${p.sinopsis}</p></div>
            <div class="reseña mt-3"><h5>Reseña</h5><p>${p.reseña}</p></div>
            <div class="director mt-3"><h5>Director</h5><p>${p.director}</p></div>
            <div class="actores mt-3"><h5>Actores</h5><ul class="list-group">${actoresHtml}</ul></div>
        </div>
    `;
    document.title = `${p.titulo} - CineMatch`;
}

function mostrarError() {
    document.getElementById('detalleContainer').innerHTML = `<div class="col-12 text-center"><h3>Película no encontrada</h3><a href="index.html" class="btn btn-primary">Volver</a></div>`;
}