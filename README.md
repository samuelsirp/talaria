# TALARIA — Token Efficiency Protocol

**Live → https://talaria-gamma.vercel.app**

> Stop wasting tokens your agent never reads.

TALARIA patches `tools/file_operations.py` with two changes that cut up to **40% of token spend** on iterative editing loops — the most common thing an autonomous agent does.

## What it does

| Change | How | Token saving |
|---|---|---|
| **Compact gutter** | `␣␣34␣␣` → `34\|` — drops padding, keeps line numbers | −16% vs padded |
| **Delta Reads** | Re-reads send only changed hunks, not the whole file | −24% combined |

Line numbers stay — the model needs them to patch correctly. Only the dead padding goes.

## A/B Results

Model: Sonnet 4.6 · 2 passes · 4-task battery

| Variation | Result | Δ Tokens |
|---|---|---|
| padded (legacy) | 4/4 PASS | +48% |
| compact | 4/4 PASS | +16% |
| compact + delta | 4/4 PASS | **−24%** |
| no numbers | 3/4 PASS | 0% |

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **GSAP** — particle background, SplitReveal, CountUp, Scramble, Magnetic buttons
- **Base Mainnet** — on-chain read verification

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3001
```

## Links

- 🌐 **Live** — https://talaria-gamma.vercel.app
- 🐦 **Twitter** — https://x.com/Talaria_OS
- 🔬 **Base layer** — https://github.com/NousResearch/hermes-agent

## License

MIT — 100% free, no subscription.
