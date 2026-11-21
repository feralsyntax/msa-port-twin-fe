import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './TopBar.scss';

export interface TopBarBreadcrumb {
  label: string;
  to: string;
}

interface TopBarProps {
  title?: string;
  breadcrumb?: TopBarBreadcrumb;
  current?: string;
  sector?: ReactNode;
  searchPlaceholder?: string;
  showSearch?: boolean;
  action?: ReactNode;
  className?: string;
}

const TopBar = ({
  title,
  breadcrumb,
  current,
  sector,
  searchPlaceholder,
  showSearch = true,
  action,
  className = '',
}: TopBarProps) => {
  return (
    <header className={`app-topbar ${className}`.trim()}>
      <div className="app-topbar__left">
        {breadcrumb ? (
          <nav className="app-topbar__breadcrumb" aria-label="Breadcrumb">
            <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
            {current && (
              <>
                <span aria-hidden="true">/</span>
                <span className="app-topbar__current">{current}</span>
              </>
            )}
          </nav>
        ) : (
          <div className="app-topbar__title-group">
            {title && <h1 className="app-topbar__title">{title}</h1>}
            {sector && <div className="app-topbar__sector">{sector}</div>}
          </div>
        )}
      </div>

      {(showSearch || action) && (
        <div className="app-topbar__right">
          {showSearch && (
            <div className="app-topbar__search" role="search">
              <span className="material-symbols-outlined app-topbar__search-icon">search</span>
              <input
                type="text"
                className="app-topbar__search-input"
                placeholder={searchPlaceholder ?? 'Search...'}
              />
              <kbd className="app-topbar__search-kbd">⌘K</kbd>
            </div>
          )}
          {action}
        </div>
      )}
    </header>
  );
};

export default TopBar;
