import { getHintUtils } from '@epic-web/client-hints';
import { clientHint as colorSchemeHint, subscribeToSchemeChange } from '@epic-web/client-hints/color-scheme';
import { clientHint as reducedMotionHint, subscribeToMotionChange } from '@epic-web/client-hints/reduced-motion';
import { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone';
import { useEffect } from 'react';
import { useRevalidator } from 'react-router';

export const { getHints, getClientHintCheckScript } = getHintUtils({
  reducedMotion: reducedMotionHint,
  theme: colorSchemeHint,
  timeZone: timeZoneHint,
});

export function ClientHintCheck({ nonce }: { nonce?: string }) {
  const { revalidate } = useRevalidator();

  useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate]);
  useEffect(() => subscribeToMotionChange(() => revalidate()), [revalidate]);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: according to library guides
  return <script dangerouslySetInnerHTML={{ __html: getClientHintCheckScript() }} nonce={nonce} />;
}
