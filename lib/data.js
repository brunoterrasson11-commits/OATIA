// ============================================================
// OATIA – Données de référence (mock réaliste)
// ============================================================

export const etablissements = [
  {
    id: 1, nom: "EPLEFPA Bordeaux Blanquefort", type: "EPLEFPA", uai: "0330001A",
    code_departement: "33", lat: 44.916, lng: -0.637,
    region: "Nouvelle-Aquitaine", departement: "Gironde", statut: "public",
    effectifs_total: 520, taux_remplissage: 91, taux_insertion: 87,
    formations: ["BPREA Viticulture", "Bac Pro CGEA", "BTS VitiEnologie", "BTSA Viticulture-Œnologie"],
    coordonnees: [44.916, -0.637]
  },
  {
    id: 2, nom: "MFR de Périgueux-Antonne", type: "MFR", uai: "0240002B",
    code_departement: "24", lat: 45.183, lng: 0.721,
    region: "Nouvelle-Aquitaine", departement: "Dordogne", statut: "privé",
    effectifs_total: 180, taux_remplissage: 78, taux_insertion: 82,
    formations: ["CAPA Services Milieu Rural", "Bac Pro Forêt", "BPREA Maraîchage Bio"],
    coordonnees: [45.183, 0.721]
  },
  {
    id: 3, nom: "Lycée Agricole de Montpellier-Agropolis", type: "EPLEFPA", uai: "0340010C",
    code_departement: "34", lat: 43.648, lng: 3.862,
    region: "Occitanie", departement: "Hérault", statut: "public",
    effectifs_total: 680, taux_remplissage: 95, taux_insertion: 89,
    formations: ["Bac Pro CGEA Systèmes Grandes Cultures", "BTS ACSE", "BTSA Agronomie Agroécologie", "BTS Horticulture"],
    coordonnees: [43.648, 3.862]
  },
  {
    id: 4, nom: "CFPPA de Toulouse-Auzeville", type: "CFPPA", uai: "0310020D",
    code_departement: "31", lat: 43.534, lng: 1.497,
    region: "Occitanie", departement: "Haute-Garonne", statut: "public",
    effectifs_total: 320, taux_remplissage: 88, taux_insertion: 84,
    formations: ["BPREA Grandes Cultures", "CS Agriculture Biologique", "BP Responsable d'Exploitation Agricole"],
    coordonnees: [43.534, 1.497]
  },
  {
    id: 5, nom: "Lycée Agricole de Rouen-Rouvray", type: "EPLEFPA", uai: "0760005E",
    code_departement: "76", lat: 49.382, lng: 1.073,
    region: "Normandie", departement: "Seine-Maritime", statut: "public",
    effectifs_total: 410, taux_remplissage: 84, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages Bovins", "BTS Productions Animales", "BTSA ACSE"],
    coordonnees: [49.382, 1.073]
  },
  {
    id: 6, nom: "MFR de Caen-Mondeville", type: "MFR", uai: "0140006F",
    code_departement: "14", lat: 49.187, lng: -0.349,
    region: "Normandie", departement: "Calvados", statut: "privé",
    effectifs_total: 145, taux_remplissage: 71, taux_insertion: 76,
    formations: ["CAPA Agriculture", "Bac Pro CGEA"],
    coordonnees: [49.187, -0.349]
  },
  {
    id: 7, nom: "EPLEFPA de Lyon-Dardilly", type: "EPLEFPA", uai: "0690007G",
    code_departement: "69", lat: 45.808, lng: 4.764,
    region: "Auvergne-Rhône-Alpes", departement: "Rhône", statut: "public",
    effectifs_total: 560, taux_remplissage: 93, taux_insertion: 91,
    formations: ["Bac Pro CGEA Maraîchage", "BTS Horticulture", "BTSA Agronomie", "CS Jardins & Espaces Verts"],
    coordonnees: [45.808, 4.764]
  },
  {
    id: 8, nom: "Lycée Agricole de Rennes-Le Rheu", type: "EPLEFPA", uai: "0350008H",
    code_departement: "35", lat: 48.108, lng: -1.777,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "public",
    effectifs_total: 490, taux_remplissage: 89, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages Porcins", "BTS Productions Animales", "BTSA ACSE", "BPREA Légumes", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA035", consortium_id: null, consortium_label: null, role: "chef_file" },
    coordonnees: [48.108, -1.777]
  },
  {
    id: 9, nom: "CFPPA de Quimper-Kernilien", type: "CFPPA", uai: "0290009I",
    code_departement: "29", lat: 47.997, lng: -4.097,
    region: "Bretagne", departement: "Finistère", statut: "public",
    effectifs_total: 210, taux_remplissage: 82, taux_insertion: 79,
    formations: ["BPREA Maraîchage Bio", "BP REA", "CS Agriculture de Conservation"],
    coordonnees: [47.997, -4.097]
  },
  {
    id: 10, nom: "Lycée Agricole de Dijon-Quetigny", type: "EPLEFPA", uai: "0210010J",
    code_departement: "21", lat: 47.322, lng: 5.147,
    region: "Bourgogne-Franche-Comté", departement: "Côte-d'Or", statut: "public",
    effectifs_total: 430, taux_remplissage: 86, taux_insertion: 83,
    formations: ["Bac Pro Vigne & Vin", "BTS VitiEnologie", "BTSA Agronomie", "BPREA Viticulture"],
    coordonnees: [47.322, 5.147]
  },
  {
    id: 11, nom: "MFR de Clermont-Ferrand Lempdes", type: "MFR", uai: "0630011K",
    code_departement: "63", lat: 45.772, lng: 3.204,
    region: "Auvergne-Rhône-Alpes", departement: "Puy-de-Dôme", statut: "privé",
    effectifs_total: 195, taux_remplissage: 76, taux_insertion: 73,
    formations: ["CAPA Agriculture", "Bac Pro CGEA Élevage"],
    coordonnees: [45.772, 3.204]
  },
  {
    id: 12, nom: "EPLEFPA de Strasbourg-Obernai", type: "EPLEFPA", uai: "0670012L",
    code_departement: "67", lat: 48.461, lng: 7.479,
    region: "Grand Est", departement: "Bas-Rhin", statut: "public",
    effectifs_total: 395, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro Vigne & Vin", "BTS VitiEnologie", "BPREA Maraîchage", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT008", consortium_id: null, consortium_label: null, role: "chef_file" },
    coordonnees: [48.461, 7.479]
  },
  {
    id: 13, nom: "Lycée Agricole de Nantes-Le Bignon", type: "EPLEFPA", uai: "0440013M",
    code_departement: "44", lat: 47.121, lng: -1.553,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "public",
    effectifs_total: 510, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTS Horticulture", "BTSA ACSE", "CS Agriculture Urbaine"],
    coordonnees: [47.121, -1.553]
  },
  {
    id: 14, nom: "CFPPA de Poitiers-Venours", type: "CFPPA", uai: "0860014N",
    code_departement: "86", lat: 46.581, lng: 0.340,
    region: "Nouvelle-Aquitaine", departement: "Vienne", statut: "public",
    effectifs_total: 165, taux_remplissage: 69, taux_insertion: 71,
    formations: ["BPREA Maraîchage", "CS Agroécologie", "BP Responsable d'Exploitation"],
    coordonnees: [46.581, 0.340]
  },
  {
    id: 15, nom: "Lycée Agricole de Marseille-Aix", type: "EPLEFPA", uai: "0130015O",
    code_departement: "13", lat: 43.530, lng: 5.447,
    region: "Provence-Alpes-Côte d'Azur", departement: "Bouches-du-Rhône", statut: "public",
    effectifs_total: 350, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Cultures Méditerranéennes", "BTS Horticulture", "BPREA Arboriculture"],
    coordonnees: [43.530, 5.447]
  },
  {
    id: 16, nom: "MFR de Limoges-Isle", type: "MFR", uai: "0870016P",
    code_departement: "87", lat: 45.851, lng: 1.249,
    region: "Nouvelle-Aquitaine", departement: "Haute-Vienne", statut: "privé",
    effectifs_total: 130, taux_remplissage: 65, taux_insertion: 68,
    formations: ["CAPA Agriculture", "Bac Pro CGEA Élevage Bovin"],
    coordonnees: [45.851, 1.249]
  },
  {
    id: 17, nom: "EPLEFPA de Lille-Hénin", type: "EPLEFPA", uai: "0590017Q",
    code_departement: "59", lat: 50.422, lng: 2.964,
    region: "Hauts-de-France", departement: "Nord", statut: "public",
    effectifs_total: 445, taux_remplissage: 85, taux_insertion: 82,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTS Horticulture", "BTSA Agronomie"],
    coordonnees: [50.422, 2.964]
  },
  {
    id: 18, nom: "Lycée Agricole de Metz-Courcelles", type: "EPLEFPA", uai: "0570018R",
    code_departement: "57", lat: 49.115, lng: 6.177,
    region: "Grand Est", departement: "Moselle", statut: "public",
    effectifs_total: 300, taux_remplissage: 79, taux_insertion: 77,
    formations: ["Bac Pro CGEA", "BTS Agronomie", "BPREA Maraîchage"],
    coordonnees: [49.115, 6.177]
  },
  {
    id: 19, nom: "CFPPA de Nice-La Trinité", type: "CFPPA", uai: "0060019S",
    code_departement: "06", lat: 43.737, lng: 7.308,
    region: "Provence-Alpes-Côte d'Azur", departement: "Alpes-Maritimes", statut: "public",
    effectifs_total: 140, taux_remplissage: 72, taux_insertion: 74,
    formations: ["BPREA Floriculture", "CS Agriculture Méditerranéenne", "BP REA"],
    coordonnees: [43.737, 7.308]
  },
  {
    id: 20, nom: "Lycée Agricole de Grenoble-Poliénas", type: "EPLEFPA", uai: "0380020T",
    code_departement: "38", lat: 45.257, lng: 5.421,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "public",
    effectifs_total: 375, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Montagne", "BTS Productions Animales", "BTSA Agronomie Montagne"],
    coordonnees: [45.257, 5.421]
  },

  // ── CNEAP Pays de la Loire ──────────────────────────────────
  // Maine-et-Loire (49)
  {
    id: 21, nom: "Les Buissonnets", type: "CNEAP", uai: "0490021U",
    adresse: "41 avenue Maurice Mailfert, 49240 AVRILLÉ",
    code_departement: "49", lat: 47.505, lng: -0.599,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 320, taux_remplissage: 88, taux_insertion: 85,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Horticulture", "Bac Pro Aménagements Paysagers", "CS Jardins & Espaces Verts"],
    coordonnees: [47.505, -0.599]
  },
  {
    id: 22, nom: "Campus Pouillé", type: "CNEAP", uai: "0490022V",
    adresse: "29 route de Pouillé, 49130 Les Ponts de Cé",
    code_departement: "49", lat: 47.419, lng: -0.524,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 410, taux_remplissage: 91, taux_insertion: 87,
    formations: ["Bac Pro CGEA Viticulture", "BPREA Vigne & Vin", "BTS VitiEnologie", "CS Productions Végétales Spécialisées"],
    coordonnees: [47.419, -0.524]
  },
  {
    id: 23, nom: "Groupe ESA", type: "CNEAP", uai: "0490023W",
    adresse: "55 rue Rabelais, 49007 ANGERS Cedex 01",
    code_departement: "49", lat: 47.471, lng: -0.556,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 1850, taux_remplissage: 97, taux_insertion: 94,
    formations: ["Ingénieur Agronome (5 ans)", "Bachelor Agri-Management", "MS Agri-Conseil", "Licence Pro Agroalimentaire", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT009", consortium_id: "GAT002", consortium_label: "Consortium LEAP de Nermont / Groupe ESA", role: "membre" },
    coordonnees: [47.471, -0.556]
  },
  {
    id: 24, nom: "CFA Métiers de nos Territoires", type: "CFA", uai: "0490024X",
    adresse: "122 rue du Château d'Orgemont, 49000 Angers",
    code_departement: "49", lat: 47.478, lng: -0.551,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 280, taux_remplissage: 85, taux_insertion: 89,
    formations: ["CAP Agricole", "Bac Pro CGEA (apprentissage)", "BPREA (apprentissage)", "BTS ACSE (apprentissage)"],
    coordonnees: [47.478, -0.551]
  },
  {
    id: 25, nom: "Robert d'Arbrissel", type: "CNEAP", uai: "0490025Y",
    adresse: "8 place Urbain II, 49120 CHEMILLÉ",
    code_departement: "49", lat: 47.216, lng: -0.728,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 290, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA Plantes à Parfum Aromatiques Médicinales", "BPREA Plantes Aromatiques", "CS Herboristerie & Phytothérapie"],
    coordonnees: [47.216, -0.728]
  },
  {
    id: 26, nom: "Jeanne Delanoue", type: "CNEAP", uai: "0490026Z",
    adresse: "11 boulevard Jeanne d'Arc, 49304 CHOLET",
    code_departement: "49", lat: 47.061, lng: -0.879,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 340, taux_remplissage: 87, taux_insertion: 84,
    formations: ["Bac Pro CGEA Élevages", "Bac Pro Services Aux Personnes et Aux Territoires", "BPREA Bovins Lait"],
    coordonnees: [47.061, -0.879]
  },

  // Loire-Atlantique (44)
  {
    id: 27, nom: "Jean-Baptiste Ériau", type: "CNEAP", uai: "0440027A",
    adresse: "5 place de Béthune, 44150 ANCENIS",
    code_departement: "44", lat: 47.373, lng: -1.180,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 375, taux_remplissage: 89, taux_insertion: 86,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE", "CS Agriculture de Conservation"],
    coordonnees: [47.373, -1.180]
  },
  {
    id: 28, nom: "Briacé", type: "CNEAP", uai: "0440028B",
    adresse: "Route de Caen, 44430 LE LANDREAU",
    code_departement: "44", lat: 47.242, lng: -1.306,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 260, taux_remplissage: 93, taux_insertion: 90,
    formations: ["Bac Pro Vigne & Vin", "BPREA Viticulture Muscadet", "BTS VitiEnologie", "CS Vins & Spiritueux"],
    coordonnees: [47.242, -1.306]
  },
  {
    id: 29, nom: "Saint-Clair", type: "CNEAP", uai: "0440029C",
    adresse: "29 rue de Rennes, 44590 DERVAL",
    code_departement: "44", lat: 47.673, lng: -1.674,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 195, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA Élevages Bovins", "CAPA Productions Animales", "BPREA Bovins Viande"],
    coordonnees: [47.673, -1.674]
  },
  {
    id: 30, nom: "Charles Péguy", type: "CNEAP", uai: "0440030D",
    adresse: "3 rue de la Sèvre, 44190 GORGES",
    code_departement: "44", lat: 47.118, lng: -1.378,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 180, taux_remplissage: 78, taux_insertion: 77,
    formations: ["Bac Pro CGEA", "CAPA Agriculture", "Bac Pro SAPAT"],
    coordonnees: [47.118, -1.378]
  },
  {
    id: 31, nom: "Saint Gabriel Nantes-Océan", type: "CNEAP", uai: "0440031E",
    adresse: "Allée du Bois Tillac, 44640 LE PELLERIN",
    code_departement: "44", lat: 47.202, lng: -1.757,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 310, taux_remplissage: 86, taux_insertion: 83,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Maraîchage BIO", "CS Agriculture Littorale", "Bac Pro SAPAT"],
    coordonnees: [47.202, -1.757]
  },
  {
    id: 32, nom: "Saint-Joseph Châteaubriant", type: "CNEAP", uai: "0440032F",
    adresse: "13A rue de la Libération, 44141 CHÂTEAUBRIANT",
    code_departement: "44", lat: 47.720, lng: -1.375,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 230, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Conduite d'Élevage Bovin"],
    coordonnees: [47.720, -1.375]
  },
  {
    id: 33, nom: "Saint-Martin Machecoul", type: "CNEAP", uai: "0440033G",
    adresse: "4 Ter Avenue des Mésanges, 44270 MACHECOUL",
    code_departement: "44", lat: 46.996, lng: -1.829,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 210, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA", "CAPA Agriculture", "Bac Pro SAPAT"],
    coordonnees: [46.996, -1.829]
  },
  {
    id: 34, nom: "Lycée de l'Erdre", type: "CNEAP", uai: "0440034H",
    adresse: "13 rue du Général Leclerc, 44390 NORT-SUR-ERDRE",
    code_departement: "44", lat: 47.441, lng: -1.498,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 350, taux_remplissage: 88, taux_insertion: 85,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTS ACSE", "BPREA Productions Végétales", "CS Agroécologie"],
    coordonnees: [47.441, -1.498]
  },
  {
    id: 35, nom: "Saint-Molf (Kerguénec)", type: "CNEAP", uai: "0440035I",
    adresse: "Kerguénec, 44350 SAINT MOLF",
    code_departement: "44", lat: 47.490, lng: -2.291,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 155, taux_remplissage: 74, taux_insertion: 72,
    formations: ["CAPA Agriculture", "Bac Pro CGEA", "BPREA Élevages Côtiers"],
    coordonnees: [47.490, -2.291]
  },
  {
    id: 36, nom: "Gabriel Deshayes", type: "CNEAP", uai: "0440036J",
    adresse: "4 route de Redon, 44530 SAINT GILDAS DES BOIS",
    code_departement: "44", lat: 47.520, lng: -1.881,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 200, taux_remplissage: 79, taux_insertion: 77,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CAPA Agriculture"],
    coordonnees: [47.520, -1.881]
  },

  // Sarthe (72)
  {
    id: 37, nom: "Le Tertre Notre Dame", type: "CNEAP", uai: "0720037K",
    adresse: "10 rue du Tertre, 72400 La Ferté-Bernard",
    code_departement: "72", lat: 48.185, lng: 0.654,
    region: "Pays de la Loire", departement: "Sarthe", statut: "privé",
    effectifs_total: 245, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT", "CAPA Agriculture"],
    coordonnees: [48.185, 0.654]
  },
  {
    id: 38, nom: "Lycée Nazareth", type: "CNEAP", uai: "0720038L",
    adresse: "Rue de l'Abbé Dujarié, 72340 RUILLÉ-SUR-LOIR",
    code_departement: "72", lat: 47.802, lng: 0.375,
    region: "Pays de la Loire", departement: "Sarthe", statut: "privé",
    effectifs_total: 220, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CS Agriculture Durable"],
    coordonnees: [47.802, 0.375]
  },
  {
    id: 39, nom: "Val de Sarthe", type: "CNEAP", uai: "0720039M",
    adresse: "Route du Mans, 72300 Sablé-sur-Sarthe",
    code_departement: "72", lat: 47.838, lng: -0.338,
    region: "Pays de la Loire", departement: "Sarthe", statut: "privé",
    effectifs_total: 275, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Élevages Porcins", "BTS Productions Animales", "BPREA Bovins Lait", "CS Élevage Durable"],
    coordonnees: [47.838, -0.338]
  },

  // Mayenne (53)
  {
    id: 40, nom: "Rochefeuille", type: "CNEAP", uai: "0530040N",
    adresse: "Route de Caen, 53100 MAYENNE",
    code_departement: "53", lat: 48.301, lng: -0.617,
    region: "Pays de la Loire", departement: "Mayenne", statut: "privé",
    effectifs_total: 230, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "BTS Productions Animales"],
    coordonnees: [48.301, -0.617]
  },
  {
    id: 41, nom: "Campus Orion", type: "CNEAP", uai: "0530041O",
    adresse: "7 Bd du Maréchal Leclerc, 53600 EVRON",
    code_departement: "53", lat: 48.163, lng: -0.397,
    region: "Pays de la Loire", departement: "Mayenne", statut: "privé",
    effectifs_total: 310, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages Laitiers", "BPREA Bovins Lait", "CS Fromagerie & Produits Laitiers", "BTS Productions Animales"],
    coordonnees: [48.163, -0.397]
  },
  {
    id: 42, nom: "Robert Schuman", type: "CNEAP", uai: "0530042P",
    adresse: "5 rue Henri Dunant, 53200 CHÂTEAU-GONTIER",
    code_departement: "53", lat: 47.828, lng: -0.708,
    region: "Pays de la Loire", departement: "Mayenne", statut: "privé",
    effectifs_total: 265, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "Bac Pro SAPAT", "BPREA Bovins Lait", "CAPA Agriculture"],
    coordonnees: [47.828, -0.708]
  },

  // Vendée (85)
  {
    id: 43, nom: "Groupe Établières", type: "CNEAP", uai: "0850043Q",
    adresse: "Route De Nantes, 85015 La Roche-sur-Yon",
    code_departement: "85", lat: 46.671, lng: -1.430,
    region: "Pays de la Loire", departement: "Vendée", statut: "privé",
    effectifs_total: 580, taux_remplissage: 92, taux_insertion: 89,
    formations: ["Bac Pro CGEA Élevages", "Bac Pro SAPAT", "BPREA Bovins Viande", "BTS ACSE", "CS Agriculture Vendéenne"],
    coordonnees: [46.671, -1.430]
  },

  // === CNEAP Bretagne ===

  // Finistère (29)
  {
    id: 44, nom: "Ecole Le Nivot", type: "CNEAP", uai: "0290044R",
    adresse: "Le Nivot, 29590 Lopérec",
    code_departement: "29", lat: 48.265, lng: -4.085,
    region: "Bretagne", departement: "Finistère", statut: "privé",
    effectifs_total: 165, taux_remplissage: 81, taux_insertion: 83,
    formations: ["CAPA Agriculture", "BPREA Productions Végétales", "CS Maraîchage Biologique"],
    coordonnees: [48.265, -4.085]
  },
  {
    id: 45, nom: "Lycée Kerbernez", type: "CNEAP", uai: "0290045S",
    adresse: "Route de Quimper, 29700 Plomelin",
    code_departement: "29", lat: 47.966, lng: -4.142,
    region: "Bretagne", departement: "Finistère", statut: "privé",
    effectifs_total: 380, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Productions Végétales", "BTS Horticulture", "CS Agriculture BIO"],
    coordonnees: [47.966, -4.142]
  },
  {
    id: 46, nom: "Lycée Kerustum", type: "CNEAP", uai: "0290046T",
    adresse: "Kerustum, 29000 Quimper",
    code_departement: "29", lat: 47.995, lng: -4.107,
    region: "Bretagne", departement: "Finistère", statut: "privé",
    effectifs_total: 290, taux_remplissage: 85, taux_insertion: 84,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Productions Végétales", "CS Légumes Plein Champ"],
    coordonnees: [47.995, -4.107]
  },
  {
    id: 47, nom: "Lycée du Cleusmeur", type: "CNEAP", uai: "0290047U",
    adresse: "Cleusmeur, 29260 Lesneven",
    code_departement: "29", lat: 48.574, lng: -4.326,
    region: "Bretagne", departement: "Finistère", statut: "privé",
    effectifs_total: 210, taux_remplissage: 80, taux_insertion: 82,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [48.574, -4.326]
  },
  {
    id: 48, nom: "Lycée Sainte-Marie", type: "CNEAP", uai: "0290048V",
    adresse: "Route de Morlaix, 29610 Plouigneau",
    code_departement: "29", lat: 48.516, lng: -3.615,
    region: "Bretagne", departement: "Finistère", statut: "privé",
    effectifs_total: 240, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.516, -3.615]
  },

  // Côtes-d'Armor (22)
  {
    id: 49, nom: "Ecole Saint Ilan", type: "CNEAP", uai: "0220049W",
    adresse: "Saint Ilan, 22360 Langueux",
    code_departement: "22", lat: 48.496, lng: -2.680,
    region: "Bretagne", departement: "Côtes-d'Armor", statut: "privé",
    effectifs_total: 180, taux_remplissage: 79, taux_insertion: 81,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.496, -2.680]
  },
  {
    id: 50, nom: "Lycée Dominique Savio – Cordeliers", type: "CNEAP", uai: "0220050X",
    adresse: "Rue des Cordeliers, 22100 Dinan",
    code_departement: "22", lat: 48.456, lng: -2.044,
    region: "Bretagne", departement: "Côtes-d'Armor", statut: "privé",
    effectifs_total: 320, taux_remplissage: 86, taux_insertion: 85,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT", "CS Conduite d'Élevage"],
    coordonnees: [48.456, -2.044]
  },
  {
    id: 51, nom: "Lycée La Ville Davy", type: "CNEAP", uai: "0220051Y",
    adresse: "La Ville Davy, 22120 Quessoy",
    code_departement: "22", lat: 48.354, lng: -2.635,
    region: "Bretagne", departement: "Côtes-d'Armor", statut: "privé",
    effectifs_total: 275, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Élevage Durable"],
    coordonnees: [48.354, -2.635]
  },
  {
    id: 52, nom: "Lycée Pommerit", type: "CNEAP", uai: "0220052Z",
    adresse: "22450 La Roche-Jaudy",
    code_departement: "22", lat: 48.723, lng: -3.213,
    region: "Bretagne", departement: "Côtes-d'Armor", statut: "privé",
    effectifs_total: 230, taux_remplissage: 80, taux_insertion: 79,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.723, -3.213]
  },
  {
    id: 53, nom: "Lycée du Restmeur", type: "CNEAP", uai: "0220053A",
    adresse: "Restmeur, 22200 Pabu",
    code_departement: "22", lat: 48.600, lng: -3.139,
    region: "Bretagne", departement: "Côtes-d'Armor", statut: "privé",
    effectifs_total: 195, taux_remplissage: 77, taux_insertion: 78,
    formations: ["Bac Pro CGEA", "BPREA Bovins Lait", "CS Agriculture Littorale"],
    coordonnees: [48.600, -3.139]
  },
  {
    id: 54, nom: "Lycée Xavier Grall", type: "CNEAP", uai: "0220054B",
    adresse: "Route de Saint-Brieuc, 22600 Loudéac",
    code_departement: "22", lat: 48.177, lng: -2.751,
    region: "Bretagne", departement: "Côtes-d'Armor", statut: "privé",
    effectifs_total: 350, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "BTS Productions Animales", "CS Élevage Porcin"],
    coordonnees: [48.177, -2.751]
  },

  // Morbihan (56)
  {
    id: 55, nom: "Lycée Anne de Bretagne", type: "CNEAP", uai: "0560055C",
    adresse: "Route de Vannes, 56500 Locminé",
    code_departement: "56", lat: 47.886, lng: -2.842,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 310, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "BTS Productions Animales", "Bac Pro SAPAT"],
    coordonnees: [47.886, -2.842]
  },
  {
    id: 56, nom: "Lycée Jean Queinnec", type: "CNEAP", uai: "0560056D",
    adresse: "Route de Ploërmel, 56140 Malestroit",
    code_departement: "56", lat: 47.808, lng: -2.388,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 260, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Conduite d'Élevage"],
    coordonnees: [47.808, -2.388]
  },
  {
    id: 57, nom: "Lycée Ker Anna", type: "CNEAP", uai: "0560057E",
    adresse: "Ker Anna, 56700 Kervignac",
    code_departement: "56", lat: 47.762, lng: -3.178,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 225, taux_remplissage: 81, taux_insertion: 80,
    formations: ["Bac Pro CGEA", "BPREA Bovins Lait", "CS Littoral & Aquaculture"],
    coordonnees: [47.762, -3.178]
  },
  {
    id: 58, nom: "Lycée Kerlebost", type: "CNEAP", uai: "0560058F",
    adresse: "Kerlebost, 56300 Pontivy",
    code_departement: "56", lat: 47.999, lng: -2.959,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 340, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "BTS Productions Animales"],
    coordonnees: [47.999, -2.959]
  },
  {
    id: 59, nom: "Lycée Kerplouz-LaSalle", type: "CNEAP", uai: "0560059G",
    adresse: "Kerplouz, 56400 Auray",
    code_departement: "56", lat: 47.664, lng: -2.988,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 420, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA", "BPREA", "BTS ACSE", "CS Agroécologie", "Bac Pro SAPAT"],
    coordonnees: [47.664, -2.988]
  },
  {
    id: 60, nom: "Lycée La Touche", type: "CNEAP", uai: "0560060H",
    adresse: "La Touche, 56800 Ploërmel",
    code_departement: "56", lat: 47.932, lng: -2.398,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 280, taux_remplissage: 84, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [47.932, -2.398]
  },
  {
    id: 61, nom: "Lycée Saint-Yves (Gourin)", type: "CNEAP", uai: "0560061I",
    adresse: "Route de Brest, 56110 Gourin",
    code_departement: "56", lat: 48.143, lng: -3.600,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 195, taux_remplissage: 79, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "CS Élevage Montagne"],
    coordonnees: [48.143, -3.600]
  },

  // Ille-et-Vilaine (35)
  {
    id: 62, nom: "Lycée Antoine de Saint-Exupéry – The Land", type: "CNEAP", uai: "0350062J",
    adresse: "Rennes / Vitré / La Guerche-de-Bretagne, 35000 Rennes",
    code_departement: "35", lat: 48.117, lng: -1.680,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 510, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA", "BPREA", "BTS ACSE", "CS Agroécologie", "Bac Pro SAPAT (apprentissage)"],
    coordonnees: [48.117, -1.680]
  },
  {
    id: 63, nom: "Lycée ISSAT", type: "CNEAP", uai: "0350063K",
    adresse: "Route de Saint-Nicolas, 35600 Redon",
    code_departement: "35", lat: 47.651, lng: -2.084,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 290, taux_remplissage: 85, taux_insertion: 84,
    formations: ["Bac Pro CGEA", "BPREA", "CS Industries Agroalimentaires", "BTS Agroalimentaire"],
    coordonnees: [47.651, -2.084]
  },
  {
    id: 64, nom: "Lycée JB Le Taillandier", type: "CNEAP", uai: "0350064L",
    adresse: "Fougères / Saint-Aubin-du-Cormier, 35300 Fougères",
    code_departement: "35", lat: 48.351, lng: -1.201,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 380, taux_remplissage: 87, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "BTS Productions Animales", "Bac Pro SAPAT"],
    coordonnees: [48.351, -1.201]
  },
  {
    id: 65, nom: "Lycée Jeanne Jugan", type: "CNEAP", uai: "0350065M",
    adresse: "Route de Rennes, 35190 Tinténiac",
    code_departement: "35", lat: 48.327, lng: -1.836,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 245, taux_remplissage: 82, taux_insertion: 81,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.327, -1.836]
  },
  {
    id: 66, nom: "Lycée Les Vergers", type: "CNEAP", uai: "0350066N",
    adresse: "Les Vergers, 35120 Dol-de-Bretagne",
    code_departement: "35", lat: 48.553, lng: -1.752,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 220, taux_remplissage: 80, taux_insertion: 80,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "CS Maraîchage & Jardins"],
    coordonnees: [48.553, -1.752]
  },
  {
    id: 67, nom: "Lycée Saint-Nicolas-la-Providence", type: "CNEAP", uai: "0350067O",
    adresse: "Route de Montauban, 35360 Montauban-de-Bretagne",
    code_departement: "35", lat: 48.199, lng: -2.043,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 265, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.199, -2.043]
  },
  {
    id: 68, nom: "Lycée Saint-Yves (Bain-de-Bretagne)", type: "CNEAP", uai: "0350068P",
    adresse: "Route de Rennes, 35470 Bain-de-Bretagne",
    code_departement: "35", lat: 47.847, lng: -1.683,
    region: "Bretagne", departement: "Ille-et-Vilaine", statut: "privé",
    effectifs_total: 230, taux_remplissage: 81, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages", "BPREA", "CS Productions Animales"],
    coordonnees: [47.847, -1.683]
  },

  // === CNEAP Centre-Val de Loire ===

  // Cher (18)
  {
    id: 69, nom: "LEAP Bengy-sur-Craon", type: "CNEAP", uai: "0180069Q",
    adresse: "Route de Bourges, 18520 Bengy-sur-Craon",
    code_departement: "18", lat: 47.013, lng: 2.952,
    region: "Centre-Val de Loire", departement: "Cher", statut: "privé",
    effectifs_total: 185, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages Ovins", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [47.013, 2.952]
  },

  // Eure-et-Loir (28)
  {
    id: 70, nom: "Campus Franz Stock", type: "CNEAP", uai: "0280070R",
    adresse: "Route de Maintenon, 28000 Chartres",
    code_departement: "28", lat: 48.421, lng: 1.503,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 340, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CS Agriculture de Conservation", "BTS ACSE"],
    coordonnees: [48.421, 1.503]
  },
  {
    id: 71, nom: "LEAP de Nermont", type: "CNEAP", uai: "0280071S",
    adresse: "Nermont, 28410 Châteauneuf-en-Thymerais",
    code_departement: "28", lat: 48.584, lng: 1.232,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 220, taux_remplissage: 80, taux_insertion: 79,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CAPA Agriculture", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT009", consortium_id: "GAT002", consortium_label: "Consortium LEAP de Nermont / Groupe ESA", role: "chef_file" },
    coordonnees: [48.584, 1.232]
  },
  {
    id: 72, nom: "LEAP de Nermont (site du Perche)", type: "CNEAP", uai: "0280072T",
    adresse: "Site du Perche, 28400 Nogent-le-Rotrou",
    code_departement: "28", lat: 48.322, lng: 0.822,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 95, taux_remplissage: 74, taux_insertion: 77,
    formations: ["Bac Pro CGEA Élevages", "Bac Pro Forêt", "CAPA Agriculture"],
    coordonnees: [48.322, 0.822]
  },
  {
    id: 73, nom: "LEAP Boissay", type: "CNEAP", uai: "0280073U",
    adresse: "Boissay, 28800 Bonneval",
    code_departement: "28", lat: 48.019, lng: 1.389,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 165, taux_remplissage: 78, taux_insertion: 77,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Productions Végétales", "CS Maraîchage Biologique"],
    coordonnees: [48.019, 1.389]
  },

  // Indre (36)
  {
    id: 74, nom: "LEAP Saint-Cyran", type: "CNEAP", uai: "0360074V",
    adresse: "Saint-Cyran-du-Jambot, 36700 Villedieu-sur-Indre",
    code_departement: "36", lat: 47.008, lng: 1.474,
    region: "Centre-Val de Loire", departement: "Indre", statut: "privé",
    effectifs_total: 175, taux_remplissage: 79, taux_insertion: 78,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Viande", "CS Conduite d'Élevage"],
    coordonnees: [47.008, 1.474]
  },

  // Loir-et-Cher (41)
  {
    id: 75, nom: "Lycée Professionnel Privé Gabriel Bridet", type: "CNEAP", uai: "0410075W",
    adresse: "Route de Selles, 41200 Romorantin-Lanthenay",
    code_departement: "41", lat: 47.360, lng: 1.746,
    region: "Centre-Val de Loire", departement: "Loir-et-Cher", statut: "privé",
    effectifs_total: 260, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Vigne & Vin", "BPREA Viticulture Touraine", "Bac Pro SAPAT", "CS Œnologie Appliquée"],
    coordonnees: [47.360, 1.746]
  },
  {
    id: 76, nom: "LEAP Sainte-Cécile", type: "CNEAP", uai: "0410076X",
    adresse: "Sainte-Cécile, 41350 Huisseau-en-Beauce",
    code_departement: "41", lat: 47.846, lng: 1.438,
    region: "Centre-Val de Loire", departement: "Loir-et-Cher", statut: "privé",
    effectifs_total: 140, taux_remplissage: 75, taux_insertion: 76,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CAPA Agriculture"],
    coordonnees: [47.846, 1.438]
  },

  // ============================================================
  // === Bachelor Agro — Mention GAT (Génie agronomique et transitions) ===
  // ============================================================

  // Consortium Institut de Genech / JUNIA — Nord (59)
  {
    id: 77, nom: "Institut de Genech", type: "CNEAP", uai: "0590077A",
    adresse: "Route de Lille, 59242 Genech",
    code_departement: "59", lat: 50.392, lng: 3.192,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 520, taux_remplissage: 91, taux_insertion: 89,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTSA Agronomie Agroécologie", "BTS Productions Animales", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT001", consortium_id: "GAT001", consortium_label: "Consortium Institut de Genech / JUNIA", role: "chef_file" },
    coordonnees: [50.392, 3.192]
  },

  // Consortium ISETA-ECA Poisy / ISARA — Haute-Savoie (74)
  {
    id: 78, nom: "ISETA-ECA Poisy", type: "CNEAP", uai: "0740078B",
    adresse: "Allée des Tilleuls, 74330 Poisy",
    code_departement: "74", lat: 45.921, lng: 6.074,
    region: "Auvergne-Rhône-Alpes", departement: "Haute-Savoie", statut: "privé",
    effectifs_total: 480, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Élevages Montagne", "BTSA Agronomie Montagne", "CS Agriculture de Montagne", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT002", consortium_id: "GAT003", consortium_label: "Consortium ISETA-ECA Poisy / ISARA", role: "chef_file" },
    coordonnees: [45.921, 6.074]
  },
  {
    id: 79, nom: "EPLEFPA La Motte-Servolex", type: "EPLEFPA", uai: "0730079C",
    code_departement: "73", lat: 45.589, lng: 5.873,
    region: "Auvergne-Rhône-Alpes", departement: "Savoie", statut: "public",
    effectifs_total: 310, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BTS Productions Animales", "BPREA Montagne", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT003", consortium_id: "GAT003", consortium_label: "Consortium ISETA-ECA Poisy / ISARA", role: "membre" },
    coordonnees: [45.589, 5.873]
  },

  // ============================================================
  // === Bachelor Agro — Mention EAMA (Entreprendre, accompagner, manager) ===
  // ============================================================

  // Consortium Jean Errecart / PURPAN — multisites (64 / 81 / 31 / 32 / 12)
  {
    id: 80, nom: "Institut Jean Errecart", type: "CNEAP", uai: "0640080D",
    adresse: "71 rue des Docteurs Bachelet, 64120 Saint-Palais",
    code_departement: "64", lat: 43.324, lng: -1.030,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 350, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Allaitants", "BTS Productions Animales", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA001", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "chef_file" },
    coordonnees: [43.324, -1.030]
  },
  {
    id: 81, nom: "École Supérieure La Raque", type: "CNEAP", uai: "0640081E",
    adresse: "La Raque, 64270 Lagor",
    code_departement: "64", lat: 43.493, lng: -0.657,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 290, taux_remplissage: 85, taux_insertion: 84,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Viticulture & Maïs", "CS Agriculture de Béarn", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA002", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [43.493, -0.657]
  },
  {
    id: 82, nom: "Lycée de Touscayrats", type: "CNEAP", uai: "0810082F",
    adresse: "Route de Sorèze, 81540 Verdalle",
    code_departement: "81", lat: 43.519, lng: 2.271,
    region: "Occitanie", departement: "Tarn", statut: "privé",
    effectifs_total: 260, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BPREA Élevages Pyrénéens", "CS Élevage Ovin", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA003", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [43.519, 2.271]
  },
  {
    id: 83, nom: "Campus St François La Cadène", type: "CNEAP", uai: "0310083G",
    adresse: "Avenue de l'Europe, 31670 Labège",
    code_departement: "31", lat: 43.561, lng: 1.534,
    region: "Occitanie", departement: "Haute-Garonne", statut: "privé",
    effectifs_total: 420, taux_remplissage: 89, taux_insertion: 87,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Productions Légumières", "BTS Horticulture", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA004", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [43.561, 1.534]
  },
  {
    id: 84, nom: "Campus La Salle St Christophe", type: "CNEAP", uai: "0320084H",
    adresse: "Route de Tarbes, 32140 Masseube",
    code_departement: "32", lat: 43.431, lng: 0.594,
    region: "Occitanie", departement: "Gers", statut: "privé",
    effectifs_total: 230, taux_remplissage: 82, taux_insertion: 81,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Allaitants", "CS Filière Foie Gras", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA005", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [43.431, 0.594]
  },
  {
    id: 85, nom: "Lycée St Christophe St Pée", type: "CNEAP", uai: "0640085I",
    adresse: "Route d'Ascain, 64310 Saint-Pée-sur-Nivelle",
    code_departement: "64", lat: 43.371, lng: -1.601,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 310, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Élevages Basques", "BPREA Bovins Lait Montagne Basque", "CS Fromage AOP Ossau-Iraty", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA006", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [43.371, -1.601]
  },
  {
    id: 86, nom: "Lycée François Marty", type: "CNEAP", uai: "0120086J",
    adresse: "Route de Milhau, 12200 Monteils",
    code_departement: "12", lat: 44.283, lng: 2.351,
    region: "Occitanie", departement: "Aveyron", statut: "privé",
    effectifs_total: 275, taux_remplissage: 84, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages Ovins Lait", "BPREA Ovins Lait Roquefort", "CS Fromage AOP Roquefort", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA007", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [44.283, 2.351]
  },
  {
    id: 87, nom: "MFR de Brens", type: "MFR", uai: "0810087K",
    adresse: "Route de Gaillac, 81600 Brens",
    code_departement: "81", lat: 43.896, lng: 1.808,
    region: "Occitanie", departement: "Tarn", statut: "privé",
    effectifs_total: 165, taux_remplissage: 78, taux_insertion: 80,
    formations: ["CAPA Agriculture", "Bac Pro CGEA", "BPREA Viticulture Gaillac", "Bachelor Agro EAMA"],
    bachelor_agro: { mention: "EAMA", mention_label: "Entreprendre, accompagner, manager en agriculture", code: "2026BAEAMA008", consortium_id: "EAMA001", consortium_label: "Consortium Jean Errecart / PURPAN", role: "membre" },
    coordonnees: [43.896, 1.808]
  },

  // ============================================================
  // === Bachelor Agro — Mention AAD (Alimentation et Agroalimentaire durables) ===
  // ============================================================

  // Consortium ISNAB / BSA — Gironde (33)
  {
    id: 88, nom: "ISNAB", type: "CNEAP", uai: "0330088L",
    adresse: "1 cours du Général de Gaulle, 33170 Gradignan",
    code_departement: "33", lat: 44.804, lng: -0.609,
    region: "Nouvelle-Aquitaine", departement: "Gironde", statut: "privé",
    effectifs_total: 380, taux_remplissage: 88, taux_insertion: 90,
    formations: ["BTS Agroalimentaire", "BTSA Qualité Sécurité Alimentaire", "CS Brasserie Artisanale", "Bachelor Agro AAD"],
    bachelor_agro: { mention: "AAD", mention_label: "Alimentation et Agroalimentaire durables", code: "2026BAAAD001", consortium_id: "AAD001", consortium_label: "Consortium ISNAB / BSA", role: "chef_file" },
    coordonnees: [44.804, -0.609]
  }
];

