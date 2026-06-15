import React from 'react';
import './PrezentarePontaj.css';
import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";
import { useLanguage, LanguageProvider } from "@/components/LanguageContext";

function PrezentarePontajContent() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-[#0a0e27] overflow-x-hidden pt-20">
            <Navbar />
                <div className="prezentare-wrapper">
            {/* Slide 1: Cover */}
            <div className="slide cover-slide" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 0, paddingTop: 0, paddingBottom: 0, gap: '40px', minHeight: '600px' }}>
                <div style={{ maxWidth: '500px', padding: '40px' }}>
                    <div style={{ width: '40px', height: '4px', background: '#3b82f6', marginBottom: '30px' }}></div>
                    <h1 style={{ fontSize: '48px' }}>{t("Intelligent Management System for", "Sistem Inteligent de Management pentru")} <span className="accent-text">{t("Any Industry", "Orice Domeniu")}</span></h1>
                    <p style={{ fontSize: '20px' }}>
                        {t("Smart Timesheet centralizes team activity, fleet monitoring, and material management in a single secure and fast cloud platform.", "Pontaj Digital centralizează activitatea echipelor, monitorizarea flotei și gestiunea materialelor într-o singură platformă cloud sigură și rapidă.")}
                    </p>
                    <p style={{ fontSize: '16px', color: '#94a3b8', marginTop: '20px' }}>
                        {t("Ideal for construction sites, logistics, HoReCa, production, security firms, cleaning, and any business with distributed teams.", "Ideal pentru construcții (șantiere), logistică, HoReCa, producție, firme de pază, curățenie și orice afacere cu echipe distribuite.")}
                    </p>
                    <div style={{ marginTop: '40px', fontSize: '14px', fontWeight: '700', color: '#3b82f6' }}>GetApp.ro</div>
                </div>
                <div style={{ flex: 1, minHeight: '600px', position: 'relative' }}>
                    <img src="/prezentare/smart_construction_hero.png" alt="Workers on site" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }} />
                </div>
            </div>

            {/* Slide 2: Problema */}
            <div className="slide">
                <span className="badge">{t("Operational Analysis", "Analiza Operațională")}</span>
                <h2>{t("Current Field Challenges", "Provocările actuale din teren")}</h2>
                <div className="grid grid-2">
                    <div>
                        <p>{t("The lack of digitalization in site management generates hidden financial losses, human errors, and administrative inefficiency.", "Lipsa de digitalizare în managementul șantierelor generează pierderi financiare ascunse, erori umane și ineficiență administrativă.")}</p>
                        <ul>
                            <li><strong>{t("Zero traceability:", "Trasabilitate zero:")}</strong> {t("Equipment and tools are moved between locations without a clear record.", "Echipamentele și uneltele sunt mutate între locații fără o evidență clară.")}</li>
                            <li><strong>{t("Inaccurate timesheets:", "Pontaje inexacte:")}</strong> {t("Worked hours are often reported incorrectly, increasing payroll costs.", "Orele lucrate sunt adesea raportate incorect, crescând costurile salariale.")}</li>
                            <li><strong>{t("Compliance risks:", "Riscuri de conformitate:")}</strong> {t("Fleet documents (MOT, Insurance) expire without notifying management.", "Documentele flotei auto (ITP, RCA) expiră fără ca managementul să fie notificat.")}</li>
                            <li><strong>{t("Cumbersome processes:", "Procese greoaie:")}</strong> {t("Material requests are transmitted chaotically, blocking work execution.", "Cererile de materiale se transmit haotic, blocând execuția lucrărilor.")}</li>
                        </ul>
                    </div>
                    <div className="feature-card">
                        <h3>{t("Financial Impact", "Impactul Financiar")}</h3>
                        <p>{t("Medium-sized companies lose significant percentages of their operational budget due to poor resource management. A centralized platform transforms chaos into a controllable and predictable workflow.", "Companiile medii pierd procente semnificative din bugetul operațional din cauza gestionării defectuoase a resurselor. O platformă centralizată transformă haosul într-un flux de lucru controlabil și predictibil.")}</p>
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Analysis & Context", "Analiză și Context")}</span></div>
            </div>

            {/* Slide 3: Dashboard Management */}
            <div className="slide">
                <span className="badge primary-badge">{t("Command Center", "Centrul de Comandă")}</span>
                <h2>{t("Real-Time Monitoring", "Monitorizare în Timp Real")}</h2>
                <div className="grid grid-2" style={{ alignItems: 'center' }}>
                    <div>
                        <p>{t("A complete overview of company activity. Management has instant access to essential data to make quick and informed decisions.", "O imagine de ansamblu completă a activității companiei. Managementul are acces instantaneu la date esențiale pentru a lua decizii rapide și informate.")}</p>
                        <ul>
                            <li><strong>{t("Key Performance Indicators (KPIs):", "Indicatori de performanță (KPI):")}</strong> {t("Hourly activity and employee distribution across sites.", "Activitatea orară și distribuția angajaților pe șantiere.")}</li>
                            <li><strong>{t("Automated alerts:", "Alerte automate:")}</strong> {t("Notifications for late arrivals or lack of GPS signal.", "Notificări privind sosirile întârziate sau lipsa semnalului GPS.")}</li>
                            <li><strong>{t("Summary dashboard:", "Panou de sinteză:")}</strong> {t("Status of material requests and alerts for the car fleet.", "Stadiul cererilor de materiale și alertele pentru flota auto.")}</li>
                        </ul>
                    </div>
                    <div className="screenshot-container">
                        <img src="/prezentare/dashboard_mockup.png" alt="Admin Dashboard Mockup" />
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Admin Dashboard", "Dashboard Administrator")}</span></div>
            </div>

            {/* Slide 4: Pontaj și GPS */}
            <div className="slide">
                <span className="badge primary-badge">{t("Attendance & Location", "Prezență și Locație")}</span>
                <h2>{t("Secure Timesheet via Geofencing", "Pontaj Securizat prin Geofencing")}</h2>
                <div className="grid grid-2" style={{ alignItems: 'center' }}>
                    <div className="screenshot-container" style={{ maxHeight: '400px' }}>
                        <img src="/prezentare/mobile_app_mockup.png" alt="Mobile Worker App Mockup" />
                    </div>
                    <div>
                        <p>{t("Our system ensures actual attendance at the workplace through perimeter validation technology (Geofencing).", "Sistemul nostru asigură prezența efectivă la punctul de lucru prin tehnologia de validare a perimetrului (Geofencing).")}</p>
                        <div className="feature-card" style={{ padding: '20px', marginBottom: '15px' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{t("Access Control", "Control Acces")}</h3>
                            <p style={{ fontSize: '14px', marginBottom: 0 }}>{t("The system blocks attendance registration if the employee is not within the defined site perimeter.", "Sistemul blochează înregistrarea prezenței dacă angajatul nu se află în perimetrul definit al șantierului.")}</p>
                        </div>
                        <div className="feature-card" style={{ padding: '20px' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{t("Automated Calculation", "Calcul Automat")}</h3>
                            <p style={{ fontSize: '14px', marginBottom: 0 }}>{t("Accurate recording of worked hours and breaks. Reports can be directly exported for the financial/payroll department.", "Înregistrarea precisă a orelor lucrate și a pauzelor. Rapoartele pot fi exportate direct pentru departamentul financiar/salarizare.")}</p>
                        </div>
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Attendance Management", "Managementul Prezenței")}</span></div>
            </div>

            {/* Slide 5: Magazie și Flotă */}
            <div className="slide">
                <span className="badge primary-badge">{t("Material Resources", "Resurse Materiale")}</span>
                <h2>{t("Advanced Logistics Management", "Gestiune Logistică Avansată")}</h2>
                <p>{t("Traceability control for high-value tools and preventive maintenance of the car fleet.", "Controlul trasabilității pentru uneltele de mare valoare și mentenanța preventivă a parcului auto.")}</p>
                
                <div className="grid grid-2" style={{ marginTop: '15px' }}>
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '160px', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
                            <img src="/prezentare/warehouse_tools_inventory.png" alt="Warehouse" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className="number-icon" style={{ marginBottom: '15px' }}>1</div>
                            <h3 style={{ fontSize: '20px' }}>{t("Warehouse & Tools Traceability", "Trasabilitatea Magaziei & Scule")}</h3>
                            <p style={{ marginBottom: 0, fontSize: '15px' }}>{t("Every equipment is digitally allocated to a worker. You know exactly who is using a tool and when it must be returned. Requests for new materials are sent directly from the app to the purchasing department.", "Orice echipament este alocat digital unui muncitor. Știi exact cine folosește o unealtă și când trebuie returnată. Cererile de noi materiale se trimit direct din aplicație către departamentul de achiziții.")}</p>
                        </div>
                    </div>
                    <div className="feature-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '160px', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
                            <img src="/prezentare/fleet_fuel_management.png" alt="Fleet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className="number-icon" style={{ marginBottom: '15px' }}>2</div>
                            <h3 style={{ fontSize: '20px' }}>{t("Fleet & Fuel Management", "Management Parc Auto & Combustibil")}</h3>
                            <p style={{ marginBottom: 0, fontSize: '15px' }}>{t("Scheduled alerts for MOT, Insurance, and maintenance. Drivers fill out the digital logbook, recording mileage and consumption directly in the platform.", "Alerte programate pentru ITP, Casco și mentenanță. Șoferii completează jurnalul de bord digital, înregistrând kilometrajul și consumul direct în platformă.")}</p>
                        </div>
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Logistics and Fleet", "Logistică și Flotă")}</span></div>
            </div>

            {/* Slide 6: Cereri Materiale (Screenshot) */}
            <div className="slide">
                <span className="badge primary-badge">{t("Approval Workflows", "Fluxe de Aprobare")}</span>
                <h2>{t("Structured Material Requests", "Cereri de Materiale Structurate")}</h2>
                <div className="grid grid-2" style={{ alignItems: 'center' }}>
                    <div>
                        <p>{t("A linear workflow from the site to the purchasing office. We eliminate unofficial communications and lost documents.", "Un flux de lucru liniar de la șantier la biroul de achiziții. Eliminăm comunicările neoficiale și documentele pierdute.")}</p>
                        <ul>
                            <li>{t("Team leaders generate material requirements in seconds.", "Sefii de echipă generează necesarul de materiale în câteva secunde.")}</li>
                            <li>{t("The administrator views and approves the order status from the central dashboard.", "Administratorul vizualizează și aprobă statusul comenzilor din panoul central.")}</li>
                            <li>{t("The delivery history ensures transparent billing on each project.", "Istoricul de livrări asigură o decontare transparentă pe fiecare proiect.")}</li>
                        </ul>
                    </div>
                    <div className="screenshot-container">
                        <img src="/prezentare/materials_mockup.png" alt="Modul Cereri Materiale Mockup" />
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Operational Processes", "Procese Operaționale")}</span></div>
            </div>

            {/* Slide 7: Rapoarte */}
            <div className="slide">
                <span className="badge primary-badge">Business Intelligence</span>
                <h2>{t("Financial Reports and Analytics", "Rapoarte și Analize Financiare")}</h2>
                <div className="grid grid-2" style={{ alignItems: 'center' }}>
                    <div>
                        <p>{t("Raw data is automatically transformed into easy-to-interpret visual reports. You have instant access to the performance of each site, labor costs, and material consumption.", "Datele brute sunt transformate automat în rapoarte vizuale ușor de interpretat. Ai acces instant la performanța fiecărui șantier, costurile cu forța de muncă și consumul de materiale.")}</p>
                        <ul>
                            <li><strong>{t("Cost Analysis:", "Analiza Costurilor:")}</strong> {t("Compare the estimated budget with the real one in real-time.", "Compară bugetul estimat cu cel real în timp real.")}</li>
                            <li><strong>{t("Team Productivity:", "Productivitatea Echipei:")}</strong> {t("Detailed reports on timesheets and efficiency.", "Rapoarte detaliate de pontaj și eficiență.")}</li>
                            <li><strong>{t("Strategic Decisions:", "Decizii Strategice:")}</strong> {t("Smart charts highlighting where money is lost and where to optimize.", "Grafice inteligente care evidențiază unde se pierd bani și unde se poate optimiza.")}</li>
                        </ul>
                    </div>
                    <div className="screenshot-container">
                        <img src="/prezentare/reports_analytics.png" alt="Rapoarte și Grafice Smart" />
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Analytics & Reports", "Analize & Rapoarte")}</span></div>
            </div>

            {/* Slide 8: Digitalizare PNRR 2026 */}
            <div className="slide">
                <span className="badge primary-badge">{t("State Funding & Grants", "Finanțare de Stat & PNRR")}</span>
                <h2>{t("SME Digitalization Project 2026", "Proiectul de Digitalizare IMM 2026")}</h2>
                <div className="grid grid-2" style={{ alignItems: 'flex-start', gap: '30px' }}>
                    <div>
                        <p style={{ marginBottom: '15px' }}>{t("Smart Timesheet is a 100% eligible solution for funds aimed at company digitalization (e.g. EU Grants). It ticks all the DESI criteria required by the state.", "Pontaj Digital este o soluție 100% eligibilă pentru fondurile destinate digitalizării companiilor (ex. PNRR). Bifează criteriile DESI cerute de stat.")}</p>
                        <ul>
                            <li><strong>{t("Cloud & SaaS:", "Cloud & SaaS:")}</strong> {t("Accessible from anywhere, fulfilling the core grant requirements.", "Accesibilă de oriunde, îndeplinind cerințele de bază ale granturilor.")}</li>
                            <li><strong>{t("Integration:", "Integrare:")}</strong> {t("Ready for mandatory standards (e-Invoice, e-Transport).", "Pregătită pentru normele obligatorii (e-Factura, e-Transport).")}</li>
                            <li><strong>{t("Settlement:", "Decontare:")}</strong> {t("The purchase of the license and hardware (tablets) is fully reimbursed.", "Achiziția licenței și a echipamentelor (tablete) se decontează integral.")}</li>
                        </ul>
                    </div>
                    <div className="feature-card" style={{ border: '2px dashed #3b82f6', textAlign: 'center', padding: '30px' }}>
                        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🇪🇺</div>
                        <h3 style={{ color: '#60a5fa', fontSize: '20px' }}>{t("Eligible Digital Transformation", "Transformare Digitală Eligibilă")}</h3>
                        <p style={{ fontSize: '15px', marginBottom: 0, color: '#94a3b8' }}>{t("Modernize your company using non-refundable funds. Our system helps you achieve the maximum score on technical criteria.", "Modernizați compania folosind fonduri nerambursabile. Sistemul nostru vă ajută să obțineți punctajul maxim la criteriile tehnice.")}</p>
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Digitalization Project 2026", "Proiect Digitalizare 2026")}</span></div>
            </div>

            {/* Slide 9: Concluzie */}
            <div className="slide">
                <span className="badge">Return On Investment</span>
                <h2>{t("Why Smart Timesheet?", "De ce Pontaj Digital?")}</h2>
                <div className="grid grid-3">
                    <div>
                        <h3>{t("Reduced Costs", "Costuri Reduse")}</h3>
                        <p>{t("Digitalization eliminates losses caused by human payroll errors and prevents the disappearance of unattended equipment.", "Digitalizarea elimină pierderile generate de erorile umane la salarizare și previne dispariția echipamentelor nesupravegheate.")}</p>
                    </div>
                    <div>
                        <h3>{t("Time Gained", "Timp Câștigat")}</h3>
                        <p>{t("Automating working hours frees the HR department from the task of centralizing physical timesheets.", "Automatizarea orelor de lucru eliberează departamentul de HR de sarcina centralizării foilor de pontaj fizice.")}</p>
                    </div>
                    <div>
                        <h3>{t("Easy Adoption", "Adoptare Ușoară")}</h3>
                        <p>{t("An interface built on minimalist design principles, easy to understand and adopt by field staff without technical training.", "O interfață construită pe principii de design minimalist, ușor de înțeles și adoptat de personalul din teren fără pregătire tehnică.")}</p>
                    </div>
                </div>
                
                <div style={{ marginTop: '50px', textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>{t("Contact us for a custom DEMO and discover operational efficiency.", "Contactați-ne pentru un DEMO personalizat și descoperiți eficiența operațională.")}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '18px', color: '#2563eb', fontWeight: 600 }}>
                        <span>📞 +40 757 777 712</span>
                        <span>✉️ contact@getapp.ro</span>
                        <span>🌐 www.getapp.ro</span>
                    </div>
                </div>
                <div className="footer"><span>GetApp.ro</span><span>{t("Conclusions", "Concluzii")}</span></div>
            </div>
                </div>
                <CTAFooter />
        </div>
    );
}

export default function PrezentarePontaj() {
    return (
        <LanguageProvider>
            <PrezentarePontajContent />
        </LanguageProvider>
    );
}
