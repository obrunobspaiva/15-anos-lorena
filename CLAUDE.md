# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite, hot reload)
npm run build    # Production build
npm run preview  # Preview production build locally
```

No test framework is configured in this project.

## Architecture

Single Page Application (SPA) built with React 18 + Vite. No external UI libraries — all styling is custom CSS in [src/styles.css](src/styles.css).

**Tab-based layout** — [src/App.jsx](src/App.jsx) manages the active tab state and renders one of five tab components based on selection. [src/components/BottomNav.jsx](src/components/BottomNav.jsx) provides the sticky bottom navigation.

**Global state** — [src/AppContext.jsx](src/AppContext.jsx) uses React Context + localStorage to persist:
- `checkState`: checklist item completion (keyed by item ID)
- `pendState`: pending task completion (keyed by task index)
- `cerState`: ceremony checklist completion
- `teto`: budget ceiling value

It also derives computed values consumed by multiple tabs: checklist progress %, open pending task count, and the next pending task.

**Static data** — All event content lives in [src/data.js](src/data.js):
- `EVENTO`: event metadata (date June 28, 2026; 120 guests; Mansão Adélia Prado, São Paulo)
- `BLOCOS`: 5 timeline blocks for the event schedule (16:00–22:00)
- `CHECKLIST_GRUPOS`: 5 checklist groups with items and costs
- `PENDENCIAS`: 16 tasks with priority, deadline, and responsible party
- `CHECKLIST_CERIMONIA`: 9 pre-ceremony items
- `TOTAL_CONTRATADO`: total contracted value (R$ 42,502.50)

**Design tokens** — CSS custom properties defined at `:root` in [src/styles.css](src/styles.css). Primary palette: wine (`#8B1A4A`), gold (`#C8956C`), warm beige background (`#FBF4EF`). Status colors follow the standard success/warning/danger/info pattern.

## Tab Components

| Component | Purpose |
|---|---|
| [TabInicio.jsx](src/components/TabInicio.jsx) | Dashboard: countdown, financial summary, checklist progress |
| [TabChecklist.jsx](src/components/TabChecklist.jsx) | Interactive checklist grouped by category |
| [TabCronograma.jsx](src/components/TabCronograma.jsx) | Detailed event timeline and ceremony script |
| [TabFinanceiro.jsx](src/components/TabFinanceiro.jsx) | Budget tracking and vendor contract details |
| [TabPendencias.jsx](src/components/TabPendencias.jsx) | Filterable pending tasks with priority and deadlines |
