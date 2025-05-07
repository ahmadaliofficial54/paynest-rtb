import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem, placeBid } from "../lib/api";
import { socket } from "../lib/socket";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auction() {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState("");

  const {
    data: item,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItem(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;
    socket.emit("join", { itemId: Number(id) });
  }, [id]);

  useEffect(() => {
    const onBid = () => refetch();
    socket.on("new-bid", onBid);
    return () => socket.off("new-bid", onBid);
  }, [refetch]);

  const submit = async () => {
    try {
      await placeBid({
        itemId: item!.id,
        userId: 1,
        amount: Number(amount),
      });
      toast.success("✅ Bid placed successfully!");
      setAmount("");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "❌ Failed to place bid");
    }
  };

  if (isLoading) return <p style={{ padding: 24 }}>Loading…</p>;
  if (error || !item) return <p style={{ padding: 24 }}>Item not found</p>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f6f8fa",
        minHeight: "100vh",
      }}
    >
      <ToastContainer />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          background: "#007bff",
          color: "white",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🔨 Auction Details</h1>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: "0.4rem 0.75rem",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          🏠 Home
        </Link>
      </header>

      {/* Content */}
      <main
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: "2rem",
          background: "white",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          {item.name}
        </h2>
        <p style={{ color: "#555", marginBottom: "1.5rem" }}>
          {item.description}
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontWeight: "bold" }}>
            💰 Highest Bid:{" "}
            <span style={{ fontWeight: 700 }}>
              ${item.bids[0]?.amount ?? item.startPrice}
            </span>
          </p>
          <span
            style={{
              fontSize: "0.9rem",
              backgroundColor: "#e0f2ff",
              color: "#007bff",
              padding: "0.3rem 0.6rem",
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            ⏱ Ends in:{" "}
            {formatDistanceToNowStrict(new Date(item.endsAt), {
              addSuffix: false,
            })}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="number"
            placeholder="Enter your bid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flex: 1,
              padding: "0.6rem 0.8rem",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            onClick={submit}
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            ➕ Place Bid
          </button>
        </div>
      </main>
    </div>
  );
}
