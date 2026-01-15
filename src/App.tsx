import { useEffect, useMemo, useState } from "react";
import { SkillsPanel } from "./components/SkillsPanel";
import { StepTimeline } from "./components/StepTimeline";
import { simulateSteps } from "./engine/simulator";
import { StepEditor } from "./components/StepEditor";
import type { Step } from "./models/step";
import { clearPlan, loadPlan, savePlan } from "./store/storage";


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



  const selectedStep = steps[selectedIndex];

  function updateSelectedStep(next: Step) {
    setSteps((prev) => prev.map((s, i) => (i === selectedIndex ? next : s)));
  }

  const snapshot = useMemo(() => {
    return simulateSteps(steps, selectedIndex);
  }, [steps, selectedIndex]);
  const selectedStepPoints = snapshot.stepPoints[selectedIndex] ?? 0;
  const selectedBreakdown = snapshot.stepPointsBreakdown?.[selectedIndex];



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
              onClick={removeSelectedStep}
              className="osrs-button osrs-button-danger"
              disabled={steps.length === 0}
            >
              Remove step
            </button>
          </div>

          <StepTimeline
            steps={steps}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
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

export default App;
