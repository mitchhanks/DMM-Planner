import type { Step } from "../models/step";

type Props = {
  steps: Step[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function StepTimeline({ steps, selectedIndex, onSelect }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h2 style={{ margin: 0 }}>Route steps</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {steps.map((step, idx) => {
          const selected = idx === selectedIndex;

          const qp = step.events?.questPointsGained ?? 0;
          const manual = step.manualPointsAdjustment ?? 0;

          return (
            <button
              key={step.id}
              onClick={() => onSelect(idx)}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 8,
                border: selected ? "2px solid var(--gold)" : "1px solid var(--border-main)",
                background: selected ? "#2f2a10" : "var(--bg-panel)",
                color: "var(--text-main)",
                cursor: "pointer"
              }}
            >
              <div style={{ fontWeight: 700 }}>
                {idx + 1}. {step.name}
              </div>

              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                {step.category.toUpperCase()} • XP gains: {step.xpGains.length}
                {qp > 0 ? ` • QP +${qp}` : ""}
                {manual !== 0 ? ` • Manual ${manual > 0 ? "+" : ""}${manual}` : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
