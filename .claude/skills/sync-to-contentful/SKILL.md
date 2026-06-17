---
name: sync-to-contentful
description: Sync photos from /photos to Contentful. Handles both loose root-level photos and album subfolders. Optimizes, uploads assets (title = slug), creates portfolio_photo and portfolio_album entries as drafts.
metadata:
  author: viky
  version: "1.1"
---

Sync photos and albums from the `/photos` directory to Contentful.

**Contentful config:** environment `master`. Content types: `portfolio_album`, `portfolio_photo`.

Read the space ID from `.env.local` at the project root before making any Contentful calls:
```bash
grep CONTENTFUL_SPACE_ID .env.local | cut -d= -f2
```
Use the returned value as `spaceId` in all MCP calls.

---

## Input

Optionally specify a target:
- An album folder name → sync only that album
- `root` → sync only loose photos at `/photos` root
- Omitted → discover everything and let the user choose

---

## Step 1: Discover what to sync

Run both commands:

**Root-level loose photos** (`.jpg` files directly in `/photos`, not in subfolders):
```bash
find ./photos -maxdepth 1 -name "*.jpg" | sort
```

**Album subfolders** (subfolders containing `album.yaml`):
```bash
find ./photos -mindepth 2 -maxdepth 2 -name "album.yaml" | sort
```

For each discovered item, check whether it already exists in Contentful before offering it for selection:

- **Root photos**: derive slug (filename without extension), then call `mcp__contentful__search_entries` with `content_type: portfolio_photo` and `fields.slug: <slug>`. If a result is returned, exclude it from candidates and note it as already synced.
- **Albums**: derive slug from `album.yaml`, then call `mcp__contentful__search_entries` with `content_type: portfolio_album` and `fields.slug: <slug>`. If a result is returned, exclude it from candidates and note it as already synced.

Build the final candidate list from items that do **not** yet exist in Contentful.

If no candidates remain, report "Nothing new to sync — all items already exist in Contentful." and stop.

If a specific target was given by the user, use only that. Otherwise, if only one candidate exists, auto-select it and announce what's being synced. If there is more than one candidate, use **AskUserQuestion** (multi-select) with "All" as the first option, followed by each individual candidate. If the user picks "All", sync every candidate.

---

## Step 2: Process root-level photos

For each `.jpg` file in `/photos` root that was selected:

### 2a. Derive slug and title

- slug = filename without extension (e.g. `portrait-headshot-20260508-001`)
- title = same as slug

### 2b. Check if photo already exists

Use `mcp__contentful__search_entries`:
- `contentTypeId`: `portfolio_photo`
- `query`: `{ "fields.slug": "<slug>" }`

If found: print "Photo `<slug>` already exists — skipping." and move on.

### 2c. Optimize

Only reached if the photo does not yet exist in Contentful:

```bash
sips -Z 2500 --setProperty formatOptions 85 "./photos/<filename>.jpg"
```

### 2d. Upload asset

Local files require a 3-step upload:

**1. Create an upload session:**
Use `mcp__contentful__create_upload_session`. Returns `uploadHandle` and `uploadUrl`.

**2. PUT the file bytes:**
```bash
curl -s -o /dev/null -w "%{http_code}" -X PUT "https://mcp.contentful.com<uploadUrl>" \
  -H "Content-Type: image/jpeg" \
  -H "Content-Length: $(wc -c < ./photos/<filename>.jpg)" \
  --data-binary @./photos/<filename>.jpg
```
Expect `204`. Stop and report if not.

**3. Create the asset:**
Use `mcp__contentful__upload_asset` with:
- `title`: slug (filename without extension)
- `file.uploadHandle`: the handle from step 1
- `file.fileName`: `<filename>.jpg`
- `file.contentType`: `image/jpeg`

Store the returned asset ID. Do **not** publish.

### 2e. Create `portfolio_photo` entry (draft)

Use `mcp__contentful__create_entry`:
- `contentTypeId`: `portfolio_photo`
- Fields (all in `{ "en-US": <value> }` locale):
  - `slug`: filename without extension
  - `image`: `{ "sys": { "type": "Link", "linkType": "Asset", "id": "<asset-id>" } }`

No `album` link — these are standalone photos.

