## Below are some base principles to follow.

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

### principle: prefer current workspaces over legacy ones

- Treat `apps/web` as the active frontend and `apps/studio` as the active content workspace.
- Avoid reviving or extending retired workspace code when an archived copy has already been preserved inside an active workspace.
- When legacy code is worth keeping for reference, move it into a clearly named archive location in the active app instead of leaving it in a parallel abandoned workspace.
