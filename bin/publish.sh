#!/bin/sh

# node v12.14.0~ and npm v6.13.4~ are required.

: "Push current working directory" && {
  work_dir="$(cd "$(dirname "$0")" && pwd)"
}

: "Push repository's top directory" && {
  repo_top="$(cd "${work_dir}"/.. && pwd)"
}

: "Check whether the version has been published" && {
  cd "${repo_top}" || exit 1
  current_version=$(node -pe 'require("./package.json").version')
  is_published=$(npm info react-detectable-overflow@"${current_version}" version | wc -l)
}

: "Publish if the version hasn't been published" && {
  if [ "${is_published}" -eq 1 ]; then
    echo "The version ${current_version} has already been published."
  else
    npm publish
    echo "publish!"
  fi
}
