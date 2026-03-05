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
    adresse: "41 avenue Maurice Mailfert, 49240 Avrillé",
    code_departement: "49", lat: 47.49830, lng: -0.57958,
    region: "Pays de la Loire", departement: "Maine-et-Loire", statut: "privé",
    effectifs_total: 320, taux_remplissage: 88, taux_insertion: 85,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Horticulture", "Bac Pro Aménagements Paysagers", "CS Jardins & Espaces Verts"],
    coordonnees: [47.49830, -0.57958]
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
    adresse: "3 rue de la Sèvre, 44190 GORGES", commune: "Clisson-Gorges",
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
    adresse: "Rue de l'Abbé Dujarié, 72340 RUILLÉ-SUR-LOIR", commune: "Loir-en-Vallée",
    code_departement: "72", lat: 47.802, lng: 0.375,
    region: "Pays de la Loire", departement: "Sarthe", statut: "privé",
    effectifs_total: 220, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CS Agriculture Durable"],
    coordonnees: [47.802, 0.375]
  },
  {
    id: 39, nom: "Val de Sarthe", type: "CNEAP", uai: "0720039M",
    adresse: "Route du Mans, 72300 Sablé-sur-Sarthe",
    code_departement: "72", lat: 47.84182, lng: -0.30310,
    region: "Pays de la Loire", departement: "Sarthe", statut: "privé",
    effectifs_total: 275, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Élevages Porcins", "BTS Productions Animales", "BPREA Bovins Lait", "CS Élevage Durable"],
    coordonnees: [47.84182, -0.30310]
  },

  // Mayenne (53)
  {
    id: 40, nom: "Rochefeuille", type: "CNEAP", uai: "0530040N",
    adresse: "Route de Caen, 53100 Mayenne",
    code_departement: "53", lat: 48.31693, lng: -0.62126,
    region: "Pays de la Loire", departement: "Mayenne", statut: "privé",
    effectifs_total: 230, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "BTS Productions Animales"],
    coordonnees: [48.31693, -0.62126]
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
    code_departement: "29", lat: 48.31338, lng: -4.00831,
    region: "Bretagne", departement: "Finistère", statut: "privé",
    effectifs_total: 165, taux_remplissage: 81, taux_insertion: 83,
    formations: ["CAPA Agriculture", "BPREA Productions Végétales", "CS Maraîchage Biologique"],
    coordonnees: [48.31338, -4.00831]
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
    adresse: "3 rue de Ker Anna, 56700 Kervignac",
    code_departement: "56", lat: 47.76061, lng: -3.23794,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 225, taux_remplissage: 81, taux_insertion: 80,
    formations: ["Bac Pro CGEA", "BPREA Bovins Lait", "CS Littoral & Aquaculture"],
    coordonnees: [47.76061, -3.23794]
  },
  {
    id: 58, nom: "Lycée Kerlebost", type: "CNEAP", uai: "0560058F",
    adresse: "Saint Thuriau, 56300 Pontivy",
    code_departement: "56", lat: 48.00812, lng: -2.97222,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 340, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Lait", "BTS Productions Animales"],
    coordonnees: [48.00812, -2.97222]
  },
  {
    id: 59, nom: "Lycée Kerplouz-LaSalle", type: "CNEAP", uai: "0560059G",
    adresse: "Route du Bono, 56400 Auray",
    code_departement: "56", lat: 47.65740, lng: -2.97116,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 420, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA", "BPREA", "BTS ACSE", "CS Agroécologie", "Bac Pro SAPAT"],
    coordonnees: [47.65740, -2.97116]
  },
  {
    id: 60, nom: "Lycée La Touche", type: "CNEAP", uai: "0560060H",
    adresse: "Route de Dinan, 56800 Ploërmel", commune: "Ploermel",
    code_departement: "56", lat: 47.94893, lng: -2.40331,
    region: "Bretagne", departement: "Morbihan", statut: "privé",
    effectifs_total: 280, taux_remplissage: 84, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [47.94893, -2.40331]
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
    adresse: "2 rue du Chanoine Volton, 18520 Bengy-sur-Craon",
    code_departement: "18", lat: 47.00174, lng: 2.74919,
    region: "Centre-Val de Loire", departement: "Cher", statut: "privé",
    effectifs_total: 185, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages Ovins", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [47.00174, 2.74919]
  },

  // Eure-et-Loir (28)
  {
    id: 70, nom: "Campus Franz Stock", type: "CNEAP", uai: "0280070R",
    adresse: "2 rue des Fleurs, 28630 Mignières", commune: "Mignieres",
    code_departement: "28", lat: 48.35990, lng: 1.42984,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 340, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CS Agriculture de Conservation", "BTS ACSE"],
    coordonnees: [48.35990, 1.42984]
  },
  {
    id: 71, nom: "LEAP de Nermont", type: "CNEAP", uai: "0280071S",
    adresse: "2 rue de Nermont, 28200 Châteaudun", commune: "Châteaudun",
    code_departement: "28", lat: 48.06439, lng: 1.33198,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 220, taux_remplissage: 80, taux_insertion: 79,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CAPA Agriculture", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT009", consortium_id: "GAT002", consortium_label: "Consortium LEAP de Nermont / Groupe ESA", role: "chef_file" },
    coordonnees: [48.06439, 1.33198]
  },
  {
    id: 72, nom: "LEAP de Nermont (site du Perche)", type: "CNEAP", uai: "0280072T",
    adresse: "35 rue de la Touche, 28400 Nogent-le-Rotrou",
    code_departement: "28", lat: 48.31129, lng: 0.81085,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 95, taux_remplissage: 74, taux_insertion: 77,
    formations: ["Bac Pro CGEA Élevages", "Bac Pro Forêt", "CAPA Agriculture"],
    coordonnees: [48.31129, 0.81085]
  },
  {
    id: 73, nom: "LEAP Boissay", type: "CNEAP", uai: "0410073U",
    adresse: "Fougères-sur-Bièvre, 41700 Le Controis-en-Sologne", commune: "Le Controis-en-Sologne",
    code_departement: "41", lat: 47.43924, lng: 1.35222,
    region: "Centre-Val de Loire", departement: "Loir-et-Cher", statut: "privé",
    effectifs_total: 165, taux_remplissage: 78, taux_insertion: 77,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Productions Végétales", "CS Maraîchage Biologique"],
    coordonnees: [47.43924, 1.35222]
  },

  // Indre (36)
  {
    id: 74, nom: "LEAP Saint-Cyran", type: "CNEAP", uai: "0360074V",
    adresse: "1 route de Châtillon, 36460 Saint-Cyran-du-Jambot", commune: "St-Cyran-du-Jambot",
    code_departement: "36", lat: 47.01747, lng: 1.13844,
    region: "Centre-Val de Loire", departement: "Indre", statut: "privé",
    effectifs_total: 175, taux_remplissage: 79, taux_insertion: 78,
    formations: ["Bac Pro CGEA Élevages Bovins", "BPREA Bovins Viande", "CS Conduite d'Élevage"],
    coordonnees: [47.01747, 1.13844]
  },

  // Loir-et-Cher (41)
  {
    id: 75, nom: "Lycée Professionnel Privé Gabriel Bridet", type: "CNEAP", uai: "0280075W",
    adresse: "40 rue Hubert Baraine, 28260 Anet", commune: "Anet",
    code_departement: "28", lat: 48.84842, lng: 1.43330,
    region: "Centre-Val de Loire", departement: "Eure-et-Loir", statut: "privé",
    effectifs_total: 260, taux_remplissage: 83, taux_insertion: 82,
    formations: ["Bac Pro CGEA Vigne & Vin", "BPREA Viticulture Touraine", "Bac Pro SAPAT", "CS Œnologie Appliquée"],
    coordonnees: [48.84842, 1.43330]
  },
  {
    id: 76, nom: "LEAP Sainte-Cécile", type: "CNEAP", uai: "0410076X",
    adresse: "12 rue Saint Laurent, 41800 Montoire-sur-le-Loir", commune: "Montoire-sur-le-Loir",
    code_departement: "41", lat: 47.75175, lng: 0.86279,
    region: "Centre-Val de Loire", departement: "Loir-et-Cher", statut: "privé",
    effectifs_total: 140, taux_remplissage: 75, taux_insertion: 76,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "CAPA Agriculture"],
    coordonnees: [47.75175, 0.86279]
  },

  // ============================================================
  // === Bachelor Agro — Mention GAT (Génie agronomique et transitions) ===
  // ============================================================

  // Consortium Institut de Genech / JUNIA — Nord (59)
  {
    id: 77, nom: "Institut de Genech", type: "CNEAP", uai: "0590077A",
    adresse: "348 rue de la Libération, 59242 Genech",
    code_departement: "59", lat: 50.52820, lng: 3.20659,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 520, taux_remplissage: 91, taux_insertion: 89,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTSA Agronomie Agroécologie", "BTS Productions Animales", "Bachelor Agro GAT"],
    bachelor_agro: { mention: "GAT", mention_label: "Génie agronomique et transitions", code: "2026BAGAT001", consortium_id: "GAT001", consortium_label: "Consortium Institut de Genech / JUNIA", role: "chef_file" },
    coordonnees: [50.52820, 3.20659]
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
    adresse: "2 impasse Charles Tellier, 33140 Villenave-d'Ornon", commune: "Villenave-d'Ornon",
    code_departement: "33", lat: 44.78744, lng: -0.58383,
    region: "Nouvelle-Aquitaine", departement: "Gironde", statut: "privé",
    effectifs_total: 380, taux_remplissage: 88, taux_insertion: 90,
    formations: ["BTS Agroalimentaire", "BTSA Qualité Sécurité Alimentaire", "CS Brasserie Artisanale", "Bachelor Agro AAD"],
    bachelor_agro: { mention: "AAD", mention_label: "Alimentation et Agroalimentaire durables", code: "2026BAAAD001", consortium_id: "AAD001", consortium_label: "Consortium ISNAB / BSA", role: "chef_file" },
    coordonnees: [44.78744, -0.58383]
  },

  // ============================================================
  // === CNEAP – Établissements complémentaires (source officielle CNEAP) ===
  // ============================================================

  {
    id: 89, nom: "Lycée Saint-Sorlin", type: "CNEAP", uai: "0010089X",
    adresse: "10 place de la Halle, SAINT SORLIN EN BUGEY",
    code_departement: "01", lat: 45.88232, lng: 5.37618,
    region: "Auvergne-Rhône-Alpes", departement: "Ain", statut: "privé",
    effectifs_total: 146, taux_remplissage: 91, taux_insertion: 89,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.88232, 5.37618]
  },

  {
    id: 90, nom: "Lycée Privé Claude Mercier", type: "CNEAP", uai: "0030090X",
    adresse: "Route de Lapalisse, LE MAYET DE MONTAGNE",
    code_departement: "03", lat: 46.07497, lng: 3.66691,
    region: "Auvergne-Rhône-Alpes", departement: "Allier", statut: "privé",
    effectifs_total: 251, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [46.07497, 3.66691]
  },

  {
    id: 91, nom: "Lycée Agrotechnologique Privé D'Annonay", type: "CNEAP", uai: "0070091X",
    adresse: "5 chemin Saint Denis et montée du Savel, ANNONAY",
    code_departement: "07", lat: 45.24115, lng: 4.6755,
    region: "Auvergne-Rhône-Alpes", departement: "Ardèche", statut: "privé",
    effectifs_total: 418, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTSA Agronomie Agroécologie", "CS Agriculture de Conservation"],
    coordonnees: [45.24115, 4.6755]
  },

  {
    id: 92, nom: "Vivarais Formation", type: "CNEAP", uai: "0070092X",
    adresse: "111 avenue du 8 mai 1945, TOURNON SUR RHONE",
    code_departement: "07", lat: 45.05535, lng: 4.8373,
    region: "Auvergne-Rhône-Alpes", departement: "Ardèche", statut: "privé",
    effectifs_total: 217, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.05535, 4.8373]
  },

  {
    id: 93, nom: "Lycée La Pélissière", type: "CNEAP", uai: "0070093X",
    adresse: "4 rue du Repos, TOURNON SUR RHONE",
    code_departement: "07", lat: 45.06458, lng: 4.83296,
    region: "Auvergne-Rhône-Alpes", departement: "Ardèche", statut: "privé",
    effectifs_total: 158, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.06458, 4.83296]
  },

  {
    id: 94, nom: "Lycée Saint-Vincent La Présentation", type: "CNEAP", uai: "0150094X",
    adresse: "2 rue Marcellin Boudet, SAINT FLOUR",
    code_departement: "15", lat: 45.035, lng: 3.08706,
    region: "Auvergne-Rhône-Alpes", departement: "Cantal", statut: "privé",
    effectifs_total: 167, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro Vigne & Vin", "BPREA Viticulture", "BTS VitiEnologie", "CS Œnologie"],
    coordonnees: [45.035, 3.08706]
  },

  {
    id: 95, nom: "Lycée Drôme Provençale", type: "CNEAP", uai: "0260095X",
    adresse: "17 rue du Serre Blanc, ST PAUL TROIS CHATEAUX",
    code_departement: "26", lat: 44.34335, lng: 4.76711,
    region: "Auvergne-Rhône-Alpes", departement: "Drôme", statut: "privé",
    effectifs_total: 233, taux_remplissage: 78, taux_insertion: 76,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [44.34335, 4.76711]
  },

  {
    id: 96, nom: "LTP Les Mandailles", type: "CNEAP", uai: "0260096X",
    adresse: "18 rue du Stade, CHÂTEAUNEUF DE GALAURE",
    code_departement: "26", lat: 45.22742, lng: 4.95222,
    region: "Auvergne-Rhône-Alpes", departement: "Drôme", statut: "privé",
    effectifs_total: 381, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.22742, 4.95222]
  },

  {
    id: 97, nom: "LAP Val de Drôme", type: "CNEAP", uai: "0260097X",
    adresse: "400 route des Chirouzes, MONTELEGER",
    code_departement: "26", lat: 44.85928, lng: 4.92873,
    region: "Auvergne-Rhône-Alpes", departement: "Drôme", statut: "privé",
    effectifs_total: 415, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [44.85928, 4.92873]
  },

  {
    id: 98, nom: "LEAP Vallon Bonnevaux", type: "CNEAP", uai: "0380098X",
    adresse: "13 rue de l'Eglise, CHABONS",
    code_departement: "38", lat: 45.44458, lng: 5.4307,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "privé",
    effectifs_total: 285, taux_remplissage: 78, taux_insertion: 76,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.44458, 5.4307]
  },

  {
    id: 99, nom: "Collège Lycée Vallon Bonnevaux", type: "CNEAP", uai: "0380099X",
    adresse: "3 rue Jeanne d'Arc, ST JEAN DE BOURNAY",
    code_departement: "38", lat: 45.50227, lng: 5.14321,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "privé",
    effectifs_total: 153, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.50227, 5.14321]
  },

  {
    id: 100, nom: "LYPPRA La Mure", type: "CNEAP", uai: "0380100X",
    adresse: "42 rue des Alpes, LA MURE",
    code_departement: "38", lat: 44.90496, lng: 5.79053,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "privé",
    effectifs_total: 416, taux_remplissage: 89, taux_insertion: 87,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [44.90496, 5.79053]
  },

  {
    id: 101, nom: "LEAP Bellevue", type: "CNEAP", uai: "0380101X",
    adresse: "4 rue des Recollets, ST MARCELLIN",
    code_departement: "38", lat: 45.15723, lng: 5.32277,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "privé",
    effectifs_total: 320, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.15723, 5.32277]
  },

  {
    id: 102, nom: "LEAP Saint Exupéry", type: "CNEAP", uai: "0380102X",
    adresse: "264 rue des frênes, ST SIMEON DE BRESSIEUX",
    code_departement: "38", lat: 45.33059, lng: 5.26079,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "privé",
    effectifs_total: 302, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.33059, 5.26079]
  },

  {
    id: 103, nom: "Institution Sœur Emmanuelle", type: "CNEAP", uai: "0380103X",
    adresse: "2 route de Volgeat, VILLEMOIRIEU",
    code_departement: "38", lat: 45.72349, lng: 5.2172,
    region: "Auvergne-Rhône-Alpes", departement: "Isère", statut: "privé",
    effectifs_total: 213, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.72349, 5.2172]
  },

  {
    id: 104, nom: "LTP Le Puits de l'Aune - Don Bosco", type: "CNEAP", uai: "0420104X",
    adresse: "17 Rue Louis Blanc, FEURS",
    code_departement: "42", lat: 45.73996, lng: 4.23575,
    region: "Auvergne-Rhône-Alpes", departement: "Loire", statut: "privé",
    effectifs_total: 389, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.73996, 4.23575]
  },

  {
    id: 105, nom: "LAP Saint André", type: "CNEAP", uai: "0420105X",
    adresse: "1 rue du petit lavoir, SURY LE COMTAL",
    code_departement: "42", lat: 45.53399, lng: 4.18227,
    region: "Auvergne-Rhône-Alpes", departement: "Loire", statut: "privé",
    effectifs_total: 404, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.53399, 4.18227]
  },

  {
    id: 106, nom: "LAP Etienne Gautier", type: "CNEAP", uai: "0420106X",
    adresse: "Ressins, NANDAX",
    code_departement: "42", lat: 46.09679, lng: 4.18917,
    region: "Auvergne-Rhône-Alpes", departement: "Loire", statut: "privé",
    effectifs_total: 201, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [46.09679, 4.18917]
  },

  {
    id: 107, nom: "LEAP Eugénie Joubert", type: "CNEAP", uai: "0430107X",
    adresse: "16 bis rue Traversière, YSSINGEAUX",
    code_departement: "43", lat: 45.14204, lng: 4.1225,
    region: "Auvergne-Rhône-Alpes", departement: "Haute-Loire", statut: "privé",
    effectifs_total: 292, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.14204, 4.1225]
  },

  {
    id: 108, nom: "ISVT", type: "CNEAP", uai: "0430108X",
    adresse: "72 avenue de Vals, VALS PRES LE PUY",
    code_departement: "43", lat: 45.03329, lng: 3.87853,
    region: "Auvergne-Rhône-Alpes", departement: "Haute-Loire", statut: "privé",
    effectifs_total: 160, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.03329, 3.87853]
  },

  {
    id: 109, nom: "LEAP d'Ennezat", type: "CNEAP", uai: "0630109X",
    adresse: "1 route de Riom, ENNEZAT",
    code_departement: "63", lat: 45.89746, lng: 3.22061,
    region: "Auvergne-Rhône-Alpes", departement: "Puy-de-Dôme", statut: "privé",
    effectifs_total: 219, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.89746, 3.22061]
  },

  {
    id: 110, nom: "Lycée Agro-Environnemental Privé Saint Joseph", type: "CNEAP", uai: "0630110X",
    adresse: "Château Saint-Quentin, LE BREUIL SUR COUZE",
    code_departement: "63", lat: 45.53404, lng: 4.18187,
    region: "Auvergne-Rhône-Alpes", departement: "Puy-de-Dôme", statut: "privé",
    effectifs_total: 171, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA Grandes Cultures", "BTSA Agronomie Agroécologie", "CS Agriculture de Conservation"],
    coordonnees: [45.53404, 4.18187]
  },

  {
    id: 111, nom: "LEAP Massabielle", type: "CNEAP", uai: "0630111X",
    adresse: "Place de l'Eglise, VERNET LA VARENNE",
    code_departement: "63", lat: 45.47537, lng: 3.45095,
    region: "Auvergne-Rhône-Alpes", departement: "Puy-de-Dôme", statut: "privé",
    effectifs_total: 183, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.47537, 3.45095]
  },

  {
    id: 112, nom: "LHP Lyon Pressin", type: "CNEAP", uai: "0690112X",
    adresse: "81 chemin de Beaunant, ST GENIS LAVAL",
    code_departement: "69", lat: 45.70885, lng: 4.77889,
    region: "Auvergne-Rhône-Alpes", departement: "Rhône", statut: "privé",
    effectifs_total: 184, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.70885, 4.77889]
  },

  {
    id: 113, nom: "LEAP Jean Monnet", type: "CNEAP", uai: "0690113X",
    adresse: "304 boulevard de la Bardière, ST SYMPHORIEN SUR COISE",
    code_departement: "69", lat: 45.62956, lng: 4.46101,
    region: "Auvergne-Rhône-Alpes", departement: "Rhône", statut: "privé",
    effectifs_total: 249, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.62956, 4.46101]
  },

  {
    id: 114, nom: "Institut Agricole Privé Sandar", type: "CNEAP", uai: "0690114X",
    adresse: "392 chemin de la sablière, LIMONEST",
    code_departement: "69", lat: 45.83467, lng: 4.76876,
    region: "Auvergne-Rhône-Alpes", departement: "Rhône", statut: "privé",
    effectifs_total: 237, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [45.83467, 4.76876]
  },

  {
    id: 115, nom: "Assomption Mont-Blanc", type: "CNEAP", uai: "0740115X",
    adresse: "125 route du lycée, COMBLOUX",
    code_departement: "74", lat: 45.89023, lng: 6.71359,
    region: "Auvergne-Rhône-Alpes", departement: "Haute-Savoie", statut: "privé",
    effectifs_total: 298, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA Élevages Montagne", "BPREA Élevages Bovins Lait Montagne", "CS Agriculture de Montagne"],
    coordonnees: [45.89023, 6.71359]
  },

  {
    id: 116, nom: "Lycée Les 3 Vallées", type: "CNEAP", uai: "0740116X",
    adresse: "2 avenue de l'Ermitage, THONON LES BAINS",
    code_departement: "74", lat: 46.36849, lng: 6.4843,
    region: "Auvergne-Rhône-Alpes", departement: "Haute-Savoie", statut: "privé",
    effectifs_total: 241, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Élevages Montagne", "BPREA Élevages Bovins Lait Montagne", "CS Agriculture de Montagne"],
    coordonnees: [46.36849, 6.4843]
  },

  {
    id: 117, nom: "Lycée Jeanne Antide", type: "CNEAP", uai: "0740117X",
    adresse: "55 Impasse du Brévent, REIGNIER-ESERY", commune: "Reignier",
    code_departement: "74", lat: 46.13181, lng: 6.27201,
    region: "Auvergne-Rhône-Alpes", departement: "Haute-Savoie", statut: "privé",
    effectifs_total: 258, taux_remplissage: 91, taux_insertion: 89,
    formations: ["Bac Pro CGEA Élevages", "BPREA Bovins Lait", "CS Fromages AOP", "Bac Pro SAPAT"],
    coordonnees: [46.13181, 6.27201]
  },

  {
    id: 118, nom: "Lycée Technologique Privé Jeanne d'Arc", type: "CNEAP", uai: "0250118X",
    adresse: "22 rue Jeanne d'Arc, PONTARLIER",
    code_departement: "25", lat: 46.90392, lng: 6.35755,
    region: "Bourgogne-Franche-Comté", departement: "Doubs", statut: "privé",
    effectifs_total: 267, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA", "BPREA Productions Animales", "CS Élevage Durable"],
    coordonnees: [46.90392, 6.35755]
  },

  {
    id: 119, nom: "LATP LaSalle", type: "CNEAP", uai: "0250119X",
    adresse: "1 Place Cretin, LEVIER",
    code_departement: "25", lat: 46.95509, lng: 6.12434,
    region: "Bourgogne-Franche-Comté", departement: "Doubs", statut: "privé",
    effectifs_total: 151, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA", "BPREA Productions Animales", "CS Élevage Durable"],
    coordonnees: [46.95509, 6.12434]
  },

  {
    id: 120, nom: "Lycée François-Xavier", type: "CNEAP", uai: "0250120X",
    adresse: "7 rue du chapitre, BESANCON",
    code_departement: "25", lat: 47.23324, lng: 6.03025,
    region: "Bourgogne-Franche-Comté", departement: "Doubs", statut: "privé",
    effectifs_total: 295, taux_remplissage: 78, taux_insertion: 76,
    formations: ["Bac Pro CGEA", "BPREA Productions Animales", "CS Élevage Durable"],
    coordonnees: [47.23324, 6.03025]
  },

  {
    id: 121, nom: "Lycée Horticole et Rural Privé du Haut Nivernais", type: "CNEAP", uai: "0580121X",
    adresse: "Route de Clamecy, VARZY",
    code_departement: "58", lat: 47.36197, lng: 3.40504,
    region: "Bourgogne-Franche-Comté", departement: "Nièvre", statut: "privé",
    effectifs_total: 240, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro Aménagements Paysagers", "BTS Horticulture", "CS Jardins & Espaces Verts"],
    coordonnees: [47.36197, 3.40504]
  },

  {
    id: 122, nom: "LEAP de la Bresse", type: "CNEAP", uai: "0710122X",
    adresse: "600 avenue Fernand Point, LOUHANS",
    code_departement: "71", lat: 46.62345, lng: 5.23324,
    region: "Bourgogne-Franche-Comté", departement: "Saône-et-Loire", statut: "privé",
    effectifs_total: 265, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA", "BPREA Productions Animales", "CS Élevage Durable"],
    coordonnees: [46.62345, 5.23324]
  },

  {
    id: 123, nom: "LEPP Reine Antier", type: "CNEAP", uai: "0710123X",
    adresse: "14 rue des Combes, ST MARTIN EN BRESSE",
    code_departement: "71", lat: 46.81684, lng: 5.06058,
    region: "Bourgogne-Franche-Comté", departement: "Saône-et-Loire", statut: "privé",
    effectifs_total: 152, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA", "BPREA Productions Animales", "CS Élevage Durable"],
    coordonnees: [46.81684, 5.06058]
  },

  {
    id: 126, nom: "LEAP Notre Dame de Maubert-Fontaine", type: "CNEAP", uai: "0080126X",
    adresse: "18 rue du Château, MAUBERT FONTAINE",
    code_departement: "08", lat: 49.86925, lng: 4.43055,
    region: "Grand Est", departement: "Ardennes", statut: "privé",
    effectifs_total: 410, taux_remplissage: 79, taux_insertion: 77,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [49.86925, 4.43055]
  },

  {
    id: 127, nom: "Lycée des Cordeliers", type: "CNEAP", uai: "0100127X",
    adresse: "29 rue des Cordeliers, ARCIS SUR AUBE",
    code_departement: "10", lat: 48.35018, lng: 4.05459,
    region: "Grand Est", departement: "Aube", statut: "privé",
    effectifs_total: 324, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [48.35018, 4.05459]
  },

  {
    id: 128, nom: "Lycée Privé Sainte Maure", type: "CNEAP", uai: "0100128X",
    adresse: "105 route de Méry, SAINTE MAURE",
    code_departement: "10", lat: 49.86897, lng: 4.43085,
    region: "Grand Est", departement: "Aube", statut: "privé",
    effectifs_total: 344, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [49.86897, 4.43085]
  },

  {
    id: 129, nom: "Lycée La Salle Reims-Thillois", type: "CNEAP", uai: "0510129X",
    adresse: "4 rue des Ecoles, THILLOIS",
    code_departement: "51", lat: 49.25636, lng: 3.95584,
    region: "Grand Est", departement: "Marne", statut: "privé",
    effectifs_total: 366, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [49.25636, 3.95584]
  },

  {
    id: 130, nom: "Lycée Professionnel La Providence", type: "CNEAP", uai: "0880130X",
    adresse: "684 rue de la Mairie, HAROL",
    code_departement: "88", lat: 48.15301, lng: 6.25053,
    region: "Grand Est", departement: "Vosges", statut: "privé",
    effectifs_total: 190, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [48.15301, 6.25053]
  },

  {
    id: 131, nom: "LEAP Lycée Sainte Croix", type: "CNEAP", uai: "0590131X",
    adresse: "6 bis rue du Pont de Pierres, CAMBRAI",
    code_departement: "59", lat: 50.18672, lng: 3.23817,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 390, taux_remplissage: 89, taux_insertion: 87,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.18672, 3.23817]
  },

  {
    id: 132, nom: "Institut d'Anchin", type: "CNEAP", uai: "0590132X",
    adresse: "Abbaye d'Anchin - Route de Rieulay, PECQUENCOURT",
    code_departement: "59", lat: 50.38633, lng: 3.22067,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 260, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.38633, 3.22067]
  },

  {
    id: 133, nom: "Lycée Professionnel Saint Roch", type: "CNEAP", uai: "0590133X",
    adresse: "15/17 rue du Collège, ESTAIRES",
    code_departement: "59", lat: 50.64652, lng: 2.72036,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 225, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.64652, 2.72036]
  },

  {
    id: 134, nom: "Institut d'Hazebrouck", type: "CNEAP", uai: "0590134X",
    adresse: "69 Rue du Violon d'Or, HAZEBROUCK",
    code_departement: "59", lat: 50.72186, lng: 2.5292,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 227, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.72186, 2.5292]
  },

  {
    id: 135, nom: "Lycée Professionnel de Bavay", type: "CNEAP", uai: "0590135X",
    adresse: "5 rue de la Chaussée, BAVAY",
    code_departement: "59", lat: 50.29647, lng: 3.79177,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 222, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.29647, 3.79177]
  },

  {
    id: 136, nom: "GENECH Formation", type: "CNEAP", uai: "0590136X",
    adresse: "28 rue Victor Hugo, 59810 Lesquin", commune: "Genech",
    code_departement: "59", lat: 50.59064, lng: 3.1083,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 307, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.59064, 3.1083]
  },

  {
    id: 137, nom: "LEAP Charles Brasseur", type: "CNEAP", uai: "0590137X",
    adresse: "110 avenue Anthony Caro, BOURBOURG",
    code_departement: "59", lat: 50.95296, lng: 2.19444,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 395, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.95296, 2.19444]
  },

  {
    id: 138, nom: "IETP de Hoymille", type: "CNEAP", uai: "0590138X",
    adresse: "Route de Warhem, HOYMILLE",
    code_departement: "59", lat: 50.97263, lng: 2.46034,
    region: "Hauts-de-France", departement: "Nord", statut: "privé",
    effectifs_total: 165, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.97263, 2.46034]
  },

  {
    id: 139, nom: "LPEPA Saint Joseph de Cluny", type: "CNEAP", uai: "0600139X",
    adresse: "Place de l'Hotel de Ville, ESTREES ST DENIS",
    code_departement: "60", lat: 49.4268, lng: 2.64004,
    region: "Hauts-de-France", departement: "Oise", statut: "privé",
    effectifs_total: 154, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [49.4268, 2.64004]
  },

  {
    id: 140, nom: "Institut privé Charles Quentin", type: "CNEAP", uai: "0600140X",
    adresse: "1 rue Sabatier, PIERREFONDS",
    code_departement: "60", lat: 49.34591, lng: 2.97776,
    region: "Hauts-de-France", departement: "Oise", statut: "privé",
    effectifs_total: 194, taux_remplissage: 79, taux_insertion: 77,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [49.34591, 2.97776]
  },

  {
    id: 141, nom: "Institut Technique de Savy-Berlette", type: "CNEAP", uai: "0620141X",
    adresse: "22-24 ancienne Route Nationale, SAVY BERLETTE",
    code_departement: "62", lat: 50.34982, lng: 2.55754,
    region: "Hauts-de-France", departement: "Pas-de-Calais", statut: "privé",
    effectifs_total: 282, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.34982, 2.55754]
  },

  {
    id: 142, nom: "Institut Saint Eloi LEAP - UFA", type: "CNEAP", uai: "0620142X",
    adresse: "36 rue Marcellin Gaudefroy, BAPAUME",
    code_departement: "62", lat: 50.10229, lng: 2.84637,
    region: "Hauts-de-France", departement: "Pas-de-Calais", statut: "privé",
    effectifs_total: 191, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.10229, 2.84637]
  },

  {
    id: 143, nom: "LEAP Saint Joseph", type: "CNEAP", uai: "0620143X",
    adresse: "Rue du puits Mourant, BUCQUOY",
    code_departement: "62", lat: 50.14219, lng: 2.70691,
    region: "Hauts-de-France", departement: "Pas-de-Calais", statut: "privé",
    effectifs_total: 335, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.14219, 2.70691]
  },

  {
    id: 144, nom: "Lycée Sainte Marie", type: "CNEAP", uai: "0620144X",
    adresse: "52 rue d'Isbergues, AIRE SUR LA LYS",
    code_departement: "62", lat: 50.63805, lng: 2.4059,
    region: "Hauts-de-France", departement: "Pas-de-Calais", statut: "privé",
    effectifs_total: 243, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.63805, 2.4059]
  },

  {
    id: 145, nom: "Lycée de Coulogne", type: "CNEAP", uai: "0620145X",
    adresse: "Route Départementale 943, COULOGNE",
    code_departement: "62", lat: 50.9279, lng: 1.90074,
    region: "Hauts-de-France", departement: "Pas-de-Calais", statut: "privé",
    effectifs_total: 230, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [50.9279, 1.90074]
  },

  {
    id: 146, nom: "Lycée Sainte Colette - Campus des biotechnologies et de l'alimentation", type: "CNEAP", uai: "0800146X",
    adresse: "rue de l'enclos, CORBIE",
    code_departement: "80", lat: 49.90969, lng: 2.50952,
    region: "Hauts-de-France", departement: "Somme", statut: "privé",
    effectifs_total: 359, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "BTS ACSE"],
    coordonnees: [49.90969, 2.50952]
  },

  {
    id: 147, nom: "ESTA", type: "CNEAP", uai: "0780147X",
    adresse: "22 avenue de l'Europe, MAGNANVILLE",
    code_departement: "78", lat: 48.96587, lng: 1.67925,
    region: "Île-de-France", departement: "Yvelines", statut: "privé",
    effectifs_total: 329, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Maraîchage Bio", "CS Agriculture Péri-Urbaine"],
    coordonnees: [48.96587, 1.67925]
  },

  {
    id: 148, nom: "Campus le Buat", type: "CNEAP", uai: "0780148X",
    adresse: "21 rue du Buat, MAULE",
    code_departement: "78", lat: 48.90704, lng: 1.84329,
    region: "Île-de-France", departement: "Yvelines", statut: "privé",
    effectifs_total: 284, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Maraîchage Bio", "CS Agriculture Péri-Urbaine"],
    coordonnees: [48.90704, 1.84329]
  },

  {
    id: 149, nom: "Lycée La Salle Igny", type: "CNEAP", uai: "0910149X",
    adresse: "10 avenue de la division Leclerc, IGNY",
    code_departement: "91", lat: 48.74124, lng: 2.22811,
    region: "Île-de-France", departement: "Essonne", statut: "privé",
    effectifs_total: 239, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Maraîchage Bio", "CS Agriculture Péri-Urbaine"],
    coordonnees: [48.74124, 2.22811]
  },

  {
    id: 150, nom: "UFA Forges (Site de Magnanville)", type: "CNEAP", uai: "0770150X",
    adresse: "6 place de la Mairie, FORGES", commune: "Magnanville",
    code_departement: "77", lat: 48.41945, lng: 2.96144,
    region: "Île-de-France", departement: "Seine-et-Marne", statut: "privé",
    effectifs_total: 357, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Maraîchage", "BPREA Maraîchage Bio", "CS Agriculture Péri-Urbaine"],
    coordonnees: [48.41945, 2.96144]
  },

  {
    id: 151, nom: "Institut Lemonnier", type: "CNEAP", uai: "0140151X",
    adresse: "60 rue d'Hérouville, CAEN",
    code_departement: "14", lat: 49.19324, lng: -0.35102,
    region: "Normandie", departement: "Calvados", statut: "privé",
    effectifs_total: 357, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [49.19324, -0.35102]
  },

  {
    id: 152, nom: "Institut Lemonnier site de Caen", type: "CNEAP", uai: "0140152X",
    adresse: "1 rue du Prieuré, SAINT GABRIEL BRECY",
    code_departement: "14", lat: 49.19399, lng: -0.35,
    region: "Normandie", departement: "Calvados", statut: "privé",
    effectifs_total: 231, taux_remplissage: 88, taux_insertion: 86,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [49.19399, -0.35]
  },

  {
    id: 153, nom: "LEAP Tourville", type: "CNEAP", uai: "0270153X",
    adresse: "1711 Route de Lisieux, PONT AUDEMER",
    code_departement: "27", lat: 49.33159, lng: 0.50991,
    region: "Normandie", departement: "Eure", statut: "privé",
    effectifs_total: 163, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [49.33159, 0.50991]
  },

  {
    id: 154, nom: "Lycée Agricole La Salle Montebourg", type: "CNEAP", uai: "0500154X",
    adresse: "Route de Quinéville, MONTEBOURG",
    code_departement: "50", lat: 49.49012, lng: -1.37471,
    region: "Normandie", departement: "Manche", statut: "privé",
    effectifs_total: 365, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [49.49012, -1.37471]
  },

  {
    id: 155, nom: "LAP Giel Don Bosco", type: "CNEAP", uai: "0610155X",
    adresse: "Les Cours, GIEL COURTEILLES",
    code_departement: "61", lat: 48.75691, lng: -0.19749,
    region: "Normandie", departement: "Orne", statut: "privé",
    effectifs_total: 362, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.75691, -0.19749]
  },

  {
    id: 156, nom: "LEAP Yves VEREL", type: "CNEAP", uai: "0610156X",
    adresse: "route de Gacé, NONANT LE PIN",
    code_departement: "61", lat: 48.70941, lng: 0.22455,
    region: "Normandie", departement: "Orne", statut: "privé",
    effectifs_total: 352, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [48.70941, 0.22455]
  },

  {
    id: 157, nom: "Lycée Saint Joseph - Château de Mesnières", type: "CNEAP", uai: "0760157X",
    adresse: "Château de Mesnières en Bray, MESNIERES EN BRAY",
    code_departement: "76", lat: 49.76243, lng: 1.38181,
    region: "Normandie", departement: "Seine-Maritime", statut: "privé",
    effectifs_total: 358, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [49.76243, 1.38181]
  },

  {
    id: 158, nom: "LTPR Claire Champagne", type: "CNEAP", uai: "0160158X",
    adresse: "1 rue Malastiers, SEGONZAC",
    code_departement: "16", lat: 45.61799, lng: -0.22342,
    region: "Nouvelle-Aquitaine", departement: "Charente", statut: "privé",
    effectifs_total: 394, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [45.61799, -0.22342]
  },

  {
    id: 159, nom: "Lycée Privé Polyvalent Roc Fleuri", type: "CNEAP", uai: "0160159X",
    adresse: "6 boulevard des Grands Rocs, RUFFEC",
    code_departement: "16", lat: 46.03042, lng: 0.20257,
    region: "Nouvelle-Aquitaine", departement: "Charente", statut: "privé",
    effectifs_total: 308, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [46.03042, 0.20257]
  },

  {
    id: 160, nom: "LAP La Salle Saint Antoine", type: "CNEAP", uai: "0170160X",
    adresse: "Bois, SAINT GENIS DE SAINTONGE",
    code_departement: "17", lat: 45.46398, lng: -0.59993,
    region: "Nouvelle-Aquitaine", departement: "Charente-Maritime", statut: "privé",
    effectifs_total: 278, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [45.46398, -0.59993]
  },

  {
    id: 161, nom: "LEAP Le Cluzeau", type: "CNEAP", uai: "0240161X",
    adresse: "Le Cluzeau, SIGOULES",
    code_departement: "24", lat: 44.76513, lng: 0.41821,
    region: "Nouvelle-Aquitaine", departement: "Dordogne", statut: "privé",
    effectifs_total: 195, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [44.76513, 0.41821]
  },

  {
    id: 162, nom: "Collège et Lycée Saint-Clément", type: "CNEAP", uai: "0330162X",
    adresse: "Domaine de Labeyrie, CUDOS",
    code_departement: "33", lat: 44.39127, lng: -0.21361,
    region: "Nouvelle-Aquitaine", departement: "Gironde", statut: "privé",
    effectifs_total: 242, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [44.39127, -0.21361]
  },

  {
    id: 163, nom: "LPRP Sainte Elisabeth", type: "CNEAP", uai: "0400163X",
    adresse: "137 Route de la Vieille Côte, ST PANDELON",
    code_departement: "40", lat: 43.67213, lng: -1.04361,
    region: "Nouvelle-Aquitaine", departement: "Landes", statut: "privé",
    effectifs_total: 162, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.67213, -1.04361]
  },

  {
    id: 164, nom: "LEAP Saubrigues", type: "CNEAP", uai: "0400164X",
    adresse: "11 route des Mottes, SAUBRIGUES",
    code_departement: "40", lat: 43.60914, lng: -1.31541,
    region: "Nouvelle-Aquitaine", departement: "Landes", statut: "privé",
    effectifs_total: 254, taux_remplissage: 83, taux_insertion: 81,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.60914, -1.31541]
  },

  {
    id: 165, nom: "Lycée Oustal", type: "CNEAP", uai: "0470165X",
    adresse: "rue Paul Sabatier, VILLENEUVE SUR LOT", commune: "Villeneuve-sur-Lot",
    code_departement: "47", lat: 44.39354, lng: 0.73726,
    region: "Nouvelle-Aquitaine", departement: "Lot-et-Garonne", statut: "privé",
    effectifs_total: 338, taux_remplissage: 91, taux_insertion: 89,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [44.39354, 0.73726]
  },

  {
    id: 166, nom: "LEAP l'Ermitage", type: "CNEAP", uai: "0470166X",
    adresse: "304 avenue Joseph Amouroux, AGEN",
    code_departement: "47", lat: 44.21189, lng: 0.61885,
    region: "Nouvelle-Aquitaine", departement: "Lot-et-Garonne", statut: "privé",
    effectifs_total: 417, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [44.21189, 0.61885]
  },

  {
    id: 167, nom: "Lycée Notre Dame", type: "CNEAP", uai: "0640167X",
    adresse: "Route d'Oraàs, SAUVETERRE DE BEARN",
    code_departement: "64", lat: 43.40089, lng: -0.94423,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 187, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.40089, -0.94423]
  },

  {
    id: 168, nom: "Lycée Agricole Rural Privé de Soule", type: "CNEAP", uai: "0640168X",
    adresse: "Bixta Eder, BERROGAIN-LARUNS",
    code_departement: "64", lat: 43.24536, lng: -0.86755,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 148, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.24536, -0.86755]
  },

  {
    id: 169, nom: "LEAP Frantsesenia", type: "CNEAP", uai: "0640169X",
    adresse: "249 chemin de la Tannerie, ST JEAN PIED DE PORT",
    code_departement: "64", lat: 43.16753, lng: -1.2304,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 265, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.16753, -1.2304]
  },

  {
    id: 170, nom: "Lycée Armand David", type: "CNEAP", uai: "0640170X",
    adresse: "61 rue Léon Larreguin, HASPARREN",
    code_departement: "64", lat: 43.3818, lng: -1.30308,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 268, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.3818, -1.30308]
  },

  {
    id: 171, nom: "LTP Nay Baudreix", type: "CNEAP", uai: "0640171X",
    adresse: "Route de Lys, NAY",
    code_departement: "64", lat: 43.17272, lng: -0.26545,
    region: "Nouvelle-Aquitaine", departement: "Pyrénées-Atlantiques", statut: "privé",
    effectifs_total: 405, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.17272, -0.26545]
  },

  {
    id: 172, nom: "Lycée Profesionnel Agricole Privé Le Val de l'Ouin", type: "CNEAP", uai: "0790172X",
    adresse: "5 rue de la sagesse, MAULEON",
    code_departement: "79", lat: 46.92218, lng: -0.75215,
    region: "Nouvelle-Aquitaine", departement: "Deux-Sèvres", statut: "privé",
    effectifs_total: 337, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [46.92218, -0.75215]
  },

  {
    id: 173, nom: "Lycée La Perrière", type: "CNEAP", uai: "0860173X",
    adresse: "La Perrière, LA ROCHE RIGAULT",
    code_departement: "86", lat: 46.96881, lng: 0.17889,
    region: "Nouvelle-Aquitaine", departement: "Vienne", statut: "privé",
    effectifs_total: 175, taux_remplissage: 86, taux_insertion: 84,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [46.96881, 0.17889]
  },

  {
    id: 174, nom: "Institut L'Amandier", type: "CNEAP", uai: "0110174X",
    adresse: "27 chemin de la Roumenguière, LEZIGNAN CORBIERES",
    code_departement: "11", lat: 43.18991, lng: 2.76634,
    region: "Occitanie", departement: "Aude", statut: "privé",
    effectifs_total: 414, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.18991, 2.76634]
  },

  {
    id: 175, nom: "CPFP Lycée Agricole La Rouatière", type: "CNEAP", uai: "0110175X",
    adresse: "1165 route de Pastel, SOUILHANELS",
    code_departement: "11", lat: 43.35622, lng: 1.90307,
    region: "Occitanie", departement: "Aude", statut: "privé",
    effectifs_total: 327, taux_remplissage: 90, taux_insertion: 88,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.35622, 1.90307]
  },

  {
    id: 176, nom: "Institut Saint-Joseph", type: "CNEAP", uai: "0110176X",
    adresse: "26 avenue André Chénier, LIMOUX",
    code_departement: "11", lat: 43.35622, lng: 1.90307,
    region: "Occitanie", departement: "Aude", statut: "privé",
    effectifs_total: 144, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.35622, 1.90307]
  },

  {
    id: 177, nom: "Ecole Supérieure La Raque (Site de Limoux)", type: "CNEAP", uai: "0110177X",
    adresse: "RD 61113, LASBORDES",
    code_departement: "11", lat: 43.05881, lng: 2.22154,
    region: "Occitanie", departement: "Aude", statut: "privé",
    effectifs_total: 245, taux_remplissage: 80, taux_insertion: 78,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.05881, 2.22154]
  },

  {
    id: 178, nom: "LEAP Emilie de Rodat", type: "CNEAP", uai: "0110178X",
    adresse: "8 boulevard de Pins, PEZENS",
    code_departement: "11", lat: 43.25602, lng: 2.26494,
    region: "Occitanie", departement: "Aude", statut: "privé",
    effectifs_total: 185, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.25602, 2.26494]
  },

  {
    id: 179, nom: "Lycée Agricole Vaxergues", type: "CNEAP", uai: "0120179X",
    adresse: "23 rue Lamartine, ST AFFRIQUE",
    code_departement: "12", lat: 43.95773, lng: 2.89269,
    region: "Occitanie", departement: "Aveyron", statut: "privé",
    effectifs_total: 172, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.95773, 2.89269]
  },

  {
    id: 180, nom: "Lycée et institut François Marty", type: "CNEAP", uai: "0120180X",
    adresse: "348 chemin du Mas Castanié, MONTEILS",
    code_departement: "12", lat: 44.27092, lng: 1.99639,
    region: "Occitanie", departement: "Aveyron", statut: "privé",
    effectifs_total: 338, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [44.27092, 1.99639]
  },

  {
    id: 181, nom: "Lycée Privé François Marty (Site de Monteils)", type: "CNEAP", uai: "0120181X",
    adresse: "Boulevard Pénevayre, VILLEFRANCHE DE ROUERGUE",
    code_departement: "12", lat: 44.35517, lng: 2.04035,
    region: "Occitanie", departement: "Aveyron", statut: "privé",
    effectifs_total: 213, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [44.35517, 2.04035]
  },

  {
    id: 182, nom: "Lycée de Rignac", type: "CNEAP", uai: "0120182X",
    adresse: "21 avenue de Villefranche, RIGNAC",
    code_departement: "12", lat: 43.95695, lng: 2.89091,
    region: "Occitanie", departement: "Aveyron", statut: "privé",
    effectifs_total: 364, taux_remplissage: 89, taux_insertion: 87,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.95695, 2.89091]
  },

  {
    id: 183, nom: "Institut Emmanuel d'Alzon", type: "CNEAP", uai: "0300183X",
    adresse: "Château de Candiac, VESTRIC ET CANDIAC",
    code_departement: "30", lat: 43.71754, lng: 4.2649,
    region: "Occitanie", departement: "Gard", statut: "privé",
    effectifs_total: 206, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.71754, 4.2649]
  },

  {
    id: 184, nom: "LEPRP Le Savès", type: "CNEAP", uai: "0310184X",
    adresse: "7 place des Marchands, RIEUMES",
    code_departement: "31", lat: 43.53692, lng: 1.52217,
    region: "Occitanie", departement: "Haute-Garonne", statut: "privé",
    effectifs_total: 285, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.53692, 1.52217]
  },

  {
    id: 185, nom: "LEPRP l'Oustal", type: "CNEAP", uai: "0310185X",
    adresse: "Route de Paulhac, MONTASTRUC LA CONSEILLERE",
    code_departement: "31", lat: 43.41279, lng: 1.12032,
    region: "Occitanie", departement: "Haute-Garonne", statut: "privé",
    effectifs_total: 272, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.41279, 1.12032]
  },

  {
    id: 186, nom: "Lycée Saint François La Cadène", type: "CNEAP", uai: "0310186X",
    adresse: "200 rue Buissonnière, LABEGE",
    code_departement: "31", lat: 43.53692, lng: 1.52217,
    region: "Occitanie", departement: "Haute-Garonne", statut: "privé",
    effectifs_total: 235, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.53692, 1.52217]
  },

  {
    id: 187, nom: "LEAP Cestac La Gardiole", type: "CNEAP", uai: "0340187X",
    adresse: "2 rue du Couvent, GIGEAN",
    code_departement: "34", lat: 44.78744, lng: -0.58383,
    region: "Occitanie", departement: "Hérault", statut: "privé",
    effectifs_total: 399, taux_remplissage: 92, taux_insertion: 90,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [44.78744, -0.58383]
  },

  {
    id: 188, nom: "Lycée Agricole Bonne Terre", type: "CNEAP", uai: "0340188X",
    adresse: "Route de Béziers - Tourbes, PEZENAS",
    code_departement: "34", lat: 43.32759, lng: 3.04798,
    region: "Occitanie", departement: "Hérault", statut: "privé",
    effectifs_total: 238, taux_remplissage: 81, taux_insertion: 79,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.32759, 3.04798]
  },

  {
    id: 189, nom: "Lycée Professionnel Privé Le Roc Blanc", type: "CNEAP", uai: "0340189X",
    adresse: "1 rue de l'Albarède, GANGES",
    code_departement: "34", lat: 43.44082, lng: 3.40334,
    region: "Occitanie", departement: "Hérault", statut: "privé",
    effectifs_total: 392, taux_remplissage: 89, taux_insertion: 87,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.44082, 3.40334]
  },

  {
    id: 190, nom: "Institut Marie Sagnier", type: "CNEAP", uai: "0340190X",
    adresse: "2 avenue de la piscine, CLERMONT L'HERAULT",
    code_departement: "34", lat: 43.63171, lng: 3.43296,
    region: "Occitanie", departement: "Hérault", statut: "privé",
    effectifs_total: 350, taux_remplissage: 87, taux_insertion: 85,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [43.63171, 3.43296]
  },

  {
    id: 191, nom: "LEAP Le Mas Blanc", type: "CNEAP", uai: "0660191X",
    adresse: "22 avenue Emmanuel Brousse, BOURG MADAME",
    code_departement: "66", lat: 42.44162, lng: 1.94694,
    region: "Occitanie", departement: "Pyrénées-Orientales", statut: "privé",
    effectifs_total: 347, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [42.44162, 1.94694]
  },

  {
    id: 192, nom: "LEAP Beausoleil", type: "CNEAP", uai: "0660192X",
    adresse: "17 Rue Beausoleil, CERET",
    code_departement: "66", lat: 42.48905, lng: 2.74993,
    region: "Occitanie", departement: "Pyrénées-Orientales", statut: "privé",
    effectifs_total: 410, taux_remplissage: 77, taux_insertion: 75,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [42.48905, 2.74993]
  },

  {
    id: 193, nom: "Lycée Privé André Alquier", type: "CNEAP", uai: "0810193X",
    adresse: "Le Pont Neuf, ST AMANS SOULT",
    code_departement: "81", lat: 43.50396, lng: 2.18075,
    region: "Occitanie", departement: "Tarn", statut: "privé",
    effectifs_total: 242, taux_remplissage: 79, taux_insertion: 77,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.50396, 2.18075]
  },

  {
    id: 194, nom: "LEAP Lestonnac", type: "CNEAP", uai: "0820194X",
    adresse: "30 rue de la République, BEAUMONT DE LOMAGNE",
    code_departement: "82", lat: 43.88232, lng: 0.98611,
    region: "Occitanie", departement: "Tarn-et-Garonne", statut: "privé",
    effectifs_total: 382, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.88232, 0.98611]
  },

  {
    id: 195, nom: "Lycée Agricole Terre Nouvelle", type: "CNEAP", uai: "0480195X",
    adresse: "2 avenue des Martyrs de la Résistance, MARVEJOLS",
    code_departement: "48", lat: 44.55495, lng: 3.29312,
    region: "Occitanie", departement: "Lozère", statut: "privé",
    effectifs_total: 261, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [44.55495, 3.29312]
  },

  {
    id: 196, nom: "Campus Fontlongue", type: "CNEAP", uai: "0130196X",
    adresse: "Boulevard Théodore Aubanel, MIRAMAS",
    code_departement: "13", lat: 43.58848, lng: 4.99534,
    region: "Provence-Alpes-Côte d'Azur", departement: "Bouches-du-Rhône", statut: "privé",
    effectifs_total: 337, taux_remplissage: 84, taux_insertion: 82,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.58848, 4.99534]
  },

  {
    id: 197, nom: "Lycée Privé Provence Verte", type: "CNEAP", uai: "0830197X",
    adresse: "Chemin du Prugnon, ST MAXIMIN LA STE BAUME",
    code_departement: "83", lat: 43.45737, lng: 5.86102,
    region: "Provence-Alpes-Côte d'Azur", departement: "Var", statut: "privé",
    effectifs_total: 209, taux_remplissage: 76, taux_insertion: 74,
    formations: ["Bac Pro CGEA", "BPREA", "Bac Pro SAPAT", "CS Agriculture Durable"],
    coordonnees: [43.45737, 5.86102]
  },

  {
    id: 198, nom: "Lycée Professionnel et Technologique Les Chênes", type: "CNEAP", uai: "0840198X",
    adresse: "524 avenue du Pont des Fontaines, CARPENTRAS",
    code_departement: "84", lat: 44.06094, lng: 5.05551,
    region: "Provence-Alpes-Côte d'Azur", departement: "Vaucluse", statut: "privé",
    effectifs_total: 396, taux_remplissage: 75, taux_insertion: 73,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [44.06094, 5.05551]
  },

  {
    id: 199, nom: "Lycée d'Enseignement Professionnel Agricole Privé Saint Jean le Baptiste", type: "CNEAP", uai: "0840199X",
    adresse: "rue des Ursulines, VALREAS",
    code_departement: "84", lat: 44.38562, lng: 4.98956,
    region: "Provence-Alpes-Côte d'Azur", departement: "Vaucluse", statut: "privé",
    effectifs_total: 268, taux_remplissage: 85, taux_insertion: 83,
    formations: ["Bac Pro CGEA Grandes Cultures", "BPREA Productions Végétales", "Bac Pro SAPAT"],
    coordonnees: [44.38562, 4.98956]
  },

  {
    id: 200, nom: "Lycée St Gabriel (Site Le Pellerin)", type: "CNEAP", uai: "0440200X",
    adresse: "17 rue Abbé Perrin, SAINT PÈRE EN RETZ",
    code_departement: "44", lat: 47.20527, lng: -2.04279,
    region: "Pays de la Loire", departement: "Loire-Atlantique", statut: "privé",
    effectifs_total: 375, taux_remplissage: 82, taux_insertion: 80,
    formations: ["Bac Pro CGEA Élevages Bovins Lait", "BPREA Bovins Lait", "Bac Pro SAPAT"],
    coordonnees: [47.20527, -2.04279]
  },

