import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const orderData = await request.json();

        // Format WhatsApp message
        const message = formatWhatsAppMessage(orderData);

        // Send WhatsApp notification (using WhatsApp Business API or third-party service)
        await sendWhatsAppNotification(message, orderData);

        // Send Email notification
        await sendEmailNotification(orderData);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Notification error:', error);
        return NextResponse.json({ success: false, error: 'Failed to send notifications' }, { status: 500 });
    }
}

function formatWhatsAppMessage(orderData: any): string {
    let message = `🛒 *New Order Received!*\n\n`;
    message += `📋 *Order Number:* ${orderData.orderNumber}\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${orderData.customer.name}\n`;
    message += `Phone: ${orderData.customer.phone}\n`;
    message += `Email: ${orderData.customer.email || 'N/A'}\n`;
    message += `Address: ${orderData.customer.address}\n`;
    message += `City: ${orderData.customer.city}\n`;
    message += `Postal Code: ${orderData.customer.postalCode || 'N/A'}\n\n`;
    message += `📦 *Order Items:*\n`;

    orderData.items.forEach((item: any, index: number) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qty: ${item.quantity} × Rs. ${item.price} = Rs. ${item.price * item.quantity}\n`;
    });

    message += `\n💰 *Order Summary:*\n`;
    message += `Subtotal: Rs. ${orderData.subtotal}\n`;
    message += `Shipping: Rs. ${orderData.shippingCost}\n`;
    message += `*Total: Rs. ${orderData.total}*\n\n`;
    message += `💳 *Payment Method:* ${orderData.paymentMethod.toUpperCase()}\n`;

    if (orderData.notes) {
        message += `\n📝 *Notes:* ${orderData.notes}\n`;
    }

    return message;
}

async function sendWhatsAppNotification(message: string, orderData: any) {
    const adminPhone = '923004720117';

    // Option 1: Using WhatsApp Business API (requires setup)
    // const response = await fetch('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         messaging_product: 'whatsapp',
    //         to: adminPhone,
    //         type: 'text',
    //         text: { body: message }
    //     })
    // });

    // Option 2: Using third-party service like Twilio
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);
    // await client.messages.create({
    //     from: 'whatsapp:+14155238886',
    //     to: `whatsapp:+${adminPhone}`,
    //     body: message
    // });

    // Option 3: Using CallMeBot (Free, simple, no API key needed for Pakistan)
    // This is the simplest option for now
    const apiKey = process.env.CALLMEBOT_API_KEY || 'YOUR_API_KEY'; // Get from https://www.callmebot.com/blog/free-api-whatsapp-messages/
    const encodedMessage = encodeURIComponent(message);

    try {
        const response = await fetch(
            `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodedMessage}&apikey=${apiKey}`
        );

        if (!response.ok) {
            console.error('WhatsApp notification failed:', await response.text());
        }
    } catch (error) {
        console.error('WhatsApp API error:', error);
        // Don't throw error - continue with email notification
    }
}

async function sendEmailNotification(orderData: any) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@roshnilife.com';
    const customerEmail = orderData.customer.email;

    // Using EmailJS (already installed)
    const emailjs = require('@emailjs/browser');

    const templateParams = {
        to_email: adminEmail,
        order_number: orderData.orderNumber,
        customer_name: orderData.customer.name,
        customer_phone: orderData.customer.phone,
        customer_email: orderData.customer.email || 'N/A',
        customer_address: orderData.customer.address,
        customer_city: orderData.customer.city,
        order_items: orderData.items.map((item: any, index: number) =>
            `${index + 1}. ${item.name} - Qty: ${item.quantity} × Rs. ${item.price} = Rs. ${item.price * item.quantity}`
        ).join('\n'),
        subtotal: orderData.subtotal,
        shipping: orderData.shippingCost,
        total: orderData.total,
        payment_method: orderData.paymentMethod.toUpperCase(),
        notes: orderData.notes || 'None'
    };

    try {
        // Send to admin
        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        // Send confirmation to customer if email provided
        if (customerEmail) {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID,
                {
                    ...templateParams,
                    to_email: customerEmail
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
        }
    } catch (error) {
        console.error('Email notification failed:', error);
        // Don't throw error - order is still placed
    }
}
