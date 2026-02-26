# Anis Boutique — Frontend

This is the frontend repository for *Anis Boutique*, a premium fashion and fabric e-commerce platform based in Chennai. Built using HTML, CSS, and Vanilla JavaScript, this frontend delivers a clean, responsive, boutique-style shopping experience with dynamic product rendering and Razorpay checkout integration.

# Core Responsibilities

- Dynamic product rendering using backend APIs
- Category-based browsing and filtering
- Product detail page with color and quality selection
- LocalStorage-based cart system
- Coupon application logic
- Razorpay payment integration
- Order tracking via phone number
- Admin dashboard for product and coupon management
- Lens feature for color-based product discovery

# Frontend Pages

## Public Pages

- `/index.html` → Homepage (materials & featured categories)
- `/html/category.html` → Category-based product listing
- `/html/product.html` → Product details page
- `/html/search.html` → Product search page
- `/html/cart.html` → Shopping cart
- `/html/checkout.html` → Secure checkout
- `/html/order-success.html` → Order confirmation
- `/html/contact.html` → Contact & store locations
- `/html/privacy.html` → Privacy policy

## Admin Pages

- `/html/admin-login.html` → Admin authentication
- `/html/admin-dashboard.html` → Product & coupon management

> Note: Admin routes require backend authentication token.  
> Checkout works without login (guest checkout enabled).

# Key Features

## Product System

- Dynamic product loading via Fetch API
- Multiple image rendering
- Discount price logic handling
- Base color matching system
- Special quality selection for lining products

## Cart System

- Stored in browser localStorage
- Supports quantity, color, and quality
- Coupon validation before checkout
- Real-time total calculation

## Checkout

- Razorpay integration
- Secure payment handling
- Order success confirmation page

## Lens Feature

- Captures dominant image color
- Matches against predefined color palette
- Filters products based on closest color match

# SEO Implementation

- Page-specific meta tags
- Open Graph integration
- Twitter Cards
- Canonical URLs
- Structured Data (ClothingStore schema)
- `robots.txt`
- `sitemap.xml`
- Sensitive pages set to `noindex`

# Technologies Used

- HTML5
- CSS3 (Custom responsive layout)
- Vanilla JavaScript (ES6)
- Fetch API
- LocalStorage
- Razorpay Checkout.js
- JSON-LD structured data

# Project Structure

# Security & Best Practices

- No sensitive data stored on frontend
- Admin authentication token stored securely
- Checkout secured through Razorpay
- Sensitive/admin pages excluded from indexing
- API base URL managed through `config.js`

# Deployment

Frontend can be deployed on any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Traditional hosting (cPanel)

## Deployment Steps

- Push repository to GitHub
- Connect hosting provider
- Configure correct API base URL in `config.js`
- Ensure `robots.txt` and `sitemap.xml` are live

# Developer

**Kevin Antony**  
Full-Stack Developer & Creator of Anis Boutique

# License

Frontend code © 2025 Kevin Antony  
All rights reserved. Redistribution or replication is not permitted without written consent.
