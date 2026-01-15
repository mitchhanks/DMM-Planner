import { SKILL_ICONS } from "../data/skillIcons";
import { SKILL_DISPLAY_ORDER } from "../data/skillOrder";
import { calculateCombatLevel } from "../engine/combat";
import SkillTile from "./SkillTile";


console.log("SkillsPanel loaded");

type Props = {
  levels: Record<string, number>;
  xp: Record<string, number>;
};

export function SkillsPanel({ levels, xp }: Props) {
  const combatLevel = calculateCombatLevel({
    attack: levels.attack,
    strength: levels.strength,
    defence: levels.defence,
    hitpoints: levels.hitpoints,
    prayer: levels.prayer,
    ranged: levels.ranged,
    magic: levels.magic
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 64px)",
        gap: 8
      }}
    >
      {SKILL_DISPLAY_ORDER.map((key) => {
        if (key === "combat") {
          return (
            <SkillTile
              key="combat"
              name="combat"
              icon={SKILL_ICONS.combat}
              level={combatLevel}
              tooltipLines={[
                `Atk ${levels.attack} / Str ${levels.strength}`,
                `Def ${levels.defence} / HP ${levels.hitpoints}`,
                `Pray ${levels.prayer} / Rng ${levels.ranged} / Mag ${levels.magic}`
              ]}
            />
          );
        }

        return (
          <SkillTile
            key={key}
            name={key}
            icon={(SKILL_ICONS as any)[key]}
            level={levels[key] ?? 1}
            xp={xp[key] ?? 0}
            tooltipLines={[]}
          />
        );
      })}
    </div>
  );
}
