DROP TABLE IF EXISTS BirthInformation;
DROP TABLE IF EXISTS Individuals;
DROP TABLE IF EXISTS mazhab_options;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS sex_options;
DROP TABLE IF EXISTS relations;
DROP TABLE IF EXISTS relation_types;
DROP TABLE IF EXISTS HasNationality;
DROP TABLE IF EXISTS IndividualNationality;
DROP TABLE IF EXISTS LegalSituation;
DROP TABLE IF EXISTS ResidencyTypes;
DROP TABLE IF EXISTS NoResidencyReasons;
DROP TABLE IF EXISTS LegalSituationTypes;
DROP TABLE IF EXISTS WasietWiledeTypes;
DROP TABLE IF EXISTS WiladaProofTypes;
DROP TABLE IF EXISTS LocationType;
DROP TABLE IF EXISTS SupervisionOptions;
DROP TABLE IF EXISTS LebanonLocation;
DROP TABLE IF EXISTS HealthInfo;
DROP TABLE IF EXISTS AddictionTypes;
DROP TABLE IF EXISTS DoctorOptions;
DROP TABLE IF EXISTS MostadimaOptions;
DROP TABLE IF EXISTS IlajOptions;
DROP TABLE IF EXISTS MzmanaOptions;
DROP TABLE IF EXISTS LikahOptions;
DROP TABLE IF EXISTS Education;
DROP TABLE IF EXISTS MoaadaletShhedeOptions;
DROP TABLE IF EXISTS SelfStudyOptions;
DROP TABLE IF EXISTS MahouOmiyaOptions;
DROP TABLE IF EXISTS StoppedReasons;
DROP TABLE IF EXISTS TarshihAvailability;
DROP TABLE IF EXISTS SchoolProgress;
DROP TABLE IF EXISTS OnlineStudySuccess;
DROP TABLE IF EXISTS SchoolTypes;
DROP TABLE IF EXISTS CurrentStudyOptions;
DROP TABLE IF EXISTS Work;
DROP TABLE IF EXISTS JobTypes;
DROP TABLE IF EXISTS PaymentTypes;
DROP TABLE IF EXISTS PaymentMethods;
DROP TABLE IF EXISTS DamanIjtimaaiOptions;
DROP TABLE IF EXISTS FullPaymentOptions;
DROP TABLE IF EXISTS BossProblems;
DROP TABLE IF EXISTS NakabaOptions;
DROP TABLE IF EXISTS NotWorkingReason;
DROP TABLE IF EXISTS SpecialNeed;
DROP TABLE IF EXISTS SpecialNeedReason;
DROP TABLE IF EXISTS TreatmentAvailability;
DROP TABLE IF EXISTS NeedTypes;
DROP TABLE IF EXISTS HouseNeeds;
DROP TABLE IF EXISTS AncestorNationality;
DROP TABLE IF EXISTS TajanosMethod;
DROP TABLE IF EXISTS NationalityTypes;
DROP TABLE IF EXISTS Ancestor;
DROP TABLE IF EXISTS telephone;
DROP TABLE IF EXISTS TelephoneTypes;
DROP TABLE IF EXISTS HouseHoldInfos;
DROP TABLE IF EXISTS HHSurroundings;
DROP TABLE IF EXISTS HHEvacReasons;
DROP TABLE IF EXISTS HHReasonOptions;
DROP TABLE IF EXISTS HHSituation;
DROP TABLE IF EXISTS HHGivenPeriod;
DROP TABLE IF EXISTS HHGivenBy;
DROP TABLE IF EXISTS HHRentProofs;
DROP TABLE IF EXISTS HHRentTypes;
DROP TABLE IF EXISTS HHOwnershipTypes;
DROP TABLE IF EXISTS HHResidencyTypes;
DROP TABLE IF EXISTS HHtypes;
DROP TABLE IF EXISTS HHKhadamet;
DROP TABLE IF EXISTS Khadamet;
DROP TABLE IF EXISTS HHadress;
DROP TABLE IF EXISTS LebanonMohafaza;
DROP TABLE IF EXISTS LebanonCazas;
DROP TABLE IF EXISTS LebanonRegions;
DROP TABLE IF EXISTS FamilyHead;
DROP TABLE IF EXISTS FamilyMemberAway;
DROP TABLE IF EXISTS ReasonMemberAway;
DROP TABLE IF EXISTS RelationshipStatusOptions;
DROP TABLE IF EXISTS FamilyHeadReferences;
DROP TABLE IF EXISTS HeadRefRelationOptions;
DROP TABLE IF EXISTS FamilyFinance;
DROP TABLE IF EXISTS FamilyIncomeOptions;
DROP TABLE IF EXISTS FamilyKaredReasons;
DROP TABLE IF EXISTS FamilyNegativeOutcomeSolutions;
DROP TABLE IF EXISTS FamilySpendingOn;
DROP TABLE IF EXISTS HasBankAccount;
DROP TABLE IF EXISTS FamilyHealth;
DROP TABLE IF EXISTS HealthFaciltyReliability;
DROP TABLE IF EXISTS HealthFacilityOwnerOptions;
DROP TABLE IF EXISTS NoTreatmentReasons;
DROP TABLE IF EXISTS FamilyEducation;
DROP TABLE IF EXISTS EducationHelpUnResult;
DROP TABLE IF EXISTS EducationHelpUn;
DROP TABLE IF EXISTS KidsEducationalSupportOptions;
DROP TABLE IF EXISTS Occupancy;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS QuestInfo;
DROP TABLE IF EXISTS Decisions;

CREATE TABLE Users (
  user_id INTEGER PRIMARY KEY,
  username TEXT,
  password TEXT,
  role TEXT,
  permission TEXT
);


CREATE TABLE sex_options (
  sex_id INT PRIMARY KEY,
  sex_name VARCHAR(10)
);

INSERT INTO sex_options (sex_id, sex_name)
VALUES (1, 'male'), (2, 'female'), (3, 'other');

CREATE TABLE  countries (
  num_code INT(3) NOT NULL DEFAULT '0',
  alpha_2_code VARCHAR(2) DEFAULT NULL,
  alpha_3_code VARCHAR(3) DEFAULT NULL,
  country_id VARCHAR(52) DEFAULT NULL,
  nationality VARCHAR(39) DEFAULT NULL,
  PRIMARY KEY (num_code),
  UNIQUE (alpha_2_code),
  UNIQUE (alpha_3_code)
);

