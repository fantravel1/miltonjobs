#!/usr/bin/env node
/**
 * Job Landing Page Generator for MiltonJobs.com
 * Generates 35 SEO-optimized job category landing pages
 */

const fs = require('fs');
const path = require('path');

const jobsDir = path.join(__dirname, 'jobs');
if (!fs.existsSync(jobsDir)) fs.mkdirSync(jobsDir, { recursive: true });

const jobs = [
  {
    slug: 'warehouse-jobs-milton',
    title: 'Warehouse & Logistics Jobs in Milton, Ontario',
    emoji: '&#128230;',
    h1: 'Warehouse & Logistics Jobs in Milton, ON',
    subtitle: 'Find warehouse, fulfillment, and logistics positions along Milton\'s Highway 401 corridor.',
    salary: '$17-$28/hour',
    demand: 'Very High',
    entryLevel: 'Yes',
    description: 'Milton is one of Ontario\'s premier logistics hubs. With Amazon\'s massive fulfilment centre, multiple distribution warehouses, and a strategic location along Highway 401, warehouse jobs are the most in-demand positions in Milton. Roles include order picking, packing, shipping & receiving, forklift operation, inventory management, and warehouse supervision.',
    employers: ['Amazon YYZ4 Fulfilment Centre', 'Maple Leaf Foods Distribution', 'Loblaws Distribution Centre', 'Gordon Food Service', 'UPS Supply Chain Solutions'],
    skills: ['Forklift certification (asset)', 'Physical stamina - lifting up to 50 lbs', 'Basic computer skills for inventory systems', 'Ability to work shifts (days, afternoons, nights)', 'Steel-toed boots required', 'Attention to detail for order accuracy'],
    relatedJobs: ['truck-driving-jobs-milton', 'general-labour-jobs-milton', 'manufacturing-jobs-milton', 'retail-jobs-milton']
  },
  {
    slug: 'retail-jobs-milton',
    title: 'Retail & Sales Jobs in Milton, Ontario',
    emoji: '&#128717;',
    h1: 'Retail & Sales Jobs in Milton, ON',
    subtitle: 'Retail associate, cashier, and sales positions at Milton\'s shopping centres and plazas.',
    salary: '$16-$22/hour',
    demand: 'High',
    entryLevel: 'Yes',
    description: 'Milton\'s growing population drives strong demand for retail workers. From big box stores at Milton Crossroads and Milton Marketplace to boutique shops on Main Street, there are retail positions across the town. Roles include sales associates, cashiers, stock clerks, customer service reps, and store managers.',
    employers: ['Walmart Milton', 'Canadian Tire Milton', 'Costco Milton', 'Shoppers Drug Mart', 'Winners/HomeSense', 'LCBO Milton', 'Home Depot Milton'],
    skills: ['Customer service experience', 'Cash handling', 'POS system operation', 'Product knowledge', 'Flexible scheduling availability', 'Bilingual an asset (English/French)'],
    relatedJobs: ['restaurant-jobs-milton', 'warehouse-jobs-milton', 'customer-service-jobs-milton', 'office-admin-jobs-milton']
  },
  {
    slug: 'restaurant-jobs-milton',
    title: 'Restaurant & Food Service Jobs in Milton, Ontario',
    emoji: '&#127869;',
    h1: 'Restaurant & Food Service Jobs in Milton, ON',
    subtitle: 'Cook, server, barista, and kitchen staff positions at Milton\'s restaurants and cafes.',
    salary: '$16-$20/hour + tips',
    demand: 'High',
    entryLevel: 'Yes',
    description: 'Milton\'s restaurant scene is thriving with diverse cuisine options. From family restaurants on Main Street to fast food chains, bubble tea shops, and cafes, there are numerous food service positions available. Roles include line cooks, prep cooks, servers, hosts, baristas, dishwashers, and restaurant managers.',
    employers: ['Boston Pizza Milton', 'Montana\'s BBQ & Bar', 'Swiss Chalet Milton', 'Tim Hortons (multiple locations)', 'Starbucks Milton', 'McDonald\'s Milton', 'Various independent restaurants'],
    skills: ['Food Handler Certification (required)', 'Smart Serve certification for serving alcohol', 'Ability to work evenings and weekends', 'Fast-paced work environment', 'Customer service skills', 'Teamwork and communication'],
    relatedJobs: ['retail-jobs-milton', 'customer-service-jobs-milton', 'cleaning-janitorial-jobs-milton', 'hotel-hospitality-jobs-milton']
  },
  {
    slug: 'healthcare-jobs-milton',
    title: 'Healthcare Jobs in Milton, Ontario',
    emoji: '&#129658;',
    h1: 'Healthcare Jobs in Milton, ON',
    subtitle: 'Nursing, PSW, medical admin, and clinical positions at Milton District Hospital and local clinics.',
    salary: '$20-$55/hour',
    demand: 'Very High',
    entryLevel: 'Some positions',
    description: 'Healthcare is one of Milton\'s fastest-growing sectors. Milton District Hospital, walk-in clinics, dental offices, physiotherapy clinics, and long-term care homes all have ongoing staffing needs. Roles range from personal support workers (PSWs) and registered nurses to medical office administrators, dental hygienists, and physicians.',
    employers: ['Milton District Hospital', 'Halton Healthcare Services', 'CBI Health Milton', 'Various dental clinics', 'Various walk-in clinics', 'Allendale Long Term Care'],
    skills: ['Relevant healthcare certification/degree', 'CPR/First Aid certification', 'Strong communication skills', 'Empathy and patient care focus', 'Ability to work rotating shifts', 'Ontario healthcare registration (if applicable)'],
    relatedJobs: ['education-jobs-milton', 'office-admin-jobs-milton', 'personal-care-jobs-milton', 'cleaning-janitorial-jobs-milton']
  },
  {
    slug: 'construction-jobs-milton',
    title: 'Construction & Trades Jobs in Milton, Ontario',
    emoji: '&#127959;',
    h1: 'Construction & Trades Jobs in Milton, ON',
    subtitle: 'Skilled trades, general labour, and construction management positions in Milton\'s booming building sector.',
    salary: '$20-$45/hour',
    demand: 'Very High',
    entryLevel: 'General labour yes',
    description: 'Milton is one of Canada\'s fastest-growing communities with massive residential and commercial development. Construction jobs are in extremely high demand including carpenters, framers, concrete workers, heavy equipment operators, project managers, and general labourers. New subdivisions in Dempsey, Harrison, and Boyne communities are creating thousands of positions.',
    employers: ['Mattamy Homes', 'Argo Development', 'Various general contractors', 'Town of Milton infrastructure projects', 'Halton Region projects'],
    skills: ['Construction Safety Training (WHMIS, Working at Heights)', 'Physical fitness', 'Valid G driver\'s licence', 'Trade certification an asset', 'Ability to work outdoors in all weather', 'Experience with power tools'],
    relatedJobs: ['general-labour-jobs-milton', 'truck-driving-jobs-milton', 'hvac-plumbing-electrical-jobs-milton', 'landscaping-jobs-milton']
  },
  {
    slug: 'truck-driving-jobs-milton',
    title: 'Truck Driving & Delivery Jobs in Milton, Ontario',
    emoji: '&#128666;',
    h1: 'Truck Driving & Delivery Jobs in Milton, ON',
    subtitle: 'AZ, DZ driver and delivery courier positions across the Halton Region.',
    salary: '$20-$35/hour',
    demand: 'High',
    entryLevel: 'License required',
    description: 'Milton\'s position as a logistics hub along Highway 401 creates strong demand for truck drivers and delivery personnel. AZ and DZ licensed drivers are needed for long-haul, short-haul, and local delivery routes. Amazon delivery drivers, food delivery couriers, and moving company drivers are also in high demand.',
    employers: ['Amazon Delivery Service Partners', 'FedEx Ground', 'Purolator', 'Various trucking companies', 'Food delivery services (DoorDash, Uber Eats, Skip)'],
    skills: ['Valid AZ or DZ licence', 'Clean driving abstract', 'CVOR knowledge', 'Ability to lift heavy packages', 'GPS and route planning', 'Long hours of driving stamina'],
    relatedJobs: ['warehouse-jobs-milton', 'general-labour-jobs-milton', 'construction-jobs-milton', 'automotive-jobs-milton']
  },
  {
    slug: 'office-admin-jobs-milton',
    title: 'Office & Administrative Jobs in Milton, Ontario',
    emoji: '&#128188;',
    h1: 'Office & Administrative Jobs in Milton, ON',
    subtitle: 'Receptionist, admin assistant, data entry, and office management positions.',
    salary: '$18-$30/hour',
    demand: 'Moderate',
    entryLevel: 'Yes',
    description: 'Milton\'s growing business community needs administrative professionals across all industries. Positions include receptionists, administrative assistants, office managers, data entry clerks, executive assistants, and customer service coordinators. Many offices are located along the Steeles Avenue and James Snow Parkway corridors.',
    employers: ['Town of Milton', 'Halton Region offices', 'Various law firms', 'Real estate offices', 'Medical and dental offices', 'Insurance agencies'],
    skills: ['Microsoft Office proficiency', 'Excellent communication skills', 'Organizational abilities', 'Multi-tasking capacity', 'Professional phone etiquette', 'Data entry accuracy'],
    relatedJobs: ['accounting-finance-jobs-milton', 'customer-service-jobs-milton', 'real-estate-jobs-milton', 'healthcare-jobs-milton']
  },
  {
    slug: 'education-jobs-milton',
    title: 'Education & Teaching Jobs in Milton, Ontario',
    emoji: '&#127979;',
    h1: 'Education & Teaching Jobs in Milton, ON',
    subtitle: 'Teachers, ECEs, educational assistants, and tutoring positions at Milton schools.',
    salary: '$22-$55/hour',
    demand: 'High',
    entryLevel: 'Certification required',
    description: 'Milton\'s rapidly growing population means new schools are opening regularly. Both the Halton District School Board (HDSB) and Halton Catholic District School Board (HCDSB) hire teachers, ECEs, educational assistants, and support staff. Private tutoring centres and before/after school programs also have openings.',
    employers: ['Halton District School Board (HDSB)', 'Halton Catholic District School Board (HCDSB)', 'Kumon Milton', 'Sylvan Learning Milton', 'Various private schools', 'YMCA before/after school programs'],
    skills: ['Ontario College of Teachers certification (for teachers)', 'ECE diploma or degree', 'Vulnerable Sector Police Check', 'First Aid/CPR certification', 'Strong communication skills', 'Patience and creativity'],
    relatedJobs: ['daycare-childcare-jobs-milton', 'office-admin-jobs-milton', 'healthcare-jobs-milton', 'recreation-jobs-milton']
  },
  {
    slug: 'it-tech-jobs-milton',
    title: 'IT & Technology Jobs in Milton, Ontario',
    emoji: '&#128187;',
    h1: 'IT & Technology Jobs in Milton, ON',
    subtitle: 'Software developers, IT support, network engineers, and tech positions.',
    salary: '$25-$65/hour',
    demand: 'Growing',
    entryLevel: 'Some positions',
    description: 'As Milton grows, so does demand for IT professionals. Local businesses need IT support technicians, network administrators, and web developers. Many Milton residents also work remotely for Toronto-area tech companies. Opportunities exist in IT helpdesk, system administration, cybersecurity, software development, and data analysis.',
    employers: ['Various Milton businesses', 'Remote positions for GTA companies', 'Town of Milton IT department', 'School board IT teams', 'Managed IT service providers'],
    skills: ['Relevant IT certifications (CompTIA, CCNA, etc.)', 'Programming languages (Python, JavaScript, etc.)', 'Network administration', 'Cloud platforms (AWS, Azure)', 'Problem-solving abilities', 'Customer service for helpdesk roles'],
    relatedJobs: ['office-admin-jobs-milton', 'accounting-finance-jobs-milton', 'customer-service-jobs-milton', 'warehouse-jobs-milton']
  },
  {
    slug: 'accounting-finance-jobs-milton',
    title: 'Accounting & Finance Jobs in Milton, Ontario',
    emoji: '&#128202;',
    h1: 'Accounting & Finance Jobs in Milton, ON',
    subtitle: 'Bookkeepers, accountants, financial advisors, and banking positions.',
    salary: '$22-$50/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'Milton has a growing financial services sector with numerous accounting firms, banks, credit unions, and financial planning offices. Positions include bookkeepers, tax preparers, payroll administrators, financial advisors, bank tellers, mortgage specialists, and chartered professional accountants.',
    employers: ['TD Canada Trust Milton', 'RBC Royal Bank Milton', 'BMO Milton', 'Scotiabank Milton', 'Various CPA firms', 'H&R Block Milton'],
    skills: ['Accounting degree or diploma', 'CPA designation (for senior roles)', 'Proficiency in QuickBooks, Sage, or Xero', 'Attention to detail', 'Knowledge of Canadian tax law', 'Excel proficiency'],
    relatedJobs: ['office-admin-jobs-milton', 'real-estate-jobs-milton', 'insurance-jobs-milton', 'it-tech-jobs-milton']
  },
  {
    slug: 'real-estate-jobs-milton',
    title: 'Real Estate Jobs in Milton, Ontario',
    emoji: '&#127968;',
    h1: 'Real Estate Jobs in Milton, ON',
    subtitle: 'Real estate agents, property managers, and mortgage broker positions.',
    salary: 'Commission-based / $40K-$150K+',
    demand: 'Moderate',
    entryLevel: 'Licensing required',
    description: 'Milton\'s hot real estate market creates opportunities for real estate agents, property managers, mortgage brokers, home inspectors, and appraisers. With new developments continuously being built, there is strong demand for professionals who can help buyers and sellers navigate Milton\'s housing market.',
    employers: ['RE/MAX Milton', 'Royal LePage Milton', 'Keller Williams Milton', 'Century 21 Milton', 'Various independent brokerages'],
    skills: ['OREA real estate license', 'Strong networking and sales skills', 'Local market knowledge', 'Negotiation abilities', 'Valid driver\'s licence', 'Marketing and social media skills'],
    relatedJobs: ['accounting-finance-jobs-milton', 'insurance-jobs-milton', 'office-admin-jobs-milton', 'construction-jobs-milton']
  },
  {
    slug: 'cleaning-janitorial-jobs-milton',
    title: 'Cleaning & Janitorial Jobs in Milton, Ontario',
    emoji: '&#129529;',
    h1: 'Cleaning & Janitorial Jobs in Milton, ON',
    subtitle: 'Commercial and residential cleaning, janitorial, and housekeeping positions.',
    salary: '$16-$22/hour',
    demand: 'High',
    entryLevel: 'Yes',
    description: 'Cleaning and janitorial services are always in demand in Milton. Office buildings, schools, medical facilities, retail stores, and residential clients all need cleaning professionals. Roles include commercial janitors, residential house cleaners, carpet cleaners, window cleaners, and cleaning supervisors.',
    employers: ['Various cleaning companies', 'Milton schools (HDSB/HCDSB)', 'Milton District Hospital', 'Commercial property managers', 'Residential cleaning services'],
    skills: ['Knowledge of cleaning chemicals and safety (WHMIS)', 'Physical stamina', 'Attention to detail', 'Reliability and punctuality', 'Valid driver\'s licence an asset', 'Ability to work evenings/weekends'],
    relatedJobs: ['general-labour-jobs-milton', 'warehouse-jobs-milton', 'hotel-hospitality-jobs-milton', 'landscaping-jobs-milton']
  },
  {
    slug: 'customer-service-jobs-milton',
    title: 'Customer Service Jobs in Milton, Ontario',
    emoji: '&#128222;',
    h1: 'Customer Service Jobs in Milton, ON',
    subtitle: 'Call centre, front desk, and customer support representative positions.',
    salary: '$17-$25/hour',
    demand: 'Moderate',
    entryLevel: 'Yes',
    description: 'Customer service roles exist across virtually every industry in Milton. From front desk receptionists to call centre agents, customer support representatives, and client service coordinators, these positions offer stable employment with regular hours.',
    employers: ['Various Milton businesses', 'Banks and financial institutions', 'Insurance companies', 'Telecom providers', 'Healthcare offices'],
    skills: ['Excellent verbal and written communication', 'Problem-solving abilities', 'Patience and empathy', 'Computer literacy', 'CRM software experience', 'Bilingual an asset'],
    relatedJobs: ['retail-jobs-milton', 'office-admin-jobs-milton', 'insurance-jobs-milton', 'hotel-hospitality-jobs-milton']
  },
  {
    slug: 'general-labour-jobs-milton',
    title: 'General Labour Jobs in Milton, Ontario',
    emoji: '&#128170;',
    h1: 'General Labour Jobs in Milton, ON',
    subtitle: 'Entry-level labour, production, and physical work positions across Milton.',
    salary: '$17-$24/hour',
    demand: 'Very High',
    entryLevel: 'Yes',
    description: 'General labour positions are plentiful in Milton across manufacturing, construction, warehousing, and landscaping. These roles typically require physical fitness and a strong work ethic. Many temp agencies in Milton specialize in placing general labourers in both temporary and permanent positions.',
    employers: ['Various temp agencies (Randstad, Adecco, etc.)', 'Construction companies', 'Warehouses and factories', 'Landscaping companies', 'Moving companies'],
    skills: ['Physical fitness and ability to lift heavy loads', 'Steel-toed safety boots', 'Reliable transportation', 'Willingness to work various shifts', 'Basic safety training (WHMIS)', 'Teamwork abilities'],
    relatedJobs: ['warehouse-jobs-milton', 'construction-jobs-milton', 'manufacturing-jobs-milton', 'landscaping-jobs-milton']
  },
  {
    slug: 'manufacturing-jobs-milton',
    title: 'Manufacturing Jobs in Milton, Ontario',
    emoji: '&#127981;',
    h1: 'Manufacturing Jobs in Milton, ON',
    subtitle: 'Production line, machine operator, and quality control positions at Milton factories.',
    salary: '$18-$30/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'Milton has a number of manufacturing and production facilities, particularly in the industrial areas along Highway 401 and Steeles Avenue. Roles include machine operators, production line workers, quality control inspectors, CNC machinists, welders, and manufacturing supervisors.',
    employers: ['Various manufacturing plants', 'Food processing facilities', 'Automotive parts manufacturers', 'Packaging companies'],
    skills: ['Machine operation experience', 'Quality control knowledge', 'Safety certification (WHMIS, lockout/tagout)', 'Mechanical aptitude', 'Ability to stand for long periods', 'Shift work flexibility'],
    relatedJobs: ['warehouse-jobs-milton', 'general-labour-jobs-milton', 'truck-driving-jobs-milton', 'construction-jobs-milton']
  },
  {
    slug: 'hvac-plumbing-electrical-jobs-milton',
    title: 'HVAC, Plumbing & Electrical Jobs in Milton, Ontario',
    emoji: '&#128295;',
    h1: 'HVAC, Plumbing & Electrical Jobs in Milton, ON',
    subtitle: 'Licensed trade positions for HVAC techs, plumbers, and electricians.',
    salary: '$25-$50/hour',
    demand: 'Very High',
    entryLevel: 'Apprenticeships available',
    description: 'Skilled trades are in critical demand across Milton. With thousands of new homes being built annually, licensed HVAC technicians, plumbers, and electricians are highly sought after. Both new construction and service/maintenance roles are available.',
    employers: ['Various HVAC companies', 'Plumbing service companies', 'Electrical contractors', 'Home builders', 'Property management firms'],
    skills: ['Valid trade licence (313A, 306A, 309A, etc.)', 'Ontario College of Trades registration', 'Valid G driver\'s licence', 'Physical fitness', 'Problem-solving skills', 'Customer service for residential calls'],
    relatedJobs: ['construction-jobs-milton', 'general-labour-jobs-milton', 'automotive-jobs-milton', 'landscaping-jobs-milton']
  },
  {
    slug: 'automotive-jobs-milton',
    title: 'Automotive Jobs in Milton, Ontario',
    emoji: '&#128663;',
    h1: 'Automotive Jobs in Milton, ON',
    subtitle: 'Mechanic, auto tech, and dealership positions at Milton\'s automotive businesses.',
    salary: '$18-$40/hour',
    demand: 'Moderate',
    entryLevel: 'Apprenticeships available',
    description: 'Milton has numerous auto repair shops, dealerships, auto body shops, and tire centres. Licensed automotive technicians (310S) are in high demand, along with service advisors, parts counter staff, car wash attendants, and detailers.',
    employers: ['Milton Hyundai', 'Milton Chrysler', 'Midas Milton', 'Canadian Tire Auto', 'Various independent shops'],
    skills: ['310S Automotive Service Technician licence', 'Knowledge of diagnostic tools (OBD-II)', 'Valid G driver\'s licence', 'Physical fitness', 'Customer communication skills', 'Continuous learning (new vehicle technology)'],
    relatedJobs: ['truck-driving-jobs-milton', 'general-labour-jobs-milton', 'retail-jobs-milton', 'hvac-plumbing-electrical-jobs-milton']
  },
  {
    slug: 'landscaping-jobs-milton',
    title: 'Landscaping & Lawn Care Jobs in Milton, Ontario',
    emoji: '&#127793;',
    h1: 'Landscaping & Lawn Care Jobs in Milton, ON',
    subtitle: 'Landscaper, lawn care technician, and grounds maintenance positions.',
    salary: '$17-$28/hour',
    demand: 'Seasonal - High in spring/summer',
    entryLevel: 'Yes',
    description: 'Milton\'s new subdivisions and established neighborhoods all need landscaping services. Spring through fall is the busiest season for lawn care, garden maintenance, hardscaping, snow removal (winter), and property maintenance. Many companies offer year-round employment combining landscaping and snow clearing.',
    employers: ['Various landscaping companies', 'Town of Milton Parks Department', 'Property management companies', 'Garden centres', 'Snow removal services'],
    skills: ['Physical fitness and outdoor work tolerance', 'Knowledge of plants, trees, and turf', 'Equipment operation (mowers, trimmers, blowers)', 'Valid G driver\'s licence', 'Pesticide licence an asset', 'Snow removal experience (winter)'],
    relatedJobs: ['construction-jobs-milton', 'general-labour-jobs-milton', 'cleaning-janitorial-jobs-milton', 'hvac-plumbing-electrical-jobs-milton']
  },
  {
    slug: 'daycare-childcare-jobs-milton',
    title: 'Daycare & Childcare Jobs in Milton, Ontario',
    emoji: '&#128118;',
    h1: 'Daycare & Childcare Jobs in Milton, ON',
    subtitle: 'ECE, daycare worker, and childcare provider positions at Milton centres.',
    salary: '$18-$28/hour',
    demand: 'High',
    entryLevel: 'Certification required',
    description: 'Milton\'s young, growing population creates strong demand for childcare professionals. Registered Early Childhood Educators (RECEs), daycare assistants, and before/after school program staff are needed at licensed childcare centres, home daycares, and school-based programs across the town.',
    employers: ['Various licensed daycare centres', 'YMCA childcare programs', 'Before/after school programs', 'Home daycare providers', 'Montessori schools'],
    skills: ['ECE diploma or degree', 'Registered with College of ECEs', 'Vulnerable Sector Police Check', 'First Aid/CPR certification', 'Patience and creativity', 'Strong communication with parents'],
    relatedJobs: ['education-jobs-milton', 'healthcare-jobs-milton', 'recreation-jobs-milton', 'office-admin-jobs-milton']
  },
  {
    slug: 'personal-care-jobs-milton',
    title: 'Personal Care & Beauty Jobs in Milton, Ontario',
    emoji: '&#128135;',
    h1: 'Personal Care & Beauty Jobs in Milton, ON',
    subtitle: 'Hairstylist, esthetician, nail tech, and spa positions at Milton salons.',
    salary: '$16-$35/hour + tips',
    demand: 'Moderate',
    entryLevel: 'Licensing/certification required',
    description: 'Milton\'s personal care industry includes hair salons, barber shops, nail salons, spas, esthetician studios, and massage therapy clinics. Licensed hairstylists, barbers, estheticians, nail technicians, and massage therapists can find positions across the town.',
    employers: ['Various hair salons on Main Street', 'Barber shops', 'Nail salons', 'Spas and wellness centres', 'Massage therapy clinics'],
    skills: ['Provincial licensing/certification', 'Customer service excellence', 'Up-to-date on trends and techniques', 'Sanitation and hygiene standards', 'Portfolio/clientele building', 'Social media marketing'],
    relatedJobs: ['retail-jobs-milton', 'healthcare-jobs-milton', 'customer-service-jobs-milton', 'hotel-hospitality-jobs-milton']
  },
  {
    slug: 'insurance-jobs-milton',
    title: 'Insurance Jobs in Milton, Ontario',
    emoji: '&#128203;',
    h1: 'Insurance Jobs in Milton, ON',
    subtitle: 'Insurance broker, adjuster, and underwriting positions.',
    salary: '$20-$40/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'Milton has numerous insurance brokerages and agencies offering auto, home, life, and commercial insurance. Positions include insurance brokers, client service representatives, claims adjusters, underwriters, and office administrators.',
    employers: ['Various insurance brokerages', 'Desjardins Insurance Milton', 'Intact Insurance', 'Co-operators Insurance', 'Independent brokerages'],
    skills: ['RIBO licence (for brokers)', 'Strong sales and communication skills', 'Attention to detail', 'Knowledge of insurance products', 'Computer proficiency', 'Customer service orientation'],
    relatedJobs: ['accounting-finance-jobs-milton', 'real-estate-jobs-milton', 'office-admin-jobs-milton', 'customer-service-jobs-milton']
  },
  {
    slug: 'hotel-hospitality-jobs-milton',
    title: 'Hotel & Hospitality Jobs in Milton, Ontario',
    emoji: '&#127976;',
    h1: 'Hotel & Hospitality Jobs in Milton, ON',
    subtitle: 'Front desk, housekeeping, and hospitality management positions.',
    salary: '$16-$25/hour',
    demand: 'Moderate',
    entryLevel: 'Yes',
    description: 'Milton\'s hotels and hospitality venues offer positions in front desk operations, housekeeping, food and beverage service, event coordination, and management. With events at the Milton Fairgrounds and proximity to Kelso Conservation Area and Rattlesnake Point, tourism supports local hospitality jobs.',
    employers: ['Best Western Plus Milton', 'Holiday Inn Express Milton', 'Various event venues', 'Milton Fairgrounds', 'Restaurants and banquet halls'],
    skills: ['Customer service excellence', 'Property management system experience', 'Flexible scheduling (weekends, holidays)', 'Multi-tasking abilities', 'Professional appearance', 'Smart Serve certification (for F&B)'],
    relatedJobs: ['restaurant-jobs-milton', 'cleaning-janitorial-jobs-milton', 'customer-service-jobs-milton', 'retail-jobs-milton']
  },
  {
    slug: 'recreation-jobs-milton',
    title: 'Recreation & Fitness Jobs in Milton, Ontario',
    emoji: '&#127947;',
    h1: 'Recreation & Fitness Jobs in Milton, ON',
    subtitle: 'Personal trainer, lifeguard, recreation coordinator, and fitness instructor positions.',
    salary: '$16-$30/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'Milton has excellent recreation facilities including the Milton Leisure Centre, Milton Sports Centre, community centres, and private gyms. Positions include lifeguards, swim instructors, personal trainers, fitness class instructors, recreation programmers, and facility attendants.',
    employers: ['Town of Milton Recreation', 'Milton Leisure Centre', 'Milton Sports Centre', 'GoodLife Fitness Milton', 'Fit4Less Milton', 'Various yoga/pilates studios'],
    skills: ['Relevant certifications (NLS, Standard First Aid, PTS)', 'High Five PHCD training', 'Fitness instructor certification', 'Strong communication skills', 'Ability to work evenings and weekends', 'Enthusiasm for health and wellness'],
    relatedJobs: ['education-jobs-milton', 'personal-care-jobs-milton', 'healthcare-jobs-milton', 'daycare-childcare-jobs-milton']
  },
  {
    slug: 'legal-jobs-milton',
    title: 'Legal Jobs in Milton, Ontario',
    emoji: '&#9878;',
    h1: 'Legal Jobs in Milton, ON',
    subtitle: 'Law clerk, paralegal, legal assistant, and lawyer positions.',
    salary: '$20-$60/hour',
    demand: 'Moderate',
    entryLevel: 'Education required',
    description: 'Milton\'s law firms handle real estate, family, criminal, corporate, and immigration law. Positions include lawyers, paralegals, law clerks, legal assistants, and receptionists. The Milton courthouse also employs support staff.',
    employers: ['Various Milton law firms', 'Milton courthouse', 'Real estate law offices', 'Immigration law firms', 'Corporate legal departments'],
    skills: ['Law degree or paralegal diploma', 'Law Society of Ontario licensing (for lawyers/paralegals)', 'Legal research skills', 'Document preparation', 'Attention to detail', 'Client confidentiality'],
    relatedJobs: ['office-admin-jobs-milton', 'real-estate-jobs-milton', 'accounting-finance-jobs-milton', 'customer-service-jobs-milton']
  },
  {
    slug: 'dental-jobs-milton',
    title: 'Dental Jobs in Milton, Ontario',
    emoji: '&#129463;',
    h1: 'Dental Jobs in Milton, ON',
    subtitle: 'Dental hygienist, dental assistant, and office administrator positions.',
    salary: '$20-$50/hour',
    demand: 'High',
    entryLevel: 'Certification required',
    description: 'Milton has dozens of dental clinics, and with the town\'s growing population, dental professionals are in strong demand. Dental hygienists, dental assistants, office managers, and receptionists are all needed across the community.',
    employers: ['Various dental clinics across Milton', 'Orthodontic offices', 'Pediatric dental clinics', 'Oral surgery centres'],
    skills: ['Dental hygiene or dental assisting diploma', 'Registration with CDHO or ODAA', 'Dental software proficiency (Dentrix, ABELDent)', 'Infection control protocols', 'Patient communication skills', 'X-ray certification'],
    relatedJobs: ['healthcare-jobs-milton', 'office-admin-jobs-milton', 'personal-care-jobs-milton', 'customer-service-jobs-milton']
  },
  {
    slug: 'pharmacy-jobs-milton',
    title: 'Pharmacy Jobs in Milton, Ontario',
    emoji: '&#128138;',
    h1: 'Pharmacy Jobs in Milton, ON',
    subtitle: 'Pharmacist, pharmacy technician, and pharmacy assistant positions.',
    salary: '$18-$55/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'Milton has numerous pharmacies including chain pharmacies (Shoppers Drug Mart, Rexall, Walmart Pharmacy) and independent pharmacies. Pharmacists, pharmacy technicians, and pharmacy assistants are needed to serve the growing population.',
    employers: ['Shoppers Drug Mart Milton', 'Rexall Milton', 'Walmart Pharmacy', 'Costco Pharmacy', 'Various independent pharmacies'],
    skills: ['Pharmacy degree (PharmD) or technician diploma', 'Ontario College of Pharmacists registration', 'Knowledge of drug interactions', 'Customer service skills', 'Attention to detail', 'Inventory management'],
    relatedJobs: ['healthcare-jobs-milton', 'retail-jobs-milton', 'customer-service-jobs-milton', 'office-admin-jobs-milton']
  },
  {
    slug: 'security-jobs-milton',
    title: 'Security Guard Jobs in Milton, Ontario',
    emoji: '&#128737;',
    h1: 'Security Guard Jobs in Milton, ON',
    subtitle: 'Security guard, loss prevention, and patrol officer positions.',
    salary: '$17-$24/hour',
    demand: 'Moderate',
    entryLevel: 'Licence required',
    description: 'Security professionals are needed at Milton\'s shopping centres, warehouses, construction sites, residential communities, and commercial buildings. Both day and night shifts are available with various security companies.',
    employers: ['Various security companies (GardaWorld, Securitas, Paladin)', 'Shopping centres', 'Warehouses and distribution centres', 'Condo developments'],
    skills: ['Ontario Security Guard Licence', 'First Aid/CPR certification', 'Strong observation skills', 'Report writing abilities', 'Customer service orientation', 'Ability to work nights and weekends'],
    relatedJobs: ['warehouse-jobs-milton', 'general-labour-jobs-milton', 'customer-service-jobs-milton', 'truck-driving-jobs-milton']
  },
  {
    slug: 'marketing-jobs-milton',
    title: 'Marketing & Social Media Jobs in Milton, Ontario',
    emoji: '&#128227;',
    h1: 'Marketing & Social Media Jobs in Milton, ON',
    subtitle: 'Digital marketing, social media manager, and content creator positions.',
    salary: '$20-$45/hour',
    demand: 'Growing',
    entryLevel: 'Some positions',
    description: 'Milton businesses increasingly need marketing professionals to manage their online presence. Social media managers, digital marketers, content creators, graphic designers, and marketing coordinators are sought by local businesses, agencies, and organizations.',
    employers: ['Various Milton businesses', 'Marketing agencies', 'Real estate companies', 'Restaurant groups', 'Non-profit organizations'],
    skills: ['Social media platform expertise', 'Content creation and copywriting', 'Google Analytics and SEO knowledge', 'Graphic design (Canva, Adobe Creative Suite)', 'Email marketing', 'Photography and video skills'],
    relatedJobs: ['it-tech-jobs-milton', 'office-admin-jobs-milton', 'real-estate-jobs-milton', 'retail-jobs-milton']
  },
  {
    slug: 'pet-care-jobs-milton',
    title: 'Pet Care & Veterinary Jobs in Milton, Ontario',
    emoji: '&#128054;',
    h1: 'Pet Care & Veterinary Jobs in Milton, ON',
    subtitle: 'Veterinary tech, groomer, dog walker, and pet store positions.',
    salary: '$16-$35/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'Milton\'s pet-loving community supports numerous veterinary clinics, pet stores, grooming salons, and dog walking services. Veterinary technicians, vet assistants, groomers, pet store associates, and dog walkers/sitters are all needed.',
    employers: ['Milton Animal Hospital', 'Various veterinary clinics', 'Pet stores (PetSmart, Pet Valu)', 'Grooming salons', 'Dog daycare facilities'],
    skills: ['Veterinary Technician diploma (for vet techs)', 'Animal handling experience', 'Compassion for animals', 'Physical fitness', 'Customer service skills', 'Grooming certification (for groomers)'],
    relatedJobs: ['retail-jobs-milton', 'healthcare-jobs-milton', 'customer-service-jobs-milton', 'recreation-jobs-milton']
  },
  {
    slug: 'government-jobs-milton',
    title: 'Government & Municipal Jobs in Milton, Ontario',
    emoji: '&#127963;',
    h1: 'Government & Municipal Jobs in Milton, ON',
    subtitle: 'Town of Milton, Halton Region, and public sector positions.',
    salary: '$22-$55/hour',
    demand: 'Moderate',
    entryLevel: 'Some positions',
    description: 'The Town of Milton and Halton Region are significant employers in the community. Municipal jobs include bylaw officers, recreation coordinators, planners, engineers, administrative staff, transit operators, librarians, and public works employees.',
    employers: ['Town of Milton', 'Halton Region', 'Milton Public Library', 'Milton Transit', 'Conservation Halton'],
    skills: ['Relevant education/certification', 'Public service orientation', 'Communication and teamwork', 'Knowledge of municipal processes', 'Computer proficiency', 'Valid driver\'s licence (for some roles)'],
    relatedJobs: ['office-admin-jobs-milton', 'education-jobs-milton', 'recreation-jobs-milton', 'legal-jobs-milton']
  },
  {
    slug: 'volunteer-jobs-milton',
    title: 'Volunteer Opportunities in Milton, Ontario',
    emoji: '&#129309;',
    h1: 'Volunteer Opportunities in Milton, ON',
    subtitle: 'Give back to the Milton community through volunteering.',
    salary: 'Volunteer (unpaid)',
    demand: 'Always welcome',
    entryLevel: 'Yes',
    description: 'Milton has a vibrant volunteer community. Organizations like Milton Community Resource Centre, Big Brothers Big Sisters of Halton, local food banks, the Milton Humane Society, and many churches and community groups welcome volunteers. Volunteering is also a great way to gain Canadian experience for newcomers.',
    employers: ['Milton Community Resource Centre', 'Big Brothers Big Sisters of Halton', 'Milton District Hospital', 'Local food banks', 'Milton Humane Society', 'Conservation Halton'],
    skills: ['Willingness to help', 'Reliability and punctuality', 'Teamwork', 'Communication skills', 'Vulnerable Sector Police Check (for some roles)', 'Specific skills depending on the role'],
    relatedJobs: ['education-jobs-milton', 'healthcare-jobs-milton', 'recreation-jobs-milton', 'government-jobs-milton']
  },
  {
    slug: 'student-part-time-jobs-milton',
    title: 'Student & Part-Time Jobs in Milton, Ontario',
    emoji: '&#127891;',
    h1: 'Student & Part-Time Jobs in Milton, ON',
    subtitle: 'Flexible part-time positions perfect for students and teens.',
    salary: '$16.55-$20/hour',
    demand: 'High',
    entryLevel: 'Yes',
    description: 'Milton offers numerous part-time opportunities for high school and college students. Fast food restaurants, retail stores, grocery stores, movie theatres, and recreation facilities all hire students with flexible scheduling around school hours.',
    employers: ['Tim Hortons', 'McDonald\'s', 'Subway', 'Freshii', 'Walmart', 'Metro', 'No Frills', 'Various retail and food locations'],
    skills: ['Minimum age requirements (14-16 depending on role)', 'Availability evenings and weekends', 'Basic math and communication', 'Willingness to learn', 'Reliable transportation or close to bus route', 'Work permit (if applicable for international students)'],
    relatedJobs: ['retail-jobs-milton', 'restaurant-jobs-milton', 'cleaning-janitorial-jobs-milton', 'recreation-jobs-milton']
  },
  {
    slug: 'newcomer-jobs-milton',
    title: 'Newcomer & Immigrant Jobs in Milton, Ontario',
    emoji: '&#127758;',
    h1: 'Newcomer & Immigrant Jobs in Milton, ON',
    subtitle: 'Job resources and entry-level positions for newcomers to Canada.',
    salary: 'Varies by role',
    demand: 'High',
    entryLevel: 'Yes',
    description: 'Milton welcomes newcomers to Canada from around the world. Many organizations help immigrants find employment, settle in, and build careers. Entry-level positions in warehousing, retail, food service, and cleaning are readily available. Employment Ontario offices and settlement agencies provide free job search assistance.',
    employers: ['Milton Community Resource Centre', 'Halton Multicultural Council', 'Various temp agencies', 'Settlement agencies', 'All sectors hiring entry-level workers'],
    skills: ['English language proficiency', 'Canadian work authorization', 'SIN number', 'Willingness to start in entry-level positions', 'Foreign credential recognition (where applicable)', 'Canadian resume format knowledge'],
    relatedJobs: ['warehouse-jobs-milton', 'general-labour-jobs-milton', 'restaurant-jobs-milton', 'cleaning-janitorial-jobs-milton']
  },
  {
    slug: 'work-from-home-jobs-milton',
    title: 'Work From Home Jobs in Milton, Ontario',
    emoji: '&#127968;',
    h1: 'Work From Home Jobs in Milton, ON',
    subtitle: 'Remote and hybrid positions available to Milton residents.',
    salary: '$20-$55/hour',
    demand: 'Growing',
    entryLevel: 'Some positions',
    description: 'Many Milton residents work remotely for companies in Toronto and the Greater Toronto Area. Work-from-home positions in customer service, IT, writing, marketing, data entry, bookkeeping, and virtual assistance are available. Milton\'s affordable housing compared to Toronto makes it an ideal base for remote workers.',
    employers: ['Various Toronto-area companies', 'Tech companies', 'Financial services firms', 'Customer service centres', 'Freelance platforms'],
    skills: ['Self-discipline and time management', 'Reliable home internet connection', 'Dedicated workspace', 'Communication tools (Zoom, Slack, Teams)', 'Job-specific technical skills', 'Self-motivation'],
    relatedJobs: ['it-tech-jobs-milton', 'office-admin-jobs-milton', 'customer-service-jobs-milton', 'marketing-jobs-milton']
  }
];

