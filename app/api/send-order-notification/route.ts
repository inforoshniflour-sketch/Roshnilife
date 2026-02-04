import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const orderData = await request.json();

        // Send Email notification to admin
        await sendAdminEmailNotification(orderData);

        // Send Email confirmation to customer (if email provided)
        if (orderData.customer.email) {
            await sendCustomerEmailNotification(orderData);
        }

        // Send WhatsApp notification to admin
        await sendWhatsAppNotification(orderData);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Notification error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send notifications' },
            { status: 500 }
        );
    }
}

async function sendAdminEmailNotification(orderData: any) {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@roshnilife.com';

    // Format order items for email
    const itemsHTML = orderData.items
        .map(
            (item: any, index: number) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${index + 1}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${item.price.toLocaleString()}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
    `
        )
        .join('');

    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #00563F 0%, #7CB342 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🛒 New Order Received!</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">Order Details</h2>
            <p style="font-size: 18px; margin: 10px 0;"><strong>Order Number:</strong> <span style="color: #7CB342;">${orderData.orderNumber}</span></p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(orderData.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${orderData.paymentMethod.toUpperCase()}</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">👤 Customer Information</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${orderData.customer.name}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${orderData.customer.phone}" style="color: #7CB342; text-decoration: none;">${orderData.customer.phone}</a></p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${orderData.customer.email || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${orderData.customer.address}</p>
            <p style="margin: 5px 0;"><strong>City:</strong> ${orderData.customer.city}</p>
            ${orderData.customer.postalCode ? `<p style="margin: 5px 0;"><strong>Postal Code:</strong> ${orderData.customer.postalCode}</p>` : ''}
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">📦 Order Items</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #00563F; color: white;">
                        <th style="padding: 10px; text-align: left;">#</th>
                        <th style="padding: 10px; text-align: left;">Product</th>
                        <th style="padding: 10px; text-align: center;">Qty</th>
                        <th style="padding: 10px; text-align: right;">Price</th>
                        <th style="padding: 10px; text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">💰 Order Summary</h2>
            <table style="width: 100%;">
                <tr>
                    <td style="padding: 8px 0;">Subtotal:</td>
                    <td style="padding: 8px 0; text-align: right;">Rs. ${orderData.subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;">Shipping:</td>
                    <td style="padding: 8px 0; text-align: right;">Rs. ${orderData.shippingCost.toLocaleString()}</td>
                </tr>
                <tr style="border-top: 2px solid #00563F; font-size: 18px; font-weight: bold;">
                    <td style="padding: 12px 0; color: #00563F;">Total:</td>
                    <td style="padding: 12px 0; text-align: right; color: #7CB342;">Rs. ${orderData.total.toLocaleString()}</td>
                </tr>
            </table>
        </div>

        ${orderData.notes ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">📝 Customer Notes</h2>
            <p style="margin: 0; font-style: italic; color: #666;">${orderData.notes}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;">ROSHNI Multi-Grain Flour</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Premium Quality | 100% Natural</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <a href="https://roshnilife.com" style="color: #7CB342; text-decoration: none;">roshnilife.com</a>
            </p>
        </div>
    </div>
</body>
</html>
    `;

    try {
        await resend.emails.send({
            from: 'ROSHNI Orders <orders@roshnilife.com>',
            to: [adminEmail],
            subject: `🛒 New Order ${orderData.orderNumber} - Rs. ${orderData.total.toLocaleString()}`,
            html: emailHTML,
        });
    } catch (error) {
        console.error('Admin email failed:', error);
    }
}

async function sendCustomerEmailNotification(orderData: any) {
    const customerEmail = orderData.customer.email;

    const itemsHTML = orderData.items
        .map(
            (item: any, index: number) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${index + 1}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${item.price.toLocaleString()}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
    `
        )
        .join('');

    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #00563F 0%, #7CB342 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✅ Order Confirmed!</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <h2 style="color: #00563F; margin-top: 0;">Thank you, ${orderData.customer.name}!</h2>
            <p style="font-size: 16px; color: #666;">Your order has been received and is being processed.</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">Order Details</h2>
            <p style="font-size: 18px; margin: 10px 0;"><strong>Order Number:</strong> <span style="color: #7CB342;">${orderData.orderNumber}</span></p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(orderData.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${orderData.paymentMethod.toUpperCase()}</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">📦 Your Items</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #00563F; color: white;">
                        <th style="padding: 10px; text-align: left;">#</th>
                        <th style="padding: 10px; text-align: left;">Product</th>
                        <th style="padding: 10px; text-align: center;">Qty</th>
                        <th style="padding: 10px; text-align: right;">Price</th>
                        <th style="padding: 10px; text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">💰 Order Summary</h2>
            <table style="width: 100%;">
                <tr>
                    <td style="padding: 8px 0;">Subtotal:</td>
                    <td style="padding: 8px 0; text-align: right;">Rs. ${orderData.subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;">Shipping:</td>
                    <td style="padding: 8px 0; text-align: right;">Rs. ${orderData.shippingCost.toLocaleString()}</td>
                </tr>
                <tr style="border-top: 2px solid #00563F; font-size: 18px; font-weight: bold;">
                    <td style="padding: 12px 0; color: #00563F;">Total:</td>
                    <td style="padding: 12px 0; text-align: right; color: #7CB342;">Rs. ${orderData.total.toLocaleString()}</td>
                </tr>
            </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #00563F; margin-top: 0;">📍 Delivery Address</h2>
            <p style="margin: 5px 0;">${orderData.customer.address}</p>
            <p style="margin: 5px 0;">${orderData.customer.city}${orderData.customer.postalCode ? `, ${orderData.customer.postalCode}` : ''}</p>
        </div>

        <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #7CB342;">
            <h3 style="color: #00563F; margin-top: 0;">📞 Need Help?</h3>
            <p style="margin: 5px 0;">Contact us at: <a href="tel:+923004720117" style="color: #7CB342; text-decoration: none;">+92 300 4720117</a></p>
            <p style="margin: 5px 0;">WhatsApp: <a href="https://wa.me/923004720117" style="color: #7CB342; text-decoration: none;">+92 300 4720117</a></p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;">ROSHNI Multi-Grain Flour</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Premium Quality | 100% Natural</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <a href="https://roshnilife.com" style="color: #7CB342; text-decoration: none;">roshnilife.com</a>
            </p>
        </div>
    </div>
</body>
</html>
    `;

    try {
        await resend.emails.send({
            from: 'ROSHNI <orders@roshnilife.com>',
            to: [customerEmail],
            subject: `✅ Order Confirmation ${orderData.orderNumber}`,
            html: emailHTML,
        });
    } catch (error) {
        console.error('Customer email failed:', error);
    }
}

async function sendWhatsAppNotification(orderData: any) {
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || '923004720117';

    // Format WhatsApp message
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
        message += `   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()} = Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n💰 *Order Summary:*\n`;
    message += `Subtotal: Rs. ${orderData.subtotal.toLocaleString()}\n`;
    message += `Shipping: Rs. ${orderData.shippingCost.toLocaleString()}\n`;
    message += `*Total: Rs. ${orderData.total.toLocaleString()}*\n\n`;
    message += `💳 *Payment Method:* ${orderData.paymentMethod.toUpperCase()}\n`;

    if (orderData.notes) {
        message += `\n📝 *Notes:* ${orderData.notes}\n`;
    }

    // For now, we'll use WhatsApp direct link (opens WhatsApp with pre-filled message)
    // In production, you can integrate Twilio or WhatsApp Business API
    const whatsappURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    console.log('WhatsApp notification URL:', whatsappURL);
    console.log('WhatsApp message:', message);

    // Note: This doesn't send automatically, but prepares the message
    // For automatic sending, you would need Twilio or WhatsApp Business API
}
