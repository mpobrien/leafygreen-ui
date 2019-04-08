import React from 'react';

export const DownArrow = ({ fill, style }) => (
  <svg
    style={style}
    width="8px"
    height="4px"
    viewBox="0 0 8 4"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        d="M7.49994007,1 L0.50005993,1 C0.3645691,1 0.247393024,1.0439804 0.148435814,1.13194119 C0.0494786048,1.21998722 0,1.32414234 0,1.4444918 C0,1.56484125 0.0494786048,1.66899638 0.148435814,1.75695717 L3.64837588,4.86797358 C3.74742898,4.95593437 3.86460506,5 4,5 C4.13539494,5 4.25266691,4.95593437 4.35152823,4.86797358 L7.8514683,1.75695717 C7.95032962,1.66899638 8,1.56484125 8,1.4444918 C8,1.32414234 7.95032962,1.21998722 7.8514683,1.13194119 C7.75260698,1.0439804 7.63533501,1 7.49994007,1 Z"
        id="path-1"
      />
    </defs>
    <g
      id="Navigation"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="mdb_shared-nav-element_hover_1g"
        transform="translate(-203.000000, -27.000000)"
        fill="#000000"
      >
        <g id="Group-3" transform="translate(129.000000, 14.000000)">
          <g id="icon-/-ic_caret" transform="translate(74.000000, 12.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkhhref="#path-1" />
            </mask>
            <use id="Shape" fill={fill} xlinkHref="#path-1" />
            <g id="#9FA1A2" fill="none" mask="url(#mask-2)">
              <g transform="translate(-1.000000, -2.000000)" fill="#9FA1A2">
                <rect x="0" y="0" width="10" height="10" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
