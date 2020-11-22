# Data Warehouse

_Proyecto 4 Data Warehouse de Acamica_

## Comenzando

_Estas instrucciones te serviran para poder instalar correctamente lo mínimo necesario para el funcionamiento del proyecto._

### Pre-requisitos 📋

_Es necesario tener instalados los siguientes programas_

* [NodeJS](https://nodejs.org/en/) - Maquina virtual de JS para ejecutar el proyecto.
* [MongoDB Compass](https://www.mongodb.com/try/download/compass) - Manejador para la base de datos.
* [MongoDB Tools](https://www.mongodb.com/try/download/database-tools) - Herramientas de mongo para instalar el backup de la DB.

### Instalación 🔧

_Una vez instalados los programas necesario debe clonarse el repositorio en una carpeta local_

### MongoDB

> Instalar **MongoDB** y **MongoDB Tools** 
> AL terminar la instalacion de **MongoDB Compass** es necesario asegurarse de agregarlo a las variables de entorno la ruta sera similar a:
> C:\Program Files\MongoDB\Server\4.4\bin
> C:\Program Files\MongoDB\Tools\100\bin

### Backend con NodeJS

Antes de inicar el backend necesitamos instalar la base de datos para ello entramos a la carpeta local de nuestro repositorio
en la que estaran las carpetas **frontend**, **backend** y **dump** abrimos una terminar de powershell para ejecutar el comando:

```
mongorestore  dump/
```

Una vez instalada la base procedemos con las instalacion de las dependecias en la carpeta backend con el comando:

```
npm install
```

Con esto se instalaran las dependencias necesarias que se especificaron en el package.json.

_Una vez finalizada la instalacion de las dependencias ejecutamos el siguiente comando para iniciar el servidor._

```
npm run start
```

### Ejecutando el Fronend 

_El Frontend podemos ejecutarlo con el plugin de visual studio code llamado Live Server._

Para ejecutarlo es necesario abrir la carpeta de Frontend en visual estudio code, abrimos el archivo index.html y damos 
click derecho y seleccionamos la opción **Open with Live Server**.

Otra forma es instalar un servidor en el equipo como: 
* [http-server](https://www.npmjs.com/package/http-server) - http-server is a simple, zero-configuration command-line http server.

Para su instalación ejecutamos en una terminal:

```
npm install --global http-server
```

Una vez instalado abrimos una terminal en la carpeta frontend y ejecutamos:


```
 http-server
```


## Autor ✒️

* **Omar Emmanuel Aceves Amador** - *Desarrollador* - [omaraceves1007](https://github.com/omaraceves1007)
