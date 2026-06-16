import { Module } from '@nestjs/common';
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

@Module({
  controllers: [],
  providers: [
    LongestUniqueSubarrayService,
    MaxSumSubarrayService,
    SubarraySumEqualsKService,
    MinimumWindowSubarrayService,
    MaxNetworkCapacityService,
    MissingPacketIdentifierService,
    AttackTimelineAggregatorService,
    BracketValidatorService,
    RateLimitService,
    RateLimiterLogCleanerService,
  ],
  exports: [
    LongestUniqueSubarrayService,
    MaxSumSubarrayService,
    SubarraySumEqualsKService,
    MinimumWindowSubarrayService,
    MaxNetworkCapacityService,
    MissingPacketIdentifierService,
    AttackTimelineAggregatorService,
    BracketValidatorService,
    RateLimitService,
    RateLimiterLogCleanerService,
  ],
})
export class AlgoModule {}
