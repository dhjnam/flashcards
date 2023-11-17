find . \( \
        -not -path './node_modules/*' -a \
        -not -path './codegen/*' -a \
        -not -path './sketches/*' \
    \) -a \( \
        -regex '.*\.js$' -o \
        -regex '.*\.yaml$' -o \
        -regex '.*\.cjs$' -o \
        -regex '.*\.json$' \
    \)