INSERT INTO countries (num_code, alpha_2_code, alpha_3_code, country_id, nationality) VALUES
('4', 'AF', 'AFG', 'Afghanistan', 'Afghan'),
("248", "AX", "ALA", "Åland Islands", "Åland Island"),
("8", "AL", "ALB", "Albania", "Albanian"),
("12", "DZ", "DZA", "Algeria", "Algerian"),
("16", "AS", "ASM", "American Samoa", "American Samoan"),
("20", "AD", "AND", "Andorra", "Andorran"),
("24", "AO", "AGO", "Angola", "Angolan"),
("660", "AI", "AIA", "Anguilla", "Anguillan"),
("10", "AQ", "ATA", "Antarctica", "Antarctic"),
("28", "AG", "ATG", "Antigua and Barbuda", "Antiguan or Barbudan"),
("32", "AR", "ARG", "Argentina", "Argentine"),
("51", "AM", "ARM", "Armenia", "Armenian"),
("533", "AW", "ABW", "Aruba", "Aruban"),
("36", "AU", "AUS", "Australia", "Australian"),
("40", "AT", "AUT", "Austria", "Austrian"),
("31", "AZ", "AZE", "Azerbaijan", "Azerbaijani, Azeri"),
("44", "BS", "BHS", "Bahamas", "Bahamian"),
("48", "BH", "BHR", "Bahrain", "Bahraini"),
("50", "BD", "BGD", "Bangladesh", "Bangladeshi"),
("52", "BB", "BRB", "Barbados", "Barbadian"),
("112", "BY", "BLR", "Belarus", "Belarusian"),
("56", "BE", "BEL", "Belgium", "Belgian"),
("84", "BZ", "BLZ", "Belize", "Belizean"),
("204", "BJ", "BEN", "Benin", "Beninese, Beninois"),
("60", "BM", "BMU", "Bermuda", "Bermudian, Bermudan"),
("64", "BT", "BTN", "Bhutan", "Bhutanese"),
("68", "BO", "BOL", "Bolivia (Plurinational State of)", "Bolivian"),
("535", "BQ", "BES", "Bonaire, Sint Eustatius and Saba", "Bonaire"),
("70", "BA", "BIH", "Bosnia and Herzegovina", "Bosnian or Herzegovinian"),
("72", "BW", "BWA", "Botswana", "Motswana, Botswanan"),
("74", "BV", "BVT", "Bouvet Island", "Bouvet Island"),
("76", "BR", "BRA", "Brazil", "Brazilian"),
("86", "IO", "IOT", "British Indian Ocean Territory", "BIOT"),
("96", "BN", "BRN", "Brunei Darussalam", "Bruneian"),
("100", "BG", "BGR", "Bulgaria", "Bulgarian"),
("854", "BF", "BFA", "Burkina Faso", "Burkinabé"),
("108", "BI", "BDI", "Burundi", "Burundian"),
("132", "CV", "CPV", "Cabo Verde", "Cabo Verdean"),
("116", "KH", "KHM", "Cambodia", "Cambodian"),
("120", "CM", "CMR", "Cameroon", "Cameroonian"),
("124", "CA", "CAN", "Canada", "Canadian"),
("136", "KY", "CYM", "Cayman Islands", "Caymanian"),
("140", "CF", "CAF", "Central African Republic", "Central African"),
("148", "TD", "TCD", "Chad", "Chadian"),
("152", "CL", "CHL", "Chile", "Chilean"),
("156", "CN", "CHN", "China", "Chinese"),
("162", "CX", "CXR", "Christmas Island", "Christmas Island"),
("166", "CC", "CCK", "Cocos (Keeling) Islands", "Cocos Island"),
("170", "CO", "COL", "Colombia", "Colombian"),
("174", "KM", "COM", "Comoros", "Comoran, Comorian"),
("178", "CG", "COG", "Congo (Republic of the)", "Congolese"),
("180", "CD", "COD", "Congo (Democratic Republic of the)", "Congolese"),
("184", "CK", "COK", "Cook Islands", "Cook Island"),
("188", "CR", "CRI", "Costa Rica", "Costa Rican"),
("384", "CI", "CIV", "Côte d'Ivoire", "Ivorian"),
("191", "HR", "HRV", "Croatia", "Croatian"),
("192", "CU", "CUB", "Cuba", "Cuban"),
("531", "CW", "CUW", "Curaçao", "Curaçaoan"),
("196", "CY", "CYP", "Cyprus", "Cypriot"),
("203", "CZ", "CZE", "Czech Republic", "Czech"),
("208", "DK", "DNK", "Denmark", "Danish"),
("262", "DJ", "DJI", "Djibouti", "Djiboutian"),
("212", "DM", "DMA", "Dominica", "Dominican"),
("214", "DO", "DOM", "Dominican Republic", "Dominican"),
("218", "EC", "ECU", "Ecuador", "Ecuadorian"),
("818", "EG", "EGY", "Egypt", "Egyptian"),
("222", "SV", "SLV", "El Salvador", "Salvadoran"),
("226", "GQ", "GNQ", "Equatorial Guinea", "Equatorial Guinean, Equatoguinean"),
("232", "ER", "ERI", "Eritrea", "Eritrean"),
("233", "EE", "EST", "Estonia", "Estonian"),
("231", "ET", "ETH", "Ethiopia", "Ethiopian"),
("238", "FK", "FLK", "Falkland Islands (Malvinas)", "Falkland Island"),
("234", "FO", "FRO", "Faroe Islands", "Faroese"),
("242", "FJ", "FJI", "Fiji", "Fijian"),
("246", "FI", "FIN", "Finland", "Finnish"),
("250", "FR", "FRA", "France", "French"),
("254", "GF", "GUF", "French Guiana", "French Guianese"),
("258", "PF", "PYF", "French Polynesia", "French Polynesian"),
("260", "TF", "ATF", "French Southern Territories", "French Southern Territories"),
("266", "GA", "GAB", "Gabon", "Gabonese"),
("270", "GM", "GMB", "Gambia", "Gambian"),
("268", "GE", "GEO", "Georgia", "Georgian"),
("276", "DE", "DEU", "Germany", "German"),
("288", "GH", "GHA", "Ghana", "Ghanaian"),
("292", "GI", "GIB", "Gibraltar", "Gibraltar"),
("300", "GR", "GRC", "Greece", "Greek, Hellenic"),
("304", "GL", "GRL", "Greenland", "Greenlandic"),
("308", "GD", "GRD", "Grenada", "Grenadian"),
("312", "GP", "GLP", "Guadeloupe", "Guadeloupe"),
("316", "GU", "GUM", "Guam", "Guamanian, Guambat"),
("320", "GT", "GTM", "Guatemala", "Guatemalan"),
("831", "GG", "GGY", "Guernsey", "Channel Island"),
("324", "GN", "GIN", "Guinea", "Guinean"),
("624", "GW", "GNB", "Guinea-Bissau", "Bissau-Guinean"),
("328", "GY", "GUY", "Guyana", "Guyanese"),
("332", "HT", "HTI", "Haiti", "Haitian"),
("334", "HM", "HMD", "Heard Island and McDonald Islands", "Heard Island or McDonald Islands"),
("336", "VA", "VAT", "Vatican City State", "Vatican"),
("340", "HN", "HND", "Honduras", "Honduran"),
("344", "HK", "HKG", "Hong Kong", "Hong Kong, Hong Kongese"),
("348", "HU", "HUN", "Hungary", "Hungarian, Magyar"),
("352", "IS", "ISL", "Iceland", "Icelandic"),
("356", "IN", "IND", "India", "Indian"),
("360", "ID", "IDN", "Indonesia", "Indonesian"),
("364", "IR", "IRN", "Iran", "Iranian, Persian"),
("368", "IQ", "IRQ", "Iraq", "Iraqi"),
("372", "IE", "IRL", "Ireland", "Irish"),
("833", "IM", "IMN", "Isle of Man", "Manx"),
("376", "IL", "ISR", "Israel", "Israeli"),
("380", "IT", "ITA", "Italy", "Italian"),
("388", "JM", "JAM", "Jamaica", "Jamaican"),
("392", "JP", "JPN", "Japan", "Japanese"),
("832", "JE", "JEY", "Jersey", "Channel Island"),
("400", "JO", "JOR", "Jordan", "Jordanian"),
("398", "KZ", "KAZ", "Kazakhstan", "Kazakhstani, Kazakh"),
("404", "KE", "KEN", "Kenya", "Kenyan"),
("296", "KI", "KIR", "Kiribati", "I-Kiribati"),
("408", "KP", "PRK", "Korea (Democratic People's Republic of)", "North Korean"),
("410", "KR", "KOR", "Korea (Republic of)", "South Korean"),
("414", "KW", "KWT", "Kuwait", "Kuwaiti"),
("417", "KG", "KGZ", "Kyrgyzstan", "Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz"),
("418", "LA", "LAO", "Lao People's Democratic Republic", "Lao, Laotian"),
("428", "LV", "LVA", "Latvia", "Latvian"),
("422", "LB", "LBN", "Lebanon", "Lebanese"),
("426", "LS", "LSO", "Lesotho", "Basotho"),
("430", "LR", "LBR", "Liberia", "Liberian"),
("434", "LY", "LBY", "Libya", "Libyan"),
("438", "LI", "LIE", "Liechtenstein", "Liechtenstein"),
("440", "LT", "LTU", "Lithuania", "Lithuanian"),
("442", "LU", "LUX", "Luxembourg", "Luxembourg, Luxembourgish"),
("446", "MO", "MAC", "Macao", "Macanese, Chinese"),
("807", "MK", "MKD", "Macedonia (the former Yugoslav Republic of)", "Macedonian"),
("450", "MG", "MDG", "Madagascar", "Malagasy"),
("454", "MW", "MWI", "Malawi", "Malawian"),
("458", "MY", "MYS", "Malaysia", "Malaysian"),
("462", "MV", "MDV", "Maldives", "Maldivian"),
("466", "ML", "MLI", "Mali", "Malian, Malinese"),
("470", "MT", "MLT", "Malta", "Maltese"),
("584", "MH", "MHL", "Marshall Islands", "Marshallese"),
("474", "MQ", "MTQ", "Martinique", "Martiniquais, Martinican"),
("478", "MR", "MRT", "Mauritania", "Mauritanian"),
("480", "MU", "MUS", "Mauritius", "Mauritian"),
("175", "YT", "MYT", "Mayotte", "Mahoran"),
("484", "MX", "MEX", "Mexico", "Mexican"),
("583", "FM", "FSM", "Micronesia (Federated States of)", "Micronesian"),
("498", "MD", "MDA", "Moldova (Republic of)", "Moldovan"),
("492", "MC", "MCO", "Monaco", "Monégasque, Monacan"),
("496", "MN", "MNG", "Mongolia", "Mongolian"),
("499", "ME", "MNE", "Montenegro", "Montenegrin"),
("500", "MS", "MSR", "Montserrat", "Montserratian"),
("504", "MA", "MAR", "Morocco", "Moroccan"),
("508", "MZ", "MOZ", "Mozambique", "Mozambican"),
("104", "MM", "MMR", "Myanmar", "Burmese"),
("516", "NA", "NAM", "Namibia", "Namibian"),
("520", "NR", "NRU", "Nauru", "Nauruan"),
("524", "NP", "NPL", "Nepal", "Nepali, Nepalese"),
("528", "NL", "NLD", "Netherlands", "Dutch, Netherlandic"),
("540", "NC", "NCL", "New Caledonia", "New Caledonian"),
("554", "NZ", "NZL", "New Zealand", "New Zealand, NZ"),
("558", "NI", "NIC", "Nicaragua", "Nicaraguan"),
("562", "NE", "NER", "Niger", "Nigerien"),
("566", "NG", "NGA", "Nigeria", "Nigerian"),
("570", "NU", "NIU", "Niue", "Niuean"),
("574", "NF", "NFK", "Norfolk Island", "Norfolk Island"),
("580", "MP", "MNP", "Northern Mariana Islands", "Northern Marianan"),
("578", "NO", "NOR", "Norway", "Norwegian"),
("512", "OM", "OMN", "Oman", "Omani"),
("586", "PK", "PAK", "Pakistan", "Pakistani"),
("585", "PW", "PLW", "Palau", "Palauan"),
("275", "PS", "PSE", "Palestine, State of", "Palestinian"),
("591", "PA", "PAN", "Panama", "Panamanian"),
("598", "PG", "PNG", "Papua New Guinea", "Papua New Guinean, Papuan"),
("600", "PY", "PRY", "Paraguay", "Paraguayan"),
("604", "PE", "PER", "Peru", "Peruvian"),
("608", "PH", "PHL", "Philippines", "Philippine, Filipino"),
("612", "PN", "PCN", "Pitcairn", "Pitcairn Island"),
("616", "PL", "POL", "Poland", "Polish"),
("620", "PT", "PRT", "Portugal", "Portuguese"),
("630", "PR", "PRI", "Puerto Rico", "Puerto Rican"),
("634", "QA", "QAT", "Qatar", "Qatari"),
("638", "RE", "REU", "Réunion", "Réunionese, Réunionnais"),
("642", "RO", "ROU", "Romania", "Romanian"),
("643", "RU", "RUS", "Russian Federation", "Russian"),
("646", "RW", "RWA", "Rwanda", "Rwandan"),
("652", "BL", "BLM", "Saint Barthélemy", "Barthélemois"),
("654", "SH", "SHN", "Saint Helena, Ascension and Tristan da Cunha", "Saint Helenian"),
("659", "KN", "KNA", "Saint Kitts and Nevis", "Kittitian or Nevisian"),
("662", "LC", "LCA", "Saint Lucia", "Saint Lucian"),
("663", "MF", "MAF", "Saint Martin (French part)", "Saint-Martinoise"),
("666", "PM", "SPM", "Saint Pierre and Miquelon", "Saint-Pierrais or Miquelonnais"),
("670", "VC", "VCT", "Saint Vincent and the Grenadines", "Saint Vincentian, Vincentian"),
("882", "WS", "WSM", "Samoa", "Samoan"),
("674", "SM", "SMR", "San Marino", "Sammarinese"),
("678", "ST", "STP", "Sao Tome and Principe", "São Toméan"),
("682", "SA", "SAU", "Saudi Arabia", "Saudi, Saudi Arabian"),
("686", "SN", "SEN", "Senegal", "Senegalese"),
("688", "RS", "SRB", "Serbia", "Serbian"),
("690", "SC", "SYC", "Seychelles", "Seychellois"),
("694", "SL", "SLE", "Sierra Leone", "Sierra Leonean"),
("702", "SG", "SGP", "Singapore", "Singaporean"),
("534", "SX", "SXM", "Sint Maarten (Dutch part)", "Sint Maarten"),
("703", "SK", "SVK", "Slovakia", "Slovak"),
("705", "SI", "SVN", "Slovenia", "Slovenian, Slovene"),
("90", "SB", "SLB", "Solomon Islands", "Solomon Island"),
("706", "SO", "SOM", "Somalia", "Somali, Somalian"),
("710", "ZA", "ZAF", "South Africa", "South African"),
("239", "GS", "SGS", "South Georgia and the South Sandwich Islands", "South Georgia or South Sandwich Islands"),
("728", "SS", "SSD", "South Sudan", "South Sudanese"),
("724", "ES", "ESP", "Spain", "Spanish"),
("144", "LK", "LKA", "Sri Lanka", "Sri Lankan"),
("729", "SD", "SDN", "Sudan", "Sudanese"),
("740", "SR", "SUR", "Suriname", "Surinamese"),
("744", "SJ", "SJM", "Svalbard and Jan Mayen", "Svalbard"),
("748", "SZ", "SWZ", "Swaziland", "Swazi"),
("752", "SE", "SWE", "Sweden", "Swedish"),
("756", "CH", "CHE", "Switzerland", "Swiss"),
("760", "SY", "SYR", "Syrian Arab Republic", "Syrian"),
("158", "TW", "TWN", "Taiwan, Province of China", "Chinese, Taiwanese"),
("762", "TJ", "TJK", "Tajikistan", "Tajikistani"),
("834", "TZ", "TZA", "Tanzania, United Republic of", "Tanzanian"),
("764", "TH", "THA", "Thailand", "Thai"),
("626", "TL", "TLS", "Timor-Leste", "Timorese"),
("768", "TG", "TGO", "Togo", "Togolese"),
("772", "TK", "TKL", "Tokelau", "Tokelauan"),
("776", "TO", "TON", "Tonga", "Tongan"),
("780", "TT", "TTO", "Trinidad and Tobago", "Trinidadian or Tobagonian"),
("788", "TN", "TUN", "Tunisia", "Tunisian"),
("792", "TR", "TUR", "Turkey", "Turkish"),
("795", "TM", "TKM", "Turkmenistan", "Turkmen"),
("796", "TC", "TCA", "Turks and Caicos Islands", "Turks and Caicos Island"),
("798", "TV", "TUV", "Tuvalu", "Tuvaluan"),
("800", "UG", "UGA", "Uganda", "Ugandan"),
("804", "UA", "UKR", "Ukraine", "Ukrainian"),
("784", "AE", "ARE", "United Arab Emirates", "Emirati, Emirian, Emiri"),
("826", "GB", "GBR", "United Kingdom of Great Britain and Northern Ireland", "British, UK"),
("581", "UM", "UMI", "United States Minor Outlying Islands", "American"),
("840", "US", "USA", "United States of America", "American"),
("858", "UY", "URY", "Uruguay", "Uruguayan"),
("860", "UZ", "UZB", "Uzbekistan", "Uzbekistani, Uzbek"),
("548", "VU", "VUT", "Vanuatu", "Ni-Vanuatu, Vanuatuan"),
("862", "VE", "VEN", "Venezuela (Bolivarian Republic of)", "Venezuelan"),
("704", "VN", "VNM", "Vietnam", "Vietnamese"),
("92", "VG", "VGB", "Virgin Islands (British)", "British Virgin Island"),
("850", "VI", "VIR", "Virgin Islands (U.S.)", "U.S. Virgin Island"),
("876", "WF", "WLF", "Wallis and Futuna", "Wallis and Futuna, Wallisian or Futunan"),
("732", "EH", "ESH", "Western Sahara", "Sahrawi, Sahrawian, Sahraouian"),
("887", "YE", "YEM", "Yemen", "Yemeni"),
("894", "ZM", "ZMB", "Zambia", "Zambian"),
("716", "ZW", "ZWE", "Zimbabwe", "Zimbabwean");

