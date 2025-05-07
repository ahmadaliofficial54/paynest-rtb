import { useQuery } from "@tanstack/react-query";
import { getItems, getMyBids, createItem } from "../lib/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Item = {
  id: number;
  name: string;
  description: string;
  startPrice: number;
  endsAt: string;
  bids: { amount: number }[];
};

type MyBid = {
  itemId: number;
  name: string;
  description: string;
  endsAt: string;
  userBid: number;
  highestBid: number;
};

export default function Dashboard() {
  const userId = 1; // mock user ID

  const [form, setForm] = useState({
    name: "",
    description: "",
    startPrice: "",
    durationSeconds: "",
  });

  const { data: items = [], refetch } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const { data: myBids = [] } = useQuery<MyBid[]>({
    queryKey: ["my-bids", userId],
    queryFn: () => getMyBids(userId),
  });

  const submit = async () => {
    try {
      await createItem({
        name: form.name,
        description: form.description,
        startPrice: Number(form.startPrice),
        durationSeconds: Number(form.durationSeconds),
      });
      toast.success("Auction created successfully!");
      setForm({
        name: "",
        description: "",
        startPrice: "",
        durationSeconds: "",
      });
      refetch();
    } catch {
      toast.error("Failed to create auction");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f6f8fa",
        minHeight: "100vh",
      }}
    >
      <ToastContainer />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#007bff",
          padding: "1rem 2rem",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🔨 Auction Hub</h1>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            background: "rgba(255,255,255,0.15)",
            padding: "0.4rem 0.75rem",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          🏠 Home
        </Link>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>
        {/* Create Auction Form */}
        <section
          style={{
            marginBottom: "3rem",
            padding: "2rem",
            borderRadius: 8,
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>🆕 Create New Auction</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            <input
              placeholder="Item Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Start price ($)"
              value={form.startPrice}
              onChange={(e) => setForm({ ...form, startPrice: e.target.value })}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Duration (seconds)"
              value={form.durationSeconds}
              onChange={(e) =>
                setForm({ ...form, durationSeconds: e.target.value })
              }
              style={inputStyle}
            />
            <button
              onClick={submit}
              style={{
                gridColumn: "span 2",
                padding: "0.6rem 1rem",
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
              ➕ Create Auction
            </button>
          </div>
        </section>

        {/* Active Auctions */}
        <section>
          <h2 style={{ marginBottom: "1rem" }}>📢 Active Auctions</h2>
          {items.length === 0 ? (
            <p style={{ color: "#999" }}>No auctions available.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {items.map((it) => (
                <Link key={it.id} to={`/auction/${it.id}`} style={cardStyle}>
                  <h3>{it.name}</h3>
                  <p>{it.description}</p>
                  <p>💰 Highest: ₹{it.bids[0]?.amount ?? it.startPrice}</p>
                  <p style={{ color: "#888" }}>
                    ⏱ Ends in: {formatDistanceToNowStrict(new Date(it.endsAt))}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* My Bids */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>👤 My Bids</h2>
          {myBids.length === 0 ? (
            <p style={{ color: "#999" }}>You haven’t placed any bids yet.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {myBids.map((it) => (
                <Link
                  key={it.itemId}
                  to={`/auction/${it.itemId}`}
                  style={cardStyle}
                >
                  <h3>{it.name}</h3>
                  <p>{it.description}</p>
                  <p>📥 Your Bid: ₹{it.userBid}</p>
                  <p>🏆 Highest Bid: ₹{it.highestBid}</p>
                  <p style={{ color: "#888" }}>
                    ⏱ Ends in: {formatDistanceToNowStrict(new Date(it.endsAt))}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.6rem 0.8rem",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 10,
  padding: "1rem",
  backgroundColor: "#fff",
  textDecoration: "none",
  color: "inherit",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
};
