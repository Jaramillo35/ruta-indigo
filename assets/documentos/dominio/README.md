# Dominio

**migryantravels.com** — el bueno, el que coincide con la marca. Registrado en
GoDaddy. El sitio se sirve desde ahí.

**mygriantravels.com** — comprado por error (la `i` y la `y` cambiadas). Se
conserva el registro por si conviene apuntarlo al dominio bueno, para que quien
lo escriba mal no termine en la nada.

## Qué hay aquí

| Archivo | Qué es |
| --- | --- |
| `godaddy-dns-migryantravels-2026-08-25.pdf` | Los registros DNS del dominio bueno, tal como quedaron el 25/08/2026 |
| `godaddy-dns-mygriantravels-typo-2026-08-25.pdf` | Los del dominio con el nombre mal escrito, como referencia |

## Cómo está configurado

El sitio vive en GitHub Pages, así que el dominio apunta ahí:

- Cuatro registros `A` en `@` → `185.199.108.153`, `.109`, `.110`, `.111`
- Cuatro registros `AAAA` en `@` → `2606:50c0:8000::153` a `8003::153`
- Un `CNAME` en `www` → `jaramillo35.github.io.`

El correo es aparte y no se toca: los `MX`, el `SPF`, el `DMARC` y los
`_domainkey` son de GoDaddy Email. Borrarlos tumba el correo del negocio.

El archivo `public/CNAME` del repositorio es lo que le dice a GitHub Pages cuál
es el dominio; se publica con cada despliegue.
