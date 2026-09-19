// Countries Ashi has visited but doesn't have a written itinerary for yet.
// These show on the home page world map in a muted shade, with a "coming
// soon" hover hint and no link.
//
// Names that match the dataset's canonical form (e.g. "France", "Japan")
// render straight away. Alternative spellings (e.g. "England", "USA") are
// normalized by countryAlias in src/pages/index.astro. Countries too small
// for the 110m dataset to draw (e.g. Singapore, Vatican City) are surfaced
// via pinDefinitions in the same file.
export const placeholderCountries: string[] = [
  'Austria',
  'Belgium',
  'Bahrain',
  'Bhutan',
  'Croatia',
  'Czechia',
  'England',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Hong Kong',
  'India',
  'Ireland',
  'Italy',
  'Malaysia',
  'Macau',
  'Northern Ireland',
  'Netherlands',
  'Nepal',
  'Oman',
  'Switzerland',
  'South Korea',
  'Scotland',
  'Seychelles',
  'Slovenia',
  'Slovakia',
  'Singapore',
  'Turkey',
  'UAE',
  'Vatican City',
  'Wales',
];

// Planned dates for trips that are on the map but do not have an itinerary yet.
// The entry is removed when the published trip takes its place.
export const placeholderTripDates: Record<string, string> = {
  Seychelles: '2026-09',
};
