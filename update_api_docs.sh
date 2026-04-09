#!/bin/bash

SED_INPLACE=(-i)
EXTRA_SED_ARGS=()

if [ "$#" -gt 0 ]; then
  SED_INPLACE=(-i "$1")
  shift
else
  if sed --version >/dev/null 2>&1; then
    SED_INPLACE=(-i)
  else
    SED_INPLACE=(-i '')
  fi
fi

EXTRA_SED_ARGS=("$@")

inplace_sed() {
  sed "${SED_INPLACE[@]}" "${EXTRA_SED_ARGS[@]}" "$@"
}

curl --silent --output v1_json.tmpl https://raw.githubusercontent.com/go-gitea/gitea/refs/heads/main/templates/swagger/v1_json.tmpl
inplace_sed 's|"version": "{{.SwaggerAppVer}}"|"version": "dev"|' v1_json.tmpl
inplace_sed 's|"basePath": "{{.SwaggerAppSubUrl}}/api/v1"|"basePath": "https://gitea.com/api/v1"|' v1_json.tmpl
mv v1_json.tmpl static/swagger-latest.json

for ver in '1.26.0-rc0' '1.25.5' '1.24.7' '1.23.8' '1.22.6'; do
  curl --silent --output v1_json.tmpl https://raw.githubusercontent.com/go-gitea/gitea/refs/tags/v${ver}/templates/swagger/v1_json.tmpl
  inplace_sed "s|\"version\": \"{{.SwaggerAppVer}}\"|\"version\": \"${ver}\"|" v1_json.tmpl
  inplace_sed 's|"basePath": "{{.SwaggerAppSubUrl}}/api/v1"|"basePath": "https://gitea.com/api/v1"|' v1_json.tmpl
  # for versions < 1.24
  inplace_sed "s|\"version\": \"{{AppVer \| JSEscape}}\"|\"version\": \"${ver}\"|" v1_json.tmpl
  inplace_sed "s#\"basePath\": \"{{AppSubUrl | JSEscape}}/api/v1\"#\"basePath\": \"https://gitea.com/api/v1\"#" v1_json.tmpl
  minor=$(echo "$ver" | cut -d '.' -f 2)
  mv v1_json.tmpl static/swagger-$minor.json
done
