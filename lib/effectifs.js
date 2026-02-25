// ============================================================
// OATIA – Données Effectifs CNEAP 2004-2026
// Source : "Effectifs par établissement.xlsx"
// Note : 2019-2020 absent (COVID-19)
// ============================================================

export const YEARS = [
  '2004-05','2005-06','2006-07','2007-08','2008-09','2009-10',
  '2010-11','2011-12','2012-13','2013-14','2014-15','2015-16',
  '2016-17','2017-18','2018-19',
  '2020-21','2021-22','2022-23','2023-24','2024-25','2025-26',
];

export const PROJ_YEARS = ['2026-27','2027-28','2028-29','2029-30','2030-31'];

// Totaux nationaux CNEAP (ligne "Effectif total" du fichier)
export const TOTAL_EFFECTIFS = [
  50428,51001,51261,50862,50374,50565,49993,51072,50141,50553,
  47427,47534,46310,45532,44972,
  44127,44895,44430,44252,44963,45409,
];

// 204 établissements — null = donnée manquante, 0 = fermé / pas encore ouvert
export const effectifsData = [
  // ── Auvergne-Rhône-Alpes ──────────────────────────────────
  { region:'Auvergne-Rhône-Alpes', commune:'Annonay',               data:[164,163,172,179,186,174,195,214,205,206,178,192,228,228,230,227,235,219,233,229,243] },
  { region:'Auvergne-Rhône-Alpes', commune:'Chambéry',              data:[383,382,392,369,348,353,346,337,345,338,280,291,256,227,231,244,236,224,203,185,185] },
  { region:'Auvergne-Rhône-Alpes', commune:'Châteauneuf-de-Galaure',data:[268,281,302,312,296,292,305,307,287,281,279,301,276,302,283,279,289,298,273,279,296] },
  { region:'Auvergne-Rhône-Alpes', commune:'Combree',               data:[46,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Auvergne-Rhône-Alpes', commune:'Combloux',              data:[161,172,195,200,199,184,169,188,191,203,190,180,171,165,127,125,135,130,131,117,125] },
  { region:'Auvergne-Rhône-Alpes', commune:'Ennezat',               data:[104,110,98,105,108,109,111,114,118,132,117,125,130,128,127,126,119,118,130,141,150] },
  { region:'Auvergne-Rhône-Alpes', commune:'Feurs',                 data:[204,207,215,214,222,215,218,229,214,220,196,199,217,211,181,199,203,198,198,206,196] },
  { region:'Auvergne-Rhône-Alpes', commune:'La Mure',               data:[111,116,105,110,86,87,89,92,119,128,118,109,102,101,103,94,102,103,109,101,107] },
  { region:'Auvergne-Rhône-Alpes', commune:'Lamastre',              data:[76,72,71,61,55,57,60,53,68,55,51,45,31,23,0,0,0,0,0,0,0] },
  { region:'Auvergne-Rhône-Alpes', commune:'Le Breuil-sur-Couze',   data:[125,126,138,127,127,122,110,115,118,113,100,99,112,103,82,83,70,87,0,0,0] },
  { region:'Auvergne-Rhône-Alpes', commune:'Le Mayet-de-Montagne',  data:[162,157,154,165,162,162,155,133,107,97,106,125,141,107,100,298,106,117,99,93,121] },
  { region:'Auvergne-Rhône-Alpes', commune:'Le Pont-de-Beauvoisin', data:[226,235,232,231,226,230,232,266,276,300,268,273,246,259,260,249,253,0,0,0,0] },
  { region:'Auvergne-Rhône-Alpes', commune:'Le Vernet-Chameanê',    data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,95,110,110,108,102] },
  { region:'Auvergne-Rhône-Alpes', commune:'Limonest',              data:[254,281,292,257,247,276,252,235,262,303,274,276,250,235,210,213,199,167,135,114,121] },
  { region:'Auvergne-Rhône-Alpes', commune:'Maurs',                 data:[82,106,118,110,97,98,92,75,75,67,60,54,52,49,47,0,0,0,0,0,0] },
  { region:'Auvergne-Rhône-Alpes', commune:'Monteleger',            data:[208,176,182,154,107,109,111,144,146,157,125,138,131,129,135,135,138,149,150,151,163] },
  { region:'Auvergne-Rhône-Alpes', commune:'Nandax',                data:[402,410,416,412,428,438,450,450,425,417,403,393,403,413,433,421,451,441,513,550,601] },
  { region:'Auvergne-Rhône-Alpes', commune:'Poisy',                 data:[880,892,912,918,920,908,923,965,880,829,813,838,837,852,829,856,861,826,815,823,853] },
  { region:'Auvergne-Rhône-Alpes', commune:'Reignier',              data:[300,307,315,323,334,340,354,367,351,338,356,307,300,282,298,310,336,340,328,330,331] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Flour',              data:[131,110,126,107,111,98,114,137,142,131,107,102,97,75,73,73,68,79,65,52,41] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Genis-Laval',        data:[167,163,171,181,181,173,148,159,152,130,135,135,128,122,126,97,103,107,109,102,102] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Jean-de-Bournay',    data:[275,288,261,275,271,256,242,257,279,282,286,291,259,243,213,210,207,200,202,189,191] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Marcellin',          data:[173,172,170,159,180,195,186,205,208,211,189,190,195,189,182,178,189,186,180,182,173] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Paul-Trois-Châteaux',data:[285,348,347,340,349,350,348,359,350,342,348,376,386,379,362,373,387,387,386,413,383] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Siméon-de-Bressieux',data:[127,128,132,118,120,125,129,113,119,126,124,130,125,128,115,120,113,122,125,144,147] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Sorlin-en-Bugey',    data:[148,155,180,206,189,182,171,191,249,289,237,235,254,246,223,236,248,241,240,240,255] },
  { region:'Auvergne-Rhône-Alpes', commune:'St-Symphorien-sur-Coise',data:[159,170,187,174,174,170,159,194,201,201,160,155,158,160,151,154,158,147,149,157,160] },
  { region:'Auvergne-Rhône-Alpes', commune:'Sury-le-Comtal',        data:[237,243,273,300,340,368,366,387,373,393,383,369,363,349,341,319,325,312,315,303,312] },
  { region:'Auvergne-Rhône-Alpes', commune:'Thonon-les-Bains',      data:[208,211,217,213,218,223,211,202,229,248,223,221,205,257,289,307,310,334,333,331,347] },
  { region:'Auvergne-Rhône-Alpes', commune:'Tournon-sur-Rhône',     data:[257,276,291,278,277,252,251,256,255,240,171,175,204,202,223,232,225,227,226,213,216] },
  { region:'Auvergne-Rhône-Alpes', commune:'Vals-près-le-Puy',      data:[324,302,248,275,264,261,228,212,225,218,202,201,206,220,192,206,235,233,218,222,233] },
  { region:'Auvergne-Rhône-Alpes', commune:'Vernet-la-Varenne',     data:[109,124,121,126,110,100,105,100,106,113,109,124,116,110,109,55,0,0,0,0,0] },
  { region:'Auvergne-Rhône-Alpes', commune:'Villemoirieu',          data:[503,484,467,489,473,455,443,444,450,451,397,400,361,376,406,402,430,497,520,522,537] },
  { region:'Auvergne-Rhône-Alpes', commune:'Yssingeaux',            data:[109,110,118,114,106,119,108,116,131,163,177,192,168,177,158,127,133,137,135,145,164] },
  // ── Bourgogne-Franche-Comté ───────────────────────────────
  { region:'Bourgogne-Franche-Comté', commune:'Besançon',           data:[267,304,311,256,285,286,264,280,280,275,237,254,268,285,267,281,274,269,252,236,241] },
  { region:'Bourgogne-Franche-Comté', commune:'Chamblanc',          data:[172,180,185,172,158,166,153,156,141,138,113,110,106,98,96,105,81,77,0,0,0] },
  { region:'Bourgogne-Franche-Comté', commune:'Gray',               data:[98,141,137,141,138,163,151,145,131,146,126,124,120,139,124,114,92,94,91,98,142] },
  { region:'Bourgogne-Franche-Comté', commune:'Les Fontenelles',    data:[161,160,144,159,133,121,122,139,123,132,121,115,92,92,73,77,65,71,58,47,0] },
  { region:'Bourgogne-Franche-Comté', commune:'Levier',             data:[316,315,319,315,306,328,330,297,279,267,281,291,293,323,316,343,352,356,373,357,337] },
  { region:'Bourgogne-Franche-Comté', commune:'Louhans',            data:[221,221,228,235,239,216,214,213,213,217,190,187,155,157,175,189,198,206,196,204,202] },
  { region:'Bourgogne-Franche-Comté', commune:'Morbier',            data:[178,162,166,145,127,146,132,125,123,120,111,114,82,0,0,0,0,0,0,0,0] },
  { region:'Bourgogne-Franche-Comté', commune:'Pontarlier',         data:[185,200,204,218,226,218,222,231,229,237,192,184,189,191,194,176,200,203,156,161,180] },
  { region:'Bourgogne-Franche-Comté', commune:'Saulieu',            data:[93,109,110,127,130,106,117,116,114,126,127,116,108,86,108,96,85,100,80,61,57] },
  { region:'Bourgogne-Franche-Comté', commune:'St-Martin-en-Bresse',data:[142,141,155,148,134,130,145,133,132,142,142,125,107,107,126,115,116,134,135,125,123] },
  { region:'Bourgogne-Franche-Comté', commune:'St-Saulge',          data:[168,178,188,181,164,150,126,122,134,156,134,130,98,55,64,41,0,0,0,0,0] },
  { region:'Bourgogne-Franche-Comté', commune:'Varzy',              data:[224,238,254,268,258,273,273,281,252,264,251,255,279,254,234,223,236,239,208,228,197] },
  { region:'Bourgogne-Franche-Comté', commune:'Vérosvres',          data:[182,199,201,184,164,125,134,117,119,106,78,57,0,0,0,0,0,0,0,0,0] },
  // ── Bretagne ──────────────────────────────────────────────
  { region:'Bretagne', commune:'Auray',                data:[530,544,548,535,556,551,537,568,603,600,575,570,524,525,537,508,500,524,544,560,548] },
  { region:'Bretagne', commune:'Bain-de-Bretagne',     data:[170,181,186,197,222,235,267,273,295,332,302,309,288,312,310,299,299,278,295,303,301] },
  { region:'Bretagne', commune:'Dinan',                data:[94,103,100,117,118,143,132,151,154,146,134,134,103,77,65,68,86,97,86,87,97] },
  { region:'Bretagne', commune:'Dol-de-Bretagne',      data:[636,635,633,618,621,623,637,651,658,688,635,653,661,665,676,650,697,679,665,673,689] },
  { region:'Bretagne', commune:'Fougères',             data:[402,419,399,402,417,442,427,423,390,363,457,490,440,472,482,441,439,461,455,453,450] },
  { region:'Bretagne', commune:'Gourin',               data:[149,177,163,172,184,189,184,184,183,192,172,151,188,172,172,174,189,178,169,191,189] },
  { region:'Bretagne', commune:'Kervignac',            data:[350,375,376,376,367,373,351,364,358,355,326,319,318,275,293,257,274,258,275,272,269] },
  { region:'Bretagne', commune:'La Roche-Jaudy',       data:[716,700,731,760,737,762,736,760,725,718,740,791,801,764,800,800,795,796,776,774,746] },
  { region:'Bretagne', commune:'Langueux',             data:[426,375,369,379,402,389,435,462,442,434,413,399,394,398,422,401,400,373,377,387,410] },
  { region:'Bretagne', commune:'Lanrodec',             data:[104,98,78,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Bretagne', commune:'Lesneven',             data:[340,373,378,393,346,355,311,281,248,256,215,220,171,167,198,186,159,183,177,172,164] },
  { region:'Bretagne', commune:'Locminé',              data:[261,241,266,250,262,257,237,274,305,272,232,220,228,213,243,237,228,237,237,234,209] },
  { region:'Bretagne', commune:'Loperec',              data:[318,303,317,296,265,273,268,262,253,245,227,239,231,231,270,292,286,317,332,351,347] },
  { region:'Bretagne', commune:'Loudéac',              data:[179,194,202,199,172,164,138,158,146,173,180,166,184,173,180,179,178,180,178,179,194] },
  { region:'Bretagne', commune:'Malestroit',           data:[142,188,199,208,194,199,207,211,181,178,163,163,167,167,143,117,112,129,122,139,139] },
  { region:'Bretagne', commune:'Montauban-de-Bretagne',data:[335,350,340,341,336,336,341,336,329,320,284,270,281,237,252,273,266,241,241,254,258] },
  { region:'Bretagne', commune:'Pabu',                 data:[365,363,369,368,365,372,358,346,349,350,313,302,313,315,290,279,287,286,285,311,339] },
  { region:'Bretagne', commune:'Ploemeur-Ploermel',    data:[786,700,677,660,709,681,698,790,821,840,814,814,810,806,838,840,884,870,932,917,1057] },
  { region:'Bretagne', commune:'Plomelin',             data:[0,0,210,203,200,220,194,210,199,200,172,158,161,161,158,168,187,170,144,187,183] },
  { region:'Bretagne', commune:'Plouescat',            data:[81,65,67,60,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Bretagne', commune:'Plouigneau',           data:[217,221,228,199,190,203,161,191,177,184,166,165,135,122,125,128,129,128,132,114,132] },
  { region:'Bretagne', commune:'Pontivy',              data:[198,197,206,229,215,221,200,228,224,234,226,211,212,193,196,176,168,178,178,174,150] },
  { region:'Bretagne', commune:'Quessoy',              data:[725,778,794,798,792,758,655,633,590,575,563,508,522,530,535,535,550,524,566,592,574] },
  { region:'Bretagne', commune:'Quimper',              data:[454,421,400,361,405,417,397,469,486,502,434,438,412,437,381,348,339,338,364,380,373] },
  { region:'Bretagne', commune:'Redon',                data:[480,494,450,450,426,450,465,494,479,512,498,528,502,512,535,556,581,590,594,576,615] },
  { region:'Bretagne', commune:'Rennes',               data:[732,694,604,591,554,551,539,608,572,594,554,507,484,485,475,473,742,733,719,757,735] },
  { region:'Bretagne', commune:'St-Aubin-du-Cormier',  data:[182,186,188,164,128,122,115,99,119,128,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Bretagne', commune:'St-Père-en-Retz',      data:[226,226,210,191,181,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Bretagne', commune:'Tinteniac',            data:[200,211,213,210,203,184,191,192,200,220,186,187,177,178,161,166,189,178,192,196,211] },
  { region:'Bretagne', commune:'Vitré',                data:[570,538,464,401,404,377,374,386,388,356,316,314,318,317,315,317,null,null,null,null,null] },
  // ── Centre-Val de Loire ───────────────────────────────────
  { region:'Centre-Val de Loire', commune:'Anet',                 data:[343,335,351,354,347,326,305,345,354,342,298,321,301,276,270,262,286,305,301,298,265] },
  { region:'Centre-Val de Loire', commune:'Bengy-sur-Craon',      data:[198,207,210,221,198,184,193,179,179,202,172,174,180,168,156,149,139,154,171,181,190] },
  { region:'Centre-Val de Loire', commune:'Châteaudun',           data:[425,437,450,436,453,443,462,481,501,515,504,528,495,504,482,490,455,503,512,554,543] },
  { region:'Centre-Val de Loire', commune:'Fougères-sur-Bièvre',  data:[109,116,111,116,115,96,106,106,101,113,103,110,110,89,111,0,0,0,0,0,0] },
  { region:'Centre-Val de Loire', commune:'Le Controis-en-Sologne',data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,105,113,117,123,145,145] },
  { region:'Centre-Val de Loire', commune:'Lignac',               data:[57,64,62,48,52,52,31,29,25,11,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Centre-Val de Loire', commune:'Mignieres',            data:[423,424,439,428,402,394,393,425,430,439,396,367,338,299,293,234,233,249,247,266,233] },
  { region:'Centre-Val de Loire', commune:'Montoire-sur-le-Loir', data:[202,188,188,190,175,181,193,170,169,163,146,150,127,143,127,124,109,105,101,110,127] },
  { region:'Centre-Val de Loire', commune:'St-Cyran-du-Jambot',   data:[345,305,303,312,319,315,308,317,284,288,256,255,237,234,226,251,227,219,224,199,183] },
  // ── DOM TOM ───────────────────────────────────────────────
  { region:'DOM TOM', commune:'Houailou',              data:[139,111,111,105,105,105,91,98,83,89,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'DOM TOM', commune:'Nuku Hiva',             data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,73,81,80,87,95,80] },
  { region:'DOM TOM', commune:'Papeete',               data:[0,0,0,0,0,0,0,0,0,0,0,0,0,38,75,90,87,95,108,116,132] },
  { region:'DOM TOM', commune:'Punaauia',              data:[50,51,72,71,76,86,90,78,100,116,112,109,93,91,79,0,0,0,0,0,0] },
  { region:'DOM TOM', commune:'St-Laurent-du-Maroni',  data:[0,0,0,0,0,0,0,0,27,86,111,160,201,227,247,283,311,330,334,350,358] },
  { region:'DOM TOM', commune:'Ste-Suzanne',           data:[250,244,255,254,265,231,229,250,241,263,234,238,232,224,215,197,216,193,193,203,203] },
  // ── Grand Est ─────────────────────────────────────────────
  { region:'Grand Est', commune:'Arcis-sur-Aube',      data:[151,172,189,202,204,187,198,187,208,208,177,176,156,147,148,116,127,132,112,128,137] },
  { region:'Grand Est', commune:'Droyes',              data:[105,115,109,99,121,114,92,97,95,87,68,0,0,0,0,0,0,0,0,0,0] },
  { region:'Grand Est', commune:'Harol',               data:[202,214,195,171,157,163,164,152,175,169,149,140,111,106,108,107,120,108,106,110,106] },
  { region:'Grand Est', commune:'Maubert-Fontaine',    data:[153,162,157,139,145,157,154,173,151,150,131,132,114,104,101,112,103,96,80,92,98] },
  { region:'Grand Est', commune:'Ste-Maure',           data:[432,418,421,407,414,417,403,424,416,424,436,466,470,462,468,422,347,337,340,303,288] },
  { region:'Grand Est', commune:'Thillois',            data:[253,249,238,234,242,261,269,252,235,267,265,263,293,255,250,272,274,245,254,230,227] },
  // ── Hauts-de-France ───────────────────────────────────────
  { region:'Hauts-de-France', commune:'Aire-sur-la-Lys',  data:[481,455,461,453,406,392,393,387,396,418,410,416,385,370,376,398,405,402,392,382,421] },
  { region:'Hauts-de-France', commune:'Bapaume',           data:[440,430,422,426,408,450,450,463,486,480,466,433,422,419,366,364,369,371,363,353,347] },
  { region:'Hauts-de-France', commune:'Bavay',             data:[142,150,150,177,195,189,181,198,154,149,141,157,116,108,118,106,124,133,128,134,135] },
  { region:'Hauts-de-France', commune:'Bourbourg',         data:[281,270,230,240,213,218,215,207,200,201,193,208,190,194,183,174,182,192,183,183,186] },
  { region:'Hauts-de-France', commune:'Bucquoy',           data:[162,190,199,194,203,200,186,196,199,199,166,179,201,186,209,209,226,248,270,285,267] },
  { region:'Hauts-de-France', commune:'Cambrai',           data:[188,188,191,155,151,188,209,204,195,191,191,172,172,198,202,199,193,191,162,171,148] },
  { region:'Hauts-de-France', commune:'Chauny',            data:[350,330,330,307,301,305,329,319,298,308,287,282,296,262,251,233,239,277,308,311,294] },
  { region:'Hauts-de-France', commune:'Corbie',            data:[208,215,206,212,196,191,218,230,203,221,216,216,240,231,231,224,213,206,193,187,184] },
  { region:'Hauts-de-France', commune:'Coulogne',          data:[366,356,383,403,398,407,397,396,381,362,360,338,347,316,325,341,355,345,328,342,345] },
  { region:'Hauts-de-France', commune:'Estaires',          data:[239,263,271,253,234,224,245,253,256,280,251,247,203,187,163,153,162,172,166,143,139] },
  { region:'Hauts-de-France', commune:'Estrées-Saint-Denis',data:[168,160,165,164,162,167,180,200,204,200,175,172,174,177,168,162,165,160,181,190,169] },
  { region:'Hauts-de-France', commune:'Genech',            data:[1536,1509,1521,1550,1539,1507,1516,1496,1488,1483,1471,1509,1433,1458,1411,1442,1526,1427,1445,1426,1454] },
  { region:'Hauts-de-France', commune:'Hazebrouck',        data:[402,390,397,416,396,417,409,423,390,383,376,372,353,340,333,336,323,317,323,298,286] },
  { region:'Hauts-de-France', commune:'Hoymille',          data:[227,270,284,307,335,367,378,395,410,407,398,376,380,390,409,437,474,501,528,571,587] },
  { region:'Hauts-de-France', commune:'Orvillers-Sorel',   data:[167,165,170,177,185,185,132,140,155,134,103,89,78,81,72,25,0,0,0,0,0] },
  { region:'Hauts-de-France', commune:'Pecquencourt',      data:[324,329,311,334,345,344,348,346,321,300,336,350,355,355,337,319,363,356,360,329,321] },
  { region:'Hauts-de-France', commune:'Pierrefonds',       data:[200,214,193,213,214,213,218,246,247,226,212,237,236,239,232,213,223,174,194,207,203] },
  { region:'Hauts-de-France', commune:'Savy-Berlette',     data:[121,157,158,147,146,168,192,202,196,196,218,222,218,212,227,221,214,202,184,192,226] },
  // ── Île-de-France ─────────────────────────────────────────
  { region:'Île-de-France', commune:'Igny',       data:[239,269,251,249,260,252,245,240,210,177,152,147,139,139,119,122,102,112,117,123,122] },
  { region:'Île-de-France', commune:'Magnanville', data:[182,160,183,216,234,234,260,270,255,268,242,268,238,233,223,232,248,236,207,196,163] },
  { region:'Île-de-France', commune:'Maule',       data:[220,229,229,224,228,235,248,307,342,329,283,274,281,293,309,308,274,268,258,227,228] },
  { region:'Île-de-France', commune:'Vaujours',    data:[230,232,226,238,250,267,241,250,249,227,213,194,147,164,156,0,0,0,0,0,0] },
  // ── Normandie ─────────────────────────────────────────────
  { region:'Normandie', commune:'Barenton',              data:[101,105,107,95,83,88,83,92,105,98,94,85,82,59,43,40,43,0,0,0,0] },
  { region:'Normandie', commune:'Briouze',               data:[204,197,172,183,163,150,137,162,136,131,96,82,0,0,0,0,0,0,0,0,0] },
  { region:'Normandie', commune:'Caen',                  data:[230,240,251,236,214,206,200,213,225,230,234,239,276,369,367,352,343,386,365,379,381] },
  { region:'Normandie', commune:'Giel-Courteilles',      data:[320,285,241,208,170,146,143,143,126,118,119,111,113,119,124,121,108,101,80,80,80] },
  { region:'Normandie', commune:'Mesnieres-en-Bray',     data:[337,315,310,284,309,308,341,351,304,297,270,281,296,333,318,322,319,299,313,302,284] },
  { region:'Normandie', commune:'Montebourg',            data:[148,131,120,116,128,137,125,136,127,115,104,117,111,88,96,126,140,152,142,162,160] },
  { region:'Normandie', commune:'Nonant-le-Pin',         data:[82,77,81,71,71,80,77,76,80,88,67,55,78,64,53,53,67,59,55,67,85] },
  { region:'Normandie', commune:'Pont-Audemer',          data:[291,280,271,296,286,302,273,278,265,274,252,258,266,262,270,266,260,276,251,245,223] },
  { region:'Normandie', commune:'Smermesnil',            data:[48,54,57,58,39,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Normandie', commune:'St-Maurice-lès-Charencey',data:[48,48,50,49,50,51,35,42,33,14,0,0,0,0,0,0,0,0,0,0,0] },
  // ── Nouvelle-Aquitaine ────────────────────────────────────
  { region:'Nouvelle-Aquitaine', commune:'Agen',               data:[122,128,123,124,116,121,114,115,123,123,116,101,110,120,126,119,117,124,147,171,178] },
  { region:'Nouvelle-Aquitaine', commune:'Astaffort',          data:[160,168,158,105,114,100,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Nouvelle-Aquitaine', commune:'Bois',               data:[136,143,167,195,193,194,200,206,204,218,224,230,197,203,214,246,264,259,260,257,250] },
  { region:'Nouvelle-Aquitaine', commune:'Cudos',              data:[146,146,155,155,158,156,142,159,153,157,177,165,129,120,110,92,104,106,87,88,94] },
  { region:'Nouvelle-Aquitaine', commune:'Forges',             data:[140,126,131,114,110,99,95,104,95,81,69,59,0,0,0,0,0,0,0,0,0] },
  { region:'Nouvelle-Aquitaine', commune:'Hasparren',          data:[262,222,211,235,249,221,228,251,215,208,194,199,195,193,185,203,226,234,244,234,216] },
  { region:'Nouvelle-Aquitaine', commune:'La Roche-Rigault',   data:[97,135,121,101,107,103,98,104,118,125,108,117,99,98,100,83,103,89,87,97,109] },
  { region:'Nouvelle-Aquitaine', commune:'Mauléon',            data:[98,103,108,101,114,115,120,130,130,148,121,127,125,126,104,110,121,133,126,121,120] },
  { region:'Nouvelle-Aquitaine', commune:'Mauléon-Licharre',   data:[235,240,245,259,267,268,292,312,315,341,332,335,334,351,348,348,344,351,340,346,338] },
  { region:'Nouvelle-Aquitaine', commune:'Nay',                data:[264,279,288,271,271,269,268,275,243,255,263,255,235,245,239,229,250,251,273,279,270] },
  { region:'Nouvelle-Aquitaine', commune:'Couhé',              data:[74,95,91,73,67,60,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Nouvelle-Aquitaine', commune:'Ruffec',             data:[281,323,304,259,240,229,255,267,258,251,217,192,180,185,180,199,194,190,175,192,197] },
  { region:'Nouvelle-Aquitaine', commune:'Saubrigues',         data:[119,119,115,120,115,135,144,166,164,168,167,169,164,155,143,142,145,141,136,154,137] },
  { region:'Nouvelle-Aquitaine', commune:'Sauveterre-de-Béarn',data:[190,222,229,205,202,178,188,200,203,201,147,141,132,149,123,108,109,86,104,137,129] },
  { region:'Nouvelle-Aquitaine', commune:'Ségonzac',           data:[174,193,219,202,203,212,197,190,196,209,192,182,167,157,162,119,115,129,139,154,155] },
  { region:'Nouvelle-Aquitaine', commune:'Sigoulès',           data:[224,256,274,273,260,253,269,314,278,274,260,260,279,278,271,278,261,236,208,190,200] },
  { region:'Nouvelle-Aquitaine', commune:'St-Jean-Pied-de-Port',data:[42,61,84,96,120,120,102,122,134,137,113,121,125,116,118,106,119,114,122,114,135] },
  { region:'Nouvelle-Aquitaine', commune:'St-Palais',          data:[346,326,338,358,354,368,333,340,326,348,358,384,400,371,332,353,371,335,292,341,366] },
  { region:'Nouvelle-Aquitaine', commune:'St-Pandelon',        data:[168,161,185,176,162,162,144,136,135,147,128,127,113,108,114,103,90,73,89,104,124] },
  { region:'Nouvelle-Aquitaine', commune:'St-Pée-sur-Nivelle', data:[188,180,197,194,194,176,172,163,158,172,179,195,216,209,215,199,228,208,201,208,202] },
  { region:'Nouvelle-Aquitaine', commune:'Villenauve-sur-Lot', data:[373,371,349,330,321,318,329,343,318,343,360,355,341,350,354,363,348,320,318,319,341] },
  { region:'Nouvelle-Aquitaine', commune:'Villenave-d\'Ornon',  data:[177,182,185,202,197,204,230,229,217,231,229,212,225,215,218,215,198,158,140,113,117] },
  // ── Occitanie ─────────────────────────────────────────────
  { region:'Occitanie', commune:'Beaumont-de-Lomagne', data:[118,129,122,131,124,135,147,140,146,152,138,107,117,116,107,85,108,105,106,94,94] },
  { region:'Occitanie', commune:'Bourg-Madame',        data:[149,151,141,148,145,118,97,102,107,124,111,107,121,108,92,58,63,85,85,90,90] },
  { region:'Occitanie', commune:'Capestang',           data:[216,225,216,202,206,211,206,190,174,170,156,154,143,145,158,175,173,166,163,156,155] },
  { region:'Occitanie', commune:'Caussade',            data:[415,438,449,429,415,426,420,382,341,385,337,348,345,320,309,264,267,287,312,323,340] },
  { region:'Occitanie', commune:'Céret',               data:[186,190,193,185,181,173,143,156,173,176,156,146,155,155,162,155,148,154,152,154,161] },
  { region:'Occitanie', commune:'Clermont-l\'Hérault', data:[141,114,131,111,113,122,129,133,125,119,100,126,85,86,62,72,90,94,111,107,103] },
  { region:'Occitanie', commune:'Ganges',              data:[92,91,106,100,108,90,87,93,89,86,73,85,78,88,75,73,72,100,111,106,140] },
  { region:'Occitanie', commune:'Gigean',              data:[140,153,168,187,198,201,181,172,195,224,216,210,217,203,220,195,194,166,149,164,161] },
  { region:'Occitanie', commune:'Labège',              data:[209,207,232,203,191,193,195,233,243,225,247,249,251,220,246,257,244,257,272,272,276] },
  { region:'Occitanie', commune:'Lézignan-Corbières',  data:[123,136,135,145,134,138,141,139,140,142,145,145,137,155,135,146,142,150,145,138,132] },
  { region:'Occitanie', commune:'Limoux',              data:[618,598,552,590,610,561,568,551,516,477,446,382,398,354,356,352,351,277,254,262,247] },
  { region:'Occitanie', commune:'Marvejols',           data:[122,132,136,197,196,206,213,197,194,189,196,219,224,235,253,213,165,163,151,151,112] },
  { region:'Occitanie', commune:'Masseube',            data:[351,370,360,366,394,409,441,425,418,428,416,386,342,319,283,268,289,272,239,250,268] },
  { region:'Occitanie', commune:'Monteils',            data:[210,255,277,260,246,253,221,206,222,228,200,213,250,244,217,204,259,244,248,242,228] },
  { region:'Occitanie', commune:'Montastruc-la-Conseillère',data:[173,197,197,194,199,206,209,228,235,244,224,229,214,197,166,187,201,208,219,236,239] },
  { region:'Occitanie', commune:'Pézenas',             data:[477,460,476,464,486,481,443,432,430,409,406,417,388,382,407,408,416,385,367,378,369] },
  { region:'Occitanie', commune:'Pézens',              data:[199,191,189,180,181,186,171,147,192,219,204,185,153,138,101,89,77,99,93,105,108] },
  { region:'Occitanie', commune:'Rieumes',             data:[126,128,138,134,128,129,148,144,143,134,132,132,132,131,135,128,129,132,140,128,137] },
  { region:'Occitanie', commune:'Rignac',              data:[327,334,338,340,340,345,373,350,275,230,211,205,215,201,188,171,166,175,185,187,185] },
  { region:'Occitanie', commune:'Souilhanels',         data:[204,192,176,190,182,197,204,212,218,202,176,181,185,162,163,156,180,172,182,184,178] },
  { region:'Occitanie', commune:'St-Affrique',         data:[198,219,193,189,173,179,181,193,180,165,137,140,93,82,80,76,76,81,93,98,89] },
  { region:'Occitanie', commune:'St-Amans-Soult',      data:[140,142,135,119,110,120,129,137,128,120,121,151,179,160,153,173,189,183,177,175,185] },
  { region:'Occitanie', commune:'St-Chély',            data:[43,40,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Occitanie', commune:'Verdalle',            data:[404,416,429,428,424,442,448,449,425,423,384,399,418,393,386,369,394,388,378,380,395] },
  { region:'Occitanie', commune:'Vestric-et-Candiac',  data:[0,0,0,0,0,43,46,51,49,46,55,56,56,55,53,0,73,65,75,92,100] },
  // ── Pays de la Loire ──────────────────────────────────────
  { region:'Pays de la Loire', commune:'Ancenis',          data:[239,246,249,248,253,253,253,280,289,304,273,290,287,273,288,287,278,287,262,288,293] },
  { region:'Pays de la Loire', commune:'Angers',           data:[407,424,413,409,418,426,439,437,414,417,419,425,445,461,467,506,518,518,521,544,537] },
  { region:'Pays de la Loire', commune:'Château-Gontier',  data:[136,144,161,151,179,211,208,173,162,160,170,186,182,187,190,205,205,219,230,256,300] },
  { region:'Pays de la Loire', commune:'Châteaubriant',    data:[129,131,128,152,152,140,156,155,148,177,132,143,121,108,107,119,134,122,118,136,150] },
  { region:'Pays de la Loire', commune:'Chemillé',         data:[249,253,279,279,261,249,234,239,240,212,222,233,217,249,251,260,266,283,283,288,298] },
  { region:'Pays de la Loire', commune:'Cholet',           data:[193,197,182,183,173,186,191,202,189,188,155,141,157,161,162,188,234,242,261,275,282] },
  { region:'Pays de la Loire', commune:'Clisson-Gorges',   data:[530,518,538,499,459,490,493,464,441,449,424,459,422,435,450,469,478,446,497,525,544] },
  { region:'Pays de la Loire', commune:'Derval',           data:[498,496,499,521,554,548,586,584,576,559,550,575,526,506,461,428,443,443,437,491,505] },
  { region:'Pays de la Loire', commune:'Evron',            data:[198,205,175,200,227,221,218,215,233,233,232,234,212,211,199,179,162,144,133,116,101] },
  { region:'Pays de la Loire', commune:'La Ferté-Bernard', data:[169,179,184,200,185,189,192,213,198,207,197,197,157,164,162,176,184,178,190,194,214] },
  { region:'Pays de la Loire', commune:'La Roche-sur-Yon', data:[688,682,688,670,659,660,593,535,453,403,438,452,486,442,457,497,482,479,494,513,466] },
  { region:'Pays de la Loire', commune:'Le Landreau',      data:[584,595,608,610,566,608,574,571,542,548,678,637,700,666,660,673,706,729,735,765,730] },
  { region:'Pays de la Loire', commune:'Le Loroux-Bottereau',data:[169,169,156,176,155,132,132,136,136,116,0,0,0,0,0,0,0,0,0,0,0] },
  { region:'Pays de la Loire', commune:'Le Pellerin',      data:[165,139,153,159,168,370,414,417,377,387,333,327,345,343,317,null,330,339,318,280,285] },
  { region:'Pays de la Loire', commune:'Les Ponts-de-Cé', data:[594,588,608,613,618,620,596,598,553,545,536,549,550,549,547,472,485,488,520,530,507] },
  { region:'Pays de la Loire', commune:'Loir-en-Vallée',   data:[233,226,244,244,239,262,248,254,257,281,255,270,220,173,141,117,119,107,129,119,129] },
  { region:'Pays de la Loire', commune:'Machecoul',        data:[264,273,251,243,248,247,241,241,247,266,251,245,242,262,280,304,301,313,309,345,346] },
  { region:'Pays de la Loire', commune:'Mayenne',          data:[454,451,476,454,481,506,524,553,524,518,471,482,503,461,461,448,421,440,397,409,420] },
  { region:'Pays de la Loire', commune:'Nort-sur-Erdre',   data:[306,311,296,303,297,290,279,282,243,251,235,224,211,219,233,236,237,230,224,224,242] },
  { region:'Pays de la Loire', commune:'Sablé-sur-Sarthe', data:[403,379,388,400,413,418,428,450,476,500,475,523,513,476,411,364,352,323,326,301,309] },
  { region:'Pays de la Loire', commune:'St-Gildas-des-Bois',data:[300,300,291,307,302,327,312,328,282,288,282,286,273,301,311,308,313,312,322,353,380] },
  { region:'Pays de la Loire', commune:'St-Molf',          data:[185,195,188,195,189,189,180,209,205,193,189,194,209,200,204,191,168,153,189,192,201] },
  // ── Provence-Alpes-Côte d'Azur ────────────────────────────
  { region:'Provence-Alpes-Côte d\'Azur', commune:'Carpentras',           data:[423,420,410,408,404,415,395,396,430,462,430,416,395,363,356,344,335,336,346,357,350] },
  { region:'Provence-Alpes-Côte d\'Azur', commune:'Miramas',              data:[260,273,241,231,229,229,251,255,261,270,238,244,227,228,256,282,339,369,327,324,363] },
  { region:'Provence-Alpes-Côte d\'Azur', commune:'St-Maximin-la-Ste-Baume',data:[398,401,400,410,430,460,454,471,469,468,465,476,523,526,510,540,539,580,584,564,593] },
  { region:'Provence-Alpes-Côte d\'Azur', commune:'Valréas',              data:[195,223,212,196,209,210,211,227,245,246,220,224,211,219,213,180,183,163,202,226,228] },
];

// ── Utilitaires ────────────────────────────────────────────────────────────

/** Dernière valeur non-null de la série */
export function getLastValue(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] !== null) return data[i];
  }
  return 0;
}

/** Établissement actuellement actif (dernier connu > 0) */
export function isActive(data) {
  return getLastValue(data) > 0;
}

/** Établissement fermé (eut des élèves puis est tombé à 0 définitivement) */
export function isClosed(data) {
  const last = getLastValue(data);
  if (last === null || last > 0) return false;
  return data.some(v => v !== null && v > 0);
}

/** Année de fermeture (premier '0' définitif après activité) */
export function getClosureYear(data) {
  let wasActive = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== null && data[i] > 0) {
      wasActive = true;
    } else if (wasActive && data[i] === 0) {
      const rest = data.slice(i);
      if (rest.every(v => v === 0 || v === null)) return YEARS[i];
    }
  }
  return null;
}

/** Peak de fréquentation */
export function getPeak(data) {
  let max = 0, idx = 0;
  data.forEach((v, i) => { if (v !== null && v > max) { max = v; idx = i; } });
  return { peak: max, year: YEARS[idx] };
}

/** Régression linéaire sur n derniers points actifs → projections 5 ans */
export function projectData(data, nProj = 5, nPts = 7) {
  const valid = data.map((v, i) => ({ i, v })).filter(x => x.v !== null);
  if (!valid.length) return { projections: Array(nProj).fill(0), slope: 0, trend: 'unknown' };

  const lastKnown = valid[valid.length - 1].v;
  if (lastKnown === 0) {
    return { projections: Array(nProj).fill(0), slope: 0, trend: 'closed' };
  }

  const active = valid.filter(x => x.v > 0);
  const pts = active.slice(-nPts);
  const n = pts.length;
  if (n < 2) return { projections: Array(nProj).fill(pts[0]?.v ?? 0), slope: 0, trend: 'stable' };

  const sumX = pts.reduce((s, p) => s + p.i, 0);
  const sumY = pts.reduce((s, p) => s + p.v, 0);
  const sumXY = pts.reduce((s, p) => s + p.i * p.v, 0);
  const sumX2 = pts.reduce((s, p) => s + p.i * p.i, 0);
  const den = n * sumX2 - sumX * sumX;
  const slope = den === 0 ? 0 : (n * sumXY - sumX * sumY) / den;
  const intercept = (sumY - slope * sumX) / n;

  const lastIdx = pts[pts.length - 1].i;
  const projections = [];
  let reachesZero = false;
  for (let k = 1; k <= nProj; k++) {
    const val = Math.max(0, Math.round(slope * (lastIdx + k) + intercept));
    projections.push(val);
    if (val === 0) reachesZero = true;
  }

  const trend = slope > 4 ? 'growth' : slope < -4 ? 'decline' : 'stable';
  return { projections, slope, trend, reachesZero, intercept };
}

/** Génère les alertes pour un établissement actif */
export function generateAlerts(commune, region, data) {
  if (!isActive(data)) return [];
  const last = getLastValue(data);
  const { slope, trend, reachesZero, projections } = projectData(data);
  const alerts = [];

  if (last < 80) alerts.push({ level: 'critique', msg: `Effectif critique : ${last} élèves` });
  else if (last < 130) alerts.push({ level: 'vigilance', msg: `Effectif faible : ${last} élèves` });

  if (reachesZero && projections[2] === 0)
    alerts.push({ level: 'critique', msg: 'Fermeture probable dans < 3 ans (tendance linéaire)' });
  else if (reachesZero)
    alerts.push({ level: 'vigilance', msg: 'Risque de fermeture dans les 5 prochaines années' });

  // Déclin ≥ 5 ans consécutifs
  const recent = data.filter(v => v !== null && v > 0).slice(-6);
  if (recent.length >= 6) {
    const allDown = recent.slice(1).every((v, i) => v <= recent[i]);
    if (allDown && slope < -2) alerts.push({ level: 'surveillance', msg: 'Déclin continu sur ≥ 5 ans consécutifs' });
  }

  // Perte > 30 % du pic
  const { peak } = getPeak(data);
  if (peak > 0 && last < peak * 0.7 && trend === 'decline')
    alerts.push({ level: 'surveillance', msg: `Perte de ${Math.round((1 - last / peak) * 100)} % depuis le pic (${peak} élèves)` });

  return alerts;
}
