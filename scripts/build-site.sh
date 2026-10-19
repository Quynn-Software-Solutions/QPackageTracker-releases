#!/usr/bin/env bash
# Builds the website into _site/: the files in site/, the screenshots from
# assets/images, and release.json with direct links to the latest release.
# Used by .github/workflows/pages.yml and for local previews:
#   scripts/build-site.sh && python3 -m http.server -d _site 8000
set -euo pipefail

repo="${GITHUB_REPOSITORY:-Quynn-Software-Solutions/QPackageTracker-releases}"
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/_site"

rm -rf "$out"
mkdir -p "$out/assets"
cp -r "$root/site/." "$out/"
cp -r "$root/assets/images" "$out/assets/images"
cp "$root/release-key.asc" "$out/release-key.asc"

# Latest release, so the download buttons go straight to the right file.
# If GitHub can't be reached the page links to the Releases page instead.
auth=()
if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  auth=(-H "Authorization: Bearer $GITHUB_TOKEN")
fi
if curl -fsSL "${auth[@]}" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$repo/releases/latest" -o "$out/latest.raw.json"; then
  python3 -I - "$out/latest.raw.json" "$out/release.json" <<'EOF'
import json, re, sys

src, dst = sys.argv[1], sys.argv[2]
with open(src) as f:
    rel = json.load(f)

patterns = {
    "windows_installer": r"^QPackageTracker-[^-]+-windows-installer\.exe$",
    "windows_portable": r"^QPackageTracker-[^-]+-windows-portable\.zip$",
    "deb": r"^QPackageTracker_[^_]+_amd64\.deb$",
    "appimage": r"^QPackageTracker-[^-]+-x86_64\.AppImage$",
    "flatpak": r"^QPackageTracker-[^-]+-x86_64\.flatpak$",
    "snap": r"^QPackageTracker_[^_]+_amd64\.snap$",
    "demo_windows": r"^QPackageTracker-Demo-[^-]+-windows-portable\.zip$",
    "demo_linux": r"^QPackageTracker-Demo-[^-]+-linux-portable\.tar\.gz$",
    "checksums": r"^SHA256SUMS\.txt$",
}
files = {}
for asset in rel.get("assets", []):
    for key, pattern in patterns.items():
        if re.match(pattern, asset["name"]):
            files[key] = {
                "name": asset["name"],
                "url": asset["browser_download_url"],
                "size": asset["size"],
            }

tag = rel.get("tag_name", "")
version = re.sub(r"^v", "", re.sub(r"-release$", "", tag))
with open(dst, "w") as f:
    json.dump({
        "tag": tag,
        "version": version,
        "published": rel.get("published_at", ""),
        "page": rel.get("html_url", ""),
        "files": files,
    }, f, indent=2)
print(f"release.json: {tag} with {len(files)} files")
EOF
  rm "$out/latest.raw.json"
else
  echo "Could not fetch the latest release; the page will link to the Releases page." >&2
  rm -f "$out/latest.raw.json"
fi

touch "$out/.nojekyll"
echo "Built $out"
