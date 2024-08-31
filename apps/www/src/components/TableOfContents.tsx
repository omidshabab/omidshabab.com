import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
     content: string;
}

interface Heading {
     id: string;
     text: string;
     level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
     const [headings, setHeadings] = useState<Heading[]>([]);

     useEffect(() => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, 'text/html');
          const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

          const newHeadings: Heading[] = [];
          headingElements.forEach((heading) => {
               const id = heading.id || (heading.textContent ? heading.textContent.replace(/\s+/g, '-').toLowerCase() : '');
               if (id && heading.textContent) {
                    heading.id = id; // Set the ID directly on the heading
                    newHeadings.push({
                         id,
                         text: heading.textContent,
                         level: parseInt(heading.tagName.replace('H', ''), 10),
                    });
               }
          });

          setHeadings(newHeadings);
     }, [content]);

     // Add smooth scrolling via CSS
     useEffect(() => {
          document.documentElement.style.scrollBehavior = 'smooth';

          // Handle clicks for offset scrolling
          const handleClick = (event: MouseEvent) => {
               const target = event.target as HTMLAnchorElement;
               if (target && target.tagName === 'A' && target.hash) {
                    event.preventDefault(); // Prevent the default jump behavior
                    const elementId = target.hash.substring(1);
                    const targetElement = document.getElementById(elementId);

                    if (targetElement) {
                         const offset = 90; // Offset from the top
                         const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                         const offsetPosition = elementPosition - offset;

                         window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                         });
                    }
               }
          };

          document.addEventListener('click', handleClick);

          // Cleanup event listener on component unmount
          return () => {
               document.removeEventListener('click', handleClick);
          };
     }, []);

     return (
          <nav className="toc">
               <ul className="text-[16px]">
                    {headings.map((heading) => (
                         <li key={heading.id} className="flex gap-x-[10px]">
                              <a
                                   href={`#${heading.id}`}
                                   className="text-slate-600 hover:text-text transition-all duration-500 no-underline font-light leading-[1.65rem] cursor-pointer"
                              >
                                   - {heading.text}
                              </a>
                         </li>
                    ))}
               </ul>
          </nav>
     );
};

export default TableOfContents;
