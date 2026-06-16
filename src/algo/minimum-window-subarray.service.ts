import { Injectable } from '@nestjs/common';

/**
 * Smallest Subarray with All Target Logs — זיהוי רצף הלוגים הקצר ביותר.
 *
 * מוצא את אורך תת-המערך הרציף הקצר ביותר שמכיל את כל איברי targets
 * לפחות פעם אחת (לפי תדירות ב-targets).
 *
 * Time: O(N) — כל מצביע נע רק קדימה.
 * Space: O(M) — M = מספר ערכים ייחודיים ב-targets.
 */
@Injectable()
export class MinimumWindowSubarrayService {
  /**
   * @param logs רצף אירועי מערכת
   * @param targets חתימת תקיפה — אירועים שחייבים להופיע בחלון
   * @returns אורך החלון המינימלי, או 0 אם אין חלון תקף
   */
  solution(
    logs: number[] | null | undefined,
    targets: number[] | null | undefined,
  ): number {
    if (
      logs == null ||
      targets == null ||
      targets.length === 0 ||
      logs.length === 0
    ) {
      return 0;
    }

    const need = new Map<number, number>();
    for (const target of targets) {
      need.set(target, (need.get(target) ?? 0) + 1);
    }

    const required = need.size;
    const inWindow = new Map<number, number>();
    let satisfied = 0;
    let left = 0;
    let minLen = Number.MAX_SAFE_INTEGER;

    for (let right = 0; right < logs.length; right++) {
      const log = logs[right];
      if (need.has(log)) {
        const count = (inWindow.get(log) ?? 0) + 1;
        inWindow.set(log, count);
        if (count === need.get(log)) {
          satisfied++;
        }
      }

      while (satisfied === required) {
        minLen = Math.min(minLen, right - left + 1);

        const outgoing = logs[left];
        if (need.has(outgoing)) {
          if (inWindow.get(outgoing) === need.get(outgoing)) {
            satisfied--;
          }
          const remaining = (inWindow.get(outgoing) as number) - 1;
          if (remaining === 0) {
            inWindow.delete(outgoing);
          } else {
            inWindow.set(outgoing, remaining);
          }
        }
        left++;
      }
    }

    return minLen === Number.MAX_SAFE_INTEGER ? 0 : minLen;
  }
}

function main(): void {
  const service = new MinimumWindowSubarrayService();
  const cases: Array<[number[], number[], number]> = [
    [[1, 2, 3, 2, 1], [2, 1], 2],
    [[1, 2, 3, 4, 5], [3], 1],
    [[1, 2, 3], [4], 0],
    [[7, 1, 2, 1, 3, 1], [1, 1], 3],
    [[], [1], 0],
  ];
  for (const [logs, targets, expected] of cases) {
    const actual = service.solution(logs, targets);
    console.log(
      `solution(${JSON.stringify(logs)}, ${JSON.stringify(targets)}) = ${actual} (expected ${expected}) ${actual === expected ? 'PASS' : 'FAIL'}`,
    );
  }
}

if (require.main === module) {
  main();
}
