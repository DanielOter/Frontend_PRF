# CUSTODIAN - Frontend

## Informacion General
Grupo 2

### Integrantes
- Catalina Buljevich
- Daniel Otero
- Kenaan Chab
- Gabriel Ligresti Cruz

### Pantallas

# Generales
- Login
- Home (Barra de navegacion)
- Cambio de Contraseña
# Administrador
- Creacion de usuarios.
- Lista de Notificaciones.
# Usuario
- Agregar Invitado
- Crear registro de visita
- Lista de Notificaciones.
- Generacion de QR
# Seguridad
- Mapa de la zona
- Crear registro de visita
- Lectura de QR

### Implementacion

1. Hacer fork del proyecto (opcional).
2. En terminal sobre una carpeta local "git clone + link del repo" para clonar el repositorio.
3. En terminal "cd /Frontend_PRF" para ingresar a la carpeta del proyecto.
4. En terminal "npm install" para instalar dependencias.
5. En el archivo "request.js" que esta en la carpeta "helper" modificar la URL local.
8. En terminal "expo start" para iniciar la aplicación.

## Folder Tree
```
📦 Frontend_PRF
├─ .expo-shared
│  └─ assets.json
├─ .gitignore
├─ App.js
├─ Navigation.js
├─ README.md
├─ app.json
├─ assets
│  ├─ adaptive-icon.png
│  ├─ centeredLogo.png
│  ├─ favicon.png
│  ├─ focusedLogo.png
│  ├─ icon.png
│  ├─ onlyLogo.png
│  ├─ splash.png
│  └─ titledLogo.png
├─ babel.config.js
├─ components
│  ├─ CustomButton.js
│  ├─ CustomCalendar.js
│  ├─ CustomDropdown.js
│  ├─ Header.js
│  ├─ MenuButtons.js
│  ├─ NotificationList.js
│  ├─ QrCode.js
│  ├─ QrCodeGenerator.js
│  ├─ form
│  │  ├─ CustomInput.js
│  │  ├─ Form.js
│  │  ├─ GuestForm.js
│  │  └─ UserForm.js
│  └─ user
│     ├─ ChangePass.js
│     └─ MapScreen.js
├─ config
│  └─ firebaseConfig.js
├─ constants
│  ├─ errors.js
│  ├─ fireBaseErrors.js
│  ├─ keys.js
│  ├─ menuOptions.js
│  └─ regex.js
├─ context
│  └─ context.js
├─ helpers
│  ├─ request.js
│  └─ store.js
├─ libs
│  └─ auth.js
├─ metro.config.js
├─ package-lock.json
├─ package.json
├─ screens
│  ├─ AddGuestReg.js
│  ├─ AddNotification.js
│  ├─ CreateGuest.js
│  ├─ Home.js
│  ├─ Login.js
│  ├─ MapScreen.js
│  ├─ QrScanner.js
│  └─ RegisterUser.js
└─ services
   ├─ NotificationService.js
   ├─ UserService.js
   ├─ alertService.js
   └─ guestService.js
```