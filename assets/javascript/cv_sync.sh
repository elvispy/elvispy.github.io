#!/bin/bash
# Path to your generated PDF
SOURCE="$HOME/Documents/Github/CV-Elvis/English_2/CV_Elvis.pdf"
# Path to your website folder where you want to sync the PDF
DESTINATION="$HOME/Documents/Github/elvispy.github.io/assets/pdf/CV_Elvis.pdf"
# Copy the file
cp "$SOURCE" "$DESTINATION"
echo "CV PDF copied to website folder."
