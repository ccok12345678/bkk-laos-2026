import { ITINERARY } from '../src/data/itinerary';
import { POIS } from '../src/data/pois';
import { FLIGHTS } from '../src/data/flights';
import { HOTELS } from '../src/data/hotels';

const errors: string[] = [];

const poiIds = new Set(POIS.map((p) => p.id));

for (const day of ITINERARY) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date)) {
    errors.push(`Day ${day.id} has invalid date: ${day.date}`);
  }
  if (Number.isNaN(new Date(day.date).getTime())) {
    errors.push(`Day ${day.id} date not parseable: ${day.date}`);
  }
  for (const item of day.items) {
    if (item.poiId && !poiIds.has(item.poiId)) {
      errors.push(
        `Day ${day.id} item "${item.title}" references missing poiId: ${item.poiId}`,
      );
    }
    if (item.price && item.price.amount <= 0) {
      errors.push(
        `Day ${day.id} item "${item.title}" price amount must be positive: ${item.price.amount}`,
      );
    }
    if (
      item.price?.isRange &&
      item.price.maxAmount != null &&
      item.price.maxAmount <= item.price.amount
    ) {
      errors.push(
        `Day ${day.id} item "${item.title}" price range invalid (max <= min)`,
      );
    }
  }
}

for (const poi of POIS) {
  if (!poi.googleMapsUrl) {
    errors.push(`POI ${poi.id} missing googleMapsUrl`);
  }
  if (poi.price && poi.price.amount <= 0) {
    errors.push(`POI ${poi.id} price must be positive`);
  }
}

for (const flight of FLIGHTS) {
  if (flight.priceRange.amount <= 0) {
    errors.push(`Flight ${flight.id} priceRange.amount must be positive`);
  }
}

for (const hotel of HOTELS) {
  if (hotel.priceRange.amount <= 0) {
    errors.push(`Hotel ${hotel.id} priceRange.amount must be positive`);
  }
}

if (errors.length > 0) {
  console.error(`\n✗ ${errors.length} data errors:\n`);
  for (const e of errors) console.error('  -', e);
  process.exit(1);
} else {
  console.log(
    `✓ Data validated: ${ITINERARY.length} days, ${POIS.length} POIs, ${FLIGHTS.length} flights, ${HOTELS.length} hotels`,
  );
}
