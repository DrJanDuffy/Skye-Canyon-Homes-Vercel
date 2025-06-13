#!/bin/bash
# Workaround script for deployment typo 'd dist' instead of 'cd dist'
# This script changes to the dist directory when called with 'dist' as first argument

if [ "$1" = "dist" ]; then
    cd dist
    shift  # Remove 'dist' from arguments
    if [ $# -eq 0 ]; then
        # If no more arguments, just stay in dist directory
        exec bash
    else
        # Execute remaining arguments in dist directory
        exec "$@"
    fi
else
    # If not 'dist', execute as normal command
    exec "$@"
fi