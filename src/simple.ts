


export class Simple {

    private readonly userRequestsMap = new Map<string,number[]>();
    private readonly maxSizeOfRequests = 5;
    private readonly lifeSpanInMilis = 5 *1000;


    addRequest(userId:string):boolean{
        const now = Date.now();
        let requests = this.userRequestsMap.get(userId);
        if(requests==null){
            requests = [];
            this.userRequestsMap.set(userId,requests);
        }
        this.removeOutDated(requests,now);
        if(requests.length >=this.maxSizeOfRequests){
            return false;
        }
        requests.push(now);
        return true;
    }


    private removeOutDated(requests:number[] , now:number){
        while(requests.length>0){
            const earliestRequest = requests[0];
            if(now-earliestRequest > this.lifeSpanInMilis){
                requests.shift();
            }else{
                break;
            }
        }
    }



}


async function main(): Promise<void> {
    const limiter = new Simple();
    const userId = "user-1";

    console.log("Sending 7 requests in a burst (limit is 5):");
    for (let i = 1; i <= 7; i++) {
        const allowed = limiter.addRequest(userId);
        console.log(`  request #${i}: ${allowed ? "ALLOWED" : "BLOCKED"}`);
    }

    console.log("\nWaiting 5.5s for the window to expire...");
    await new Promise((resolve) => setTimeout(resolve, 5500));

    console.log("Sending 1 more request after the window expired:");
    console.log(`  request #8: ${limiter.addRequest(userId) ? "ALLOWED" : "BLOCKED"}`);
}

void main();

//npx ts-node src/simple.ts