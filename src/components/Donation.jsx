import React, { useState, useEffect } from "react";
import ABI from "../../utils/abi.json";
import USDCABI from "../../utils/usdcabi.json";
import {
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useNetwork,
} from "wagmi";
import LoadingScreen from "./LoadingScreen";
import useCoinData from "../hooks/useCoinData";
import { erc20ABI } from "wagmi";
import Notification from "./Notification";
const Donation = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [DepositNotification, setDepositNotification] = useState(false);
  const contractAddress = "0x3BD5d2d59853235dD3166D077c079D9EE7d99d7f"; // Replace with your contract address
  const { coins, getCoinAddress } = useCoinData();
  const { chain, chains } = useNetwork();
  const [showNotification, setShowNotification] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);

  const { address, isDisconnected } = useAccount(); // Use the account hook to get the address
  const [selectedAddresss, setSelectedAddress] = useState("");
  const { data: ApproveData, write: Approve } = useContractWrite({
    address: selectedAddresss,
    abi: USDCABI,
    functionName: "approve", // adjust as necessary
  });

  const { data: depositData, write: Deposit } = useContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: "deposit", // adjust as necessary
  });

  const { isLoading: approveLoading, isSuccess: approveSuccess } =
    useWaitForTransaction({
      hash: ApproveData?.hash,
    });
  const { isLoading: depositLoading, isSuccess: depositSuccess } =
    useWaitForTransaction({
      hash: depositData?.hash,
    });

  const handleDonate = async () => {
    const tokenAddress = getCoinAddress(selectedCoin, chain.id);
    if (!tokenAddress) {
      alert("No token address received");
      return;
    }

    // Assuming the token has 18 decimals. Adjust if necessary.
    const amountInSmallestUnit =
      BigInt(donationAmount) * BigInt(Math.pow(10, 6));

    try {
      if (selectedCoin === "eth") {
        // Directly send ETH to the contract
        await Deposit({
          functionName: "depositEther",
          value: amountInSmallestUnit.toString(),
        });
      } else {
        // For ERC20 tokens, call the depositToken function
        await Deposit({
          functionName: "depositToken",

          args: [tokenAddress, amountInSmallestUnit],
        });
      }
    } catch (error) {
      console.error("Error in donation:", error);
    }
  };

  const handleApprove = async () => {
    const tokenAddress = getCoinAddress(selectedCoin, chain.id);
    if (!tokenAddress) {
      alert("No token address received");
      return;
    }

    // Assuming the token has 18 decimals. Adjust if necessary.
    const amountInSmallestUnit =
      BigInt(donationAmount) * BigInt(Math.pow(10, 6));

    try {
      await Approve({
        address: tokenAddress,
        args: [contractAddress, amountInSmallestUnit],
      });
    } catch (error) {
      console.error("Error in approval:", error);
    }
  };

  useEffect(() => {
    if (approveSuccess) {
      setIsApproved(true);

      setShowNotification(true);
    }
  }, [approveLoading, approveSuccess]);

  useEffect(() => {
    if (depositSuccess) {
      setDepositNotification(true);
    }
  }, [depositLoading, depositSuccess]);
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      // Cleanup function to clear the timeout if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <>
      {showNotification && (
        <div className="fixed top-0 right-0 z-50">
          <Notification
            message="Successfully Approved"
            subMessage={
              <a
                href={`https://mumbai.polygonscan.com/tx/${ApproveData.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View trx
              </a>
            }
            color="#44C997"
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
      {DepositNotification && (
        <div className="fixed top-0 right-0 z-50">
          <Notification
            message="Successfully Deposited"
            subMessage={
              <a
                href={`https://mumbai.polygonscan.com/tx/${ApproveData.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View trx
              </a>
            }
            color="#44C997"
            onClose={() => setDepositNotification(false)}
          />
        </div>
      )}
      {(approveLoading || depositLoading) && <LoadingScreen />}
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          {address && !isDisconnected ? (
            <>
              {/* Coin selection */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600 text-left">
                  Select a coin:
                </label>
                <div className="flex gap-4 justify-center">
                  {coins.map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => setSelectedCoin(coin.id)}
                      className={`p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
                        selectedCoin === coin.id ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <img
                        src={coin.img}
                        alt={coin.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Donation amount */}
              {selectedCoin && (
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-600 text-left">
                    Amount:
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter donation amount"
                    className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Approval button */}
              {donationAmount && !isApproved && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleApprove}
                    className="font-raleway font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-300 px-4 py-2 rounded-full"
                  >
                    Approve
                  </button>
                </div>
              )}

              {/* Donate button */}
              {isApproved && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleDonate}
                    className="font-raleway font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-300 px-4 py-2 rounded-full"
                  >
                    Donate
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              Please connect your account to continue.
              {/* Here, you can also add a Connect button if you have one */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Donation;
