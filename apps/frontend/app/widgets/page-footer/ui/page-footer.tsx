import type { FC } from 'react';

interface PageFooterProps {
  className?: string;
}

export const PageFooter: FC<PageFooterProps> = ({ className }) => {
  return <div className={className}>Page footer</div>;
};
