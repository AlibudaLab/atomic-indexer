import { BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  Settle as SettleEvent,
  Challenges
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
  Settle,
  Challenge,
  User,
  CheckInRecord,
  UserChallenge,
  UserChallengeCheckInRecord,
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

  let contract = Challenges.bind(event.address)
  let _challenge = Challenge.load(Bytes.fromI32(event.params.challengeId.toI32()))
  let _user = User.load(event.params.user)
  if (!_challenge || !_user) return

  let _checkInRecord = CheckInRecord.load(event.params.checkInData)
  if (!_checkInRecord) _checkInRecord = new CheckInRecord(event.params.checkInData)

  let _userChallengeCheckInRecord = new UserChallengeCheckInRecord((event.params.user).concat(Bytes.fromI32(event.params.challengeId.toI32())).concat(event.params.checkInData))
  _userChallengeCheckInRecord.userChallenge = (event.params.user).concat(Bytes.fromI32(event.params.challengeId.toI32()))
  _userChallengeCheckInRecord.checkInRecord = event.params.checkInData
  _userChallengeCheckInRecord.blockNumber = event.block.number
  _userChallengeCheckInRecord.blockTimestamp = event.block.timestamp
  _userChallengeCheckInRecord.transactionHash = event.transaction.hash

  _challenge.totalCheckIns = _challenge.totalCheckIns.plus(new BigInt(1))
  _challenge.totalSucceedUsers = contract.totalSucceedUsers(event.params.challengeId)

  _user.totalCheckIns = _user.totalCheckIns ? _user.totalCheckIns.plus(BigInt.fromI32(1)) : new BigInt(1)
  let _userCheckInCount = contract.getUserCheckInCounts(event.params.challengeId, event.params.user)
  if( _userCheckInCount == _challenge.minimumCheckIns) {
    let _userChallenge = UserChallenge.load((event.params.user).concat(Bytes.fromI32(event.params.challengeId.toI32())))
    if (!_userChallenge) return
    _userChallenge.status = 2
    _user.totalSucceedChallenges = _user.totalSucceedChallenges ? _user.totalSucceedChallenges.plus(new BigInt(1)) : new BigInt(1)
    _userChallenge.save()
  }

  _userChallengeCheckInRecord.save()
  _checkInRecord.save()
  _challenge.save()
  _user.save()
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

  let _challenge = Challenge.load(Bytes.fromI32(event.params.challengeId.toI32()))
  let _user = User.load(event.params.user)
  let _userChallenge = UserChallenge.load((event.params.user).concat(Bytes.fromI32(event.params.challengeId.toI32())))
  if (!_challenge || !_user || !_userChallenge) return
  _challenge.totalClaims = _challenge.totalClaims ? _challenge.totalClaims.plus(new BigInt(1)) : new BigInt(1)

  _user.totalStake = _user.totalStake ? _user.totalStake.minus(_challenge.stakePerUser) : new BigInt(0)
  let _claimedChallenges = _user.claimedChallenges ? _user.claimedChallenges : []
  _claimedChallenges.push(event.params.challengeId)
  _user.claimedChallenges = _claimedChallenges
  _user.totalClaimedChallenges = _user.totalClaimedChallenges ? _user.totalClaimedChallenges.plus(new BigInt(1)) : new BigInt(1)
  _user.totalEarned = _user.totalEarned ? _user.totalEarned.plus(event.params.amount) : event.params.amount

  _userChallenge.status = 2

  _challenge.save()
  _user.save()
  _userChallenge.save()
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

  let _challenge = new Challenge(Bytes.fromI32(event.params.challengeId.toI32()))
  _challenge.verifier = event.params.challenge.verifier
  _challenge.minimumCheckIns = event.params.challenge.minimumCheckIns
  _challenge.startTimestamp = event.params.challenge.startTimestamp
  _challenge.joinDueTimestamp = event.params.challenge.joinDueTimestamp
  _challenge.endTimestamp = event.params.challenge.endTimestamp
  _challenge.donateDestination = event.params.challenge.donateDestination
  _challenge.checkInJudge = event.params.challenge.checkInJudge
  _challenge.asset = event.params.challenge.asset
  _challenge.donationBPS = event.params.challenge.donationBPS
  _challenge.stakePerUser = event.params.challenge.stakePerUser
  _challenge.status = new BigInt(1)
  _challenge.totalUsers = new BigInt(0)
  _challenge.totalStake = new BigInt(0)
  _challenge.totalCheckIns = new BigInt(0)
  _challenge.totalClaims = new BigInt(0)
  _challenge.totalSucceedUsers = new BigInt(0)
  _challenge.totalFailedUsers = new BigInt(0)

  _challenge.save()
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

  let _challenge = Challenge.load(Bytes.fromI32(event.params.challengeId.toI32()))
  if (!_challenge) return
  _challenge.totalUsers = _challenge.totalUsers.plus(new BigInt(1))
  _challenge.totalStake = _challenge.totalStake.plus(_challenge.stakePerUser)
  _challenge.save()

  let _user = User.load(event.params.user)
  if (!_user) {
    _user = new User(event.params.user)
    _user.totalJoinedChallenges = BigInt.fromI32(0)
    _user.totalStake = BigInt.fromI32(0)
    _user.totalEarned = BigInt.fromI32(0)
    _user.totalCheckIns = BigInt.fromI32(0)
    _user.totalClaimedChallenges = BigInt.fromI32(0)
    _user.totalSucceedChallenges = BigInt.fromI32(0)
  }
  
  _user.totalJoinedChallenges = _user.totalJoinedChallenges.plus(BigInt.fromI32(1))
  _user.totalStake = _user.totalStake.plus(_challenge.stakePerUser)

  _user.save()

  let _userChallenge = new UserChallenge((event.params.user).concat(Bytes.fromI32(event.params.challengeId.toI32())))
  _userChallenge.user = event.params.user
  _userChallenge.challengeId = Bytes.fromI32(event.params.challengeId.toI32())
  _userChallenge.status = 1

  _userChallenge.save()
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

  let _challenge = Challenge.load(Bytes.fromI32(event.params.challengeId.toI32()))
  if (!_challenge) return
  _challenge.totalFailedUsers = _challenge.totalUsers.minus(_challenge.totalSucceedUsers)
  _challenge.status = new BigInt(2)

  _challenge.save()
}
