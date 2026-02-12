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
    } catch (e: unknown) {
        console.error('create booking failed', e);
        
        // Handle duplicate booking (unique index violation)
        if (e instanceof Error && 'code' in e && (e as { code: number }).code === 11000) {
            return { success: false, error: 'You have already booked this event.' };
        }
        
        return { success: false, error: 'Failed to create booking. Please try again.' };
    }}