import { Timestamp } from "firebase/firestore";

export type User = {
    userName?:string;
    id: string;
    email:string;
}

export interface Picture {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
  }

  export interface Item {
    href: string;
    data: Daum[];
    links: Link[];
  }
  
  export interface Daum {
    center: string;
    date_created: string;
    description: string;
    description_508?: string;
    keywords: string[];
    media_type: string;
    nasa_id: string;
    secondary_creator?: string;
    title: string;
    album?: string[];
    location?: string;
  }
  
  export interface Link {
    href: string;
    rel: string;
    render: string;
    width?: number;
    size?: number;
    height?: number;
  }

  // SOLAR-SYSTEM API 
  export interface Bodies {
    id: string
    name: string
    englishName: string
    isPlanet: boolean
    moons: Moon[]
    semimajorAxis: number
    perihelion: number
    aphelion: number
    eccentricity: number
    inclination: number
    mass: Mass
    vol: Vol
    density: number
    gravity: number
    escape: number
    meanRadius: number
    equaRadius: number
    polarRadius: number
    flattening: number
    dimension: string
    sideralOrbit: number
    sideralRotation: number
    aroundPlanet: any
    discoveredBy: string
    discoveryDate: string
    alternativeName: string
    axialTilt: number
    avgTemp: number
    mainAnomaly: number
    argPeriapsis: number
    longAscNode: number
    bodyType: string
  }
  
  export interface Moon {
    moon: string
    rel: string
  }
  
  export interface Mass {
    massValue: number
    massExponent: number
  }
  
  export interface Vol {
    volValue: number
    volExponent: number
  }

 export type MessageType = {
   author: string;
   text: string;
   date: Timestamp;
   id: string;
 };

//  Details-Media

export interface Root {
  collection: Collection;
}

export interface Collection {
  version: string;
  href: string;
  items: Item[];
  metadata: Metadata;
}

export interface Item {
  href: string;
  data: Daum[];
  links: Link[];
}

export interface Daum {
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  media_type: string;
  nasa_id: string;
  title: string;
}

export interface Link {
  href: string;
  rel: string;
  render: string;

}

export interface Metadata {
  total_hits: number;
}

// Liked PICTURE OF THE DAY 
export type ImageDates = {
  author: string;
   date: string;
   id: string;
   url: string;
}
