#!/usr/bin/env bash

DAY=$1
PART=$2

./node_modules/.bin/ts-node -r tsconfig-paths/register --files "src/day-$DAY/part-$PART.ts"
