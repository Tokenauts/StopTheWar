import React from "react";
const CHAIN_ID_TO_NAME = {
  1: "ethereum",
  137: "polygon",
  10: "optimism",
  80001: "mumbai", // This is the testnet for Polygon (Matic)
  // ... add other chain IDs as needed
};
const coins = [
  {
    id: "usdc",
    name: "USDC",
    img: "usdc.svg",
    addresses: {
      ethereum: "0xEthereumAddressForUSDC",
      optimism: "0xOptimismAddressForUSDC",
      polygon: "0xPolygonAddressForUSDC",
      mumbai: "0x52D800ca262522580CeBAD275395ca6e7598C014",
      // ... add other chains as needed
    },
  },
  {
    id: "usdt",
    name: "USDT",
    img: "usdt.svg",
    addresses: {
      ethereum: "0xEthereumAddressForUSDT",
      optimism: "0xOptimismAddressForUSDT",
      polygon: "0xPolygonAddressForUSDT",
      // ... add other chains as needed
    },
  },
  {
    id: "eth",
    name: "ETH",
    img: "eth.svg",
    addresses: {
      ethereum: "0xEthereumAddressForETH",
      optimism: "0xOptimismAddressForETH",
      polygon: "0xPolygonAddressForETH",
      // ... add other chains as needed
    },
  },
  {
    id: "matic",
    name: "MATIC",
    img: "matic.svg",
    addresses: {
      ethereum: "0xEthereumAddressForMATIC",
      optimism: "0xOptimismAddressForMATIC",
      polygon: "0xPolygonAddressForMATIC",
      // ... add other chains as needed
    },
  },
  {
    id: "doge",
    name: "DOGE",
    img: "doge.svg",
    addresses: {
      ethereum: "0xEthereumAddressForDOGE",
      optimism: "0xOptimismAddressForDOGE",
      polygon: "0xPolygonAddressForDOGE",
      // ... add other chains as needed
    },
  },
];

const useCoinData = () => {
  return {
    coins,
    getCoinAddress: (coinId, chainId) => {
      const chainName = CHAIN_ID_TO_NAME[chainId];
      if (!chainName) {
        return null; // or handle the unknown chain ID as you see fit
      }
      return coins.find((c) => c.id === coinId)?.addresses[chainName];
    },
  };
};

export default useCoinData;