CREATE TABLE mazhab_options (
  mazhab_id INT PRIMARY KEY,
  mazhab_name VARCHAR(50)
);


CREATE TABLE relation_types (
  id INTEGER PRIMARY KEY,
  relation_type VARCHAR(50)
);

INSERT INTO relation_types ( relation_type)
VALUES
  ('married'),
  ('divorced'),
  ('parent'),
  ('sibling'),
  ('widowed');

CREATE TABLE relations (
  individual1_id INTEGER,
  individual2_id INTEGER,
  relation_id INTEGER,
  FOREIGN KEY (relation_id) REFERENCES relation_types (id),
  FOREIGN KEY (individual1_id) REFERENCES Individuals (id),
  FOREIGN KEY (individual2_id) REFERENCES Individuals (id)
);

-- Create HasNationality table
CREATE TABLE HasNationality (
  individual_id INTEGER,
  has_nationality BOOLEAN,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id)
);

-- Create intermediate table for individual's nationality
CREATE TABLE IndividualNationality (
  individual_id INTEGER,
  country_id INT,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (country_id) REFERENCES countries (country_id)
);



-- Create 'LegalSituationTypes' table
CREATE TABLE LegalSituationTypes (
  legal_situation_type_id INTEGER,
  legal_situation_type VARCHAR(50),
  PRIMARY KEY (legal_situation_type_id)
);

