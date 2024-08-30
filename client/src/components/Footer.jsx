import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-light-golden via-amber-100 to-light-golden">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <img className="w-40" src="https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png" alt="Jewelry Logo" />
                        <p className="max-w-xs mt-4 text-sm text-gray-600">
                            Discover our exquisite collection of fine jewelry crafted with passion and precision. Elevate your style with our unique designs and timeless pieces.
                        </p>
                        <div className="flex mt-8 space-x-6 text-gray-600">
                            <a className="hover:opacity-75" target="_blank" rel="noreferrer" href='https://www.facebook.com/profile.php?id=100030600582965'>
                                <span className="sr-only"> Facebook </span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a className="hover:opacity-75" target="_blank" rel="noreferrer" href='https://www.instagram.com/iamfaiz55/'>
                                <span className="sr-only"> Instagram </span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href='https://x.com/Iamfaiz55' className="hover:opacity-75" target="_blank" rel="noreferrer">
                                <span className="sr-only"> Twitter </span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href='https://github.com/iamfaiz55' className="hover:opacity-75" target="_blank" rel="noreferrer">
                                <span className="sr-only"> GitHub </span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.418 2.867 8.165 6.838 9.492.5.093.68-.217.68-.482v-1.835c-2.636.575-3.187-1.222-3.187-1.222-.482-1.226-1.178-1.553-1.178-1.553-.96-.662.072-.648.072-.648 1.064.074 1.622 1.088 1.622 1.088.945 1.616 2.476 1.151 3.078.88.093-.683.369-1.15.673-1.413-2.334-.265-4.8-1.167-4.8-5.188 0-1.147.407-2.085 1.08-2.82-.109-.263-.469-1.321.095-2.75 0 0 .872-.278 2.855 1.067.83-.23 1.723-.34 2.612-.344.889.004 1.779.114 2.61.344 1.985-1.345 2.84-1.067 2.84-1.067.558 1.429.208 2.487.097 2.75.677.735 1.084 1.673 1.084 2.82 0 4.033-2.464 4.917-4.805 5.173.379.328.715.977.715 1.975v2.938c0 .269.18.576.686.482C21.134 20.167 24 16.42 24 12 24 6.48 19.52 2 14 2h-2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">About</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a href='/user/about' className="text-gray-600 hover:text-gray-800">Our Story</a>
                                    </li>
                                    <li>
                                        <a href='/user/contact' className="text-gray-600 hover:text-gray-800">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href='/user/mission' className="text-gray-600 hover:text-gray-800">Careers</a>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Customer Care</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Returns</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Shipping</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Warranty</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">FAQ</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Follow Us</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Blog</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Lookbook</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Newsletter</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-800">Events</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} SF Jwellers. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
