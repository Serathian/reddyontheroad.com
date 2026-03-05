import type { RotrPost } from '$lib/types'
import { mockLocations } from './locations'

const makeStops = (key: string) =>
  mockLocations[key].map((loc) => ({
    location: loc,
    visit_date: undefined,
    id: String(loc.id),
  }))

export const mockPosts: RotrPost[] = [
  {
    id: 1, status: 'published', title: 'Leaving Oulu', slug: 'week-1-oulu', type: 'story',
    excerpt: 'The morning we packed the last boxes into the motorhome, Leila kept asking if she could bring her entire bedroom. We said no. She brought the pillow at least. By noon we were on the E75 heading south, watching Finland blur past the windows.',
    body: `It had taken three months to reach this point. The motorhome — a 2012 Hymer B-Class we'd found through a Finnish Facebook group — had been cleaned, serviced, and loaded so many times that we knew exactly where everything lived. Leila's car seat bolted into the bench seat opposite the kitchen. Ana's plants had all been surrendered to a neighbour except for one small succulent that found a home in the dashboard cup holder.\n\nOulu in July is as close to paradise as Finland gets. Long evenings, warm enough to sit outside, the sea a short cycle away. Leaving it felt strange — not sad exactly, but like stepping off a ledge you've been standing on for years.`,
    latitude: 65.0121, longitude: 25.4651,
    locations: makeStops('week-1-oulu'),
    published_at: '2022-07-04T08:00:00.000Z',
    updatedAt: '2022-07-04T08:00:00.000Z', createdAt: '2022-07-04T08:00:00.000Z',
  },
  {
    id: 2, status: 'published', title: 'Stockholm', slug: 'week-2-stockholm', type: 'story',
    excerpt: 'Sweden felt immediately different — wider roads, bigger parking areas, a faint sense that motorhomes were expected here. We crossed from Haparanda and by evening were parked up on the outskirts of Stockholm.',
    body: `Stockholm is a city that assumes you know what you're doing. We didn't, quite. The motorhome, which felt enormous in Finnish campsite lanes, felt positively agricultural trying to navigate the Djurgården bridge. Leila slept through most of it.\n\nWe parked at the Fishing Harbour area and took the metro in. Old Town on foot, the Vasa Museum — which Leila declared "the broken boat museum" and was not wrong — and the unexpected pleasure of finding a playground on Djurgården that kept us occupied for two hours while Ana made coffee.`,
    latitude: 59.3293, longitude: 18.0686,
    locations: makeStops('week-2-stockholm'),
    published_at: '2022-07-11T08:00:00.000Z',
    updatedAt: '2022-07-11T08:00:00.000Z', createdAt: '2022-07-11T08:00:00.000Z',
  },
  {
    id: 3, status: 'published', title: 'Copenhagen and the Great Belt', slug: 'week-3-copenhagen', type: 'story',
    excerpt: 'Denmark announced itself with flat light and the smell of the sea. We crossed the Øresund Bridge early in the morning and found Copenhagen still waking up. Leila ate a pastry almost as big as her face in Nyhavn.',
    body: `The Øresund Bridge crossing deserves its own entry. There's a particular Danish quality to the road — flat, purposeful, the sea on both sides. The bridge toll was eye-watering. Worth it.\n\nCopenhagen in August heat is a different city to its winter reputation. People were everywhere — on bikes, at café terraces, in the parks. We found a campsite about twenty minutes from the centre, walked the bikes in from the van, and spent three days feeling like residents rather than tourists.`,
    latitude: 55.6761, longitude: 12.5683,
    locations: makeStops('week-3-copenhagen'),
    published_at: '2022-07-18T08:00:00.000Z',
    updatedAt: '2022-07-18T08:00:00.000Z', createdAt: '2022-07-18T08:00:00.000Z',
  },
  {
    id: 4, status: 'published', title: 'Germany — The Autobahn Week', slug: 'week-4-germany', type: 'story',
    excerpt: 'Germany meant the Autobahn, and the Autobahn meant decisions. We had agreed, in advance, that we would drive sensibly. We averaged 78 km/h through roadworks the whole way to Hamburg. Leila napped. Responsible parenting.',
    body: `Hamburg hit us like a city that had decided to be interesting on purpose. The harbour, the Speicherstadt, the Reeperbahn at 11 in the morning with its very apologetic energy — all of it felt like arriving somewhere that had been somewhere for a long time.\n\nFrom Hamburg we drove the Rhine Valley route rather than the motorway. This was Ana's suggestion and it was the best navigation decision of the trip. The river on one side, castle ruins on the cliffs, a wine village every fifteen kilometres. We drank Riesling sitting on the motorhome steps and watched the river traffic and felt unambiguously lucky.`,
    latitude: 53.5511, longitude: 9.9937,
    locations: makeStops('week-4-germany'),
    published_at: '2022-07-25T08:00:00.000Z',
    updatedAt: '2022-07-25T08:00:00.000Z', createdAt: '2022-07-25T08:00:00.000Z',
  },
  {
    id: 5, status: 'published', title: 'Alsace — France Begins', slug: 'week-5-strasbourg', type: 'story',
    excerpt: "Crossing into France felt ceremonial. There's a particular French quality to the roadsides — the plane trees, the stone walls, the village names that all sound like poetry. We arrived in Strasbourg in the late afternoon and immediately got lost in Petite France.",
    body: `Strasbourg is a city in negotiation with itself — French and German, European and local, old half-timbered buildings and the glass-and-steel Parliament all within walking distance of each other. We spent two days here and could have spent two weeks.\n\nLeila's highlight was a duck she befriended near the canal. The duck was unimpressed but patient. Ana found a bookshop selling English-language novels in the old town and disappeared for two hours. I ate a flammkuchen standing up at a market stall and considered that this was exactly the trip we had hoped it would be.`,
    latitude: 48.5734, longitude: 7.7521,
    locations: makeStops('week-5-strasbourg'),
    published_at: '2022-08-01T08:00:00.000Z',
    updatedAt: '2022-08-01T08:00:00.000Z', createdAt: '2022-08-01T08:00:00.000Z',
  },
  {
    id: 6, status: 'published', title: 'The Pyrenees', slug: 'week-6-perpignan', type: 'story',
    excerpt: 'The Pyrenees crossing is, in the motorhome community, something of a rite of passage. You either go through the tunnel or you take the mountain road. We took the mountain road. This was either brave or silly. Possibly both.',
    body: `Perpignan sits at the foot of the Pyrenees with a confidence that comes from being the last major French city before Spain. The old Catalan quarter is extraordinary — terracotta and shadow and the smell of something being grilled somewhere always just out of sight.\n\nThe Col du Perthus crossing itself was not as dramatic as we'd feared. The road is wide enough, the gradient manageable. We pulled into a lay-by at the top and got out to stand on the border. Leila asked which side was which. We pointed. France. Spain. She nodded as if this confirmed something she'd always suspected.`,
    latitude: 42.6886, longitude: 2.8948,
    locations: makeStops('week-6-perpignan'),
    published_at: '2022-08-08T08:00:00.000Z',
    updatedAt: '2022-08-08T08:00:00.000Z', createdAt: '2022-08-08T08:00:00.000Z',
  },
  {
    id: 7, status: 'published', title: 'Barcelona', slug: 'week-7-barcelona', type: 'story',
    excerpt: "Barcelona was an idea we'd been building toward for months. In reality it was even more than the idea. We found a campsite south of the city, took the metro in, and on the first morning walked to the sea and stood there for a long time not saying very much.",
    body: `Sagrada Família first, obviously. You have to. Leila was uncharacteristically quiet inside, which we took as high praise from a three-year-old. The scale of the thing, the light coming through the coloured glass — even in high tourist season, crowded and noisy, it was impossible not to feel the weight of it.\n\nBarceloneta beach in the afternoon heat, Leila running at the waves and retreating shrieking every time one came close. Ana and I taking turns with her, drinking bad coffee from a beach kiosk, watching the city haze in the distance. Three weeks from Oulu and we were at the Mediterranean. It felt improbable and completely right.`,
    latitude: 41.3851, longitude: 2.1734,
    locations: makeStops('week-7-barcelona'),
    published_at: '2022-08-15T08:00:00.000Z',
    updatedAt: '2022-08-15T08:00:00.000Z', createdAt: '2022-08-15T08:00:00.000Z',
  },
  {
    id: 8, status: 'published', title: 'Málaga — We Made It', slug: 'week-8-malaga', type: 'story',
    excerpt: 'The Costa del Sol is not what the Finnish newspapers would have you believe. Yes, there are British pubs and sunburnt tourists. There is also Málaga — genuinely, stubbornly itself — and the sea in the evenings turned a colour we had no name for.',
    body: `We parked up in a campsite east of Málaga on a Thursday evening and the three of us walked to the beach without saying much. The Mediterranean in August is a very specific temperature — warm enough to feel like relief, not cold enough to be refreshing. Leila went in up to her waist and declared it perfect.\n\nMálaga old town is underrated. The Picasso museum, the Alcazaba up on the hill, the tapas bars in the streets around the market that charge a third of what Barcelona charges for twice the quality. We stayed ten days in the end, because leaving felt wrong.\n\nThis blog exists because Ana thought we should write it down while we still remembered everything clearly. I think she was right. Leila is four now and already asks when we're going again.`,
    latitude: 36.7213, longitude: -4.4214,
    locations: makeStops('week-8-malaga'),
    published_at: '2022-08-22T08:00:00.000Z',
    updatedAt: '2022-08-22T08:00:00.000Z', createdAt: '2022-08-22T08:00:00.000Z',
  },
]
