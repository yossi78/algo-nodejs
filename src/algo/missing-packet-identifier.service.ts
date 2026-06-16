import { Injectable } from '@nestjs/common';

/**
 * זיהוי מזהה החבילה החסר — First Missing Positive / Missing Packet ID.
 *
 * מחזיר את המספר השלם החיובי הקטן ביותר (מ-1) שאינו מופיע במערך — לבקשת שידור חוזר.
 * עקרון שובך היונים: עם N איברים, התשובה תמיד בטווח 1..N+1.
 *
 * Time: O(N). Space: O(N).
 */
@Injectable()
export class MissingPacketIdentifierService {
  /**
   * @param packetIds מזהי פאקטים שנקלטו בפועל
   * @returns המספר החיובי הקטן ביותר שאינו מופיע ב-packetIds
   */
  solution(packetIds: number[] | null | undefined): number {
    if (packetIds == null || packetIds.length === 0) {
      return 1;
    }

    const n = packetIds.length;
    const present = new Array<boolean>(n + 1).fill(false);

    for (const id of packetIds) {
      if (id >= 1 && id <= n) {
        present[id] = true;
      }
    }

    for (let candidate = 1; candidate <= n; candidate++) {
      if (!present[candidate]) {
        return candidate;
      }
    }

    return n + 1;
  }
}

function main(): void {
  const service = new MissingPacketIdentifierService();
  const cases: Array<[number[], number]> = [
    [[1, 2, 0], 3],
    [[3, 4, -1, 1], 2],
    [[7, 8, 9, 11, 12], 1],
    [[1, 2, 3], 4],
    [[], 1],
  ];
  for (const [packetIds, expected] of cases) {
    const actual = service.solution(packetIds);
    console.log(
      `solution(${JSON.stringify(packetIds)}) = ${actual} (expected ${expected}) ${actual === expected ? 'PASS' : 'FAIL'}`,
    );
  }
}

if (require.main === module) {
  main();
}
