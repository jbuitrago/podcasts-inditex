# Prueba front-end Inditex

Creación de una mini-aplicación para escuchar podcasts musicales.

## CORS

Servicios para poder acceder a recursos externos que no proveen JSONP ni
cabeceras CORS

Se debe solicitar antes de iniciar el proyecto.

https://cors-anywhere.herokuapp.com/

## Scripts

En el directorio del proyecto, puede ejecutar:

### `npm start`

Ejecuta la aplicación en el modo de desarrollo.
Abrir [http://localhost:3000](http://localhost:3000) para ver en el Browser

### `npm run build`

Se genera el build

### `npm run prod`

Ejecuta la aplicación en el modo de producción.
Abrir [http://localhost:5000](http://localhost:5000) para ver en el Browser

### `npm run format`

Se utiliza Prettier para dar formato a todo el proyecto.

### `npm run lint`

Se utiliza Eslint para analizar el codigo del proyecto.

### Estructura del Proyecto

```sh
└───src                         # Source code.
    ├───app                     # Redux store
    ├───backend                 # Api itunes
    ├───components
    │   └───Podcasts            # Components
    ├───containers
    │   ├───App                 # Router
    │   ├───Error               # Error 404
    │   ├───Footer              # Page Footer
    │   ├───Header              # Page Header
    │   └───Podcasts            # Podcasts container
    ├───css                     # Css
    ├───features
    │   └───podcast             # Redux Reducer
    └───utils

```

### Formateo y detección de errores

ESLint es un linter de código JavaScript. Su función es analizar el código de nuestra aplicación, detectar problemas en por medio de patrones y si esta a su alcance resolverlos él mismo. Por otro lado, Prettier es un formateador de código. Tambien analiza nuestro código JavaScript.

### Rutas (routes)

Las routes estan configuradas en el componente principal App y se utiliza react-router-dom

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

### Functional components con Hooks

Los Hooks son funciones que te permiten “enganchar” el estado de React y el ciclo de vida desde componentes de función. Los hooks no funcionan dentro de las clases — te permiten usar React sin clases.

https://es.reactjs.org/docs/hooks-overview.html#:~:text=%C2%BFPero%20qu%C3%A9%20es%20un%20Hook,permiten%20usar%20React%20sin%20clases.

### Manejo de estados para filtro y loading (Redux Toolkit)

El paquete Redux Toolkit está destinado a ser la forma estándar de escribir la lógica de Redux.

https://redux-toolkit.js.org/introduction/getting-started

### Diseño

Este proyecto esta diseñado 100% con Semantic UI React.

https://react.semantic-ui.com/

Para este proyecto no se estan utilizando css , es un diseño sencillo y el proyecto esta enfocado en la funcionalidad.

### Cache

Utilice el LocalStorage la cual es una parte de Web Storage API que permite la persistencia de datos.

https://es.survivejs.com/react/implementing-kanban/implementing-persistency/

### Persistencia

Se crea el middleware cache para crear variables en localStorage con duracion de 1 hora (3600000 milisegundos), esto se hace directamente en la saga, se utiliza para guardar en session el listado de productos.

```javascript
import {
	setLocalStorageWithExpiry,
	getLocalStorageWithExpiry,
} from '../utils/cache';
```
