import { Injectable } from '@nestjs/common';

/**
 * בתוך 10 שניות ניתן לקבל את אותו סוג התראה פעם אחת בלבד.
 * אם זה חוזר על עצמו בזמן קצר מ-10 שניות, מפולטר.
 * הפונקציה תחזיר את מספר ההתראות שנשמרו.
 */
@Injectable()
export class RateLimiterLogCleanerService {
  solution(
    timestamps: number[] | null | undefined,
    alerts: string[] | null | undefined,
  ): number {
    // פינת הגנה (Edge Case)
    if (timestamps == null || alerts == null || timestamps.length === 0) {
      return 0;
    }

    // מפה: מפתח = סוג התראה, ערך = הזמן האחרון שבו אושרה
    const lastApprovedTime = new Map<string, number>();
    let savedCount = 0;

    for (let i = 0; i < alerts.length; i++) {
      const currentAlert = alerts[i];
      const currentTime = timestamps[i];

      if (lastApprovedTime.has(currentAlert)) {
        const lastTime = lastApprovedTime.get(currentAlert) as number;
        // אם עברו פחות מ-10 שניות, נפלטר
        if (currentTime - lastTime < 10) {
          continue;
        }
      }

      lastApprovedTime.set(currentAlert, currentTime);
      savedCount++;
    }

    return savedCount;
  }
}

function main(): void {
  const service = new RateLimiterLogCleanerService();
  const cases: Array<[number[], string[], number]> = [
    [[1, 5, 11, 12], ['cpu', 'cpu', 'cpu', 'disk'], 3],
    [[0, 9, 10], ['a', 'a', 'a'], 2],
    [[], [], 0],
    [[1, 2, 3], ['x', 'y', 'z'], 3],
  ];
  for (const [timestamps, alerts, expected] of cases) {
    const actual = service.solution(timestamps, alerts);
    console.log(
      `solution(${JSON.stringify(timestamps)}, ${JSON.stringify(alerts)}) = ${actual} (expected ${expected}) ${actual === expected ? 'PASS' : 'FAIL'}`,
    );
  }
}

if (require.main === module) {
  main();
}
