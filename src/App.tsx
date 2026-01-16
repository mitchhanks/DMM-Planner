import { useEffect, useMemo, useState } from "react";
import { SkillsPanel } from "./components/SkillsPanel";
import { StepTimeline } from "./components/StepTimeline";
import { simulateSteps } from "./engine/simulator";
import { StepEditor } from "./components/StepEditor";
import type { Step } from "./models/step";
import { clearPlan, loadPlan, savePlan } from "./store/storage";
import { arrayMove } from "@dnd-kit/sortable";
import { downloadTextFile, exportPlanToJson, parseImportedPlan } from "./store/planIO";


const initialSteps: Step[] = [
  {
    id: "step-1",
    name: "Waterfall Quest",
    category: "quest",
    xpGains: [
      { skill: "attack", baseXp: 13750, source: "Waterfall Quest" },
      { skill: "strength", baseXp: 13750, source: "Waterfall Quest" }
    ],
    events: { questPointsGained: 1 },
  },
  {
    id: "step-2",
    name: "Train Agility (manual)",
    category: "training",
    xpGains: [{ skill: "agility", baseXp: 5000, source: "Gnome course" }],
  }
];

function App() {
  const loaded = loadPlan();
  const [steps, setSteps] = useState<Step[]>(loaded?.steps ?? initialSteps);
  const [planName, setPlanName] = useState<string>(loaded?.name ?? "My route");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [importText, setImportText] = useState("");
  const [ioMessage, setIoMessage] = useState<string | null>(null);



  const selectedStep = steps[selectedIndex];

  function updateSelectedStep(next: Step) {
    setSteps((prev) => prev.map((s, i) => (i === selectedIndex ? next : s)));
  }

  const snapshot = useMemo(() => {
    return simulateSteps(steps, selectedIndex);
  }, [steps, selectedIndex]);
  const selectedStepPoints = snapshot.stepPoints[selectedIndex] ?? 0;
  const selectedBreakdown = snapshot.stepPointsBreakdown?.[selectedIndex];
  const [showPasteImport, setShowPasteImport] = useState(false);
  const totalMinutes = useMemo(
    () => steps.reduce((sum, s) => sum + (s.estimatedMinutes ?? 0), 0),
    [steps]
  );

  const minutesToSelected = useMemo(
    () =>
      steps
        .slice(0, selectedIndex + 1)
        .reduce((sum, s) => sum + (s.estimatedMinutes ?? 0), 0),
    [steps, selectedIndex]
  );



  function addStep() {
    const next: Step = {
      id: `step-${steps.length + 1}`,
      name: `New step ${steps.length + 1}`,
      category: "misc",
      xpGains: [],
    };

    setSteps((prev) => [...prev, next]);
    setSelectedIndex(steps.length); // select newly added
  }

  function removeSelectedStep() {
    setSteps((prev) => {
      if (prev.length === 0) return prev;

      const next = prev.filter((_, i) => i !== selectedIndex);

      // Update selected index safely
      setSelectedIndex((prevIndex) => {
        if (next.length === 0) return 0;
        if (prevIndex >= next.length) return next.length - 1;
        return prevIndex;
      });

      return next;
    });
  }

  function duplicateSelectedStep() {
    const stepToCopy = steps[selectedIndex];
    if (!stepToCopy) return;

    const copy: Step = {
      ...stepToCopy,
      id: `step-${Date.now()}`, // unique id
      name: `${stepToCopy.name} (copy)`,
      xpGains: stepToCopy.xpGains.map(g => ({ ...g })),
      events: stepToCopy.events ? { ...stepToCopy.events } : undefined
    };

    // Insert directly after current step and select it
    setSteps(prev => {
      const next = [...prev];
      next.splice(selectedIndex + 1, 0, copy);
      return next;
    });
    setSelectedIndex(selectedIndex + 1);
  }

  function moveSelectedStep(direction: -1 | 1) {
    setSteps((prev) => {
      const from = selectedIndex;
      const to = from + direction;

      if (from < 0 || from >= prev.length) return prev;
      if (to < 0 || to >= prev.length) return prev;

      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);

      // keep the moved step selected
      setSelectedIndex(to);

      return next;
    });
  }

  function reorderSteps(activeId: string, overId: string) {
    const selectedId = steps[selectedIndex]?.id;

    setSteps((prev) => {
      const oldIndex = prev.findIndex(s => s.id === activeId);
      const newIndex = prev.findIndex(s => s.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const next = arrayMove(prev, oldIndex, newIndex);

      // Keep the previously selected step selected (even if another step was dragged)
      if (selectedId) {
        const nextSelectedIndex = next.findIndex(s => s.id === selectedId);
        if (nextSelectedIndex !== -1) {
          setSelectedIndex(nextSelectedIndex);
        }
      }

      return next;
    });
  }

  function handleExport() {
    const json = exportPlanToJson(planName, steps);
    const safeName = (planName || "route").replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "_");
    downloadTextFile(`dmm_route_${safeName || "route"}.json`, json);
    setIoMessage("Exported route JSON.");
  }

  function handleImportFromText() {
    try {
      const imported = parseImportedPlan(importText);
      setPlanName(imported.name || "Imported route");
      setSteps(imported.steps);
      setSelectedIndex(0);
      setIoMessage("Imported route successfully.");
    } catch (e: any) {
      setIoMessage(e?.message ?? "Import failed.");
    }
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text();
      const imported = parseImportedPlan(text);
      setPlanName(imported.name || "Imported route");
      setSteps(imported.steps);
      setSelectedIndex(0);
      setIoMessage("Imported route successfully.");
    } catch (e: any) {
      setIoMessage(e?.message ?? "Import failed.");
    }
  }


  useEffect(() => {
    savePlan({
      version: 1,
      name: planName,
      steps
    });
  }, [planName, steps]);

  return (
    <div style={{ padding: 16, color: "#eee" }}>
      <h1 className="dmm-heading">Deadman Mode Planner</h1>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <button className="osrs-button" onClick={handleExport}>
          Export JSON
        </button>

        <label className="osrs-button" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          Import file
          <input
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImportFile(file);
              e.currentTarget.value = "";
            }}
          />
        </label>

        <button
          className="osrs-button"
          onClick={() => {
            if (showPasteImport) {
              handleImportFromText();
              setShowPasteImport(false);
            } else {
              setShowPasteImport(true);
            }
          }}
          disabled={showPasteImport && !importText.trim()}
        >
          {showPasteImport ? "Import pasted JSON" : "Import from paste"}
        </button>

        {ioMessage && (
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{ioMessage}</span>
        )}
      </div>
      {showPasteImport && (
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste exported route JSON here to import…"
          style={{
            width: "100%",
            maxWidth: 900,
            minHeight: 90,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid var(--border-main)",
            background: "var(--bg-panel)",
            color: "var(--text-main)",
            outline: "none",
            marginBottom: 14
          }}
        />
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <input
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#121212",
            color: "#eee",
            width: 260
          }}
          placeholder="Route name"
        />
        <button
          onClick={() => {
            clearPlan();
            setPlanName("My route");
            setSteps(initialSteps);
            setSelectedIndex(0);
          }}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#1f1f1f",
            color: "#eee",
            cursor: "pointer"
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Left: stats */}
        <div>
          <SkillsPanel levels={snapshot.levels} xp={snapshot.xp} />
          <div style={{ marginTop: 12, color: "#ffd700", fontWeight: 700 }}>
            Points: {snapshot.points}
          </div>
          <div style={{ marginTop: 8, color: "var(--text-muted)", fontSize: 13 }}>
            Time: {formatMinutes(minutesToSelected)} to selected • {formatMinutes(totalMinutes)} total
          </div>
          <div className="dmm-info">
            Combat lvl {snapshot.combatLevel} •
            Combat XP x{snapshot.combatXpMultiplier} •
            Skilling XP x{snapshot.skillingXpMultiplier} •
            Drops x{snapshot.dropMultiplier}
          </div>

        </div>


        {/* Middle: timeline */}
        <div style={{ minWidth: 360 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              onClick={addStep}
              className="osrs-button"
            >
              + Add step
            </button>
            <button
              onClick={() => moveSelectedStep(-1)}
              className="osrs-button"
              disabled={selectedIndex === 0}
            >
              ↑ Up
            </button>
            <button
              onClick={() => moveSelectedStep(1)}
              className="osrs-button"
              disabled={selectedIndex >= steps.length - 1}
            >
              ↓ Down
            </button>
            <button
              onClick={duplicateSelectedStep}
              className="osrs-button"
              disabled={steps.length === 0}
            >
              Duplicate
            </button>
            <button
              onClick={removeSelectedStep}
              className="osrs-button osrs-button-danger"
              disabled={steps.length === 0}
            >
              Remove
            </button>
          </div>

          <StepTimeline
            steps={steps}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onReorder={reorderSteps}
          />
        </div>

        {/* Right: editor */}
        <div style={{ flex: 1, minWidth: 520 }}>
          {selectedStep ? (
            <StepEditor
              step={selectedStep}
              onChange={updateSelectedStep}
              computedPoints={selectedStepPoints}
              breakdown={selectedBreakdown}
            />
          ) : (
            <div style={{ color: "#bbb" }}>Select a step to edit.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default App;
