import {
  CheckIn as CheckInEvent,
  Claim as ClaimEvent,
  Create as CreateEvent,
  DonationOrgSet as DonationOrgSetEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  GovernanceTransferred as GovernanceTransferredEvent,
  Join as JoinEvent,
  MinDonationBPSSet as MinDonationBPSSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Settle as SettleEvent
} from "../generated/Challenges/Challenges"
import {
  CheckIn,
  Claim,
  Create,
  DonationOrgSet,
  EIP712DomainChanged,
  GovernanceTransferred,
  Join,
  MinDonationBPSSet,
  OwnershipTransferred,
  Settle
} from "../generated/schema"

export function handleCheckIn(event: CheckInEvent): void {
  let entity = new CheckIn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.challengeId = event.params.challengeId
  entity.checkInData = event.params.checkInData

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaim(event: ClaimEvent): void {
  let entity = new Claim(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.challengeId = event.params.challengeId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreate(event: CreateEvent): void {
  let entity = new Create(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId
  entity.challenge_verifier = event.params.challenge.verifier
  entity.challenge_minimumCheckIns = event.params.challenge.minimumCheckIns
  entity.challenge_startTimestamp = event.params.challenge.startTimestamp
  entity.challenge_joinDueTimestamp = event.params.challenge.joinDueTimestamp
  entity.challenge_endTimestamp = event.params.challenge.endTimestamp
  entity.challenge_donateDestination = event.params.challenge.donateDestination
  entity.challenge_checkInJudge = event.params.challenge.checkInJudge
  entity.challenge_asset = event.params.challenge.asset
  entity.challenge_donationBPS = event.params.challenge.donationBPS
  entity.challenge_stakePerUser = event.params.challenge.stakePerUser

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDonationOrgSet(event: DonationOrgSetEvent): void {
  let entity = new DonationOrgSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.donationOrg = event.params.donationOrg
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovernanceTransferred(
  event: GovernanceTransferredEvent
): void {
  let entity = new GovernanceTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newGovernance = event.params.newGovernance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleJoin(event: JoinEvent): void {
  let entity = new Join(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.challengeId = event.params.challengeId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinDonationBPSSet(event: MinDonationBPSSetEvent): void {
  let entity = new MinDonationBPSSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newMinDonationBPS = event.params.newMinDonationBPS

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSettle(event: SettleEvent): void {
  let entity = new Settle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challengeId = event.params.challengeId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
