PORT ?= 8000

.PHONY: site build clean

# Build the website and serve it at http://localhost:$(PORT) (Ctrl+C to stop).
# Re-run after editing files in site/ to pick up the changes.
site: build
	@echo "Serving http://localhost:$(PORT)"
	python3 -m http.server --directory _site --bind 127.0.0.1 $(PORT)

build:
	bash scripts/build-site.sh

clean:
	rm -rf _site
