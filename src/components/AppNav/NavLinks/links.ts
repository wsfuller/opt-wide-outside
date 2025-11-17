import { LuToilet } from 'react-icons/lu';
import {
  HiOutlineArchiveBox,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
  HiOutlineShieldCheck,
  HiOutlineTrophy,
  HiOutlineUserGroup,
} from 'react-icons/hi2';

import { Roles } from '@/lib/types';

interface Link {
  pathname: string;
  label: string;
  minimumAccessLevel?: Roles;
}

export interface NavLinks {
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  pathname: string;
  initiallyOpened?: boolean;
  links?: Link[];
  minimumAccessLevel?: Roles;
  disabled?: boolean;
}

/**
 * Roles via minimumAccessLevel, are individually applied to links and do not apply to the top level "parent" of nested links. This means dropdowns will always open and close even if all the children links have access level applied to them.
 * For client side render blocking on a page with minimumAccessLevel; on the page component you will need to use components/ContentState/NotAuthorized.tsx.
 */

export const links: NavLinks[] = [
  {
    label: 'Toilet Bowl',
    icon: LuToilet,
    pathname: '/app/toilet-bowl',
  },
  {
    label: 'Owners',
    icon: HiOutlineUserGroup,
    pathname: '/app/owners',
  },
  {
    label: 'Commissioner Awards',
    icon: HiOutlineHandThumbUp,
    pathname: '/app/commissioner-awards',
  },
  {
    label: 'Hall of Records',
    icon: HiOutlineTrophy,
    pathname: '/app/hall-of-records',
  },
  {
    label: 'Hall of Shame',
    icon: HiOutlineHandThumbDown,
    pathname: '/app/hall-of-shame',
  },
  {
    label: 'Archive',
    icon: HiOutlineArchiveBox,
    pathname: '/app/archive',
  },
  {
    label: 'Admin',
    icon: HiOutlineShieldCheck,
    pathname: '/admin',
    links: [
      {
        pathname: '/admin',
        label: 'Home',
      },
      {
        pathname: '/admin/owners',
        label: 'Owners',
      },
      {
        pathname: '/admin/toilet-bowl',
        label: 'Toilet Bowl',
      },
      {
        pathname: '/admin/commissioner-awards',
        label: 'Commissioner Awards',
      },
      {
        pathname: '/admin/hall-of-records',
        label: 'Hall of Records',
      },
      {
        pathname: '/admin/hall-of-shame',
        label: 'Hall of Shame',
      },
      {
        pathname: '/admin/nfl-teams',
        label: 'NFL Teams',
      },
      {
        pathname: '/admin/blog',
        label: 'Blog',
      },
    ],
  },
];
