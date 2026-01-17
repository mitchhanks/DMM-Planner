import { useEffect, useMemo, useState } from "react";
import type { Step } from "../models/step";
import { parseImportedPlan } from "../store/planIO";

type ToggleHistoryItem = {
    type: "toggle";
    stepId: string;
    prev: boolean;
    next: boolean;
    prevCurrentIndex: number;
};

export type RunSession = {
    id: string;
    routeName: string;
    steps: Step[];
    currentIndex: number;
    completed: Record<string, boolean>;
    history: ToggleHistoryItem[];
};

type RunSessionsState = {
    version: 1;
    sessions: RunSession[];
};

const STORAGE_KEY_V1 = "dmm-planner.run.sessions.v1";
const LEGACY_KEY = "dmm-planner.runstate.v1";

function makeId() {
    return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadSessions(): RunSession[] {
    // 1) Try new multi-session storage
    try {
        const raw = localStorage.getItem(STORAGE_KEY_V1);
        if (raw) {
            const parsed = JSON.parse(raw) as RunSessionsState;
            if (parsed?.version === 1 && Array.isArray(parsed.sessions)) {
                return parsed.sessions;
            }
        }
    } catch {
        // ignore
    }

    // 2) Migrate legacy single-session storage if present
    try {
        const rawLegacy = localStorage.getItem(LEGACY_KEY);
        if (rawLegacy) {
            const legacy = JSON.parse(rawLegacy) as any;
            if (legacy && Array.isArray(legacy.steps)) {
                const migrated: RunSession = {
                    id: makeId(),
                    routeName: legacy.routeName ?? "Imported route",
                    steps: legacy.steps ?? [],
                    currentIndex: legacy.currentIndex ?? 0,
                    completed: legacy.completed ?? {},
                    history: legacy.history ?? []
                };
                // Save into new storage and remove legacy key
                saveSessions([migrated]);
                localStorage.removeItem(LEGACY_KEY);
                return [migrated];
            }
        }
    } catch {
        // ignore
    }

    return [];
}

function saveSessions(sessions: RunSession[]) {
    const payload: RunSessionsState = { version: 1, sessions };
    localStorage.setItem(STORAGE_KEY_V1, JSON.stringify(payload));
}

export function RunPage() {
    const [sessions, setSessions] = useState<RunSession[]>(() => loadSessions());

    const [showPaste, setShowPaste] = useState(false);
    const [importText, setImportText] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        saveSessions(sessions);
    }, [sessions]);

    function addSessionFromJsonText(text: string) {
        const imported = parseImportedPlan(text);
        const steps = imported.steps;

        const session: RunSession = {
            id: makeId(),
            routeName: imported.name || "Imported route",
            steps,
            currentIndex: 0,
            completed: {},
            history: []
        };

        setSessions(prev => [session, ...prev]);
        setMessage(`Imported: ${session.routeName}`);
    }

    async function addSessionFromFile(file: File) {
        const text = await file.text();
        addSessionFromJsonText(text);
    }

    function removeSession(sessionId: string) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
    }

    function clearSessionProgress(sessionId: string) {
        setSessions(prev =>
            prev.map(s =>
                s.id === sessionId
                    ? { ...s, completed: {}, history: [], currentIndex: 0 }
                    : s
            )
        );
    }

    function updateSession(sessionId: string, updater: (s: RunSession) => RunSession) {
        setSessions(prev => prev.map(s => (s.id === sessionId ? updater(s) : s)));
    }

    function clearAll() {
        setSessions([]);
        setImportText("");
        setShowPaste(false);
        setMessage("All run sessions cleared.");
        localStorage.removeItem(STORAGE_KEY_V1);
    }

    return (
        <div style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <h1 className="dmm-heading" style={{ margin: 0 }}>Run routes</h1>

                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <label className="osrs-button" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        Import file
                        <input
                            type="file"
                            accept="application/json"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) void addSessionFromFile(file);
                                e.currentTarget.value = "";
                            }}
                        />
                    </label>

                    <button className="osrs-button" onClick={() => setShowPaste(v => !v)}>
                        {showPaste ? "Hide paste" : "Import from paste"}
                    </button>

                    <button className="osrs-button osrs-button-danger" onClick={clearAll} disabled={sessions.length === 0}>
                        Clear all
                    </button>
                </div>
            </div>

            {showPaste && (
                <div style={{ marginTop: 10 }}>
                    <textarea
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        placeholder="Paste exported route JSON here…"
                        style={{
                            width: "100%",
                            maxWidth: 900,
                            minHeight: 120,
                            padding: "8px 10px",
                            borderRadius: 8,
                            border: "1px solid var(--border-main)",
                            background: "var(--bg-panel)",
                            color: "var(--text-main)",
                            outline: "none"
                        }}
                    />

                    <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                        <button
                            className="osrs-button"
                            disabled={!importText.trim()}
                            onClick={() => {
                                try {
                                    addSessionFromJsonText(importText);
                                    setShowPaste(false);
                                    setImportText("");
                                } catch (e: any) {
                                    setMessage(e?.message ?? "Import failed.");
                                }
                            }}
                        >
                            Import pasted JSON
                        </button>

                        {message && <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{message}</span>}
                    </div>
                </div>
            )}

            <div style={{ marginTop: 12 }} className="run-grid">
                {sessions.map(session => (
                    <RunCard
                        key={session.id}
                        session={session}
                        onUpdate={(fn) => updateSession(session.id, fn)}
                        onRemove={() => removeSession(session.id)}
                        onClearProgress={() => clearSessionProgress(session.id)}
                    />
                ))}
            </div>

            {sessions.length === 0 && (
                <div style={{ marginTop: 16, color: "var(--text-muted)" }}>
                    Import one or more routes to start running them side-by-side.
                </div>
            )}
        </div>
    );
}

