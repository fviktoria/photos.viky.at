import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing.config';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