// Total new: 112, IDs 89–200
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
  },
  "01": {
    nom: "Ain", region: "Auvergne-Rhône-Alpes",
    population: 660000, evolution_pop_10ans: 8.4,
    sau_ha: 238000, nb_exploitations: 4200, evolution_exploitations: -6.2,
    part_exploitants_55plus: 46, emplois_agricoles: 8600, evolution_emplois: -3.1,
    part_bio: 9.8, taux_chomage: 7.2, score_attractivite: 68,
    indice_dynamisme: 62, indice_tension_emploi: 58, indice_vieillissement: 46,
    metiers_tension: ["Éleveur volailles Bresse AOP", "Maraîcher BIO", "Technicien agricole"],
    filieres_dev: ["Volailles de Bresse AOP", "Maraîchage péri-urbain", "Agriculture BIO"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 720000, score_vulnerabilite: 4
  },
  "03": {
    nom: "Allier", region: "Auvergne-Rhône-Alpes",
    population: 336000, evolution_pop_10ans: -2.8,
    sau_ha: 490000, nb_exploitations: 5800, evolution_exploitations: -9.4,
    part_exploitants_55plus: 57, emplois_agricoles: 9200, evolution_emplois: -5.8,
    part_bio: 7.1, taux_chomage: 10.2, score_attractivite: 42,
    indice_dynamisme: 35, indice_tension_emploi: 44, indice_vieillissement: 57,
    metiers_tension: ["Éleveur bovin allaitant", "Éleveur ovin", "Fromager AOP"],
    filieres_dev: ["Élevage BIO allaitant", "Circuits courts viande", "Agroforesterie"],
    filieres_declin: ["Grandes cultures céréalières", "Élevage laitier intensif"],
    projection_pop_2035: 315000, score_vulnerabilite: 8
  },
  "07": {
    nom: "Ardèche", region: "Auvergne-Rhône-Alpes",
    population: 324000, evolution_pop_10ans: 2.1,
    sau_ha: 142000, nb_exploitations: 4800, evolution_exploitations: -5.1,
    part_exploitants_55plus: 52, emplois_agricoles: 6400, evolution_emplois: -2.4,
    part_bio: 15.2, taux_chomage: 10.8, score_attractivite: 55,
    indice_dynamisme: 48, indice_tension_emploi: 53, indice_vieillissement: 52,
    metiers_tension: ["Maraîcher montagne", "Vigneron naturel", "Éleveur caprin fromager"],
    filieres_dev: ["Viticulture naturelle Ardèche", "Châtaigneraie", "Élevage caprin AOP"],
    filieres_declin: ["Sériciculture"],
    projection_pop_2035: 320000, score_vulnerabilite: 6
  },
  "08": {
    nom: "Ardennes", region: "Grand Est",
    population: 278000, evolution_pop_10ans: -4.5,
    sau_ha: 360000, nb_exploitations: 2900, evolution_exploitations: -10.2,
    part_exploitants_55plus: 55, emplois_agricoles: 5800, evolution_emplois: -6.4,
    part_bio: 4.2, taux_chomage: 13.1, score_attractivite: 35,
    indice_dynamisme: 28, indice_tension_emploi: 38, indice_vieillissement: 55,
    metiers_tension: ["Céréaliculteur", "Éleveur bovin lait", "Technicien grandes cultures"],
    filieres_dev: ["Grandes cultures BIO conversion", "Légumineuses", "Agroforesterie"],
    filieres_declin: ["Bovins lait intensif", "Betterave sucrière"],
    projection_pop_2035: 258000, score_vulnerabilite: 9
  },
  "10": {
    nom: "Aube", region: "Grand Est",
    population: 308000, evolution_pop_10ans: -0.4,
    sau_ha: 444000, nb_exploitations: 2800, evolution_exploitations: -8.6,
    part_exploitants_55plus: 52, emplois_agricoles: 6200, evolution_emplois: -4.2,
    part_bio: 5.1, taux_chomage: 10.5, score_attractivite: 48,
    indice_dynamisme: 42, indice_tension_emploi: 46, indice_vieillissement: 52,
    metiers_tension: ["Vigneron Champagne", "Céréaliculteur BIO", "Technicien viticole"],
    filieres_dev: ["Champagne AOC", "Grandes cultures durables", "Légumineuses protéagineuses"],
    filieres_declin: ["Betterave sucrière conventionnelle"],
    projection_pop_2035: 300000, score_vulnerabilite: 6
  },
  "11": {
    nom: "Aude", region: "Occitanie",
    population: 374000, evolution_pop_10ans: 5.8,
    sau_ha: 310000, nb_exploitations: 7200, evolution_exploitations: -4.8,
    part_exploitants_55plus: 50, emplois_agricoles: 12500, evolution_emplois: -1.2,
    part_bio: 17.4, taux_chomage: 12.8, score_attractivite: 58,
    indice_dynamisme: 52, indice_tension_emploi: 58, indice_vieillissement: 50,
    metiers_tension: ["Vigneron BIO Languedoc", "Maraîcher", "Oléiculteur"],
    filieres_dev: ["Viticulture BIO", "Huile d'olive AOP", "Agritourisme"],
    filieres_declin: ["Viticulture conventionnelle de masse"],
    projection_pop_2035: 405000, score_vulnerabilite: 5
  },
  "15": {
    nom: "Cantal", region: "Auvergne-Rhône-Alpes",
    population: 142000, evolution_pop_10ans: -3.1,
    sau_ha: 580000, nb_exploitations: 4600, evolution_exploitations: -7.8,
    part_exploitants_55plus: 56, emplois_agricoles: 7800, evolution_emplois: -5.2,
    part_bio: 10.5, taux_chomage: 7.8, score_attractivite: 45,
    indice_dynamisme: 38, indice_tension_emploi: 48, indice_vieillissement: 56,
    metiers_tension: ["Éleveur bovin allaitant Salers", "Fromager AOP Cantal/Salers", "Berger transhumant"],
    filieres_dev: ["AOP Cantal & Salers", "Élevage BIO montagne", "Agritourisme pastoral"],
    filieres_declin: ["Lait conventionnel"],
    projection_pop_2035: 132000, score_vulnerabilite: 8
  },
  "16": {
    nom: "Charente", region: "Nouvelle-Aquitaine",
    population: 355000, evolution_pop_10ans: 1.4,
    sau_ha: 458000, nb_exploitations: 5200, evolution_exploitations: -6.8,
    part_exploitants_55plus: 51, emplois_agricoles: 9400, evolution_emplois: -3.5,
    part_bio: 7.8, taux_chomage: 9.4, score_attractivite: 55,
    indice_dynamisme: 50, indice_tension_emploi: 52, indice_vieillissement: 51,
    metiers_tension: ["Vigneron Cognac", "Éleveur caprin chèvre Poitou", "Maraîcher"],
    filieres_dev: ["Cognac AOC", "Fromage de Chèvre Poitou AOP", "Grandes cultures BIO"],
    filieres_declin: ["Bovins lait conventionnel"],
    projection_pop_2035: 358000, score_vulnerabilite: 5
  },
  "17": {
    nom: "Charente-Maritime", region: "Nouvelle-Aquitaine",
    population: 652000, evolution_pop_10ans: 7.6,
    sau_ha: 498000, nb_exploitations: 6800, evolution_exploitations: -5.2,
    part_exploitants_55plus: 49, emplois_agricoles: 11200, evolution_emplois: -1.8,
    part_bio: 9.2, taux_chomage: 8.6, score_attractivite: 68,
    indice_dynamisme: 62, indice_tension_emploi: 58, indice_vieillissement: 49,
    metiers_tension: ["Ostréiculteur", "Vigneron Cognac/Pineau", "Maraîcher littoral"],
    filieres_dev: ["Ostréiculture", "Pineau des Charentes AOP", "Agriculture littorale BIO"],
    filieres_declin: ["Grandes cultures intensives"],
    projection_pop_2035: 705000, score_vulnerabilite: 4
  },
  "25": {
    nom: "Doubs", region: "Bourgogne-Franche-Comté",
    population: 542000, evolution_pop_10ans: 2.1,
    sau_ha: 282000, nb_exploitations: 3800, evolution_exploitations: -7.4,
    part_exploitants_55plus: 50, emplois_agricoles: 7200, evolution_emplois: -3.8,
    part_bio: 10.4, taux_chomage: 7.8, score_attractivite: 58,
    indice_dynamisme: 52, indice_tension_emploi: 54, indice_vieillissement: 50,
    metiers_tension: ["Éleveur Montbéliarde fromage", "Fromager Comté AOP", "Sylviculteur"],
    filieres_dev: ["AOP Comté (1ère AOP fromage France)", "Élevage BIO Montbéliard", "Agroforesterie"],
    filieres_declin: ["Lait industriel"],
    projection_pop_2035: 555000, score_vulnerabilite: 5
  },
  "26": {
    nom: "Drôme", region: "Auvergne-Rhône-Alpes",
    population: 520000, evolution_pop_10ans: 6.4,
    sau_ha: 330000, nb_exploitations: 5600, evolution_exploitations: -4.2,
    part_exploitants_55plus: 48, emplois_agricoles: 10800, evolution_emplois: -0.8,
    part_bio: 22.4, taux_chomage: 9.4, score_attractivite: 66,
    indice_dynamisme: 60, indice_tension_emploi: 62, indice_vieillissement: 48,
    metiers_tension: ["Arboriculteur BIO", "Maraîcher", "Producteur lavande/aromates"],
    filieres_dev: ["Agriculture BIO (1er dept France)", "Lavande & aromates", "Arboriculture"],
    filieres_declin: ["Grandes cultures conventionnelles"],
    projection_pop_2035: 572000, score_vulnerabilite: 4
  },
  "27": {
    nom: "Eure", region: "Normandie",
    population: 602000, evolution_pop_10ans: 1.8,
    sau_ha: 558000, nb_exploitations: 4400, evolution_exploitations: -8.8,
    part_exploitants_55plus: 52, emplois_agricoles: 9600, evolution_emplois: -4.9,
    part_bio: 5.8, taux_chomage: 9.2, score_attractivite: 52,
    indice_dynamisme: 46, indice_tension_emploi: 50, indice_vieillissement: 52,
    metiers_tension: ["Éleveur laitier normand", "Céréaliculteur", "Arboriculteur pommes/poires"],
    filieres_dev: ["Cidre & Calvados AOP", "Élevage laitier BIO", "Légumes plein champ"],
    filieres_declin: ["Betterave sucrière", "Grandes cultures extensives"],
    projection_pop_2035: 608000, score_vulnerabilite: 6
  },
  "30": {
    nom: "Gard", region: "Occitanie",
    population: 748000, evolution_pop_10ans: 7.2,
    sau_ha: 280000, nb_exploitations: 8400, evolution_exploitations: -3.8,
    part_exploitants_55plus: 51, emplois_agricoles: 14600, evolution_emplois: 0.4,
    part_bio: 16.8, taux_chomage: 12.4, score_attractivite: 62,
    indice_dynamisme: 56, indice_tension_emploi: 60, indice_vieillissement: 51,
    metiers_tension: ["Vigneron BIO Languedoc", "Maraîcher méditerranéen", "Oléiculteur"],
    filieres_dev: ["Viticulture BIO Costières", "Maraîchage sous abri", "Oliviers AOP"],
    filieres_declin: ["Viticulture conventionnelle"],
    projection_pop_2035: 820000, score_vulnerabilite: 5
  },
  "40": {
    nom: "Landes", region: "Nouvelle-Aquitaine",
    population: 420000, evolution_pop_10ans: 8.4,
    sau_ha: 428000, nb_exploitations: 4800, evolution_exploitations: -4.6,
    part_exploitants_55plus: 48, emplois_agricoles: 9200, evolution_emplois: 0.8,
    part_bio: 7.4, taux_chomage: 7.8, score_attractivite: 68,
    indice_dynamisme: 62, indice_tension_emploi: 58, indice_vieillissement: 48,
    metiers_tension: ["Éleveur volailles Landes IGP", "Producteur foie gras", "Sylviculteur pin maritime"],
    filieres_dev: ["Volailles fermières Landes IGP", "Foie gras Label Rouge", "Sylviculture durable"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 468000, score_vulnerabilite: 4
  },
  "42": {
    nom: "Loire", region: "Auvergne-Rhône-Alpes",
    population: 760000, evolution_pop_10ans: 1.2,
    sau_ha: 290000, nb_exploitations: 4600, evolution_exploitations: -7.2,
    part_exploitants_55plus: 51, emplois_agricoles: 8400, evolution_emplois: -3.8,
    part_bio: 8.6, taux_chomage: 9.2, score_attractivite: 56,
    indice_dynamisme: 50, indice_tension_emploi: 54, indice_vieillissement: 51,
    metiers_tension: ["Éleveur bovin", "Maraîcher péri-urbain", "Technicien agricole"],
    filieres_dev: ["Agriculture péri-urbaine BIO", "Élevage allaitant charolais", "Circuits courts"],
    filieres_declin: ["Bovins lait intensif"],
    projection_pop_2035: 765000, score_vulnerabilite: 5
  },
  "43": {
    nom: "Haute-Loire", region: "Auvergne-Rhône-Alpes",
    population: 226000, evolution_pop_10ans: -0.8,
    sau_ha: 310000, nb_exploitations: 5200, evolution_exploitations: -8.4,
    part_exploitants_55plus: 54, emplois_agricoles: 7400, evolution_emplois: -4.6,
    part_bio: 8.2, taux_chomage: 8.4, score_attractivite: 48,
    indice_dynamisme: 42, indice_tension_emploi: 50, indice_vieillissement: 54,
    metiers_tension: ["Éleveur bovin lait/allaitant", "Producteur lentilles du Puy", "Fromager"],
    filieres_dev: ["Lentille verte du Puy AOC", "Élevage montagne BIO", "Fromages artisanaux"],
    filieres_declin: ["Lait conventionnel"],
    projection_pop_2035: 218000, score_vulnerabilite: 7
  },
  "47": {
    nom: "Lot-et-Garonne", region: "Nouvelle-Aquitaine",
    population: 330000, evolution_pop_10ans: 0.6,
    sau_ha: 380000, nb_exploitations: 6800, evolution_exploitations: -6.4,
    part_exploitants_55plus: 52, emplois_agricoles: 10200, evolution_emplois: -2.8,
    part_bio: 10.8, taux_chomage: 10.2, score_attractivite: 52,
    indice_dynamisme: 48, indice_tension_emploi: 54, indice_vieillissement: 52,
    metiers_tension: ["Arboriculteur fruits rouges/pruneaux", "Maraîcher", "Vigneron Buzet"],
    filieres_dev: ["Pruneaux d'Agen IGP", "Fraises et fruits rouges", "Maraîchage BIO"],
    filieres_declin: ["Tabac", "Grandes cultures extensives"],
    projection_pop_2035: 330000, score_vulnerabilite: 6
  },
  "48": {
    nom: "Lozère", region: "Occitanie",
    population: 76000, evolution_pop_10ans: -1.2,
    sau_ha: 620000, nb_exploitations: 3800, evolution_exploitations: -7.6,
    part_exploitants_55plus: 57, emplois_agricoles: 5600, evolution_emplois: -4.8,
    part_bio: 12.4, taux_chomage: 8.6, score_attractivite: 42,
    indice_dynamisme: 36, indice_tension_emploi: 46, indice_vieillissement: 57,
    metiers_tension: ["Éleveur ovin lait Roquefort", "Berger transhumant", "Fromager AOP"],
    filieres_dev: ["Lait Roquefort AOP", "Élevage bovin Aubrac BIO", "Agritourisme pastoral"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 73000, score_vulnerabilite: 8
  },
  "50": {
    nom: "Manche", region: "Normandie",
    population: 498000, evolution_pop_10ans: -0.2,
    sau_ha: 620000, nb_exploitations: 7400, evolution_exploitations: -7.8,
    part_exploitants_55plus: 53, emplois_agricoles: 12400, evolution_emplois: -4.2,
    part_bio: 6.4, taux_chomage: 7.8, score_attractivite: 50,
    indice_dynamisme: 44, indice_tension_emploi: 50, indice_vieillissement: 53,
    metiers_tension: ["Éleveur laitier normand", "Producteur Cotentin/Mont-Saint-Michel", "Ostréiculteur"],
    filieres_dev: ["Agneaux du Mont-Saint-Michel AOP", "Lait BIO normand", "Pêche côtière"],
    filieres_declin: ["Bovins lait intensif"],
    projection_pop_2035: 488000, score_vulnerabilite: 6
  },
  "51": {
    nom: "Marne", region: "Grand Est",
    population: 568000, evolution_pop_10ans: -1.2,
    sau_ha: 585000, nb_exploitations: 3200, evolution_exploitations: -7.4,
    part_exploitants_55plus: 50, emplois_agricoles: 9400, evolution_emplois: -3.8,
    part_bio: 4.6, taux_chomage: 8.8, score_attractivite: 58,
    indice_dynamisme: 54, indice_tension_emploi: 52, indice_vieillissement: 50,
    metiers_tension: ["Vigneron Champagne AOC", "Céréaliculteur", "Technicien viticole"],
    filieres_dev: ["Champagne AOC (1er vignoble mondial)", "Grandes cultures durables", "Sucre BIO"],
    filieres_declin: ["Betterave sucrière conventionnelle"],
    projection_pop_2035: 555000, score_vulnerabilite: 5
  },
  "58": {
    nom: "Nièvre", region: "Bourgogne-Franche-Comté",
    population: 206000, evolution_pop_10ans: -4.8,
    sau_ha: 420000, nb_exploitations: 4200, evolution_exploitations: -9.8,
    part_exploitants_55plus: 58, emplois_agricoles: 6800, evolution_emplois: -6.2,
    part_bio: 8.4, taux_chomage: 10.8, score_attractivite: 38,
    indice_dynamisme: 32, indice_tension_emploi: 42, indice_vieillissement: 58,
    metiers_tension: ["Éleveur Charolais", "Sylviculteur", "Vigneron Pouilly Fumé"],
    filieres_dev: ["Charolais BIO", "Pouilly Fumé AOC", "Sylviculture durable"],
    filieres_declin: ["Grandes cultures extensives", "Bovins lait"],
    projection_pop_2035: 190000, score_vulnerabilite: 9
  },
  "60": {
    nom: "Oise", region: "Hauts-de-France",
    population: 826000, evolution_pop_10ans: 2.4,
    sau_ha: 512000, nb_exploitations: 3800, evolution_exploitations: -6.8,
    part_exploitants_55plus: 49, emplois_agricoles: 9800, evolution_emplois: -2.8,
    part_bio: 5.2, taux_chomage: 9.8, score_attractivite: 58,
    indice_dynamisme: 52, indice_tension_emploi: 54, indice_vieillissement: 49,
    metiers_tension: ["Céréaliculteur", "Producteur betterave", "Technicien grandes cultures"],
    filieres_dev: ["Grandes cultures durables", "Légumineuses", "Maraîchage péri-urbain"],
    filieres_declin: ["Betterave sucrière conventionnelle"],
    projection_pop_2035: 872000, score_vulnerabilite: 5
  },
  "61": {
    nom: "Orne", region: "Normandie",
    population: 278000, evolution_pop_10ans: -2.8,
    sau_ha: 498000, nb_exploitations: 5200, evolution_exploitations: -9.2,
    part_exploitants_55plus: 55, emplois_agricoles: 9400, evolution_emplois: -5.8,
    part_bio: 6.8, taux_chomage: 8.8, score_attractivite: 44,
    indice_dynamisme: 38, indice_tension_emploi: 46, indice_vieillissement: 55,
    metiers_tension: ["Éleveur Percheron/Haflinger", "Producteur Camembert AOP", "Céréaliculteur"],
    filieres_dev: ["Camembert de Normandie AOP", "Équiculture", "Cidre Pays d'Auge AOC"],
    filieres_declin: ["Bovins lait conventionnel"],
    projection_pop_2035: 262000, score_vulnerabilite: 8
  },
  "62": {
    nom: "Pas-de-Calais", region: "Hauts-de-France",
    population: 1470000, evolution_pop_10ans: -0.4,
    sau_ha: 620000, nb_exploitations: 5800, evolution_exploitations: -7.4,
    part_exploitants_55plus: 51, emplois_agricoles: 14200, evolution_emplois: -3.8,
    part_bio: 4.8, taux_chomage: 13.4, score_attractivite: 48,
    indice_dynamisme: 42, indice_tension_emploi: 50, indice_vieillissement: 51,
    metiers_tension: ["Céréaliculteur", "Éleveur bovin", "Maraîcher légumes plein champ"],
    filieres_dev: ["Légumes de plein champ", "BIO grandes cultures", "Circuits courts"],
    filieres_declin: ["Betterave sucrière", "Pomme de terre industrie"],
    projection_pop_2035: 1440000, score_vulnerabilite: 6
  },
  "66": {
    nom: "Pyrénées-Orientales", region: "Occitanie",
    population: 478000, evolution_pop_10ans: 6.8,
    sau_ha: 168000, nb_exploitations: 6400, evolution_exploitations: -4.2,
    part_exploitants_55plus: 52, emplois_agricoles: 10400, evolution_emplois: 0.2,
    part_bio: 20.2, taux_chomage: 14.8, score_attractivite: 62,
    indice_dynamisme: 56, indice_tension_emploi: 62, indice_vieillissement: 52,
    metiers_tension: ["Vigneron Roussillon BIO", "Arboriculteur abricots/pêches", "Maraîcher"],
    filieres_dev: ["Vins naturels Roussillon", "Fruits méditerranéens BIO", "Maraîchage"],
    filieres_declin: ["Viticulture conventionnelle"],
    projection_pop_2035: 525000, score_vulnerabilite: 5
  },
  "71": {
    nom: "Saône-et-Loire", region: "Bourgogne-Franche-Comté",
    population: 554000, evolution_pop_10ans: -1.2,
    sau_ha: 576000, nb_exploitations: 7400, evolution_exploitations: -7.8,
    part_exploitants_55plus: 53, emplois_agricoles: 11200, evolution_emplois: -4.4,
    part_bio: 9.2, taux_chomage: 9.2, score_attractivite: 54,
    indice_dynamisme: 48, indice_tension_emploi: 52, indice_vieillissement: 53,
    metiers_tension: ["Vigneron Mâconnais/Côte Chalonnaise", "Éleveur Charolais", "Fromager Chaource"],
    filieres_dev: ["Vins Mâconnais AOC", "Charolais BIO", "Grandes cultures durables"],
    filieres_declin: ["Bovins lait intensif"],
    projection_pop_2035: 540000, score_vulnerabilite: 6
  },
  "77": {
    nom: "Seine-et-Marne", region: "Île-de-France",
    population: 1418000, evolution_pop_10ans: 5.8,
    sau_ha: 442000, nb_exploitations: 2200, evolution_exploitations: -5.6,
    part_exploitants_55plus: 46, emplois_agricoles: 6200, evolution_emplois: -1.2,
    part_bio: 8.2, taux_chomage: 7.4, score_attractivite: 68,
    indice_dynamisme: 64, indice_tension_emploi: 62, indice_vieillissement: 46,
    metiers_tension: ["Maraîcher péri-urbain", "Céréaliculteur", "Technicien espaces verts"],
    filieres_dev: ["Maraîchage péri-urbain BIO", "Circuits courts Île-de-France", "Grandes cultures durables"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 1560000, score_vulnerabilite: 4
  },
  "78": {
    nom: "Yvelines", region: "Île-de-France",
    population: 1454000, evolution_pop_10ans: 2.4,
    sau_ha: 148000, nb_exploitations: 780, evolution_exploitations: -5.2,
    part_exploitants_55plus: 44, emplois_agricoles: 2800, evolution_emplois: -0.8,
    part_bio: 9.6, taux_chomage: 7.2, score_attractivite: 72,
    indice_dynamisme: 66, indice_tension_emploi: 64, indice_vieillissement: 44,
    metiers_tension: ["Maraîcher BIO péri-urbain", "Paysagiste agricole", "Technicien espaces verts"],
    filieres_dev: ["Maraîchage BIO", "Espaces verts durables", "Agriculture de loisir"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 1520000, score_vulnerabilite: 3
  },
  "79": {
    nom: "Deux-Sèvres", region: "Nouvelle-Aquitaine",
    population: 375000, evolution_pop_10ans: 0.4,
    sau_ha: 518000, nb_exploitations: 6400, evolution_exploitations: -7.2,
    part_exploitants_55plus: 52, emplois_agricoles: 9600, evolution_emplois: -3.8,
    part_bio: 8.8, taux_chomage: 8.6, score_attractivite: 52,
    indice_dynamisme: 46, indice_tension_emploi: 52, indice_vieillissement: 52,
    metiers_tension: ["Éleveur caprin Chèvre du Poitou", "Éleveur bovin", "Maraîcher"],
    filieres_dev: ["Chèvre du Poitou AOP", "Élevage BIO allaitant", "Circuits courts"],
    filieres_declin: ["Bovins lait conventionnel"],
    projection_pop_2035: 372000, score_vulnerabilite: 6
  },
  "80": {
    nom: "Somme", region: "Hauts-de-France",
    population: 572000, evolution_pop_10ans: -0.6,
    sau_ha: 570000, nb_exploitations: 4600, evolution_exploitations: -8.4,
    part_exploitants_55plus: 52, emplois_agricoles: 10800, evolution_emplois: -4.8,
    part_bio: 4.4, taux_chomage: 11.4, score_attractivite: 44,
    indice_dynamisme: 38, indice_tension_emploi: 46, indice_vieillissement: 52,
    metiers_tension: ["Céréaliculteur", "Éleveur bovin", "Producteur légumes plein champ"],
    filieres_dev: ["Légumes plein champ", "BIO céréales", "Maraîchage"],
    filieres_declin: ["Betterave sucrière conventionnelle", "Pomme de terre industrie"],
    projection_pop_2035: 558000, score_vulnerabilite: 7
  },
  "82": {
    nom: "Tarn-et-Garonne", region: "Occitanie",
    population: 260000, evolution_pop_10ans: 5.4,
    sau_ha: 278000, nb_exploitations: 5200, evolution_exploitations: -4.8,
    part_exploitants_55plus: 50, emplois_agricoles: 8200, evolution_emplois: -1.4,
    part_bio: 11.2, taux_chomage: 10.8, score_attractivite: 58,
    indice_dynamisme: 52, indice_tension_emploi: 56, indice_vieillissement: 50,
    metiers_tension: ["Arboriculteur chasselas/raisin", "Maraîcher", "Vigneron Fronton"],
    filieres_dev: ["Chasselas de Moissac AOP", "Fruits et maraîchage BIO", "Vins AOC Fronton"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 285000, score_vulnerabilite: 5
  },
  "83": {
    nom: "Var", region: "Provence-Alpes-Côte d'Azur",
    population: 1076000, evolution_pop_10ans: 7.2,
    sau_ha: 108000, nb_exploitations: 5400, evolution_exploitations: -3.2,
    part_exploitants_55plus: 51, emplois_agricoles: 8800, evolution_emplois: 1.2,
    part_bio: 16.8, taux_chomage: 9.8, score_attractivite: 72,
    indice_dynamisme: 66, indice_tension_emploi: 64, indice_vieillissement: 51,
    metiers_tension: ["Vigneron Côtes de Provence BIO", "Oléiculteur", "Maraîcher méditerranéen"],
    filieres_dev: ["Vins Provence Rosé (1er rosé mondial)", "Huile olive AOP", "Agritourisme"],
    filieres_declin: ["Agriculture intensive sous serre"],
    projection_pop_2035: 1200000, score_vulnerabilite: 4
  },
  "84": {
    nom: "Vaucluse", region: "Provence-Alpes-Côte d'Azur",
    population: 558000, evolution_pop_10ans: 3.8,
    sau_ha: 168000, nb_exploitations: 6800, evolution_exploitations: -4.2,
    part_exploitants_55plus: 51, emplois_agricoles: 12400, evolution_emplois: -0.4,
    part_bio: 18.4, taux_chomage: 11.2, score_attractivite: 64,
    indice_dynamisme: 58, indice_tension_emploi: 62, indice_vieillissement: 51,
    metiers_tension: ["Vigneron Châteauneuf-du-Pape/Côtes du Rhône", "Maraîcher Luberon", "Arboriculteur cerises"],
    filieres_dev: ["AOC Châteauneuf-du-Pape", "Maraîchage Luberon BIO", "Cerises et fruits du Vaucluse"],
    filieres_declin: ["Grandes cultures conventionnelles"],
    projection_pop_2035: 600000, score_vulnerabilite: 5
  },
  "88": {
    nom: "Vosges", region: "Grand Est",
    population: 366000, evolution_pop_10ans: -3.6,
    sau_ha: 298000, nb_exploitations: 3400, evolution_exploitations: -8.8,
    part_exploitants_55plus: 54, emplois_agricoles: 6200, evolution_emplois: -5.4,
    part_bio: 7.2, taux_chomage: 10.4, score_attractivite: 44,
    indice_dynamisme: 38, indice_tension_emploi: 46, indice_vieillissement: 54,
    metiers_tension: ["Éleveur laitier vosgien", "Fromager Munster AOP", "Sylviculteur"],
    filieres_dev: ["Munster AOP", "Élevage BIO montagne vosges", "Sylviculture durable"],
    filieres_declin: ["Bovins lait conventionnel"],
    projection_pop_2035: 348000, score_vulnerabilite: 7
  },
  "91": {
    nom: "Essonne", region: "Île-de-France",
    population: 1304000, evolution_pop_10ans: 4.2,
    sau_ha: 98000, nb_exploitations: 640, evolution_exploitations: -4.8,
    part_exploitants_55plus: 46, emplois_agricoles: 2200, evolution_emplois: -1.2,
    part_bio: 10.4, taux_chomage: 7.8, score_attractivite: 68,
    indice_dynamisme: 64, indice_tension_emploi: 62, indice_vieillissement: 46,
    metiers_tension: ["Maraîcher péri-urbain BIO", "Paysagiste", "Technicien espaces verts"],
    filieres_dev: ["Maraîchage BIO péri-urbain", "Horticulture", "Circuits courts"],
    filieres_declin: ["Grandes cultures extensives"],
    projection_pop_2035: 1420000, score_vulnerabilite: 3
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
  nb_etablissements_couverts: 200,
  nb_apprenants_total: 220000,
  nb_departements_couverts: 71,
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
