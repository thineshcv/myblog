# Makefile — convenience tasks for local development and CI

.DEFAULT_GOAL := help

.PHONY: help setup hooks dev build serve clean

help:
	@echo "Makefile commands:"
	@echo "  make setup           Install deps and setup git hooks (husky)"
	@echo "  make hooks           Install husky hooks (npm run prepare)"
	@echo "  make dev             Run dev server (npm run dev)"
	@echo "  make build [BASE_PATH=<path>] [SITE_URL=<url>]  Build static site (NEXT_PUBLIC_BASE_PATH optional)"
	@echo "  make serve [PORT=5000] Serve the out folder locally using npx serve"
	@echo "  make clean           Remove node_modules, .next, and out"

setup:
	@echo "Installing dependencies..."
	npm install

	@echo "Installing husky hooks..."
	npm run prepare || true

hooks:
	@echo "(Re)installing husky hooks"
	npm run prepare

dev:
	@echo "Starting dev server..."
	npm run dev

build:
	@echo "Building static site..."
	@if [ -n "${BASE_PATH}" ]; then \
	  echo "Using NEXT_PUBLIC_BASE_PATH=${BASE_PATH}"; \
	  export NEXT_PUBLIC_BASE_PATH="${BASE_PATH}"; \
	  export NEXT_PUBLIC_SITE_URL="${SITE_URL:-}"; \
	fi; \
	npm run export

serve:
	@PORT=${PORT:-5000}; \
	if [ -d out ]; then \
	  npx serve out -p $$PORT; \
	else \
	  echo "No output directory found. Run `make build` first."; exit 1; \
	fi

clean:
	@echo "Removing node_modules, .next and out..."
	rm -rf node_modules .next out
