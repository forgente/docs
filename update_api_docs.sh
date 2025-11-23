#!/bin/bash

curl --silent --output v1_json.tmpl https://raw.githubusercontent.com/go-gitea/gitea/refs/heads/main/templates/swagger/v1_json.tmpl
sed -i "$@" 's|"version": "{{.SwaggerAppVer}}"|"version": "dev"|' v1_json.tmpl
sed -i "$@" 's|"basePath": "{{.SwaggerAppSubUrl}}/api/v1"|"basePath": "https://gitea.com/api/v1"|' v1_json.tmpl
mv v1_json.tmpl static/swagger-latest.json

for ver in '1.25.1' '1.24.7' '1.23.8' '1.22.6'; do
  curl --silent --output v1_json.tmpl https://raw.githubusercontent.com/go-gitea/gitea/refs/tags/v${ver}/templates/swagger/v1_json.tmpl
  sed -i "$@" "s|\"version\": \"{{.SwaggerAppVer}}\"|\"version\": \"${ver}\"|" v1_json.tmpl
  sed -i "$@" 's|"basePath": "{{.SwaggerAppSubUrl}}/api/v1"|"basePath": "https://gitea.com/api/v1"|' v1_json.tmpl
  # for versions < 1.24
  sed -i "$@" "s|\"version\": \"{{AppVer \| JSEscape}}\"|\"version\": \"${ver}\"|" v1_json.tmpl
  sed -i "$@" 's\"basePath": "{{AppSubUrl | JSEscape}}/api/v1"\"basePath": "https://gitea.com/api/v1"\' v1_json.tmpl
  minor=$(echo "$ver" | cut -d '.' -f 2)
  mv v1_json.tmpl static/swagger-$minor.json
done
