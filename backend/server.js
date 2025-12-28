const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./carrito.db');

// Migración: Actualizar tabla productos
db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");

  // 1. Crear tabla estado primero
  db.run(`
    CREATE TABLE IF NOT EXISTS estado (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )
  `);
  // Crear tabla usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      correo TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL DEFAULT 'user',
      fecha_creacion TEXT DEFAULT (datetime('now', '-5 hours'))
    )
  `);

  // 2. Insertar estados si no existen
  db.get('SELECT COUNT(*) as count FROM estado', (err, row) => {
    if (err) console.error(err);
    if (row.count === 0) {
      db.run(`INSERT INTO estado (nombre) VALUES ('Activo'), ('Inactivo')`, (err) => {
        if (err) console.error(err);
      });
    }

  db.get('SELECT COUNT(*) as count FROM usuarios', (err, row) => {
    if (row.count === 0) {
      db.run(
        `INSERT INTO usuarios (nombres, apellidos, correo, password, rol) VALUES (?, ?, ?, ?, ?)`,
        ['Administrador', 'Del Sistema', 'admin@admin.com', 'admin123', 'admin']
      );
    }
  });

    // 3. Crear tabla productos después que estado existe
    db.run(`CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      estado_id INTEGER NOT NULL,
      precio REAL NOT NULL,
      imagen TEXT,
      stock INTEGER NOT NULL DEFAULT 10,
      etiqueta TEXT NOT NULL,
      categoria TEXT NOT NULL,
      FOREIGN KEY (estado_id) REFERENCES estado(id)
    )`, (err) => {
      if (err) console.error(err);

      // 4. Verificar si necesitamos insertar datos de ejemplo
      db.get('SELECT COUNT(*) as count FROM productos', (err, row) => {
        if (err) console.error(err);
        if (row.count === 0) {
          const stmt = db.prepare(`INSERT INTO productos (nombre, estado_id, precio, imagen, stock, etiqueta, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)`);
          
          const productosEjemplo = [
            ['Camiseta Android Studio', 1, 29.99, '/images/react.jpeg', 15, 'Nuevo', 'Android Dev'],
            ['Taza Kotlin', 1, 12.50, '/images/Taza JavaScript.jpeg', 8, '-10%', 'Android Dev'],
            ['Gorra MongoDB', 1, 19.00, '/images/Gorra Node.jpg', 20, '', 'Bases de Datos'],
            ['Sticker PostgreSQL', 1, 3.99, '/images/CSS.jpeg', 50, 'Nuevo', 'Bases de Datos'],
            ['Taza Café Programador', 1, 14.99, '/images/Taza JavaScript.jpeg', 30, 'Oferta', 'Cafeteria'],
            ['Termo Oficina', 1, 24.99, '/images/php.jpg', 12, 'Nuevo', 'Cafeteria'],
            ['Llavero Logo', 1, 5.99, '/images/Gorra Node.jpg', 40, '', 'Merchandising'],
            ['Pin Oficial', 1, 3.50, '/images/CSS.jpeg', 60, 'Nuevo', 'Merchandising'],
            ['Camiseta AWS', 1, 34.99, '/images/react.jpeg', 18, '-15%', 'Cloud Computing'],
            ['Gorra Azure', 1, 22.00, '/images/Gorra Node.jpg', 15, '', 'Cloud Computing'],
            ['Sticker Open Source', 1, 2.99, '/images/CSS.jpeg', 100, 'Nuevo', 'Comunidad'],
            ['Camiseta Meetup', 1, 27.99, '/images/php.jpg', 20, '', 'Comunidad'],
            ['Taza Docker', 1, 16.50, '/images/Taza JavaScript.jpeg', 25, 'Nuevo', 'Contenedores'],
            ['Gorra Kubernetes', 1, 23.99, '/images/Gorra Node.jpg', 12, '-20%', 'Contenedores'],
            ['Camiseta Blockchain', 1, 31.99, '/images/react.jpeg', 10, '', 'Cripto'],
            ['Sticker Bitcoin', 1, 4.25, '/images/CSS.jpeg', 45, 'Nuevo', 'Cripto'],
            ['Gorra Python', 1, 21.99, '/images/Gorra Node.jpg', 15, '', 'Data Science'],
            ['Taza Pandas', 1, 15.75, '/images/Taza JavaScript.jpeg', 22, 'Nuevo', 'Data Science'],
            ['Camiseta React', 1, 28.99, '/images/react.jpeg', 25, '-10%', 'Desarrollo Web'],
            ['Sticker JavaScript', 1, 3.25, '/images/CSS.jpeg', 60, '', 'Desarrollo Web'],
            ['Tableta Gráfica', 1, 89.99, '/images/php.jpg', 8, 'Oferta', 'Diseño Gráfico'],
            ['Poster Tipografía', 1, 12.99, '/images/sql.jpg', 30, 'Nuevo', 'Diseño Gráfico'],
            ['Mousepad Figma', 1, 19.99, '/images/react.jpeg', 15, '', 'Diseño UI/UX'],
            ['Taza Adobe XD', 1, 14.50, '/images/Taza JavaScript.jpeg', 20, 'Nuevo', 'Diseño UI/UX'],
            ['Kit Arduino', 1, 49.99, '/images/Gorra Node.jpg', 10, '-15%', 'Electrónica'],
            ['Llavero Raspberry', 1, 7.99, '/images/CSS.jpeg', 35, '', 'Electrónica'],
            ['Libro Startups', 1, 18.99, '/images/php.jpg', 12, 'Nuevo', 'Emprendimiento'],
            ['Cuaderno Ideas', 1, 9.99, '/images/sql.jpg', 25, '', 'Emprendimiento'],
            ['Camiseta CSS', 1, 24.99, '/images/react.jpeg', 18, 'Nuevo', 'Frontend'],
            ['Gorra HTML5', 1, 17.99, '/images/Gorra Node.jpg', 15, '-10%', 'Frontend'],
            ['Taza Unity', 1, 16.99, '/images/Taza JavaScript.jpeg', 20, '', 'Game Dev'],
            ['Sticker Unreal', 1, 3.99, '/images/CSS.jpeg', 40, 'Nuevo', 'Game Dev'],
            ['Camiseta TensorFlow', 1, 32.99, '/images/php.jpg', 12, '-20%', 'Inteligencia Artificial'],
            ['Gorra ChatGPT', 1, 25.99, '/images/sql.jpg', 15, '', 'Inteligencia Artificial'],
            ['Kit IoT Starter', 1, 59.99, '/images/react.jpeg', 8, 'Oferta', 'IoT'],
            ['Sticker Smart Home', 1, 4.50, '/images/CSS.jpeg', 30, 'Nuevo', 'IoT'],
            ['Taza GPT-4', 1, 18.99, '/images/Taza JavaScript.jpeg', 18, '', 'LLMs'],
            ['Camiseta Bard', 1, 29.99, '/images/Gorra Node.jpg', 10, 'Nuevo', 'LLMs'],
            ['Libro ML', 1, 22.99, '/images/php.jpg', 12, '-15%', 'Machine Learning'],
            ['Sticker Scikit', 1, 3.75, '/images/sql.jpg', 35, '', 'Machine Learning'],
            ['Gorra Flutter', 1, 20.99, '/images/react.jpeg', 15, 'Nuevo', 'Mobile'],
            ['Taza React Native', 1, 15.50, '/images/Taza JavaScript.jpeg', 22, '', 'Mobile'],
            ['Camiseta Blender', 1, 27.99, '/images/Gorra Node.jpg', 12, '-10%', 'Motores 3D'],
            ['Sticker Three.js', 1, 4.25, '/images/CSS.jpeg', 30, 'Nuevo', 'Motores 3D'],
            ['Taza Linux', 1, 13.99, '/images/Taza JavaScript.jpeg', 25, '', 'Open Source'],
            ['Pin GitHub', 1, 5.99, '/images/php.jpg', 40, 'Nuevo', 'Open Source'],
            ['Camiseta Kubernetes', 1, 31.99, '/images/sql.jpg', 10, '-20%', 'Orquestación'],
            ['Gorra Docker Swarm', 1, 23.99, '/images/react.jpeg', 12, '', 'Orquestación'],
            ['Kit Post-it', 1, 8.99, '/images/CSS.jpeg', 35, 'Nuevo', 'Productividad'],
            ['Libreta Premium', 1, 14.99, '/images/Taza JavaScript.jpeg', 20, '', 'Productividad'],
            ['Taza "Hello World"', 1, 11.99, '/images/Gorra Node.jpg', 30, 'Oferta', 'Programación'],
            ['Camiseta Código', 1, 26.99, '/images/php.jpg', 18, 'Nuevo', 'Programación'],
            ['Gorra Testing', 1, 19.99, '/images/sql.jpg', 15, '', 'QA'],
            ['Sticker Jest', 1, 3.99, '/images/react.jpeg', 40, 'Nuevo', 'QA'],
            ['Camiseta TCP/IP', 1, 28.99, '/images/CSS.jpeg', 12, '-15%', 'Redes'],
            ['Taza Firewall', 1, 16.99, '/images/Taza JavaScript.jpeg', 20, '', 'Redes'],
            ['Kit Robótica', 1, 69.99, '/images/Gorra Node.jpg', 8, 'Oferta', 'STEM'],
            ['Libro Matemáticas', 1, 19.99, '/images/php.jpg', 15, 'Nuevo', 'STEM'],
            ['Taza Cloud', 1, 15.99, '/images/sql.jpg', 25, '', 'Servicios Cloud'],
            ['Gorra Serverless', 1, 22.99, '/images/react.jpeg', 15, 'Nuevo', 'Servicios Cloud'],
            ['Camiseta NGINX', 1, 27.99, '/images/CSS.jpeg', 12, '-10%', 'Servidores'],
            ['Sticker Apache', 1, 3.50, '/images/Taza JavaScript.jpeg', 40, '', 'Servidores'],
            ['Libro Testing', 1, 21.99, '/images/Gorra Node.jpg', 10, 'Nuevo', 'Testing'],
            ['Taza QA', 1, 14.99, '/images/php.jpg', 20, '', 'Testing']
          ];

          productosEjemplo.forEach(p => {
            stmt.run(p[0], p[1], p[2], p[3], p[4], p[5], p[6], (err) => {
              if (err) console.error('Error insertando:', p[0], err);
            });
          });

          stmt.finalize();
        }
      });
    });
  });
});

// Endpoint para obtener productos con stock
app.get('/api/productos', (req, res) => {
  db.all('SELECT id, nombre, estado_id, precio, imagen, stock, etiqueta, categoria FROM productos', (err, rows) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(rows);
  });
});

// Endpoint para actualizar stock al comprar
app.put('/api/productos/:id/stock', (req, res) => {
  const { cantidad } = req.body;
  db.run(
    'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
    [cantidad, req.params.id, cantidad],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar stock' });
      }
      if (this.changes === 0) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }
      res.json({ success: true });
    }
  );
});

// ✅ Endpoint para obtener todos los estados
app.get('/api/estados', (req, res) => {
  db.all('SELECT id, nombre FROM estado', (err, rows) => {
    if (err) {
      console.error('Error al obtener estados:', err);
      return res.status(500).json({ error: 'Error al obtener estados' });
    }
    res.json(rows);
  });
});


// Endpoint para actualizar el estado de un producto
app.put('/api/productos/:id/estado', (req, res) => {
  const { estado_id } = req.body;
  const productoId = req.params.id;
  console.log("edit estado")

  if (!estado_id) {
    return res.status(400).json({ error: 'Se requiere estado_id' });
  }

  // Verificar si el estado existe
  db.get('SELECT id FROM estado WHERE id = ?', [estado_id], (err, row) => {
    if (err) {
      console.error('Error al consultar estado:', err);
      return res.status(500).json({ error: 'Error al verificar estado' });
    }

    if (!row) {
      return res.status(400).json({ error: 'El estado_id no existe' });
    }

    // Actualizar estado del producto
    db.run(
      'UPDATE productos SET estado_id = ? WHERE id = ?',
      [estado_id, productoId],
      function (err) {
        if (err) {
          console.error('Error al actualizar estado:', err);
          return res.status(500).json({ error: 'Error al actualizar estado' });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ success: true });
      }
    );
  });
});

// Endpoint para obtener productos paginados con filtros
app.get('/api/productos/paginados', (req, res) => {
  const { page = 1, pageSize = 10, search = '', categoria = '' } = req.query;
  const offset = (page - 1) * pageSize;

  // Validar parámetros
  const pageInt = Math.max(1, parseInt(page));
  const pageSizeInt = Math.min(50, Math.max(1, parseInt(pageSize)));
  
  // Construir consulta base
  let sql = `
    SELECT p.id, p.nombre, p.precio, p.imagen, p.stock, 
           p.etiqueta, p.categoria, e.nombre as estado
    FROM productos p
    JOIN estado e ON p.estado_id = e.id
    WHERE p.estado_id = 1  -- Solo productos activos (comentario SQL válido)
  `;
  
  const params = [];

  // Aplicar filtros
  if (search) {
    sql += ' AND p.nombre LIKE ?';
    params.push(`%${search}%`);
  }

  if (categoria) {
    sql += ' AND p.categoria = ?';
    params.push(categoria);
  }

  // Consulta para los datos paginados
  const sqlPaginada = `${sql} ORDER BY p.nombre LIMIT ? OFFSET ?`;
  
  // Consulta para el conteo total (CON filtros para precisión)
  const sqlCount = `SELECT COUNT(*) as total FROM (${sql})`;

  db.serialize(() => {
    // Primero obtener el conteo total (con filtros)
    db.get(sqlCount, params, (err, countRow) => {
      if (err) {
        console.error('Error en conteo:', err);
        return res.status(500).json({ error: 'Error al contar productos' });
      }

      const total = countRow.total;

      // Luego obtener los datos paginados
      db.all(sqlPaginada, [...params, pageSizeInt, offset], (err, rows) => {
        if (err) {
          console.error('Error en consulta paginada:', {
            error: err,
            query: sqlPaginada,
            params: [...params, pageSizeInt, offset]
          });
          return res.status(500).json({ error: 'Error al obtener productos' });
        }

        res.json({
          productos: rows,
          total: total,
          page: pageInt,
          pageSize: pageSizeInt,
          totalPages: Math.ceil(total / pageSizeInt)
        });
      });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { correo, password } = req.body;

  console.log('Intentando login con:', correo, password);

db.get(
  'SELECT * FROM usuarios WHERE correo = ? AND password = ?',
  [correo, password],
  (err, user) => {
    if (err) {
      console.log('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    console.log('Usuario encontrado en callback:', user);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    console.log(`Login exitoso: ${user.nombres} ${user.apellidos}`);

    res.json({
      success: true,
      usuario: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol,
        fecha_creacion: user.fecha_creacion
      }
    });
  }
);

});

app.get('/api/usuarios', (req, res) => {
  db.all(
    'SELECT id, nombres, apellidos, correo, rol, fecha_creacion FROM usuarios',
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener usuarios' });
      }

      res.json({ success: true, usuarios: rows });
    }
  );
});


app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});