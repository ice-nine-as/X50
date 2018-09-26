#!/bin/sh

if [ $(/usr/bin/docker inspect -f {{.State.Running}} hellox-client) = "true" ]; then
    exit 0
else
    # Output the State object for debugging.
    echo $(/usr/bin/docker inspect --format='{{json .State}}' hellox-client)
    exit 1
fi
