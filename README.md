# Masaya Mia Menu

Menu digital liviano para Vercel. La web no carga Google Drive en runtime:
usa imagenes locales optimizadas generadas desde el PDF del menu.

## Desarrollo local

```bash
npm install
npm run dev
```

## Actualizar el menu automaticamente

El repositorio incluye un GitHub Action que revisa el PDF publico cada 5 minutos.
Si el negocio actualiza el PDF en el mismo enlace de Google Drive, el workflow:

1. Descarga el PDF.
2. Regenera las imagenes en `public/menu/`.
3. Actualiza `src/menuPages.js`.
4. Hace commit automatico si hay cambios.
5. Vercel despliega el nuevo menu por el push a `main`.

Tambien se puede ejecutar manualmente desde GitHub en:

`Actions > Update menu images > Run workflow`

## Actualizar el menu localmente

Cuando el negocio actualice el PDF en Google Drive, regenerar las imagenes:

```bash
npm run update-menu
npm run build
git add .
git commit -m "Update menu images"
git push
```

El script descarga el PDF publico actual, convierte todas las paginas a
imagenes en `public/menu/` y actualiza `src/menuPages.js` con la cantidad real
de paginas. Si el PDF pasa de 20 a 21 paginas, la app se ajusta sola al correr
el comando.

Si `npm run update-menu` indica que falta `pdftoppm`, instalar Poppler:

```bash
brew install poppler
```

## Produccion

Vercel solo necesita el comando normal:

```bash
npm run build
```
