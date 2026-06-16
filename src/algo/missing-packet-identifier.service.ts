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