-- Create 'NoResidencyReasons' table
CREATE TABLE NoResidencyReasons (
  no_residency_reason_id INTEGER,
  reason_no_residency_renewal VARCHAR(100),
  PRIMARY KEY (no_residency_reason_id)
);

-- Create 'ResidencyTypes' table
CREATE TABLE ResidencyTypes (
  residency_type_id INTEGER,
  residency_type VARCHAR(50),
  PRIMARY KEY (residency_type_id)
);

-- Create 'LegalSituation' table
CREATE TABLE LegalSituation (
  legal_situation_type_id INTEGER,
  individual_id INTEGER,
  has_entered_legally BOOLEAN,
  date_of_entering_lebanon DATE,
  date_end_residency DATE,
  reason_no_residency_renewal_id INTEGER,
  residency_type_id INTEGER,
  has_passport BOOLEAN,
  passport_country_delivered_id INTEGER,
  end_of_passport_validity DATE,
  FOREIGN KEY (legal_situation_type_id) REFERENCES LegalSituationTypes (legal_situation_type_id),
  FOREIGN KEY (individual_id) REFERENCES HasNationality (individual_id),
  FOREIGN KEY (reason_no_residency_renewal_id) REFERENCES NoResidencyReasons (no_residency_reason_id),
  FOREIGN KEY (residency_type_id) REFERENCES ResidencyTypes (residency_type_id),
  FOREIGN KEY (passport_country_delivered_id) REFERENCES countries (country_id)
);

CREATE TABLE LebanonLocation (
  location_id INT PRIMARY KEY,
  location_name VARCHAR(50)
);

CREATE TABLE SupervisionOptions (
  supervision_id INT PRIMARY KEY,
  supervision_name VARCHAR(50)
);

CREATE TABLE LocationType (
  location_type_id INT PRIMARY KEY,
  location_type_name VARCHAR(50)
);

CREATE TABLE WiladaProofTypes (
  proof_id INT PRIMARY KEY,
  proof_name VARCHAR(50)
);

CREATE TABLE WasietWiledeTypes (
  wasiet_id INT PRIMARY KEY,
  wasiet_name VARCHAR(50)
);

CREATE TABLE BirthInformation (
  individual_id INTEGER,
  country_of_birth INT,
  date_of_birth DATE,
  location_of_birth INT,
  doctor_supervision INT,
  location_type INT,
  hospital_name VARCHAR(50),
  supervisor_alive BOOLEAN,
  shahadat_wilada INT,
  country_of_deliverance INT,
  wasiet_wilede INT,
  informations_correct BOOLEAN,
  errors TEXT,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (country_of_birth) REFERENCES countries (country_id),
  FOREIGN KEY (location_of_birth) REFERENCES LebanonLocation (location_id),
  FOREIGN KEY (doctor_supervision) REFERENCES SupervisionOptions (supervision_id),
  FOREIGN KEY (location_type) REFERENCES LocationType (location_type_id),
  FOREIGN KEY (shahadat_wilada) REFERENCES WiladaProofTypes (proof_id),
  FOREIGN KEY (country_of_deliverance) REFERENCES countries (country_id),
  FOREIGN KEY (wasiet_wilede) REFERENCES WasietWiledeTypes (wasiet_id)
);

