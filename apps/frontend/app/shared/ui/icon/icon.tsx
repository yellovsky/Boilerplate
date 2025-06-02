import { cx } from 'class-variance-authority';
import type { SVGProps } from 'react';

import spriteHref from '../../../library/icon/icons/icon.svg';
import type { IconName } from '../../../library/icon/icons/types';

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: icons are presenataion images
    <svg {...props} className={cx(className, 'pointer-events-none')}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
