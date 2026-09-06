// `Switch` already exists as `Form/Switch.tsx` (exported top-level today
// only as `FormSwitch`, via `export * from './Form'`) -- this re-exports it
// under a dedicated, discoverable `Switch` name instead of duplicating its
// implementation, matching the task's actual gap: a name, not missing code.
export { default as Switch } from '../Form/Switch';
export type { SwitchProps } from '../Form/Switch';