// Template function
function generateJobPage(job) {
  const relatedLinks = (job.relatedJobs || []).map(slug => {
    const related = jobs.find(j => j.slug === slug);
    if (!related) return '';
    return `<a href="/jobs/${related.slug}.html" class="related-job-link"><span class="rj-emoji">${related.emoji}</span>${related.h1.replace(' in Milton, ON', '')}</a>`;
  }).filter(Boolean).join('\n            ');

  const employerCards = (job.employers || []).map(emp => `
          <div class="employer-card">
            <h4>${emp}</h4>
            <p>Milton, Ontario</p>
          </div>`).join('');

  const skillsList = (job.skills || []).map(s => `<li>${s}</li>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en-CA" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${job.title} | MiltonJobs.com</title>
<meta name="description" content="${job.subtitle} Salary: ${job.salary}. Browse Milton job opportunities at MiltonJobs.com.">
<meta name="keywords" content="${job.slug.replace(/-/g, ', ')}, Milton Ontario, Halton Region, jobs near me">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://miltonjobs.com/jobs/${job.slug}.html">

<meta property="og:type" content="article">
<meta property="og:title" content="${job.title}">
<meta property="og:description" content="${job.subtitle}">
<meta property="og:url" content="https://miltonjobs.com/jobs/${job.slug}.html">
<meta property="og:site_name" content="MiltonJobs.com">

<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${job.title}">
<meta name="twitter:description" content="${job.subtitle}">

<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#2563eb">
<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/jobs.css">
</head>
<body>

<a href="#main" class="skip-to-content">Skip to main content</a>

<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="/" class="logo" aria-label="MiltonJobs.com - Home">
      <div class="logo-icon">M</div>
      Milton<span>Jobs</span>.com
    </a>
    <nav class="header-nav" aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/#directory">Directory</a>
      <a href="/#jobs" class="active">Jobs</a>
      <a href="/#neighborhoods">Neighborhoods</a>
      <a href="/#contact">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>

<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
  <a href="/">&#127968; Home</a>
  <a href="/#directory">&#128188; Directory</a>
  <a href="/#jobs">&#128188; Jobs</a>
  <a href="/#contact">&#128231; Contact</a>
</nav>

<main id="main">

<section class="job-hero">
  <div class="job-hero-content">
    <div class="breadcrumb">
      <a href="/">Home</a> <span>&#8250;</span> <a href="/#jobs">Jobs</a> <span>&#8250;</span> <span>${job.h1.replace(' in Milton, ON', '')}</span>
    </div>
    <span class="job-emoji">${job.emoji}</span>
    <h1>${job.h1}</h1>
    <p class="job-subtitle">${job.subtitle}</p>
    <div class="job-hero-stats">
      <div class="job-hero-stat">
        <span class="stat-value">${job.salary}</span>
        <span class="stat-label">Typical Salary</span>
      </div>
      <div class="job-hero-stat">
        <span class="stat-value">${job.demand}</span>
        <span class="stat-label">Demand Level</span>
      </div>
      <div class="job-hero-stat">
        <span class="stat-value">${job.entryLevel}</span>
        <span class="stat-label">Entry Level</span>
      </div>
    </div>
  </div>
</section>

<div class="job-content">
  <div class="job-main">

    <section class="job-section">
      <h2>About ${job.h1.replace(' in Milton, ON', '')} in Milton</h2>
      <p>${job.description}</p>
    </section>

    <section class="job-section">
      <h2>Key Skills & Requirements</h2>
      <ul>
          ${skillsList}
      </ul>
    </section>

    <section class="job-section">
      <h2>Top Employers in Milton</h2>
      <div class="employer-grid">${employerCards}
      </div>
    </section>

    <div class="job-cta">
      <h2>Ready to Find Your Next Job in Milton?</h2>
      <p>Browse the MiltonJobs.com directory to find local employers, or explore other job categories below.</p>
      <div class="cta-buttons">
        <a href="/#directory" class="cta-btn cta-primary">&#128270; Browse Directory</a>
        <a href="/#jobs" class="cta-btn cta-secondary">&#128188; All Job Categories</a>
      </div>
    </div>

    <section class="job-faq">
      <h2>FAQ: ${job.h1.replace(' in Milton, ON', '')} in Milton</h2>
      <div class="faq-container">
        <div class="faq-item">
          <button class="faq-question">
            What is the average salary for ${job.h1.replace(' Jobs in Milton, ON', '').toLowerCase()} jobs in Milton?
            <svg class="faq-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <p>The typical salary range for ${job.h1.replace(' Jobs in Milton, ON', '').toLowerCase()} jobs in Milton, Ontario is ${job.salary}. Actual pay depends on experience, certifications, employer, and specific role.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            Are there entry-level ${job.h1.replace(' Jobs in Milton, ON', '').toLowerCase()} jobs available in Milton?
            <svg class="faq-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <p>Entry-level availability: ${job.entryLevel}. Many employers in Milton are willing to train motivated candidates, especially in high-demand sectors.</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            How do I find ${job.h1.replace(' Jobs in Milton, ON', '').toLowerCase()} jobs in Milton?
            <svg class="faq-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <p>Browse the MiltonJobs.com directory to find local employers in this sector. You can also check Indeed, LinkedIn, and Job Bank for specific postings. Networking at local events and visiting businesses in person are also effective strategies in Milton.</p>
          </div>
        </div>
      </div>
    </section>

  </div>

  <aside class="job-sidebar">
    <div class="sidebar-card">
      <h3>Quick Facts</h3>
      <div class="quick-facts">
        <div class="fact-row">
          <span class="fact-label">Salary Range</span>
          <span class="fact-value">${job.salary}</span>
        </div>
        <div class="fact-row">
          <span class="fact-label">Demand</span>
          <span class="fact-value">${job.demand}</span>
        </div>
        <div class="fact-row">
          <span class="fact-label">Entry Level</span>
          <span class="fact-value">${job.entryLevel}</span>
        </div>
        <div class="fact-row">
          <span class="fact-label">Location</span>
          <span class="fact-value">Milton, ON</span>
        </div>
      </div>
    </div>

    <div class="sidebar-card">
      <h3>Related Jobs</h3>
      <div class="related-jobs">
            ${relatedLinks}
      </div>
    </div>
  </aside>
</div>

</main>

<footer class="site-footer" role="contentinfo">
  <div class="footer-content">
    <div class="footer-brand">
      <a href="/" class="logo"><div class="logo-icon">M</div>Milton<span>Jobs</span>.com</a>
      <p>Your free guide to businesses and jobs in Milton, Ontario.</p>
    </div>
    <div class="footer-column">
      <h4>Directory</h4>
      <ul>
        <li><a href="/#directory">All Businesses</a></li>
        <li><a href="/#jobs">All Jobs</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Popular Jobs</h4>
      <ul>
        <li><a href="/jobs/warehouse-jobs-milton.html">Warehouse</a></li>
        <li><a href="/jobs/retail-jobs-milton.html">Retail</a></li>
        <li><a href="/jobs/healthcare-jobs-milton.html">Healthcare</a></li>
        <li><a href="/jobs/construction-jobs-milton.html">Construction</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>About</h4>
      <ul>
        <li><a href="/#about">About Us</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024&ndash;2026 MiltonJobs.com</p>
  </div>
</footer>

<button class="back-to-top" id="backToTop" aria-label="Back to top">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<script>
// Mini inline script for job pages (theme + mobile + FAQ + scroll)
(function(){
  const theme = localStorage.getItem('mj_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', function() {
    const tb = document.getElementById('themeToggle');
    if(tb) {
      updateIcon();
      tb.addEventListener('click', function() {
        const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('mj_theme', t);
        updateIcon();
      });
    }
    function updateIcon() {
      const t = document.documentElement.getAttribute('data-theme');
      if(tb) tb.innerHTML = t === 'light'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }

    const mb = document.getElementById('mobileMenuBtn');
    const mn = document.getElementById('mobileNav');
    if(mb && mn) mb.addEventListener('click', function() { mn.classList.toggle('active'); });

    document.querySelectorAll('.faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() { btn.closest('.faq-item').classList.toggle('open'); });
    });

    const btt = document.getElementById('backToTop');
    const hdr = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
      if(hdr) hdr.classList.toggle('scrolled', window.scrollY > 10);
      if(btt) btt.classList.toggle('visible', window.scrollY > 500);
    });
    if(btt) btt.addEventListener('click', function() { window.scrollTo({top:0,behavior:'smooth'}); });
  });
})();
</script>
<script src="/js/seo-optimization.js"></script>

</body>
</html>`;
}

// Generate all pages
let generated = 0;
jobs.forEach(job => {
  const html = generateJobPage(job);
  fs.writeFileSync(path.join(jobsDir, `${job.slug}.html`), html, 'utf8');
  generated++;
});

console.log(`Generated ${generated} job landing pages in /jobs/`);

// Also output the list for sitemap generation
const slugs = jobs.map(j => j.slug);
fs.writeFileSync(path.join(__dirname, 'data', 'job-slugs.json'), JSON.stringify(slugs, null, 2), 'utf8');
console.log('Saved job slugs to data/job-slugs.json');
