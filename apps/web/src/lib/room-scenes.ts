/** Room scenes for "Place in Room" product visualizer */

export type RoomSceneId = "puja-room" | "mandir-shelf" | "living-room" | "festival-table";

export interface RoomScene {
  id: RoomSceneId;
  name: string;
  nameHindi: string;
  image: string;
  /** Default product placement (percent of container) */
  defaultPlacement: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
  /** Surface hint line for shadow (optional) */
  surfaceY?: number;
}

export const ROOM_SCENES: RoomScene[] = [
  {
    id: "puja-room",
    name: "Puja Room",
    nameHindi: "पूजा घर",
    image: "/images/rooms/puja-room.svg",
    defaultPlacement: { x: 50, y: 62, scale: 0.35, rotation: 0 },
    surfaceY: 68,
  },
  {
    id: "mandir-shelf",
    name: "Mandir Shelf",
    nameHindi: "मंदिर शेल्फ",
    image: "/images/rooms/mandir-shelf.svg",
    defaultPlacement: { x: 50, y: 55, scale: 0.28, rotation: 0 },
    surfaceY: 62,
  },
  {
    id: "living-room",
    name: "Living Room",
    nameHindi: "बैठक कक्ष",
    image: "/images/rooms/living-room.svg",
    defaultPlacement: { x: 42, y: 58, scale: 0.32, rotation: -3 },
    surfaceY: 65,
  },
  {
    id: "festival-table",
    name: "Festival Table",
    nameHindi: "त्योहार की मेज",
    image: "/images/rooms/festival-table.svg",
    defaultPlacement: { x: 50, y: 52, scale: 0.3, rotation: 0 },
    surfaceY: 58,
  },
];

const CATEGORY_ROOM_MAP: Record<string, RoomSceneId> = {
  diyas: "puja-room",
  "brass-puja-items": "puja-room",
  "copper-puja-items": "puja-room",
  "puja-samagri": "puja-room",
  "pooja-thali": "festival-table",
  kalash: "mandir-shelf",
  "idols-murtis": "mandir-shelf",
  "jain-puja-products": "mandir-shelf",
  mala: "mandir-shelf",
  "incense-dhoop": "living-room",
  "puja-kits": "festival-table",
  "puja-gifts": "living-room",
};

export function getDefaultRoomForProduct(categorySlugs: string[]): RoomSceneId {
  for (const cat of categorySlugs) {
    if (CATEGORY_ROOM_MAP[cat]) return CATEGORY_ROOM_MAP[cat];
  }
  return "puja-room";
}

export function getRoomScene(id: RoomSceneId): RoomScene {
  return ROOM_SCENES.find((r) => r.id === id) ?? ROOM_SCENES[0]!;
}
