import React from "react";

export const customIcons = {
  search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
        clipRule="evenodd"
      />
    </svg>
  ),
  listMedium: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M24 6H0V4h24zm0 12v2H0v-2zM0 13h12v-2H0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  gridFillMedium: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1 3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm0 10a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm12-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1zm1 9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  chevronDownMedium: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 15.586 7.293-7.293 1.414 1.414-8 8a1 1 0 0 1-1.414 0l-8-8 1.414-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
  chevronUpMedium: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 8.414 7.293 7.293 1.414-1.414-8-8a1 1 0 0 0-1.414 0l-8 8 1.414 1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
} as const;
