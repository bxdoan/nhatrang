# Repository collaboration

- Agents share this checkout. Check `git status` and recent commits before editing; do not overwrite, stage, reset, or commit another agent's work without coordination.
- Keep changes focused and stage explicit paths. Before committing, review `git diff --cached`, run appropriate checks, and use a concise Conventional Commit message such as `feat(bus): add route directory`.
- For direct commits to master, fetch and inspect `origin/master` before pushing. Never force push; coordinate concurrent changes and resolve them without discarding others' work. A push includes all local commits ahead of the remote.
- Review changes for correctness, accessibility, security, and regressions. Report checks and unresolved limitations in the handoff.
- Bus data must cite an authoritative source and publication or verification date. Distinguish planned routes from operating routes; do not invent stops, coordinates, schedules, fares, or direction. Mark missing and stale data explicitly.
- Do not commit secrets, generated build output, or unrelated files.