Do **not** publish. Report: "Created photo: `<slug>`."

---

## Step 3: Process album folders

For each selected album folder:

### 3a. Read `album.yaml`

```yaml
title: Pride Parade Vienna 2026           # required
slug: pride-parade-vienna-2026            # required — unique in Contentful
description: A report from Vienna Pride.  # optional
tags:                                     # optional list
  - report
  - pride
location: Vienna, Austria                 # optional
date: 2026-06-14                          # optional (YYYY-MM-DD)
cover: report-pride-parade-vienna-001.jpg # optional — defaults to first .jpg
```

Stop and report if `title` or `slug` is missing.

### 3b. Check if album already exists

Use `mcp__contentful__search_entries`:
- `contentTypeId`: `portfolio_album`
- `query`: `{ "fields.slug": "<slug>" }`

If found: print "Album `<slug>` already exists — skipping album creation." Store the existing entry ID.
If not found: proceed to create it (3d).

### 3d. Create album entry (draft)

Use `mcp__contentful__create_entry`:
- `contentTypeId`: `portfolio_album`
- Fields (all in `{ "en-US": <value> }` locale):
  - `title`: string
  - `slug`: string
  - `description`: string (if present)
  - `tags`: array of strings (if present)
  - `location`: string (if present)
  - `date`: ISO date string e.g. `"2026-06-14"` (if present)

Do **not** set `cover` yet. Do **not** publish. Store the entry ID.

### 3e. For each `.jpg` in the album folder

Process in filename order:

**Derive slug and title:**
- slug = filename without extension
- title = same as slug

**Check existence:** use `mcp__contentful__search_entries` on `portfolio_photo` by slug. Skip if found.

**Optimize** (only if not skipped):
```bash
sips -Z 2500 --setProperty formatOptions 85 "<album-folder-path>/<filename>.jpg"
```

**Upload asset** (3-step):

1. `mcp__contentful__create_upload_session` → get `uploadHandle` and `uploadUrl`
2. PUT the file bytes:
```bash
curl -s -o /dev/null -w "%{http_code}" -X PUT "https://mcp.contentful.com<uploadUrl>" \
  -H "Content-Type: image/jpeg" \
  -H "Content-Length: $(wc -c < <album-folder-path>/<filename>.jpg)" \
  --data-binary @<album-folder-path>/<filename>.jpg
```
Expect `204`. Stop and report if not.

3. `mcp__contentful__upload_asset` with `title` = slug, `file.uploadHandle`, `file.fileName`, `file.contentType: image/jpeg`

Store asset ID. Do **not** publish.

**Create `portfolio_photo` entry (draft):**
- `contentTypeId`: `portfolio_photo`
- Fields in `{ "en-US": <value> }`:
  - `slug`: filename without extension
  - `image`: link to asset
  - `album`: link to album entry — `{ "sys": { "type": "Link", "linkType": "Entry", "id": "<album-entry-id>" } }`
  - `tags`: album tags (if the album has tags)

Do **not** publish. Report: "Created photo: `<slug>`."

### 3f. Set album cover

After all photos are processed, determine the cover asset:
- If `album.yaml` specifies `cover`: use the asset ID uploaded for that filename
- Otherwise: use the asset ID of the first photo processed

Use `mcp__contentful__update_entry` to patch the album entry:
- `cover`: `{ "en-US": { "sys": { "type": "Link", "linkType": "Asset", "id": "<cover-asset-id>" } } }`

Do **not** publish.

---

## Step 4: Summary

```
## Sync complete

### Root photos
Created: N  |  Skipped (existing): M

### Albums
<album-slug>
  Album entry: <entry-id> (draft)
  Photos created: N  |  Skipped: M
  Cover: <cover-filename>

All entries saved as drafts. Review in Contentful and publish when ready.
```

---

## Guardrails

- Never publish entries or assets — always leave as draft.
- Never overwrite existing slugs — skip silently with a note.
- Asset title must always equal the slug (filename without extension).
- Stop and report if `album.yaml` is missing `title` or `slug`.
- Stop and report if `sips` fails (non-zero exit code).
- If any Contentful API call fails, report the error and ask whether to continue or abort.
- Do not modify any files outside the `/photos` directory.
