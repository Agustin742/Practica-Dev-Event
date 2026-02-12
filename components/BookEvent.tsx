'use client'
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import React, { useState } from "react"

interface props {
    eventId: string;
    slug: string;
}

const BookEvent = ({ eventId, slug }: props) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);
        const { success } = await createBooking({ eventId, slug, email });

        if (success) {
            setSubmitted(true);
            posthog.capture('event-booked', {eventId, slug, email})
        }else {
            console.error('Booking creation failed');
            posthog.captureException(new Error('Booking creation failed'))
        }
        setIsLoading(false);
    }

  return (
    <div id="book-event">
        {submitted ? (
            <p className="text-sm">Thank you for signing up!</p>
        ) : (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter your email address"
                    />
                </div>

                <button type="submit" className="button-submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>

            </form>
        )}
    </div>
  )
}

export default BookEvent