import { cx } from 'class-variance-authority';
import type { FC, HTMLAttributes } from 'react';

export const Paragraph: FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...rest }) => (
  <p {...rest} className={cx(className, 'typography', 'typography-p')} />
);
