#!/bin/bash

# Build API
docker build -t books-to-read-api api/.

# Build UI
docker build -t books-to-read-ui ui/.

# Start API
export LOCAL_PATH=$(pwd)
docker run -d -v $LOCAL_PATH/api/src:/src -p 8000:8000 --restart always books-to-read-api

# Start UI
docker run -d -p 3000:3000 --restart always books-to-read-ui
