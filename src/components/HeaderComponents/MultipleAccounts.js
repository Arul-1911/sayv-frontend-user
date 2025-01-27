import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectAccountId,
  selectAuth,
  setUser,
} from "../../features/authSlice";
import { Dropdown, Image } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useGetUserProfileMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";
import AddAccount from "./AddAccount";
import { GoPlus } from "react-icons/go";

const MultipleAccounts = () => {
  const { selectAccountId } = useSelector(selectAuth);
  const [getUserProfile, { isLoading }] = useGetUserProfileMutation();
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const [addAccountModal, setAddAccountModal] = useState(false);
  const [addAccountLink, setAddAccountLink] = useState(1);

  const fetchprofile = async () => {
    try {
      const { user } = await getUserProfile().unwrap();
      if (user && user?.accounts && user?.accounts?.length > 0) {
        dispatch(setUser(user));
        setAccounts(user?.accounts);
        if (isFirstRender.current && !selectAccountId) {
          const defaultAccount = user?.accounts[0].account_id;
          dispatch(setSelectAccountId(defaultAccount));
          isFirstRender.current = false;
        }
      }
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, [dispatch, selectAccountId]);

  const handleAccountChange = (accountId) => {
    dispatch(setSelectAccountId(accountId));
  };

  return (
    <Col>
      <div
        className="p-1 d-flex align-items-center"
        style={{
          backgroundColor: "rgba(235, 241, 248, 1)",
          borderRadius: "22px",
          fontSize: "1.5rem",
          color: "var(--primary-color)",
          fontWeight: 400,
          cursor: "pointer",
          width: "fit-content",
          transition: "background-color 0.3s ease",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--primary-color)",
            }}
          >
            <Image
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                objectFit: "cover",
              }}
              src={
                accounts?.find((acc) => acc.account_id === selectAccountId)
                  ?.bank_logo || "/images/bank-acc-logo.jpg"
              }
              alt={
                accounts?.find((acc) => acc.account_id === selectAccountId)
                  ?.account_name || "Select Account"
              }
            />{" "}
            {accounts?.find((acc) => acc.account_id === selectAccountId)
              ?.account_name || "Select Account"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ fontSize: "14px", marginTop: "6px" }}>
            {accounts?.map((acc) => (
              <Dropdown.Item
                key={acc.account_id}
                onClick={() => handleAccountChange(acc.account_id)}
                style={{
                  color: "var(--primary-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Image
                  style={{
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                  src={acc?.bank_logo || "/images/bank-acc-logo.jpg"}
                  alt={acc?.account_name}
                />{" "}
                {acc.account_name}
              </Dropdown.Item>
            ))}
            <div
              className="mt-4 p-2"
              onClick={() => setAddAccountModal(true)}
              style={{
                backgroundColor: "var(--primary-color)",
                borderRadius: "22px",
                fontSize: "13px",
                color: "white",
                fontWeight: 400,
                cursor: "pointer",
                marginLeft: "110px",
                width: "fit-content",
              }}
            >
              <GoPlus size={12} /> Add account
            </div>
            <AddAccount
              show={addAccountModal}
              hide={setAddAccountModal}
              active={addAccountLink}
              activeLink={setAddAccountLink}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Col>
  );
};

export default MultipleAccounts;
