# Targeted final QA fixes

Make only the following focused accessibility and polish fixes in the current Prospect Auto final-cinematic worktree. Do not redesign any section, change the visual direction, add dependencies, commit, push, deploy, or touch git configuration.

1. In `Schedule.tsx`, the success panel currently has `tabIndex={-1}` but is never focused. Add robust focus management so a valid demo submission focuses the success panel after it renders, allowing screen-reader and keyboard users to immediately receive the result. Use a ref plus an effect keyed to the success state. Do not use `setTimeout` unless strictly necessary.

2. When `Start another request` is activated, reset the demo and move focus to the Name input after the form has rendered. Implement this without autofocus on initial mobile page load.

3. Bring form placeholders in line with the web-interface guideline: example-oriented placeholders should use a real ellipsis character (`…`) rather than ending as a bare phrase or period. Keep them short and useful.

4. Ensure the success panel's live-region behavior remains correct and does not announce twice.

5. Run `npm run format`, `npm run typecheck`, `npm run lint`, and `npm run build`, fixing any failures. Append the specific changes and results to `FINAL_DESIGN_NOTES.md`.

Do not change anything else. Report the files changed and command results when complete.
