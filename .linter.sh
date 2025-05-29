#!/bin/bash
cd /home/kavia/workspace/code-generation/cineregion-hub-25486-ab3dcc12/cineregion_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

