
#!/bin/bash
zip -r $1 src icons _locales README.md manifest.json
zip -d $1 icons/Icon.xcf
