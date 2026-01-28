import React from "react";

export function renderNotes(text: string): React.ReactNode {
  const parts = text.split(/(\s+)/);

  return parts.map((part, i) => {
    const isUrl = /^https?:\/\/\S+$/i.test(part);
    if (!isUrl) return <span key={i}>{part}</span>;

    return (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "var(--gold)",
          textDecoration: "underline",
          overflowWrap: "anywhere",
          wordBreak: "break-word"
        }}
      >
        {part}
      </a>
    );
  });
}
