#!/usr/bin/env bash
#
# Crea el repositorio en GitHub, sube la rama main y enciende GitHub Pages
# con despliegue por Actions. Requiere haber corrido antes: gh auth login
#
#   ./scripts/publish-github.sh [nombre-del-repo]
#
set -euo pipefail

REPO="${1:-ruta-indigo}"

if ! gh auth status >/dev/null 2>&1; then
  echo "Falta autenticarse. Corre primero:  gh auth login" >&2
  exit 1
fi

OWNER="$(gh api user --jq .login)"

if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "El repositorio $OWNER/$REPO ya existe; solo subo los cambios."
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin main
else
  gh repo create "$REPO" --public --source=. --remote=origin --push \
    --description "Sitio MVP: viajes privados por India con atencion real en espanol"
fi

# Pages servido por el workflow de Actions (.github/workflows/deploy.yml)
gh api --method POST "repos/$OWNER/$REPO/pages" -f "build_type=workflow" >/dev/null 2>&1 \
  || gh api --method PUT "repos/$OWNER/$REPO/pages" -f "build_type=workflow" >/dev/null

echo
echo "Repositorio: https://github.com/$OWNER/$REPO"
echo "Sitio:       https://$OWNER.github.io/$REPO/"
echo
echo "El primer despliegue tarda un par de minutos. Seguimiento:"
echo "  gh run watch --repo $OWNER/$REPO"
