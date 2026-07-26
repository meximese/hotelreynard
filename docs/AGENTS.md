## Below are some base principles to follow.

### principle: read problem-solving guidelines at the start of each session

- At the start of every session in this repository, read [problem-solving-guidelines.md](/Users/vinh/dev/reynard/hotelreynard/docs/problem-solving-guidelines.md) before making implementation decisions.
- Treat that file as a standing guardrail for code-level problem solving, schema design, abstractions, and refactors.

### principle: answer the exact question that was asked

- Interpret direct questions literally before expanding into adjacent explanation.
- If the user asks whether something is documented, answer whether it is documented.
- Do not answer a nearby question instead of the actual one.
- Add extra context only after the direct answer is clear.

### principle: keep responses short

- Default to short responses.
- Do not add extra explanation unless it is necessary or explicitly requested.

### principle: assume senior engineering context

- Assume the user is a very experienced engineer, at staff level or higher.
- Default to concise, direct, technical communication.
- Do not over-explain common engineering concepts unless explicitly asked.

### principle: keep sanity schemas flat and sanely native

- Sanity schemas should stay simple, flat, and close to the documented Sanity model.
- Do not over-engineer schema primitives, annotations, field helpers, or validation layers.
- Prefer static objects and arrays over helper functions when defining schema structure.
- Prefer Sanity-native patterns that are known to be stable in the admin UI.
- Before adding indirection or dynamic behavior, confirm it is necessary and supported by Sanity docs.

### principle: don't overcomplicate things or be "smart" about solutions

- Prefer the smallest change that fully satisfies the user-facing requirement.
- Do not optimize for internal purity, upstream correctness, or architectural elegance before confirming they are necessary to solve the actual problem.
- When graceful degradation or fallback behavior is acceptable, prioritize correct behavior at the boundary over perfect resolution behind the scenes.
- Solve for user-visible correctness first; deepen the fix only when the simpler solution is insufficient.

### principle: response brevity and technicality

Respond as if speaking to a senior engineer. Be technically rigorous, concise, and summary-first. Default to the minimal high-signal answer. Expand only when I explicitly ask.

### principle: don't cross signals for assumed ease or simplicity

Treat authoritative data sources and observational data sources differently. Core behavior must rely only on definitive contracts: documented API/schema fields, persisted server state, and explicit request inputs. Never use telemetry, analytics, marketing context, copied widget behavior, client-only UI state, or other secondary data as the source of truth for business logic unless the user explicitly asks for that and the code makes the tradeoff clear. When in doubt, identify the trust boundary and use the most authoritative source available.

### principle: shared UI should usually stay presentational

- For components intended to be reused across flows, prefer passing precomputed display data via props rather than embedding business logic or fetching state internally.
- Put source-of-truth selection, normalization, and business rules in the page, controller, or adapter layer.
- Only couple a shared component to app state/hooks when that coupling is explicitly desired and improves the user-facing outcome more than it increases ambiguity.
- Do not introduce extra abstraction unless reuse or correctness clearly requires it.

### principle: prefer many small simple files

- Prefer many small component files over large grouped render files.
- When a file starts switching across multiple UI variants or content types, split those branches into separate component files instead of growing the parent file.
- Favor simple, explicit composition over clever internal abstractions.
- A coordinator component may choose which child component to render, but it should not also contain all of those child markup implementations inline.
- When in doubt, choose more files with clearer names and simpler responsibilities rather than fewer files with mixed concerns.

### principle: cms sections should follow one shared contract

- Treat CMS section renderers as a thin dispatch layer plus one file per section type.
- The section switcher should select section components, not contain large inline section markup.
- The page-level section wrapper owns spacing, headers, alignment hooks, and section-level modifiers.
- Each section component should return only the body/content for that section unless a clearly named shared layout primitive is required.
- Prefer one consistent root body structure and shared class contract across section types before introducing section-specific wrappers.
- Do not introduce vague exception categories like "bespoke", "special", or "custom" when the actual layout rule can be named directly.
- For Sanity-driven content, default to server-rendered section components unless interaction clearly requires a client boundary.
- Optimize for DOM and CSS consistency across section types, even if rebuilding CMS data is easier than preserving an inconsistent old shape.

### principle: hoist shared structure, keep leaf components specific

- When multiple sibling components repeat the same outer wrapper, shared classes, spacing shell, alignment shell, or stack primitive, hoist that wrapper into a shared parent component instead of repeating it in every leaf file.
- Prefer a pattern of:
  page wrapper owns section-level structure,
  switcher/dispatcher owns shared body wrapper selection,
  leaf section components own only their unique markup.
- Leaf components should describe what is unique about a section, not restate inherited layout contracts that already apply to every sibling.
- If a wrapper exists only to enforce a common contract, declare it once in the highest reasonable shared layer and let children inherit that contract.
- DRY applies most strongly to structural contracts: repeated wrapper markup, repeated class composition, repeated spacing/alignment scaffolding, and repeated semantic shells should be centralized before centralizing smaller internal details.
- Prefer centralizing repeated structure in a clearly named wrapper component over hiding it inside utility functions or duplicating JSX for “clarity.”

### principle: prefer current workspaces over legacy ones

- Treat `site` as the active frontend and `studio` as the active content workspace.
- Avoid reviving or extending retired workspace code when an archived copy has already been preserved inside an active workspace.
- When legacy code is worth keeping for reference, move it into a clearly named archive location in the active app instead of leaving it in a parallel abandoned workspace.
