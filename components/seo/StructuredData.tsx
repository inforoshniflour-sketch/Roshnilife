'use client';

export default function StructuredData() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ROSHNI',
        url: 'https://roshnilife.com',
        logo: 'https://roshnilife.com/images/logo-improved.png',
        description: 'Premium Multi-Grain Flour manufacturer in Pakistan',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Eden Value Homes',
            addressLocality: 'Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'PK',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+92-300-4720117',
            contactType: 'Customer Service',
            areaServed: 'PK',
            availableLanguage: ['English', 'Urdu'],
        },
        sameAs: [
            'https://facebook.com/roshniflour',
            'https://instagram.com/roshniflour',
            'https://twitter.com/roshniflour',
        ],
    };

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'ROSHNI Multi-Grain Flour',
        description:
            'Premium multi-grain flour made from 7 natural grains. 100% natural, stone-ground, high protein, and fiber-rich.',
        brand: {
            '@type': 'Brand',
            name: 'ROSHNI',
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'PKR',
            seller: {
                '@type': 'Organization',
                name: 'ROSHNI',
            },
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '150',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://roshnilife.com',
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
