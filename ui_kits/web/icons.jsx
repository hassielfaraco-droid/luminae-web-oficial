/* ── Shared icons + small UI helpers ──────────────────────── */

const Stars = ({ rating, size=12 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return React.createElement('span', { style:{ color:'#B8975A', fontSize:size, letterSpacing:1 } },
    '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half?1:0))
  );
};

const SearchIcon = (p) => React.createElement('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, ...p },
  React.createElement('circle', { cx:11, cy:11, r:8 }),
  React.createElement('line', { x1:21, y1:21, x2:16.65, y2:16.65 })
);
const HeartIcon = ({ filled, ...p }) => React.createElement('svg', { width:18, height:18, viewBox:'0 0 24 24', fill: filled?'#B8975A':'none', stroke: filled?'#B8975A':'currentColor', strokeWidth:1.5, ...p },
  React.createElement('path', { d:'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' })
);
const BagIcon = (p) => React.createElement('svg', { width:18, height:18, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, ...p },
  React.createElement('path', { d:'M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' }),
  React.createElement('line', { x1:3, y1:6, x2:21, y2:6 }),
  React.createElement('path', { d:'M16 10a4 4 0 01-8 0' })
);
const UserIcon = (p) => React.createElement('svg', { width:18, height:18, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, ...p },
  React.createElement('path', { d:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' }),
  React.createElement('circle', { cx:12, cy:7, r:4 })
);
const ChevronRight = (p) => React.createElement('svg', { width:14, height:14, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, ...p },
  React.createElement('polyline', { points:'9 18 15 12 9 6' })
);
const FilterIcon = (p) => React.createElement('svg', { width:14, height:14, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round', ...p },
  React.createElement('polygon', { points:'22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' })
);
const XIcon = (p) => React.createElement('svg', { width:14, height:14, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, ...p },
  React.createElement('line', { x1:18, y1:6, x2:6, y2:18 }),
  React.createElement('line', { x1:6, y1:6, x2:18, y2:18 })
);

Object.assign(window, { Stars, SearchIcon, HeartIcon, BagIcon, UserIcon, ChevronRight, FilterIcon, XIcon });
