import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const footerSections = [
    {
      title: "Shop",
      links: [
        { title: "Electronics", href: "/electronics" },
        { title: "Fashion", href: "/fashion" },
        { title: "Home & Garden", href: "/home" },
        { title: "Sports", href: "/sports" },
        { title: "Deals", href: "/deals" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { title: "Contact Us", href: "/contact" },
        { title: "Help Center", href: "/help" },
        { title: "Track Your Order", href: "/track" },
        { title: "Returns & Exchanges", href: "/returns" },
        { title: "Size Guide", href: "/size-guide" },
      ],
    },
    {
      title: "About",
      links: [
        { title: "About CartTech", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Press", href: "/press" },
        { title: "Investor Relations", href: "/investors" },
        { title: "Sustainability", href: "/sustainability" },
      ],
    },
    {
      title: "Policies",
      links: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Cookie Policy", href: "/cookies" },
        { title: "Shipping Policy", href: "/shipping" },
        { title: "Refund Policy", href: "/refunds" },
      ],
    },
  ];
  
  export const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];