"use client";

import { CheckCircle, Calendar, MapPin, Ticket, User } from "lucide-react";
import { OrderDetail } from "@/types/order";

interface TicketDownloadProps {
  order: OrderDetail;
  id?: string;
}

export function TicketDownload({ order, id }: TicketDownloadProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const ticket = order.tickets[0];

  return (
    <div 
      id={id}
      className="bg-white p-6"
      style={{ 
        fontFamily: 'Arial, sans-serif',
        width: '400px',
        minHeight: '600px',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px dashed #d1d5db' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', marginBottom: '12px' }}>
          <CheckCircle style={{ width: '32px', height: '32px', color: '#16a34a' }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>
          EventQul Ticket
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Order: {order.orderNumber}
        </p>
      </div>

      {/* Event Info */}
      <div style={{ padding: '16px', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#faf5ff', border: '1px solid #e9d5ff' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 12px 0' }}>
          {order.eventTitle}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
            <MapPin style={{ width: '16px', height: '16px', color: '#9333ea' }} />
            <span>{order.venuName}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
            <Calendar style={{ width: '16px', height: '16px', color: '#9333ea' }} />
            <span>{formatDate(order.eventStartDate)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
            <Ticket style={{ width: '16px', height: '16px', color: '#9333ea' }} />
            <span>{order.eventTime}</span>
          </div>
        </div>
      </div>

      {/* Ticket Details */}
      <div style={{ borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '2px solid #e9d5ff', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#1f2937', margin: '0 0 4px 0' }}>
              {ticket.name}
            </h3>
            {ticket.description && (
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {ticket.description}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#9333ea', margin: 0 }}>
              {ticket.currency} {ticket.price}
            </p>
          </div>
        </div>

        {/* Benefits */}
        {ticket.benefits && ticket.benefits.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {ticket.benefits.map((benefit, idx) => (
              <span
                key={`${benefit}-${idx}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  backgroundColor: '#f3e8ff',
                  color: '#7c3aed',
                  borderRadius: '9999px',
                  fontSize: '11px'
                }}
              >
                ✓ {benefit}
              </span>
            ))}
          </div>
        )}

        {/* QR Code Section */}
        <div style={{ textAlign: 'center', paddingTop: '12px', borderTop: '1px dashed #e5e7eb' }}>
          <div style={{ display: 'inline-block', padding: '12px', borderRadius: '8px', marginBottom: '8px', backgroundColor: '#f3f4f6' }}>
            <Ticket style={{ width: '64px', height: '64px', color: '#9ca3af' }} />
          </div>
          <p style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace', margin: '4px 0' }}>
            {order.qrCode}
          </p>
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
            Show at entry
          </p>
        </div>
      </div>

      {/* Attendee Info */}
      <div style={{ borderRadius: '8px', padding: '16px', marginBottom: '16px', backgroundColor: '#f9fafb' }}>
        <h4 style={{ fontWeight: 600, color: '#1f2937', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User style={{ width: '16px', height: '16px' }} />
          Attendee
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
          <p style={{ color: '#374151', margin: 0 }}>
            <span style={{ fontWeight: 500 }}>Name:</span> {order.attendeeName}
          </p>
          <p style={{ color: '#374151', margin: 0 }}>
            <span style={{ fontWeight: 500 }}>Email:</span> {order.attendeeEmail}
          </p>
          <p style={{ color: '#374151', margin: 0 }}>
            <span style={{ fontWeight: 500 }}>Phone:</span> {order.attendeePhone}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingTop: '12px', borderTop: '1px solid #e5e7eb', fontSize: '11px', color: '#9ca3af' }}>
        <p style={{ margin: '0 0 4px 0' }}>Non-transferable & non-refundable</p>
        <p style={{ margin: 0 }}>EventQul Support Team</p>
      </div>
    </div>
  );
}