// Indicateurs territoriaux par département (code INSEE)
export const indicateurs = {
  "33": {
    nom: "Gironde", region: "Nouvelle-Aquitaine",
    population: 1625000, evolution_pop_10ans: 9.2,
    sau_ha: 587000, nb_exploitations: 8200, evolution_exploitations: -4.1,
    part_exploitants_55plus: 41, emplois_agricoles: 18500, evolution_emplois: -2.8,
    part_bio: 12.4, taux_chomage: 8.1, score_attractivite: 74,
    indice_dynamisme: 68, indice_tension_emploi: 55, indice_vieillissement: 41,
    metiers_tension: ["Viticulteur", "Maraîcher BIO", "Technicien viticole"],
    filieres_dev: ["Viticulture biologique", "Agritourisme", "Permaculture"],
    filieres_declin: ["Grandes cultures céréalières"],
    projection_pop_2035: 1780000, score_vulnerabilite: 4
  },
  "24": {
    nom: "Dordogne", region: "Nouvelle-Aquitaine",
    population: 410000, evolution_pop_10ans: -1.8,
    sau_ha: 330000, nb_exploitations: 5600, evolution_exploitations: -8.2,
    part_exploitants_55plus: 58, emplois_agricoles: 8200, evolution_emplois: -6.3,
    part_bio: 8.1, taux_chomage: 10.4, score_attractivite: 48,
    indice_dynamisme: 38, indice_tension_emploi: 42, indice_vieillissement: 58,
    metiers_tension: ["Éleveur bovin", "Sylviculteur", "Maraîcher"],
    filieres_dev: ["Agriculture biologique", "Agroforesterie", "Filière truffe"],
    filieres_declin: ["Tabac", "Bovins lait conventionnel"],
    projection_pop_2035: 385000, score_vulnerabilite: 7
  },
  "34": {
    nom: "Hérault", region: "Occitanie",
    population: 1175000, evolution_pop_10ans: 11.4,
    sau_ha: 280000, nb_exploitations: 9800, evolution_exploitations: -3.5,
    part_exploitants_55plus: 47, emplois_agricoles: 22000, evolution_emplois: 1.2,
    part_bio: 19.8, taux_chomage: 11.2, score_attractivite: 71,
    indice_dynamisme: 62, indice_tension_emploi: 65, indice_vieillissement: 47,
    metiers_tension: ["Vigneron BIO", "Maraîcher", "Horticulteur"],
    filieres_dev: ["Viticulture biologique", "Maraîchage méditerranéen", "Aromates"],
    filieres_declin: ["Viticulture conventionnelle"],
    projection_pop_2035: 1320000, score_vulnerabilite: 5
  },
  "31": {
    nom: "Haute-Garonne", region: "Occitanie",
    population: 1390000, evolution_pop_10ans: 13.1,
    sau_ha: 350000, nb_exploitations: 7200, evolution_exploitations: -5.8,
    part_exploitants_55plus: 49, emplois_agricoles: 14500, evolution_emplois: -1.5,
    part_bio: 10.2, taux_chomage: 8.7, score_attractivite: 78,
    indice_dynamisme: 59, indice_tension_emploi: 61, indice_vieillissement: 49,
    metiers_tension: ["Maraîcher", "Agronome conseil", "Technicien agricole"],
    filieres_dev: ["Agriculture péri-urbaine", "Circuits courts", "Grandes cultures durables"],
    filieres_declin: ["Bovins lait"],
    projection_pop_2035: 1580000, score_vulnerabilite: 4
  },
  "76": {
    nom: "Seine-Maritime", region: "Normandie",
    population: 1254000, evolution_pop_10ans: -0.8,
    sau_ha: 635000, nb_exploitations: 5900, evolution_exploitations: -9.1,
    part_exploitants_55plus: 54, emplois_agricoles: 12800, evolution_emplois: -5.1,
    part_bio: 5.3, taux_chomage: 9.8, score_attractivite: 52,
    indice_dynamisme: 41, indice_tension_emploi: 48, indice_vieillissement: 54,
    metiers_tension: ["Éleveur laitier", "Céréaliculteur"],
    filieres_dev: ["Bio conversion", "Élevage en plein air", "Légumes de plein champ"],
    filieres_declin: ["Bovins lait conventionnel", "Tabac"],
    projection_pop_2035: 1225000, score_vulnerabilite: 6
  },
  "14": {
    nom: "Calvados", region: "Normandie",
    population: 695000, evolution_pop_10ans: 1.2,
    sau_ha: 582000, nb_exploitations: 5200, evolution_exploitations: -7.3,
    part_exploitants_55plus: 52, emplois_agricoles: 11200, evolution_emplois: -4.2,
    part_bio: 6.8, taux_chomage: 8.9, score_attractivite: 57,
    indice_dynamisme: 45, indice_tension_emploi: 50, indice_vieillissement: 52,
    metiers_tension: ["Fromager", "Éleveur laitier", "Arboriculteur cidricole"],
    filieres_dev: ["Cidre/Calvados AOP", "Agriculture biologique", "Agritourisme"],
    filieres_declin: ["Bovins conventionnel"],
    projection_pop_2035: 710000, score_vulnerabilite: 5
  },
  "69": {
    nom: "Rhône", region: "Auvergne-Rhône-Alpes",
    population: 1870000, evolution_pop_10ans: 7.4,
    sau_ha: 98000, nb_exploitations: 4100, evolution_exploitations: -6.2,
    part_exploitants_55plus: 46, emplois_agricoles: 8900, evolution_emplois: -1.8,
    part_bio: 14.7, taux_chomage: 8.3, score_attractivite: 82,
    indice_dynamisme: 55, indice_tension_emploi: 70, indice_vieillissement: 46,
    metiers_tension: ["Maraîcher", "Jardinier paysagiste", "Horticulteur"],
    filieres_dev: ["Agriculture urbaine", "Maraîchage BIO", "Espaces verts"],
    filieres_declin: ["Grandes cultures"],
    projection_pop_2035: 2050000, score_vulnerabilite: 3
  },
  "35": {
    nom: "Ille-et-Vilaine", region: "Bretagne",
    population: 1060000, evolution_pop_10ans: 6.8,
    sau_ha: 620000, nb_exploitations: 8900, evolution_exploitations: -3.9,
    part_exploitants_55plus: 44, emplois_agricoles: 25000, evolution_emplois: 0.5,
    part_bio: 9.4, taux_chomage: 7.2, score_attractivite: 73,
    indice_dynamisme: 65, indice_tension_emploi: 68, indice_vieillissement: 44,
    metiers_tension: ["Éleveur porc", "Éleveur volaille", "Technicien agricole"],
    filieres_dev: ["Élevage BIO", "Circuits courts", "Agro-alimentaire"],
    filieres_declin: ["Élevage conventionnel intensif"],
    projection_pop_2035: 1150000, score_vulnerabilite: 3
  },
  "29": {
    nom: "Finistère", region: "Bretagne",
    population: 907000, evolution_pop_10ans: 0.9,
    sau_ha: 475000, nb_exploitations: 7200, evolution_exploitations: -5.4,
    part_exploitants_55plus: 48, emplois_agricoles: 17500, evolution_emplois: -2.1,
    part_bio: 8.7, taux_chomage: 8.4, score_attractivite: 60,
    indice_dynamisme: 54, indice_tension_emploi: 59, indice_vieillissement: 48,
    metiers_tension: ["Légumier plein champ", "Maraîcher sous serre", "Aquaculteur"],
    filieres_dev: ["Légumes BIO", "Algues", "Agriculture côtière"],
    filieres_declin: ["Porc conventionnel"],
    projection_pop_2035: 895000, score_vulnerabilite: 4
  },
  "21": {
    nom: "Côte-d'Or", region: "Bourgogne-Franche-Comté",
    population: 530000, evolution_pop_10ans: 0.4,
    sau_ha: 327000, nb_exploitations: 4800, evolution_exploitations: -7.1,
    part_exploitants_55plus: 53, emplois_agricoles: 9800, evolution_emplois: -3.5,
    part_bio: 11.2, taux_chomage: 8.9, score_attractivite: 61,
    indice_dynamisme: 50, indice_tension_emploi: 54, indice_vieillissement: 53,
    metiers_tension: ["Vigneron", "Technicien viticole", "Sommelier"],
    filieres_dev: ["Viticulture BIO", "Oenotourisme", "Grande culture durable"],
    filieres_declin: ["Élevage bovin lait"],
    projection_pop_2035: 525000, score_vulnerabilite: 5
  },
  "63": {
    nom: "Puy-de-Dôme", region: "Auvergne-Rhône-Alpes",
    population: 650000, evolution_pop_10ans: 1.8,
    sau_ha: 390000, nb_exploitations: 5900, evolution_exploitations: -6.8,
    part_exploitants_55plus: 55, emplois_agricoles: 11200, evolution_emplois: -4.4,
    part_bio: 9.8, taux_chomage: 9.3, score_attractivite: 54,
    indice_dynamisme: 43, indice_tension_emploi: 46, indice_vieillissement: 55,
    metiers_tension: ["Éleveur bovin allaitant", "Fromager AOP"],
    filieres_dev: ["Fromagerie AOP", "Agriculture de montagne", "Bio"],
    filieres_declin: ["Élevage intensif"],
    projection_pop_2035: 640000, score_vulnerabilite: 6
  },
  "67": {
    nom: "Bas-Rhin", region: "Grand Est",
    population: 1125000, evolution_pop_10ans: 2.1,
    sau_ha: 285000, nb_exploitations: 5200, evolution_exploitations: -5.3,
    part_exploitants_55plus: 47, emplois_agricoles: 11500, evolution_emplois: -2.7,
    part_bio: 13.6, taux_chomage: 7.8, score_attractivite: 69,
    indice_dynamisme: 58, indice_tension_emploi: 62, indice_vieillissement: 47,
    metiers_tension: ["Vigneron Alsace", "Maraîcher", "Technicien arboricole"],
    filieres_dev: ["Viticulture BIO Alsace", "Maraîchage", "Agroforesterie"],
    filieres_declin: ["Grandes cultures conventionnelles"],
    projection_pop_2035: 1150000, score_vulnerabilite: 4
  },
  "44": {
    nom: "Loire-Atlantique", region: "Pays de la Loire",
    population: 1430000, evolution_pop_10ans: 9.7,
    sau_ha: 645000, nb_exploitations: 9600, evolution_exploitations: -3.2,
    part_exploitants_55plus: 43, emplois_agricoles: 21500, evolution_emplois: 1.8,
    part_bio: 11.3, taux_chomage: 7.4, score_attractivite: 79,
    indice_dynamisme: 72, indice_tension_emploi: 71, indice_vieillissement: 43,
    metiers_tension: ["Maraîcher BIO", "Vigneron Muscadet", "Éleveur volaille"],
    filieres_dev: ["Maraîchage BIO", "Muscadet AOP", "Circuits courts"],
    filieres_declin: ["Grandes cultures céréalières"],
    projection_pop_2035: 1610000, score_vulnerabilite: 2
  },
  "86": {
    nom: "Vienne", region: "Nouvelle-Aquitaine",
    population: 435000, evolution_pop_10ans: -0.3,
    sau_ha: 435000, nb_exploitations: 4900, evolution_exploitations: -9.5,
    part_exploitants_55plus: 57, emplois_agricoles: 9600, evolution_emplois: -5.8,
    part_bio: 7.1, taux_chomage: 10.1, score_attractivite: 47,
    indice_dynamisme: 36, indice_tension_emploi: 41, indice_vieillissement: 57,
    metiers_tension: ["Éleveur", "Céréaliculteur", "Maraîcher"],
    filieres_dev: ["Grandes cultures durables", "Agriculture de conservation"],
    filieres_declin: ["Élevage bovin conventionnel"],
    projection_pop_2035: 420000, score_vulnerabilite: 7
  },
  "13": {
    nom: "Bouches-du-Rhône", region: "Provence-Alpes-Côte d'Azur",
    population: 2025000, evolution_pop_10ans: 2.3,
    sau_ha: 136000, nb_exploitations: 5800, evolution_exploitations: -4.8,
    part_exploitants_55plus: 50, emplois_agricoles: 14200, evolution_emplois: -1.2,
    part_bio: 17.3, taux_chomage: 13.1, score_attractivite: 65,
    indice_dynamisme: 56, indice_tension_emploi: 69, indice_vieillissement: 50,
    metiers_tension: ["Maraîcher sous serre", "Oléiculteur", "Arboriculteur"],
    filieres_dev: ["Oliviculture AOP", "Maraîchage BIO", "Agritourisme"],
    filieres_declin: ["Grandes cultures"],
    projection_pop_2035: 2100000, score_vulnerabilite: 5
  },
  "87": {
    nom: "Haute-Vienne", region: "Nouvelle-Aquitaine",
    population: 370000, evolution_pop_10ans: -2.1,
    sau_ha: 295000, nb_exploitations: 4100, evolution_exploitations: -10.2,
    part_exploitants_55plus: 61, emplois_agricoles: 7200, evolution_emplois: -7.1,
    part_bio: 8.5, taux_chomage: 10.8, score_attractivite: 42,
    indice_dynamisme: 32, indice_tension_emploi: 38, indice_vieillissement: 61,
    metiers_tension: ["Éleveur bovin allaitant", "Éleveur ovin"],
    filieres_dev: ["Bio conversion bovins", "Agroforesterie", "Éco-pâturage"],
    filieres_declin: ["Élevage conventionnel intensif", "Céréales"],
    projection_pop_2035: 352000, score_vulnerabilite: 8
  },
  "59": {
    nom: "Nord", region: "Hauts-de-France",
    population: 2610000, evolution_pop_10ans: 0.5,
    sau_ha: 583000, nb_exploitations: 4900, evolution_exploitations: -8.4,
    part_exploitants_55plus: 50, emplois_agricoles: 13500, evolution_emplois: -3.9,
    part_bio: 4.2, taux_chomage: 11.5, score_attractivite: 51,
    indice_dynamisme: 44, indice_tension_emploi: 52, indice_vieillissement: 50,
    metiers_tension: ["Maraîcher", "Technicien agricole", "Agronome"],
    filieres_dev: ["Légumes de plein champ", "Betterave bio", "Agriculture urbaine"],
    filieres_declin: ["Grandes cultures conventionnelles"],
    projection_pop_2035: 2570000, score_vulnerabilite: 6
  },
  "57": {
    nom: "Moselle", region: "Grand Est",
    population: 1042000, evolution_pop_10ans: -0.7,
    sau_ha: 396000, nb_exploitations: 3800, evolution_exploitations: -7.8,
    part_exploitants_55plus: 52, emplois_agricoles: 8200, evolution_emplois: -4.5,
    part_bio: 5.9, taux_chomage: 9.6, score_attractivite: 50,
    indice_dynamisme: 42, indice_tension_emploi: 47, indice_vieillissement: 52,
    metiers_tension: ["Éleveur", "Céréaliculteur"],
    filieres_dev: ["Grandes cultures durables", "Bio"],
    filieres_declin: ["Élevage conventionnel"],
    projection_pop_2035: 1020000, score_vulnerabilite: 6
  },
  "06": {
    nom: "Alpes-Maritimes", region: "Provence-Alpes-Côte d'Azur",
    population: 1084000, evolution_pop_10ans: 1.7,
    sau_ha: 27000, nb_exploitations: 2100, evolution_exploitations: -5.1,
    part_exploitants_55plus: 49, emplois_agricoles: 5800, evolution_emplois: 0.8,
    part_bio: 15.4, taux_chomage: 9.8, score_attractivite: 67,
    indice_dynamisme: 49, indice_tension_emploi: 72, indice_vieillissement: 49,
    metiers_tension: ["Fleuriste", "Arboriculteur", "Maraîcher sous serre"],
    filieres_dev: ["Floriculture", "Maraîchage BIO", "Agritourisme"],
    filieres_declin: ["Agriculture traditionnelle"],
    projection_pop_2035: 1110000, score_vulnerabilite: 4
  },
  "49": {
    nom: "Maine-et-Loire", region: "Pays de la Loire",
    population: 817000, evolution_pop_10ans: 3.8,
    sau_ha: 565000, nb_exploitations: 7800, evolution_exploitations: -5.2,
    part_exploitants_55plus: 46, emplois_agricoles: 17200, evolution_emplois: -1.8,
    part_bio: 10.6, taux_chomage: 7.9, score_attractivite: 67,
    indice_dynamisme: 62, indice_tension_emploi: 60, indice_vieillissement: 46,
    metiers_tension: ["Vigneron Anjou", "Maraîcher", "Horticulteur", "Arboriculteur"],
    filieres_dev: ["Viticulture Anjou-Saumur", "Horticulture", "Plantes aromatiques & médicinales", "Maraîchage BIO"],
    filieres_declin: ["Grandes cultures conventionnelles"],
    projection_pop_2035: 865000, score_vulnerabilite: 4
  },
  "53": {
    nom: "Mayenne", region: "Pays de la Loire",
    population: 311000, evolution_pop_10ans: -0.5,
    sau_ha: 425000, nb_exploitations: 5100, evolution_exploitations: -7.4,
    part_exploitants_55plus: 54, emplois_agricoles: 10500, evolution_emplois: -3.8,
    part_bio: 7.3, taux_chomage: 7.1, score_attractivite: 55,
    indice_dynamisme: 48, indice_tension_emploi: 51, indice_vieillissement: 54,
    metiers_tension: ["Éleveur laitier", "Fromager", "Technicien élevage"],
    filieres_dev: ["Élevage laitier bio", "Fromagerie artisanale", "Circuit court viande"],
    filieres_declin: ["Élevage laitier conventionnel intensif"],
    projection_pop_2035: 298000, score_vulnerabilite: 6
  },
  "72": {
    nom: "Sarthe", region: "Pays de la Loire",
    population: 566000, evolution_pop_10ans: -0.9,
    sau_ha: 558000, nb_exploitations: 6200, evolution_exploitations: -8.1,
    part_exploitants_55plus: 53, emplois_agricoles: 11800, evolution_emplois: -4.6,
    part_bio: 6.4, taux_chomage: 9.2, score_attractivite: 51,
    indice_dynamisme: 43, indice_tension_emploi: 47, indice_vieillissement: 53,
    metiers_tension: ["Éleveur porcin", "Éleveur volaille", "Céréaliculteur"],
    filieres_dev: ["Volaille Label Rouge Le Mans", "Élevage BIO", "Maraîchage"],
    filieres_declin: ["Élevage intensif conventionnel", "Tabac"],
    projection_pop_2035: 548000, score_vulnerabilite: 6
  },
  "85": {
    nom: "Vendée", region: "Pays de la Loire",
    population: 693000, evolution_pop_10ans: 9.1,
    sau_ha: 538000, nb_exploitations: 8400, evolution_exploitations: -3.1,
    part_exploitants_55plus: 44, emplois_agricoles: 19200, evolution_emplois: 1.4,
    part_bio: 8.9, taux_chomage: 6.8, score_attractivite: 76,
    indice_dynamisme: 70, indice_tension_emploi: 67, indice_vieillissement: 44,
    metiers_tension: ["Éleveur bovins viande", "Maraîcher", "Technicien agri-food"],
    filieres_dev: ["Élevage bovins allaitants", "Marais poitevin", "Cultures légumières", "Agritourisme"],
    filieres_declin: ["Élevage porcin conventionnel"],
    projection_pop_2035: 770000, score_vulnerabilite: 3
  },
  "22": {
    nom: "Côtes-d'Armor", region: "Bretagne",
    population: 607000, evolution_pop_10ans: 1.2,
    sau_ha: 560000, nb_exploitations: 8100, evolution_exploitations: -6.5,
    part_exploitants_55plus: 52, emplois_agricoles: 15400, evolution_emplois: -3.2,
    part_bio: 9.8, taux_chomage: 7.9, score_attractivite: 58,
    indice_dynamisme: 51, indice_tension_emploi: 55, indice_vieillissement: 52,
    metiers_tension: ["Éleveur laitier", "Céréaliculteur", "Technicien élevage"],
    filieres_dev: ["Élevage laitier bio", "Maraîchage légumier", "Circuits courts"],
    filieres_declin: ["Élevage porcin intensif", "Grandes cultures conventionnelles"],
    projection_pop_2035: 615000, score_vulnerabilite: 5
  },
  "56": {
    nom: "Morbihan", region: "Bretagne",
    population: 764000, evolution_pop_10ans: 6.8,
    sau_ha: 510000, nb_exploitations: 7600, evolution_exploitations: -4.8,
    part_exploitants_55plus: 49, emplois_agricoles: 14800, evolution_emplois: -1.9,
    part_bio: 11.2, taux_chomage: 8.4, score_attractivite: 65,
    indice_dynamisme: 58, indice_tension_emploi: 58, indice_vieillissement: 49,
    metiers_tension: ["Éleveur bovins", "Ostréiculteur", "Maraîcher"],
    filieres_dev: ["Élevage bovins lait bio", "Ostréiculture & conchyliculture", "Maraîchage légumier"],
    filieres_declin: ["Élevage porcin conventionnel"],
    projection_pop_2035: 835000, score_vulnerabilite: 4
  },
  "18": {
    nom: "Cher", region: "Centre-Val de Loire",
    population: 304000, evolution_pop_10ans: -2.5,
    sau_ha: 540000, nb_exploitations: 4800, evolution_exploitations: -7.2,
    part_exploitants_55plus: 53, emplois_agricoles: 9800, evolution_emplois: -4.1,
    part_bio: 7.4, taux_chomage: 9.3, score_attractivite: 49,
    indice_dynamisme: 42, indice_tension_emploi: 48, indice_vieillissement: 53,
    metiers_tension: ["Éleveur ovin", "Viticulteur Sancerre", "Céréaliculteur"],
    filieres_dev: ["Viticulture Sancerre & Menetou-Salon", "Élevage ovin BIO", "Circuits courts"],
    filieres_declin: ["Élevage bovin lait conventionnel", "Grandes cultures extensives"],
    projection_pop_2035: 292000, score_vulnerabilite: 7
  },
  "28": {
    nom: "Eure-et-Loir", region: "Centre-Val de Loire",
    population: 436000, evolution_pop_10ans: 0.1,
    sau_ha: 730000, nb_exploitations: 5600, evolution_exploitations: -8.5,
    part_exploitants_55plus: 51, emplois_agricoles: 11200, evolution_emplois: -5.3,
    part_bio: 5.8, taux_chomage: 8.4, score_attractivite: 55,
    indice_dynamisme: 44, indice_tension_emploi: 50, indice_vieillissement: 51,
    metiers_tension: ["Céréaliculteur", "Maraîcher", "Technicien grandes cultures"],
    filieres_dev: ["Agriculture de conservation", "Maraîchage sous serres", "BIO grandes cultures"],
    filieres_declin: ["Grandes cultures conventionnelles intensives"],
    projection_pop_2035: 440000, score_vulnerabilite: 6
  },
  "36": {
    nom: "Indre", region: "Centre-Val de Loire",
    population: 218000, evolution_pop_10ans: -4.2,
    sau_ha: 530000, nb_exploitations: 4200, evolution_exploitations: -9.1,
    part_exploitants_55plus: 57, emplois_agricoles: 8900, evolution_emplois: -6.8,
    part_bio: 8.1, taux_chomage: 10.1, score_attractivite: 43,
    indice_dynamisme: 35, indice_tension_emploi: 41, indice_vieillissement: 57,
    metiers_tension: ["Éleveur bovin", "Éleveur ovin", "Berger"],
    filieres_dev: ["Élevage ovin allaitant BIO", "Bovins viande Label Rouge", "Agroforesterie"],
    filieres_declin: ["Élevage bovin lait conventionnel", "Grandes cultures extensives"],
    projection_pop_2035: 203000, score_vulnerabilite: 9
  },
  "41": {
    nom: "Loir-et-Cher", region: "Centre-Val de Loire",
    population: 336000, evolution_pop_10ans: 0.8,
    sau_ha: 480000, nb_exploitations: 5100, evolution_exploitations: -5.9,
    part_exploitants_55plus: 50, emplois_agricoles: 9400, evolution_emplois: -2.7,
    part_bio: 9.3, taux_chomage: 8.8, score_attractivite: 57,
    indice_dynamisme: 50, indice_tension_emploi: 52, indice_vieillissement: 50,
    metiers_tension: ["Viticulteur Touraine", "Arboriculteur", "Maraîcher"],
    filieres_dev: ["Viticulture Touraine & Cheverny", "Arboriculture fruitière", "Grandes cultures BIO"],
    filieres_declin: ["Élevage intensif conventionnel", "Tabac"],
    projection_pop_2035: 342000, score_vulnerabilite: 5
  },
  "38": {
    nom: "Isère", region: "Auvergne-Rhône-Alpes",
    population: 1270000, evolution_pop_10ans: 4.5,
    sau_ha: 230000, nb_exploitations: 5600, evolution_exploitations: -5.0,
    part_exploitants_55plus: 48, emplois_agricoles: 11800, evolution_emplois: -1.5,
    part_bio: 12.8, taux_chomage: 8.1, score_attractivite: 70,
    indice_dynamisme: 57, indice_tension_emploi: 60, indice_vieillissement: 48,
    metiers_tension: ["Éleveur montagne", "Fromager AOP", "Maraîcher"],
    filieres_dev: ["Élevage montagne BIO", "Noix de Grenoble AOP", "Circuits courts"],
    filieres_declin: ["Grandes cultures de plaine"],
    projection_pop_2035: 1350000, score_vulnerabilite: 3
  },
  "74": {
    nom: "Haute-Savoie", region: "Auvergne-Rhône-Alpes",
    population: 860000, evolution_pop_10ans: 8.3,
    sau_ha: 180000, nb_exploitations: 5200, evolution_exploitations: -4.8,
    part_exploitants_55plus: 46, emplois_agricoles: 11500, evolution_emplois: -1.5,
    part_bio: 16.2, taux_chomage: 6.8, score_attractivite: 78,
    indice_dynamisme: 65, indice_tension_emploi: 68, indice_vieillissement: 46,
    metiers_tension: ["Fromager de montagne", "Éleveur bovin lait", "Guide agrotourisme"],
    filieres_dev: ["Fromages AOP (Reblochon, Abondance, Tomme)", "Agriculture de montagne BIO", "Agrotourisme"],
    filieres_declin: ["Élevage conventionnel de plaine"],
    projection_pop_2035: 950000, score_vulnerabilite: 3
  },
  "73": {
    nom: "Savoie", region: "Auvergne-Rhône-Alpes",
    population: 435000, evolution_pop_10ans: 4.5,
    sau_ha: 195000, nb_exploitations: 3800, evolution_exploitations: -5.2,
    part_exploitants_55plus: 49, emplois_agricoles: 8200, evolution_emplois: -2.1,
    part_bio: 13.8, taux_chomage: 7.4, score_attractivite: 71,
    indice_dynamisme: 59, indice_tension_emploi: 62, indice_vieillissement: 49,
    metiers_tension: ["Fromager AOP Beaufort", "Éleveur montagne", "Vigneron Savoie"],
    filieres_dev: ["Fromages AOP Savoie (Beaufort, Emmental)", "Vins de Savoie", "Agriculture de montagne"],
    filieres_declin: ["Grandes cultures de plaine"],
    projection_pop_2035: 455000, score_vulnerabilite: 4
  },
  "64": {
    nom: "Pyrénées-Atlantiques", region: "Nouvelle-Aquitaine",
    population: 685000, evolution_pop_10ans: 5.2,
    sau_ha: 640000, nb_exploitations: 8900, evolution_exploitations: -3.8,
    part_exploitants_55plus: 48, emplois_agricoles: 16200, evolution_emplois: -0.8,
    part_bio: 11.5, taux_chomage: 8.9, score_attractivite: 69,
    indice_dynamisme: 63, indice_tension_emploi: 60, indice_vieillissement: 48,
    metiers_tension: ["Éleveur laitier Ossau-Iraty", "Vigneron Jurançon", "Maraîcher Béarnais"],
    filieres_dev: ["Fromage AOP Ossau-Iraty", "Vin AOP Jurançon & Irouléguy", "Élevage Basque BIO"],
    filieres_declin: ["Élevage intensif de plaine"],
    projection_pop_2035: 725000, score_vulnerabilite: 4
  },
  "81": {
    nom: "Tarn", region: "Occitanie",
    population: 395000, evolution_pop_10ans: 3.1,
    sau_ha: 450000, nb_exploitations: 5800, evolution_exploitations: -6.2,
    part_exploitants_55plus: 52, emplois_agricoles: 9800, evolution_emplois: -3.5,
    part_bio: 10.4, taux_chomage: 9.8, score_attractivite: 56,
    indice_dynamisme: 49, indice_tension_emploi: 53, indice_vieillissement: 52,
    metiers_tension: ["Vigneron Gaillac", "Éleveur ovin", "Maraîcher bio"],
    filieres_dev: ["Viticulture Gaillac AOP", "Élevage ovin BIO", "Circuits courts"],
    filieres_declin: ["Céréales conventionnelles", "Élevage intensif"],
    projection_pop_2035: 408000, score_vulnerabilite: 5
  },
  "32": {
    nom: "Gers", region: "Occitanie",
    population: 195000, evolution_pop_10ans: 2.8,
    sau_ha: 640000, nb_exploitations: 7200, evolution_exploitations: -5.5,
    part_exploitants_55plus: 53, emplois_agricoles: 12400, evolution_emplois: -4.1,
    part_bio: 8.7, taux_chomage: 9.2, score_attractivite: 58,
    indice_dynamisme: 52, indice_tension_emploi: 49, indice_vieillissement: 53,
    metiers_tension: ["Éleveur canard foie gras", "Vigneron Armagnac", "Céréaliculteur BIO"],
    filieres_dev: ["Foie gras Label Rouge", "Armagnac AOC", "Grandes cultures BIO"],
    filieres_declin: ["Élevage intensif maïs"],
    projection_pop_2035: 202000, score_vulnerabilite: 5
  },
  "12": {
    nom: "Aveyron", region: "Occitanie",
    population: 278000, evolution_pop_10ans: -0.5,
    sau_ha: 840000, nb_exploitations: 7600, evolution_exploitations: -7.8,
    part_exploitants_55plus: 55, emplois_agricoles: 13500, evolution_emplois: -5.2,
    part_bio: 11.8, taux_chomage: 8.1, score_attractivite: 55,
    indice_dynamisme: 48, indice_tension_emploi: 52, indice_vieillissement: 55,
    metiers_tension: ["Éleveur ovin lait Roquefort", "Éleveur bovin allaitant Aubrac", "Fromager AOP"],
    filieres_dev: ["AOP Roquefort", "AOP Laguiole & Salers", "Élevage Aubrac BIO"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 272000, score_vulnerabilite: 6
  }
};

// Alertes générées
export const alertes = [
  {
    id: 1, niveau: "rouge", departement: "87", nom_territoire: "Haute-Vienne",
    indicateur: "Renouvellement des exploitants",
    valeur: "61% des exploitants >55 ans",
    ecart_moyenne: "+22 points vs moyenne nationale",
    analyse: "Le vieillissement des exploitants est critique. Sans renouvellement, 40% des exploitations pourraient disparaître d'ici 2035.",
    action: "Renforcer immédiatement les formations installation/reprise. Créer un partenariat avec la Chambre d'Agriculture."
  },
  {
    id: 2, niveau: "rouge", departement: "86", nom_territoire: "Vienne",
    indicateur: "Évolution des exploitations",
    valeur: "-9.5% en 5 ans",
    ecart_moyenne: "-4.2 points vs moyenne nationale",
    analyse: "La perte accélérée d'exploitations fragilise l'assise économique des formations agricoles locales.",
    action: "Auditer l'offre de formation et adapter aux besoins d'installation. Renforcer les formations courtes."
  },
  {
    id: 3, niveau: "orange", departement: "24", nom_territoire: "Dordogne",
    indicateur: "Attractivité territoriale",
    valeur: "Score 48/100",
    ecart_moyenne: "-17 points vs moyenne régionale",
    analyse: "La faible attractivité amplifie les difficultés de recrutement et limite les effectifs en formation.",
    action: "Développer des partenariats avec les employeurs locaux. Valoriser les débouchés via communication."
  },
  {
    id: 4, niveau: "orange", departement: "14", nom_territoire: "Calvados",
    indicateur: "Taux de remplissage MFR",
    valeur: "71% (MFR Caen)",
    ecart_moyenne: "-12 points vs objectif",
    analyse: "Le taux de remplissage en dessous du seuil de viabilité menace l'équilibre financier de l'établissement.",
    action: "Réviser l'offre de formation, renforcer la communication et prospecter de nouveaux publics."
  },
  {
    id: 5, niveau: "jaune", departement: "63", nom_territoire: "Puy-de-Dôme",
    indicateur: "Emplois agricoles",
    valeur: "-4.4% en 5 ans",
    ecart_moyenne: "-1.5 points vs moyenne nationale",
    analyse: "La baisse progressive des emplois agricoles risque de freiner l'attractivité des formations.",
    action: "Surveiller l'indicateur trimestriellement. Anticiper une diversification de l'offre de formation."
  },
  {
    id: 6, niveau: "jaune", departement: "57", nom_territoire: "Moselle",
    indicateur: "Part de l'agriculture biologique",
    valeur: "5.9% de la SAU",
    ecart_moyenne: "-7 points vs moyenne nationale",
    analyse: "Le retard sur la transition BIO limite les débouchés pour les formations agroécologiques.",
    action: "Développer des CS Agriculture Biologique. Créer des partenariats avec les groupements BIO."
  }
];

// Statistiques globales
export const statsGlobales = {
  nb_etablissements: 800,
  nb_etablissements_couverts: 76,
  nb_apprenants_total: 220000,
  nb_departements_couverts: 30,
  nb_formations_recensees: 154,
  taux_insertion_moyen: 81,
  taux_remplissage_moyen: 83,
  part_public: 68,
  part_prive: 32,
  evolution_effectifs_5ans: -2.3,
  diagnostics_generes: 47,
  rapports_produits: 12,
  derniere_maj: "Février 2026"
};

// Types de formations et leur répartition
export const typesFormations = [
  { nom: "Bac Pro CGEA", nb_formations: 24, nb_apprenants: 58000, evolution: -1.8 },
  { nom: "BTS / BTSA", nb_formations: 18, nb_apprenants: 42000, evolution: 2.1 },
  { nom: "BPREA", nb_formations: 15, nb_apprenants: 28000, evolution: 4.5 },
  { nom: "CAPA", nb_formations: 12, nb_apprenants: 18000, evolution: -3.2 },
  { nom: "CS (Certificats de Spécialisation)", nb_formations: 11, nb_apprenants: 14500, evolution: 8.7 },
  { nom: "BP REA", nb_formations: 7, nb_apprenants: 9800, evolution: 1.2 },
];

// Évolution effectifs sur 10 ans (données nationales)
export const evolutionEffectifs = [
  { annee: "2015", effectifs: 230000, bio: 18000, apprentissage: 35000 },
  { annee: "2016", effectifs: 228000, bio: 20500, apprentissage: 37200 },
  { annee: "2017", effectifs: 227000, bio: 23100, apprentissage: 38900 },
  { annee: "2018", effectifs: 224000, bio: 26300, apprentissage: 41200 },
  { annee: "2019", effectifs: 222500, bio: 29500, apprentissage: 44800 },
  { annee: "2020", effectifs: 225000, bio: 31200, apprentissage: 46100 },
  { annee: "2021", effectifs: 226500, bio: 34000, apprentissage: 49500 },
  { annee: "2022", effectifs: 223000, bio: 36800, apprentissage: 52300 },
  { annee: "2023", effectifs: 221000, bio: 39400, apprentissage: 55100 },
  { annee: "2024", effectifs: 220000, bio: 41200, apprentissage: 57800 },
];
