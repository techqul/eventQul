-- PostgreSQL function to get order details in the specified JSON format
-- Usage: SELECT * FROM get_order_details_by_number('EQ-MS70TH7M-014Z56');

CREATE OR REPLACE FUNCTION get_order_details_by_number(p_order_number VARCHAR)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
    v_result JSON;
BEGIN
    SELECT json_build_object(
        'success', true,
        'message', 'Order retrieved successfully',
        'data', json_build_object(
            'id', o.id,
            'qrCode', t.qrCode,
            'attendeeName', t.attendee_name,
            'attendeeEmail', t.attendee_email,
            'attendeePhone', t.attendee_phone,
            'status', o.status::TEXT,
            'tshirtSize', u.tshirt_size,
            'bloodGroup', u.blood_group,
            'dob', u.dob,
            'avatarUrl', u.avatar_url,
            'eventTitle', e.title,
            'venuName', v.name,
            'eventStartDate', e.start_date,
            'eventEndDate', e.end_date,
            'eventTime', to_char(e.start_date, 'HH:MIAM') || '-' || to_char(e.end_date, 'HH.MIPM'),
            'orderNumber', o.orderNumber,
            'subtotal', o.subtotal::TEXT,
            'discount', o.discount::TEXT,
            'total', o.total::TEXT,
            'platformCharge', 20::INT,
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
                    'benefits', tt.benefits
                ))
                FROM ticket_types tt
                WHERE tt.id IN (
                    SELECT t2.ticket_type_id
                    FROM tickets t2
                    WHERE t2.order_id = o.id
                )
            )
        )
    ) INTO v_result
    FROM orders o
    INNER JOIN tickets t ON t.order_id = o.id
    INNER JOIN users u ON u.id = o.user_id
    INNER JOIN events e ON e.id = t.event_id
    INNER JOIN venues v ON v.id = e.venue_id
    WHERE o.orderNumber = p_order_number
    LIMIT 1;

    RETURN v_result;
END;
$$;

-- Alternative function using ticket ID instead of order number
CREATE OR REPLACE FUNCTION get_order_details_by_ticket_id(p_ticket_id UUID)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
    v_result JSON;
BEGIN
    SELECT json_build_object(
        'success', true,
        'message', 'Order retrieved successfully',
        'data', json_build_object(
            'id', o.id,
            'qrCode', t.qrCode,
            'attendeeName', t.attendee_name,
            'attendeeEmail', t.attendee_email,
            'attendeePhone', t.attendee_phone,
            'status', o.status::TEXT,
            'tshirtSize', u.tshirt_size,
            'bloodGroup', u.blood_group,
            'dob', u.dob,
            'avatarUrl', u.avatar_url,
            'eventTitle', e.title,
            'venuName', v.name,
            'eventStartDate', e.start_date,
            'eventEndDate', e.end_date,
            'eventTime', to_char(e.start_date, 'HH:MIAM') || '-' || to_char(e.end_date, 'HH.MIPM'),
            'orderNumber', o.orderNumber,
            'subtotal', o.subtotal::TEXT,
            'discount', o.discount::TEXT,
            'total', o.total::TEXT,
            'platformCharge', 20::INT,
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
                    'benefits', tt.benefits
                ))
                FROM ticket_types tt
                WHERE tt.id IN (
                    SELECT t2.ticket_type_id
                    FROM tickets t2
                    WHERE t2.order_id = o.id
                )
            )
        )
    ) INTO v_result
    FROM tickets t
    INNER JOIN orders o ON o.id = t.order_id
    INNER JOIN users u ON u.id = o.user_id
    INNER JOIN events e ON e.id = t.event_id
    INNER JOIN venues v ON v.id = e.venue_id
    WHERE t.id = p_ticket_id;

    RETURN v_result;
END;
$$;

-- Function to get all order details with all tickets properly
CREATE OR REPLACE FUNCTION get_order_details_complete(p_order_number VARCHAR)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
    v_order_id UUID;
    v_result JSON;
BEGIN
    -- Get the order ID first
    SELECT o.id INTO v_order_id
    FROM orders o
    WHERE o.orderNumber = p_order_number
    LIMIT 1;

    IF v_order_id IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Order not found'
        );
    END IF;

    SELECT json_build_object(
        'success', true,
        'message', 'Order retrieved successfully',
        'data', json_build_object(
            'id', o.id,
            'qrCode', (SELECT t.qrCode FROM tickets t WHERE t.order_id = o.id LIMIT 1),
            'attendeeName', (SELECT t.attendee_name FROM tickets t WHERE t.order_id = o.id LIMIT 1),
            'attendeeEmail', (SELECT t.attendee_email FROM tickets t WHERE t.order_id = o.id LIMIT 1),
            'attendeePhone', (SELECT t.attendee_phone FROM tickets t WHERE t.order_id = o.id LIMIT 1),
            'status', o.status::TEXT,
            'tshirtSize', u.tshirt_size,
            'bloodGroup', u.blood_group,
            'dob', u.dob,
            'avatarUrl', u.avatar_url,
            'eventTitle', e.title,
            'venuName', v.name,
            'eventStartDate', e.start_date,
            'eventEndDate', e.end_date,
            'eventTime', to_char(e.start_date, 'HH:MIAM') || '-' || to_char(e.end_date, 'HH.MIPM'),
            'orderNumber', o.orderNumber,
            'subtotal', o.subtotal::TEXT,
            'discount', o.discount::TEXT,
            'total', o.total::TEXT,
            'platformCharge', 20::INT,
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
                WHERE tt.id IN (
                    SELECT t_inner.ticket_type_id
                    FROM tickets t_inner
                    WHERE t_inner.order_id = o.id
                )
            )
        )
    ) INTO v_result
    FROM orders o
    INNER JOIN users u ON u.id = o.user_id
    INNER JOIN tickets t_first ON t_first.order_id = o.id
    INNER JOIN events e ON e.id = t_first.event_id
    INNER JOIN venues v ON v.id = e.venue_id
    WHERE o.id = v_order_id
    LIMIT 1;

    RETURN v_result;
END;
$$;
