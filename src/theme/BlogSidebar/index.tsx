import React from 'react';
import Link from '@docusaurus/Link';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';

/**
 * Custom BlogSidebar component that removes year groupings
 */
export default function BlogSidebar({
  sidebar,
}: {
  sidebar: {
    title: string;
    items: readonly any[];
  };
}): React.JSX.Element | null {
  const items = useVisibleBlogSidebarItems([...sidebar.items]);

  if (items.length === 0) {
    return null;
  }

  // Flatten the sidebar items to remove year groupings
  const flattenedItems = items.flatMap((item) => {
    // If this is a category (year grouping), return its items instead
    if ('items' in item && Array.isArray(item.items)) {
      return item.items;
    }
    return [item];
  });

  return (
    <nav className="menu thin-scrollbar">
      <ul className="menu__list">
        {flattenedItems.map((item: any) => (
          <li key={item.permalink} className="menu__list-item">
            <Link
              isNavLink
              to={item.permalink}
              className="menu__link"
              activeClassName="menu__link--active">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
