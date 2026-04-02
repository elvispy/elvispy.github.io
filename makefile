# Translation targets
LANGS := pt-br es

# Source CV (outside the repo)
CV_SRC   := ../CV-Elvis/English_3_GradSchool/CV_GS_Elvis.pdf
CV_LANGS := en-us pt-br es

# ---------------------------------------------------------------------------
.PHONY: all translate translate-cv copy-cv finalize

all: translate translate-cv copy-cv

# Translate all markdown files — one gemini-cli call per language
translate:
	@for lang in $(LANGS); do \
		echo "==> Translating markdown → $$lang"; \
		python3 translate.py $$lang; \
	done

# Translate resume JSON — one gemini-cli call per language
translate-cv: $(foreach lang,$(filter-out en-us,$(CV_LANGS)),assets/json/resume_$(lang).json)

assets/json/resume_pt-br.json: assets/json/resume_en-us.json
	@echo "==> Translating resume → pt-br"
	python3 translate.py pt-br --json

assets/json/resume_es.json: assets/json/resume_en-us.json
	@echo "==> Translating resume → es"
	python3 translate.py es --json

# Copy CV PDF to all language folders
copy-cv: $(foreach lang,$(CV_LANGS),assets/pdf/$(lang)/CV_$(lang).pdf)

define COPY_CV_TEMPLATE
assets/pdf/$(1)/CV_$(1).pdf: $(CV_SRC)
	@echo "Copying CV → assets/pdf/$(1)/CV_$(1).pdf"
	@mkdir -p assets/pdf/$(1)
	cp $$< $$@
endef
$(foreach lang,$(CV_LANGS),$(eval $(call COPY_CV_TEMPLATE,$(lang))))

finalize:
	npx prettier . --write
