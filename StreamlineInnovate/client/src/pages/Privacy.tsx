// src/Components/PrivacyPolicy/PrivacyPolicy.jsx
import './Privacy.css';
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="privacy-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="title">Privacy Policy</h1>
      <p className="effective-date"><b>Effective Date:</b> 12-12-2024</p>

      <p className='privacy-p'>
        Welcome to <b>www.xstreaminds.com</b>. Protecting your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <b>www.xstreaminds.com</b>. Please read this policy carefully. If you do not agree with the terms of this policy, please do not use the Website.
      </p>

      <h3 className='head-one'>1. Information We Collect</h3>
      <p className='privacy-p'>We collect several types of information from and about users of our Website, including:</p>
      <h4 className='head-two'>a. Personal Information</h4>
      <p className='privacy-p'>Information that identifies you as an individual, such as:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Company name</li>
        <li>Any other information you provide directly to us via forms or communication channels.</li>
      </ul>

      <h4 className='head-two'>b. Non-Personal Information</h4>
      <p className='privacy-p'>Information that does not identify you as an individual, such as:</p>
      <ul>
        <li>Browser type and version</li>
        <li>Device type</li>
        <li>IP address</li>
        <li>Geolocation data</li>
        <li>Pages you visit and the time spent on those pages</li>
        <li>Referring website URLs</li>
      </ul>

      <h3 className='head-one'>2. How We Use Your Information</h3>
      <p className='privacy-p'>We may use the information we collect for the following purposes:</p>
      <ul>
        <li>To provide and maintain the Website</li>
        <li>To respond to your inquiries or fulfill your requests</li>
        <li>To personalize user experience and improve our offerings</li>
        <li>To send administrative communications, such as updates to this Privacy Policy</li>
        <li>To detect and prevent fraudulent or unauthorized activity</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h3 className='head-one'>3. How We Share Your Information</h3>
      <p className='privacy-p'>We do not sell your personal information. However, we may share your information in the following circumstances:</p>
      <ul>
        <li><b>With Service Providers:</b> We may share information with third-party vendors or service providers who help us operate the Website or provide services to you.</li>
        <li><b>For Legal Reasons:</b> We may disclose information to comply with legal obligations or to protect our rights and interests.</li>
        <li><b>In Business Transfers:</b> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred.</li>
      </ul>

      <h3 className='head-one'>4. Cookies and Tracking Technologies</h3>
      <p className='privacy-p'>We use cookies and similar technologies to enhance your experience on our Website. Cookies are small files stored on your device that help us:</p>
      <ul>
        <li>Remember your preferences</li>
        <li>Analyze Website traffic and performance</li>
      </ul>
      <p className='privacy-p'>You can manage your cookie preferences through your browser settings. However, disabling cookies may limit some functionalities of the Website.</p>

      <h3 className='head-one'>5. Data Security</h3>
      <p className='privacy-p'>We implement reasonable technical and organizational measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction. However, no system can guarantee absolute security.</p>

      <h3 className='head-one'>6. Third-Party Links</h3>
      <p className='privacy-p'>Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any information.</p>

      <h3 className='head-one'>7. Your Privacy Rights</h3>
      <p className='privacy-p'>Depending on your location, you may have certain rights under applicable data protection laws, such as:</p>
      <ul>
        <li>Accessing the personal information we hold about you</li>
        <li>Requesting correction of your personal information</li>
        <li>Requesting deletion of your personal information</li>
        <li>Opting out of certain data processing activities</li>
      </ul>

      <h3 className='head-one'>8. Children's Privacy</h3>
      <p className='privacy-p'>Our Website is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If we discover that we have collected information from a child, we will delete it promptly.</p>

      <h3 className='head-one'>9. Changes to This Privacy Policy</h3>
      <p className='privacy-p'>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a revised "Effective Date." Your continued use of the Website after such changes signifies your acceptance of the updated policy.</p>

      <h3 className='head-one'>10. Contact Us</h3>
      <p className='privacy-p'>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
      <p className='privacy-p'><b>Email:</b> <a href="mailto:sales@xstreaminds.com">sales@xstreaminds.com</a></p>
    </motion.div>
  );
};

export default PrivacyPolicy;
