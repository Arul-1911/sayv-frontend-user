import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import DashboardCard from "../../../components/layout/DasboardCard";
import Assets from "./NetworthComponent/Assets";
import { getError } from "../../../utils/error";
import {
  imgAddr,
  useDashboardDataMutation,
  useGetAssetsLiabilitiesMutation,
} from "../../../features/apiSlice";
import Skeleton from "react-loading-skeleton";
import Liabilities from "./NetworthComponent/Liabilities";
import { useSelector } from "react-redux";
import { getDateRanges } from "../../../components/DateRange/DateRange";
import { selectAccountId } from "../../../features/authSlice";

const NetWorth = () => {
  const [getAssetsLiabilities, { isLoading }] =
    useGetAssetsLiabilitiesMutation();
  const [getGraphData, { isLoading: getGraphDataLoading }] =
    useDashboardDataMutation();

  const { period } = useSelector((state) => state.period);

  const [showAssets, setShowAssets] = useState(false);
  const [showActiveAssets, setShowActiveAssets] = useState(1);

  const [showLiabilities, setShowLiabilities] = useState(false);
  const [showActiveLiabilities, setShowActiveLiabilities] = useState(1);
  const [assetsLiabilities, setAssetsLiabilities] = useState([]);
  const [totalAssetsAmount, setTotalAssestAmount] = useState(0);
  const [totalLiabilitiesAmount, setTotalLiabilitiesAmount] = useState(0);
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  const [currNetWorth, setCurrNetWorth] = useState(0);

  const disabled = useSelector((state) => state?.dashBoard?.disabled) || [];

  const accountID = useSelector(selectAccountId);

  const isCardDisabled = (cardname) => {
    return disabled?.includes(cardname);
  };

  useEffect(() => {
    getAllAssetsLibilities();
    if (accountID) {
      getTotalAmount();
    }
  }, [accountID]);

  const getAllAssetsLibilities = async () => {
    try {
      const data = await getAssetsLiabilities().unwrap();
      setAssetsLiabilities(data);
      setTotalAssestAmount(data?.totalAssetsAmount);
      setTotalLiabilitiesAmount(data?.totalLiabilitiesAmount);
    } catch (error) {
      getError(error);
    }
  };

  const dateRange = getDateRanges(period);

  const getTotalAmount = async () => {
    try {
      const { dashboardData } = await getGraphData({
        currentStart: dateRange?.currentStart,
        currentEnd: dateRange?.currentEnd,
        account_id: accountID,
      }).unwrap();
      const totalAmount = dashboardData?.card1?.["Total amount"] || 0;
      setTotalNetWorth(totalAmount);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    setCurrNetWorth(totalNetWorth + totalAssetsAmount - totalLiabilitiesAmount);
  }, [totalNetWorth, totalAssetsAmount, totalLiabilitiesAmount]);

  return (
    <>
      <div className="mt-3 d-flex align-items-center justify-content-between net_worth">
        <div>
          <p style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
            Net worth
          </p>
          {!getGraphDataLoading ? (
            <h3 style={{ fontWeight: 600, color: "var(--primary-color)" }}>
              {`$${currNetWorth}`}
            </h3>
          ) : (
            <div>
              <Skeleton className="rounded-2" height={"30px"} width={"100%"} />
            </div>
          )}
        </div>

        {!isCardDisabled("Financial passport") && (
          <div
            className="d-flex align-items-center"
            style={{
              paddingLeft: "30px",
              backgroundColor: "var(--primary-color)",
              height: "40px",
              width: "180px",
              borderRadius: "22px",
              fontSize: "12px",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            See financial reports <IoIosArrowForward size={16} />
          </div>
        )}
      </div>

      <Row className="mt-3 g-3">
        <Col>
          <DashboardCard>
            <h5
              style={{
                fontWeight: 600,
                color: "rgba(0, 39, 91, 1)",
                fontSize: "18px",
              }}
            >
              Assets
            </h5>

            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <h5 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                Bank
              </h5>
              <p
                style={{
                  color: "rgba(58, 195, 172, 1)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ${assetsLiabilities?.totalAssetsAmount}
              </p>
            </div>
            <hr />

            <div style={{ height: "250px", overflowY: "scroll" }}>
              {assetsLiabilities?.assets?.length > 0 ? (
                !isLoading ? (
                  assetsLiabilities?.assets
                    ?.filter((data) => data?.type === "Asset")
                    ?.map((data) => {
                      return (
                        <div
                          key={data?._id}
                          style={{
                            backgroundColor: "rgba(245, 247, 248, 1)",
                            borderRadius: "10px",
                            padding: "10px",
                          }}
                          className="mt-3 d-flex justify-content-between align-items-center"
                        >
                          <div className="d-flex gap-2 align-items-center">
                            <Image
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                              }}
                              // src={
                              //   data?.asset_liabilty_lv1?.image &&
                              //   imgAddr + data?.asset_liabilty_lv1?.image
                              // }
                              src="/images/money.png"
                              alt="..."
                            />
                            <div
                              style={{
                                fontWeight: 600,
                                color: "rgba(55, 73, 87, 1)",
                                fontSize: "12px",
                              }}
                            >
                              {data?.name}
                            </div>
                          </div>

                          <div
                            style={{
                              color: "var(--primary-color)",
                              fontSize: "14px",
                              fontWeight: 600,
                            }}
                          >
                            ${data?.price} <IoIosArrowForward size={16} />
                          </div>
                        </div>
                      );
                    })
                ) : (
                  [1, 2, 3, 4, 5]?.map((_, idx) => (
                    <div key={idx}>
                      <Skeleton
                        className="rounded-2"
                        height={"40px"}
                        width={"100%"}
                      />
                    </div>
                  ))
                )
              ) : (
                <div className="text-center">No Asset found!</div>
              )}
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowAssets(true)}
                className="py-2"
                style={{
                  backgroundColor: "rgba(0, 74, 173, 0.08)",
                  color: "var(--primary-color)",
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 74, 173, 0.08)",
                }}
              >
                + Add Assets
              </button>
            </div>
          </DashboardCard>
        </Col>

        <Col>
          <DashboardCard>
            <h5
              style={{
                fontWeight: 600,
                color: "rgba(0, 39, 91, 1)",
                fontSize: "18px",
              }}
            >
              Liabilities
            </h5>

            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <h5 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                Bank
              </h5>
              <p
                style={{
                  color: "rgba(58, 195, 172, 1)",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ${assetsLiabilities?.totalLiabilitiesAmount}
              </p>
            </div>
            <hr />
            <div style={{ height: "250px", overflowY: "scroll" }}>
              {assetsLiabilities?.assets?.length > 0 ? (
                !isLoading ? (
                  assetsLiabilities?.assets
                    ?.filter((data) => data?.type === "Liability")
                    ?.map((data) => (
                      <div
                        key={data?._id}
                        style={{
                          backgroundColor: "rgba(245, 247, 248, 1)",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                        className="mt-3 d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex gap-2 align-items-center">
                          <Image
                            style={{
                              borderRadius: "50%",
                              width: "30px",
                              height: "30px",
                              objectFit: "cover",
                            }}
                            src="/images/Liability.png"
                            alt="..."
                          />
                          <div
                            style={{
                              fontWeight: 600,
                              color: "rgba(55, 73, 87, 1)",
                              fontSize: "12px",
                            }}
                          >
                            {data?.name}
                          </div>
                        </div>

                        <div
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          ${data?.price} <IoIosArrowForward size={16} />
                        </div>
                      </div>
                    ))
                ) : (
                  [1, 2, 3, 4, 5]?.map((_, idx) => (
                    <div key={idx}>
                      <Skeleton
                        className="rounded-2"
                        height={"40px"}
                        width={"100%"}
                      />
                    </div>
                  ))
                )
              ) : (
                <div className="text-center">No Liability found!</div>
              )}
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowLiabilities(true)}
                className="py-2"
                style={{
                  backgroundColor: "rgba(0, 74, 173, 0.08)",
                  color: "var(--primary-color)",
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 74, 173, 0.08)",
                }}
              >
                + Add Liabilities
              </button>
            </div>
          </DashboardCard>
        </Col>
      </Row>

      <Assets
        show={showAssets}
        hide={setShowAssets}
        active={showActiveAssets}
        activeLink={setShowActiveAssets}
      />
      <Liabilities
        show={showLiabilities}
        hide={setShowLiabilities}
        active={showActiveLiabilities}
        activeLink={setShowActiveLiabilities}
      />
    </>
  );
};

export default NetWorth;
