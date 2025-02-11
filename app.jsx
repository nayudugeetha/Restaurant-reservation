import { useState } from "react";
import "./App.css";

const TOTAL_SEATS = 20;

export default function App() {
  const [reservations, setReservations] = useState([]);
  const [seatsLeft, setSeatsLeft] = useState(TOTAL_SEATS);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const handleReserve = () => {
    const count = parseInt(guestCount, 10);
    if (!name || !phone || isNaN(count) || count <= 0) {
      alert("Please enter valid details.");
      return;
    }
    if (count > seatsLeft) {
      alert("Not enough seats available.");
      return;
    }

    setReservations([
      ...reservations,
      { name, phone, guestCount: count, checkInTime: new Date().toLocaleTimeString(), checkoutTime: null }
    ]);
    setSeatsLeft(seatsLeft - count);
    setName("");
    setPhone("");
    setGuestCount("");
  };

  const handleCheckout = (index) => {
    setReservations(reservations.map((res, i) => i === index ? { ...res, checkoutTime: new Date().toLocaleTimeString() } : res));
  };

  const handleDelete = (index) => {
    const res = reservations[index];
    if (!res.checkoutTime) setSeatsLeft(seatsLeft + res.guestCount);
    setReservations(reservations.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="overlay">
        <h2>Restaurant Reservation</h2>
        <p>Seats Left: {seatsLeft} / {TOTAL_SEATS}</p>

        <div className="form">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="number" placeholder="Guest Count" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} />
          <button onClick={handleReserve}>Reserve</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check-In</th>
              <th>Checkout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
              <tr key={index}>
                <td>{res.name}</td>
                <td>{res.phone}</td>
                <td>{res.checkInTime}</td>
                <td>{res.checkoutTime || <button onClick={() => handleCheckout(index)}>Check Out</button>}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
