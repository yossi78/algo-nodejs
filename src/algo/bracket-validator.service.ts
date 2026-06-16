import { Injectable } from '@nestjs/common';

/**
 * מנוע בדיקת תקינות קינון סוגריים (Valid Parentheses).
 * בודק אם יש סוגר תואם לכל פותח במחרוזת.
 *
 * Time: O(N) — מעבר יחיד על המחרוזת.
 * Space: O(N) — במקרה הגרוע ביותר שבו כל הסוגרים פותחים.
 */
@Injectable()
export class BracketValidatorService {
  solution(s: string | null | undefined): number {
    // מקרה קצה: מחרוזת ריקה או null נחשבת תקינה לפי הגדרות המבחן
    if (s == null || s.length === 0) {
      return 1;
    }

    const stack: string[] = [];

    for (const currentChar of s) {
      // 1. סוגר פותח -> דוחפים למחסנית
      if (currentChar === '(' || currentChar === '[' || currentChar === '{') {
        stack.push(currentChar);
      }
      // 2. סוגר סוגר
      else if (
        currentChar === ')' ||
        currentChar === ']' ||
        currentChar === '}'
      ) {
        // סוגר סוגר אך המחסנית ריקה -> לא חוקי
        if (stack.length === 0) {
          return 0;
        }

        const lastChar = stack[stack.length - 1];
        if (this.isFit(lastChar, currentChar)) {
          stack.pop();
        } else {
          return 0;
        }
      }
    }

    // מחסנית ריקה -> הכל נסגר כראוי
    return stack.length === 0 ? 1 : 0;
  }

  /** פונקציית עזר לבדיקת התאמה בין סוגר פותח לסוגר סוגר. */
  private isFit(open: string, close: string): boolean {
    return (
      (open === '(' && close === ')') ||
      (open === '[' && close === ']') ||
      (open === '{' && close === '}')
    );
  }
}

function main(): void {
  const service = new BracketValidatorService();
  const cases: Array<[string, number]> = [
    ['()[]{}', 1],
    ['([{}])', 1],
    ['(]', 0],
    ['([)]', 0],
    ['(', 0],
    ['', 1],
  ];
  for (const [input, expected] of cases) {
    const actual = service.solution(input);
    console.log(
      `solution(${JSON.stringify(input)}) = ${actual} (expected ${expected}) ${actual === expected ? 'PASS' : 'FAIL'}`,
    );
  }
}

if (require.main === module) {
  main();
}
