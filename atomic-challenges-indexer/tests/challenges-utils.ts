import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/Challenges/Challenges"

export function createCheckInEvent(
  user: Address,
  challengeId: BigInt,
  checkInData: Bytes
): CheckIn {
  let checkInEvent = changetype<CheckIn>(newMockEvent())

  checkInEvent.parameters = new Array()

  checkInEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  checkInEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  checkInEvent.parameters.push(
    new ethereum.EventParam(
      "checkInData",
      ethereum.Value.fromBytes(checkInData)
    )
  )

  return checkInEvent
}

export function createClaimEvent(
  user: Address,
  challengeId: BigInt,
  amount: BigInt
): Claim {
  let claimEvent = changetype<Claim>(newMockEvent())

  claimEvent.parameters = new Array()

  claimEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  claimEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimEvent
}

export function createCreateEvent(
  challengeId: BigInt,
  challenge: ethereum.Tuple
): Create {
  let createEvent = changetype<Create>(newMockEvent())

  createEvent.parameters = new Array()

  createEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )
  createEvent.parameters.push(
    new ethereum.EventParam("challenge", ethereum.Value.fromTuple(challenge))
  )

  return createEvent
}

export function createDonationOrgSetEvent(
  donationOrg: Address,
  status: boolean
): DonationOrgSet {
  let donationOrgSetEvent = changetype<DonationOrgSet>(newMockEvent())

  donationOrgSetEvent.parameters = new Array()

  donationOrgSetEvent.parameters.push(
    new ethereum.EventParam(
      "donationOrg",
      ethereum.Value.fromAddress(donationOrg)
    )
  )
  donationOrgSetEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )

  return donationOrgSetEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

export function createGovernanceTransferredEvent(
  newGovernance: Address
): GovernanceTransferred {
  let governanceTransferredEvent = changetype<GovernanceTransferred>(
    newMockEvent()
  )

  governanceTransferredEvent.parameters = new Array()

  governanceTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "newGovernance",
      ethereum.Value.fromAddress(newGovernance)
    )
  )

  return governanceTransferredEvent
}

export function createJoinEvent(user: Address, challengeId: BigInt): Join {
  let joinEvent = changetype<Join>(newMockEvent())

  joinEvent.parameters = new Array()

  joinEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  joinEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )

  return joinEvent
}

export function createMinDonationBPSSetEvent(
  newMinDonationBPS: BigInt
): MinDonationBPSSet {
  let minDonationBpsSetEvent = changetype<MinDonationBPSSet>(newMockEvent())

  minDonationBpsSetEvent.parameters = new Array()

  minDonationBpsSetEvent.parameters.push(
    new ethereum.EventParam(
      "newMinDonationBPS",
      ethereum.Value.fromUnsignedBigInt(newMinDonationBPS)
    )
  )

  return minDonationBpsSetEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSettleEvent(challengeId: BigInt): Settle {
  let settleEvent = changetype<Settle>(newMockEvent())

  settleEvent.parameters = new Array()

  settleEvent.parameters.push(
    new ethereum.EventParam(
      "challengeId",
      ethereum.Value.fromUnsignedBigInt(challengeId)
    )
  )

  return settleEvent
}
