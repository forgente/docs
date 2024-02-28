#!/bin/bash

# The script takes two params:
#     version: "latest" or a specific version number
#     locale

set -xe

SED_INPLACE() {
  if sed --version 2>/dev/null | grep -q GNU; then
    sed -i "$@"
  else
    sed -i '' "$@"
  fi
}

version="$1"
if [ "$version" != "latest" ]; then
    version="1.$1"
fi
locale="$2"
minNodeVer="16"
minGoVer="1.20"
goVer="1.20"
minorVer="main-nightly"
if [ "$version" == "1.19" ]; then
    minorVer="1.19.4"
    minGoVer="1.19"
elif [ "$version" == "1.20" ]; then
    minorVer="1.20.6"
elif [ "$version" == "1.21" ]; then
    minorVer="1.21.7"
fi

docs_dir="versioned_docs/version-$version"
if [ "$version" == "latest" ]; then
    if [ "$locale" == "en-us" ]; then
        docs_dir="docs"
    else
        docs_dir="i18n/$locale/docusaurus-plugin-content-docs/current"
    fi
else
    if [ "$locale" != "en-us" ]; then
        docs_dir="i18n/$locale/docusaurus-plugin-content-docs/version-$version"
    fi
fi

SED_INPLACE "s/@minNodeVersion@/$minNodeVer/" "$docs_dir/development/hacking-on-gitea.$locale.md"
SED_INPLACE "s/@minGoVersion@/$minGoVer/" "$docs_dir/development/hacking-on-gitea.$locale.md"
SED_INPLACE "s/@goVersion@/$goVer/" "$docs_dir/development/hacking-on-gitea.$locale.md"
SED_INPLACE "s/@minNodeVersion@/$minNodeVer/" "$docs_dir/installation/from-source.$locale.md"
SED_INPLACE "s/@minGoVersion@/$minGoVer/" "$docs_dir/installation/from-source.$locale.md"

# TODO: improve this sed
# need confirmation
if [ "$version" == "latest" ]; then
    SED_INPLACE 's/"version": "{{AppVer | JSEscape | Safe}}"/"version": "1.22-dev"/' static/swagger-latest.json
elif [ "$version" == "1.21" ]; then
    SED_INPLACE 's/"version": "{{AppVer | JSEscape | Safe}}"/"version": "1.21.7"/' static/swagger-21.json
elif [ "$version" == "1.20" ]; then
    SED_INPLACE 's/"version": "{{AppVer | JSEscape | Safe}}"/"version": "1.20.6"/' static/swagger-20.json
elif [ "$version" == "1.19" ]; then
    SED_INPLACE 's/"version": "{{AppVer | JSEscape | Safe}}"/"version": "1.19.4"/' static/swagger-19.json
fi
SED_INPLACE 's/"basePath": "{{AppSubUrl | JSEscape | Safe}}/"basePath": "https:\/\/gitea.com/' static/swagger-"$1".json

for file in `find ./"$docs_dir" -name "*.md"`; do
    if [ "$version" == "lastest" ]; then
      SED_INPLACE 's/dl.gitea.com\/gitea\/@version@/dl.gitea.com\/gitea\/main/g' $file
      SED_INPLACE 's/gitea\/gitea\:@version@/gitea\/gitea\:nightly/g' $file
    fi
    SED_INPLACE "s/@version@/$minorVer/g" $file
done

for file in "$docs_dir"/*; do
    if [ -d $file ]; then
        continue
    fi
    if [ "$file" == "$docs_dir/intro.md" ]; then
        continue
    fi
    rm $file || true
done

# file names under docs/ and i18n/zh-cn/docusaurus-plugin-content-docs/current/ should be the same for docusaurus
# to recognize them as tanslated.
for file in `find "$docs_dir" -name "*.$locale.md"`; do
    mv "${file}" "${file/.$locale/}"
done

if [ -f "$docs_dir/help/search.md" ]; then
    rm "$docs_dir/help/search.md"
fi
