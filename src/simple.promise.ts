

class SimplePromise {

    public addOne(a) : Promise<number> {
        return Promise.resolve(a + 1);
    }

    public addTwo(a): Promise<number> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(a + 2);
            }, 5000);
        });
    }

    public async addThree(a) : Promise<number>{
        return a +3 ;
    }

    public addFour(num) : number {
        return num+4;
    }

    public addFive(num: number): Promise<number> {
        return new Promise((resolve) => {
            resolve(num + 5);
        });
    }
}


async function main() {
    const calculator = new SimplePromise();

    try {
        const addOne = await calculator.addOne(0);
        console.log("addOne:", addOne);

        const addTwo = await calculator.addTwo(0);
        console.log("addTwo:", addTwo);

        const addThree = await calculator.addThree(0);
        console.log("addThree:", addThree);

        const addFour = calculator.addFour(0);
        console.log("addFour:", addFour);

        const addFive = await calculator.addFive(0);
        console.log("addFive:", addFive);



    } catch (err) {
        console.error(err);
    }
}

main();