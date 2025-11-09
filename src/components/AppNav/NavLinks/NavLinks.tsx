import { Box } from '@mantine/core';

import NavLink from './NavLink';
import NestedNavLinks from './NestedNavLinks';
import { links } from './links';

import { Roles } from '@/lib/types';

/** Top level, determine whether a NavLink or NestedNavLink will render */
// TODO: add unit tests for NavLinks https://tedconferences.atlassian.net/browse/MPP-4063
function NavLinks() {
  // const { data: session } = useSession();
  const session = {
    user: {
      roles: Roles.Admin,
    },
  };

  return (
    <Box mih={220}>
      {links.map((link) => {
        const isUserDeniedAccess =
          (link.minimumAccessLevel &&
            session?.user?.roles < link.minimumAccessLevel) ||
          false;

        if (link?.links && link.links.length > 0) {
          return <NestedNavLinks key={link.label} {...link} />;
        }

        return (
          <NavLink
            key={link.label}
            label={link.label}
            pathname={link.pathname}
            icon={link?.icon || undefined}
            disabled={isUserDeniedAccess}
          />
        );
      })}
    </Box>
  );
}

export default NavLinks;
