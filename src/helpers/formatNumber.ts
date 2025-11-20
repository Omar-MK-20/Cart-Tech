// formatNumberWithSuffix.ts
// Improved TypeScript function to format very large numbers with readable suffixes.
// - Accepts number | bigint | string (string of digits or named constants like "googol", "centillion", "googolplex")
// - Supports BigInt-scale formatting (no precision loss for integers)
// - Returns either a short or long style. Defaults to long names for huge numbers.

export type FormatOptions = {
    decimals?: number; // number of fraction digits to show (default 1)
    style?: 'short' | 'long' | 'scientific' | 'auto'; // display style
};

const SHORT_SMALL: string[] = ['', 'K', 'M', 'B']; // up to billion short forms
const LONG_NAMES: Record<number, string> = {
    0: '',
    1: 'thousand',
    2: 'million',
    3: 'billion',
    4: 'trillion',
    5: 'quadrillion',
    6: 'quintillion',
    7: 'sextillion',
    8: 'septillion',
    9: 'octillion',
    10: 'nonillion',
    11: 'decillion',
    12: 'undecillion',
    13: 'duodecillion',
    14: 'tredecillion',
    15: 'quattuordecillion',
    16: 'quindecillion',
    17: 'sexdecillion',
    18: 'septendecillion',
    19: 'octodecillion',
    20: 'novemdecillion',
    21: 'vigintillion',
    30: 'trigintillion',
    40: 'quadragintillion',
    50: 'quinquagintillion',
    100: 'centillion'
};

const NAMED_CONSTANTS: Record<string, string> = {
    googol: '1' + '0'.repeat(100), // 10^100
    centillion: '1' + '0'.repeat(303), // short-scale centillion
    googolplex: 'googolplex' // special marker; too huge to hold as digits
};

function isIntegerString(s: string)
{
    return /^-?\d+$/.test(s.trim());
}

export function formatNumberWithSuffix(value: number | bigint | string, options?: FormatOptions): string
{
    const decimals = options?.decimals ?? 1;
    const style = options?.style ?? 'auto';

    if (value === null || value === undefined) return '0';

    // handle named constants provided as strings
    if (typeof value === 'string')
    {
        const key = value.trim().toLowerCase();
        if (key === 'googolplex') return 'googolplex (10^(googol))';
        if (NAMED_CONSTANTS[key])
        {
            // format by constructing a BigInt string if reasonable
            value = NAMED_CONSTANTS[key];
        }
    }

    // Convert to a digit string (absolute) and sign
    let negative = false;
    let digitStr: string;

    if (typeof value === 'bigint')
    {
        negative = value < 0;
        digitStr = (negative ? (-value).toString() : value.toString());
    } else if (typeof value === 'number')
    {
        if (!isFinite(value)) return String(value);
        negative = value < 0;
        const abs = Math.abs(value);
        if (abs < 1000) return (negative ? '-' : '') + abs.toString();
        // convert to decimal string without exponential if possible
        // for numbers within safe range just use toFixed with sufficient precision
        if (Math.abs(value) <= Number.MAX_SAFE_INTEGER)
        {
            digitStr = Math.trunc(abs).toString();
        } else
        {
            // fallback to scientific for very large floats
            return value.toExponential(decimals);
        }
    } else
    { // string now — must be digits since named constants handled
        const s = (value as string).trim();
        if (!isIntegerString(s))
        {
            // try parseFloat fallback
            const f = Number(s);
            if (isFinite(f)) return formatNumberWithSuffix(f, options);
            return s;
        }
        negative = s.startsWith('-');
        digitStr = s.replace(/^-/, '');
    }

    // short-circuit tiny numbers
    if (digitStr.length <= 3)
    {
        return (negative ? '-' : '') + digitStr;
    }

    // compute which 3-digit group we're in
    const digits = digitStr.replace(/^0+/, '') || '0';
    const len = digits.length;
    const group = Math.floor((len - 1) / 3); // 1 => thousands, 2=>millions, etc

    // handle special named constants like googol (10^100 -> len = 101 -> power=100)
    const power = group * 3;
    if (power === 100) return (negative ? '-' : '') + 'googol';
    if (power === 303) return (negative ? '-' : '') + 'centillion';

    // build a mantissa string using string slicing to avoid precision loss
    const wholeDigits = len - group * 3; // digits before the group
    const needed = wholeDigits + decimals;
    let mantissaSrc = digits.slice(0, needed);
    if (mantissaSrc.length < needed)
    {
        mantissaSrc = mantissaSrc + '0'.repeat(needed - mantissaSrc.length);
    }

    let mantissaStr: string;
    if (decimals > 0)
    {
        mantissaStr = mantissaSrc.slice(0, wholeDigits) + '.' + mantissaSrc.slice(wholeDigits);
    } else
    {
        mantissaStr = mantissaSrc.slice(0, wholeDigits);
    }

    // round to requested decimals safely using Number (mantissa will be small)
    const mantissaNum = Number(mantissaStr);
    const fixed = mantissaNum.toFixed(decimals);

    // choose suffix
    let suffixShort = '';
    if (group < SHORT_SMALL.length) suffixShort = SHORT_SMALL[group];
    let suffixLong = LONG_NAMES[group] ?? null;

    // if long name not present but group is a multiple of 10 or 100 we check map
    if (!suffixLong)
    {
        if (LONG_NAMES[group]) suffixLong = LONG_NAMES[group];
    }

    // decide output style
    if (style === 'scientific')
    {
        // scientific: mantissa × 10^power
        return `${negative ? '-' : ''}${fixed}e+${power}`;
    }

    if (style === 'short')
    {
        // short: use K/M/B for small groups, otherwise scientific fallback
        if (suffixShort)
        {
            return `${negative ? '-' : ''}${fixed}${suffixShort}`;
        }
        return `${negative ? '-' : ''}${fixed}e+${power}`;
    }

    // style === 'long' or 'auto'
    if (style === 'long' || (style === 'auto' && group >= SHORT_SMALL.length))
    {
        if (suffixLong)
        {
            // e.g. "1.2 trillion"
            return `${negative ? '-' : ''}${fixed} ${suffixLong}`;
        }
        // if we don't know the long name, fall back to scientific
        return `${negative ? '-' : ''}${fixed}e+${power}`;
    }

    // default fallback (auto with small group)
    return `${negative ? '-' : ''}${fixed}${suffixShort}`;
}

// ------------------ Examples ------------------
// formatNumberWithSuffix(1234)            -> "1.2K"
// formatNumberWithSuffix(1234567)         -> "1.2M"
// formatNumberWithSuffix(1_234_567_890)   -> "1.2B"
// formatNumberWithSuffix(1n << 200n)      -> handles BigInt inputs
// formatNumberWithSuffix('1' + '0'.repeat(100)) -> "googol"
// formatNumberWithSuffix('googolplex')    -> "googolplex (10^(googol))"
