/**
 * SEEDS — Sociétés énergie US publiquement connues, par sous-secteur.
 *
 * Sert de "Quick Start" : permet de lancer un scraping direct sur
 * une base d'entreprises réelles sans dépendre de la recherche Google
 * (qui peut être bloquée / rate-limitée).
 *
 * Sources : sites publics de chaque entreprise. Aucune donnée privée.
 * Toutes les URL sont des pages corporate publiques.
 */

export interface EnergySeed {
  name: string;
  website: string;
  state: string;       // code état HQ
  subSectorId: string; // doit correspondre à ENERGY_US_SUBSECTORS
}

export const ENERGY_US_SEEDS: EnergySeed[] = [
  // ── Residential Solar ───────────────────────────────────
  { name: "Sunrun", website: "https://www.sunrun.com", state: "CA", subSectorId: "solar_residential" },
  { name: "Sunnova", website: "https://www.sunnova.com", state: "TX", subSectorId: "solar_residential" },
  { name: "SunPower", website: "https://us.sunpower.com", state: "CA", subSectorId: "solar_residential" },
  { name: "Trinity Solar", website: "https://www.trinity-solar.com", state: "NJ", subSectorId: "solar_residential" },
  { name: "Momentum Solar", website: "https://www.momentumsolar.com", state: "NJ", subSectorId: "solar_residential" },
  { name: "Palmetto", website: "https://palmetto.com", state: "SC", subSectorId: "solar_residential" },
  { name: "Freedom Forever", website: "https://freedomforever.com", state: "CA", subSectorId: "solar_residential" },
  { name: "ADT Solar", website: "https://www.adtsolar.com", state: "TX", subSectorId: "solar_residential" },
  { name: "PosiGen", website: "https://www.posigen.com", state: "LA", subSectorId: "solar_residential" },
  { name: "Tesla Energy", website: "https://www.tesla.com/energy", state: "TX", subSectorId: "solar_residential" },
  { name: "Erus Energy", website: "https://erusenergy.com", state: "TX", subSectorId: "solar_residential" },
  { name: "Suntuity Renewables", website: "https://www.suntuity.com", state: "NJ", subSectorId: "solar_residential" },

  // ── C&I / Commercial Solar EPC ──────────────────────────
  { name: "Borrego Solar", website: "https://www.borregoenergy.com", state: "CA", subSectorId: "solar_commercial" },
  { name: "Standard Solar", website: "https://standardsolar.com", state: "MD", subSectorId: "solar_commercial" },
  { name: "Soltage", website: "https://www.soltage.com", state: "NJ", subSectorId: "solar_commercial" },
  { name: "Distributed Solar Development", website: "https://distributedsolar.com", state: "NY", subSectorId: "solar_commercial" },
  { name: "Greenskies", website: "https://www.greenskies.com", state: "CT", subSectorId: "solar_commercial" },
  { name: "DSD Renewables", website: "https://www.dsdrenewables.com", state: "NY", subSectorId: "solar_commercial" },
  { name: "ForeFront Power", website: "https://www.forefrontpower.com", state: "CA", subSectorId: "solar_commercial" },
  { name: "Pivot Energy", website: "https://www.pivotenergy.net", state: "CO", subSectorId: "solar_commercial" },

  // ── Utility-Scale Solar ────────────────────────────────
  { name: "NextEra Energy Resources", website: "https://www.nexteraenergyresources.com", state: "FL", subSectorId: "solar_utility" },
  { name: "Invenergy", website: "https://invenergy.com", state: "IL", subSectorId: "solar_utility" },
  { name: "EDF Renewables North America", website: "https://www.edf-re.com", state: "CA", subSectorId: "solar_utility" },
  { name: "Cypress Creek Renewables", website: "https://ccrenew.com", state: "CA", subSectorId: "solar_utility" },
  { name: "Recurrent Energy", website: "https://www.recurrentenergy.com", state: "TX", subSectorId: "solar_utility" },
  { name: "174 Power Global", website: "https://174powerglobal.com", state: "CA", subSectorId: "solar_utility" },
  { name: "Lightsource bp", website: "https://www.lightsourcebp.com", state: "CA", subSectorId: "solar_utility" },
  { name: "Silicon Ranch", website: "https://www.siliconranch.com", state: "TN", subSectorId: "solar_utility" },
  { name: "Origis Energy", website: "https://www.origisenergy.com", state: "FL", subSectorId: "solar_utility" },
  { name: "AES Corporation", website: "https://www.aes.com", state: "VA", subSectorId: "solar_utility" },
  { name: "Clearway Energy Group", website: "https://www.clearwayenergygroup.com", state: "CA", subSectorId: "solar_utility" },

  // ── Wind ────────────────────────────────────────────────
  { name: "Pattern Energy", website: "https://patternenergy.com", state: "CA", subSectorId: "wind" },
  { name: "Avangrid Renewables", website: "https://www.avangrid.com", state: "OR", subSectorId: "wind" },
  { name: "EDP Renewables North America", website: "https://www.edpr.com", state: "TX", subSectorId: "wind" },
  { name: "Apex Clean Energy", website: "https://www.apexcleanenergy.com", state: "VA", subSectorId: "wind" },
  { name: "Vestas American Wind Technology", website: "https://www.vestas.com", state: "OR", subSectorId: "wind" },
  { name: "GE Vernova", website: "https://www.gevernova.com", state: "MA", subSectorId: "wind" },
  { name: "Ørsted Onshore North America", website: "https://us.orsted.com", state: "RI", subSectorId: "wind" },
  { name: "Equinor Wind US", website: "https://www.equinor.com/energy/usa", state: "NY", subSectorId: "wind" },
  { name: "Dominion Energy Offshore Wind", website: "https://coastalvawind.com", state: "VA", subSectorId: "wind" },

  // ── Battery Storage (BESS) ─────────────────────────────
  { name: "Fluence", website: "https://www.fluenceenergy.com", state: "VA", subSectorId: "battery_storage" },
  { name: "Powin", website: "https://powin.com", state: "OR", subSectorId: "battery_storage" },
  { name: "Sungrow USA", website: "https://us.sungrowpower.com", state: "TX", subSectorId: "battery_storage" },
  { name: "FlexGen", website: "https://flexgen.com", state: "NC", subSectorId: "battery_storage" },
  { name: "Wärtsilä Energy Storage", website: "https://www.wartsila.com/energy", state: "TX", subSectorId: "battery_storage" },
  { name: "ESS Inc.", website: "https://essinc.com", state: "OR", subSectorId: "battery_storage" },
  { name: "Energy Vault", website: "https://www.energyvault.com", state: "CA", subSectorId: "battery_storage" },
  { name: "Form Energy", website: "https://formenergy.com", state: "MA", subSectorId: "battery_storage" },
  { name: "Stem Inc.", website: "https://www.stem.com", state: "CA", subSectorId: "battery_storage" },
  { name: "Convergent Energy + Power", website: "https://www.convergentep.com", state: "NY", subSectorId: "battery_storage" },

  // ── EV Charging Network / CPO ──────────────────────────
  { name: "ChargePoint", website: "https://www.chargepoint.com", state: "CA", subSectorId: "ev_charging_cpo" },
  { name: "EVgo", website: "https://www.evgo.com", state: "CA", subSectorId: "ev_charging_cpo" },
  { name: "Electrify America", website: "https://www.electrifyamerica.com", state: "VA", subSectorId: "ev_charging_cpo" },
  { name: "Blink Charging", website: "https://blinkcharging.com", state: "FL", subSectorId: "ev_charging_cpo" },
  { name: "Volta Charging", website: "https://www.voltacharging.com", state: "CA", subSectorId: "ev_charging_cpo" },
  { name: "FreeWire Technologies", website: "https://freewiretech.com", state: "CA", subSectorId: "ev_charging_cpo" },
  { name: "Francis Energy", website: "https://francisenergy.com", state: "OK", subSectorId: "ev_charging_cpo" },
  { name: "Shell Recharge Solutions", website: "https://www.shell.us/energy-and-innovation/new-energies/electric-vehicle-charging.html", state: "TX", subSectorId: "ev_charging_cpo" },

  // ── EV Charger Manufacturer / Installer ────────────────
  { name: "Wallbox North America", website: "https://wallbox.com/en_us", state: "CA", subSectorId: "ev_charger_manufacturer" },
  { name: "Enel X Way", website: "https://evcharging.enelx.com", state: "MA", subSectorId: "ev_charger_manufacturer" },
  { name: "ABB E-mobility", website: "https://new.abb.com/ev-charging", state: "NC", subSectorId: "ev_charger_manufacturer" },
  { name: "Siemens eMobility", website: "https://www.siemens.com/us/en/products/energy/emobility.html", state: "DC", subSectorId: "ev_charger_manufacturer" },
  { name: "SemaConnect", website: "https://semaconnect.com", state: "MD", subSectorId: "ev_charger_manufacturer" },
  { name: "Tritium", website: "https://tritiumcharging.com", state: "TN", subSectorId: "ev_charger_manufacturer" },
  { name: "BTC Power", website: "https://btcpower.com", state: "CA", subSectorId: "ev_charger_manufacturer" },

  // ── Electric Utility ───────────────────────────────────
  { name: "Duke Energy", website: "https://www.duke-energy.com", state: "NC", subSectorId: "utility_electric" },
  { name: "Southern Company", website: "https://www.southerncompany.com", state: "GA", subSectorId: "utility_electric" },
  { name: "Dominion Energy", website: "https://www.dominionenergy.com", state: "VA", subSectorId: "utility_electric" },
  { name: "Xcel Energy", website: "https://www.xcelenergy.com", state: "MN", subSectorId: "utility_electric" },
  { name: "American Electric Power (AEP)", website: "https://www.aep.com", state: "OH", subSectorId: "utility_electric" },
  { name: "Exelon", website: "https://www.exeloncorp.com", state: "IL", subSectorId: "utility_electric" },
  { name: "PG&E", website: "https://www.pge.com", state: "CA", subSectorId: "utility_electric" },
  { name: "Sempra", website: "https://www.sempra.com", state: "CA", subSectorId: "utility_electric" },
  { name: "Consolidated Edison", website: "https://www.coned.com", state: "NY", subSectorId: "utility_electric" },
  { name: "Eversource Energy", website: "https://www.eversource.com", state: "CT", subSectorId: "utility_electric" },
  { name: "Entergy", website: "https://www.entergy.com", state: "LA", subSectorId: "utility_electric" },
  { name: "FirstEnergy", website: "https://www.firstenergycorp.com", state: "OH", subSectorId: "utility_electric" },

  // ── Independent Power Producer (IPP) ───────────────────
  { name: "Vistra Corp", website: "https://www.vistracorp.com", state: "TX", subSectorId: "ipp" },
  { name: "Calpine", website: "https://www.calpine.com", state: "TX", subSectorId: "ipp" },
  { name: "NRG Energy", website: "https://www.nrg.com", state: "TX", subSectorId: "ipp" },
  { name: "Talen Energy", website: "https://www.talenenergy.com", state: "TX", subSectorId: "ipp" },
  { name: "LS Power", website: "https://www.lspower.com", state: "NY", subSectorId: "ipp" },
  { name: "Constellation Energy", website: "https://www.constellationenergy.com", state: "MD", subSectorId: "ipp" },

  // ── Oil & Gas Services ─────────────────────────────────
  { name: "SLB (Schlumberger)", website: "https://www.slb.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "Halliburton", website: "https://www.halliburton.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "Baker Hughes", website: "https://www.bakerhughes.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "NOV", website: "https://www.nov.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "Weatherford International", website: "https://www.weatherford.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "Liberty Energy", website: "https://www.libertyenergy.com", state: "CO", subSectorId: "oil_gas_services" },
  { name: "ProPetro", website: "https://www.propetroservices.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "Patterson-UTI Energy", website: "https://www.patenergy.com", state: "TX", subSectorId: "oil_gas_services" },
  { name: "ChampionX", website: "https://www.championx.com", state: "TX", subSectorId: "oil_gas_services" },

  // ── ESCO / Energy Efficiency ───────────────────────────
  { name: "Ameresco", website: "https://www.ameresco.com", state: "MA", subSectorId: "esco" },
  { name: "Honeywell Building Technologies", website: "https://buildings.honeywell.com", state: "NC", subSectorId: "esco" },
  { name: "Johnson Controls", website: "https://www.johnsoncontrols.com", state: "WI", subSectorId: "esco" },
  { name: "Siemens Smart Infrastructure", website: "https://www.siemens.com/us/en/products/buildingtechnologies.html", state: "GA", subSectorId: "esco" },
  { name: "Trane Technologies", website: "https://www.tranetechnologies.com", state: "NC", subSectorId: "esco" },
  { name: "Schneider Electric Energy & Sustainability", website: "https://www.se.com/us/en/work/services/sustainability-consulting/", state: "MA", subSectorId: "esco" },
  { name: "ENGIE North America", website: "https://www.engie-na.com", state: "TX", subSectorId: "esco" },
  { name: "NORESCO", website: "https://www.noresco.com", state: "CO", subSectorId: "esco" },
  { name: "Willdan", website: "https://www.willdan.com", state: "CA", subSectorId: "esco" },

  // ── Energy Consulting / Auditing ───────────────────────
  { name: "ICF", website: "https://www.icf.com", state: "VA", subSectorId: "energy_consulting" },
  { name: "Wood Mackenzie", website: "https://www.woodmac.com", state: "MA", subSectorId: "energy_consulting" },
  { name: "Black & Veatch", website: "https://www.bv.com", state: "KS", subSectorId: "energy_consulting" },
  { name: "DNV Energy USA", website: "https://www.dnv.com/energy/", state: "TX", subSectorId: "energy_consulting" },
  { name: "Burns & McDonnell", website: "https://www.burnsmcd.com", state: "MO", subSectorId: "energy_consulting" },
  { name: "Sargent & Lundy", website: "https://www.sargentlundy.com", state: "IL", subSectorId: "energy_consulting" },
  { name: "Guidehouse", website: "https://guidehouse.com", state: "VA", subSectorId: "energy_consulting" },
  { name: "ERM (Environmental Resources Management)", website: "https://www.erm.com/locations/north-america/", state: "DC", subSectorId: "energy_consulting" },
  { name: "Cadmus Group", website: "https://www.cadmusgroup.com", state: "MA", subSectorId: "energy_consulting" },

  // ── Smart Grid / DERMS / Software ──────────────────────
  { name: "Itron", website: "https://www.itron.com", state: "WA", subSectorId: "smart_grid" },
  { name: "Landis+Gyr", website: "https://www.landisgyr.com", state: "GA", subSectorId: "smart_grid" },
  { name: "AutoGrid", website: "https://www.auto-grid.com", state: "CA", subSectorId: "smart_grid" },
  { name: "Aclara Technologies", website: "https://www.aclara.com", state: "MO", subSectorId: "smart_grid" },
  { name: "Span.IO", website: "https://www.span.io", state: "CA", subSectorId: "smart_grid" },
  { name: "Generac Grid Services", website: "https://www.generacgridservices.com", state: "WI", subSectorId: "smart_grid" },
  { name: "Enphase Energy", website: "https://enphase.com", state: "CA", subSectorId: "smart_grid" },
  { name: "Voltus", website: "https://www.voltus.co", state: "CA", subSectorId: "smart_grid" },
  { name: "CPower Energy Management", website: "https://cpowerenergy.com", state: "MD", subSectorId: "smart_grid" },
  { name: "GridPoint", website: "https://www.gridpoint.com", state: "VA", subSectorId: "smart_grid" },

  // ── Geothermal ─────────────────────────────────────────
  { name: "Ormat Technologies", website: "https://www.ormat.com", state: "NV", subSectorId: "geothermal" },
  { name: "Dandelion Energy", website: "https://dandelionenergy.com", state: "NY", subSectorId: "geothermal" },
  { name: "Cyrq Energy", website: "https://cyrqenergy.com", state: "UT", subSectorId: "geothermal" },
  { name: "Fervo Energy", website: "https://fervoenergy.com", state: "TX", subSectorId: "geothermal" },
  { name: "Bedrock Energy", website: "https://www.bedrockenergy.com", state: "TX", subSectorId: "geothermal" },

  // ── Hydrogen ───────────────────────────────────────────
  { name: "Plug Power", website: "https://www.plugpower.com", state: "NY", subSectorId: "hydrogen" },
  { name: "Bloom Energy", website: "https://www.bloomenergy.com", state: "CA", subSectorId: "hydrogen" },
  { name: "FuelCell Energy", website: "https://www.fuelcellenergy.com", state: "CT", subSectorId: "hydrogen" },
  { name: "Air Products", website: "https://www.airproducts.com", state: "PA", subSectorId: "hydrogen" },
  { name: "Linde", website: "https://www.lindeus.com", state: "CT", subSectorId: "hydrogen" },
  { name: "Cummins (Accelera)", website: "https://www.accelerazero.com", state: "IN", subSectorId: "hydrogen" },
  { name: "Nel Hydrogen US", website: "https://nelhydrogen.com", state: "CT", subSectorId: "hydrogen" },
  { name: "Hyzon Motors", website: "https://www.hyzonmotors.com", state: "NY", subSectorId: "hydrogen" },
  { name: "Electric Hydrogen", website: "https://eh2.com", state: "MA", subSectorId: "hydrogen" },

  // ── Commercial HVAC / Heat Pumps ───────────────────────
  { name: "Trane Commercial", website: "https://www.trane.com/commercial/north-america/us/en.html", state: "NC", subSectorId: "hvac_commercial" },
  { name: "Carrier", website: "https://www.carrier.com/commercial/en/us/", state: "FL", subSectorId: "hvac_commercial" },
  { name: "Lennox Commercial", website: "https://www.lennoxcommercial.com", state: "TX", subSectorId: "hvac_commercial" },
  { name: "Daikin Applied", website: "https://www.daikinapplied.com", state: "MN", subSectorId: "hvac_commercial" },
  { name: "Mitsubishi Electric Trane HVAC US", website: "https://www.mitsubishicomfort.com", state: "GA", subSectorId: "hvac_commercial" },
  { name: "LG HVAC USA", website: "https://www.lg.com/us/business/hvac", state: "NJ", subSectorId: "hvac_commercial" },
  { name: "Aaon", website: "https://www.aaon.com", state: "OK", subSectorId: "hvac_commercial" },
  { name: "Johnson Controls HVAC", website: "https://www.johnsoncontrols.com/hvac-equipment", state: "WI", subSectorId: "hvac_commercial" },
];

/**
 * Récupère les seeds correspondant à un sous-secteur, optionnellement filtré par état.
 */
export function getSeeds(subSectorId: string, state?: string): EnergySeed[] {
  let list = ENERGY_US_SEEDS.filter((s) => s.subSectorId === subSectorId);
  if (state) {
    const code = state.toUpperCase();
    list = list.filter((s) => s.state === code);
  }
  return list;
}

/**
 * Compte le nombre de seeds disponibles par sous-secteur.
 */
export function countSeedsBySector(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const s of ENERGY_US_SEEDS) {
    counts[s.subSectorId] = (counts[s.subSectorId] ?? 0) + 1;
  }
  return counts;
}
