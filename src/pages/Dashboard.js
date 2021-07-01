import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import ethereum from "../assets/ethereum.svg";
import dai from "../assets/dai.png";

const Dashboard = () => {
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState([]);
  const [total, setTotal] = useState();
  const [sum, setSum] = useState();

  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [walletCoin, setWalletCoin] = useState("");
  const [modal, setModal] = useState(false);
  const [showWallets, setShowWallets] = useState(false);

  const token = localStorage.getItem("token");
  const axios = require("axios");

  const getWallet = () => {
    axios
      .get("http://104.236.219.24:4000/wallet", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setWallets(res.data.wallet);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUser = () => {
    axios
      .get("http://104.236.219.24:4000/user", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        const total = res.data.send_user.total.total_2;
        /*         const trimedTotal = total.substring(0, 5);
         */ const fixedTotal = total
          .toString()
          .match(/^-?\d+(?:\.\d{0,3})?/)[0];
        setTotal(fixedTotal);
        setBalance(res.data.send_user);
        /*    setSum(
          balance && balance.total && balance.total.data
            ? balance.total.data
                .map((amount) => amount.balance)
                .reduce((a, b) => a + b)
            : null
        );
        console.log(sum); */
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createWallet = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://104.236.219.24:4000/wallet",
        {
          wallet_name: selectedCrypto,
          wallet_coint: walletCoin,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWallet();
    getUser();
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <>
      <div className="dashboard-container">
        <form className="dashboard-form" onSubmit={createWallet}>
          <div className="select-container">
            <div className="select-crypto">
              <img
                className="crypto-img"
                src={selectedCrypto === "ETH" ? ethereum : dai}
                alt={`${selectedCrypto} logo`}
              />
              <button className="text" onClick={(e) => openModal(e)}>
                {selectedCrypto}
              </button>
              <RiArrowDropDownLine
                className="icon arrow text"
                onClick={(e) => openModal(e)}
              />
            </div>
            {modal ? (
              <Modal
                isOpen={modal}
                className="modal"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <div className="modal-header">
                  <p className="modal-title text">Select token</p>
                  <MdClose
                    className="icon text"
                    onClick={() => setModal(false)}
                  />
                </div>
                <div className="modal-cryptos">
                  <input
                    type="button"
                    value="ETH"
                    className="text"
                    onClick={(e) => {
                      setSelectedCrypto(e.target.value);
                      setModal(false);
                    }}
                  />
                  <input
                    type="button"
                    value="DAI"
                    className="text"
                    onClick={(e) => {
                      setSelectedCrypto(e.target.value);
                      setModal(false);
                    }}
                  />
                </div>
              </Modal>
            ) : (
              ""
            )}
            <input
              className="dashboard-input"
              type="text"
              placeholder="Wallet Coin"
              value={walletCoin}
              onChange={(e) => setWalletCoin(e.target.value)}
            />
          </div>
          <button className="dashboard-button" onClick={(e) => createWallet(e)}>
            Add Wallet
          </button>
        </form>
        <h1 className="total-title">Total</h1>
        <p className="text total">{total}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="dashboard-button"
            onClick={() => setShowWallets(!showWallets)}
          >
            Your wallets
          </button>
          {/* <p> {sum}</p> */}
        </div>
        {showWallets ? (
          <div className="wallet-container">
            <div>
              {wallets.map((wallet, walletIdx) => (
                <>
                  <div className="wallet-name" key={walletIdx}>
                    <img
                      className="crypto-img"
                      src={wallet.wallet_name === "ETH" ? ethereum : dai}
                      alt={`${wallet.wallet_name} logo`}
                    />
                    <p className="text" key={wallet._id}>
                      {wallet.wallet_name}
                    </p>
                  </div>
                </>
              ))}
            </div>
            <div>
              {balance && balance.total && balance.total.data
                ? balance.total.data.map((amount, amounIdx) => (
                    <div className="text" key={amounIdx}>
                      {amount.balance}
                    </div>
                  ))
                : null}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Dashboard;
