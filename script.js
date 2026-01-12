$(document).ready(function() {
    // Variables globales
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    let idTransaccionEditada = null;

    // Elementos del DOM
    const $formularioTransaccion = $('#formularioTransaccion');
    const $descripcion = $('#descripcion');
    const $cantidad = $('#cantidad');
    const $categoria = $('#categoria');
    const $tipo = $('#tipo');
    const $fecha = $('#fecha');
    const $saldoTotal = $('#saldoTotal');
    const $historialTransacciones = $('#historialTransacciones');
    const $limpiarHistorial = $('#limpiarHistorial');
    const $porCategoria = $('#porCategoria');
    const $totalTransacciones = $('#totalTransacciones');
    const $ultimaTransaccion = $('#ultimaTransaccion');
    const $promedioCategorias = $('#promedioCategorias');
    const $totalIngresos = $('#totalIngresos');
    const $totalEgresos = $('#totalEgresos');
    const $exportarDatos = $('#exportarDatos');
    const $modalEdicion = new bootstrap.Modal(document.getElementById('modalEdicion'));
    const $formularioEdicion = $('#formularioEdicion');
    const $guardarEdicion = $('#guardarEdicion');

    // Establecer fecha actual en el input
    const today = new Date().toISOString().split('T')[0];
    $fecha.val(today);

    // Evento: Agregar transacción
    $formularioTransaccion.on('submit', function(e) {
        e.preventDefault();

        const transaccion = {
            id: Date.now(),
            descripcion: $descripcion.val(),
            cantidad: parseFloat($cantidad.val()),
            categoria: $categoria.val(),
            tipo: $tipo.val(),
            fecha: $fecha.val()
        };

        transacciones.push(transaccion);
        guardarTransacciones();
        limpiarFormulario();
        actualizarVista();

        // Mostrar notificación de éxito
        mostrarNotificacion('Transacción agregada correctamente', 'success');
    });

    // Evento: Limpiar historial
    $limpiarHistorial.on('click', function() {
        if (confirm('¿Estás seguro de que deseas eliminar todo el historial?')) {
            transacciones = [];
            guardarTransacciones();
            actualizarVista();
            mostrarNotificacion('Historial eliminado', 'warning');
        }
    });

    // Evento: Editar transacción
    $(document).on('click', '.btn-edit', function() {
        const id = $(this).data('id');
        const transaccion = transacciones.find(t => t.id === id);

        if (transaccion) {
            idTransaccionEditada = id;
            $('#idTransaccion').val(transaccion.id);
            $('#editDescripcion').val(transaccion.descripcion);
            $('#editCantidad').val(transaccion.cantidad);
            $('#editCategoria').val(transaccion.categoria);
            $modalEdicion.show();
        }
    });

    // Evento: Guardar edición
    $guardarEdicion.on('click', function() {
        const transaccionIndex = transacciones.findIndex(t => t.id === idTransaccionEditada);

        if (transaccionIndex !== -1) {
            transacciones[transaccionIndex].descripcion = $('#editDescripcion').val();
            transacciones[transaccionIndex].cantidad = parseFloat($editCantidad.val());
            transacciones[transaccionIndex].categoria = $('#editCategoria').val();

            guardarTransacciones();
            actualizarVista();
            $modalEdicion.hide();
            mostrarNotificacion('Transacción actualizada', 'success');
        }
    });

    // Evento: Eliminar transacción
    $(document).on('click', '.btn-delete', function() {
        const id = $(this).data('id');

        if (confirm('¿Deseas eliminar esta transacción?')) {
            transacciones = transacciones.filter(t => t.id !== id);
            guardarTransacciones();
            actualizarVista();
            mostrarNotificacion('Transacción eliminada', 'info');
        }
    });

    // Evento: Exportar datos
    $exportarDatos.on('click', function() {
        exportarCSV();
    });

    // Funciones utilitarias
    function guardarTransacciones() {
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    }

    function limpiarFormulario() {
        $descripcion.val('');
        $cantidad.val('');
        $categoria.val('');
        $tipo.val('');
        $fecha.val(today);
    }

    function actualizarVista() {
        actualizarSaldo();
        actualizarHistorial();
        actualizarCategorias();
        actualizarResumen();
    }

    function actualizarSaldo() {
        let saldo = 0;
        let ingresos = 0;
        let egresos = 0;

        transacciones.forEach(t => {
            if (t.tipo === 'Ingreso') {
                saldo += t.cantidad;
                ingresos += t.cantidad;
            } else {
                saldo -= t.cantidad;
                egresos += t.cantidad;
            }
        });

        $saldoTotal.text('$' + saldo.toFixed(2));
        $totalIngresos.text('+$' + ingresos.toFixed(2)).css('color', '#10b981');
        $totalEgresos.text('-$' + egresos.toFixed(2)).css('color', '#ef4444');
    }

    function actualizarHistorial() {
        if (transacciones.length === 0) {
            $historialTransacciones.html('<p class="text-muted text-center">No hay transacciones aún</p>');
            return;
        }

        let html = '';
        const transaccionesOrdenadas = [...transacciones].reverse();

        transaccionesOrdenadas.forEach(t => {
            const tipo = t.tipo === 'Ingreso' ? 'ingreso' : 'egreso';
            const icono = t.tipo === 'Ingreso' ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-arrow-up"></i>';
            const signo = t.tipo === 'Ingreso' ? '+' : '-';
            const fecha = formatearFecha(t.fecha);

            html += `
                <div class="transaccion-item ${tipo}">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <div class="transaccion-icon ${tipo}">${icono}</div>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="mb-1">${t.descripcion}</h6>
                                    <div class="transaccion-categoria">${t.categoria}</div>
                                    <small class="text-muted">${fecha}</small>
                                </div>
                                <div class="text-end">
                                    <h6 class="transaccion-monto ${tipo}">${signo}$${t.cantidad.toFixed(2)}</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto mt-2 mt-lg-0">
                            <div class="transaccion-acciones">
                                <button class="btn btn-sm btn-warning btn-edit" data-id="${t.id}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger btn-delete" data-id="${t.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        $historialTransacciones.html(html);
    }

    function actualizarCategorias() {
        const categorias = {};

        transacciones.forEach(t => {
            if (!categorias[t.categoria]) {
                categorias[t.categoria] = 0;
            }
            categorias[t.categoria] += t.cantidad;
        });

        if (Object.keys(categorias).length === 0) {
            $porCategoria.html('<p class="text-muted text-center small">Sin datos aún</p>');
            return;
        }

        let html = '';
        Object.entries(categorias)
            .sort((a, b) => b[1] - a[1])
            .forEach(([categoria, monto]) => {
                html += `
                    <div class="categoria-item">
                        <span class="categoria-nombre">${categoria}</span>
                        <span class="categoria-monto">$${monto.toFixed(2)}</span>
                    </div>
                `;
            });

        $porCategoria.html(html);
    }

    function actualizarResumen() {
        const total = transacciones.length;
        $totalTransacciones.text(total);

        if (total > 0) {
            const ultima = transacciones[transacciones.length - 1];
            $ultimaTransaccion.text(formatearFecha(ultima.fecha));

            const promedio = transacciones.reduce((sum, t) => sum + t.cantidad, 0) / total;
            $promedioCategorias.text('$' + promedio.toFixed(2));
        } else {
            $ultimaTransaccion.text('-');
            $promedioCategorias.text('$0.00');
        }
    }

    function formatearFecha(fecha) {
        const opciones = { year: 'numeric', month: 'short', day: 'numeric', locale: 'es-ES' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    function mostrarNotificacion(mensaje, tipo) {
        const alertClass = `alert-${tipo === 'success' ? 'success' : tipo === 'warning' ? 'warning' : 'info'}`;
        const $alerta = $(`
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert" style="position: fixed; top: 70px; right: 20px; z-index: 1000; min-width: 300px;">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

        $('body').append($alerta);

        setTimeout(() => {
            $alerta.fadeOut(() => {
                $alerta.remove();
            });
        }, 3000);
    }

    function exportarCSV() {
        if (transacciones.length === 0) {
            mostrarNotificacion('No hay datos para exportar', 'warning');
            return;
        }

        let csv = 'Descripción,Cantidad,Categoría,Tipo,Fecha\n';

        transacciones.forEach(t => {
            const signo = t.tipo === 'Ingreso' ? '+' : '-';
            csv += `"${t.descripcion}",${signo}${t.cantidad},"${t.categoria}","${t.tipo}","${t.fecha}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const enlace = document.createElement('a');
        const url = URL.createObjectURL(blob);

        enlace.setAttribute('href', url);
        enlace.setAttribute('download', `wallet_${new Date().toISOString().split('T')[0]}.csv`);
        enlace.style.visibility = 'hidden';

        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);

        mostrarNotificacion('Datos exportados correctamente', 'success');
    }

    // Inicializar la vista
    actualizarVista();

    // Actualizar vista cada 5 segundos (sincronización entre pestañas)
    setInterval(() => {
        const nuevasTransacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        if (JSON.stringify(nuevasTransacciones) !== JSON.stringify(transacciones)) {
            transacciones = nuevasTransacciones;
            actualizarVista();
        }
    }, 5000);
});