-- Create table 'LikahOptions'
CREATE TABLE IF NOT EXISTS LikahOptions (
  likah_id INT,
  likah_type VARCHAR(50),
  PRIMARY KEY (likah_id)
);

-- Create table 'MzmanaOptions'
CREATE TABLE IF NOT EXISTS MzmanaOptions (
  mzmana_id INT,
  mzmana_type VARCHAR(50),
  PRIMARY KEY (mzmana_id)
);

-- Create table 'IlajOptions'
CREATE TABLE IF NOT EXISTS IlajOptions (
  ilaj_id INT,
  ilaj_type VARCHAR(50),
  PRIMARY KEY (ilaj_id)
);

-- Create table 'MostadimaOptions'
CREATE TABLE IF NOT EXISTS MostadimaOptions (
  mostadima_id INT,
  mostadima_type VARCHAR(50),
  PRIMARY KEY (mostadima_id)
);

-- Create table 'DoctorOptions'
CREATE TABLE IF NOT EXISTS DoctorOptions (
  doctor_id INT,
  doctor_name VARCHAR(50),
  PRIMARY KEY (doctor_id)
);

-- Create table 'AddictionTypes'
CREATE TABLE IF NOT EXISTS AddictionTypes (
  addiction_id INT,
  addiction_type VARCHAR(50),
  PRIMARY KEY (addiction_id)
);

-- Create table 'HealthInfo'
CREATE TABLE IF NOT EXISTS HealthInfo (
  individual_id INT,
  likahat_id INT,
  amrad_mozmana_id INT,
  ilaj_mozman_id INT,
  adwiya_mostadima_id INT,
  hala_sohiya_mostajeda BOOLEAN,
  type_mostajed TEXT,
  visited_doctor_mustajed INT,
  ilaj_mustajed INT,
  mental_problems BOOLEAN,
  visited_doctor_mental INT,
  ilaj_nafsi INT,
  ilaj_price INT,
  addiction INT,
  ilaj_addiction INT,
  ilaj_addiction_price INT,
  visited_doctor_addiction INT,
  addiction_facility_name VARCHAR(50),
  since_when DATE,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (likahat_id) REFERENCES LikahOptions (likah_id),
  FOREIGN KEY (amrad_mozmana_id) REFERENCES MzmanaOptions (mzmana_id),
  FOREIGN KEY (ilaj_mozman_id) REFERENCES IlajOptions (ilaj_id),
  FOREIGN KEY (adwiya_mostadima_id) REFERENCES MostadimaOptions (mostadima_id),
  FOREIGN KEY (visited_doctor_mustajed) REFERENCES DoctorOptions (doctor_id),
  FOREIGN KEY (visited_doctor_addiction) REFERENCES DoctorOptions (doctor_id),
  FOREIGN KEY (ilaj_mustajed) REFERENCES IlajOptions (ilaj_id),
  FOREIGN KEY (visited_doctor_mental) REFERENCES DoctorOptions (doctor_id),
  FOREIGN KEY (ilaj_nafsi) REFERENCES IlajOptions (ilaj_id),
  FOREIGN KEY (addiction) REFERENCES AddictionTypes (addiction_id),
  FOREIGN KEY (ilaj_addiction) REFERENCES IlajOptions (ilaj_id)
);


