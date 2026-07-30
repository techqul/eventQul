-- Optimized PostgreSQL function to get order details
-- This version properly handles multiple tickets and aggregates all ticket types

CREATE OR REPLACE FUNCTION get_order_details_json(p_order_number VARCHAR)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
    v_result JSON;
BEGIN
    SELECT json_build_object(
        'success', true,
        'message', 'Order retrieved successfully',
        'data', (
            SELECT json_build_object(
                'id', o.id,
                'qrCode', FIRST_VALUE(t.qrCode) OVER(PARTITION BY o.id),
                'attendeeName', FIRST_VALUE(t.attendee_name) OVER(PARTITION BY o.id),
                'attendeeEmail', FIRST_VALUE(t.attendee_email) OVER(PARTITION BY o.id),
                'attendeePhone', FIRST_VALUE(t.attendee_phone) OVER(PARTITION BY o.id),
                'status', o.status::TEXT,
                'tshirtSize', u.tshirt_size,
                'bloodGroup', u.blood_group,
                'dob', u.dob,
                'avatarUrl', u.avatar_url,
                'eventTitle', e.title,
                'venuName', v.name,
                'eventStartDate', e.start_date,
                'eventEndDate', e.end_date,
                'eventTime', to_char(e.start_date, 'HH12:MIAM') || '-' || to_char(e.end_date, 'HH12:MIAM'),
                'orderNumber', o.orderNumber,
                'subtotal', o.subtotal::TEXT,
                'discount', o.discount::TEXT,
                'total', o.total::TEXT,
                'platformCharge', COALESCE((o.total - o.subtotal + o.discount)::INT, 20),
                'couponCode', o.coupon_code,
                'paymentMethod', o.payment_method,
                'paymentStatus', o.payment_status,
                'paidAt', o.paid_at,
                'tickets', (
                    SELECT json_agg(json_build_object(
                        'id', tt.id,
                        'name', tt.name,
                        'description', tt.description,
                        'price', tt.price::TEXT,
                        'currency', tt.currency,
                        'isFree', CASE WHEN tt.price = 0 THEN true ELSE false END,
                        'benefits', COALESCE(tt.benefits, '[]'::JSONB)
                    ))
                    FROM ticket_types tt
                    INNER JOIN tickets t_sub ON t_sub.ticket_type_id = tt.id
                    WHERE t_sub.order_id = o.id
                )
            )
            FROM orders o
            INNER JOIN users u ON u.id = o.user_id
            INNER JOIN tickets t ON t.order_id = o.id
            INNER JOIN events e ON e.id = t.event_id
            INNER JOIN venues v ON v.id = e.venue_id
            WHERE o.orderNumber = p_order_number
            LIMIT 1
        )
    ) INTO v_result;

    RETURN COALESCE(v_result, json_build_object('success', false, 'message', 'Order not found'));
END;
$$;

-- Comment to test the function:
-- SELECT get_order_details_json('EQ-MS70TH7M-014Z56');
