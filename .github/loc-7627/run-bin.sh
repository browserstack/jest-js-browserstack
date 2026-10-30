#!/usr/bin/env bash
# Runs the BrowserStackLocal binary under test with the given args.
# Native:     exec "$BIN" "$@"
# Container:  when $CONTAINER_IMAGE is set, runs it inside that image with host
#             networking (so the tunnel's "localhost" is the runner, where the
#             test page is served). $CONTAINER_NAME names the container so it
#             can be force-removed afterwards.
set -euo pipefail
: "${BIN:?BIN not set}"

if [[ -n "${CONTAINER_IMAGE:-}" ]]; then
  dir=$(cd "$(dirname "$BIN")" && pwd)
  name=()
  [[ -n "${CONTAINER_NAME:-}" ]] && name=(--name "$CONTAINER_NAME")
  exec docker run --rm "${name[@]}" --network host -v "$dir:/under-test" -w /under-test \
    "$CONTAINER_IMAGE" "/under-test/$(basename "$BIN")" "$@"
fi
exec "$BIN" "$@"
