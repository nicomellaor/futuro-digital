export type ArchitectureIconName = 'user' | 'frontend' | 'api' | 'backend' | 'database' | 'algorithm'

export function ArchitectureIcon({ name }: { name: ArchitectureIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'user' && <>
        <circle cx="12" cy="7.5" r="3.5" />
        <path d="M4.5 20v-1.5a7.5 7.5 0 0 1 15 0V20H4.5Z" />
      </>}
      {name === 'frontend' && <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M4 8h16M8 5.5h.01M11 5.5h.01M8 12h8M8 16h5" />
      </>}
      {name === 'api' && <>
        <circle cx="5" cy="12" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="19" cy="19" r="2" />
        <path d="m7 11 10-5M7 13l10 5" />
      </>}
      {name === 'backend' && <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01m-3 7 2 2-2 2m5 0h5" />
      </>}
      {name === 'database' && <>
        <ellipse cx="12" cy="5.5" rx="8" ry="3" />
        <path d="M4 5.5v12c0 1.7 3.6 3 8 3s8-1.3 8-3v-12M4 11.5c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>}
      {name === 'algorithm' && <>
        <rect x="2.5" y="3" width="19" height="18" rx="2" />
        <circle cx="7" cy="8" r="1" /><circle cx="17" cy="8" r="1" /><circle cx="12" cy="16" r="1" />
        <path d="m8 8 8 0m-8.5 1 4 6m5-6-4 6" />
      </>}
    </svg>
  )
}
