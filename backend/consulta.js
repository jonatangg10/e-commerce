const sqlite3 = require('sqlite3').verbose();

// Abrir base de datos
const db = new sqlite3.Database('./carrito.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a carrito.db');
});

// Leer los productos con JOIN a estado
db.all(`
  SELECT 
    p.id, 
    p.nombre, 
    e.nombre as estado_nombre,
    p.precio, 
    p.imagen, 
    p.stock, 
    p.etiqueta, 
    p.categoria
  FROM productos p
  JOIN estado e ON p.estado_id = e.id
`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.table(rows);
  db.close();
});