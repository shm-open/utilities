function toVersionNumber(segment: string) {
    const num = parseInt(segment, 10);
    if (Number.isNaN(num)) {
        return 0;
    }
    return num;
}

function getVersionSegment(version: string, index: number) {
    const segments = version.split('.');
    return toVersionNumber(segments[index]);
}

/**
 * get major version number from version string
 * @param version
 */
export function getMajorVersion(version: string): number {
    return getVersionSegment(version, 0);
}

/**
 * get minor version number from version string
 * @param version
 */
export function getMinorVersion(version: string): number {
    return getVersionSegment(version, 1);
}

/**
 * get patch version number from version string
 * @param version
 */
export function getPatchVersion(version: string): number {
    return getVersionSegment(version, 2);
}

/**
 * compare 2 version number
 * @param version1
 * @param version2
 * @param digitsLimit limit the comparsion to only n digits, defaults to 3
 */
export function compareVersion(version1: string, version2: string, digitsLimit = 3): 1 | 0 | -1 {
    const segments1 = version1.split('.');
    const segments2 = version2.split('.');
    const len = Math.min(
        Math.max(segments1.length, segments2.length),
        digitsLimit || Number.MAX_SAFE_INTEGER,
    );
    for (let i = 0; i < len; i += 1) {
        const seg1 = segments1[i];
        const seg2 = segments2[i];
        if (seg1 !== seg2) {
            const v1 = toVersionNumber(seg1);
            const v2 = toVersionNumber(seg2);
            if (v1 !== v2) {
                return v1 < v2 ? -1 : 1;
            }
        }
    }

    return 0;
}

/**
 * Helper class for simplify the version compare
 */
class VersionComparer {
    constructor(private version: string, private digitsLimit) {}

    /**
     * is above target version
     * @param target target version to compare with
     */
    isAbove(target: string): boolean {
        return compareVersion(this.version, target, this.digitsLimit) > 0;
    }

    /**
     * is above or equal to target version
     * @param target target version to compare with
     */
    isAboveOrEqualTo(target: string): boolean {
        return compareVersion(this.version, target, this.digitsLimit) >= 0;
    }

    /**
     * is equal to target version
     * @param target target version to compare with
     */
    isEqualTo(target: string): boolean {
        return compareVersion(this.version, target, this.digitsLimit) === 0;
    }

    /**
     * is below target version
     * @param target target version to compare with
     */
    isBelow(target: string): boolean {
        return compareVersion(this.version, target, this.digitsLimit) < 0;
    }

    /**
     * is below or equal to target version
     * @param target target version to compare with
     */
    isBelowOrEqualTo(target: string): boolean {
        return compareVersion(this.version, target, this.digitsLimit) <= 0;
    }
}

/**
 * create a version comparer based on given version and digitsLimit
 * @param ver
 * @param digitsLimit
 */
export const version = (ver: string, digitsLimit = 3): VersionComparer =>
    new VersionComparer(ver, digitsLimit);
