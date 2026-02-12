'use server'

import { Booking } from "@/database";
import connectDB from "../mongodb";

interface createBookingProps {
    eventId: string;
    slug: string;
    email: string;
};

export const createBooking = async ( 
    { eventId, slug, email } : createBookingProps 
) => {
    try {
        await connectDB();
        await Booking.create({ eventId, slug, email });

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false };
    }
}