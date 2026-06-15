// Pythagorean numerology — classic Western system
// All functions take year/month/day as numbers to avoid timezone ambiguity

const TABLE: Record<string, number> = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8,
};

const VOWELS  = new Set(['A', 'E', 'I', 'O', 'U']);
const MASTERS = new Set([11, 22, 33]);
const KARMIC  = new Set([13, 14, 16, 19]);

export function reduce(n: number): number {
  if (MASTERS.has(n) || n <= 9) return n;
  let s = 0;
  for (const c of String(n)) s += Number(c);
  return reduce(s);
}

function digitSum(str: string): number {
  let s = 0;
  for (const c of str) if (c >= '0' && c <= '9') s += Number(c);
  return s;
}

function cleanName(raw: string): string {
  return raw
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics (á→A, ñ→N, ü→U…)
    .replace(/[^A-Z]/g, '');
}

function letterSum(letters: string[]): number {
  return letters.reduce((s, c) => s + (TABLE[c] ?? 0), 0);
}

export function lifePath(year: number, month: number, day: number): number {
  const str = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
  return reduce(digitSum(str));
}

export function expression(fullName: string): number {
  return reduce(letterSum(cleanName(fullName).split('')));
}

export function soul(fullName: string): number {
  return reduce(letterSum(cleanName(fullName).split('').filter(c => VOWELS.has(c))));
}

export function personality(fullName: string): number {
  return reduce(letterSum(cleanName(fullName).split('').filter(c => !VOWELS.has(c))));
}

export function personalYear(year: number, month: number, day: number, currentYear: number): number {
  const str = `${currentYear}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
  return reduce(digitSum(str));
}

export function destiny(fullName: string, year: number, month: number, day: number): number {
  const dateStr = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
  const nameSum = letterSum(cleanName(fullName).split(''));
  return reduce(digitSum(dateStr) + nameSum);
}

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soul: number;
  personality: number;
  personalYear: number;
  destiny: number;
  isMaster: boolean;
  isKarmic: boolean;
}

export function calcNumerology(
  nombre: string,
  apellidos: string,
  year: number,
  month: number,
  day: number,
  currentYear: number
): NumerologyResult {
  const fullName = `${nombre} ${apellidos}`;
  const lp = lifePath(year, month, day);
  return {
    lifePath:    lp,
    expression:  expression(fullName),
    soul:        soul(fullName),
    personality: personality(fullName),
    personalYear: personalYear(year, month, day, currentYear),
    destiny:     destiny(fullName, year, month, day),
    isMaster:    MASTERS.has(lp),
    isKarmic:    KARMIC.has(day), // kármic if born on day 13, 14, 16 or 19
  };
}