function RunCard({
    session,
    onUpdate,
    onRemove,
    onClearProgress
}: {
    session: RunSession;
    onUpdate: (updater: (s: RunSession) => RunSession) => void;
    onRemove: () => void;
    onClearProgress: () => void;
}) {
    const { routeName, steps, currentIndex, completed, history } = session;
    const currentStep = steps[currentIndex];

    const completedCount = useMemo(() => {
        return steps.reduce((sum, s) => sum + (completed[s.id] ? 1 : 0), 0);
    }, [steps, completed]);

    function toggleComplete(stepId: string) {
        onUpdate(s => {
            const prevVal = !!s.completed[stepId];
            const nextVal = !prevVal;

            return {
                ...s,
                completed: { ...s.completed, [stepId]: nextVal },
                history: [...s.history, { type: "toggle" as const, stepId, prev: prevVal, next: nextVal, prevCurrentIndex: s.currentIndex }]
            };
        });
    }

    function setCurrent(idx: number) {
        onUpdate(s => ({ ...s, currentIndex: idx }));
    }

    function completeCurrent() {
        if (!currentStep) return;

        onUpdate(s => {
            const stepId = s.steps[s.currentIndex]?.id;
            if (!stepId) return s;
            if (s.completed[stepId]) return s;

            // mark complete
            const nextCompleted = { ...s.completed, [stepId]: true };
            const nextHistory = [
                ...s.history,
                { type: "toggle" as const, stepId, prev: false, next: true, prevCurrentIndex: s.currentIndex }
            ];

            // advance to next incomplete
            const nextIndex = s.steps.findIndex((st, i) => i > s.currentIndex && !nextCompleted[st.id]);
            return {
                ...s,
                completed: nextCompleted,
                history: nextHistory,
                currentIndex: nextIndex !== -1 ? nextIndex : s.currentIndex
            };
        });
    }

    function undoLast() {
        onUpdate(s => {
            const last = s.history[s.history.length - 1];
            if (!last) return s;

            const nextCompleted = { ...s.completed, [last.stepId]: last.prev };
            const nextHistory = s.history.slice(0, -1);

            return {
                ...s,
                completed: nextCompleted,
                history: nextHistory,
                currentIndex: last.prevCurrentIndex
            };
        });
    }

    return (
        <div
            style={{
                border: "1px solid var(--border-main)",
                borderRadius: 10,
                background: "var(--bg-panel)",
                padding: 12,
                minWidth: 0
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <div style={{ fontWeight: 800, color: "var(--gold)" }}>{routeName}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {completedCount}/{steps.length}
                </div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="osrs-button" onClick={completeCurrent} disabled={!currentStep}>
                    Complete
                </button>
                <button className="osrs-button" onClick={undoLast} disabled={history.length === 0}>
                    Undo
                </button>
                <button className="osrs-button" onClick={onClearProgress} disabled={steps.length === 0}>
                    Clear
                </button>
                <button className="osrs-button osrs-button-danger" onClick={onRemove}>
                    Remove
                </button>
            </div>

            <div style={{ marginTop: 10, color: "var(--text-muted)", fontSize: 12 }}>
                Current:{" "}
                <span style={{ color: "var(--text-main)", fontWeight: 700 }}>
                    {currentStep ? `${currentIndex + 1}. ${currentStep.name}` : "—"}
                </span>
            </div>

            <div style={{ marginTop: 10 }}>
                {steps.map((st, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isDone = !!completed[st.id];

                    return (
                        <div
                            key={st.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 10px",
                                borderRadius: 8,
                                border: isCurrent ? "2px solid var(--gold)" : "1px solid var(--border-main)",
                                background: isDone ? "#101010" : "var(--bg-panel-alt)",
                                opacity: isDone ? 0.7 : 1,
                                marginBottom: 6
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleComplete(st.id)}
                                style={{ transform: "scale(1.05)" }}
                                title="Mark complete / incomplete"
                            />

                            <button
                                className="osrs-button"
                                style={{ padding: "6px 10px", borderRadius: 6 }}
                                onClick={() => setCurrent(idx)}
                            >
                                Go
                            </button>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700 }}>
                                    {idx + 1}. {st.name}
                                </div>
                                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                                    {st.category.toUpperCase()} • XP gains: {st.xpGains.length}
                                    {st.estimatedMinutes ? ` • ~${st.estimatedMinutes}m` : ""}
                                </div>
                            </div>

                            {isDone && <span style={{ color: "var(--gold)", fontWeight: 900 }}>✓</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
