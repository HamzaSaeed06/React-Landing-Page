/** Allowed topic slugs — must match `public/data/curriculum.json` only. */
export const MODULE_IDS = [
  'intro',
  'components',
  'state-forms',
  'depth',
  'effects',
  'advanced',
  'class',
  'spa',
]

export function isValidTopicId(id) {
  return typeof id === 'string' && MODULE_IDS.includes(id)
}
