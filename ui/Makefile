.PHONY: help

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: ## gridsome develop
	gridsome develop

build: ## gridsome build
	gridsome build

load-build: ## serve a statically build Gridsome site
	gridsome build
	cd __build && python3 -m http.server
