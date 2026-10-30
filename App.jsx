import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ShoppingCart, Link2, PackageCheck, Headphones, ShieldCheck, ArrowRight, MapPin, Menu, X } from "lucide-react";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key) : null;
const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "";

export default function App() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name:"", phone:"", email:"", product_url:"", product_name:"",
    province:"", district:"", municipality:"", ward:"", address:"", landmark:"", postal_code:""
  });
  const update = e => setForm(p => ({...p, [e.target.name]:e.target.value}));

  async function submit(e) {
    e.preventDefault(); setStatus("");
    if (!/^https?:\/\//i.test(form.product_url)) {
      setStatus("Please enter a complete product link beginning with https://");
      return;
    }
    if (!supabase) {
      setStatus("Website setup is not complete yet. The database connection must be added before orders can be submitted.");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.from("orders").insert([{
      customer_name:form.name, phone:form.phone, email:form.email || null,
      product_url:form.product_url, product_name:form.product_name || null,
      province:form.province, district:form.district, municipality:form.municipality,
      ward:form.ward, address:form.address, landmark:form.landmark || null,
      postal_code:form.postal_code || null, payment_method:"Cash on Delivery",
      status:"Received"
    }]).select("tracking_code").single();
    setBusy(false);
    if (error) { setStatus("Order could not be submitted. Please check the database setup and try again."); return; }
    setStatus(`Order request received. Your tracking code is ${data.tracking_code}. Keep it safe.`);
    setForm({name:"",phone:"",email:"",product_url:"",product_name:"",province:"",district:"",municipality:"",ward:"",address:"",landmark:"",postal_code:""});
  }

  function whatsapp() {
    if (!waNumber || waNumber.includes("X")) { setStatus("WhatsApp support number has not been configured yet."); return; }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello ALL-IN-ONE-CART, I need customer support.")}`, "_blank");
  }

  return <div>
    <header className="header"><a className="brand" href="#"><span className="brand-icon"><ShoppingCart size={22}/></span><span>ALL-IN-ONE-CART<small>Your Needs, One Cart!</small></span></a>
      <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
      <nav className={menu?"nav open":"nav"}><a href="#how">How it works</a><a href="#order">Submit product</a><a href="#tracking">Order tracking</a><button className="nav-cta" onClick={whatsapp}>Contact support</button></nav>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow">SHOP SMART • ORDER EASY</span><h1>Everything you need.<br/><em>One easy place.</em></h1><p>Find a product on Amazon, Flipkart, or another online platform. Send us its link and submit your order request here.</p><div className="hero-actions"><a className="primary" href="#order">Submit a product link <ArrowRight size={18}/></a><a className="secondary" href="#how">See how it works</a></div><div className="trust"><ShieldCheck size={17}/> Cash on Delivery request · Customer support</div></div>
        <div className="hero-card"><div className="card-top"><span>YOUR SHOPPING, SIMPLIFIED</span><span className="live-dot">● EASY</span></div><div className="basket-art"><div className="basket-circle"><ShoppingCart size={76} strokeWidth={1.25}/></div><div className="float-tag tag-one">Product link <Link2 size={15}/></div><div className="float-tag tag-two">Order request <PackageCheck size={15}/></div></div><div className="hero-card-bottom"><b>One cart. Many stores.</b><span>Send a link • Request delivery</span></div></div>
      </section>
      <section className="features" id="how"><div className="section-heading"><span className="eyebrow">SIMPLE STEPS</span><h2>How it works</h2><p>Start with a product link from the shopping platform you prefer.</p></div><div className="feature-grid">
        <article><span className="feature-icon"><Link2/></span><b>1. Share a link</b><p>Copy the product URL from Amazon, Flipkart, or another platform.</p></article>
        <article><span className="feature-icon"><ShoppingCart/></span><b>2. Submit your request</b><p>Enter your contact and delivery address details in the form.</p></article>
        <article><span className="feature-icon"><PackageCheck/></span><b>3. Confirm and track</b><p>Our team reviews the request and shares order updates.</p></article>
      </div></section>
      <section className="order-section" id="order"><div className="form-intro"><span className="eyebrow">PLACE A REQUEST</span><h2>What would you like us to find?</h2><p>Paste a product link and add the delivery details. Cash on Delivery is the requested payment method; availability and final price must be confirmed by the store team.</p><div className="note"><ShieldCheck size={19}/><span>Your address is submitted securely to the connected order database when setup is complete. Do not submit real customer details until the site is configured and tested.</span></div></div>
        <form className="order-form" onSubmit={submit}><h3>Product & customer details</h3><div className="field"><label>Product link *</label><input name="product_url" type="url" placeholder="https://..." value={form.product_url} onChange={update} required/></div><div className="field"><label>Product name (optional)</label><input name="product_name" placeholder="Enter product name" value={form.product_name} onChange={update}/></div>
        <div className="form-row"><div className="field"><label>Full name *</label><input name="name" placeholder="Your name" value={form.name} onChange={update} required/></div><div className="field"><label>Mobile number *</label><input name="phone" type="tel" placeholder="98XXXXXXXX" value={form.phone} onChange={update} required/></div></div>
        <div className="field"><label>Email (optional)</label><input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={update}/></div>
        <h3 className="address-title"><MapPin size={19}/> Delivery address</h3>
        <div className="form-row"><div className="field"><label>Province / State *</label><input name="province" placeholder="Province" value={form.province} onChange={update} required/></div><div className="field"><label>District *</label><input name="district" placeholder="District" value={form.district} onChange={update} required/></div></div>
        <div className="form-row"><div className="field"><label>Municipality / City *</label><input name="municipality" placeholder="Municipality or city" value={form.municipality} onChange={update} required/></div><div className="field"><label>Ward number *</label><input name="ward" placeholder="Ward no." value={form.ward} onChange={update} required/></div></div>
        <div className="field"><label>Full delivery address *</label><textarea name="address" rows="3" placeholder="Tole, street, house or delivery details" value={form.address} onChange={update} required/></div>
        <div className="form-row"><div className="field"><label>Nearby landmark (optional)</label><input name="landmark" placeholder="Nearby place" value={form.landmark} onChange={update}/></div><div className="field"><label>Postal code (optional)</label><input name="postal_code" placeholder="Postal code" value={form.postal_code} onChange={update}/></div></div>
        <div className="payment"><span>Requested payment method</span><b>Cash on Delivery</b></div><label className="consent"><input type="checkbox" required/> I confirm these details are correct and agree to be contacted about this order request.</label>
        <button className="submit" disabled={busy}>{busy?"Submitting...":"Submit order request"} <ArrowRight size={18}/></button>{status&&<p className="status" role="status">{status}</p>}<small className="privacy">Please submit only information needed to process your order.</small></form>
      </section>
      <section className="tracking" id="tracking"><div><span className="eyebrow">STAY UPDATED</span><h2>Order tracking</h2><p>Tracking lookup will be activated after the database and customer tracking page are configured.</p></div><div className="tracking-box"><PackageCheck size={28}/><b>Tracking setup is next</b><span>Your order code will be generated after a successful submission.</span></div></section>
      <section className="support"><div><span className="eyebrow">WE'RE HERE TO HELP</span><h2>Need a hand?</h2><p>Contact the store team for questions about product links and order requests.</p></div><button className="primary" onClick={whatsapp}><Headphones size={18}/> WhatsApp support</button></section>
    </main>
    <footer><a className="brand footer-brand" href="#"><span className="brand-icon"><ShoppingCart size={20}/></span><span>ALL-IN-ONE-CART<small>Your Needs, One Cart!</small></span></a><span>© {new Date().getFullYear()} ALL-IN-ONE-CART. All rights reserved.</span><span>Product availability and final prices are subject to confirmation.</span></footer>
  </div>;
}