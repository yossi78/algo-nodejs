

class SimplePromise {

    public sum(a, b) : Promise<number> {
        return Promise.resolve(a + b);
    }

    public mult(a, b): Promise<number> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(a * b);
            }, 5000);
        });
    }

    public async less(a, b) : Promise<number>{
        return a - b;
    }

    public addOne(num) : number {
        return num+1;
    }

    public addTwo(num: number): Promise<number> {
        return new Promise((resolve) => {
            resolve(num + 2);
        });
    }
}


async function main() {
    const calculator = new SimplePromise();

    try {
        const sumResult = await calculator.sum(10, 5);
        console.log("Sum:", sumResult);

        const multResult = await calculator.mult(10, 5);
        console.log("Multiply:", multResult);

        const addOne = calculator.addOne(10);
        console.log("addOne:", addOne);

        const lessResult = await calculator.less(10, 5);
        console.log("Less:", lessResult);

        const addTwo = await calculator.addTwo(10);
        console.log("addTwo:", addTwo);



    } catch (err) {
        console.error(err);
    }
}

main();