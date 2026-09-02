import type { ReactNode } from "react";

export function renderGuideContent(content: string) {
  const blocks = content.split(/\n(?=## )/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      const lines = trimmed.split("\n");
      const heading = lines[0]!.replace(/^## /, "");
      const body = lines.slice(1).join("\n").trim();

      return (
        <section key={index} className="mb-8">
          <h2 className="text-xl font-semibold text-brown mb-3">{heading}</h2>
          {body && (
            <div className="text-brown-light leading-relaxed whitespace-pre-wrap">
              {renderBody(body)}
            </div>
          )}
        </section>
      );
    }

    return (
      <div
        key={index}
        className="text-brown-light leading-relaxed whitespace-pre-wrap mb-6"
      >
        {renderBody(trimmed)}
      </div>
    );
  });
}

function renderBody(text: string) {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1 my-3">
        {listItems.map((item, i) => (
          <li key={i}>{formatInline(item.replace(/^[-*\d.]+\s*/, ""))}</li>
        ))}
      </ul>
    );
    listItems = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-lg font-medium text-brown mt-4 mb-2">
          {trimmed.replace(/^### /, "")}
        </h3>
      );
      continue;
    }

    if (/^[-*\d.]+\s/.test(trimmed)) {
      listItems.push(trimmed);
      continue;
    }

    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="mb-3">
        {formatInline(trimmed)}
      </p>
    );
  }

  flushList();
  return elements;
}

function formatInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-brown">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
