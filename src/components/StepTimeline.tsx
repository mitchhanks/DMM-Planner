import type { Step } from "../models/step";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  steps: Step[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onReorder: (activeId: string, overId: string) => void;
  pointsTimeline: number[];
};

export function StepTimeline({ steps, selectedIndex, onSelect, onReorder, pointsTimeline }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const activeId = String(event.active.id);
    const overId = event.over?.id ? String(event.over.id) : null;
    if (!overId || activeId === overId) return;

    onReorder(activeId, overId);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h2 style={{ margin: 0 }}>Route steps</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {steps.map((step, idx) => (
              <SortableStepRow
                key={step.id}
                step={step}
                index={idx}
                selected={idx === selectedIndex}
                onSelect={() => onSelect(idx)}
                runningPoints={pointsTimeline[idx] ?? 0}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableStepRow({
  step,
  index,
  selected,
  onSelect,
  runningPoints
}: {
  step: Step;
  index: number;
  selected: boolean;
  onSelect: () => void;
  runningPoints: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id: step.id
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
    filter: isDragging ? "brightness(1.05)" : "none"
  };

  const qp = step.events?.questPointsGained ?? 0;
  const manual = step.manualPointsAdjustment ?? 0;
  const isNegative = runningPoints < 0;

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 8
        }}
      >
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          style={{
            width: 38,
            borderRadius: 8,
            border: isOver
              ? "2px solid var(--dmm-red-bright)"
              : selected
                ? "2px solid var(--gold)"
                : "1px solid var(--border-main)",

            background: isOver
              ? "#1a0b0b"
              : selected
                ? "#2f2a10"
                : "var(--bg-panel)",

            color: "var(--text-main)",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none"
          }}
          title="Drag to reorder"
        >
          ☰
        </button>

        {/* Clickable step body */}
        <button
          type="button"
          onClick={onSelect}
          style={{
            flex: 1,
            textAlign: "left",
            padding: "10px 12px",
            borderRadius: 8,
            border: isNegative
              ? "2px solid var(--dmm-red-bright)"
              : selected
                ? "2px solid var(--gold)"
                : "1px solid var(--border-main)",

            background: isNegative
              ? "#1a0b0b"
              : selected
                ? "#2f2a10"
                : "var(--bg-panel)",
            color: "var(--text-main)",
            cursor: "pointer"
          }}
        >
          <div style={{ fontWeight: 700 }}>
            {index + 1}. {step.name}
          </div>

          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            {step.category.toUpperCase()} • XP gains: {step.xpGains.length}
            {qp > 0 ? ` • QP +${qp}` : ""}
            {manual !== 0 ? ` • Manual ${manual > 0 ? "+" : ""}${manual}` : ""}
          </div>
        </button>
      </div>
    </div>
  );
}
