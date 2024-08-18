import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { erc20Abi, erc721Abi } from "viem";
import hardhatDeploy from "@sunodo/wagmi-plugin-hardhat-deploy";

export default defineConfig({
  out: "src/hooks/generated.ts",
  contracts: [
    {
      abi: erc20Abi,
      name: "erc20",
    },
    { abi: erc721Abi, name: "erc721" },
  ],
  plugins: [
    hardhatDeploy({
        directory: "node_modules/@cartesi/rollups/export/abi",
    }),
    react(),
],
});
