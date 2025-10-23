// ======================= app.js =======================
// Chicos: lógica del "Hacer pedido" para playeras.
// Lee el formulario, calcula total (modelo * cantidad + extras + envío)
// y muestra un resumen. Está escrito paso a paso y con comentarios.
/** Utilidad: formatea a moneda MXN */
function toMXN(num) {
    return Number(num || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

/** Utilidad: toma precio desde data-precio (en selects/checks) */
function getPrecioFromDataset(el) {
    const raw = el?.dataset?.precio;
    return raw ? Number(raw) : 0;
}

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos que usaremos:
    const form = document.getElementById('formPedido');
    const outNombre = document.getElementById('outNombre');
    const outLista = document.getElementById('outLista');
    const outTotal = document.getElementById('outTotal');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const confirmNombre = document.getElementById('confirmNombre');

    // Toast UX (aviso corto)
    const toastBtn = document.getElementById('btnToast');
    const toastEl = document.getElementById('toastAviso');
    const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
    toastBtn.addEventListener('click', () => toast.show());

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita recargar la página

        // 1) Leemos campos base
        const nombre = document.getElementById('nombreCliente').value.trim();
        const selModelo = document.getElementById('selModelo');
        const selTalla = document.getElementById('selTalla');
        const selColor = document.getElementById('selColor');
        const cantidad = Number(document.getElementById('inpCantidad').value || 0);

        // Validación mínima:
        if (!nombre || !selModelo.value || !selTalla.value || !selColor.value || cantidad < 1) {
            alert('Completa nombre, modelo, talla, color y cantidad (mínimo 1).');
            return;
        }

        // 2) Precios base
        const optModelo = selModelo.options[selModelo.selectedIndex];
        const precioModelo = getPrecioFromDataset(optModelo); // precio unitario del modelo
        let total = precioModelo * cantidad;

        // 3) Extras / personalización
        const chkNombreNumero = document.getElementById('chkNombreNumero');
        const chkParcheLiga = document.getElementById('chkParcheLiga');

        const extrasSeleccionados = [];
        if (chkNombreNumero.checked) {
            total += getPrecioFromDataset(chkNombreNumero) * cantidad; // costo por prenda
            extrasSeleccionados.push('Nombre y número');
        }
        if (chkParcheLiga.checked) {
            total += getPrecioFromDataset(chkParcheLiga) * cantidad; // costo por prenda
            extrasSeleccionados.push('Parche de liga');
        }

        // Campos condicionales (solo se muestran en resumen si tienen contenido)
        const inpNombre = document.getElementById('inpNombre').value.trim();
        const inpNumero = document.getElementById('inpNumero').value.trim();

        // 4) Envío e instrucciones
        const selEnvio = document.getElementById('selEnvio');
        const optEnvio = selEnvio.options[selEnvio.selectedIndex];
        const costoEnvio = getPrecioFromDataset(optEnvio);
        total += costoEnvio;

        const txtInstr = document.getElementById('txtInstrucciones').value.trim();

        // 5) Pintamos resumen
        outNombre.textContent = nombre;

        // Lista HTML del pedido
        outLista.innerHTML = `
      <li><strong>Modelo:</strong> ${selModelo.value} — ${toMXN(precioModelo)} c/u × ${cantidad}</li>
      <li><strong>Talla:</strong> ${selTalla.value}</li>
      <li><strong>Color:</strong> ${selColor.value}</li>
      <li><strong>Extras:</strong> ${extrasSeleccionados.length ? extrasSeleccionados.join(', ') : 'Ninguno'}</li>
      ${inpNombre || inpNumero ? `<li><strong>Personalización:</strong> ${inpNombre ? 'Nombre: ' + inpNombre : ''} ${inpNumero ? ' | Número: ' + inpNumero : ''}</li>` : ''}
      <li><strong>Envío:</strong> ${selEnvio.value} — ${toMXN(costoEnvio)}</li>
      ${txtInstr ? `<li><strong>Instrucciones:</strong> ${txtInstr}</li>` : ''}
    `;

        outTotal.textContent = toMXN(total);

        // Habilitamos confirmar y pasamos nombre al modal
        btnConfirmar.disabled = false;
        confirmNombre.textContent = nombre;
    });

    // Reset: limpiar también el resumen
    form.addEventListener('reset', () => {
        setTimeout(() => {
            outNombre.textContent = '—';
            outLista.innerHTML = '<li class="text-muted">Aún no has generado tu pedido.</li>';
            outTotal.textContent = '$0';
            btnConfirmar.disabled = true;
        }, 0);
    });
});
// ===================== /app.js ======================
< !--Columna lateral con ejemplos de componentes-- >
    <aside class="col-12 col-lg-4">
        <!--Botones de ejemplo-->
        <div class="card mb-3">
            <div class="card-header">Botones (Bootstrap)</div>
            <div class="card-body d-flex flex-wrap gap-2">
                <button class="btn btn-dark btn-sm">Primario</button>
                <button class="btn btn-secondary btn-sm">Secundario</button>
                <button class="btn btn-success btn-sm">Éxito</button>
                <button class="btn btn-danger btn-sm">Peligro</button>
                <button class="btn btn-warning btn-sm">Advertencia</button>
            </div>
        </div>

