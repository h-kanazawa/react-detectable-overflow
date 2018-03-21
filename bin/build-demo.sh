#!/bin/sh

: "Push current working directory" && {
  work_dir="$(cd "$(dirname "$0")" && pwd)"
}

: "Push repository's top directory" && {
  repo_top="$(cd "${work_dir}"/.. && pwd)"
}

: "Yarn build and move products to docs directory" && {
  cd "${repo_top}" || exit 1
  yarn link

  cd ./demo || exit 1
  yarn
  yarn link react-detectable-overflow
  yarn build

  cd "${repo_top}" || exit 1
  rm -r ./docs/*
  cp -r ./demo/build/ ./docs/
}
