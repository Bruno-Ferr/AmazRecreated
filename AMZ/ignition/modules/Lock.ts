import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AMZAmount: bigint = 100000000_000_000_000_000_000_000n;

const LockModule = buildModule("AMZToken", (m) => {
  const token = m.contract("AMZToken", ["AMAZON", "AMZ", AMZAmount]);

  return { token };
});

export default LockModule;
