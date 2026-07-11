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
	@# tolerate upstream gitea.com being down: keep a stub instead of failing the build
	cp .tmp/upstream-awesome/README.md docs/awesome.md 2>/dev/null || printf '# Awesome Gitea\n\nTemporarily unavailable (upstream source unreachable during build).\n' > docs/awesome.md

.PHONY: prepare-awesome\#%
prepare-awesome\#%:
	cp .tmp/upstream-awesome/README.md  versioned_docs/version-1.$*/awesome.md 2>/dev/null || printf '# Awesome Gitea\n\nTemporarily unavailable (upstream source unreachable during build).\n' > versioned_docs/version-1.$*/awesome.md

.PHONY: install
install:
	pnpm install

.PHONY: prepare-docs
prepare-docs: install prepare-awesome-latest prepare-awesome\#19 prepare-awesome\#20 prepare-awesome\#21 prepare-awesome\#22 prepare-awesome\#23 prepare-awesome\#24

.PHONY: build
build:
	pnpm run build

.PHONY: serve
serve: prepare-docs
	pnpm run start

.PHONY: serve-zh
serve-zh: prepare-docs
	pnpm run start -- --locale zh-cn

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

.PHONY: update-api-docs
update-api-docs:
	./update_api_docs.sh
