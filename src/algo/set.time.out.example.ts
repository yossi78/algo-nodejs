

export class SetTimeOutExample {
    private name;

    constructor(name) {
      this.name = name;
    }
  
    runDemo() {
      console.log(`Start: ${this.name}  \n`);
  
      console.log("1. I run first because I am synchronous ֿ\n");
  
      setTimeout(() => {
        console.log("2. I ran inside the setTimeout, so I was pushed to the end of the line  (15000 MS) \n");
      }, 15000);


      console.log("3. I run immediately after the first synchronous operation \n");


      setTimeout(() => {
        console.log("4. I ran inside the setTimeout, so I was pushed to the end of the line (7000 MS) \n");
      }, 7000);


      console.log("5. I comes after 3 because i am synchronous ֿ\n");


      console.log("----------------- SET TIME OUT PART ------------------------- ֿ\n");  

    }
  }
  
  const demo = new SetTimeOutExample("Event Loop Demo\n");
  demo.runDemo();