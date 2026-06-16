/**
 * משימה עם עדיפות וחותמת זמן.
 *
 * הסדר נקבע קודם לפי עדיפות (גבוהה יותר קודמת — Max-Heap), ואז לפי זמן
 * ההכנסה (מוקדם יותר קודם) כדי לשמור על הוגנות בין משימות בעלות אותה עדיפות.
 */
export class Task {
  readonly timestamp: bigint;

  constructor(
    readonly taskId: number,
    readonly priority: number,
  ) {
    // hrtime.bigint() נותן רזולוציית ננו-שניות, בדומה ל-Instant.now() ב-Java.
    this.timestamp = process.hrtime.bigint();
  }

  /**
   * Comparator contract (negative => `this` comes out first).
   * עדיפות גבוהה קודמת; בשוויון — הזמן המוקדם קודם.
   */
  compareTo(other: Task): number {
    if (this.priority !== other.priority) {
      return other.priority - this.priority; // Max-Heap לפי עדיפות
    }
    if (this.timestamp < other.timestamp) {
      return -1;
    }
    if (this.timestamp > other.timestamp) {
      return 1;
    }
    return 0;
  }
}

function main(): void {
  const high = new Task(1, 5);
  const low = new Task(2, 1);
  console.log(
    `high-priority before low-priority: ${high.compareTo(low) < 0 ? 'PASS' : 'FAIL'}`,
  );
  console.log(
    `low-priority after high-priority: ${low.compareTo(high) > 0 ? 'PASS' : 'FAIL'}`,
  );

  // Same priority -> earlier timestamp wins (created first).
  const first = new Task(3, 2);
  const second = new Task(4, 2);
  console.log(
    `same priority, earlier-created first: ${first.compareTo(second) < 0 ? 'PASS' : 'FAIL'}`,
  );
}

if (require.main === module) {
  main();
}
