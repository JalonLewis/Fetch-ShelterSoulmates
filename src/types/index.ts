export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: number
    breed: string
}

export type SearchParams = {
    breeds: string[];
    zipCodes: string[];
    ageMin: string;
    ageMax: string;
    size: number;
    from: number;
    sort: string;
  };