

export class LabService {

  
  mult(firstNum: number, secondNum: number): number {
    return firstNum * secondNum;
  }
}






function main() {
  let lab = new LabService();
  let result = lab.mult(3, 5);
  console.log(result);
}


void main();


//   RUN 
//   npx ts-node src/lab.service.ts


