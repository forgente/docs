export NODE_OPTIONS := "--max-old-space-size=8192"

GITEA_AWESOME_REMOTE := https://gitea.com/gitea/awesome-gitea.git
GITEA_AWESOME_BRANCH := main

.PHONY: all
all: build

.PHONY: create_dir
create_dir:
	mkdir -p .tmp

.PHONY: clone_awesome
clone_awesome: create_dir
	git clone --branch=$(GITEA_AWESOME_BRANCH) $(GITEA_AWESOME_REMOTE) .tmp/upstream-awesome || true

.PHONY: prepare-awesome-latest
prepare-awesome-latest: clone_awesome
	cp .tmp/upstream-awesome/README.md docs/awesome.md

.PHONY: prepare-awesome\#%
prepare-awesome\#%:
	cp .tmp/upstream-awesome/README.md  versioned_docs/version-1.$*/awesome.md

.PHONY: install
install:
	npm install

.PHONY: prepare-docs
prepare-docs: install prepare-awesome-latest prepare-awesome\#19 prepare-awesome\#20 prepare-awesome\#21 prepare-awesome\#22 prepare-awesome\#23 prepare-awesome\#24

.PHONY: build
build:
	npm run build

.PHONY: serve
serve: prepare-docs
	npm run start

.PHONY: serve-zh
serve-zh: prepare-docs
	npm run start -- --locale zh-cn

.PHONY: clean
clean:
	rm -rf .tmp
	rm -rf static/_*
	rm -rf static/swagger-latest.json
	rm -rf static/swagger-19.json
	rm -rf static/swagger-20.json
	rm -rf static/swagger-21.json
	rm -rf static/swagger-22.json
	rm -rf static/swagger-23.json
	rm -rf static/swagger-24.json
