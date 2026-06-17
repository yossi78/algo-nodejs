import { Injectable } from "@nestjs/common";



@Injectable()
export class RateLimit2Service {

    private readonly maxNumberOfRequests = 5;
    private readonly lifespanInMillis = 5 * 1000;
    private readonly userRequestsMap = new Map<string, number[]>();
    private 


    






}