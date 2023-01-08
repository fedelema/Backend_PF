**App deployada en Vercel: backend-pf.vercel.app**

# RESUMEN GENERAL
    1) Colecciones (MongoDB)
    2) Endpoints
    3) Ejemplos de la DB para pruebas
    4) Aclaraciones


## 1) Colecciones (MongoDB)
En este proyecto se utilizan las siguientes colecciones de Mongo DB:

### Productos
    - "_id": como clave única, la genera Mongo automáticamente (object)
    - "nombre": nombre del producto (string)
    - "descripcion": descripción del producto (string)
    - "precio": precio del producto (number)
    - "foto": url de la imágen del producto (string)
    - "stock": stock del producto (number)
    - "cantidad": cantidad del producto, siempre se crea con 1 (number)
    - "categoria": categoría del producto (string)
    - timestamps de creación y edición del mismo

### Carritos
    - "_id": como clave única, la genera Mongo automáticamente (object)
    - "productos": productos dentro del carrito, se inicia vacío (array)
    - "comprador": mail del cliente al que pertenece el carrito (string)
    - timestamps de creación y edición del mismo

### Ordenes
    - "_id": como clave única, la genera Mongo automáticamente (object)
    - "productos": productos dentro de la orden, los que había en el carrito cuando se genera la misma (array)
    - "comprador": mail del cliente al que pertenece la orden (string)
    - "precioTotal": precio total de la orden, precio * cantidad de cada producto (number)
    - timestamps de creación y edición del mismo

### Users
    - "_id": como clave única, la genera Mongo automáticamente (object)
    - "username": mail del usuario (string)
    - "password": contraseña del usuario, se guarda encriptada con bcrypt (string)
    - "nombre": nombre del usuario (string)
    - "direccion": dirección del usuario (string)
    - "edad": edad del usuario (number)
    - "interno": código telefónico del país del usuario (number)
    - "telefono": número de teléfono del usuario, código de área incluído (number)

### Sessions (se generan cuando el usuario se loguea y luego se destruyen)
    - "_id": como clave única, la genera Mongo automáticamente (object)
    - "expires": fecha y hora de expiración de la misma (date)
    - "session": datos de la cookie (string)


## 2) Endpoints
Los endpoints de los users se pueden probar en el front; mientras que los de productos, carritos y ordenes se hacen desde el back

### Productos 
Todos comienzan con "api/productos"  

**GET**  
    - "/:id?": en caso de que haya id busca el producto con dicho id, si no trae todos los productos  
    - "/categoria/:cat": busca todos los productos pertenecientes a dicha categoría  
**POST**  
    - "/": crea un nuevo producto. Son requeridos nombre, descripcion, precio, foto, stock, categoria  
**UPDATE**  
    - "/:id": actualiza un producto con su id. Son requeridos nombre, descripcion, precio, foto, stock, categoria  
**DELETE**  
    - "/:id": elimina un producto con su id  

### Carritos 
Todos comienzan con "api/carritos"  

**GET**  
    - "/:comprador": trae las carritos correspondientes a un comprador, con su mail
    - "/:id/productos": trae los productos de un carrito con su id  
**POST**  
    - "/": crea un nuevo carrito. Es requerido el comprador  
    - "/:id/productos/:id_prod": agrega un producto a un carrito, con sus respectivos id. Siempre que se agrega un producto, se hace un chequeo para evitar duplicados (si ya está en el carrito, se aumenta en 1 la cantidad). Hay un control para que la cantidad de un producto no supere al stock del mismo  
**DELETE**  
    - "/:id": elimina un carrito con su id  
    - "/:id/productos/:id_prod": elimina un producto de un carrito  

### Ordenes
Todos comienzan con "api/ordenes"  

**GET**  
    - "/": trae todas las órdenes  
    - "/:id": trae una orden con su id  
    - "/comprador/:comprador": trae todas las órdenes de un cliente, con su mail  
**POST**  
    - "/:id/comprar": genera una nueva orden, con el id del carrito que se quiere comprar. Se envía un mail al administrador con el resumen del pedido (también se enviaría un SMS al cliente indicando que el pedido fue recibido y un WhatsApp al administrador indicando que hubo un pedido del cliente, pero están comentados momentaneamente por motivos de la configuración de Twilio). Se calcula el precio total de la orden. Se vacía el carrito para futuras compras del cliente  
**DELETE**  
    - "/:id": elimina una orden con su id  

### Users
Se utilizaron estrategias de passport en el login y el signup. En el login se verifica que coincida la contraseña; mientras que en el signup se verifica que el usuario no exista.
Cuando se registra un nuevo usuario, se envía un mail al administrador con todos los datos del mismo  

**GET**  
    - "/login": trae la vista con el formulario del login  
    - "/signup": trae la vista con el formulario del signup  
    - "/home": trae la vista del home. Si el usuario no está autenticado, redirige al login  
    - "/logout": trae la vista del logout cuando se cierra una sesión. Si el usuario no está autenticado, redirige al login  
**POST**  
    - "/login": inicio de sesión de un usuario. Se redirige al home  
    - "/signup": se registra un nuevo usuario. Al registrarse, también se le crea un carrito. Se redirige al home  


## 3) Ejemplos de la DB para pruebas
*_id de productos*
- 631a5b968f331ace2cacc60e
- 631a5ca78f331ace2cacc60f
- 631a5d1b8f331ace2cacc610

*_id de carritos*
- 63754723b6642008397db0ee (fede6@gmail.com)
- 6375472db6642008397db0f0 (fede1@gmail.com)
- 63754732b6642008397db0f2 (fede2@gmail.com)

*_id de ordenes*
- 63ba00f7ce4db1283f6135ad (fede1@gmail.com)
- 63ba256b5480ec4b598bf554 (fede1@gmail.com)
- 63ba26322bc2c5b270b08344 (fede6@gmail.com)

*usuario de prueba*
- User: fede1@gmail.com / Password: fede1
- User: fede6@gmail.com / Password: fede6


## 4) Aclaraciones
- Se creo un archivo .env con las variables de entorno necesarias. Al subir el proyecto a Vercel, las mismas se agregaron en la configuración para que se pueda usar correctamente
- Con los DAOs se puede modificar la base de datos con la cual se interactúa. Por el momento está todo configurado para utilizar Mongo DB
- Se crearon 2 middlewares: uno "soloAdmin" que está prendido en true, el cual permite realizar algunos endpoints solo a administradores (se podría ver de especificar esto por usuario); y otro "authMiddleware" que deja avanzar con el endpoint solo si el usuario está logueado
- Se registran logs ante eventos de warn y error, guardándolos en archivos respectivamente. Se utiliza Winston