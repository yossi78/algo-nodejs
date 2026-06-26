import { Injectable } from '@nestjs/common';

/**
 * Sliding-window rate limiter.
 *
 * שומר לכל משתמש תור של חותמות זמן (בשניות). בקשה מאושרת רק אם מספר
 * הבקשות בחלון החיים (lifespan) קטן מהמקסימום המותר.
 *
 * In Java this relied on ConcurrentHashMap + synchronized; Node.js runs the
 * event loop on a single thread, so a plain Map is already safe here.
 */
@Injectable()
export class RateLimitService {
  

  private maxRequests:number = 100;
  private lifeSpanInMilis = 60*1000;
  private usersMap = new Map<string,number[]>();
  

  public async isAllowed(userId){
      let requests = this.usersMap.get(userId);
      if(requests==null){
          requests = [];
          requests.push(Date.now());
          this.usersMap.set(userId,requests);
          return true;
      }
      this.removeOutdated(requests);
      if(requests.length<this.maxRequests){
          requests.push(Date.now());
          return true;
      }
      console.log("Max login per second - blocking");
      return false;
  }


  private removeOutdated(requests:number[]){
      while(requests.length>0){
          let latestTime = requests[0];
          if(Date.now()-latestTime>this.lifeSpanInMilis){
              requests.shift();
          }else{
              break;
          }
      }
  }


}

async function main(): Promise<void> {
  const limiter = new RateLimitService();
  const userId = "user-1";
  const total = 102; // limit is 100, so the last 2 should be blocked

  console.log(`Sending ${total} requests in a burst (limit is 100):`);
  let allowedCount = 0;
  let blockedCount = 0;
  for (let i = 1; i <= total; i++) {
      const allowed = await limiter.isAllowed(userId);
      if (allowed) {
          allowedCount++;
      } else {
          blockedCount++;
      }
  }

  console.log(`  allowed: ${allowedCount}, blocked: ${blockedCount}`);
}

void main();
