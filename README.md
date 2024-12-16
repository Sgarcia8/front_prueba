# Frontend - Administrador API

Este proyecto es el frontend de una aplicación de Administración API. Su función principal es gestionar usuarios con funcionalidades de creación, edición, eliminación y búsqueda, así como una integración con roles y autorizaciones.

## Requisitos

Para ejecutar este proyecto necesitas tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)
- [Angular CLI](https://angular.io/cli) (v15 o superior recomendado)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Sgarcia8/front_prueba.git
```

2. Accede al directorio del proyecto:

```bash
cd administrador-api
```

3. Instala las dependencias:

```bash
npm install
```

## Configuración

### Configuración de activos estáticos
Asegúrate de que las imágenes y otros recursos estáticos se encuentren en el directorio correcto. El directorio configurado para los activos estáticos es `src/assets`. Por ejemplo, para los íconos, usa la ruta:

```bash
src/assets/icons
```

Verifica que las imágenes estén correctamente ubicadas para que sean accesibles desde el código.

### Variables y rutas

- Configura la URL base del backend en `BASE_URL` dentro de los servicios de Angular. Por defecto:

```typescript
const BASE_URL = 'http://localhost:8080/';
```

Modifica esta variable si el backend está desplegado en otro servidor.

## Ejecución del proyecto

Para ejecutar el proyecto en modo desarrollo:

```bash
ng serve
```

El servidor se iniciará en [http://localhost:4200/](http://localhost:4200/).

## Funcionalidades principales

### 1. **Registro y autenticación**

- **Registro**: Endpoint `auth/register` para registrar nuevos usuarios.
- **Inicio de sesión**: Endpoint `auth/login` para autenticar usuarios.

### 2. **Dashboard**

- Mostrar una lista de usuarios obtenidos desde el endpoint `api/users/`.
- Soporte para buscar usuarios por nombre al presionar `Enter` en la barra de búsqueda.

### 3. **Gestor de usuarios**

- Crear, editar, visualizar y eliminar usuarios desde la interfaz.
- Filtrar usuarios según su rol o estado.
- Usar un token JWT almacenado en el `localStorage` para autorización en endpoints protegidos.


### Servicios del frontend

- `loadUsers`: Cargar la lista de usuarios.
- `editUser`: Editar información de un usuario.
- `deleteUser`: Eliminar un usuario según su correo electrónico.

## Dependencias principales

- **Angular**: Framework principal para construir el frontend.
- **RxJS**: Manejo de observables y peticiones HTTP.
- **Angular Material**: Para iconos y componentes visuales.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un *issue* o envía un *pull request* con tus sugerencias o mejoras.

## Licencia

Este proyecto está bajo la Licencia MIT.

