# Mi Wallet Digital 💳

Una aplicación web moderna y responsiva para gestionar tu cartera digital, transacciones e ingresos/egresos de forma fácil e intuitiva.

## 🎯 Características

- **Dashboard interactivo**: Visualiza tu saldo total, ingresos y egresos de un vistazo
- **Gestión de transacciones**: Agrega, edita y elimina transacciones fácilmente
- **Categorización**: Organiza tus transacciones por categorías (Salario, Comida, Transporte, etc.)
- **Historial completo**: Accede a un historial detallado de todas tus transacciones
- **Estadísticas**: Visualiza tus gastos por categoría y resumen rápido
- **Almacenamiento local**: Los datos se guardan automáticamente en tu navegador
- **Responsivo**: Funciona perfectamente en dispositivos móviles, tablets y desktop
- **Exportación**: Exporta tus datos en formato CSV
- **Sincronización**: Se sincroniza automáticamente si abres la app en varias pestañas

## 📦 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y animaciones
- **Bootstrap 5**: Framework responsivo
- **jQuery**: Interactividad y manipulación del DOM
- **LocalStorage**: Almacenamiento de datos

## 🚀 Cómo Usar

1. **Descarga o clona el proyecto**
   ```bash
   git clone <tu-repositorio>
   ```

2. **Abre el archivo `index.html` en tu navegador**
   - Simplemente haz doble clic en `index.html` o arrastralo a tu navegador

3. **¡Comienza a usar tu Wallet!**

## 📝 Funcionalidades Detalladas

### Agregar Transacción
1. Completa los campos del formulario:
   - Descripción (ej: Salario, Compra de comida)
   - Cantidad (monto en dinero)
   - Categoría
   - Tipo (Ingreso o Egreso)
   - Fecha

2. Haz clic en "Agregar Transacción"
3. La transacción aparecerá inmediatamente en el historial

### Editar Transacción
1. Haz clic en el botón ✏️ (editar) en cualquier transacción
2. Modifica los datos en el modal
3. Haz clic en "Guardar cambios"

### Eliminar Transacción
1. Haz clic en el botón 🗑️ (eliminar) en cualquier transacción
2. Confirma la eliminación

### Exportar Datos
1. Haz clic en el botón "Exportar Datos" en la sección de resumen
2. Se descargará un archivo CSV con todas tus transacciones

## 🎨 Diseño Responsive

- **Mobile (< 576px)**: Optimizado para teléfonos
- **Tablet (576px - 768px)**: Diseño adaptado para tablets
- **Desktop (> 768px)**: Interfaz completa con dos columnas

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en el **LocalStorage** de tu navegador. Esto significa:

- ✅ Tus datos persisten incluso después de cerrar el navegador
- ✅ Se sincroniza entre pestañas del mismo navegador
- ⚠️ Los datos se eliminan si limpias el caché del navegador
- ⚠️ Son locales a tu navegador (no se sincronizan entre dispositivos)

### Exportar Datos Regularmente

Para mayor seguridad, exporta tus datos frecuentemente haciendo clic en "Exportar Datos".

## 📊 Categorías Disponibles

- 💰 Salario
- 🍽️ Comida
- 🚗 Transporte
- 🎬 Entretenimiento
- 📦 Servicios
- 📚 Educación
- 📝 Otros

Puedes modificar estas categorías editando el archivo `index.html` en los elementos `<select>`.

## 🔧 Personalización

### Cambiar Colores
Edita las variables en `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --success-color: #10b981;
    --danger-color: #ef4444;
    ...
}
```

### Agregar Más Categorías
1. Abre `index.html`
2. Busca los `<select>` con id `categoria` y `editCategoria`
3. Agrega nuevas opciones `<option>`

## 🖥️ Archivos del Proyecto

```
wallet-digital/
├── index.html        # Estructura HTML principal
├── styles.css        # Estilos y diseño responsivo
├── script.js         # Lógica con jQuery
└── README.md         # Este archivo
```

## 🌐 Requisitos del Navegador

- JavaScript habilitado
- LocalStorage disponible
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 📱 Capturas de Pantalla

### Desktop
- Dashboard completo con saldo y gráficos
- Formulario y historial lado a lado
- Estadísticas detalladas

### Mobile
- Interfaz optimizada para pantalla pequeña
- Stack vertical de elementos
- Botones grandes y fáciles de tocar

## 🐛 Solución de Problemas

**P: No veo mis datos cuando abro la app nuevamente**
R: Verifica que LocalStorage esté habilitado en tu navegador y que no hayas limpiado el caché.

**P: ¿Cómo borro todos mis datos?**
R: Haz clic en "Limpiar" en la sección de historial o limpia el caché del navegador.

**P: ¿Puedo usar esto en múltiples dispositivos?**
R: Actualmente los datos son locales. Puedes exportar e importar manualmente tus datos.

## 📄 Licencia

Este proyecto es de código abierto y disponible para uso personal.

## 👨‍💻 Autor

Creado con ❤️ para ayudarte a gestionar tu dinero

---

**¡Disfruta gestionando tu cartera digital!** 💳✨
