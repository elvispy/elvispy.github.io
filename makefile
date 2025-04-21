# Find all Markdown files under any "en-us" directory (recursively)
EN_FILES := $(shell find . -type f -path '*/en-us/*.md')
CV_FILE  := $(shell find . -type f -path 'en-us*.*')

# For each English file, replace "/en-us/" with the target language folder.
PT_FILES := $(subst /en-us/,/pt-br/,$(EN_FILES))
ES_FILES := $(subst /en-us/,/es/,$(EN_FILES))
PT_CV    := $(subst /en-us/,/pt-br/,$(CV_FILE))
ES_CV    := $(subst /en-us/,/es/,$(CV_FILE))


.PHONY: all
all: $(PT_FILES) $(ES_FILES) copy-cv translate-cv

initialize:
	mamba activate base

# Define a rule template for translating an English file to a target language file.
# $(1) = target file, $(2) = source file
define TRANSLATE_RULE
$(1): $(2)
	@mkdir -p $(dir $(1))
	@echo "Translating $(2) -> $(1)"
	python3 translate.py $(2) $(1)
endef

# Generate rules for Portuguese translations.
$(foreach eng,$(EN_FILES),$(eval $(call TRANSLATE_RULE,$(subst /en-us/,/pt-br/,$(eng)),$(eng))))

# Generate rules for Spanish translations.
$(foreach eng,$(EN_FILES),$(eval $(call TRANSLATE_RULE,$(subst /en-us/,/es/,$(eng)),$(eng))))

# For CV copying
LANGUAGES := en-us pt-br es
CV_SRC := ../CV-Elvis/English_3_GradSchool/CV_GS_Elvis.pdf

# Dynamically generate target paths
CV_TARGETS := $(foreach lang,$(LANGUAGES),assets/pdf/$(lang)/CV_$(lang).pdf)

# Main copy-cv target depends on all per-language CV targets
copy-cv: $(CV_TARGETS)
.PHONY: copy-cv

# Rule template for each CV target
define COPY_CV_TEMPLATE
assets/pdf/$(1)/CV_$(1).pdf: $(CV_SRC)
	@echo "Copying to assets/pdf/$(1)/CV_$(1).pdf"
	@mkdir -p assets/pdf/$(1)
	cp $$< $$@
endef

# Instantiate one rule per language
$(foreach lang,$(LANGUAGES),$(eval $(call COPY_CV_TEMPLATE,$(lang))))

# Base English resume file (source)
RESUME_SRC := assets/json/resume_en-us.json

# Translated targets
RESUME_LANGS := $(filter-out en-us,$(LANGUAGES))
RESUME_TARGETS := $(foreach lang,$(RESUME_LANGS),assets/json/resume_$(lang).json)

# Main rule
translate-cv: $(RESUME_TARGETS)
.PHONY: translate-cv

# Rule template for translating resume JSON files
define TRANSLATE_RESUME_RULE
assets/json/resume_$(1).json: $(RESUME_SRC)
	@echo "Translating resume to $(1)..."
	python3 translate.py $(RESUME_SRC) assets/json/resume_$(1).json
endef

# Instantiate rule for every language except English
$(foreach lang,$(RESUME_LANGS),$(eval $(call TRANSLATE_RESUME_RULE,$(lang))))



finalize: 
	npx prettier . --write
	mamba deactivate
