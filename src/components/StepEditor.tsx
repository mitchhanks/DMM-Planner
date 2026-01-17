import type { Step } from "../models/step";
import type { Skill } from "../models/skills";
import { SKILLS_ALPHA } from "../models/skills";
import { QUESTS } from "../data/quests";
import { SIGILS, sigilCost } from "../data/sigils";
import { QUEST_UNLOCKS } from "../data/questUnlocks";
import type { SigilTier } from "../models/step";


type Props = {
    step: Step;
    onChange: (next: Step) => void;
    computedPoints: number;
    breakdown?: {
        quests: number;
        levels: number;
        clues: number;
        breaches: number;
        diaries: number;
        bosses: number;
        manual: number;
        total: number;
    };
};

export function StepEditor({ step, onChange, computedPoints, breakdown }: Props) {

    const sigilUnlock = step.unlock?.type === "sigil" ? step.unlock : undefined;
    const questUnlock = step.unlock?.type === "quest_unlock" ? step.unlock : undefined;


    function update(patch: Partial<Step>) {
        onChange({ ...step, ...patch });
    }

    function addXpGain() {
        update({
            xpGains: [
                ...step.xpGains,
                { skill: "attack", baseXp: 0, source: "" }
            ]
        });
    }

    function updateXpGain(index: number, patch: Partial<Step["xpGains"][number]>) {
        const next = step.xpGains.map((g, i) => (i === index ? { ...g, ...patch } : g));
        update({ xpGains: next });
    }

    function removeXpGain(index: number) {
        const next = step.xpGains.filter((_, i) => i !== index);
        update({ xpGains: next });
    }

    return (
        <div
            style={{
                border: "1px solid var(--border-main)",
                borderRadius: 8,
                padding: 12,
                background: "var(--bg-panel)",
                color: "var(--text-main)"
            }}
        >
            <h2 className="osrs-heading">Edit step</h2>

            {/* Computed points */}
            <div style={{ marginBottom: 10, color: "#ffd700", fontWeight: 700 }}>
                Points (this step): {computedPoints}
            </div>

            {breakdown && (
                <div
                    style={{
                        marginBottom: 12,
                        padding: "10px 12px",
                        border: "1px solid #333",
                        borderRadius: 8,
                        background: "#151515",
                        color: "#bbb",
                        fontSize: 13,
                        lineHeight: 1.6
                    }}
                >
                    {renderBreakdownLine("Quests", breakdown.quests)}
                    {renderBreakdownLine("Levels", breakdown.levels)}
                    {renderBreakdownLine("Clues", breakdown.clues)}
                    {renderBreakdownLine("Breaches", breakdown.breaches)}
                    {renderBreakdownLine("Diaries", breakdown.diaries)}
                    {renderBreakdownLine("Bosses", breakdown.bosses)}
                    {renderBreakdownLine("Manual", breakdown.manual)}

                    <div style={{ marginTop: 6, color: "#eee" }}>
                        Total: <span style={mono}>{breakdown.total}</span>
                    </div>

                    {breakdown.total !== 0 &&
                        breakdown.quests === 0 &&
                        breakdown.levels === 0 &&
                        breakdown.clues === 0 &&
                        breakdown.breaches === 0 &&
                        breakdown.diaries === 0 &&
                        breakdown.bosses === 0 &&
                        breakdown.manual === 0 && (
                            <div style={{ marginTop: 6, color: "#888", fontSize: 12 }}>
                                (No point sources recorded for this step)
                            </div>
                        )}
                </div>
            )}




            {/* Name */}
            <label style={labelStyle}>Name</label>
            <input
                value={step.name}
                onChange={(e) => update({ name: e.target.value })}
                style={inputStyle}
                placeholder="e.g. Waterfall Quest"
            />

            {/* Category */}
            <label style={labelStyle}>Category</label>
            <select
                value={step.category}
                onChange={(e) => update({ category: e.target.value as Step["category"] })}
                style={inputStyle}
            >
                <option value="quest">quest</option>
                <option value="training">training</option>
                <option value="combat">combat</option>
                <option value="unlock">unlock</option>
                <option value="misc">misc</option>
            </select>

            {/* Unlock options */}
            {step.category === "unlock" && (
                <>
                    <label style={labelStyle}>Unlock type</label>
                    <select
                        value={step.unlock?.type ?? ""}
                        onChange={(e) => {
                            const t = e.target.value;

                            if (t === "sigil") {
                                onChange({
                                    ...step,
                                    unlock: { type: "sigil", sigilId: "", tier: 1 },
                                });
                                return;
                            }

                            if (t === "quest_unlock") {
                                onChange({
                                    ...step,
                                    unlock: { type: "quest_unlock", unlockId: "" },
                                });
                                return;
                            }

                            onChange({ ...step, unlock: undefined });
                        }}
                        style={inputStyle}
                    >
                        <option value="">Select…</option>
                        <option value="sigil">Sigil</option>
                        <option value="quest_unlock">Quest unlock</option>
                    </select>

                    {/* Sigil unlock */}
                    {sigilUnlock && (
                        <>
                            <label style={labelStyle}>Sigil tier</label>
                            <select
                                value={sigilUnlock.tier}
                                onChange={(e) => {
                                    const tier = Number(e.target.value) as SigilTier;
                                    onChange({
                                        ...step,
                                        unlock: { type: "sigil", tier, sigilId: "" }
                                    });
                                }}
                                style={inputStyle}
                            >
                                <option value={1}>Tier 1</option>
                                <option value={2}>Tier 2</option>
                                <option value={3}>Tier 3</option>
                            </select>

                            <label style={labelStyle}>Sigil</label>
                            <select
                                value={sigilUnlock.sigilId}
                                onChange={(e) => {
                                    const sigilId = e.target.value;
                                    const sigil = SIGILS.find(s => s.id === sigilId);
                                    const tier = step.unlock?.type === "sigil" ? step.unlock.tier : 1;

                                    onChange({
                                        ...step,
                                        name: sigil ? `Buy ${sigil.name}` : step.name,
                                        unlock: { type: "sigil", tier, sigilId },
                                        manualPointsAdjustment: sigil ? -sigilCost(sigil) : (step.manualPointsAdjustment ?? 0),
                                    });
                                }}
                                style={inputStyle}
                            >
                                <option value="">Select a sigil…</option>
                                {SIGILS.filter(s => s.tier === (sigilUnlock?.tier ?? 1)).map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} (Cost {sigilCost(s)})
                                    </option>
                                ))}
                            </select>

                            {sigilUnlock?.sigilId && (() => {
                                const sigil = SIGILS.find(s => s.id === sigilUnlock.sigilId);
                                if (!sigil) return null;
                                return (
                                    <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 6 }}>
                                        Selected: <b>{sigil.name}</b> • Tier {sigil.tier} • Cost{" "}
                                        <b>{sigilCost(sigil)}</b> points (auto-applied as a negative manual adjustment)
                                    </div>
                                );
                            })()}
                        </>
                    )}

                    {/* Quest unlock */}
                    {questUnlock && (
                        <>
                            <label style={labelStyle}>Quest unlock bundle</label>
                            <select
                                value={questUnlock?.unlockId ?? ""}
                                onChange={(e) => {
                                    const unlockId = e.target.value;
                                    const bundle = QUEST_UNLOCKS.find(q => q.id === unlockId);

                                    onChange({
                                        ...step,
                                        name: bundle ? bundle.name : step.name,
                                        unlock: {
                                            type: "quest_unlock",
                                            unlockId,
                                        },
                                        manualPointsAdjustment: bundle ? -bundle.pointCost : (step.manualPointsAdjustment ?? 0),
                                    });
                                }}
                                style={inputStyle}
                            >
                                <option value="">Select a bundle…</option>
                                {QUEST_UNLOCKS.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.name} (Cost {b.pointCost})
                                    </option>
                                ))}
                            </select>

                            {questUnlock?.unlockId && (() => {
                                const bundle = QUEST_UNLOCKS.find(q => q.id === questUnlock.unlockId);
                                if (!bundle) return null;

                                return (
                                    <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 6 }}>
                                        Selected bundle: <b>{bundle.name}</b> • Cost <b>{bundle.pointCost}</b> points
                                    </div>
                                );
                            })()}
                        </>
                    )}

                    <div style={{ marginTop: 10, padding: "8px 10px", border: "1px solid var(--border-main)", borderRadius: 8, background: "var(--bg-panel)" }}>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                            Unlock steps only spend points and unlock content. If you want XP from quests, add those quests as normal quest steps.
                        </div>
                    </div>
                </>
            )}


            {/* Quest points */}
            {step.category === "quest" && (
                <>
                    <label style={labelStyle}>Quest points gained</label>
                    <input
                        type="number"
                        min={0}
                        value={step.events?.questPointsGained ?? 0}
                        onChange={(e) => {
                            const qp = Math.max(0, Math.floor(Number(e.target.value) || 0));
                            onChange({
                                ...step,
                                events: {
                                    ...(step.events ?? {}),
                                    questPointsGained: qp
                                }
                            });
                        }}
                        style={inputStyle}
                    />
                    <div style={{ color: "#bbb", fontSize: 12, marginTop: 6 }}>
                        Points from quests = quest points × points-per-quest-point (configured later).
                    </div>
                </>
            )}

            {/* Quest template */}
            {step.category === "quest" && (
                <>
                    <label style={labelStyle}>Quest template</label>
                    <select
                        value=""
                        onChange={(e) => {
                            const questId = e.target.value;
                            const q = QUESTS.find(x => x.id === questId);
                            if (!q) return;

                            onChange({
                                ...step,
                                name: q.name,
                                xpGains: q.xpGains.map(g => ({ ...g })),
                                events: {
                                    ...(step.events ?? {}),
                                    questPointsGained: q.questPoints
                                }
                            });
                        }}
                        style={inputStyle}
                    >
                        <option value="">Select a quest…</option>
                        {QUESTS.map(q => (
                            <option key={q.id} value={q.id}>
                                {q.name}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {/* Points */}
            <label style={labelStyle}>Manual point adjustment (optional)</label>
            <input
                type="number"
                value={step.manualPointsAdjustment ?? 0}
                onChange={(e) => {
                    const n = Number(e.target.value) || 0;
                    onChange({ ...step, manualPointsAdjustment: n });
                }}
                style={inputStyle}
            />
            <div style={{ color: "#bbb", fontSize: 12, marginTop: 6 }}>
                This is only for manual tweaks. Auto points come from quests, levels, clues, etc.
            </div>

            <label style={labelStyle}>Estimated time (minutes)</label>
            <input
                type="number"
                min={0}
                value={step.estimatedMinutes ?? 0}
                onChange={(e) => {
                    const n = Math.max(0, Math.floor(Number(e.target.value) || 0));
                    onChange({ ...step, estimatedMinutes: n });
                }}
                style={inputStyle}
            />

            {/* XP Gains */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                <h3 style={{ margin: 0 }}>XP gains</h3>
                <button onClick={addXpGain} style={buttonStyle}>
                    + Add XP
                </button>
            </div>

            {step.xpGains.length === 0 && (
                <div style={{ marginTop: 10, color: "#bbb", fontSize: 13 }}>
                    No XP gains yet. Add one above.
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                {step.xpGains.map((gain, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "120px 120px 1fr 80px",
                            gap: 8,
                            alignItems: "center"
                        }}
                    >
                        <select
                            value={gain.skill}
                            onChange={(e) => updateXpGain(idx, { skill: e.target.value as Skill })}
                            style={inputStyle}
                        >
                            {SKILLS_ALPHA.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            value={gain.baseXp}
                            onChange={(e) => updateXpGain(idx, { baseXp: Number(e.target.value) || 0 })}
                            style={inputStyle}
                            placeholder="XP"
                            min={0}
                        />

                        <input
                            value={gain.source ?? ""}
                            onChange={(e) => updateXpGain(idx, { source: e.target.value })}
                            style={inputStyle}
                            placeholder="Source (optional) e.g. quest / sigil / monster"
                        />

                        <button onClick={() => removeXpGain(idx)} style={dangerButtonStyle}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Notes */}
            <label style={{ ...labelStyle, marginTop: 16 }}>Notes (optional)</label>
            <textarea
                value={step.notes ?? ""}
                onChange={(e) => update({ notes: e.target.value })}
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" as const }}
                placeholder="Any reminders, gear notes, risk notes..."
            />
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: "block",
    marginTop: 10,
    marginBottom: 6,
    fontSize: 12,
    color: "#bbb"
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #444",
    background: "#121212",
    color: "#eee",
    outline: "none"
};

const buttonStyle: React.CSSProperties = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #444",
    background: "#1a1a1a",
    color: "#eee",
    cursor: "pointer"
};

const dangerButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    border: "1px solid #6b2a2a",
    background: "#2a1414",
    color: "#ffd0d0"
};

const mono: React.CSSProperties = { fontFamily: "monospace", color: "#ddd" };

function renderBreakdownLine(label: string, value: number) {
    if (!value) return null;
    return (
        <div>
            {label}: <span style={mono}>{value}</span>
        </div>
    );
}


