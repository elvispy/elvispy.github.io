# Find all Markdown files under any "en-us" directory (recursively)
EN_FILES := $(shell find . -type f -path '*/en-us/*.md')
CV_FILE  := $(shell find . -type f -path 'en-us*.*')

# For each English file, replace "/en-us/" with the target language folder.
PT_FILES := $(subst /en-us/,/pt-br/,$(EN_FILES))
ES_FILES := $(subst /en-us/,/es/,$(EN_FILES))
PT_CV    := $(subst /en-us/,/pt-br/,$(CV_FILE))
ES_CV    := $(subst /en-us/,/es/,$(CV_FILE))
.PHONY: all
all: $(PT_FILES) $(ES_FILES) 

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

npx prettier . --write