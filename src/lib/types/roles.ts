export enum Roles {
  /** No access, implicit. */
  'NoAccess' = 0,
  /** Read only access. */
  'Reader' = 1,
  /** Read and write. */
  'Contributor1' = 2,
  /** Read, write and edit. */
  'Contributor2' = 3,
  /** Read, write, edit and delete. */
  'Editor' = 4,
  /** Total content administration access. */
  'Admin' = 5,
  /** Application Administrator, all access. */
  'SuperAdmin' = 6,
}
