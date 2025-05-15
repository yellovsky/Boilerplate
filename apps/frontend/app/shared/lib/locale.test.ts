import { addLocaleLocaleToTo, getAnyLocaleFromTo, getLocaleFromTo, parseLocale, removeLocaleFromTo } from './locale';

describe('parseLocale', () => {
  it('returns locale for valid BCP47', () => {
    expect(parseLocale('en')).toBe('en');
    expect(parseLocale('en-US')).toBe('en-US');
    expect(parseLocale('zh-Hans')).toBe('zh-Hans');
  });

  it('returns null for invalid BCP47', () => {
    expect(parseLocale('invalid_locale')).toBeNull();
    expect(parseLocale('')).toBeNull();
    expect(parseLocale('123')).toBeNull();
  });
});

describe('getLocaleFromTo', () => {
  it('extracts locale from path string', () => {
    expect(getLocaleFromTo('/en/about')).toBe('en');
    expect(getLocaleFromTo('/ru/contact')).toBe('ru');
  });

  it('returns null for unknown or invalid locale', () => {
    expect(getLocaleFromTo('/invalid/path')).toBeNull();
    expect(getLocaleFromTo('/123/test')).toBeNull();
  });

  it('handles To object', () => {
    expect(getLocaleFromTo({ pathname: '/ru/home' })).toBe('ru');
    expect(getLocaleFromTo({ pathname: '/xx/home' })).toBeNull();
  });

  it('returns null when no pathname', () => {
    expect(getLocaleFromTo({})).toBeNull();
  });
});

describe('getAnyLocaleFromTo', () => {
  it('returns any BCP47 language tag', () => {
    expect(getAnyLocaleFromTo('/fr-CA/something')).toBe('fr-CA');
  });

  it('returns null for invalid tag', () => {
    expect(getAnyLocaleFromTo('/123/test')).toBeNull();
  });
});

describe('removeLocaleFromTo', () => {
  it('removes locale from string pathname', () => {
    expect(removeLocaleFromTo('/en/about')).toBe('/about');
    expect(removeLocaleFromTo('/ru/test')).toBe('/test');
  });

  it('keeps external paths untouched', () => {
    expect(removeLocaleFromTo('https://example.com')).toBe('https://example.com');
  });

  it('removes locale from To object', () => {
    expect(removeLocaleFromTo({ pathname: '/en/about' })).toEqual({ pathname: '/about' });
  });

  it('handles missing pathname in To object', () => {
    expect(removeLocaleFromTo({ search: '?q=1' })).toEqual({ search: '?q=1' });
  });
});

describe('addLocaleLocaleToTo', () => {
  it('adds locale to string pathname', () => {
    expect(addLocaleLocaleToTo('en', '/about')).toBe('/en/about');
    expect(addLocaleLocaleToTo('ru', '/ru/contact')).toBe('/ru/contact');
    expect(addLocaleLocaleToTo('ru', '/')).toBe('/ru/');
  });

  it('adds locale to To object', () => {
    expect(addLocaleLocaleToTo('ru', { pathname: '/contact' })).toEqual({
      pathname: '/ru/contact',
    });
    expect(addLocaleLocaleToTo('ru', { pathname: '/fr/about' })).toEqual({ pathname: '/ru/about' });
  });

  it('handles missing pathname in To object', () => {
    const to = { search: '?x=1' };
    expect(addLocaleLocaleToTo('en', to)).toEqual(to);
  });
});
