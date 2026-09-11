// ASSIGNMENT 9 — HOTEL BOOKING SYSTEM

let rooms = [
    {
        roomNumber: 101,
        type: "Single",
        pricePerNight: 5000,
        isBooked: false,
        customer: null
    },
    {
        roomNumber: 102,
        type: "Double",
        pricePerNight: 8000,
        isBooked: false,
        customer: null
    },
    {
        roomNumber: 103,
        type: "Double",
        pricePerNight: 9000,
        isBooked: false,
        customer: null
    },
    {
        roomNumber: 104,
        type: "Suite",
        pricePerNight: 15000,
        isBooked: false,
        customer: null
    }
];

const TAX_RATE = 15;

function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference = end - start;
    const nights = difference / (1000 * 60 * 60 * 24);

    return nights;
}

function bookRoom(roomNumber, customer) {
    const room = rooms.find(room =>
        room.roomNumber === roomNumber
    );

    if (!room) return "Room not found.";
    if (room.isBooked) return "Room is already booked.";

    const nights = calculateNights(
        customer.checkIn,
        customer.checkOut
    );

    if (nights <= 0) return "Invalid check-in/check-out dates.";

    room.isBooked = true;
    room.customer = { ...customer };

    return {
        message: "Room booked successfully.",
        roomNumber: room.roomNumber,
        nights,
        bill: calculateBill(room)
    };
}

function calculateBill(room) {
    if (!room.isBooked || !room.customer) {
        return "Room is not booked.";
    }

    const nights = calculateNights(
        room.customer.checkIn,
        room.customer.checkOut
    );

    const roomCost = room.pricePerNight * nights;
    const tax = roomCost * (TAX_RATE / 100);
    const finalBill = roomCost + tax;

    return {
        nights,
        roomCost,
        tax,
        finalBill
    };
}

function cancelBooking(roomNumber) {
    const room = rooms.find(room =>
        room.roomNumber === roomNumber
    );

    if (!room) return "Room not found.";
    if (!room.isBooked) return "Room is not booked.";

    room.isBooked = false;
    room.customer = null;

    return "Booking cancelled successfully.";
}

function checkAvailability() {
    return rooms.filter(room => !room.isBooked);
}

function getRoomDetails(roomNumber) {
    const room = rooms.find(room =>
        room.roomNumber === roomNumber
    );

    return room || "Room not found.";
}

function searchRooms({ type, maxPrice }) {
    return rooms.filter(room => {
        const typeMatch =
            !type ||
            room.type.toLowerCase() === type.toLowerCase();

        const priceMatch =
            maxPrice === undefined ||
            room.pricePerNight <= maxPrice;

        return typeMatch && priceMatch && !room.isBooked;
    });
}

// TEST
const customer = {
    name: "Ali",
    phone: "03000000000",
    checkIn: "2026-09-01",
    checkOut: "2026-09-05"
};

console.log(bookRoom(102, customer));
console.log("Availability:", checkAvailability());
console.log("Room Details:", getRoomDetails(102));
console.log("Search Double <= 10000:", searchRooms({
    type: "Double",
    maxPrice: 10000
}));
console.log(cancelBooking(102));
