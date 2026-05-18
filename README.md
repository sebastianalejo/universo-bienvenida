# ✨ Universo de Bienvenida

> Una cápsula digital de amor para una hija antes de nacer.

Una experiencia web cinematográfica y emocionalmente impactante donde familiares y amigos pueden dejar mensajes, fotos y palabras de cariño que formarán un mural interactivo de bienvenida.

---

## 🌌 Vista previa

Fondo de galaxia animado · Contador regresivo · Formulario glassmorphism · Mural tipo masonry · Efecto parallax con el mouse · Partículas interactivas

---

## 🛠 Stack tecnológico

| Tecnología | Uso |
|-----------|-----|
| Next.js 14 (App Router) | Framework principal |
| TypeScript | Tipado fuerte |
| TailwindCSS | Estilos utility-first |
| Framer Motion | Animaciones suaves |
| Canvas API | Fondo de estrellas interactivo |
| localStorage | Persistencia sin backend |

---

## 🚀 Inicio rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/universo-bienvenida.git
cd universo-bienvenida

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ⚙️ Personalización

### 1. Cambia la fecha de nacimiento esperada

En `src/components/sections/HeroSection.tsx`, línea 7:

```typescript
const DUE_DATE = '2026-09-15T00:00:00' // ← Cambia esta fecha
```

### 2. Cambia el nombre en los metadatos

En `src/app/layout.tsx`:

```typescript
title: 'Universo de Bienvenida — Para ti, antes de llegar',
description: 'Un mural de amor construido para ti...',
```

### 3. Ajusta los mensajes semilla

En `src/lib/storage.ts`, función `getSeedMessages()`.

---

## 📦 Deploy en GitHub Pages

### Opción A: GitHub Actions (recomendado, automático)

1. Sube tu código a GitHub
2. Ve a **Settings → Pages → Source**: selecciona **GitHub Actions**
3. Edita `next.config.js` y descomenta `basePath`:

```js
basePath: '/nombre-de-tu-repo',
```

4. Haz push a `main` y el workflow se ejecuta automáticamente

### Opción B: Deploy manual

```bash
npm run build
# Los archivos estáticos estarán en la carpeta ./out/
# Sube ./out/ a tu servicio de hosting preferido
```

---

## 📁 Estructura del proyecto

```
universo-bienvenida/
├── src/
│   ├── app/
│   │   ├── globals.css       # Estilos globales, variables CSS
│   │   ├── layout.tsx        # Layout raíz con metadatos
│   │   └── page.tsx          # Página principal
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx    # Pantalla completa con contador
│   │   │   ├── MessageForm.tsx    # Formulario glassmorphism
│   │   │   ├── MuralSection.tsx   # Mural masonry interactivo
│   │   │   └── Footer.tsx         # Pie de página emocional
│   │   └── ui/
│   │       ├── Starfield.tsx      # Canvas de estrellas animadas
│   │       └── MessageCard.tsx    # Tarjeta de mensaje con hover 3D
│   ├── hooks/
│   │   └── useMessages.ts    # useMessages + useCountdown
│   ├── lib/
│   │   └── storage.ts        # Utilidades localStorage
│   └── types/
│       └── index.ts          # Tipos TypeScript
├── .github/workflows/
│   └── deploy.yml            # CI/CD para GitHub Pages
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 Paleta de colores

| Color | Valor | Uso |
|-------|-------|-----|
| Negro profundo | `#090b1a` | Fondo principal |
| Azul oscuro | `#0f1630` | Superficies |
| Dorado suave | `#c9a96e` | Acentos, bordes activos |
| Violeta tenue | `#8b7bb5` | Nebulosas, detalles |
| Blanco cálido | `rgba(255,255,255,0.85)` | Texto principal |

---

## 🔮 Arquitectura de datos

Actualmente usa `localStorage` para persistir mensajes. Cada mensaje tiene la forma:

```typescript
interface Message {
  id: string
  name: string
  relation: string
  message: string
  city: string
  country: string
  emoji: string
  photo?: string       // base64
  timestamp: number
  date: string
  time: string
}
```

Para migrar a backend real, solo cambia las funciones en `src/lib/storage.ts`.

---

## 💛 Hecho con amor

*"Hija, incluso antes de conocerte, ya estabas cambiando nuestro mundo."*
