// Utility functions for order management

/**
 * Generate unique order number
 * Format: ROSH-YYYY-XXXX (e.g., ROSH-2026-0001)
 */
export function generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    const orderNum = randomNum.toString().padStart(4, '0');
    return `ROSH-${year}-${orderNum}`;
}

/**
 * Calculate shipping cost based on city
 */
export function calculateShipping(city: string): number {
    const tier1Cities = ['lahore', 'karachi', 'islamabad', 'rawalpindi'];
    const tier2Cities = ['faisalabad', 'multan', 'gujranwala', 'peshawar', 'quetta', 'sialkot'];

    const cityLower = city.toLowerCase();

    if (tier1Cities.includes(cityLower)) {
        return 150;
    } else if (tier2Cities.includes(cityLower)) {
        return 200;
    } else {
        return 250;
    }
}

/**
 * Format price in PKR
 */
export function formatPrice(amount: number): string {
    return `PKR ${amount.toLocaleString()}`;
}

/**
 * Validate Pakistani phone number
 */
export function validatePhone(phone: string): boolean {
    // Accept formats: 03001234567, +923001234567, 923001234567
    const phoneRegex = /^(\+92|92|0)?3[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Format phone number for WhatsApp
 */
export function formatPhoneForWhatsApp(phone: string): string {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');

    // Add 92 prefix if starts with 0
    if (cleaned.startsWith('0')) {
        cleaned = '92' + cleaned.substring(1);
    }

    // Add 92 if not present
    if (!cleaned.startsWith('92')) {
        cleaned = '92' + cleaned;
    }

    return cleaned;
}

/**
 * Get payment method based on cart total
 */
export function getAvailablePaymentMethods(total: number): string[] {
    if (total >= 1500) {
        return ['card']; // Only card payment for orders >= 1500
    }
    return ['card', 'cod']; // Both options for orders < 1500
}

/**
 * Pakistani cities list
 */
export const pakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Gujranwala',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Sargodha',
    'Bahawalpur',
    'Sukkur',
    'Larkana',
    'Sheikhupura',
    'Jhang',
    'Rahim Yar Khan',
    'Gujrat',
    'Kasur',
    'Mardan',
    'Mingora',
    'Nawabshah',
    'Sahiwal',
    'Mirpur Khas',
    'Okara',
    'Burewala',
    'Jacobabad',
    'Saddiqabad',
    'Kohat',
    'Muridke',
    'Muzaffargarh',
    'Khanpur',
    'Gojra',
    'Mandi Bahauddin',
    'Abbottabad',
    'Turbat',
    'Dadu',
    'Bahawalnagar',
    'Khuzdar',
    'Pakpattan',
    'Tando Allahyar',
    'Ahmadpur East',
    'Vihari',
    'Jaranwala',
    'New Mirpur',
    'Kamalia',
    'Kot Addu',
    'Nowshera',
    'Swabi',
    'Khushab',
    'Dera Ghazi Khan',
    'Wah Cantonment',
    'Dera Ismail Khan',
    'Chaman',
    'Charsadda',
    'Kandhkot',
    'Chishtian',
    'Hasilpur',
    'Attock Khurd',
    'Muzaffarabad',
    'Mianwali',
    'Jhelum',
    'Mansehra',
    'Hafizabad',
    'Kohat',
    'Jacobabad',
    'Shikarpur',
    'Khanewal',
    'Chakwal',
    'Khairpur',
    'Daska',
    'Chiniot',
    'Kamoke',
    'Mandi Burewala',
    'Jalalpur Jattan',
    'Bhakkar',
    'Zhob',
    'Khuzdar',
    'Lodhran',
    'Malakand',
    'Attock',
    'Batgram',
    'Matiari',
    'Ghotki',
    'Naushahro Firoz',
    'Alpurai',
    'Bagh',
    'Daggar',
    'Leiah',
    'Tando Muhammad Khan',
];
