

export class LabService {

  
  mult(firstNum: number, secondNum: number): number {
    return firstNum * secondNum;
  }
}






function main() {
  let lab = new LabService();
  console.log(lab.mult(3, 5));
}


void main();


//   RUN 
//   npx ts-node src/lab.service.ts


