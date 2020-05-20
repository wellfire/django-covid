#!/bin/bash

set -o errexit # Exit on error

function npm-do { (PATH=$(npm bin):$PATH; eval $@;) }

echo "Clearing build assets"
rm -rf ./src/index.html
echo "completed."
echo ""
echo ""

echo "Clearing and switching index files"
cp ./environments/$env.index.html ./src/index.html
echo "completed."
echo ""
echo ""


if [ $env = "development" ]
    then
        echo "Running gridsome dev"
        echo ""
        yarn run develop
fi

if [ $env = "production" ]
    then
        echo "Building front-end"
        echo ""
        yarn run build
        echo "build complete"
fi
