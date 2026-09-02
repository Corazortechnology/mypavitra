import type { ReactNode } from "react";

interface StaticContentProps {
  children: ReactNode;
}

export function StaticContent({ children }: StaticContentProps) {
  return (
    <div className="container-main py-12 max-w-3xl prose prose-brown prose-headings:text-brown prose-headings:font-semibold prose-p:text-brown-light prose-p:leading-relaxed prose-a:text-saffron">
      {children}
    </div>
  );
}
