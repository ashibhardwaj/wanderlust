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
  'Egypt',
  'England',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Hong Kong',
  'India',
  'Indonesia',
  'Ireland',
  'Italy',
  'Japan',
  'Mauritius',
  'Malaysia',
  'Macau',
  'Northern Ireland',
  'Netherlands',
  'Nepal',
  'Oman',
  'Switzerland',
  'South Korea',
  'Scotland',
  'Slovenia',
  'Slovakia',
  'Singapore',
  'Sri Lanka',
  'Turkey',
  'Thailand',
  'USA',
  'UAE',
  'Vatican City',
  'Vietnam',
  'Wales',
];
