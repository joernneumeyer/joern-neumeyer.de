#!/bin/sh
make FLAGS="$(gnustep-config --objc-flags) $(gnustep-config --base-libs)"