-- Intermediate tables
CREATE TABLE IF NOT EXISTS CurrentStudyOptions (
  current_study_id INT PRIMARY KEY,
  option_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS SchoolTypes (
  school_type_id INT PRIMARY KEY,
  type_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS OnlineStudySuccess (
  online_study_success_id INT PRIMARY KEY,
  success_status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS SchoolProgress (
  academic_year_id INT PRIMARY KEY,
  academic_year VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS TarshihAvailability (
  tarshih_availability_id INT PRIMARY KEY,
  availability_status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS StoppedReasons (
  stopped_reason_id INT PRIMARY KEY,
  reason_description VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS MahouOmiyaOptions (
  mahou_omiya_id INT PRIMARY KEY,
  option_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS SelfStudyOptions (
  self_study_id INT PRIMARY KEY,
  option_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS MoaadaletShhedeOptions (
  moaadalet_shhede_id INT PRIMARY KEY,
  option_name VARCHAR(50) NOT NULL
);

-- Education table
CREATE TABLE IF NOT EXISTS Education (
  id INTEGER PRIMARY KEY,
  individual_id INTEGER,
  current_study_id INT,
  name_of_school VARCHAR(100),
  type_of_school INT,
  online_study BOOLEAN,
  online_study_succeed INT,
  academic_year INT,
  ifedet BOOLEAN,
  talab_tarshih INT,
  age_when_stopped_school INT,
  reason_stop_school INT,
  read_and_write BOOLEAN,
  dawrat_mahou_omiya INT,
  self_studying INT,
  preferred_job TEXT,
  abroad_study BOOLEAN,
  moaadalat_shhede INT,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (current_study_id) REFERENCES CurrentStudyOptions (current_study_id),
  FOREIGN KEY (type_of_school) REFERENCES SchoolTypes (school_type_id),
  FOREIGN KEY (online_study_succeed) REFERENCES OnlineStudySuccess (online_study_success_id),
  FOREIGN KEY (academic_year) REFERENCES SchoolProgress (academic_year_id),
  FOREIGN KEY (talab_tarshih) REFERENCES TarshihAvailability (tarshih_availability_id),
  FOREIGN KEY (reason_stop_school) REFERENCES StoppedReasons (stopped_reason_id),
  FOREIGN KEY (dawrat_mahou_omiya) REFERENCES MahouOmiyaOptions (mahou_omiya_id),
  FOREIGN KEY (self_studying) REFERENCES SelfStudyOptions (self_study_id),
  FOREIGN KEY (moaadalat_shhede) REFERENCES MoaadaletShhedeOptions (moaadalet_shhede_id)
);


-- JobTypes
CREATE TABLE IF NOT EXISTS JobTypes (
  job_type_id INTEGER PRIMARY KEY,
  job_type VARCHAR(50)
);

-- PaymentTypes
CREATE TABLE IF NOT EXISTS PaymentTypes (
  payment_type_id INTEGER PRIMARY KEY,
  payment_type VARCHAR(50)
);

-- PaymentMethods
CREATE TABLE IF NOT EXISTS PaymentMethods (
  payment_method_id INTEGER PRIMARY KEY,
  payment_method VARCHAR(50)
);

-- DamanIjtimaaiOptions
CREATE TABLE IF NOT EXISTS DamanIjtimaaiOptions (
  daman_ijtimaai_id INTEGER PRIMARY KEY,
  daman_ijtimaai_option VARCHAR(50)
);

-- FullPaymentOptions
CREATE TABLE IF NOT EXISTS FullPaymentOptions (
  full_payment_id INTEGER PRIMARY KEY,
  full_payment_option VARCHAR(50)
);

-- BossProblems
CREATE TABLE IF NOT EXISTS BossProblems (
  boss_problems_id INTEGER PRIMARY KEY,
  boss_problems VARCHAR(50)
);

-- NakabaOptions
CREATE TABLE IF NOT EXISTS NakabaOptions (
  nakaba_id INTEGER PRIMARY KEY,
  nakaba_option VARCHAR(50)
);

-- NotWorkingReason
CREATE TABLE IF NOT EXISTS NotWorkingReason (
  reason_id INTEGER PRIMARY KEY,
  reason VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Work (
  individual_id INTEGER,
  works BOOLEAN,
  job_type INTEGER,
  job_details TEXT,
  payment_type INTEGER,
  payment_method INTEGER,
  salary INTEGER,
  works_more_than_one_job BOOLEAN,
  has_contract BOOLEAN,
  daman_ijtimaai INTEGER,
  full_payment INTEGER,
  since_when_not_fully_payed DATE,
  problems_with_boss INTEGER,
  nakaba INTEGER,
  asked_nakaba_help BOOLEAN,
  since_when_not_working DATE,
  reason INTEGER,
  when_fired DATE,
  time_working_before_fired INTEGER,
  reason_fired TEXT,
  warned_before_fired BOOLEAN,
  taawid_after_fired BOOLEAN,
  foreigner_work_permit BOOLEAN,
  reason_no_permit TEXT,
  last_work_permit DATE,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (job_type) REFERENCES JobTypes (job_type_id),
  FOREIGN KEY (payment_type) REFERENCES PaymentTypes (payment_type_id),
  FOREIGN KEY (payment_method) REFERENCES PaymentMethods (payment_method_id),
  FOREIGN KEY (daman_ijtimaai) REFERENCES DamanIjtimaaiOptions (daman_ijtimaai_id),
  FOREIGN KEY (full_payment) REFERENCES FullPaymentOptions (full_payment_id),
  FOREIGN KEY (problems_with_boss) REFERENCES BossProblems (boss_problems_id),
  FOREIGN KEY (nakaba) REFERENCES NakabaOptions (nakaba_id),
  FOREIGN KEY (reason) REFERENCES NotWorkingReason (reason_id)
);




-- Create TreatmentAvailability table
CREATE TABLE TreatmentAvailability (
  id INTEGER,
  availability TEXT,
  PRIMARY KEY (id)
);

-- Create NeedTypes table
CREATE TABLE NeedTypes (
  id INTEGER,
  type TEXT,
  PRIMARY KEY (id)
);

-- Create HouseNeeds table
CREATE TABLE HouseNeeds (
  id INTEGER,
  house_needs TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE SpecialNeedOptions (
  id INTEGER,
  special_need VARCHAR(30),
  PRIMARY KEY (id)
)

-- Create SpecialNeed table
CREATE TABLE SpecialNeed (
  individual_id INTEGER,
  special_needs BOOLEAN,
  special_need INT,
  is_permanent BOOLEAN,
  treatment_id INTEGER,
  need_type_id INTEGER,
  house_enough_for_needs_id INTEGER,
  school_problems_because_of_special BOOLEAN,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (treatment_id) REFERENCES TreatmentAvailability (id),
  FOREIGN KEY (need_type_id) REFERENCES NeedTypes (id),
  FOREIGN KEY (special_need) REFERENCES SpecialNeedOptions (id),
  FOREIGN KEY (house_enough_for_needs_id) REFERENCES HouseNeeds (id)
);

-- Create Ancestor table
CREATE TABLE Ancestor (
  ancestor_id INTEGER PRIMARY KEY,
  ancestor_name VARCHAR(50)
);

-- Create NationalityTypes table
CREATE TABLE NationalityTypes (
  nationality_type_id INTEGER PRIMARY KEY,
  nationality_type_name VARCHAR(50)
);

-- Create TajanosMethod table
CREATE TABLE TajanosMethod (
  how_lebanese_id INTEGER PRIMARY KEY,
  how_lebanese_name VARCHAR(50)
);

-- Create AncestorNationality table
CREATE TABLE AncestorNationality (
  individual_id INTEGER,
  ancestor_id INTEGER,
  nationality_type_id INTEGER,
  how_lebanese_id INTEGER,
  nationality_id INTEGER,
  is_alive BOOLEAN,
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (ancestor_id) REFERENCES Ancestor (ancestor_id),
  FOREIGN KEY (nationality_type_id) REFERENCES NationalityTypes (nationality_type_id),
  FOREIGN KEY (how_lebanese_id) REFERENCES TajanosMethod (how_lebanese_id),
  FOREIGN KEY (nationality_id) REFERENCES countries (nationality)
);


CREATE TABLE AdditionalInfos (
  id INTEGER PRIMARY KEY,
  individual_id INT,
  asked_another_nationality BOOLEAN,
  when_asked_nationality DATE,
  country_asked INT,
  asked_lebanese_nationality BOOLEAN,
  how_asked_lebanese_nationality INT,
  lawyer_help BOOLEAN,
  lawyer_full_name VARCHAR(50),
  year_asked_lebanese_nationality YEAR,
  application_in_progress BOOLEAN,
  application_accepted BOOLEAN,
  ever_had_a_nationality_removal BOOLEAN,
  nationality_removed INT,
  date_removed DATE,
  reason_removed TEXT,
  has_bayan_fardi BOOLEAN,
  bayan_fardi_country INT,
  has_bayan_aa2ili BOOLEAN,
  bayan_aa2ili_country INT,
  has_betaka_hawiya BOOLEAN,
  betaka_hawiya_country INT,
  date_betaka DATE,
  date_end_betaka DATE,
  has_renewed_betaka BOOLEAN,
  has_ifadat_taarif_esem BOOLEAN,
  mokhtar_ifada_full_name VARCHAR(50),
  has_betakat_taarif_mokhtar BOOLEAN,
  mokhtar_betaka_full_name VARCHAR(50),
  has_eshara_ehtiraziya BOOLEAN,
  relation_between_them VARCHAR(20),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (country_asked) REFERENCES countries (country_id),
  FOREIGN KEY (asked_lebanese_nationality) REFERENCES LebNationalityOptions (id),
  FOREIGN KEY (nationality_removed) REFERENCES countries (country_id),
  FOREIGN KEY (bayan_fardi_country) REFERENCES countries (country_id),
  FOREIGN KEY (bayan_aa2ili_country) REFERENCES countries (country_id),
  FOREIGN KEY (betaka_hawiya_country) REFERENCES countries (country_id),
  FOREIGN KEY (how_asked_lebanese_nationality) REFERENCES MethodAskingLebaneseNationality (id)

);

CREATE TABLE IF NOT EXISTS MethodAskingLebaneseNationality (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50)

);


CREATE TABLE FamilyHistory (
  id INTEGER PRIMARY KEY,
  individual_id INT,
  family_origins INT,
  kabile TEXT,
  kawmiye INT,
  logha_l_om INT,
  since_when_in_leb INT,
  before_leb INT,
  FOREIGN KEY (family_origins) REFERENCES countries (nationality),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (kawmiye) REFERENCES KawmiyeOptions (id),
  FOREIGN KEY (logha_l_om) REFERENCES LoghaOmOptions (id), 
  FOREIGN KEY (since_when_in_leb) REFERENCES InLebSinceOptions (id), 
  FOREIGN KEY (before_leb) REFERENCES BeforeLebSinceOptions (id),

);

CREATE TABLE LebNationalityOptions (
  id INTEGER PRIMARY KEY,
  leb_nationality_option VARCHAR(50)
);

CREATE TABLE BeforeLebSinceOptions (
  id INTEGER PRIMARY KEY,
  before_leb_since_option VARCHAR(50)
);

CREATE TABLE InLebSinceOptions (
  id  INTEGER PRIMARY KEY,
  in_leb_since_option VARCHAR(50)
);

CREATE TABLE LoghaOmOptions (
  id INTEGER PRIMARY KEY,
  logha_l_om VARCHAR(50)
);

CREATE TABLE KawmiyeOptions (
  id INTEGER PRIMARY KEY,
  kawmiye_name VARCHAR(50)
);

-- Create TelephoneTypes table
CREATE TABLE IF NOT EXISTS TelephoneTypes (
  type_id INT PRIMARY KEY,
  type_name VARCHAR(50)
);

-- Create telephone table
CREATE TABLE IF NOT EXISTS telephone (
  individual_id INT,
  type_id INT,
  phone_number VARCHAR(20),
  phone_owner VARCHAR(50),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (type_id) REFERENCES TelephoneTypes (type_id)
);

-- Create HHtypes table
CREATE TABLE IF NOT EXISTS HHtypes (
  h_type_id INT PRIMARY KEY,
  h_type_name VARCHAR(50)
);

-- Create HHResidencyTypes table
CREATE TABLE IF NOT EXISTS HHResidencyTypes (
  residency_type_id INT PRIMARY KEY,
  residency_type_name VARCHAR(50)
);

-- Create HHOwnershipTypes table
CREATE TABLE IF NOT EXISTS HHOwnershipTypes (
  ownership_type_id INT PRIMARY KEY,
  ownership_type_name VARCHAR(50)
);

-- Create HHRentTypes table
CREATE TABLE IF NOT EXISTS HHRentTypes (
  rent_type_id INT PRIMARY KEY,
  rent_type_name VARCHAR(50)
);

-- Create HHRentProofs table
CREATE TABLE IF NOT EXISTS HHRentProofs (
  rent_proof_id INT PRIMARY KEY,
  rent_proof_name VARCHAR(50)
);

-- Create HHGivenBy table
CREATE TABLE IF NOT EXISTS HHGivenBy (
  given_by_id INT PRIMARY KEY,
  given_by_name VARCHAR(50)
);

-- Create HHGivenPeriod table
CREATE TABLE IF NOT EXISTS HHGivenPeriod (
  given_period_id INT PRIMARY KEY,
  given_period_name VARCHAR(50)
);

-- Create HHSituation table
CREATE TABLE IF NOT EXISTS HHSituation (
  hh_situation_id INT PRIMARY KEY,
  hh_situation_name VARCHAR(50)
);

-- Create HHReasonOptions table
CREATE TABLE IF NOT EXISTS HHReasonOptions (
  hh_reason_id INT PRIMARY KEY,
  hh_reason_name VARCHAR(50)
);

-- Create HHEvacReasons table
CREATE TABLE IF NOT EXISTS HHEvacReasons (
  evac_reason_id INT PRIMARY KEY,
  evac_reason_name VARCHAR(50)
);

-- Create HHSurroundings table
CREATE TABLE IF NOT EXISTS HHSurroundings (
  surroundings_id INT PRIMARY KEY,
  surroundings_name VARCHAR(50)
);

CREATE TABLE Khadamet (
  khadamet_id INT PRIMARY KEY,
  khadamet_name VARCHAR(50)
);

-- Create HouseHoldInfos table
CREATE TABLE IF NOT EXISTS HouseHoldInfos (
  HHid INTEGER PRIMARY KEY,
  nb_of_families INT,
  number_of_people_notfamily_in_household INT,
  h_type INT,
  area INT,
  has_kitchen BOOLEAN,
  has_bathroom BOOLEAN,
  number_of_rooms_withoutkitchenandbath INT,
  residency_type INT,
  ownership_type INT,
  rent_type INT,
  rent_cost INT,
  payment_proof INT,
  hh_given INT,
  is_given_temporarily BOOLEAN,
  given_until INT,
  hh_situation INT,
  hh_reason INT,
  is_threatened_evacuation BOOLEAN,
  reason_evacuation INT,
  hh_muhadad_soukout BOOLEAN,
  owner_knows_soukout BOOLEAN,
  owner_tried_repairing BOOLEAN,
  baladiya_knows BOOLEAN,
  baladiya_acted BOOLEAN,
  have_another_place BOOLEAN,
  around_hh INT,
  FOREIGN KEY (h_type) REFERENCES HHtypes (h_type_id),
  FOREIGN KEY (residency_type) REFERENCES HHResidencyTypes (residency_type_id),
  FOREIGN KEY (ownership_type) REFERENCES HHOwnershipTypes (ownership_type_id),
  FOREIGN KEY (rent_type) REFERENCES HHRentTypes (rent_type_id),
  FOREIGN KEY (payment_proof) REFERENCES HHRentProofs (rent_proof_id),
  FOREIGN KEY (hh_given) REFERENCES HHGivenBy (given_by_id),
  FOREIGN KEY (given_until) REFERENCES HHGivenPeriod (given_period_id),
  FOREIGN KEY (hh_situation) REFERENCES HHSituation (hh_situation_id),
  FOREIGN KEY (hh_reason) REFERENCES HHReasonOptions (hh_reason_id),
  FOREIGN KEY (reason_evacuation) REFERENCES HHEvacReasons (evac_reason_id),
  FOREIGN KEY (around_hh) REFERENCES HHSurroundings (surroundings_id)
);


CREATE TABLE HHKhadamet (
  HHid INT,
  available_khadamet INT,
  payed TEXT,
  has_receipt INT,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos(HHid),
  FOREIGN KEY (available_khadamet) REFERENCES Khadamet(khadamet_id)
);

-- Create LebanonRegions table
CREATE TABLE IF NOT EXISTS LebanonRegions (
  region_id INT PRIMARY KEY,
  region_name VARCHAR(50)
);

-- Create LebanonCazas table
CREATE TABLE IF NOT EXISTS LebanonCazas (
  caza_id INT PRIMARY KEY,
  caza_name VARCHAR(50)
);

-- Create LebanonMohafaza table
CREATE TABLE IF NOT EXISTS LebanonMohafaza (
  mohafaza_id INT PRIMARY KEY,
  mohafaza_name VARCHAR(50)
);

-- Create HHadress table
CREATE TABLE IF NOT EXISTS HHadress (
  HHid INT,
  region_id INT,
  caza_id INT,
  mohafaza_id INT,
  details TEXT,
  baladiya TEXT,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos (HHid),
  FOREIGN KEY (region_id) REFERENCES LebanonRegions (region_id),
  FOREIGN KEY (caza_id) REFERENCES LebanonCazas (caza_id),
  FOREIGN KEY (mohafaza_id) REFERENCES LebanonMohafaza (mohafaza_id)
);

CREATE TABLE FamilyHead (
  HHid INT,
  individual_id INT,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos (HHid),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id)
);


-- Create table RelationshipStatusOptions
CREATE TABLE RelationshipStatusOptions (
  relationship_status_id INT PRIMARY KEY,
  status_name VARCHAR(50)
);

-- Create table ReasonMemberAway
CREATE TABLE ReasonMemberAway (
  reason_away_id INT PRIMARY KEY,
  reason_name VARCHAR(50)
);


-- Create table FamilyMemberAway
CREATE TABLE FamilyMemberAway (
  HHid INT,
  family_head_individual_id INT,
  individual_id INT,
  relationship_status_id INT,
  reason_away_id INT,
  current_address TEXT,
  phone_number VARCHAR(50),
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos (HHid),
  FOREIGN KEY (family_head_individual_id) REFERENCES FamilyHead (individual_id),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (relationship_status_id) REFERENCES RelationshipStatusOptions (relationship_status_id),
  FOREIGN KEY (reason_away_id) REFERENCES ReasonMemberAway (reason_away_id)
);


-- Create table HeadRefRelationOptions
CREATE TABLE IF NOT EXISTS HeadRefRelationOptions (
  relation_head_ref INT PRIMARY KEY,
  relation_name VARCHAR(50)
);

-- Create table FamilyHeadReferences
CREATE TABLE IF NOT EXISTS FamilyHeadReferences (
  HHid INT,
  individual_id INT,
  reference INT,
  relation_head_ref INT,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos(HHid),
  FOREIGN KEY (individual_id) REFERENCES Individuals(id),
  FOREIGN KEY (reference) REFERENCES Individuals(id),
  FOREIGN KEY (relation_head_ref) REFERENCES HeadRefRelationOptions(relation_head_ref)
);



-- Create table FamilyIncomeOptions
CREATE TABLE FamilyIncomeOptions (
  id INT,
  option_name VARCHAR(50),
  PRIMARY KEY (id)
);

-- Create table FamilyKaredReasons
CREATE TABLE FamilyKaredReasons (
  id INT,
  reason_name VARCHAR(50),
  PRIMARY KEY (id)
);

-- Create table FamilyNegativeOutcomeSolutions
CREATE TABLE FamilyNegativeOutcomeSolutions (
  id INT,
  solution_name VARCHAR(50),
  PRIMARY KEY (id)
);

-- Create table FamilySpendingOn
CREATE TABLE FamilySpendingOn (
  id INT,
  spending_name VARCHAR(50),
  PRIMARY KEY (id)
);

-- Create table FamilyFinance
CREATE TABLE FamilyFinance (
  HHid INTEGER,
  individual_id INTEGER,
  average_income INT,
  income_majority INT,
  kared_masrifi BOOLEAN,
  kared_ghayr_masrifi BOOLEAN,
  kared_reason INT,
  average_paying_monthly INT,
  paying_difference_incomeoutcome_method INT,
  paying_on INT,
  getting_financial_help BOOLEAN,
  FOREIGN KEY (HHid) REFERENCES FamilyHead(HHid),
  FOREIGN KEY (individual_id) REFERENCES FamilyHead(individual_id),
  FOREIGN KEY (income_majority) REFERENCES FamilyIncomeOptions(id),
  FOREIGN KEY (kared_reason) REFERENCES FamilyKaredReasons(id),
  FOREIGN KEY (paying_difference_incomeoutcome_method) REFERENCES FamilyNegativeOutcomeSolutions(id),
  FOREIGN KEY (paying_on) REFERENCES FamilySpendingOn(id)
);


CREATE TABLE HasBankAccount (
  HHid INT,
  individual_id INT,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos (HHid),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id)
);


-- Intermediate Table: NoTreatmentReasons
CREATE TABLE NoTreatmentReasons (
  reason_id INT PRIMARY KEY,
  reason_text VARCHAR(50)
);

-- Intermediate Table: HealthFacilityOwnerOptions
CREATE TABLE HealthFacilityOwnerOptions (
  option_id INT PRIMARY KEY,
  option_name VARCHAR(50)
);

-- Intermediate Table: HealthFaciltyReliability
CREATE TABLE HealthFaciltyReliability (
  reliability_id INT PRIMARY KEY,
  reliability_text VARCHAR(50)
);

-- Main Table: FamilyHealth
CREATE TABLE FamilyHealth (
  HHid INT,
  individual_id INT,
  where_to_when_sick INT,
  why_no_treatment INT,
  hospital_around_area BOOLEAN,
  how_far INT,
  belongs_to INT,
  can_help INT,
  method_pf_paying INT,
  get_free_meds BOOLEAN,
  FOREIGN KEY (HHid) REFERENCES FamilyHead (HHid),
  FOREIGN KEY (method_pf_paying) REFERENCES PayingMethodOptions (method_id),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (where_to_when_sick) REFERENCES IlajOptions (option_id),
  FOREIGN KEY (why_no_treatment) REFERENCES NoTreatmentReasons (reason_id),
  FOREIGN KEY (belongs_to) REFERENCES HealthFacilityOwnerOptions (option_id),
  FOREIGN KEY (can_help) REFERENCES HealthFaciltyReliability (reliability_id)
);

CREATE TABLE PayingMethodOptions (
  method_id INT PRIMARY KEY,
  method_name VARCHAR(50)
)


-- Create Table: FamilyEducation
CREATE TABLE FamilyEducation (
  HHid INTEGER,
  individual_id INTEGER,
  school_nearby BOOLEAN,
  school_type INT,
  kids_school_help INT,
  tried_un_help BOOLEAN,
  un_help_how INT,
  un_help_result INT,
  FOREIGN KEY (HHid) REFERENCES FamilyHead(HHid),
  FOREIGN KEY (individual_id) REFERENCES Individuals(id),
  FOREIGN KEY (school_type) REFERENCES SchoolTypes(id),
  FOREIGN KEY (kids_school_help) REFERENCES KidsEducationalSupportOptions(id),
  FOREIGN KEY (un_help_how) REFERENCES EducationHelpUn(id),
  FOREIGN KEY (un_help_result) REFERENCES EducationHelpUnResult(id)
);


-- Create Intermediate Table: KidsEducationalSupportOptions
CREATE TABLE KidsEducationalSupportOptions (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

-- Create Intermediate Table: EducationHelpUn
CREATE TABLE EducationHelpUn (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

-- Create Intermediate Table: EducationHelpUnResult
CREATE TABLE EducationHelpUnResult (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);


CREATE TABLE Occupancy (
  HHid INTEGER,
  individual_id INTEGER,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos (HHid),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id)
);

CREATE TABLE QuestInfo (
  quest_id INTEGER PRIMARY KEY,
  HHid INTEGER,
  individual_id INTEGER,
  user_id INTEGER,
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY (HHid) REFERENCES HouseHoldInfos (HHid),
  FOREIGN KEY (individual_id) REFERENCES Individuals (id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);


CREATE TABLE Decisions (
  quest_id INTEGER,
  subject TEXT,
  ershad TEXT,
  FOREIGN KEY (quest_id) REFERENCES QuestInfo (quest_id)
);


-- Create table: Individuals
CREATE TABLE Individuals (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(50),
  father_name VARCHAR(50),
  grandfather_name VARCHAR(50),
  last_name VARCHAR(50),
  sex_id INT,
  mazhab_id INT,
  alive BOOLEAN,
  FOREIGN KEY (sex_id) REFERENCES sex_options (sex_id),
  FOREIGN KEY (mazhab_id) REFERENCES mazhab_options (mazhab_id)
);
