# Risk Register

## Legend
- Probability: Low / Medium / High
- Impact: Low / Medium / High

| ID | Risk | Probability | Impact | Early Signal | Mitigation | Contingency Owner |
|---|---|---|---|---|---|---|
| R1 | API outages or slow responses | Medium | High | Ingestion failures/timeouts | Retries, schedule spacing, manual recovery workflow | You |
| R2 | Duplicate hourly data inflating training set | High | Medium | High duplicate counts or unstable metrics | Unique index + quality audit checks | You |
| R3 | Overfitting / leakage inflating R² | Medium | High | R² unrealistically near 1.0 | TimeSeriesSplit, quality audit, feature review | You |
| R4 | Feature-store platform instability | Medium | High | Pipeline write/read failures | MongoDB + GridFS storage path | You |
| R5 | Workflow failures before evaluation | Medium | High | Red GitHub checks | Daily monitoring + immediate fixes | You |
| R6 | Deployment downtime during evaluator call | Medium | High | Endpoint unreachable | Pre-recorded demo + screenshots + local fallback | You |
| R7 | Incomplete report weakens evaluation | Medium | High | Missing metrics/blocker narratives | Fill report with live outputs and evidence | You |
| R8 | Viva pressure causing unclear explanation | Medium | Medium | Rambling or missing structure in mock run | Use viva script and rehearse twice | You |
| R9 | Missing quiz/portal clarity confusion | Medium | Low | Inconsistent portal visibility | Focus on project quality and evaluator readiness | You |
| R10 | Last-day rush reducing quality | High | High | Unresolved TODOs near deadline | Freeze code on June 7 and do only verification | You |

## Weekly Review Checklist
1. Which risks moved from Medium to High?
2. Which mitigations were actually executed?
3. Are contingency artifacts ready (video, screenshots, logs)?
