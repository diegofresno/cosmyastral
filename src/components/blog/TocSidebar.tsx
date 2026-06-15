'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
}

export default function TocSidebar({ contentId }: { contentId: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;
    const headings = Array.from(container.querySelectorAll('h2[id]')) as HTMLElement[];
    setItems(headings.map((h) => ({ id: h.id, text: h.textContent ?? '' })));
  }, [contentId]);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-10% 0% -70% 0%', threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="toc-sidebar">
      {items.length > 0 && (
        <>
          <div className="toc__label">Contenido</div>
          <ul className="toc__list">
            {items.map(({ id, text }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`toc__link${activeId === id ? ' is-active' : ''}`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
