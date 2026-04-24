import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.client';

export default function DynamicContactLinks() {
  const [socials, setSocials] = useState({
    whatsapp: '573180046952',
    mapsUrl: 'https://maps.app.goo.gl/oDdrQTzTKmmzR4d96',
    address: 'Cl 12 # 20 Oeste - 10'
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'configuracion', 'global'), (doc) => {
      if (doc.exists()) {
        setSocials(prev => ({ ...prev, ...doc.data() }));
      }
    });
    return () => unsub();
  }, []);

  return (
    <ul className="footer__links">
      <li>
        <a href={`https://wa.me/${socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer__link footer__link--icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          +{socials.whatsapp.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}
        </a>
      </li>
      <li>
        <a href={socials.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__link footer__link--icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {socials.address}
        </a>
      </li>
      <li>
        <span className="footer__link footer__link--static footer__link--icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Manzanares, Candelaria
        </span>
      </li>
    </ul>
  );
}
