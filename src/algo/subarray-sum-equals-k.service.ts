import { Injectable } from '@nestjs/common';

/**
 * Subarray Sum Equals K — איזון עומסי שרתים.
 *
 * סופר כמה תתי-מערכים רציפים שסכומם שווה בדיוק ל-k.
 * Prefix Sum + Map (לא Sliding Window — מספרים שליליים שוברים את החלון הקלאסי).
 *
 * Time: O(N). Space: O(N).
 */
@Injectable()
export class SubarraySumEqualsKService {
  /**
   * @param packets זרם פאקטים (מספרים חיוביים, שליליים או אפס)
   * @param k סכום מטרה
   * @returns מספר תתי-מערכים רציפים שסכומם שווה בדיוק ל-k
   */
  solution(packets: number[] | null | undefined, k: number): number {
    if (packets == null || packets.length === 0) {
      return 0;
    }

    const prefixCount = new Map<number, number>();
    prefixCount.set(0, 1);

    let count = 0;
    let currentSum = 0;

    for (const packet of packets) {
      currentSum += packet;
      count += prefixCount.get(currentSum - k) ?? 0;
      prefixCount.set(currentSum, (prefixCount.get(currentSum) ?? 0) + 1);
    }

    return count;
  }
}
