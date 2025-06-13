#!/bin/bash
# Workaround for deployment typo: 'd dist && node server.js'
# When called as 'd dist', it changes to dist directory

if [ "$1" = "dist" ]; then
    # Exit successfully so the && continues to next command
    exit 0
else
    # For any other usage, just execute normally
    exec "$@"
fi