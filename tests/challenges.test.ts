import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CheckIn } from "../generated/schema"
import { CheckIn as CheckInEvent } from "../generated/Challenges/Challenges"
import { handleCheckIn } from "../src/challenges"
import { createCheckInEvent } from "./challenges-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let challengeId = BigInt.fromI32(234)
    let checkInData = Bytes.fromI32(1234567890)
    let newCheckInEvent = createCheckInEvent(user, challengeId, checkInData)
    handleCheckIn(newCheckInEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CheckIn created and stored", () => {
    assert.entityCount("CheckIn", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CheckIn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CheckIn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "challengeId",
      "234"
    )
    assert.fieldEquals(
      "CheckIn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "checkInData",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
