
export class PromiseAwait {

    // ASYNC = WRAP THE ANSWE WITH "PROMISE.RESOLVE()"
      public async mult(firstNum: number, secondNum: number): Promise<number> {
      return firstNum * secondNum;
    }
  }
  
 
  async function main() {
    let lab = new PromiseAwait();
    let resultPromise:Promise<number> =  lab.mult(3, 5);
    console.log("resultPromise="+resultPromise);
  
    // TO EXTRACT THE VALUE FROM PROMISE WE NEED TO USE AWAIT
    let extractFromPromise = await resultPromise;
    console.log("extractFromPromise="+extractFromPromise);
  
    let result  = await lab.mult(3, 5);
    console.log("result="+result);
  }
  
 void main();
  
  