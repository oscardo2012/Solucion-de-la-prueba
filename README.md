# Solucion-de-la-prueba
Desarrollo de la prueba técnica de PHP para Stefanini.
Realizada por Oscar Fernando Espinosa Rocha.
***
## Descripción de la solución:
##### 1. Base de datos
-   La base de datos se realizó con MySQL, se llama `inventario`.
-   Se usaron migraciones, por lo que puede implementarse en cualquier otro sistema gestor de bases de datos, pero se debe configurar en el archivo `config/database.php` del API.
-   Se incluye el script de creación y población de la base de datos y el esquema de la base, se encuentran en la carpeta *`Base de datos`*
##### 2. Back-end
El desarrollo del back-end se desarrollo utilizando el framework Laravel en su versión 5.8.
Consiste en un API Rest para ser consumido por el cliente del API.
-   En el archivo `config/database.php` se deben configurar los parametros para realizar la conexión con la base de datos.

Se debe abrir una ventana de terminal, cmd, etc. y ubicarse en la carpeta del proyecto.
- Se deben realizar las siguientes configuraciones:
    ```sh
    % composer dump-autoload
    % php artisan config:cache
    % php artisan key:generate
    ```
-   Para levantar el servidor se debe ejecutar
     ```sh
    % php artisan serve
    ```
-   Se realizaron migraciones para las tablas de la base de datos, si se quieren usar se debe ejecutar
     ```sh
    % php artisan migrate
    ```
##### 3. Front-end
Para el desarrollo del cliente del API:
-   Se usaron:
    * El Framework `Vue.js`.
    * La biblioteca `Bootstrap`.
    * La plantilla `INSPINIA - Responsive Admin Theme`.
- Se recomienda desplegarlo en un servidor web.
    * Usando `PHP` se puede desplegar un sevidor de la siguiente forma:
        * En la terminal, cmd, etc. ubicarse en la carpeta del cliente del API.
        * Ejecutar la suigiente instrucción:
            ```sh
            % php -S=localhost:12345
            ```
        * Así el cliente se ejecutará en `http://localhost:12345/`
-   Las credenciales de acceso para usar el cliente son:
    - Usuario: _correo@correo.com_
    - Clave: _123456_
    - Para la autenticación se usa el hash en sha1 de la clave.

***



### Descripción de la prueba:

Se requiere una aplicación para gestionar el inventario de productos de una zapatería para lo cual se hace el respectivo levantamiento de los siguientes requerimientos

##### 1. Login
- Se requiere la implementación de una vista  que permita la autenticación de entrada a la plataforma.
- Se debe tener en cuenta la validación de los campos, puede usar los campos que usted considere para autenticarse.
- Se debe tener en cuenta la accion back del navegador para evitar el retorno a vistas cuando se esta/ o no logueado.

##### 2. Ingreso de productos
Se requiere implementar un modulo para el ingreso de productos que constará de 5 campos:
* Referencia: Código único del producto alfanumérico ejemplo : ACH46
* Nombre: Texto
* Descripción:Texto 
* Cantidad: Numérico
* Imagen: File

- Se debe considerar la validación de los campos de acuerdo a su tipo.
- Se debe considerar la validación del código único del producto para evitar ingresar códigos repetidos.
- Se debe implementar alertas para avisar al usuario las eventualidades y progresos del proceso.

##### 3. Catalogo de productos
Se requiere una vista en la que se pueda listar los productos y en la cual se pueda buscar de manera rápida mediante código y nombre.

- Se valorara la implementación de la vista creativa, que sea amigable al usuario y agradable.
- Se debe implementar una modal que permita visualizar de manera rápida el detalle del producto y la activación/desactivacion rápida desde la misma.

##### 4. Edición de productos
Se requiere una vista en la que se pueda editar los productos, esta vista permitirá agregar mas unidades al stock, cambiar la descripción, el nombre y la imagen.
- Se debe poder inhabilitar el producto.
- El código no puede ser modificado.
- Los campos deben tener la respectiva validación.

### Notas:
1. Back-End
    - Se debe implementar sobre una capa desacoplada del Front-end.
    - Se espera que los métodos expuestos al Front sean Rest.
    - Se debe entregar un esquema del modelo de base de datos.
    - La implementación del back-end debe hacerse en PHP implementando un patrón MVC y  utilizando como Framework Laravel/lumen.
    - Se valorara la recursividad del código y la limpieza del mismo.
    - Se valorara la documentación oportuna del código.

2. Front-End
    - Se debe implementar sobre una capa desacoplada del Back end.
    - La implementación debe hacerse sobre algun framework de Javascript ya sea Reac/Vue/Angular.
    - Se valorara la recursividad y la implementación de un patrón modulado dentro del proyecto.
    - Se valorara la creatividad con la que se implementan las vistas haciéndolas amigables al usuario.
    - Se debe evitar el Page-Reload para hacer solicitudes al servidor.

3. Notas Extra:

    - Se dará valor extra si el Front es Responsivo,
    - Si implementa un trello en donde separe respectivamente las tareas a realizar la complejidad y los pesos tal como se implementaría un Backlog en Scrum.
    - Si implementa un botón desde el cual pueda descargar un excel para ver el listado de productos (omita la imagen).
