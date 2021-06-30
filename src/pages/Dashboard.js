import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";

const Dashboard = () => {
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [walletCoin, setWalletCoin] = useState();
  const [modal, setModal] = useState(false);

  const axios = require("axios");

  const getWallet = async () => {
    axios
      .get("http://104.236.219.24:4000/wallet", {
        headers: {
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGNhM2Q0ZmMwM2NhN2FjZmM4NzE2YyIsImlhdCI6MTYyNTA3NTkxMSwiZXhwIjoxNjI1MTYyMzExfQ.fyixK5hOPgPpM2h7PRIa2ZWBYV6J_S8O39Fy0pAJZVE",
        },
      })
      .then((res) => {
        setWallets(res.data.wallet);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUser = async () => {
    axios
      .get("http://104.236.219.24:4000/user", {
        headers: {
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGNhM2Q0ZmMwM2NhN2FjZmM4NzE2YyIsImlhdCI6MTYyNTA3NTkxMSwiZXhwIjoxNjI1MTYyMzExfQ.fyixK5hOPgPpM2h7PRIa2ZWBYV6J_S8O39Fy0pAJZVE",
        },
      })
      .then((res) => {
        setBalance(res.data.send_user);
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
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGNhM2Q0ZmMwM2NhN2FjZmM4NzE2YyIsImlhdCI6MTYyNTA3NTkxMSwiZXhwIjoxNjI1MTYyMzExfQ.fyixK5hOPgPpM2h7PRIa2ZWBYV6J_S8O39Fy0pAJZVE",
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
          {/*             <select
              onChange={(e) => {
                setSelectedCrypto(e.target.value);
                console.log(selectedCrypto);
              }}
            >
              <option value="ETH">ETH</option>
              <option value="DAI">DAI</option>
            </select> */}
          <div className="select-container">
            <div className="select-crypto">
              <button onClick={(e) => openModal(e)}>{selectedCrypto}</button>
              <RiArrowDropDownLine
                className="icon arrow"
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
                  <p className="modal-title">Select token</p>
                  <GrClose className="icon" onClick={() => setModal(false)} />
                </div>
                <div className="modal-cryptos">
                  <input
                    type="button"
                    value="ETH"
                    onClick={(e) => {
                      setSelectedCrypto(e.target.value);
                      setModal(false);
                    }}
                  />
                  <input
                    type="button"
                    value="DAI"
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
        <div className="wallet-container">
          <div>
            {wallets.map((wallet) => (
              <p key={wallet._id}>{wallet.wallet_name}</p>
            ))}
          </div>
          <div>
            {balance && balance.total && balance.total.data
              ? balance.total.data.map((amount, amounIdx) => (
                  <div key={amounIdx}>{amount.balance}</div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
