import { Body, Controller, Post } from '@nestjs/common';
import { LongestUniqueSubarrayService } from './longest-unique-subarray.service';
import { MaxSumSubarrayService } from './max-sum-subarray.service';
import { SubarraySumEqualsKService } from './subarray-sum-equals-k.service';
import { MinimumWindowSubarrayService } from './minimum-window-subarray.service';
import { MaxNetworkCapacityService } from './max-network-capacity.service';
import { MissingPacketIdentifierService } from './missing-packet-identifier.service';
import { AttackTimelineAggregatorService } from './attack-timeline-aggregator.service';
import { BracketValidatorService } from './bracket-validator.service';
import { RateLimitService } from './rate-limit.service';
import { RateLimiterLogCleanerService } from './rate-limiter-log-cleaner.service';
import { LruCache } from './lru-cache';

interface LruOperation {
  op: 'get' | 'put';
  key: number;
  value?: number;
}

@Controller('algo')
export class AlgoController {
  constructor(
    private readonly longestUniqueSubarray: LongestUniqueSubarrayService,
    private readonly maxSumSubarray: MaxSumSubarrayService,
    private readonly subarraySumEqualsK: SubarraySumEqualsKService,
    private readonly minimumWindowSubarray: MinimumWindowSubarrayService,
    private readonly maxNetworkCapacity: MaxNetworkCapacityService,
    private readonly missingPacketIdentifier: MissingPacketIdentifierService,
    private readonly attackTimelineAggregator: AttackTimelineAggregatorService,
    private readonly bracketValidator: BracketValidatorService,
    private readonly rateLimit: RateLimitService,
    private readonly rateLimiterLogCleaner: RateLimiterLogCleanerService,
  ) {}

  @Post('longest-unique-subarray')
  longestUnique(@Body('a') a: number[]): { result: number } {
    return { result: this.longestUniqueSubarray.solution(a) };
  }

  @Post('max-sum-subarray')
  maxSum(
    @Body('requests') requests: number[],
    @Body('k') k: number,
  ): { result: number } {
    return { result: this.maxSumSubarray.solution(requests, k) };
  }

  @Post('subarray-sum-equals-k')
  subarraySum(
    @Body('packets') packets: number[],
    @Body('k') k: number,
  ): { result: number } {
    return { result: this.subarraySumEqualsK.solution(packets, k) };
  }

  @Post('minimum-window-subarray')
  minimumWindow(
    @Body('logs') logs: number[],
    @Body('targets') targets: number[],
  ): { result: number } {
    return { result: this.minimumWindowSubarray.solution(logs, targets) };
  }

  @Post('max-network-capacity')
  maxCapacity(@Body('heights') heights: number[]): { result: number } {
    return { result: this.maxNetworkCapacity.solution(heights) };
  }

  @Post('missing-packet-identifier')
  missingPacket(@Body('packetIds') packetIds: number[]): { result: number } {
    return { result: this.missingPacketIdentifier.solution(packetIds) };
  }

  @Post('attack-timeline-aggregator')
  attackTimeline(@Body('intervals') intervals: number[][]): {
    result: number[][];
  } {
    return { result: this.attackTimelineAggregator.solution(intervals) };
  }

  @Post('bracket-validator')
  brackets(@Body('s') s: string): { result: number } {
    return { result: this.bracketValidator.solution(s) };
  }

  @Post('rate-limit')
  rateLimitRequest(@Body('userId') userId: string): { allowed: boolean } {
    return { allowed: this.rateLimit.addRequest(userId) };
  }

  @Post('rate-limiter-log-cleaner')
  logCleaner(
    @Body('timestamps') timestamps: number[],
    @Body('alerts') alerts: string[],
  ): { result: number } {
    return { result: this.rateLimiterLogCleaner.solution(timestamps, alerts) };
  }

  @Post('lru-cache')
  lruCacheDemo(
    @Body('capacity') capacity: number,
    @Body('operations') operations: LruOperation[],
  ): { results: (number | null)[] } {
    const cache = new LruCache(capacity);
    const results: (number | null)[] = [];

    for (const operation of operations ?? []) {
      if (operation.op === 'put') {
        cache.put(operation.key, operation.value as number);
        results.push(null);
      } else {
        results.push(cache.get(operation.key));
      }
    }

    return { results };
  }
}
