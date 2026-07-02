

export class SetTimeOutExample {
    private name;

    constructor(name) {
      this.name = name;
    }
  
    runDemo() {
      console.log(`Start: ${this.name}  \n`);
  
      // Operation 1: Synchronous (runs immediately)
      console.log("1. I run first because I am synchronous ֿ\n");
  
      // Operation 2: Asynchronous (pushed to the Event Loop/Callback Queue) // wait 3 seconds !!!!
      setTimeout(() => {
        console.log("2. I ran inside the setTimeout, so I was pushed to the end of the line \n");
      }, 3000);
  
      // Operation 3: Synchronous (runs immediately after operation 1)
      console.log("3. I run immediately after the first synchronous operation \n");
  
      console.log(`End: ${this.name} \n`);
    }
  }
  
  const demo = new SetTimeOutExample("Event Loop Demo\n");
  demo.runDemo();