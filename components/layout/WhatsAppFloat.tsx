export default function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/923004720117"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
            aria-label="Contact us on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
    );
}
