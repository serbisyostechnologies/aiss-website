import "./TransactionHistory.css";
import usePageTitle from "../../../hooks/usePageTitle";
import { useEffect, useRef, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUserTransactionHisotry } from "../../../services/statisticsService";
import {
  IoImageOutline,
  IoColorWandOutline,
  IoImagesOutline,
  IoSearchOutline,
  IoVideocamOutline,
  IoFilmOutline,
  IoAnalyticsOutline,
  IoDocumentText,
} from "react-icons/io5";

export default function TransactionHistory() {
  usePageTitle("Transaction History | AISerbisyosStudio");
  const plan = useSelector((state) => state.user.plan);
  const user = useSelector((state) => state.user.profile);
  const [value, setValue] = useState("15");
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("Last 15 days");
  const [history, setHistory] = useState([]);
  const wrapperRef = useRef(null);
  const transactionFilterOptions = [
    {
      id: 101,
      option: "Last 15 days",
      value: "15",
    },
    {
      id: 102,
      option: "Last 30 days",
      value: "30",
    },
    {
      id: 103,
      option: "Last 90 days",
      value: "90",
    },
    {
      id: 104,
      option: "Last 180 days",
      value: "180",
    },
    {
      id: 105,
      option: "Last 1 year",
      value: "365",
    },
    {
      id: 106,
      option: "Last 2 years",
      value: "730",
    },
    {
      id: 107,
      option: "All",
      value: "All",
    },
  ];

  const getTransactionHistory = async () => {
    try {
      const response = await getUserTransactionHisotry({
        userId: user._id,
        days: parseInt(value),
      });
      console.log(response);
      setHistory(response.history);
    } catch (error) {
      setHistory([]);
    }
  };

  useState(() => {
    getTransactionHistory();
  }, [value]);

  const filteredOptions = transactionFilterOptions.filter((item) =>
    item.option.toLowerCase().includes(option.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatNumber = (num) => new Intl.NumberFormat("en-IN").format(num);

  const getIcon = (title) => {
    let icon;
    switch (title) {
      case "AI Image Create":
        icon = <IoImageOutline />;
        break;
      case "AI Image Edit":
        icon = <IoColorWandOutline />;
        break;
      case "AI Image Collage":
        icon = <IoImagesOutline />;
        break;
      case "AI Image Analyze":
        icon = <IoSearchOutline />;
        break;
      case "AI Video Create":
        icon = <IoVideocamOutline />;
        break;
      case "AI Video Edit":
        icon = <IoFilmOutline />;
        break;
      case "AI Video Analyze":
        icon = <IoAnalyticsOutline />;
        break;
      case "AI Prompt Create":
        icon = <IoDocumentText />;
        break;
    }
    return icon;
  };

  const getClassName = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  return (
    <div className="transactions">
      <div className="transactions__header">
        <div>
          <h2>Transaction History</h2>
        </div>

        <div className="filter" ref={wrapperRef}>
          <input
            type="text"
            className="filter__input"
            value={option}
            placeholder="Filter transactions..."
            onChange={(e) => {
              setOption(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />

          <button className="filter__arrow" onClick={() => setOpen(!open)}>
            ▼
          </button>

          {open && (
            <div className="filter__dropdown">
              {transactionFilterOptions.length ? (
                transactionFilterOptions.map((item) => (
                  <div
                    key={item.id}
                    className="filter__item"
                    onClick={() => {
                      setValue(item.value);
                      setOption(item.option);
                      setOpen(false);
                    }}
                  >
                    {item.option}
                  </div>
                ))
              ) : (
                <div className="filter__empty">No results</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="transactions__summary">
        <div className="summary-card">
          <span className="summary-card__icon">💳</span>

          <div className="summary-card__content">
            <h3>{formatNumber(plan.remainingCredits)}</h3>
            <p>Available Credits</p>
          </div>
        </div>

        <div className="summary-card summary-card--green">
          <span className="summary-card__icon">⬇</span>

          <div className="summary-card__content">
            <h3>{formatNumber(plan.purchasedCredits)}</h3>
            <p>Purchased</p>
          </div>
        </div>

        <div className="summary-card summary-card--red">
          <span className="summary-card__icon">⬆</span>

          <div className="summary-card__content">
            <h3>
              {formatNumber(plan.purchasedCredits - plan.remainingCredits)}
            </h3>
            <p>Spent</p>
          </div>
        </div>

        <div className="summary-card summary-card--blue">
          <span className="summary-card__icon">
            <FaExchangeAlt />
          </span>

          <div className="summary-card__content">
            <h3>{history.length}</h3>
            <p>Total Transactions</p>
          </div>
        </div>
      </div>

      <div className="transactions__list">
        {history.map((item) => (
          <div className={`transaction transaction--${getClassName(item.title)}`} key={item.id}>
            <div className="transaction__icon">{getIcon(item.title)}</div>

            <div className="transaction__content">
              <h4>{item.title}</h4>
              <span>{item.date}</span>
            </div>

            <div className="transaction__amount">
              <span className="negative">{item.credits}</span>
              <small>{item.status}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}