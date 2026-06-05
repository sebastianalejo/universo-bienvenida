import base64
import re

# Archivo que contiene el texto de Formspree
archivo_entrada = "New submission from universo (2).txt"

# Imagen de salida
archivo_salida = "foto.jpg"

with open(archivo_entrada, "r", encoding="utf-8") as f:
    contenido = f.read()

# Corregir Quoted-Printable
contenido = contenido.replace("=3D", "=")

# Eliminar saltos de línea y espacios
contenido = re.sub(r"\s+", "", contenido)

# Extraer solo el Base64
prefijo = "data:image/jpeg;base64,"
if contenido.startswith(prefijo):
    contenido = contenido[len(prefijo):]

# Decodificar
imagen = base64.b64decode(contenido)

with open(archivo_salida, "wb") as f:
    f.write(imagen)

print(f"Imagen guardada en {archivo_salida}")