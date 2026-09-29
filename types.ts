export interface Helyetesites {
  id: number;
  name: string; 
  hours: number;
  dayofweek: string; 
}

export type NewHelyetesites = Omit<Helyetesites, "id">;